const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true });
const db = require("quick.db");
const leveling = require("discord-leveling");
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
    //if(togglexp !== 'on' || 'off') return
    if (togglexp !== "on")
      return message.channel.send("This command is not toggled on!");

    function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return bot.users.get(mention);
	}
}
    
    let user = getUserFromMention(args[0]) || message.author
    let author = message.author;
    let output = await leveling.Fetch(user.id);
  
    if (rank !== "on") {
      
      const points = new Discord.RichEmbed()
        .setAuthor(`${user.username}'s profile`, user.displayAvatarURL)
        .addField(`XP / Points`, `${output.xp}/500`)
        .addField(`Level`, `${output.level}`)
        .setColor("#ff6352")
        .setFooter("Cooldown is 40 seconds.")
        .setTimestamp();
      message.channel.send(points);
      
    } else {
      let avatar = await canva.circle(user.avatarURL)
      if(output.xp === 0) output.xp = "0"
      if(output.level === 0) output.level = "0"
      
      let card = await canva.rank({
        username: user.username,
        discrim: user.discriminator,
        level: output.level,
        rank: "?",
        neededXP: 500,
        currentXP: output.xp,
        avatarURL: avatar
      });
      message.channel.sendFile(card, "rank.png");
    }
  }
};
