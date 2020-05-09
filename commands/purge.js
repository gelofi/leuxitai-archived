const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});

module.exports = {
    name: 'purge',
    description: "Purges several messages",
    run: async (message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("You don't have enough permissions to do this command!");
            
      if(!args[1]) return message.reply('put an amount of messages to delete! Maximum deleted messages are 100.');
      message.channel.bulkDelete(args[1]);
    }
}