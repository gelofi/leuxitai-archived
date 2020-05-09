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

const bot = new Discord.Client({ disableEveryone: true });
const token = "Njk4NTI5MTYwOTM4NzgyNzIw.XpHNig.pRCnuawqLABbhGAevwPMjwzyOd0";
const PREFIX = "l.";

//For command handling chosen commands
const fs = require("fs");
bot.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands/")
  .filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
}

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
  const args = message.content
    .slice(PREFIX.length)
    .trim()
    .split(/ +/g);

  //Fixes the bot bug
  if (message.author.bot) return;

  //Fixes the prefix bug
  if (!message.content.startsWith(PREFIX)) return;

  //Fixes DM bugs
  if (message.channel.type == "dm") {
    message.author.send("Commands are disabled in DMs!");
    return;
  }

  switch (args[0]) {
    //l.info
    case "info":
    case "information":
      bot.commands.get("info").run(bot, message, args);
      break;

    //l.help
    case "help":
    case "h":
    case "manual":
      bot.commands.get("help").run(bot, message, args);
      break;

    //l.support
    case "support":
      bot.commands.get("support").run(bot, message, args);
      break;

    //l.topic
    case "topic":
      bot.commands.get("topic").run(message, args);
      break;

    //l.8ball
    case "8ball":
    case "8b":
      bot.commands.get("ball").run(message, args);
      break;

    //l.ping
    case "ping":
      message.channel.send(`Pong! -${Math.round(bot.ping)}ms-`);
      break;

    //l.prefix
    case "prefix":
      message.channel.send(
        "You cannot change my prefix yet! My default prefix is `l.` (letter L)"
      );
      break;

    //l.purge
    case "purge":
    case "delete":
      bot.commands.get("purge").run(message, args);
      break;

    //l.invite
    case "invite":
      bot.commands.get("invite").run(bot, message, args);
      break;

    //l.coinflip
    case "coinflip":
      bot.commands.get("coinflip").run(message, args);
      break;

    // l.avatar
    case "avatar":
      bot.commands.get("avatar").run(bot, message, args);
      break;

    //l.kick
    case "kick":
      bot.commands.get("kick").run(message, args);
      break;

    //l.ban
    case "ban":
    case "wee":
      bot.commands.get("ban").run(message, args);
      break;

    //l.poll
    case "poll":
      bot.commands.get("poll").run(message, args);
      break;

    //l.dog
    case "dog":
    case 'doggo':
    case 'puppy':
      bot.commands.get("dog").run(bot, message, args);
      break;

    //l.say
    case "say":
      bot.commands.get("say").run(message, args);
      break;

    //l.cat
    case "cat":
    case 'catto':
      bot.commands.get("cat").run(bot, message, args);
      break;

    //l.meme
    case "meme":
      bot.commands.get("meme").run(message, args);
      break;

    //l.anime
    case "anime":
      bot.commands.get("anime").run(message, args);
      break;

    //l.hug
    case "hug":
      bot.commands.get("hug").run(message, args);
      break;

    //l.weather
    case "weather":
      bot.commands.get("weather").run(message, args);
      break;

    //l.wisdom
    case "wisdom":
      bot.commands.get("wisdom").run(message, args);
      break;

    case "coronavirus":
    case "covid":
      bot.commands.get("corona").run(message, args);
      break;

    case "chlog":
    case "changelog":
    case "changelogs":
      bot.commands.get("changelogs").run(bot, message, args);
      break;

    case "reddit":
    case "redditfetch":
      bot.commands.get("redditfetch").run(bot, message, args);
    break;
  }
});
  const Enmap = require("enmap");
  bot.points = new Enmap({name: "points"});
bot.on('message', async message => {
  if (message.guild) {
    // Let's simplify the `key` part of this.
    const key = `${message.guild.id}-${message.author.id}`;
    bot.points.ensure(key, {
      user: message.author.id,
      guild: message.guild.id,
      points: 0,
      level: 1
    });
    bot.points.inc(key, "points");
    const curLevel = Math.floor(0.1 * Math.sqrt(bot.points.get(key, "points")));
    if (bot.points.get(key, "level") < curLevel) {
    message.reply(`You've leveled up to level **${curLevel}**! GG!`);
      bot.points.set(key, curLevel, "level");
}
  }
 const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
 const command = args.shift().toLowerCase();
  if (command === 'points'){
    const key = `${message.guild.id}-${message.author.id}`;
    const points = new Discord.RichEmbed()
    .setAuthor(`${message.author.tag}`, message.guild.iconURL)
    .addField(`XP / Points`, bot.points.get(key, "points"))
    .addField(`Level`, bot.points.get(key, "level"))
    .setColor("#ff6352")
    .setThumbnail(message.author.displayAvatarURL)
    .setFooter("No cooldowns yet.")
    .setTimestamp()
   // return message.channel.send(`You currently have ${bot.points.get(key, "points")} points, and level ${bot.points.get(key, "level")}!`);
    message.channel.send(points);
  }
  if (command === 'leaderboard') {
  // Get a filtered list (for this guild only), and convert to an array while we're at it.
  const filtered = bot.points.filter( p => p.guild === message.guild.id ).array();

  // Sort it to get the top results... well... at the top. Y'know.
  const sorted = filtered.sort((a, b) => b.points - a.points);

  // Slice it, dice it, get the top 10 of it!
  const top10 = sorted.splice(0, 10);

  // Now shake it and show it! (as a nice embed, too!)
  const embed = new Discord.RichEmbed()
    .setAuthor("Leaderboard", message.author.displayAvatarURL)
    .setDescription("Our top 10 points leaders!")
    .setColor(0x00AE86);
  for(const data of top10) {
    embed.addField(`${bot.users.get(data.user).tag}`, `${data.points} points (level ${data.level})`);
  }
  message.channel.send(embed);
  }
       
    if(command === "give") {
    // Limited to guild owner - adjust to your own preference!
    if(!message.member.hasPermission("ADMINISTRATOR"))
      return message.reply("you do not have enough permissions to do this command!");

    const user = message.mentions.users.first()
    if(!user) return message.reply("mention someone or put their ID!");

    const pointsToAdd = parseInt(args[1], 10);
    if(!pointsToAdd) 
      return message.reply("put an amount of XP to give!")

    // Ensure there is a points entry for this user.
    bot.points.ensure(`${message.guild.id}-${user.id}`, {
      user: message.author.id,
      guild: message.guild.id,
      points: 0,
      level: 1
    });

    // Get their current points.
    let userPoints = bot.points.get(`${message.guild.id}-${user.id}`, "points");
    userPoints += pointsToAdd;
    
    // And we save it!
    bot.points.set(`${message.guild.id}-${user.id}`, userPoints, "points")

    message.channel.send(`${user.tag} has received ${pointsToAdd} points, and now has ${userPoints} points.`);
  }
});

bot.login(token);