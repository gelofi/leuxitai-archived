const Discord = require("discord.js");
const { Client, Attachment, Collection } = require("discord.js");

const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 270000);

const bot = new Discord.Client({ disableEveryone: true, disableMentions: true });
const { token } = require ("./config.js")
const PREFIX = "l.";

const db = require('quick.db');
const ms = require('ms');

let cooldown = new Set();
let cdseconds = 45;
const talkedRecently = new Set();

const usersMap = new Map();
const LIMIT = 5;
const TIME = 7;
const DIFF = 3000;

//New Leveling
const Enmap = require("enmap");
bot.points = new Enmap({name: "points"});

// Collections
bot.commands = new Collection();
bot.aliases = new Collection();

// Run the command loader
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(bot);
});

//Leuxitai BOT - by Fizx26

bot.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(
    `New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`
  );
  bot.user
    .setActivity(`${bot.guilds.size} servers | ${PREFIX}help`, {
      type: "WATCHING"
  })
    .catch(console.error);
});

bot.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  bot.user
    .setActivity(`${bot.guilds.size} servers | ${PREFIX}help`, {
      type: "WATCHING"
    })
    .catch(console.error);
});

bot.on("ready", async () => {
  
  // regular activity
  console.log("Don't forget to modify stats.js !")
  console.log(`${bot.user.username} is now online!`);
  bot.user
    .setActivity(`${bot.guilds.size} servers | ${PREFIX}help`, {
      type: "WATCHING"
    })
    .catch(console.error);
});

// Regular Commands
bot.on("message", async message => {
  
    //Fixes the bot bug
  if (message.author.bot) return;
  
  if(message.guild){
  
    //Fixes the bot bug
  if (message.author.bot) return;
    
  let msg = await db.fetch(`msgCounter_${message.guild.id}`)
  if(msg == null) msg = LIMIT
    
  let msgSec = await db.fetch(`msgSec_${message.guild.id}`)
  if(msgSec == null) msgSec === TIME
    
    if(usersMap.has(message.author.id)) {
    const userData = usersMap.get(message.author.id);
    const { lastMessage, timer } = userData;
    const difference = message.createdTimestamp - lastMessage.createdTimestamp;
    let msgCount = userData.msgCount;
    console.log(difference);
    if(difference > DIFF) {
      clearTimeout(timer);
      console.log('Cleared timeout');
      userData.msgCount = 1;
      userData.lastMessage = message;
      userData.timer = setTimeout(() => {
        usersMap.delete(message.author.id);
        console.log('Removed from RESET.');
      }, msgSec * 1000);
      usersMap.set(message.author.id, userData);
    }
    else {
      ++msgCount;
      if(parseInt(msgCount) === msg) {
  let antispam = await db.fetch(`antispam_${message.guild.id}`)
  if(antispam == null) antispam = "off"
  if(antispam !== "on") return
        
        let channel = await db.fetch(`channel_${message.guild.id}`)
        
        var log = new Discord.RichEmbed()
        .setTitle("Logs | Spamming!")
        .setDescription(`${message.author} tried to spam in ${message.channel}.\n\n**Leuxitai** took care of it and purged **${msg}** messages.`)
        .setColor("#1a40a1")
        .setFooter(`Spammer ID: ${message.author.id}`)
        .setTimestamp()
        var set = message.guild.channels.find(`name`, `${channel}`)
        set.send(log)
        message.channel.bulkDelete(msg)
        message.reply("please don't spam!");
      } else {
        userData.msgCount = msgCount;
        usersMap.set(message.author.id, userData);
      }
    }
  }
  else {
    let fn = setTimeout(() => {
      usersMap.delete(message.author.id);
      console.log('Removed from map.');
    }, msgSec * 1000);
    usersMap.set(message.author.id, {
      msgCount: 1,
      lastMessage: message,
      timer: fn
    });
  }
    
  };
  
  //Fixes DM bugs
  if (message.channel.type == "dm"){
    
  if (message.content.startsWith(PREFIX)) return message.author.send("You dared to try!")
      return
    }
  
  const { default_prefix } = require("./config.js")
  let prefix;
    let prefixes = await db.fetch(`prefix_${message.guild.id}`)
    if(prefixes == null){
      prefix = default_prefix;
    } else {
      prefix = prefixes;
    }
  
  //log channel
  let channel;
  
    let channels = await db.fetch(`channel_${message.guild.id}`)
    
    if(channels == null){
      channel = message.channel.name;
    } else {
      channel = channels;
    }
  
  if(message.content.startsWith(`<@698529160938782720>`)){
    	    message.channel.send(`My prefix here is \`${prefix}\`\nChange my prefix using \`${prefix}setprefix\`.`)
    	}
  
  if(message.guild){
  let swearWords = await db.fetch(`bannedwords_${message.guild.id}`)

  if(swearWords == null) swearWords = ["‽"]
  
  if(swearWords.some(w =>
    message.content.toLowerCase().includes(w))){
    message.delete()
    message.reply("watch your mouth! You said a banned word!")
   }
  };
       
  //Fixes the prefix bug
  if (!message.content.startsWith(prefix)) return;

  if (talkedRecently.has(message.author.id)) return;
  
  talkedRecently.add(message.author.id);
  setTimeout(() => {
  // Removes the user from the set after 0.8 seconds
  talkedRecently.delete(message.author.id);
   }, 800);
  
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
 
    // If message.member is uncached, cache it.
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    // Get the command
    let command = bot.commands.get(cmd);
    // If none is found, try to find it by alias
    if (!command) command = bot.commands.get(bot.aliases.get(cmd));

    // If a command is finally found, run the command
    if (command) 
        command.run(bot, message, args);
  
  // Leveling
  if (message.guild) {
  
  if(cooldown.has(message.author.id)) return
  if(message.author.bot) return

  const key = `${message.guild.id}-${message.author.id}`;
    if (message.author.bot) return;
    // Triggers on new users we haven't seen before.
    bot.points.ensure(`${message.guild.id}-${message.author.id}`, {
      user: message.author.id,
      guild: message.guild.id,
      points: 0,
      totalpoints: 0,
      level: 1
    });
  const randomXP = Math.floor(Math.random() * 14) + 1;
  bot.points.math(key, "+", randomXP, "points")
  //if(!message.member.hasPermission("ADMINISTRATOR")){
  cooldown.add(message.author.id)
  
    // Calculate the user's current level
    const curLevel = Math.floor(0.1 * Math.sqrt(bot.points.get(key, "points")));
    
    let coins = "<:leuxicoin:715493556810416238>";
  
    let user = message.author;
    let amount = 200;
    
    if (bot.points.get(key, "points") >= 500) {
      
      let togglexp;
  
    let togglesxp = await db.fetch(`togglexp_${message.guild.id}`)
    
    if(togglesxp == null){
      togglexp = 'on';
    } else {
      togglexp = togglesxp;
    }

      if(togglexp !== 'on') return
      bot.points.inc(key, 1, "level");
      bot.points.set(key, 0, "points");
    
    db.add(`money_${message.guild.id}_${user.id}`, amount)
    message.reply(`you leveled up to ${curLevel}! GG!\n + ${coins} **200** LeuxiCoins to your wallet.`)
    }
  }
  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdseconds * 1000)
  
});

