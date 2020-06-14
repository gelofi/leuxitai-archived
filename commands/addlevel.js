const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db");

module.exports = {
    name: 'addlevel',
    aliases: ["level+", "leveladd"],
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
    if(!user) return message.reply("mention someone or put their ID!");

    const pointsToAdd = parseInt(args[1], 10);
    if(!pointsToAdd) 
      return message.reply("put an amount of XP to give!")
if(isNaN(pointsToAdd)) return message.reply("that's not a number!")
      
    // Ensure there is a points entry for this user.
    bot.points.ensure(`${message.guild.id}-${user.id}`, {
      user: message.author.id,
      guild: message.guild.id,
      points: 0,
      totalpoints: 0,
      level: 1
    });

    // Get their current points.
    let userLevel = bot.points.get(`${message.guild.id}-${user.id}`, "level");
    userLevel += pointsToAdd;

    // And we save it!
    bot.points.set(`${message.guild.id}-${user.id}`, userLevel, "level")
  
    message.channel.send(`Given successfully!\n${user} has received **${pointsToAdd}** levels!\nNew Level: **${userLevel}**.`);
  }
}
