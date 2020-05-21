const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});

module.exports = {
    name: 'percent',
    aliases: ["percentile", "%"],
    description: "rates you",
    run: async (bot, message, args) => {
      var me = message.author.username
        var user = message.mentions.users.first();
        var hund = Math.floor(Math.random() * 100);
        var fif = Math.floor(Math.random() * 50)
        var reply = ["I definitely think",
                    "It's sure that", 
                    "It seems that",
                    "Based on results,",
                    "My senses say",
                    "It is legit,",
                    "No doubt,",
                    "Yes!",]
        var number = Math.floor(Math.random() * 100)
        
        if(args[0] === `${user}`) {
          if(!args[1]) return message.reply(`what am I gonna test ${user.tag} on?`);
          if(args[2]) return message.channel.send(`${reply[Math.round(Math.random() * (reply.length - 1))]} **${user}** is ${hund}% **${args[1]}** and ${fif * 1}% **${args[2]}**.`)
        
          return message.channel.send(`${reply[Math.round(Math.random() * (reply.length - 1))]} ${user} is ${hund}% ${args[1]}.`);
        
        }
      
     if(args[0] !== `${user}`) {
        if(!args[0]) return message.reply("what am I gonna test you on? (Use commas to seperate)");
        if(args[1]) return message.channel.send(`${reply[Math.round(Math.random() * (reply.length - 1))]} **${me}** is ${hund}% **${args[0]}** and ${fif * 1}% **${args[1]}**.`);

        return message.channel.send(`${reply[Math.round(Math.random() * (reply.length - 1))]} **${me}** is ${hund}% **${args[0]}**.`);
     }
      
    }
}