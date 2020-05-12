const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});

module.exports = {
    name: 'poll',
    description: "Initiates a poll.",
    run: async (message, args) => {
        if (!args[0]) {
            return message.channel.send('You must provide a question! **Usage: `l.poll` <question>**');
        } else
      if(args[0] === "ab"){
        message.react("🅰️");
        message.react("🅱️");
      } else {
      message.react("⬆️");
      message.react("⬇️");
      }
    }
}