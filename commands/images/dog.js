const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const superagent = require('superagent');

module.exports = {
    name: 'dog',
    aliases: ["doggo", "puppy"],
    description: "Sends a random dog image",
    run: async (bot, message, args) => {
      let {body} = await superagent
    .get('https://dog.ceo/api/breeds/image/random')
    if(!{body}) return message.channel.send('An error occured! Please try again.')

        let dEmbed = new Discord.RichEmbed()
        .setColor(0x5893ea)
        .setAuthor('Doggo!', message.guild.iconURL)
        .setImage(body.message)
        .setTimestamp()
        .setFooter('Cute heavens.', bot.user.displayAvatarURL)
        .setTimestamp()
        message.channel.send(dEmbed)
    }
}