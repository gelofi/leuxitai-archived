const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const musakui = require('musakui');

module.exports = {
    name: 'meme',
    description: "Sends a meme from reddit.",
    run: async (bot, message, args) => {
      //if(!args[1]) return message.reply("put a subreddit to fetch a post from!")
        
        const subReddits = ["me_irl", "memes", "dankmemes"]
        var randommeme = subReddits[Math.floor(Math.random() * subReddits.length)];
        musakui(randommeme)
         .then(result => {
               const reddit = new Discord.RichEmbed()
               .setDescription(`**[r/${randommeme}](https://reddit.com/r/${randommeme})** • [u/${result.author}](https://reddit.com/u/${result.author}) | [Post~link](${result.reddit_url})`)
               .addField(`${result.title}`, `_ _`)
               .setImage(result.media_url)
               .setColor("#ff5700")
               .setFooter(`Upvotes: ${result.upvotes} | Downvotes: ${result.downvotes} | Comments: ${result.comments}`)
               message.channel.send(reddit)
               }) 
        
         .catch(error => console.log(error));
    }
}