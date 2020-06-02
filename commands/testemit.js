const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});

module.exports = {
    name: 'test',
    aliases: ["emit"],
    description: "Repeats what the user said.",
    run: async (bot, message, args) => {
        
      bot.emit("guildMemberAdd", message.member);
      message.channel.send('emitted')
    }
}