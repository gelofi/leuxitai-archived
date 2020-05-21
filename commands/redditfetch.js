const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const musakui = require('musakui');

module.exports = {
    name: 'redditfetch',
    aliases: ["reddit"],
    description: "Fetches a random post from a desired subreddit.",
    run: async (bot, message, args) => {
      if(!args[0]) return message.reply("put a subreddit to fetch a post from!")
        
        const subr = args[0]
        
        musakui(`${args[0]}`)
         .then(result => {
          if(result.nsfw == true) return message.channel.send("The post that was fetched was NSFW! No NSFW posts!")
               const reddit = new Discord.RichEmbed()
               .setDescription(`**[r/${subr}](https://reddit.com/r/${subr})** • [u/${result.author}](https://reddit.com/u/${result.author}) | [Post~link](${result.reddit_url})`)
               .addField(`${result.title}`, `_ _`)
               .setImage(result.media_url)
               .setColor("#ff5700")
               .setFooter(`Upvotes: ${result.upvotes} | Downvotes: ${result.downvotes} | Comments: ${result.comments}`)
               message.channel.send(reddit)
               }) 
        
         .catch(error => console.log(error));
    }
}