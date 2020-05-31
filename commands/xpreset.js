const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db");
const leveling = require("discord-leveling");

module.exports = {
    name: 'resetxp',
    aliases: ["resetpoints", "xpreset"],
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
    
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("You don't have enough permissions to use this command!\nMissing permissions: `Manage Members`")
      
    var user = message.mentions.users.first()
    if (!user) return message.reply('specify a user to reset their profile!')
 
    //if (!message.guild.me.hasPermission(`ADMINISTRATOR`)) return message.reply('You need to be admin to execute this command!')
 
    var output = await leveling.Delete(user.id)
    if (output.deleted == true) return message.channel.send(`**${user.tag}**'s XP Profile has been reset successfully.`)
 
    message.channel.send(':warning: An error occurred!\nI could not find the user in the XP database!')

  }
}