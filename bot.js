const http = require('http');
const express = require('express');
const app = express();

// Website
app.get("/", (request, response) => {    
  response.sendFile(__dirname + "/host/index.html");
  console.log(Date.now() + " Ping Received");
});

app.get("/plus", (req, res) => {
  res.sendFile(__dirname + "/host/plus.html");
  console.log("Someone visited the Leuxitai+ page!")
})
app.get("/commands", (req, res) => {
  res.sendFile(__dirname + "/host/commands.html")
})

app.get("/hosting", (request, response) => {
  console.log(Date.now() + " ping received!")
  response.sendFile(__dirname + "/host/hosting.html")
})

app.get("/changelogs", (request, response) => {
  console.log("Someone visited Changelogs!")
  response.sendFile(__dirname + "/host/changelogs.html");
})

app.listen(process.env.PORT);

const Discord = require("discord.js");
const { Client, Attachment, Collection } = require("discord.js");

const bot = new Discord.Client({
  disableEveryone: true,
  disableMentions: true
});
const alexa = require ("alexa-bot-api")
let ai = new alexa("aw2plm")

const { token, youtube } = require("./config.js");
const PREFIX = "l.";

const db = require("quick.db");
const ms = require("ms");

bot.cooldown = new Set();

const YT = require("simple-youtube-api");
bot.queue = new Map();
bot.yt = new YT(youtube);

const talkedRecently = new Set();

const usersMap = new Map();
const LIMIT = 5;
const TIME = 7;
const DIFF = 3000;

