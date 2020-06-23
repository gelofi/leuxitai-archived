const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const superagent = require('superagent');

module.exports = {
    name: 'cat',
    aliases: ["catto"],
    description: "Sends a random cat image",
    run: async (bot, message, args) => {
        let {body} = await superagent
        .get('http://aws.random.cat/meow')
        if(!{body}) return message.channel.send('An error occured! Please try again.')

            let cEmbed = new Discord.RichEmbed()
            .setColor(0x5893ea)
            .setAuthor('Cats!', message.guild.iconURL)
            .setImage(body.file)
            .setTimestamp()
            .setFooter('Cat lovers are called Ailurophiles.', bot.user.displayAvatarURL)
            .setTimestamp()
            message.channel.send(cEmbed)
    }
}