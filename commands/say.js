const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const PREFIX = 'l.';
module.exports = {
    name: 'say',
    description: "Repeats what the user said.",
    run: async (message, args) => {
        if(!args.slice(1).join(" ")) return message.channel.send("Say something!")
      .then(msg => {
    message.delete(4000)
          return;
      })
        const sayMsg = args.slice(1).join(" ");
        message.delete().catch(O_o=>{}); 
        message.channel.send(sayMsg);
    }
}