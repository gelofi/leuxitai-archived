const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const musakui = require('musakui');
const db = require("quick.db");

module.exports = {
    name: 'redditfetch',
    aliases: ["reddit"],
    description: "Fetches a random post from a desired subreddit.",
    run: async (bot, message, args) => {
      
      if(!args[0]) return message.reply("put a subreddit to fetch a post from!");
        const subr = args[0]
        
        musakui(`${args[0]}`)
         .then(result => {
         //if(nsfw !== "off" && result.nsfw == true) return message.channel.send("")
         if(!message.channel.nsfw && result.nsfw == true) return message.channel.send("Failed! The fetched post was NSFW, this channel isn't an NSFW channel!");
        
          const reddit = new Discord.RichEmbed()
               .setDescription(`**[r/${subr}](https://reddit.com/r/${subr})** • [u/${result.author}](https://reddit.com/u/${result.author}) | [Post~link](${result.reddit_url})\n\n**${result.title}**\n\n${result.content}`)
               .setImage(result.media_url)
               .setColor("#ff5700")
               .setFooter(`Upvotes: ${result.upvotes} | Downvotes: ${result.downvotes} | Comments: ${result.comments}`)
               message.channel.send(reddit)
        }).catch(error => {
           message.channel.send("I can't find that subreddit!");
        })
        }
}