bot.on("guildMemberAdd", async function(member) {
	
    let mem = member.toString()
	  const ms = require("ms");

	  let channel;
  
    let channels = await db.fetch(`channel_${member.guild.id}`)
    
    if(channels == null){
      return 
    } else {
      channel = channels;
    }
	   
  var autoEmb = new Discord.RichEmbed()
        .setTitle("Logs | New member!")
        .setThumbnail(member.user.displayAvatarURL)
        .setDescription(`${mem} just joined our server!`)
        .setColor("#3654ff")
        .setFooter(`ID: ${member.id}`)
        .setTimestamp()
        var set = member.guild.channels.find(`name`, `${channel}`)
        set.send(autoEmb);
  
	   let timedrole1;
  
    let timedroles1 = await db.fetch(`timedrole1_${member.guild.id}`)
    
      timedrole1 = timedroles1;
	   
	   let timedrole1time;
  
    let timedroles1time = await db.fetch(`timedrole1time_${member.guild.id}`)
    
      timedrole1time = timedroles1time;
	   
    let tr2 = await db.fetch(`timedrole2_${member.guild.id}`)
    let tr2t = await db.fetch(`timedrole2time_${member.guild.id}`)
    
    let tr3 = await db.fetch(`timedrole3_${member.guild.id}`)
    let tr3t = await db.fetch(`timedrole3time_${member.guild.id}`)
    
    let autorole = member.guild.roles.find(r => r.name === `${timedrole1}`)
    let timerole = member.guild.roles.find(r => r.name === `${tr2}`)
    let timedrole = member.guild.roles.find(r => r.name === `${tr3}`)

    if(timedrole1 !== null && tr2 == null){
      
    setTimeout(function(){
    member.addRole(autorole)
    
    var addEmb = new Discord.RichEmbed()
        .setTitle("Logs | Autorole given!")
        .setThumbnail(member.user.displayAvatarURL)
        .setDescription(`${mem} gained the role **${timedrole1}** after **${ms(timedrole1time)}**`)
        .setColor("#3654ff")
        .setFooter(`ID: ${member.id}`)
        .setTimestamp()
        var set = member.guild.channels.find(`name`, `${channel}`)
        set.send(addEmb);
    }, timedrole1time)
      
    }
  
    if(timedrole1 !== null && tr2 !== null){
      
    setTimeout(function(){
    member.addRole(autorole)
    var addEmb = new Discord.RichEmbed()
        .setTitle("Logs | Autorole given!")
        .setThumbnail(member.user.displayAvatarURL)
        .setDescription(`${mem} gained the role **${timedrole1}** after **${ms(timedrole1time)}**`)
        .setColor("#3654ff")
        .setFooter(`ID: ${member.id}`)
        .setTimestamp()
        var set = member.guild.channels.find(`name`, `${channel}`)
        set.send(addEmb);
    }, timedrole1time)
      
    setTimeout(function(){
      
    member.addRole(timerole)
    var addEmb = new Discord.RichEmbed()
        .setTitle("Logs | Autorole given!")
        .setThumbnail(member.user.displayAvatarURL)
        .setDescription(`${mem} gained the role **${tr2}** after **${ms(tr2t)}**`)
        .setColor("#3654ff")
        .setFooter(`ID: ${member.id}`)
        .setTimestamp()
        var set = member.guild.channels.find(`name`, `${channel}`)
        set.send(addEmb);
    }, tr2t)
      
    }

    if(timedrole1 !== null && tr2 !== null && tr3 !== null){
      
    setTimeout(function(){
    member.addRole(autorole)
    var addEmb = new Discord.RichEmbed()
        .setTitle("Logs | Autorole given!")
        .setThumbnail(member.user.displayAvatarURL)
        .setDescription(`${mem} gained the role **${timedrole1}** after **${ms(timedrole1time)}**`)
        .setColor("#3654ff")
        .setFooter(`ID: ${member.id}`)
        .setTimestamp()
        var set = member.guild.channels.find(`name`, `${channel}`)
        set.send(addEmb);
    }, timedrole1time)
      
    setTimeout(function(){
      
    member.addRole(timerole)
    var addEmb = new Discord.RichEmbed()
        .setTitle("Logs | Autorole given!")
        .setThumbnail(member.user.displayAvatarURL)
        .setDescription(`${mem} gained the role **${tr2}** after **${ms(tr2t)}**`)
        .setColor("#3654ff")
        .setFooter(`ID: ${member.id}`)
        .setTimestamp()
        var set = member.guild.channels.find(`name`, `${channel}`)
        set.send(addEmb);
    }, tr2t)
      
    setTimeout(function(){
      
    member.addRole(timedrole)
    var addEmb = new Discord.RichEmbed()
        .setTitle("Logs | Autorole given!")
        .setThumbnail(member.user.displayAvatarURL)
        .setDescription(`${mem} gained the role **${tr3}** after **${ms(tr3t)}**`)
        .setColor("#3654ff")
        .setFooter(`ID: ${member.id}`)
        .setTimestamp()
        var set = member.guild.channels.find(`name`, `${channel}`)
        set.send(addEmb);
    }, tr2t)

    }
});

