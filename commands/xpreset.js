const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db");

module.exports = {
    name: 'xpreset',
    aliases: ["xpr", "resetxp"],
    description: "Points system for Leuxitai - Give",
    run: async (bot, message, args) => {
      
    let togglexp;
  
    let togglesxp = await db.fetch(`togglexp_${message.guild.id}`)
    
    if(togglesxp == null){
      togglexp = 'on';
    } else {
      togglexp = togglesxp;
    }
   
   if(togglexp !== 'on') return message.channel.send("This command is not toggled on!");
      
    if(!message.member.hasPermission("MANAGE_GUILD"))
      return message.reply("you do not have the **Manage Server** permission to use this command!");

    const user = message.mentions.users.first()
    if(!user) return message.reply("mention someone to reset their XP Stats!");

    const pointsToSet = 0;
    // Ensure there is a points entry for this user.
    bot.points.ensure(`${message.guild.id}-${user.id}`, {
      user: message.author.id,
      guild: message.guild.id,
      points: 0,
      totalpoints: 0,
      level: 1
    });

    // And we save it!
    bot.points.set(`${message.guild.id}-${user.id}`, pointsToSet, "points")
    bot.points.set(`${message.guild.id}-${user.id}`, pointsToSet, "totalpoints")
    bot.points.set(`${message.guild.id}-${user.id}`, 1, "level")
      
    message.channel.send(`Set successfully!\n${user} has **${pointsToSet}** points now.`);
  }
}
