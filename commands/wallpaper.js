const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});

module.exports = {
    name: 'wallpaper',
    aliases: ["unsplash", "images", "randomimage"],
    description: "Sends a random wallpaper image",
    run: async (bot, message, args) => {
            let cEmbed = new Discord.RichEmbed()
            .setColor(0x5893ea)
            .setAuthor('Wallpapers / Random Images', message.guild.iconURL)
            .setDescription("[From Unsplash](https://unsplash.com/)")
            .setImage("https://source.unsplash.com/random?sig=" + Math.random())
            .setFooter('Stock photos. Now.')
            .setTimestamp()
            message.channel.send(cEmbed)
    }
}