const Discord = require('discord.js')
const ms = require("parse-ms");

module.exports = {
    name: 'rob',
    aliases: ["nakaw", "nacaw"],
    description: "roulette command for eco",
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
  
  if(args[0] === `<@${message.author.id}>`) return message.reply("you can't rob yourself! but why tho")
  let mem = message.author
  let user = message.mentions.members.first()
  if(!user) return message.reply("specify a user to rob them!")
      
let targetuser = await db.fetch(`money_${message.guild.id}_${user.id}`)
let author = await db.fetch(`rob_${message.guild.id}_${user.id}`)
let author2 = await db.fetch(`money_${message.guild.id}_${user.id}`)
let author3 = await db.fetch(`money_${message.guild.id}_${mem.id}`)
let timeout = 600000;

if (author !== null && timeout - (Date.now() - author) > 0) {
    let time = ms(timeout - (Date.now() - author));

    message.reply(`you just robbed someone quite recently!\nCheck again after \`${time.minutes}m ${time.seconds}s\`.`)
  } else {

if (author3 < 200) {
    return message.reply("you need atleast 200 coins in your wallet to rob someone!")

}
let moneyEmbed2 = new Discord.RichEmbed()
  .setColor("#3654ff")
  .setAuthor("Nothing to get robbed.", message.guild.iconURL)
  .setDescription(`${no} **${user.user.username}** does not have anything you can rob. Try again if they have money!`);
if (targetuser <= 0) {
    return message.channel.send(moneyEmbed2)
}

let dice = Math.floor(Math.random() * 10)
    
let random = Math.floor(Math.random() * author2) + 1;
    
var protection = db.fetch(`robshield_${message.guild.id}_${user.id}`)
if(protection == null) protection == "None";
if(protection == true) random = Math.floor(Math.random() * author2 / 2) + 1;
    
if(dice <= 5) {
let embed = new Discord.RichEmbed()
.setAuthor("Robbed!", user.user.displayAvatarURL)
.setDescription(`${check} You robbed ${user} and got away with ${coins} **${random}** coins.`)
.setColor("#4287f5")
message.channel.send(embed)

db.subtract(`money_${message.guild.id}_${user.id}`, random)
db.add(`money_${message.guild.id}_${mem.id}`, random)
db.set(`rob_${message.guild.id}_${user.id}`, Date.now())
} else {
  let failed = new Discord.RichEmbed()
  .setAuthor("Caught!", user.user.displayAvatarURL)
  .setDescription(`${no} You robbed ${user} but you got caught! You got fined ${coins} **${random}** coins.`)
  .setColor("#f55a42")
  message.channel.send(failed)
  db.subtract(`money_${message.guild.id}_${mem.id}`, random)
  db.set(`rob_${message.guild.id}_${user.id}`, Date.now())
}
};
    }
}