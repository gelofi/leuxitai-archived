const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db")

module.exports = {
    name: 'toggle',
    aliases: ["tg"],
    description: "Changes the prefix of the bot",
    run: async (bot, message, args) => {
    
    let channel;
  
    let channels = await db.fetch(`channel_${message.guild.id}`)
    
    if(channels == null){
      channel = message.channel.name;
    } else {
      channel = channels;
    }

      
    let togglexp;
  
    let togglesxp = await db.fetch(`togglexp_${message.guild.id}`)
    
    if(togglesxp == null){
      togglexp = 'on';
      //return message.channel.send("That command is not enabled!");
    } else {
      togglexp = togglesxp;
    }
      
    if(!message.member.hasPermission('MANAGE_GUILD')) return message.reply("you don't have enough permissions to change my prefix!");
        if(!args[0]) return message.reply("please specify a command to turn on/off!");
        //if(!args[1].content.startsWith("o")) return message.reply("turn commands on or off!")
        if(args[1].length > 3) return message.reply(`really? Setting it to ${args[1]}?`)
      
        if(args[0] === "xp"){
        if(!args[1]) return message.reply("toggle what? On or Off?")[1] 
        if(args[1] !== 'on' && args[1] !== 'off') return message.reply("wat? Toggle it ON, or OFF !")
        await db.set(`togglexp_${message.guild.id}`, args[1])
        /*Version 9 - var embedp = new Discord.RichEmbed()
        .setDescription(`Toggled XP System \`${args[1]}\` successfully.`)
        .setColor("#3654ff")
        message.channel.send(embedp)*/
        message.channel.send(`Toggled the **Level System**  \`${args[1]}\`  successfully.`)
          var log = message.guild.channels.find(`name`, `${channel}`)
          var embed = new Discord.RichEmbed()
          .setAuthor(`Logs | Toggle`, message.guild.iconURL)
          .setDescription(`${message.author.tag} turned ${args[1]} the Level System.`)
          .setFooter(`Author ID: ${message.author.id}`)
          .setTimestamp()
          .setColor("#7289da")
          log.send(embed)
  //end of XP
        }
      
      
      
    }
}