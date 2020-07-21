const Discord = require('discord.js')

module.exports = {
    name: 'setmuterole',
    aliases: ["smr", "muterole"],
    description: "Changes the mute role of the bot",
    run: async (bot, message, args) => {
      
      const db = bot.db
      
      let channel;
  
      let channels = await db.fetch(`channel_${message.guild.id}`)
    
      if(channels == undefined){
          channel = message.channel.name;
        } else {
          channel = channels;
        }
      
      if(!message.member.hasPermission('MANAGE_GUILD')) return message.reply("you don't have enough permissions to change the mute role!");
      if(!message.guild.me.hasPermission("MANAGE_GUILD")) {
        return message.reply(`I don't have the **Manage Server** permission to execute this command!`)
          }
        if(!args[0]) return message.reply("please specify role (Don't mention!) to set the new mute role!");
        
        await db.set(`muteRole_${message.guild.id}`, args.join(" "))
        
        if(args[0] === "reset"){
          db.delete(`muteRole_${message.guild.id}`)
          message.channel.send("The mute role has been reset successfully.\nPlease set a new mute role.")
        }
      
        var embed = new Discord.RichEmbed()
        .setTitle("Settings updated!")
        .setDescription(`Mute role is now \`${args.join(" ")}\`, changed successfully.`)
        .setColor("#3654ff")
        .setFooter("This role will be used on the mute command.")
        message.channel.send(embed)
      
        
        var log = new Discord.RichEmbed()
        .setTitle("Logs | Mute role changed")
        .setDescription(`The mute role for the mute command is now \`${args[0]}\`.`)
        .setColor("#1a40a1")
        .setTimestamp()
        var set = message.guild.channels.find(`name`, `${channel}`)
        set.send(log)
    
    }
}