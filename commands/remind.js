const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const ms = require('ms');

module.exports = {
    name: 'remind',
    aliases: ["remindme", "reminder"],
    description: "reminds you in a given time.",
    run: async (bot, message, args) => {
      const time = args[0]
        const remind = args.slice(1).join(" ");
        if(!time) return message.reply("put a timer so I can notify you!")
        
        //if(isNaN(time) == true) return message.channel.send("Not a number, or a time input!");
        
        message.channel.send(`Alright! I will remind you: **${remind}** in __${time}__!`)
        
        setTimeout(function(){
           let embed = new Discord.RichEmbed()
           .setTitle(":alarm_clock:  |  Reminder!")
           .setColor("#3654ff")
           .setDescription(remind)
           .setFooter(`This is a reminder you set ${ms(ms(time), { long: true })} ago.`)
           message.author.send(embed)
         }, ms(time));
    }
}