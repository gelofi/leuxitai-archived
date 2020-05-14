const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db")

module.exports = {
    name: 'logchannel',
    aliases: ["setchannel", "lc", "logc", "setlogchannel"],
    description: "Changes the log channel of the bot",
    run: async (bot, message, args) => {
      if(!message.member.hasPermission('MANAGE_GUILD')) return message.reply("you don't have enough permissions to change the logging channel!");
        if(!args[0]) return message.reply("please specify a channel (without #) to set the new log channel!");
        
        await db.set(`channel_${message.guild.id}`, args[0])
        
        var embed = new Discord.RichEmbed()
        .setTitle("Settings updated!")
        .setDescription(`Logging channel is now \`${args[0]}\` successfully.`)
        .setColor("#3654ff")
        .setFooter("This channel will log all of Leuxitai's server activity.")
        message.channel.send(embed)
      
       if(args[0] === 'reset'){
         db.delete(`channel_${message.guild.id}`)
         return await message.channel.send("Channel has been reset.")
       }
        
    }
}