const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db");

module.exports = {
    name: 'purge',
    aliases: ["delete", "prune"],
    description: "Purges several messages",
    run: async (bot, message, args) => {
      
    let channel;
  
    let channels = await db.fetch(`channel_${message.guild.id}`)
    
    if(channels == null){
      channel = message.channel.name;
    } else {
      channel = channels;
    }
      
      if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("you don't have **Manage Messages** permission to use this command!");
      if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.reply(`I do not have the **Manage Messages** permissions to use this command!`)
        
      if(!args[0]) return message.reply('put an amount of messages to delete! Maximum deleted messages are 100.');
      if(isNaN(args[0]) == true) return message.reply("that isn't a number!")
      let x = parseInt(args[0]) + 1
      try {
      message.channel.bulkDelete(x)
      var log = new Discord.RichEmbed()
        .setTitle("Logs | Messages purged")
        .setDescription(`\`${args[0]}\` message(s) has been purged in ${message.channel}`)
        .setFooter(`Author ID: ${message.author.id}`)
        .setColor("#3654ff")
        .setTimestamp();
       var set = message.guild.channels.find(`name`, `${channel}`)
       set.send(log)
      } catch (error){
        message.channel.send("An error occurred! Please report this to the bot owner, Fizx26#5360\nif this happens occasionally.")
      }
        
    }
}