const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db");
const ms = require("parse-ms");

module.exports = {
    name: 'beg',
    aliases: ["pembarya"],
    description: "Repeats what the user said.",
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
  
  let user = message.author;


  let timeout = 180000;
  let amount = Math.floor(Math.random() * 25)

  let beg = await db.fetch(`beg_${message.guild.id}_${user.id}`);

  if (beg !== null && timeout - (Date.now() - beg) > 0) {
    let time = ms(timeout - (Date.now() - beg));
  
    message.channel.send(`${no} You already begged quite recently!\nBeg again in \`${time.minutes}m ${time.seconds}s\`.`)
  } else {

  let replies = ["You begged another beggar",
                 "You begged a celebrity",
                 "A random person handed you money",
                 "You begged outside a shop", 
                 "You sang a song at the street"]
  
  let result = Math.floor((Math.random() * replies.length))
  
    let moneyEmbed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(user.tag, user.displayAvatarURL)
  .setDescription(`${replies[result]} and received ${coins} **${amount}** coins!`);
  message.channel.send(moneyEmbed)

  db.add(`money_${message.guild.id}_${user.id}`, amount)
  db.set(`beg_${message.guild.id}_${user.id}`, Date.now())


  }

    }
}