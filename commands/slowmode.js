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
    
      let time = args[1]
      if(!time) return message.reply("specify an amount of time!")
      if(isNaN(time)) return message.reply("that isn't a number value!")
      
      message.channel.setRateLimitPerUser(ms(time))
      message.channel.send(`:ballot_box_with_check:  **Slowmode** has been set to **${time}**.`)
      
      var slowEmb = new Discord.RichEmbed()
        .setTitle("Logs | Slowmode turned on")
        .setThumbnail(message.guild.iconURL)
        .setDescription(`**Slowmode** has been turned on to ${time} in ${message.guild}`)
        .setColor("#3654ff")
        .setFooter(`ID: ${message.author.id}`)
        .setTimestamp()
        var set = message.guild.channels.find(`name`, `${channel}`)
        set.send(slowEmb);

            }
}
