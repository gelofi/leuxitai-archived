const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db"); 

module.exports = {
    name: 'role',
    description: "Repeats what the user said.",
    run: async (bot, message, args) => {
      
      let channel;
  
        let channels = await db.fetch(`channel_${message.guild.id}`)
    
        if(channels == null){
           channel = message.channel.name;
        } else {
           channel = channels;
        }
      
        if(!message.member.hasPermission('MANAGE_ROLES')) return message.reply("you don't have **Manage Roles** permissions to do this command!")

   var member = message.mentions.members.first();
       if(!member) return message.reply("who should I give the role to?");
   var roler = args.slice(2).join(" ")
   var role = message.guild.roles.find(role => role.name === `${roler}`);
   
   if(!role) return message.reply("I cannot find that role!")
              
       if(args[0] === "remove"){
       member.removeRole(role).catch(console.error)
       .then (message.channel.send(`**${roler}** role has been removed from ${member}.`))
       let log = new Discord.RichEmbed()
         .setTitle("Logs | Role taken!")
         .setDescription(`${member.user.tag} lost the role **${roler}**.`)
         .setColor("RANDOM")
         .setFooter(`ID: ${member.user.id}`)
         .setTimestamp()
         var set = message.guild.channels.find(`name`, `${channel}`)
         set.send(log)
       }
       if(args[0] === "add") {
        member.addRole(role).catch(console.error)
       .then (message.channel.send(`**${roler}** role has been given to ${member}.`))
       let log = new Discord.RichEmbed()
         .setTitle("Logs | Role given!")
         .setDescription(`${member.user.tag} gained the role **${roler}**.`)
         .setColor("RANDOM")
         .setFooter(`ID: ${member.user.id}`)
         .setTimestamp()
         var set = message.guild.channels.find(`name`, `${channel}`)
         set.send(log)
       }
    }
}