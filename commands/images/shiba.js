const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const animals = require("random-animals-api");

module.exports = {
    name: 'shiba',
    aliases: ["shibe"],
    description: "sends a random shiba image.",
    run: async (bot, message, args) => {
    
    let shibaimg;
      
    const shiba = await animals.shiba().then(url => shibaimg = url)
    const shibe = new Discord.RichEmbed()
    .setTitle("🐕 Shibas!")
    .setImage(shibaimg)
    .setColor("#e6a755")
    .setFooter("Aren't they kawaii?")
    message.channel.send(shibe)
    }
}