const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});

module.exports = {
    name: 'points',
    aliases: ["rank"],
    description: "Points system for Leuxitai",
    run: async (bot, message, args) => {
      
    const key = `${message.guild.id}-${message.author.id}`;
    const points = new Discord.RichEmbed()
    .setAuthor(`${message.author.username}'s profile`, message.guild.iconURL)
    .addField(`XP / Points`, bot.points.get(key, "points"))
    .addField(`Level`, bot.points.get(key, "level"))
    .setColor("#ff6352")
    .setThumbnail(message.author.displayAvatarURL)
    .setFooter("No cooldowns yet.")
    .setTimestamp()
    message.channel.send(points);
  }
}