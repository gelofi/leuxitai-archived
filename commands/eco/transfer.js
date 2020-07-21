const Discord = require('discord.js')
const ms = require("parse-ms");

module.exports = {
    name: 'transfer',
    aliases: ["pay"],
    description: "transfer money to someone",
    run: async (bot, message, args, util) => {
  
    const db = bot.db

    let eco;
  
    let econ = await db.fetch(`eco_${message.guild.id}`)
    
    if(econ == null || econ == undefined){
      eco = 'off';
      //return message.channel.send("That command is not enabled!");
    } else {
      eco = econ;
    }
      
    if(eco !== 'on') return message.channel.send("This command is not toggled on!");
    
  let check = "<:leuxcheck:716819913901211658>"
  let no = "<:no:716819317852733480>"
  let coins = "<:leuxicoin:715493556810416238>";
  
  let user = message.mentions.members.first()// || bot.users.find("username", args[0]);

  let member = await db.fetch(`money_${message.guild.id}_${message.author.id}`)

  if (!user) {
      return message.reply(`specify a member to transfer your money!`)
  }
  
  if(args[0] === `<@${message.author.id}>`) return message.reply("you can't transfer money to yourself! but why tho")

  if(isNaN(args[1]) == true) return message.reply("that's not an amount of coins!")
  if (!args[1]) return message.reply("specify an amount of coins to transfer.")

  if (message.content.includes('-')) { 
      return message.reply("you can't transfer negative money to someone, derp.")
  }
 
  if (member < args[1]) {
      return message.reply("you can't give what you don't have, just like money! You don't have enough coins to transfer that amount.")
  }

  let embed5 = new Discord.RichEmbed()
  .setColor("#3654ff")
  .setAuthor("Transfer success!", message.guild.iconURL)
  .setDescription(`${check} Transferred ${coins} **${args[1]}** coins to <@${user.user.id}>`)
  .setFooter(`Receiver ID: ${user.user.id}\nTransferee ID: ${message.author.id}`)
  message.channel.send(embed5)
  db.add(`money_${message.guild.id}_${user.id}`, parseInt(args[1]))
  db.subtract(`money_${message.guild.id}_${message.author.id}`, parseInt(args[1]))

    }
}
