const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db")
const prefix = require(".././config.js")

module.exports = {
    name: 'setprefix',
    aliases: ["sp", "prefix"],
    description: "Changes the prefix of the bot",
    run: async (bot, message, args) => {
      
      let channel;
  
    let channels = await db.fetch(`channel_${message.guild.id}`)
    
    if(channels == null){
      channel = message.channel.name;
    } else {
      channel = channels;
    }
      
      if(!message.member.hasPermission('MANAGE_GUILD')) return message.reply("you don't have enough permissions to change my prefix!");
        if(!args[0]) return message.reply("please define the new prefix you desire to set!");
        if(args[1]) return message.reply("prefixes with spaces are not allowed!")
        if(args[0].length > 3) return message.channel.send("No prefixes more than 3 characters!")

        if(args[0] === 'l.') {
        db.delete(`prefix_${message.guild.id}`)
        return await message.channel.send("The prefix has been reset successfully.")
        }
      
        await db.set(`prefix_${message.guild.id}`, args[0])
        var embedp = new Discord.RichEmbed()
        .setDescription(`My prefix for this guild is now changed to \`${args[0]}\` successfully.`)
        .setColor("#3654ff")
        .setFooter("You can mention me for me to send my prefix in this server.")
        message.channel.send(embedp).then (message.channel.send(`Due to Leuxitai's music module in another project, you need to change the music module's prefix too!\nType \`${prefix}musicprefix\` to change the prefix for the music module.`))
        var log = new Discord.RichEmbed()
        .setTitle("Logs | Settings updated ✓")
        .setDescription(`New guild prefix is now \`${args[0]}\``)
        .setFooter(`Author ID: ${message.author.id}`)
        .setTimestamp();
       var set = message.guild.channels.find(`name`, `${channel}`)
       set.send(log)
 
    }
}