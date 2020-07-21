const Discord = require('discord.js')
const ms = require("parse-ms");

module.exports = {
    name: 'inventory',
    aliases: ["inv", "bag"],
    description: "Repeats what the user said.",
    run: async (bot, message, args) => {
  
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
    
  let user = message.author;
  let check = "<:leuxcheck:716819913901211658>"
  let no = "<:no:716819317852733480>"
  let coins = "<:leuxicoin:715493556810416238>";

    let items1 = await db.fetch(`inventory1_${message.guild.id}_${user.id}`)
    if(items1 == null) items1 = "0"
    
    let items2 = await db.fetch(`inventory2_${message.guild.id}_${user.id}`)
    if(items2 == null) items2 = "0"
    
    let items3 = await db.fetch(`inventory3_${message.guild.id}_${user.id}`)
    if(items3 == null) items3 = "0"
      
    let itemsname1 = await db.fetch(`item1_${message.guild.id}`)
    if(itemsname1 == null){
      itemsname1 = "N/A"
      items1 = "0"
    }
    let itemsname2 = await db.fetch(`item2_${message.guild.id}`)
    if(itemsname2 == null){
      itemsname2 = "N/A"
      items2 = "0"
    }
    let itemsname3 = await db.fetch(`item3_${message.guild.id}`)
    if(itemsname3 == null){
      itemsname3 = "N/A"
      items3 = "0"
    }
    
    let charm = await db.fetch(`charm_${message.guild.id}_${user.id}`)
    if(charm == null){
      charm = "1"
    } else {
      charm = "0"
    }
    let rob = await db.fetch(`robshield_${message.guild.id}_${user.id}`)
    if(rob == true){
      rob = "1"
    } else {
      rob = "0"
    }

    let booster = await db.fetch(`booster_${message.guild.id}_${user.id}`)
    if(booster !== null){
      booster = "1"
    } else {
      booster = "0"
    }
      
    let chicken = await db.fetch(`chicken_${message.guild.id}_${user.id}`)
    if(chicken !== null){
      chicken = "1"
    } else {
      chicken = "0"
    }  
      
  let invicon = "https://cdn.discordapp.com/attachments/717606800198729738/717606940821291058/1591160922175.png"
  let moneydb = await db.fetch(`money_${message.guild.id}_${user.id}`)
  if(moneydb == null) moneydb = "0"
  let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`)
  if(bank == null) bank = "0"
  if(message.mentions.users.first()) return message.reply("you can't view others' inventory!")
      
          let inv1 = new Discord.RichEmbed()
          .setAuthor(`${user.username}'s inventory`, user.displayAvatarURL)
          .setDescription("**N/A** shows up if there are blank storages for custom items.")
          .setThumbnail(invicon)
          .addField(`Custom items`, `- **${itemsname1}** - ${items1}\n- **${itemsname2}** - ${items2}\n- **${itemsname3}** - ${items3}`)
          .addField("LeuxItems", `**charm** - ${charm}\n**rob shield** - ${rob}\n**booster** - ${booster}\n**chicken** - ${chicken}`)
          .setColor(message.member.displayHexColor)
          .setFooter(`Coins: ${moneydb}  | Bank: ${bank}`)
          message.channel.send(inv1)
        
    }
}