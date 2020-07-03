const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const cb = require("cumberbatch-name");

module.exports = {
    name: 'cumberbatch',
    aliases: ["cb"],
    description: "sends a random cumberbatch name.",
    run: async (bot, message, args) => {
        
        message.channel.send(`Your new name is... \`${cb()}\` !`);
    }
}