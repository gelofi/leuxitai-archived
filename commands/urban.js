const urban = require('urban');
const Discord = require('discord.js');

module.exports = {
    name: 'urban',
    aliases: ["urbandict"],
    desciprtion: 'gives urban dictionary definiton of a random word',
    run: async (bot, message, args) => {
      var img = "https://jurispage.com/wp-content/uploads/sites/337/2013/05/featured-image4.jpg"
      
      if(!args[0]) {
        urban.random().first(json => {
            const def = new Discord.RichEmbed()
                .setTitle(json.word)
                .setDescription(json.definition)
                .setThumbnail(img)
                .setColor("#1a1c33")
                .setFooter(`Written by ${json.author}\nUpvotes: ${json.thumbs_up}   |   Downvotes: ${json.thumbs_down}`);
                message.channel.send(def);
        });
      }
      
         if(args[0]){
           urban(args.slice(0).join(" ")).first(json => {
             const search = new Discord.RichEmbed()
             .setTitle(json.word)
             .setDescription(json.definition)
             .setThumbnail(img)
             .setColor("#1a1c33")
             .setFooter(`Written by ${json.author}\nUpvotes: ${json.thumbs_up}   |   Downvotes: ${json.thumbs_down}`);
             message.channel.send(search)
           })
         }
          
    },
};