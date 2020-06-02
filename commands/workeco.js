const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db");
const ms = require("parse-ms");

module.exports = {
    name: 'work',
    aliases: ["job"],
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
    let author = await db.fetch(`work_${message.guild.id}_${user.id}`)
    let charm = db.fetch(`charm_${message.guild.id}_${user.id}`)
    if(charm == null) charm = "None";
    let timeout = 600000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms(timeout - (Date.now() - author));
    
        let timeEmbed = new Discord.RichEmbed()
        .setColor("#3654ff")
        .setDescription(`${no} You already worked recently!\nTry working again after \`${time.minutes}m ${time.seconds}s\`.`);
        message.channel.send(timeEmbed)
      } else {

        let replies = ['You worked as a graphic designer at SterDesigns.',
                       'You sold one of your kidney.',
                       'You joined a slapping contest and you won.',
                       'Someone hired you to eat their leftovers.',
                       'You worked as a programmer and sold a discord bot.',
                       'You spanked a random person on the street, and gave you money.']

        let result = Math.floor((Math.random() * replies.length));
        let amount = Math.floor(Math.random() * 180) + 1;
        if(charm == true) amount = Math.floor(Math.random() * 250) + 1;
        let random = Math.floor(Math.random() * 10)
        
        if(random <= 5) {
          
        let embed1 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`${user.tag}`, user.displayAvatarURL)
        .setDescription(`${check} ${replies[result]} You earned ${coins} **${amount}** coins.`)
        .setTimestamp()
        message.channel.send(embed1)
        
        db.add(`money_${message.guild.id}_${user.id}`, amount)
        db.set(`work_${message.guild.id}_${user.id}`, Date.now())
        } else {
          
          let badreply = ["You tried to work as a graphic designer but you got haters.",
                          "You sold your kidney but got more health complications.",
                          "You ate an expired medicine and needed an ambulance.",
                          "Someone robbed you while working as a janitor.",
                          "You robbed a random person on the street, but you got mugged.",
                          "You got caught violating coronavirus community quarantine."]
          
          let badresult = Math.floor((Math.random() * badreply.length));
          let decamount = Math.floor(Math.random() * 180) + 1;
          
          let dec = new Discord.RichEmbed()
          .setColor("#c73232")
          .setAuthor(`${user.tag}`, user.displayAvatarURL)
          .setDescription(`${no} ${badreply[badresult]} You lost ${coins} **${decamount}** coins.`)
          .setTimestamp()
          message.channel.send(dec)
          
          db.subtract(`money_${message.guild.id}_${user.id}`, decamount)
          db.set(`work_${message.guild.id}_${user.id}`, Date.now())
        }
        };
      
    }
}