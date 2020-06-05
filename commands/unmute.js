const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db")
const ms = require("ms")

module.exports = {
    name: 'unmute',
    aliases: ["muten't"],
    description: "Unmutes a person",
    run: async (bot, message, args) => {
      
        let channel;
  
        let channels = await db.fetch(`wchannel_${message.guild.id}`)
    
        if(channels == null){
           channel = message.channel.name;
        } else {
           channel = channels;
        }
      
         let muteRole;
  
         let muteRoles = await db.fetch(`muteRole_${message.guild.id}`)
    
         if(muteRoles == null) return message.reply("setup a mute role first!\nMake sure the role you will assign have right permissions.\nThe default role for mute command is `Mute`.");
         if(muteRoles == null){
            muteRole = "Muted";
         } else {
            muteRole = muteRoles;
         }
      
         let mainRole;
  
         let mainRoles = await db.fetch(`mainRole_${message.guild.id}`)
    
         if(mainRoles == null) return message.reply("setup a main role first!\nMake sure the role you will assign have right permissions.\nThe default main role is `Member`.")
         if(mainRoles == null){
            mainRole = "Member";
         } else {
            mainRole = mainRoles;
         }
        
         if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("you do not have enough permissions to use this command!")
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