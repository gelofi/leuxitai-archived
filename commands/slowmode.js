const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db");
const ms = require("ms");

module.exports = {
    name: 'slowmode',
    aliases: ["slow"],
    description: "sets slow mode in the channel.",
    run: async (bot, message, args) => {

    let channel;
  
    let channels = await db.fetch(`channel_${message.guild.id}`)
    
    if(channels == null){
      channel = message.channel.name;
    } else {
      channel = channels;
    }
    
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("you don't have the **Manage Channels** permission to use this command!")

      let time = args[0]
      if(!time) return message.reply("specify an amount of time!")
      //if(isNaN(time)) return message.reply("that isn't a number value!")
      
      message.channel.setRateLimitPerUser(ms(time))
      message.channel.send(`:ballot_box_with_check:  **Slowmode** has been set to **${ms(time)}**.`)
      
      var slowEmb = new Discord.RichEmbed()
        .setTitle("Logs | Slowmode turned on")
        .setThumbnail(message.guild.iconURL)
        .setDescription(`**Slowmode** has been turned on to ${ms(time)} in ${message.channel}`)
        .setColor("#3654ff")
        .setFooter(`ID: ${message.author.id}`)
        .setTimestamp()
        var set = message.guild.channels.find(`name`, `${channel}`)
        set.send(slowEmb);

            }
}
