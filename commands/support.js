const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});

module.exports = {
    name: 'support',
    description: "Sends a server invite link to the author in DMs.",
    run: async (bot, message, args) => {
        const support = new Discord.RichEmbed()
        .setAuthor("Need support?", bot.user.displayAvatarURL)
        .setDescription("[Click here to join our Discord Server to get assistance.](https://discord.gg/4VXEXWP)")
        .setFooter("Support is not always given immediately!")
        .setColor(0xff3333)
        message.react('701373103019655218');
        message.channel.send("Check your DMs!");
        message.author.send(support);
    }
}