bot.on("guildMemberRemove", async function(member) {
  
  let channel;
  
    let channels = await db.fetch(`channel_${member.guild.id}`)
    
    if(channels == null){
      return
    } else {
      channel = channels;
    }
	   
    let mem = member.toString()
    var autoEmb = new Discord.RichEmbed()
        .setTitle("Logs | Member left!")
        .setThumbnail(member.user.displayAvatarURL)
        .setDescription(`${mem} just left our server :(`)
        .setColor("#3654ff")
        .setFooter(`ID: ${member.id}`)
        .setTimestamp()
        var set = member.guild.channels.find(`name`, `${channel}`)
        set.send(autoEmb);
  
});

bot.on("messageDelete", async function(message){
  
    let channel;
  
    let channels = await db.fetch(`channel_${message.guild.id}`)
    
    if(channels == null){
      return
    } else {
      channel = channels;
    }
    try {
    var autoEmb = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag} | Message deleted!`, message.author.displayAvatarURL)
        .setDescription(`${message}\n\nChannel: ${message.channel}`)
        .setColor("#3654ff")
        .setFooter(`Author ID: ${message.author.id}\nMessage ID: ${message.id}`)
        .setTimestamp()
      var set = message.guild.channels.find(`name`, `${channel}`)
        set.send(autoEmb);
    } catch (error) {
      var fail = new Discord.RichEmbed()
      .setAuthor("Logs | Message deleted!")
      .setDescription("I cannot find the information on that message!\nThat message is either deleted before I could log it,\nor is 2 weeks old.")
      .setColor("#ff3636")
      .setFooter(`Message ID: ${message.id}`)
      set.send(error + fail)
    }
});

bot.on("emojiCreate", async function(emoji){
 
  let channel;
  
    let channels = await db.fetch(`channel_${emoji.guild.id}`)
    
    if(channels == null){
      return
    } else {
      channel = channels;
    }
	   
    var autoEmb = new Discord.RichEmbed()
        .setTitle("Logs | Added emoji!")
        .setDescription(`${emoji} **${emoji.name}**`)
        .setColor("#3654ff")
        .setFooter(`Emoji ID: ${emoji.id}`)
        .setTimestamp()
        var set = emoji.guild.channels.find(`name`, `${channel}`)
        
        set.send(autoEmb);
    
});

bot.on("emojiDelete", async function(emoji){

  let channel;
  
    let channels = await db.fetch(`channel_${emoji.guild.id}`)
    
    if(channels == null){
      return
    } else {
      channel = channels;
    }
	   
    var autoEmb = new Discord.RichEmbed()
        .setTitle("Logs | Emoji deleted!")
        .setDescription(`${emoji} **${emoji.name}**`)
        .setColor("#ff3636")
        .setFooter(`Emoji ID: ${emoji.id}`)
        .setTimestamp()
        var set = emoji.guild.channels.find(`name`, `${channel}`)
      
        set.send(autoEmb);
   
});

bot.on("emojiUpdate", async (oldEmoji, newEmoji) => {

    let channel;
  
    let channels = await db.fetch(`channel_${newEmoji.guild.id}`)
    
    if(channels == null){
      return
    } else {
      channel = channels;
    }
	   
    var autoEmb = new Discord.RichEmbed()
        .setTitle("Logs | Emoji updated!")
        .setDescription(`${newEmoji} ~~**${oldEmoji.name}**~~ -> **${newEmoji.name}**`)
        .setColor("#3654ff")
        .setFooter(`Emoji ID: ${newEmoji.id}`)
        .setTimestamp()
        var set = newEmoji.guild.channels.find(`name`, `${channel}`)
        set.send(autoEmb);
    
});

bot.on("messageUpdate", async function(oldMessage, newMessage){

  if(newMessage.author.bot) return
  let channel;
  
    let channels = await db.fetch(`channel_${newMessage.guild.id}`)
    
    if(channels == null){
      return
    } else {
      channel = channels;
    }
	   
    var autoEmb = new Discord.RichEmbed()
        .setAuthor(`Logs | Message edited!`, newMessage.author.displayAvatarURL)
        .setDescription(`**${newMessage.author.tag}**'s message was edited in ${newMessage.channel} | [Link](https://discordapp.com/channels/${newMessage.guild.id}/${newMessage.channel.id}/${newMessage.id})`)
        .addField(`Old Message`, `${oldMessage}`)
        .addField(`New Message`, `${newMessage}`)
        .setColor("#3654ff")
        .setFooter(`Message ID: ${newMessage.id}`)
        .setTimestamp()
        var set = newMessage.guild.channels.find(`name`, `${channel}`)
        
        set.send(autoEmb);

});

