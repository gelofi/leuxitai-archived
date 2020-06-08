const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db")

module.exports = {
    name: 'antispam',
    aliases: ["anti-spam", "nospam"],
    description: "Changes the spam system of the bot",
    run: async (bot, message, args) => {
  
    let channel;
  
        let channels = await db.fetch(`channel_${message.guild.id}`)
    
        if(channels == null){
           channel = message.channel.name;
        } else {
           channel = channels;
        }
      
    let antispam;
  
    let anti = await db.fetch(`antispam_${message.guild.id}`)
    
    if(anti !== "on"){
      return message.reply("anti-spam system is not toggled on!")
    } else {
      antispam = anti;
    }
    
    let seconds = await db.fetch(`msgSec_${message.guild.id}`)

    let counter = await db.fetch(`msgCounter_${message.guild.id}`)
    
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("you don't have enough permissions to toggle commands!");
        if(!args[0]) return message.reply("please specify a setting to modify! (`seconds`, `msgcount`)");
        //if(!args[1].content.startsWith("o")) return message.reply("turn commands on or off!")
        if(args[1].length > 3) return message.reply(`that span/interval is too long!`)
      
        if(args[0] === "seconds"){
        if(!args[1]) return message.reply("what would be the seconds?")[1] 
        await db.set(`msgSec_${message.guild.id}`, args[1])
       
        message.channel.send(`The span time for **anti-spam** has been set to \`${args[1]}\`  successfully.`)
          
          var log = message.guild.channels.find(`name`, `${channel}`)
          var embed = new Discord.RichEmbed()
          .setAuthor(`Logs | Anti-spam modified!`, message.guild.iconURL)
          .setDescription(`${message.author.tag} changed the span time to ${args[1]} for the **Anti-spam System**.`)
          .setFooter(`Author ID: ${message.author.id}`)
          .setTimestamp()
          .setColor("#7289da")
          log.send(embed)
  //end of XP
        }
        
        if(args[0] === "msgcount"){
        if(!args[1]) return message.reply("what would be the message count?")[1] 
        if(isNaN(args[1])) return message.reply("that's not a number of messages!")
        await db.set(`msgCounter_${message.guild.id}`, args[1])
       
        message.channel.send(`The message count for **anti-spam** has been set to \`${args[1]}\`  successfully.`)
          
          var log = message.guild.channels.find(`name`, `${channel}`)
          var embed = new Discord.RichEmbed()
          .setAuthor(`Logs | Anti-spam modified!`, message.guild.iconURL)
          .setDescription(`${message.author.tag} changed the message count to ${args[1]} for the **Anti-spam System**.`)
          .setFooter(`Author ID: ${message.author.id}`)
          .setTimestamp()
          .setColor("#7289da")
          log.send(embed)
  //end of XP
        }
      
    }
}