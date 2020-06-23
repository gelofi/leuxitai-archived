const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});

module.exports = {
    name: 'invite',
    description: "Sends an invite link to the author in DMs.",
    run: async (bot, message, args) => {
        const invite = new Discord.RichEmbed()
        .setTitle(`Add Leuxitai to your server.`)
        .setThumbnail(bot.user.displayAvatarURL)
        .addField('Invite Link:', `https://tinyurl.com/leuxitai`)
        .setFooter("Thank you for adding me to your server!")
        .setColor(0x1d64ff);
        message.react("💎");
        message.channel.send("Check your DMs!");
        message.author.send(invite);
    }
}