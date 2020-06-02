const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db");
const leveling = require("discord-leveling");

module.exports = {
    name: 'points',
    aliases: ["rank", "profile", "rk"],
    description: "Points system for Leuxitai",
    run: async (bot, message, args) => {
    
    let togglexp;
  
    let togglesxp = await db.fetch(`togglexp_${message.guild.id}`)
    
    if(togglesxp == null){
      togglexp = 'off';
      //return message.channel.send("That command is not enabled!");
    } else {
      togglexp = togglesxp;
    }
      
    //if(togglexp !== 'on' || 'off') return
    if(togglexp !== 'on') return message.channel.send("This command is not toggled on!");
    
    var user = message.mentions.users.first() || message.author
 
    var output = await leveling.Fetch(user.id)
    //message.channel.send(`Hey ${user.tag}! You have ${output.level} level(s)! and ${output.xp} xp!`);
    const points = new Discord.RichEmbed()
    .setAuthor(`${user.username}'s profile`, user.displayAvatarURL)
    .addField(`XP / Points`, `${output.xp}/500`)
    .addField(`Level`, `${output.level}`)
    .setColor("#ff6352")
    .setFooter("Cooldown is 40 seconds.")
    .setTimestamp()
    message.channel.send(points);
  }
}