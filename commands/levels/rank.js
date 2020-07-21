const Discord = require("discord.js");

const abbr = require("number-abbreviate")
var str = require("str_shorten")

const Canvacord = require("@fizuku/canvacord");
const fcanva = new Canvacord();
const FCC = require("canvacord");
const canva = new FCC();

const ab = new abbr(["", "", "", ""])

module.exports = {
  name: "points",
  aliases: ["rank", "profile", "rk", "level"],
  description: "Points system for Leuxitai",
  run: async (bot, message, args) => {

    const db = bot.db
    
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
    
  let user = message.mentions.users.first() || message.author;
  let rcbg = await db.fetch(`rcbg_${message.guild.id}_${user.id}`);
    
  if(user.bot) return message.reply("bots don't get XP and aren't eligible for ranking.")
  let level = await bot.dblevels.get(`level_${message.guild.id}_${user.id}`) || 1;
  level = level.toString();
  let exp = await bot.dblevels.fetch(`xp_${message.guild.id}_${user.id}`) || 1;
  let neededXP = Math.floor(Math.pow(level / 0.1, 2));
    
    let every = await bot.dblevels.all()
    every = every.filter(i => i.ID.startsWith(`xp_${message.guild.id}_`))
    .sort((a, b) => b.data - a.data);
  let ranking = every.map(x => x.ID).indexOf(`xp_${message.guild.id}_${user.id}`) + 1;
  ranking = ranking.toString();
    
    if (rank !== "on") {
 
    const points = new Discord.RichEmbed()
    .setAuthor(`${message.author.username}'s profile`, message.guild.iconURL)
    .addField(`XP / Points`, (exp).toString(), true)
    .addField(`Level`, level, true)
    .addField(`Rank`, ranking, true)
    .setColor(message.member.displayHexColor)
    .setThumbnail(message.author.displayAvatarURL)
    .setFooter("Cooldown: 45 seconds")
    .setTimestamp()
    message.channel.send(points);
    } else {
      let avatar = await canva.circle(user.avatarURL);
      let card = await fcanva.rank({
        username: str(user.username, 15),
        discrim: user.discriminator,
        level: level,
        rank: ranking,
        neededXP: ab.abbreviate(neededXP.toString(), 2),
        currentXP: ab.abbreviate((exp).toString(), 2),
        avatarURL: avatar,
        color: message.member.displayHexColor
      });
      
      let cc = await canva.rank({
        username: str(user.username, 15),
        discrim: user.discriminator,
        level: level,
        rank: ranking,
        neededXP: neededXP.toString(),
        currentXP: (exp).toString(),
        avatarURL: avatar,
        color: message.member.displayHexColor,
        background: rcbg,
        overlay: false
      })
      if(rcbg == null){
      message.channel.sendFile(card, "rank.png");
      } else {
        message.channel.sendFile(cc, "rank.png");
      }
    }
  }
};
