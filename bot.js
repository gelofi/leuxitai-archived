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
  http.get(`http://leux16.glitch.me//`);
}, 2000);

const bot = new Discord.Client({
  disableEveryone: true,
  disableMentions: true
});

const { token } = require("./config.js");
const PREFIX = "l.";

const db = require("quick.db");
const ms = require("ms");

bot.cooldown = new Discord.Collection();
bot.config = {
    cooldown: 45000
};
const talkedRecently = new Set();

const usersMap = new Map();
const LIMIT = 5;
const TIME = 7;
const DIFF = 3000;

// Collections
bot.dblevels = require("rex.db");
bot.dblevels.init("./levels")
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
  console.log("Don't forget to modify stats.js !");
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

  if (message.guild) {
    //Fixes the bot bug
    if (message.author.bot) return;

    let msg = await db.fetch(`msgCounter_${message.guild.id}`);
    if (msg == null) msg = LIMIT;

    let msgSec = await db.fetch(`msgSec_${message.guild.id}`);
    if (msgSec == null) msgSec === TIME;

    if (usersMap.has(message.author.id)) {
      const userData = usersMap.get(message.author.id);
      const { lastMessage, timer } = userData;
      const difference =
        message.createdTimestamp - lastMessage.createdTimestamp;
      let msgCount = userData.msgCount;
      console.log(difference);
      if (difference > DIFF) {
        clearTimeout(timer);
        console.log("Cleared timeout");
        userData.msgCount = 1;
        userData.lastMessage = message;
        userData.timer = setTimeout(() => {
          usersMap.delete(message.author.id);
          console.log("Removed from RESET.");
        }, msgSec * 1000);
        usersMap.set(message.author.id, userData);
      } else {
        ++msgCount;
        if (parseInt(msgCount) === msg) {
          let antispam = await db.fetch(`antispam_${message.guild.id}`);
          if (antispam == null) antispam = "off";
          if (antispam !== "on") return;

          let channel = await db.fetch(`channel_${message.guild.id}`);

          var log = new Discord.RichEmbed()
            .setTitle("Logs | Spamming!")
            .setDescription(
              `${message.author} tried to spam in ${message.channel}.\n\n**Leuxitai** took care of it and purged **${msg}** messages.`
            )
            .setColor("#1a40a1")
            .setFooter(`Spammer ID: ${message.author.id}`)
            .setTimestamp();
          var set = message.guild.channels.find(`name`, `${channel}`);
          set.send(log);
          message.channel.bulkDelete(msg);
          message.reply("please don't spam!");
        } else {
          userData.msgCount = msgCount;
          usersMap.set(message.author.id, userData);
        }
      }
    } else {
      let fn = setTimeout(() => {
        usersMap.delete(message.author.id);
        console.log("Removed from map.");
      }, msgSec * 1000);
      usersMap.set(message.author.id, {
        msgCount: 1,
        lastMessage: message,
        timer: fn
      });
    }
  }

  //Fixes DM bugs
  if (message.channel.type == "dm") {
    if (message.content.startsWith(PREFIX))
      return message.author.send("You dared to try!");
    return;
  }

  const { default_prefix } = require("./config.js");
  let prefix;
  let prefixes = await db.fetch(`prefix_${message.guild.id}`);
  if (prefixes == null) {
    prefix = default_prefix;
  } else {
    prefix = prefixes;
  }

  //log channel
  let channel;

  let channels = await db.fetch(`channel_${message.guild.id}`);

  if (channels == null) {
    channel = message.channel.name;
  } else {
    channel = channels;
  }

  if (message.content.startsWith(`<@698529160938782720>`)) {
    message.channel.send(
      `My prefix here is \`${prefix}\`\nChange my prefix using \`${prefix}setprefix\`.`
    );
  }

  if (message.guild) {
    let swearWords = await db.fetch(`bannedwords_${message.guild.id}`);

    if (swearWords == null) swearWords = ["‽"];

    if (swearWords.some(w => message.content.toLowerCase().includes(w))) {
      message.delete();
      message.reply("watch your mouth! You said a banned word!");
    }
  }

  //Fixes the prefix bug
  if (!message.content.startsWith(prefix)) return;

  if (talkedRecently.has(message.author.id)) return;

  talkedRecently.add(message.author.id);
  setTimeout(() => {
    // Removes the user from the set after 0.8 seconds
    talkedRecently.delete(message.author.id);
  }, 800);

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);

  // If message.member is uncached, cache it.
  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  // Get the command
  let command = bot.commands.get(cmd);
  // If none is found, try to find it by alias
  if (!command) command = bot.commands.get(bot.aliases.get(cmd));

  // If a command is finally found, run the command
  if (command) command.run(bot, message, args);

  // Leveling
  if (message.guild) {
    
    if(message.author.bot) return;
    
    xp(message);
    
      let L5 = await db.fetch(`level5_${message.guild.id}`)
      let L10 = await db.fetch(`level10_${message.guild.id}`)
      let L15 = await db.fetch(`level15_${message.guild.id}`)
      let L20 = await db.fetch(`level20_${message.guild.id}`)
      let L25 = await db.fetch(`level25_${message.guild.id}`)
      let L30 = await db.fetch(`level30_${message.guild.id}`)
      let L35 = await db.fetch(`level35_${message.guild.id}`)
      let L40 = await db.fetch(`level40_${message.guild.id}`)
      let L45 = await db.fetch(`level45_${message.guild.id}`)
      let L50 = await db.fetch(`level50_${message.guild.id}`)
      let L55 = await db.fetch(`level55_${message.guild.id}`)
      let L60 = await db.fetch(`level60_${message.guild.id}`)
      let L70 = await db.fetch(`level70_${message.guild.id}`)
      let L80 = await db.fetch(`level80_${message.guild.id}`)
      let L90 = await db.fetch(`level90_${message.guild.id}`)
      let L100 = await db.fetch(`level100_${message.guild.id}`)

      //Roles Level
      let l5 = message.guild.roles.find(role => role.name === `${L5}`)
      let l10 = message.guild.roles.find(role => role.name === `${L10}`)
      let l15 = message.guild.roles.find(role => role.name === `${L15}`)
      let l20 = message.guild.roles.find(role => role.name === `${L20}`)
      let l25 = message.guild.roles.find(role => role.name === `${L25}`)
      let l30 = message.guild.roles.find(role => role.name === `${L30}`)
      let l35 = message.guild.roles.find(role => role.name === `${L35}`)
      let l40 = message.guild.roles.find(role => role.name === `${L40}`)
      let l45 = message.guild.roles.find(role => role.name === `${L45}`)
      let l50 = message.guild.roles.find(role => role.name === `${L50}`)
      let l55 = message.guild.roles.find(role => role.name === `${L55}`)
      let l60 = message.guild.roles.find(role => role.name === `${L60}`)
      let l70 = message.guild.roles.find(role => role.name === `${L70}`)
      let l80 = message.guild.roles.find(role => role.name === `${L80}`)
      let l90 = message.guild.roles.find(role => role.name === `${L90}`)
      let l100 = message.guild.roles.find(role => role.name === `${L100}`)

      let leveling = bot.dblevels.get(`level_${message.guild.id}_${message.author.id}`)
      
      if(leveling == 5){
        if(L5 == null) return
        if(!l5) return
      message.member.addRole(l5.id)
      }
      
      if(leveling == 10){
        if(L10 == null) return
        if(!l10) return
      message.member.addRole(l10.id)
      }
      
      if(leveling == 15){
        if(L15 == null) return
        if(!l15) return
      message.member.addRole(l15.id)
      }
      
      if(leveling == 20){
        if(L20 == null) return
        if(!l20) return
      message.member.addRole(l20.id)
      }
      
      if(leveling == 25){
        if(L25 == null) return
        if(!l25) return
      message.member.addRole(l25.id)
      }
      
      if(leveling == 30){
        if(L30 == null) return
        if(!l30) return
      message.member.addRole(l30.id)
      }
      
      if(leveling == 35){
        if(L35 == null) return
        if(!l35) return
      message.member.addRole(l35.id)
      }
      
      if(leveling == 40){
        if(L40 == null) return
        if(!l40) return
      message.member.addRole(l40.id)
      }
      
      if(leveling == 45){
        if(L45 == null) return
        if(!l45) return
      message.member.addRole(l45.id)
      }
      
      if(leveling == 50){
        if(L50 == null) return
        if(!l50) return
      message.member.addRole(l50.id)
      }
      
      if(leveling == 55){
        if(L55 == null) return
        if(!l55) return
      message.member.addRole(l55.id)
      }
      
      if(leveling == 60){
        if(L60 == null) return
        if(!l60) return
      message.member.addRole(l60.id)
      }
      
      if(leveling == 70){
        if(L70 == null) return
        if(!l70) return
      message.member.addRole(l70.id)
      }
      
      if(leveling == 80){
        if(L80 == null) return
        if(!l80) return
      message.member.addRole(l80.id)
      }
      
      if(leveling == 90){
        if(L90 == null) return
        if(!l90) return
      message.member.addRole(l90.id)
      }
      
      if(leveling == 100){
        if(L100 == null) return
        if(!l100) return
      message.member.addRole(l100.id)
      }
      
      
    }
});

