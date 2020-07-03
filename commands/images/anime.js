const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const randomPuppy = require('random-puppy');

module.exports = {
    name: 'anime',
    description: "Sends a random anime gif from reddit.",
    run: async (bot, message, args) => {
       var animeSubReddits = ["animegifs"];
      var randomanime = animeSubReddits[Math.floor(Math.random() * animeSubReddits.length)];

      const image = await randomPuppy(randomanime)

      let animembed = new Discord.RichEmbed()
           .setColor(0xff4500)
           .setImage(image)
           .setTitle(`Animes from r/${randomanime}`)
           .setURL(`https://reddit.com/r/${randomanime}`)
           .setFooter("l.anime", message.author.displayAvatarURL)
       message.channel.send(animembed)
    }
}