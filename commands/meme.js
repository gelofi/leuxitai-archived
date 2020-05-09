const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const randomPuppy = require('random-puppy');

module.exports = {
    name: 'meme',
    description: "Sends a meme from reddit.",
    run: async (message, args) => {
      var subReddits = ["dankmemes", "memes", "me_irl"];
      var randommeme = subReddits[Math.floor(Math.random() * subReddits.length)];

      const img = await randomPuppy(randommeme)

      let memembed = new Discord.RichEmbed()
           .setColor(0xff4500)
           .setImage(img)
           .setTitle(`From r/${randommeme}`)
           .setURL(`https://reddit.com/r/${randommeme}`)
           .setFooter("Reach your dreams alongside memes!", message.author.displayAvatarURL)
           .setTimestamp()
       message.channel.send(memembed)
    }
}