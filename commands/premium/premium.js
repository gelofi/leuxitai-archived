const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require ("quick.db")

module.exports = {
    name: 'premium',
    aliases: ["plus"],
    description: "Add a server to the subscribers.",
    run: async (bot, message, args) => {
      
    if(message.author.id !== "563351780944248843") return
      
    let plus = await db.fetch(`plus_${args[1]}`)
    let pluse = await db.fetch(`plus_${message.guild.id}`)
    
    let check = "<:leuxcheck:716819913901211658>";
    let no = "<:no:716819317852733480>";
    
      //if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("you don't have the **Manage Server** permission to use this command!")
  
      if(!args[0]) return message.reply("remove, or add this server to the Leuxitai Plus list?");
      
      if(args[0] === "remove"){
        if(!args[1]) return message.reply("specify a server ID to remove!")
        await db.delete(`plus_${args[1]}`)
        message.channel.send(`${no} **${bot.guilds.get(args[1]).name}** unsubscribed to **Leuxitai Plus**.`)
      }
      
        if(args[0] === "add"){
          if(!args[1]) return message.reply("specify a server ID to add!")
          await db.set(`plus_${args[1]}`, "subscriber")
          let added = new Discord.RichEmbed()
          .setAuthor(`${bot.guilds.get(args[1]).name} - subscribed to Plus!`, bot.guilds.get(args[1]).iconURL)
          .setColor("#3654ff")
          .setDescription(`This server has successfully subscribed to **Leuxitai Plus**.`)
          message.channel.send(added)
        }
        if(args[0] === "check"){
          if(pluse !== "subscriber"){
          message.channel.send("This server is not subscribed to Leuxitai Plus.")
          } else {
            message.channel.send("This server is subscribed to Leuxitai Plus.")
          }
        }
      
    }
}