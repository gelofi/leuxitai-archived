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
      //Version 10 .setDescription(`${leuxitai} New Features include:\n—New Command:\n\`toggle\` - toggles a certain command on or off.\n\`embed\` - make your messages embedded.\n\`remindme\` - remind yourself using Leuxitai!\n\`role\` - adds or removes a role to/from the specified user.`)
      //Version 10.4.setDescription(`${leuxitai} New Features include:\n— **Economy System!**\n- now Leuxitai has economy system, race with your friends to be the richest!\n— **Updated XP System**\n- now it has cooldown, with more commands!\n— **New toggles**\n- if you don't have an XP System, or an economy system, just toggle them off.\n— **New commands!**\n— \`dm\` - message someone in dms, 25000 LeuxiCoins.`)
    .setDescription(`${leuxitai} New Features include:\n\n— Updated XP System!\n    - you can now toggle image rank cards!\n\n— More emojis!\n    - custom emojis on embeds, etc! More!\n\n— Updated Logging\n    - more logging information! Links, role change, emojis, channels, etc.\n\n— More Image commands!\n    - you can now crop images into circle, edit it to jail, etc.!\n\n— Removed command: \`dm\`\n    - because this command could be used in malicious intentions, it is removed.\n\n— Advanced Moderation\n    - you can now add banned words, set up a separate moderation log channel, and automatically ban a user in 5 warns! Cool!\n\n— Autoroles slot!\n    - added 1 autorole slot! You can now have three autoroles.`)
      .addField(
        "Check us out!",
        `[Add me to your server!](https://tinyurl.com/leuxitai) (in ${bot.guilds.size} servers now) \n[Join our server!](https://discord.gg/4VXEXWP) (Get notifications about updates, changelogs, etc.)\n[Leuxitai Website](https://leuxitai.glitch.me) - Official Website! (Under Construction)`
      )
      .setColor("#3444f7")
      .setFooter("Leuxitai Update v13.5", bot.user.displayAvatarURL);
    message.channel.send("Check your DMs!");
    message.author.send(changelogs);
  }
};
