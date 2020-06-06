const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db");
const leveling = require("discord-leveling");

module.exports = {
    name: 'leveladd',
    aliases: ["addlvl", "level+", "addlevel"],
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
    if(!user) return message.reply("specify a user to add levels to!")
    try {
      leveling.AddLevel(user.id, amount)
      message.channel.send(`:ticket: **${user.tag}** successfully received **${amount}** levels!`)
    }
      catch (error) {
        message.channel.send(":warning: An error occurred!\n" + error)
      }
  }
}