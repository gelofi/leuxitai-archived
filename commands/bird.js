const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const superagent = require('superagent');

module.exports = {
    name: 'bird',
    aliases: ["birb"],
    description: "Sends a random bird image",
    run: async (bot, message, args) => {
      let {body} = await superagent
    .get('https://some-random-api.ml/img/birb')
    if(!{body}) return message.channel.send('An error occured! Please try again.')

        let dEmbed = new Discord.RichEmbed()
        .setColor(0x5893ea)
        .setAuthor('Birbo!', message.guild.iconURL)
        .setImage(body.link)
        .setTimestamp()
        .setFooter('Nice co—\nPowered by some-random-api.ml', bot.user.displayAvatarURL)
        .setTimestamp()
        message.channel.send(dEmbed)
    }
}