bot.on("guildMemberAdd", async function(member) {
  let mem = member.toString();
  const ms = require("ms");

  let channel;

  let channels = await db.fetch(`channel_${member.guild.id}`);

  if (channels == null) {
    return;
  } else {
    channel = channels;
  }

  var autoEmb = new Discord.RichEmbed()
    .setTitle("Logs | New member!")
    .setThumbnail(member.user.displayAvatarURL)
    .setDescription(`${mem} just joined our server!`)
    .setColor("#3654ff")
    .setFooter(`ID: ${member.id}`)
    .setTimestamp();
  var set = member.guild.channels.find(`name`, `${channel}`);
  set.send(autoEmb);

  let timedrole1;

  let timedroles1 = await db.fetch(`timedrole1_${member.guild.id}`);

  timedrole1 = timedroles1;

  let timedrole1time;

  let timedroles1time = await db.fetch(`timedrole1time_${member.guild.id}`);

  timedrole1time = timedroles1time;

  let tr2 = await db.fetch(`timedrole2_${member.guild.id}`);
  let tr2t = await db.fetch(`timedrole2time_${member.guild.id}`);

  let tr3 = await db.fetch(`timedrole3_${member.guild.id}`);
  let tr3t = await db.fetch(`timedrole3time_${member.guild.id}`);

  let autorole = member.guild.roles.find(r => r.name === `${timedrole1}`);
  let timerole = member.guild.roles.find(r => r.name === `${tr2}`);
  let timedrole = member.guild.roles.find(r => r.name === `${tr3}`);

  if (timedrole1 !== null && tr2 == null) {
    setTimeout(function() {
      member.addRole(autorole);

      var addEmb = new Discord.RichEmbed()
        .setTitle("Logs | Autorole given!")
        .setThumbnail(member.user.displayAvatarURL)
        .setDescription(
          `${mem} gained the role **${timedrole1}** after **${ms(
            timedrole1time
          )}**`
        )
        .setColor("#3654ff")
        .setFooter(`ID: ${member.id}`)
        .setTimestamp();
      var set = member.guild.channels.find(`name`, `${channel}`);
      set.send(addEmb);
    }, timedrole1time);
  }

  if (timedrole1 !== null && tr2 !== null) {
    setTimeout(function() {
      member.addRole(autorole);
      var addEmb = new Discord.RichEmbed()
        .setTitle("Logs | Autorole given!")
        .setThumbnail(member.user.displayAvatarURL)
        .setDescription(
          `${mem} gained the role **${timedrole1}** after **${ms(
            timedrole1time
          )}**`
        )
        .setColor("#3654ff")
        .setFooter(`ID: ${member.id}`)
        .setTimestamp();
      var set = member.guild.channels.find(`name`, `${channel}`);
      set.send(addEmb);
    }, timedrole1time);

    setTimeout(function() {
      member.addRole(timerole);
      var addEmb = new Discord.RichEmbed()
        .setTitle("Logs | Autorole given!")
        .setThumbnail(member.user.displayAvatarURL)
        .setDescription(
          `${mem} gained the role **${tr2}** after **${ms(tr2t)}**`
        )
        .setColor("#3654ff")
        .setFooter(`ID: ${member.id}`)
        .setTimestamp();
      var set = member.guild.channels.find(`name`, `${channel}`);
      set.send(addEmb);
    }, tr2t);
  }

  if (timedrole1 !== null && tr2 !== null && tr3 !== null) {
    setTimeout(function() {
      member.addRole(autorole);
      var addEmb = new Discord.RichEmbed()
        .setTitle("Logs | Autorole given!")
        .setThumbnail(member.user.displayAvatarURL)
        .setDescription(
          `${mem} gained the role **${timedrole1}** after **${ms(
            timedrole1time
          )}**`
        )
        .setColor("#3654ff")
        .setFooter(`ID: ${member.id}`)
        .setTimestamp();
      var set = member.guild.channels.find(`name`, `${channel}`);
      set.send(addEmb);
    }, timedrole1time);

    setTimeout(function() {
      member.addRole(timerole);
      var addEmb = new Discord.RichEmbed()
        .setTitle("Logs | Autorole given!")
        .setThumbnail(member.user.displayAvatarURL)
        .setDescription(
          `${mem} gained the role **${tr2}** after **${ms(tr2t)}**`
        )
        .setColor("#3654ff")
        .setFooter(`ID: ${member.id}`)
        .setTimestamp();
      var set = member.guild.channels.find(`name`, `${channel}`);
      set.send(addEmb);
    }, tr2t);

    setTimeout(function() {
      member.addRole(timedrole);
      var addEmb = new Discord.RichEmbed()
        .setTitle("Logs | Autorole given!")
        .setThumbnail(member.user.displayAvatarURL)
        .setDescription(
          `${mem} gained the role **${tr3}** after **${ms(tr3t)}**`
        )
        .setColor("#3654ff")
        .setFooter(`ID: ${member.id}`)
        .setTimestamp();
      var set = member.guild.channels.find(`name`, `${channel}`);
      set.send(addEmb);
    }, tr2t);
  }
});

