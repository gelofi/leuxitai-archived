const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db");
const ms = require("parse-ms");

module.exports = {
    name: 'buy',
    aliases: ["get"],
    description: "buy items.",
    run: async (bot, message, args, util) => {
  
    let prefix = await db.fetch(`prefix_${message.guild.id}`)
    if(prefix == null) prefix = "l.";
    let eco;
  
    let econ = await db.fetch(`eco_${message.guild.id}`)
    
    if(econ == null){
      eco = 'off';
      //return message.channel.send("That command is not enabled!");
    } else {
      eco = econ;
    }
      
    if(eco !== 'on') return message.channel.send("This command is not toggled on!");
    
  let check = "<:leuxcheck:716819913901211658>"
  let no = "<:no:716819317852733480>"
  let coins = "<:leuxicoin:715493556810416238>";

    let items1 = await db.fetch(`item1_${message.guild.id}`)

    let item1 = items1
      
    let items1desc = await db.fetch(`item1desc_${message.guild.id}`)
    
    let item1desc = items1desc;
    
    let items1cost = await db.fetch(`item1cost_${message.guild.id}`)
    
    let item1cost = items1cost;
    
    let items2 = await db.fetch(`item2_${message.guild.id}`)
    
    let item2 = items2;
    
    let items2desc = await db.fetch(`item2desc_${message.guild.id}`)
    
    let item2desc = items2desc;

    let items2cost = await db.fetch(`item2cost_${message.guild.id}`)
    
    let item2cost = items2cost;
    
    let items3 = await db.fetch(`item3_${message.guild.id}`)
    
    let item3 = items3;
  
    let items3desc = await db.fetch(`item3desc_${message.guild.id}`)
    
    let item3desc = items3desc;

    let items3cost = await db.fetch(`item3cost_${message.guild.id}`)
    
    let item3cost = items3cost;
   
    let user = message.author;

    let money = db.fetch(`money_${message.guild.id}_${user.id}`)
      //if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("you don't have the Manage Server permission to use this command!")
    if(!args[0]) return message.reply("specify an item to buy!")

     if(args[0] == "charm") {
      if(money < 10000) return message.reply("you don't have enough money to buy that item! :(")
      db.set(`charm_${message.guild.id}_${user.id}`, true)
      db.subtract(`money_${message.guild.id}_${user.id}`, 10000)
      message.channel.send(`${message.author} successfully bought **charm** !\n**Cost**: ${coins} **10000**`)
     } else
     
     if(args.join(" ") == "rob shield") {
      if(money < 7000) return message.reply("you don't have enough money to buy that item! :(")
      db.set(`robshield_${message.guild.id}_${user.id}`, true)
      db.subtract(`money_${message.guild.id}_${user.id}`, 7000)
      message.channel.send(`${message.author} successfully bought **rob shield** !\n**Cost**: ${coins} **7000**`)
     } else
    
     if(args[0] == "image") {
      if(money < 25000) return message.reply("you don't have enough money to buy that item! :(")
      db.set(`dm_${message.guild.id}_${user.id}`, true)
      db.subtract(`money_${message.guild.id}_${user.id}`, 25000)
      message.channel.send(`${message.author} successfully bought **image** !\n**Cost**: ${coins} **25000**`)
     } else
       
      if(args[0] == "booster") {
      if(money < 1000) return message.reply("you don't have enough money to buy that item! :(")
      db.set(`booster_${message.guild.id}_${user.id}`, true)
      db.subtract(`money_${message.guild.id}_${user.id}`, 1000)
      message.channel.send(`${message.author} successfully bought **booster** !\n**Cost**: ${coins} **1000**`)
       
      setTimeout(() => {
        db.delete(`booster_${message.guild.id}_${user.id}`)
        user.send(`Your daily booster in **${message.guild.name}** has expired.\nYou can buy again to earn more ${coins} LeuxiCoins!`)
      }, 604800000)
     } else
       
    if(args[0] == "custom"){
      
      if(!args[1]) return message.reply("specify a custom item to buy!")
     if(args[1] == item1) {
     //if(item1 !== null) return message.reply("that item does not exist!")
     if(money < item1cost) return message.reply("you don't have enough money to buy that item! :(")
      db.set(`inventory1_${message.guild.id}_${user.id}`, item1)
      db.subtract(`money_${message.guild.id}_${user.id}`, item1cost)
      message.channel.send(`${message.author} successfully bought **${item1}** !\n**Cost**: ${coins} **${item1cost}**`)
     } else
     
    if(args[1] !== item1 && args[1] == item2) {
    // if(item2 !== null) return message.reply("that item does not exist!")
     if(money < item2cost) return message.reply("you don't have enough money to buy that item! :(")
      db.set(`inventory2_${message.guild.id}_${user.id}`, item2)
      db.subtract(`money_${message.guild.id}_${user.id}`, item2cost)
      message.channel.send(`${message.author} successfully bought **${item2}** !\n**Cost**: ${coins} **${item2cost}**`)
     } else

     if(args[1] !== item1 && args[1] !== item2 && args[1] == item3) {
    // if(item3 !== null) return message.reply("that item does not exist!")
     if(money < item3cost) return message.reply("you don't have enough money to buy that item! :(")
      db.set(`inventory3_${message.guild.id}_${user.id}`, item3)
      db.subtract(`money_${message.guild.id}_${user.id}`, item3cost)
      message.channel.send(`${message.author} successfully bought **${item3}** !\n**Cost**: ${coins} **${item3cost}**`)
     } else {
    
     message.reply("I couldn't find that custom item!")
     } 
     
    } else {
      message.reply("I couldn't find that item!")
    }
    }
}
