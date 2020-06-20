const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true });
const db = require("quick.db");
const abbr = require("number-abbreviate")
var str = require("str_shorten")

const Canvacord = require("@fizuku/canvacord");
const canva = new Canvacord();

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

  let user = getUserFromMention(args[0]) || message.author;
    
  let level = bot.dblevels.get(`level_${message.guild.id}_${user.id}`) || 1;
  level = level.toString();
  let exp = bot.dblevels.get(`xp_${message.guild.id}_${user.id}`) || 1;
  let neededXP = Math.floor(Math.pow(level / 0.1, 2));
    
    let every = bot.dblevels
    .all()
    .filter(i => i.ID.startsWith(`xp_${message.guild.id}_`))
    .sort((a, b) => b.data - a.data);
  let ranking = every.map(x => x.ID).indexOf(`xp_${message.guild.id}_${user.id}`) + 1;
  ranking = ranking.toString();
    
    if (rank !== "on") {
 
    const points = new Discord.RichEmbed()
    .setAuthor(`${message.author.username}'s profile`, message.guild.iconURL)
    .addField(`XP / Points`, exp.toString(), true)
    .addField(`Level`, level, true)
    .addField(`Rank`, ranking, true)
    .setColor(message.member.displayHexColor)
    .setThumbnail(message.author.displayAvatarURL)
    .setFooter("Cooldown: 45 seconds")
    .setTimestamp()
    message.channel.send(points);
    } else {
      const key = `${message.guild.id}-${user.id}`;
      let avatar = await canva.circle(user.avatarURL);
      let card = await canva.rank({
        username: str(user.username, 15),
        discrim: user.discriminator,
        level: level,
        rank: ranking,
        neededXP: abbr(neededXP.toString(), 2),
        currentXP: abbr(exp.toString(), 2),
        avatarURL: avatar,
        color: message.member.displayHexColor
      });
      message.channel.sendFile(card, "rank.png");
    }
  }
};