bot.on("guildMemberRemove", async function(member) {
  let channel;

  let channels = await db.fetch(`channel_${member.guild.id}`);

  if (channels == null) {
    return;
  } else {
    channel = channels;
  }

  let mem = member.toString();
  var autoEmb = new Discord.RichEmbed()
    .setTitle("Logs | Member left!")
    .setThumbnail(member.user.displayAvatarURL)
    .setDescription(`${mem} just left our server :(`)
    .setColor("#3654ff")
    .setFooter(`ID: ${member.id}`)
    .setTimestamp();
  var set = member.guild.channels.find(`name`, `${channel}`);
  set.send(autoEmb);
});

bot.on("messageDelete", async function(message) {
  let channel;

  let channels = await db.fetch(`channel_${message.guild.id}`);

  if (channels == null) {
    return;
  } else {
    channel = channels;
  }
  try {
    var autoEmb = new Discord.RichEmbed()
      .setAuthor(
        `${message.author.tag} | Message deleted!`,
        message.author.displayAvatarURL
      )
      .setDescription(`${message}\n\nChannel: ${message.channel}`)
      .setColor("#3654ff")
      .setFooter(`Author ID: ${message.author.id}\nMessage ID: ${message.id}`)
      .setTimestamp();
    var set = message.guild.channels.find(`name`, `${channel}`);
    set.send(autoEmb);
  } catch (error) {
    var fail = new Discord.RichEmbed()
      .setAuthor("Logs | Message deleted!")
      .setDescription(
        "I cannot find the information on that message!\nThat message is either deleted before I could log it,\nor is 2 weeks old."
      )
      .setColor("#ff3636")
      .setFooter(`Message ID: ${message.id}`);
    set.send(error + fail);
  }
});

