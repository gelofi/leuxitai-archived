const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});

module.exports = {
    name: 'fox',
    aliases: ["kitsune"],
    description: "Sends a random fox image",
    run: async (bot, message, args) => {
    
        let dEmbed = new Discord.RichEmbed()
        .setColor(0x5893ea)
        .setAuthor('Foxes!', message.guild.iconURL)
        .setImage(`http://randomfox.ca/images/${Math.floor(Math.random() * 122) * 1}.jpg`)
        .setTimestamp()
        .setFooter('Kitsune?\nPowered by some-random-api.ml', bot.user.displayAvatarURL)
        .setTimestamp()
        message.channel.send(dEmbed)
    }
}