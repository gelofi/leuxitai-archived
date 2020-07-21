const Discord = require('discord.js')
const ms = require("parse-ms");

module.exports = {
    name: 'withdraw',
    aliases: ["with"],
    description: "Repeats what the user said.",
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
  let user = message.author;

  let member = await db.fetch(`money_${message.guild.id}_${user.id}`)
  let member2 = await db.fetch(`bank_${message.guild.id}_${user.id}`)

  if(!args[0]) return message.reply("specify an amount of coins to withdraw!")

  if (args[0] == 'all') {
    let money = await db.fetch(`bank_${message.guild.id}_${user.id}`)
    
    db.subtract(`bank_${message.guild.id}_${user.id}`, money)
    db.add(`money_${message.guild.id}_${user.id}`, money)
    message.channel.send(`${check} Successfully withdrew ${coins} **${money}** from your bank!`)
  
  } else {

  if (message.content.includes('-')) { 
      return message.reply("you can't withdraw negative amount of coins!")
  }
  
  if (member2 < args[0]) {
      return message.reply("you don't have that amount of coins!")
  }

  message.channel.send(`${check} Successfully withdrawn ${coins} **${args[0]}** coins from your bank!`)

  db.subtract(`bank_${message.guild.id}_${user.id}`, args[0])
  db.add(`money_${message.guild.id}_${user.id}`, args[0])
  }
    }
}