bot.on("emojiCreate", async function(emoji) {
  let channel;

  let channels = await db.fetch(`channel_${emoji.guild.id}`);

  if (channels == null) {
    return;
  } else {
    channel = channels;
  }

  var autoEmb = new Discord.RichEmbed()
    .setTitle("Logs | Added emoji!")
    .setDescription(`${emoji} **${emoji.name}**`)
    .setColor("#3654ff")
    .setFooter(`Emoji ID: ${emoji.id}`)
    .setTimestamp();
  var set = emoji.guild.channels.find(`name`, `${channel}`);

  set.send(autoEmb);
});

bot.on("emojiDelete", async function(emoji) {
  let channel;

  let channels = await db.fetch(`channel_${emoji.guild.id}`);

  if (channels == null) {
    return;
  } else {
    channel = channels;
  }

  var autoEmb = new Discord.RichEmbed()
    .setTitle("Logs | Emoji deleted!")
    .setDescription(`${emoji} **${emoji.name}**`)
    .setColor("#ff3636")
    .setFooter(`Emoji ID: ${emoji.id}`)
    .setTimestamp();
  var set = emoji.guild.channels.find(`name`, `${channel}`);

  set.send(autoEmb);
});

bot.on("emojiUpdate", async (oldEmoji, newEmoji) => {
  let channel;

  let channels = await db.fetch(`channel_${newEmoji.guild.id}`);

  if (channels == null) {
    return;
  } else {
    channel = channels;
  }

  var autoEmb = new Discord.RichEmbed()
    .setTitle("Logs | Emoji updated!")
    .setDescription(
      `${newEmoji} ~~**${oldEmoji.name}**~~ -> **${newEmoji.name}**`
    )
    .setColor("#3654ff")
    .setFooter(`Emoji ID: ${newEmoji.id}`)
    .setTimestamp();
  var set = newEmoji.guild.channels.find(`name`, `${channel}`);
  set.send(autoEmb);
});

