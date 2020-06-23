const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true });

module.exports = {
  name: "manual",
  aliases: ["instruction"],
  description: "sends a full manual for Leuxitai.",
  run: async (bot, message, args) => {
    let manual = new Discord.RichEmbed()
      .setAuthor("Instruction Manual | Leuxitai", bot.user.displayAvatarURL)
    .setColor("#3654ff")
      .setDescription(
        "Leuxitai is designed for fun, moderation, and utilisation.\nLeuxitai has tools such as `redditfetch` to fetch random reddit posts, and `unsplash` to fetch random Unsplash stock photos.\nIf you are not sure how to configure Leuxitai for your server, continue reading.\nOtherwise, read the help command ny doing `l.help` on a server or visiting our website."
      )
      .addField("The Prefix", "If you want to have a custom prefix you can set Leuxitai's prefix by using the `prefix` command.\nExample:\n`l.prefix ?`\n(This will set Leuxitai's prefix to `?`)\n:warning:  You can't set prefixes that are over 3 characters.\nMention Leuxitai in a server and it'll send it's prefix.")
      .addField("Log Channels", "You can set up 2 log channels. One will be for the server activity and one for Leuxitai's moderation activity.\nThe commands for these are `logchannel` and `modchannel`.\nDo `l.help logchannel` and `l.help modchannel` for clarifications.")
    .addField("Moderation System", "**Warning System**\nLeuxitai's warning system has 5 levels.\nLevel 2 will grant a 2m mute.\nLevel 3 and 4 will grant a 5m mute.\nLevel 5 will result in a ban.\nYou NEED to set up roles for the warning system otherwise it will not work.\n\n**Muting**\nYou need to set up mute and main role from your server first to use the `mute` command.\nDo `l.help mute` for more.\n\n**Banned Words**\nIf you don't want a word used on your server, you can add it in a list of banned words.\nDo `l.help bannedwords` for more.\n\n**Anti-spam**\nThe anti-spam system is toggled OFF as default.\n But you can toggle on Leuxitai's Anti-spam detecting system if you want to by using the `toggle` command.\nDo `l.help antispam` for more.")
    .addField("Automatic Features", "Leuxitai can also add autoroles when a user joins to your server. You can use the `autoroles` command to add roles.\nDo `l.help autoroles` for more.")
    .addField("Leveling and Economy", "You can access other locked commands using the economy system, and get coins using the leveling system.\nThese features are toggled OFF on default. You can toggle them on by using the `toggle` command. They are great if you want some thrill for your server.")
    .addField("Event Commands", "These commands are only timely and will be deleted after the event ends.")
    message.author.send(manual);
    message.reply("instructions sent in DMs!");
  }
};
