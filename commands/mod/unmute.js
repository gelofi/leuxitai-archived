const Discord = require('discord.js')
const ms = require("ms")

module.exports = {
    name: 'unmute',
    aliases: ["muten't"],
    description: "Unmutes a person",
    run: async (bot, message, args) => {
      
        const db = bot.db

        let channel;
  
        let channels = await db.fetch(`wchannel_${message.guild.id}`)
    
        if(channels == undefined){
           channel = message.channel.name;
        } else {
           channel = channels;
        }
      
         let muteRole;
  
         let muteRoles = await db.fetch(`muteRole_${message.guild.id}`)
    
         if(muteRoles == undefined) return message.reply("setup a mute role first!\nMake sure the role you will assign have right permissions.\nThe default role for mute command is `Mute`.");
         if(muteRoles == undefined){
            muteRole = "Muted";
         } else {
            muteRole = muteRoles;
         }
      
         let mainRole;
  
         let mainRoles = await db.fetch(`mainRole_${message.guild.id}`)
    
         if(mainRoles == undefined) return message.reply("setup a main role first!\nMake sure the role you will assign have right permissions.\nThe default main role is `Member`.")
         if(mainRoles == undefined){
            mainRole = "Member";
         } else {
            mainRole = mainRoles;
         }
        
         if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("you do not have the **Manage Server** permission to use this command!")
      if(!message.guild.me.hasPermission("MANAGE_GUILD")) {
        return message.reply(`I don't have the **Manage Server** permission to execute this command!`)
          }
         let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
         if (!member) return message.reply("I couldn't find that member!")
      
         let mainrole = message.guild.roles.find(role => role.name === `${mainRole}`)
         let muterole = message.guild.roles.find(role => role.name === `${muteRole}`)
         
         if(!muterole) return message.reply("I couldn't find the assigned mute role!");
      
         member.addRole(mainrole.id)
         member.removeRole(muterole.id)
      
         message.channel.send(`**${member.user.tag}** is now unmuted, a command was used.`);
         
           member.addRole(mainrole.id)
           member.removeRole(muterole.id)
           var set = message.guild.channels.find(`name`, `${channel}`)
           let embed = new Discord.RichEmbed()
           .setTitle("Logs | Unmuted!")
           .setColor("#1a40a1")
           .setDescription(`${member.user.tag} has been unmuted with the unmute command.`)
           set.send(embed)
    
  }
}