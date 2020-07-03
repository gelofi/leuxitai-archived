const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require ("quick.db")

module.exports = {
    name: 'pluscribe',
    aliases: ["pls"],
    description: "Add a server to the subscribers.",
    run: async (bot, message, args) => {
      
    let plus = await db.fetch(`plus_${args[1]}`)
    
    let check = "<:leuxcheck:716819913901211658>";
    let no = "<:no:716819317852733480>";
    
      if(message.author.id !== "563351780944248843") return
      if(!args[0]) return message.reply("remove or add this server to in the Leuxitai Plus list?")
      
      if(args[0] === "remove"){
        let serv = args[1]
        if(!serv) return message.reply("specify a server ID to remove!")
        if(serv === "this") serv = message.guild.id
        await db.delete(`plus_${serv}`)
        message.channel.send(`${no} **${bot.guilds.get(serv).name}** unsubscribed to **Leuxitai Plus**.`)
      } else
      
        try {
        if(args[0] === "add"){
          let server = args[1];
          if(!server) return message.reply("specify a server ID to add!")
          if(server === "this") server = message.guild.id;
          await db.set(`plus_${server}`, "subscriber")
          let added = new Discord.RichEmbed()
          .setAuthor(`${bot.guilds.get(server).name} - subscribed to Plus!`, bot.guilds.get(server).iconURL)
          .setColor("#3654ff")
          .setDescription(`This server has successfully subscribed to **Leuxitai Plus**.`)
          message.channel.send(added)
        } 
    } catch (err) {
      message.channel.send(":warning:  That's not a valid server ID.\n```Error:\n" + err + "```")
    }
        
      
    }
}