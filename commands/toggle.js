const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db")

module.exports = {
    name: 'toggle',
    aliases: ["tg"],
    description: "Changes the prefix of the bot",
    run: async (bot, message, args) => {
      
    let togglexp;
  
    let togglesxp = await db.fetch(`togglexp_${message.guild.id}`)
    
    if(togglesxp == null){
      togglexp = 'on';
      //return message.channel.send("That command is not enabled!");
    } else {
      togglexp = togglesxp;
    }
      
    if(!message.member.hasPermission('MANAGE_GUILD')) return message.reply("you don't have enough permissions to change my prefix!");
        if(!args[0]) return message.reply("please specify a command to turn on/off!");
        
        if(args[0] === "xp"){
        if(!args[1]) return message.reply("toggle what? On or Off?")
        if(!args[1] == 'on' || !args[1] == 'off') return message.reply("wat? Toggle it on, or off!")
        await db.set(`togglexp_${message.guild.id}`, args[1])
        var embedp = new Discord.RichEmbed()
        .setDescription(`Toggled XP System \`${args[1]}\` successfully.`)
        .setColor("#3654ff")
        message.channel.send(embedp)
        }
      
      
      
    }
}