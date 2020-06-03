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
const leveling = require("discord-leveling");
let cooldown = new Set();
let cdseconds = 40;

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

bot.on("ready", () => {
  // regular activity
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

  //Fixes DM bugs
  if (message.channel.type == "dm"){
    
  if (message.content.startsWith(PREFIX)) return message.author.send("You dared to try!")
      
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
  
  //Fixes the prefix bug
  if (!message.content.startsWith(prefix)) return;

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
  
  const ranXp = Math.floor(Math.random() * 14) + 1;
    
  var profile = await leveling.Fetch(message.author.id)
  
  if(cooldown.has(message.author.id)) return
  if(message.author.bot) return
  leveling.AddXp(message.author.id, ranXp)
    
  //if(!message.member.hasPermission("ADMINISTRATOR")){
  cooldown.add(message.author.id)
    
  if (profile.xp + 10 > 500) {
  
    let togglexp;
  
    let togglesxp = await db.fetch(`togglexp_${message.guild.id}`)
    
    if(togglesxp == null){
      togglexp = 'on';
      //return message.channel.send("That command is not enabled!");
    } else {
      togglexp = togglesxp;
    }
      
    if(togglexp !== 'on') return
    if (profile.xp + 10 > 100) {
    let coins = "<:leuxicoin:715493556810416238>";
  
    let user = message.author;
      let amount = 200;
      
    await leveling.AddLevel(message.author.id, 1)
    await leveling.SetXp(message.author.id, 0)
    db.add(`money_${message.guild.id}_${user.id}`, amount)
    message.reply(`you leveled up to ${profile.level + 1}! GG!\n + ${coins} **200** LeuxiCoins to your wallet.`)
    }
    }
  }
  
  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdseconds * 1000)
  
});

bot.on("guildMemberAdd", async function(member) {
	
     let mem = member.toString()
	   const db = require("quick.db")
	   const ms = require("ms");

	  let channel;
  
    let channels = await db.fetch(`channel_${member.guild.id}`)
    
    if(channels == null){
      return //member.reply("setup a log channel first! Example: `l.logchannel [channel]` (Don't mention!)")
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
    
  
    let autorole = member.guild.roles.find(r => r.name === `${timedrole1}`)
    let timerole = member.guild.roles.find(r => r.name === `${tr2}`)
    
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

});

bot.on("guildMemberRemove", async function(member) {
  const db = require("quick.db")
  
  let channel;
  
    let channels = await db.fetch(`channel_${member.guild.id}`)
    
    if(channels == null){
      return// member.reply("setup a log channel first! Example: `l.logchannel [channel]` (Don't mention!)")
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

bot.login(token);