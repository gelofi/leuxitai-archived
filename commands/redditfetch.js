const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const randomPuppy = require('random-puppy')

module.exports = {
    name: 'redditfetch',
    description: "Fetches a random post from a desired subreddit.",
    run: async (bot, message, args) => {
      if (!args[1]) {
        return message.channel.send("Search for a subreddit to fetch a random post!")
      }
      var subReddits = [`${args[1]}`];
      var random = subReddits[Math.floor(Math.random() * subReddits.length)];

      const img = await randomPuppy(random)

      let embed = new Discord.RichEmbed()
           .setColor(0xff4500)
           .setImage(img)
           .setTitle(`From r/${random}`)
           .setURL(`https://reddit.com/r/${random}`)
           .setFooter("Power for all.", message.author.displayAvatarURL)
           .setTimestamp()
       message.channel.send(embed);
    }
}