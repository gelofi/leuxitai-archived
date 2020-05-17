const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db");

module.exports = {
    name: 'points',
    aliases: ["rank", "profile"],
    description: "Points system for Leuxitai",
    run: async (bot, message, args) => {
    
      let togglexp;
  
    let togglesxp = await db.fetch(`togglexp_${message.guild.id}`)
    
    if(togglesxp == null){
      togglexp = 'on';
      //return message.channel.send("That command is not enabled!");
    } else {
      togglexp = togglesxp;
    }
      
    //if(togglexp !== 'on' || 'off') return
    if(!togglexp === 'on') return message.channel.send("This command is not toggled on!");
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