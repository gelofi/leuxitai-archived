const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db");
const ms = require("parse-ms");

module.exports = {
    name: 'addmoney',
    aliases: ["moneyadd", "money+"],
    description: "roulette command for eco",
    run: async (bot, message, args, util) => {
  
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
  
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("you don't have enough permissions to give people money!")

  let user = message.mentions.members.first()
  if(!user) return message.reply("specify a user to give them money!")
  if(!args[1]) return message.reply("please set a desired amount to add!")
    if (isNaN(args[1])) return message.reply("that is not a number!")
    db.add(`money_${message.guild.id}_${user.id}`, parseInt(args[1]))
    let bal = await db.fetch(`money_${message.guild.id}_${user.id}`)

    let moneyEmbed = new Discord.RichEmbed()
    .setColor("#3654ff")
    .setDescription(`${check} Added ${coins} **${args[1]}** coins to ${user.user.tag}\nNew Balance: ${bal}`);
    message.channel.send(moneyEmbed)
    }
}