const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db");
const ms = require("parse-ms");

module.exports = {
    name: 'crime',
    aliases: ["violate"],
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
    let author = await db.fetch(`crime_${message.guild.id}_${user.id}`)
    let charm = db.fetch(`charm_${message.guild.id}_${user.id}`)
    if(charm == null) charm = "None";
    let timeout = 7200000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms(timeout - (Date.now() - author));
    
        let timeEmbed = new Discord.RichEmbed()
        .setColor("#3654ff")
        .setDescription(`${no} You already did a crime recently!\nTry again after \`${time.minutes}m ${time.seconds}s\`.`);
        message.channel.send(timeEmbed)
      
      } else {

        let replies = ['You wrecked desktops at SterDesigns. You ran away successfully.',
                       'You robbed a janitor.',
                       'You ate at a fastfood chain and you didn\'t pay. You got away successfully.',
                       'You hacked an eWallet app and got away.',
                       'You raid a server and your manager gave you LeuxiCoins.',
                       'As you go fishing with your brother, he caught a large fish. You stole his bucket and sold the fish.',
                       "Nothing, you found a wallet in the street and didn't give it back."]

        let result = Math.floor((Math.random() * replies.length));
        let amount = Math.floor(Math.random() * 460) + 1;
        if(charm == true) amount = Math.floor(Math.random() * 700) + 1;
        let random = Math.floor(Math.random() * 10)
        
        if(random <= 5) {
          
        let embed1 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`${user.tag}`, user.displayAvatarURL)
        .setDescription(`${check} ${replies[result]} You got ${coins} **${amount}** coins.`)
        .setTimestamp()
        message.channel.send(embed1)
        
        db.add(`money_${message.guild.id}_${user.id}`, amount)
        db.set(`crime_${message.guild.id}_${user.id}`, Date.now())
        } else {
          
          let badreply = ["You got caught shoplifting a pack of gum at a store.",
                          "You shred tax documents on your office and got caught.",
                          "You got into a pyramid scheme.",
                          "You robbed a janitor. A police came and caught you in act.",
                          "It's school break time. You ate your classmate's lunch. You got into the Principal's office.",
                          "Nothing. You mocked the government."]
          
          let badresult = Math.floor((Math.random() * badreply.length));
          let decamount = Math.floor(Math.random() * 180) + 1;
          
          let dec = new Discord.RichEmbed()
          .setColor("#c73232")
          .setAuthor(`${user.tag}`, user.displayAvatarURL)
          .setDescription(`${no} ${badreply[badresult]} You got fined ${coins} **${decamount}** coins.`)
          .setTimestamp()
          message.channel.send(dec)
          
          db.subtract(`money_${message.guild.id}_${user.id}`, decamount)
          db.set(`crime_${message.guild.id}_${user.id}`, Date.now())
        }
        };
      
    }
}