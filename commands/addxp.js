const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db");
const leveling = require("discord-leveling");

module.exports = {
    name: 'xpadd',
    aliases: ["addxp", "xp+"],
    description: "Points system for Leuxitai - XP Set",
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
    
    let user = message.mentions.users.first()
    let amount = args[0];
      
      if(isNaN(amount)) return message.reply("that's not a number!")
    if(!user) return message.reply("specify a user to add XP to!")
    try {
      leveling.AddXp(user.id, amount)
      message.channel.send(`:ticket: **${user.tag}** successfully received **${amount}** XP!`)
    }
      catch (error) {
        message.channel.send(":warning: An error occurred!\n" + error)
      }
  }
}