bot.on("messageUpdate", async function(oldMessage, newMessage) {
  if (newMessage.author.bot) return;
  let channel;

  let channels = await db.fetch(`channel_${oldMessage.guild.id}`);

  if (channels == null) {
    return;
  } else {
    channel = channels;
  }

  var autoEmb = new Discord.RichEmbed()
    .setAuthor(`Logs | Message edited!`, newMessage.author.displayAvatarURL)
    .setDescription(
      `**${newMessage.author.tag}**'s message was edited in ${newMessage.channel} | [Link](https://discordapp.com/channels/${newMessage.guild.id}/${newMessage.channel.id}/${newMessage.id})`
    )
    .addField(`Old Message`, `${oldMessage}`)
    .addField(`New Message`, `${newMessage}`)
    .setColor("#3654ff")
    .setFooter(`Message ID: ${newMessage.id}`)
    .setTimestamp();
  var set = newMessage.guild.channels.find(`name`, `${channel}`);
  set.send(autoEmb);
});

bot.on("roleCreate", async function(role) {
  let channel;

  let channels = await db.fetch(`channel_${role.guild.id}`);

  if (channels == null) {
    return;
  } else {
    channel = channels;
  }

  var autoEmb = new Discord.RichEmbed()
    .setTitle("Logs | Role created!")
    .setDescription(`${role} (${role.name})`)
    .setColor(role.color)
    .setFooter(`Role ID: ${role.id}`)
    .setTimestamp();
  var set = role.guild.channels.find(`name`, `${channel}`);

  set.send(autoEmb);
});

bot.on("roleUpdate", async function(oldRole, newRole) {
  let channel;
  let channels = await db.fetch(`channel_${newRole.guild.id}`);
  if (channels == null) {
    return;
  } else {
    channel = channels;
  }

  if (
    oldRole.permissions == newRole.permissions &&
    oldRole.name == newRole.name &&
    oldRole.hexColor == newRole.hexColor
  ) {
    var autoEmb = new Discord.RichEmbed()
      .setTitle("Logs | Role edited!")
      .setDescription(`${oldRole}'s hierarchy has been edited!`)
      .setColor(newRole.color)
      .setFooter(`Role ID: ${newRole.id}`)
      .setTimestamp();
    var set = newRole.guild.channels.find(`name`, `${channel}`);
    set.send(autoEmb);
  } else {
    var autoEmb = new Discord.RichEmbed()
      .setTitle("Logs | Role edited!")
      .setDescription(
        `~~${oldRole.name}~~  ->  ${newRole}\n**Color**:\n~~${oldRole.hexColor}~~ -> **${newRole.hexColor}**`
      )
      .addField(
        "Permissions",
        `[${oldRole.permissions}](https:\/\/discordapi.com/permissions.html#${oldRole.permissions}) -> [${newRole.permissions}](https://discordapi.com/permissions.html#${newRole.permissions})`
      )
      .setColor(newRole.color)
      .setFooter(`Role ID: ${newRole.id}`)
      .setTimestamp();
    var set = newRole.guild.channels.find(`name`, `${channel}`);
    set.send(autoEmb);
  }
});

bot.on("roleDelete", async function(role) {
  let channel;

  let channels = await db.fetch(`channel_${role.guild.id}`);

  if (channels == null) {
    return;
  } else {
    channel = channels;
  }

  var autoEmb = new Discord.RichEmbed()
    .setTitle("Logs | Role deleted!")
    .setDescription(`${role.name}`)
    .setColor(role.color)
    .setFooter(`Role ID: ${role.id}`)
    .setTimestamp();
  var set = role.guild.channels.find(`name`, `${channel}`);

  set.send(autoEmb);
});

