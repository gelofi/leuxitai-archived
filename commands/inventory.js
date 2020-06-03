const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db");
const ms = require("parse-ms");

module.exports = {
    name: 'inventory',
    aliases: ["inv", "profile"],
    description: "Repeats what the user said.",
    run: async (bot, message, args) => {
  
      let eco;
  
    let econ = await db.fetch(`eco_${message.guild.id}`)
    
    if(econ == null){
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
    if(items1 == true){
      items1 = "1"
    } else {
      items1 = "0"
    }
    let items2 = await db.fetch(`inventory2_${message.guild.id}_${user.id}`)
    if(items2 == true){
      items2 = "1"
    } else {
      items2 = "0"
    }
    let items3 = await db.fetch(`inventory3_${message.guild.id}_${user.id}`)
    if(items3 == true){
      items3 = "1"
    } else {
      items3 = "0"
    }
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
    if(charm == true){
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
    let dm = await db.fetch(`dm_${message.guild.id}_${user.id}`)
    if(dm == true){
      dm = "1"
    } else {
      dm = "0"
    }
    
  let invicon = "https://cdn.discordapp.com/attachments/717606800198729738/717606940821291058/1591160922175.png"
  let moneydb = await db.fetch(`money_${message.guild.id}_${user.id}`)
  let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`)
  
  if(message.mentions.users.first()) return message.reply("you can't view others' inventory!")
      
          let inv1 = new Discord.RichEmbed()
          .setAuthor(`${user.username}'s inventory`, user.displayAvatarURL)
          .setDescription("**N/A** shows up if there are blank storages for custom items.")
          .setThumbnail(invicon)
          .addField(`Custom items`, `- **${itemsname1}** - ${items1}\n- **${itemsname2}** - ${items2}\n- **${itemsname3}** - ${items3}`)
          .addField("LeuxItems", `**charm** - ${charm}\n**rob shield** - ${rob}\n**image** - ${dm}`)
          .setColor(message.member.displayHexColor)
          .setFooter(`Coins: ${moneydb}  | Bank: ${bank}`)
          message.channel.send(inv1)
        
    }
}