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
      
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("You don't have enough permissions to do this command!");
            
      if(!args[0]) return message.reply('put an amount of messages to delete! Maximum deleted messages are 100.');
      message.channel.bulkDelete(args[0]).catch(err => {
      return message.channel.send("An error occured!" + err)
      }                        
      );
      
      var log = new Discord.RichEmbed()
        .setTitle("Logs | Messages purged")
        .setDescription(`\`${args[0]}\` message(s) have been purged in #${message.channel}`)
        .setFooter(`Author ID: ${message.author.id}`)
        .setTimestamp();
       var set = message.guild.channels.find(`name`, `${channel}`)
       set.send(log)
    }
}