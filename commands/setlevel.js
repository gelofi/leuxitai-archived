const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db");
const leveling = require("discord-leveling");

module.exports = {
    name: 'setlevel',
    aliases: ["levelset", "setlvl"],
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
    
    var amount = args[0]
    var user = message.mentions.users.first() || message.author
 
    if(!user) return message.reply("specify a user to set their level!")
    
    var output = await leveling.SetLevel(user.id, amount)
    message.channel.send(`**${user.tag}**'s level is now **${amount}**.`);

  }
}