bot.on("roleCreate", async function(role){
    let channel;
  
    let channels = await db.fetch(`channel_${role.guild.id}`)
    
    if(channels == null){
      return
    } else {
      channel = channels;
    }
	   
    var autoEmb = new Discord.RichEmbed()
        .setTitle("Logs | Role created!")
        .setDescription(`${role} (${role.name})`)
        .setColor(role.color)
        .setFooter(`Role ID: ${role.id}`)
        .setTimestamp()
        var set = role.guild.channels.find(`name`, `${channel}`)
      
        set.send(autoEmb);

});

bot.on("roleUpdate", async function(oldRole, newRole){
    let channel;
    let channels = await db.fetch(`channel_${newRole.guild.id}`)
    if(channels == null){
      return
    } else {
      channel = channels;
    }
  
  if(oldRole.permissions == newRole.permissions && oldRole.name == newRole.name && oldRole.hexColor == newRole.hexColor){
    
    var autoEmb = new Discord.RichEmbed()
        .setTitle("Logs | Role edited!")
        .setDescription(`${oldRole}'s hierarchy has been edited!`)
        .setColor(newRole.color)
        .setFooter(`Role ID: ${newRole.id}`)
        .setTimestamp()
        var set = newRole.guild.channels.find(`name`, `${channel}`)
        set.send(autoEmb);
    
  } else {
  
    var autoEmb = new Discord.RichEmbed()
        .setTitle("Logs | Role edited!")
        .setDescription(`~~${oldRole.name}~~  ->  ${newRole}\n**Color**:\n~~${oldRole.hexColor}~~ -> **${newRole.hexColor}**`)
        .addField("Permissions", `[${oldRole.permissions}](https:\/\/discordapi.com/permissions.html#${oldRole.permissions}) -> [${newRole.permissions}](https://discordapi.com/permissions.html#${newRole.permissions})`)
        .setColor(newRole.color)
        .setFooter(`Role ID: ${newRole.id}`)
        .setTimestamp()
        var set = newRole.guild.channels.find(`name`, `${channel}`)
        set.send(autoEmb);
  }
});

