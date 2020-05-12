const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const PREFIX = 'l.';
module.exports = {
    name: 'changelogs',
    aliases: ["chlog", "changelog"],
    description: "Gives the latest changelogs.",
    run: async (bot, message, args) => {
        const changelogs = new Discord.RichEmbed()
        .setAuthor("Recent Changelogs")
        .setDescription("<:leuxitai:701373103019655218> New Features include:\n— Custom prefixes!\n- still on beta build. Bugs aren't discovered yet.\n— More Images!\n- Fox, Bird, Pat, and Wallpaper commands are added. They use an API randomizer.\n— Updated the command handler\n- IT IS NOW BETTER- index.js is now 148 lines, instead of 400!\n— New Command: `sync`\n- syncs the level system and prunes inactive members from the database.")
        .addField("Check us out!", `[Add me to your server!](https://tinyurl.com/leuxitai) (in ${bot.guilds.size} servers now) \n[Join our server!](https://discord.gg/4VXEXWP) (Get notifications about updates, changelogs, etc.)\n[Leuxitai Website](https://leuxitai-dashboard.glitch.me) - Official Website! (Under Construction)`)
        .setColor("#3444f7")
        .setFooter('Leuxitai Update v9.1', bot.user.displayAvatarURL)
        message.channel.send("Check your DMs!");
        message.author.send(changelogs);
     }
}
