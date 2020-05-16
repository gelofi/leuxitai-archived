const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true });

module.exports = {
  name: "changelogs",
  aliases: ["chlog", "changelog"],
  description: "Gives the latest changelogs.",
  run: async (bot, message, args) => {
    let leuxitai = "<:leuxitai:701373103019655218>"
    const changelogs = new Discord.RichEmbed()
      .setAuthor("Recent Changelogs")
      //Version 9 .setDescription("<:leuxitai:701373103019655218> New Features include:\n— Custom prefixes!\n- still on beta build. Bugs aren't discovered yet.\n— More Images!\n- Fox, Bird, Pat, and Wallpaper commands are added. They use an API randomizer.\n— Updated the command handler\n- IT IS NOW BETTER- index.js is now 148 lines, instead of 400!\n— New Command: `sync`\n- syncs the level system and prunes inactive members from the database.\n—New Command: `translate`\n- translates the given text to the desired language\n—New Command: `percent`\n- rates your percentage of what the first argument is\n—New Command: `logchannel`\n- changes the log channel for kick, ban, prefix, etc.\n— New Command: `mute`\n- temporarily mutes a person by the defined time.\n— New Command: `unmute`\n- unmutes a muted member.\n— New Command: `setmuterole` / `setmainrole`\n- sets up the mute role\n- sets up the main role\n— New Command: `warn` / `unwarn`\n- warns a user\n- unwarns a user")
      .setDescription(`${leuxitai} New Features include:\n—New Command: \`toggle\`\n- toggles a certain command on or off.`)
      .addField(
        "Check us out!",
        `[Add me to your server!](https://tinyurl.com/leuxitai) (in ${bot.guilds.size} servers now) \n[Join our server!](https://discord.gg/4VXEXWP) (Get notifications about updates, changelogs, etc.)\n[Leuxitai Website](https://leuxitai-dashboard.glitch.me) - Official Website! (Under Construction)`
      )
      .setColor("#3444f7")
      .setFooter("Leuxitai Update v10.1", bot.user.displayAvatarURL);
    message.channel.send("Check your DMs!");
    message.author.send(changelogs);
  }
};
