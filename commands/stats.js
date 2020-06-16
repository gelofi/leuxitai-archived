const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});

module.exports = {
    name: 'status',
    aliases: ["stats", "statistics"],
    description: "Repeats what the user said.",
    run: async (bot, message, args) => {
      
        let totalSeconds = (bot.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
      
        let stats = new Discord.RichEmbed()
        .setAuthor("Leuxitai Status", bot.user.displayAvatarURL)
        .setDescription("View servers, channels, users, and uptime.")
        .setColor("#3654ff")
        .addField("**Servers in**", `${bot.guilds.size}`, true)
        .addField("**Channels**", `${bot.channels.size}`, true)
        .addField("**Users**", `${bot.users.size}`, true)
        .addField("**Status**", "Online", true)
        .addField("**Last Updated**", "June 16, 2020", true)
        .addField("**Uptime**", `${days}d ${hours}h ${minutes}m ${seconds}s`, true)
        message.channel.send(stats)
    }
}