bot.on("roleDelete", async function(role){
    let channel;
  
    let channels = await db.fetch(`channel_${role.guild.id}`)
    
    if(channels == null){
      return
    } else {
      channel = channels;
    }
	   
    var autoEmb = new Discord.RichEmbed()
        .setTitle("Logs | Role deleted!")
        .setDescription(`${role.name}`)
        .setColor(role.color)
        .setFooter(`Role ID: ${role.id}`)
        .setTimestamp()
        var set = role.guild.channels.find(`name`, `${channel}`)
        
        set.send(autoEmb);

});

bot.on("channelCreate", async function(Channel){
    
  if (Channel.type == "dm") return
  
  let channel;
  
    let channels = await db.fetch(`channel_${Channel.guild.id}`)
    
    if(channels == null){
      return// member.reply("setup a log channel first! Example: `l.logchannel [channel]` (Don't mention!)")
    } else {
      channel = channels;
    }
	   
    var autoEmb = new Discord.RichEmbed()
        .setTitle("Logs | New channel created!")
        .setDescription(`${Channel}`)
        .setColor("#3654ff")
        .setFooter(`Channel ID: ${Channel.id}`)
        .setTimestamp()
        var set = Channel.guild.channels.find(`name`, `${channel}`)
        
        set.send(autoEmb);

});

bot.on("channelUpdate", async function(oldChannel, newChannel){
  
  if(newChannel.type === "dm") return
  
    let channel;
  
    let channels = await db.fetch(`channel_${newChannel.guild.id}`)
    
    if(channels == null){
      return
    } else {
      channel = channels;
    }
	   
   if(oldChannel.topic == "" || oldChannel.topic == null) oldChannel.topic = "No topic set."
   if(newChannel.topic == "" || newChannel.topic == null) newChannel.topic = "No topic set."
  
  if(oldChannel.name !== newChannel.name || oldChannel.topic !== newChannel.topic){
    var autoEmb = new Discord.RichEmbed()
        .setTitle("Logs | Channel updated!")
        .setDescription(`~~${oldChannel.name}~~ -> ${newChannel}\n**Old Topic**\n${oldChannel.topic}\n\n**New Topic**\n${newChannel.topic}`)
        .setColor("#3654ff")
        .setFooter(`Channel ID: ${newChannel.id}`)
        .setTimestamp()
        var set = newChannel.guild.channels.find(`name`, `${channel}`)
        set.send(autoEmb);
  } else {
    var emb = new Discord.RichEmbed()
    .setTitle("Logs | Channel updated!")
    .setDescription(`${oldChannel}'s channel permissions has been updated!`)
    .setColor("#7289da")
    .setFooter(`Channel ID: ${newChannel.id}`)
    .setTimestamp()
    var set = newChannel.guild.channels.find(`name`, `${channel}`)
    set.send(emb)
  }
});

bot.on("channelDelete", async function(Channel){
    
  if (Channel.type == "dm") return
  
  let channel;
  
    let channels = await db.fetch(`channel_${Channel.guild.id}`)
    
    if(channels == null){
      return// member.reply("setup a log channel first! Example: `l.logchannel [channel]` (Don't mention!)")
    } else {
      channel = channels;
    }
	   
    var autoEmb = new Discord.RichEmbed()
        .setTitle("Logs | Channel deleted!")
        .setDescription(`#${Channel.name}`)
        .setColor("#3654ff")
        .setFooter(`Channel ID: ${Channel.id}`)
        .setTimestamp()
        var set = Channel.guild.channels.find(`name`, `${channel}`)
        
        set.send(autoEmb);

});

//Leuxitai v15

bot.login(token);