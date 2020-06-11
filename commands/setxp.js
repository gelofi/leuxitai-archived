const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db");
const leveling = require("discord-leveling");

module.exports = {
    name: 'setxp',
    aliases: ["xpset", "xp"],
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
      
      if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("you don't have enough permissions to set people's XP!")
      
    //if(togglexp !== 'on' || 'off') return
    if(togglexp !== 'on') return message.channel.send("This command is not toggled on!");
    
    var amount = parseInt(args[0])
    var user = message.mentions.users.first() || message.author
 
    if(!user) return message.reply("specify a user to set their XP!")
    var output = await leveling.SetXp(user.id, amount)
    message.channel.send(`**${user.tag}**'s XP has been set to ${amount} XP.`);

  }
}