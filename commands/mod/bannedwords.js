const Discord = require('discord.js')

module.exports = {
    name: 'badwords',
    aliases: ["bannedwords", "bannedword", "badword"],
    description: "Automodding bannedwords.",
    run: async (bot, message, args) => {
      
    const db = bot.db
      
    let channel;
  
    let channels = await db.fetch(`channel_${message.guild.id}`)
    
    if(channels == undefined){
      channel = message.channel.name;
    } else {
      channel = channels;
    }
      
    if(!message.guild.me.hasPermission("MANAGE_GUILD")) {
        return message.reply(`I don't have the **Manage Server** permission to execute this command!`)
          }
      
    let bannedwords = await db.fetch(`bannedwords_${message.guild.id}`)
        
    let check = "<:leuxcheck:716819913901211658>";
    let no = "<:no:716819317852733480>";
    
      if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("you don't have the **Manage Server** permission to use this command!")
  
      if(args[0] === "reset"){
        await db.delete(`bannedwords_${message.guild.id}`)
        message.channel.send(`${check} Banned words for **${message.guild.name}** has been cleared.`)
        let reslog = new Discord.RichEmbed()
        .setAuthor(`Logs | Banned words cleared!`, message.guild.iconURL)
        .setDescription(`Set new banned words to protect your server.`)
        .setColor("#ff3636")
        .setFooter(`${message.author.tag} reset the banned words for this server.`)
        var set = message.guild.channels.find(`name`, `${channel}`)
        set.send(reslog);
      }
      
        if(args[0] === "add"){
          let word = args.slice(1).join(" ")
          if(!word) return message.reply("specify a word to add to the list!")
          if(bannedwords == null) bannedwords = ["cunt"]
          if(bannedwords.some(words => word === words)){
            return message.reply("that word is already in the list!")
          }
          message.delete()
          await db.push(`bannedwords_${message.guild.id}`, `${word}`)
          let added = new Discord.RichEmbed()
          .setAuthor(`Banned Word set | ${message.guild.name}`, message.guild.iconURL)
          .setColor("#ff3636")
          .setDescription(`\`${word}\` has been added to the banned words list.`)
          message.author.send(added)
          let loggers = new Discord.RichEmbed()
          .setAuthor("Logs | Banned words added", message.guild.iconURL)
          .setColor("#3654ff")
          .setDescription(`${check} ||${word}|| has been added to the banned words list.`)
          .setFooter(`Author ID: ${message.author.id}`)
          .setTimestamp()
          var set = message.guild.channels.find(`name`, `${channel}`)
          set.send(loggers);
          message.reply("please check your DMs!")
        } else {
          if(bannedwords !== null) {
          let badwords = new Discord.RichEmbed()
          .setAuthor(`Banned Words in ${message.guild.name}`, message.guild.iconURL)
          .setDescription(`\`${bannedwords.join("`, `")}\``)
          .setColor("#3654ff")
          .setFooter("You can add banned words to enforce your server security.\nExample: l.bannedword add [word]\nOr clear the list: l.bannedword reset")
          message.author.send(badwords)
          message.reply("please check your DMs!")
          } else {
            message.channel.send("There are no banned words set for this server.")
          }
        }
      
    }
}