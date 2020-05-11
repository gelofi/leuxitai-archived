const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const superagent = require('superagent')

module.exports = {
    name: 'pat',
    description: "Pats a person",
    run: async (message, args) => {
      let {body} = await superagent
    .get('https://some-random-api.ml/animu/pat')
      if(!{body}) return message.channel.send('An error occured. Please try again later.')
        var patter = message.mentions.users.first();

        var pat = ['wavv u!!! ~//~ :heart: :heart:',
                'owo >_<',
                'be good ok? :DDDDD',
                'huggers :heart:'];
      
      if (!patter) {
              return message.channel.send("Wanna pat *nothing*\nPat someone! **Usage: `l.pat` <user>**");
          }
          
        const hugEmbed = new Discord.RichEmbed()
        .setTitle(`:heart: ${message.author.username} patted ${patter.username}! :heart:`)
        .setDescription(pat[Math.round(Math.random() * (pat.length - 1))])
        .setImage(body.link)
        .setFooter('Powered by some-random-api.ml')
        .setTimestamp()
        .setColor(0x82e0aa)
        message.channel.send(hugEmbed); 
    }
}