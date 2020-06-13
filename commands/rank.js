const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true });
const db = require("quick.db");

const Canvacord = require("canvacord");
const canva = new Canvacord.Canvas();

module.exports = {
  name: "points",
  aliases: ["rank", "profile", "rk", "level"],
  description: "Points system for Leuxitai",
  run: async (bot, message, args) => {
    let togglexp;

    let togglesxp = await db.fetch(`togglexp_${message.guild.id}`);

    if (togglesxp == null) {
      togglexp = "off";
      //return message.channel.send("That command is not enabled!");
    } else {
      togglexp = togglesxp;
    }
    let rank = await db.fetch(`rank_${message.guild.id}`);

    if (rank == null) rank = "on";
    //if(togglexp !== 'on' || 'off') return
    if (togglexp !== "on")
      return message.channel.send("This command is not toggled on!");

    function getUserFromMention(mention) {
      if (!mention) return;

      if (mention.startsWith("<@") && mention.endsWith(">")) {
        mention = mention.slice(2, -1);

        if (mention.startsWith("!")) {
          mention = mention.slice(1);
        }

        return bot.users.get(mention);
      }
    }

    
    let needxp = 400;
    let user = getUserFromMention(args[0]) || message.author;
  
    if (rank !== "on") {
      const key = `${message.guild.id}-${user.id}`;
    const points = new Discord.RichEmbed()
    .setAuthor(`${message.author.username}'s profile`, message.guild.iconURL)
    .addField(`XP / Points`, bot.points.get(key, "points"), true)
    .addField(`Level`, bot.points.get(key, "level"), true)
    .addField(`Total XP`, bot.points.get(key, "totalpoints"), true)
    .setColor("#ff6352")
    .setThumbnail(message.author.displayAvatarURL)
    .setFooter("Cooldown: 45 seconds")
    .setTimestamp()
    message.channel.send(points);
    } else {
      const key = `${message.guild.id}-${user.id}`;
      let avatar = await canva.circle(user.avatarURL);
      let card = await canva.rank({
        username: user.username,
        discrim: user.discriminator,
        level: bot.points.get(key, "level"),
        rank: "N᜵A",
        neededXP: 500,
        currentXP: bot.points.get(key, "points"),
        avatarURL: avatar
      });
      message.channel.sendFile(card, "rank.png");
    }
  }
};
