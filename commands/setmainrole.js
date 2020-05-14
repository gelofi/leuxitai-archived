const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db")

module.exports = {
    name: 'setmainrole',
    aliases: ["mainrole"],
    description: "Changes the main role of the bot",
    run: async (bot, message, args) => {
      
      let channel;
  
      let channels = await db.fetch(`channel_${message.guild.id}`)
    
      if(channels == null){
          channel = message.channel.name;
        } else {
          channel = channels;
        }
      
      if(!message.member.hasPermission('MANAGE_GUILD')) return message.reply("you don't have enough permissions to change the logging channel!");
        if(!args[0]) return message.reply("please specify a role (Don't mention!) to set the new main role!");
        
        await db.set(`mainRole_${message.guild.id}`, args.join(" "))
        
        var embed = new Discord.RichEmbed()
        .setTitle("Settings updated!")
        .setDescription(`Main role is now \`${args.join(" ")}\`, changed successfully.\n∆ The main role is the role you add when users join.`)
        .setColor("#3654ff")
        .setFooter("This role will be used with the mute command.")
        message.channel.send(embed)
        var log = new Discord.RichEmbed()
        .setTitle("Logs | Main role changed")
        .setDescription(`The main role for the mute command is now \`${args[0]}\`.`)
        .setColor("#1a40a1")
        .setTimestamp()
        var set = message.guild.channels.find(`name`, `${channel}`)
        set.send(log)
       if(args[0] === 'reset'){
         db.delete(`mainRole_${message.guild.id}`)
         return await message.channel.send("Mute role has been reset.")
       }
        
    }
}