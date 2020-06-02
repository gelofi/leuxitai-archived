const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db");

module.exports = {
    name: 'dm',
    aliases: ["dmmessage"],
    description: "transfer money to someone",
    run: async (bot, message, args, util) => {
  
    let user = message.author;

    let dm = db.fetch(`dm_${message.guild.id}_${user.id}`)
    if(dm == null) return message.reply("you haven't bought this command yet!\nBuy it using the `buy` command.")
    
  let check = "<:leuxcheck:716819913901211658>"
  let no = "<:no:716819317852733480>"
  let coins = "<:leuxicoin:715493556810416238>";
  
   let id = args[0]
   if(!id) return message.reply("specify a user ID so I could DM them!")
   let dmed = args.slice(1).join(" ");
       if (!dmed) {
            return message.channel.send('This is a developer command. Please put a message to send into someone!');
            }
       message.delete()
       message.channel.send("Message sent! Thank you.")
     try {
       bot.users.get(id).send(dmed)
      } catch (error) {
     message.channel.send(":warning: An error occured!\n\n```" + error + "```")
        }
    }
}
