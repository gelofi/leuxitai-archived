const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const PREFIX = 'l.';
module.exports = {
    name: 'changelogs',
    description: "Gives the latest changelogs.",
    run: async (bot, message, args) => {
        const changelogs = new Discord.RichEmbed()
        .setAuthor("Recent Changelogs")
        .setDescription("<:leuxitai:701373103019655218> New Features include:\n— Level System!\n-This feature is in beta stage. It's not much YET, but it works.")
        .addField("Check us out!", `[Add me to your server!](https://tinyurl.com/leuxitai) (in ${bot.guilds.size} servers now) \n[Join our server!](https://discord.gg/4VXEXWP) (Get notifications about updates, changelogs, etc.)\n[Leuxitai Website](https://leuxitai-dashboard.glitch.me) - Official Website! (Under Construction)`)
        .setColor("#3444f7")
        .setFooter('Leuxitai Update v8.0', bot.user.displayAvatarURL)
        message.channel.send("Check your DMs!");
        message.author.send(changelogs);
     }
}
