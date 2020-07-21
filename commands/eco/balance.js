const Discord = require('discord.js')
const ms = require("parse-ms");

module.exports = {
    name: 'balance',
    aliases: ["bal"],
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
  
  let user; //= message.mentions.members.first() || message.author;

  if(args[0]) {
    user = message.mentions.members.first().user
  } else {
    user = message.mentions.members.first() || message.author
  }
      
  let bal = await db.fetch(`money_${message.guild.id}_${user.id}`)

  if (bal === null) bal = 0;

  let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`)
  if (bank === null) bank = 0;

  let moneyEmbed = new Discord.RichEmbed()
  .setColor("#3654ff")
  .setAuthor(`${user.username}'s Balance`, user.displayAvatarURL)
  .addField("Cash on-hand", `${coins} ${bal}`)
  .addField("Bank", `${coins} ${bank}`)
  .addField("Total", `${coins} ${bank + bal}`)
  message.channel.send(moneyEmbed)
    
    }
}
