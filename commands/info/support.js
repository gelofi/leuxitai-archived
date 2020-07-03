

const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});

module.exports = {
    name: 'support',
    description: "Sends a server invite link to the author in DMs.",
    run: async (bot, message, args) => {
        const support = new Discord.RichEmbed()
        .setAuthor("Need support? Wanna support us?", bot.user.displayAvatarURL)
        .setDescription("**Support Us!**\nDonate to us to support Leuxitai's on going development.\n[Donate to the Developer](https://www.paypal.me/fizx26)\n\n**Others**\n[Vote for Leuxitai!](https://top.gg/bot/698529160938782720)\n[Get support on our server!](https://discord.gg/4VXEXWP)\n[Add me to your server!](https://discord.com/oauth2/authorize?client_id=698529160938782720&permissions=8&scope=bot)")
        .setColor(0x3654ff)
        message.react('701373103019655218');
        message.channel.send("Check your DMs!");
        message.author.send(support);
  
    }
}