// Collections
bot.playing = new Set();
bot.dblevels = require("rex.db");
bot.dblevels.init("./levels");
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
  
    const argo = message.content
    .slice(PREFIX.length)
    .trim()
    .split(/ +/g);
  
  if (message.channel.type == "dm") {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
      message.channel.send("Commands are disabled in DMs!");
      return;
    } else
      ai.getReply(argo.join(" "))
      .then(reply => message.channel.send(reply));
      return;
  }
  
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
      if(l5) {
      message.member.addRole(l5.id)
       }
      }
      
      if(leveling == 10){
      if(l10){
      message.member.addRole(l10.id)
       }
      }
      
      if(leveling == 15){
      if(l15){
      message.member.addRole(l15.id)
       }
      }
      
      if(leveling == 20){
        if(l20){
      message.member.addRole(l20.id)
        }
      }
      
      if(leveling == 25){
        if(l25){
      message.member.addRole(l25.id)
        }
      }
      
      if(leveling == 30){
       if(l30){
      message.member.addRole(l30.id)
       }
      }
      
      if(leveling == 35){
        if(l35){
      message.member.addRole(l35.id)
        }
      }
      
      if(leveling == 40){
        if(l40){
      message.member.addRole(l40.id)
        }
      }
      
      if(leveling == 45){
        if(l45){
      message.member.addRole(l45.id)
        }
      }
      
      if(leveling == 50){
        if(l50){
      message.member.addRole(l50.id)
        }
      }
      
      if(leveling == 55){
        if(l55){
      message.member.addRole(l55.id)
        }
      }
      
      if(leveling == 60){
        if(l60){
      message.member.addRole(l60.id)
        }
      }
      
      if(leveling == 70){
        if(l70){
      message.member.addRole(l70.id)
        }
      }
      
      if(leveling == 80){
        if(l80){
      message.member.addRole(l80.id)
        }
      }
      
      if(leveling == 90){
        if(l90){
      message.member.addRole(l90.id)
        }
      }
      
      if(leveling == 100){
        if(l100){
      message.member.addRole(l100.id)
        }
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
  if (command) command.run(bot, message, args, play, handleVideo, Discord);

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

async function xp(message) {
    let coins = "<:leuxicoin:715493556810416238>";
    let togglexp;

      let togglesxp = await db.fetch(`togglexp_${message.guild.id}`);

      if (togglesxp == null) {
        togglexp = "off";
      } else {
        togglexp = togglesxp;
      }

    if (togglexp !== "on") return;
    if (bot.cooldown.has(message.author.id)) return;
 
    bot.cooldown.add(message.author.id)
    const randomXP = Math.floor(Math.random() * 14) + 1;
        await bot.dblevels.math(`xp_${message.guild.id}_${message.author.id}`,  "+", randomXP);
        let level = bot.dblevels.get(`level_${message.guild.id}_${message.author.id}`)
        let nexp = Math.floor(Math.pow(level / 0.1, 2));
        //let level = Math.floor(0.3 * Math.sqrt(xp));
        let exp = await bot.dblevels.get(`xp_${message.guild.id}_${message.author.id}`) || bot.dblevels.set(`level_${message.guild.id}_${message.author.id}`, 1);;
        if (exp > nexp) {
        if(level == 0) level = 1
            await bot.dblevels.math(`level_${message.guild.id}_${message.author.id}`, "+", 1);
            let newLevel = await bot.dblevels.get(`level_${message.guild.id}_${message.author.id}`)
            await db.add(`money_${message.guild.id}_${message.author.id}`, 200);
      message.reply(
        `you leveled up to ${newLevel}! GG!\n + ${coins} **200** LeuxiCoins to your wallet.`
        );
      }
 
  setTimeout(() => {
        bot.cooldown.delete(message.author.id);
  }, 45 * 1000);
}

async function handleVideo(video, message, voiceChannel, playlist = false) {
  const serverQueue = bot.queue.get(message.guild.id);
  console.log(video);

  const song = {
    thumbnail: video.thumbnails.high.url,
    id: video.id,
    channel: video.channel.title,
    duration: video.duration,
    title: video.raw.snippet.title,
    url: `https://www.youtube.com/watch?v=${video.id}`
  };
  if (!serverQueue) {
    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 10,
      playing: true
    };
    bot.queue.set(message.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(message.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.error(`I could not join the voice channel: ${error}`);
      bot.queue.delete(message.guild.id);
      return message.channel.send(`I could not join the voice channel: ${error}`);
    }
  } else {
    serverQueue.songs.push(song);
    console.log(serverQueue.songs);
    if (playlist) return undefined;
    var embed = new Discord.RichEmbed()
      .setAuthor("Song added to queue", message.author.displayAvatarURL)
      .setDescription(`**[${song.title}](${song.url})**`)
      .setThumbnail(song.thumbnail)
      .addField("Channel", `${song.channel}`)
      .addField(
        "Duration",
        `\`${song.duration.hours}:${song.duration.minutes}:${song.duration.seconds}\``
      )
      .setColor("#57a5ff")
      .setFooter(`${message.author.tag} added this song to the queue`);

    return message.channel.send(embed);
  }
  return undefined;
}

const ytdl = require("ytdl-core");
function play(guild, song) {
  const serverQueue = bot.queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    bot.queue.delete(guild.id);
    return;
  }
  console.log(serverQueue.songs);

  const dispatcher = serverQueue.connection
    .playStream(ytdl(song.url), { bitrate: 192000 /* 192kbps */ })
    .on("end", reason => {
      if (reason === "Stream is not generating quickly enough.");
      else console.log(reason);
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 10);

  var embed = new Discord.RichEmbed()
    .setAuthor("Playing now")
    .setThumbnail(song.thumbnail)
    .setDescription(`[${song.title}](${song.url})`)
    .addField("Channel", `${song.channel}`)
    .addField(
      "Duration",
      `\`${song.duration.hours}:${song.duration.minutes}:${song.duration.seconds}\``
    )
    .setColor("#456dff")
    .setFooter(`Current volume: ${serverQueue.volume} | Have fun listening!`);

  serverQueue.textChannel.send(embed);
}

//Leuxitai v16.5

bot.login(token);