bot.on("channelCreate", async function(Channel) {
  if (Channel.type == "dm") return;

  let channel;

  let channels = await db.fetch(`channel_${Channel.guild.id}`);

  if (channels == null) {
    return; // member.reply("setup a log channel first! Example: `l.logchannel [channel]` (Don't mention!)")
  } else {
    channel = channels;
  }

  var autoEmb = new Discord.RichEmbed()
    .setTitle("Logs | New channel created!")
    .setDescription(`${Channel}`)
    .setColor("#3654ff")
    .setFooter(`Channel ID: ${Channel.id}`)
    .setTimestamp();
  var set = Channel.guild.channels.find(`name`, `${channel}`);

  set.send(autoEmb);
});

bot.on("channelUpdate", async function(oldChannel, newChannel) {
  if (newChannel.type === "dm") return;

  let channel;

  let channels = await db.fetch(`channel_${newChannel.guild.id}`);

  if (channels == null) {
    return;
  } else {
    channel = channels;
  }

  if (oldChannel.topic == "" || oldChannel.topic == null)
    oldChannel.topic = "No topic set.";
  if (newChannel.topic == "" || newChannel.topic == null)
    newChannel.topic = "No topic set.";

  if (
    oldChannel.name !== newChannel.name ||
    oldChannel.topic !== newChannel.topic
  ) {
    var autoEmb = new Discord.RichEmbed()
      .setTitle("Logs | Channel updated!")
      .setDescription(
        `~~${oldChannel.name}~~ -> ${newChannel}\n**Old Topic**\n${oldChannel.topic}\n\n**New Topic**\n${newChannel.topic}`
      )
      .setColor("#3654ff")
      .setFooter(`Channel ID: ${newChannel.id}`)
      .setTimestamp();
    var set = newChannel.guild.channels.find(`name`, `${channel}`);
    set.send(autoEmb);
  } else {
    var emb = new Discord.RichEmbed()
      .setTitle("Logs | Channel updated!")
      .setDescription(`${oldChannel}'s channel permissions has been updated!`)
      .setColor("#7289da")
      .setFooter(`Channel ID: ${newChannel.id}`)
      .setTimestamp();
    var set = newChannel.guild.channels.find(`name`, `${channel}`);
    set.send(emb);
  }
});

bot.on("channelDelete", async function(Channel) {
  if (Channel.type == "dm") return;

  let channel;

  let channels = await db.fetch(`channel_${Channel.guild.id}`);

  if (channels == null) {
    return; // member.reply("setup a log channel first! Example: `l.logchannel [channel]` (Don't mention!)")
  } else {
    channel = channels;
  }

  var autoEmb = new Discord.RichEmbed()
    .setTitle("Logs | Channel deleted!")
    .setDescription(`#${Channel.name}`)
    .setColor("#3654ff")
    .setFooter(`Channel ID: ${Channel.id}`)
    .setTimestamp();
  var set = Channel.guild.channels.find(`name`, `${channel}`);

  set.send(autoEmb);
});

function xp(message) {
    let coins = "<:leuxicoin:715493556810416238>";
    if (!bot.cooldown.has(`${message.author.id}`) || !(Date.now() - bot.cooldown.get(`${message.author.id}`) > bot.config.cooldown)) {
        let xp = bot.dblevels.math(`xp_${message.guild.id}_${message.author.id}`,  "+", 1);
        let level = Math.floor(0.3 * Math.sqrt(xp));
        let lvl = bot.dblevels.get(`level_${message.guild.id}_${message.author.id}`) || bot.dblevels.set(`level_${message.guild.id}_${message.author.id}`, 1);;
        if (level > lvl) {
            let newLevel = bot.dblevels.set(`level_${message.guild.id}_${message.author.id}`, level);
            db.add(`money_${message.guild.id}_${message.author.id}`, 200);
      message.reply(
        `you leveled up to ${newLevel}! GG!\n + ${coins} **200** LeuxiCoins to your wallet.`
      );
        }
        bot.cooldown.set(`${message.author.id}`, Date.now());
    }
}

//Leuxitai v16

bot.login(token);
