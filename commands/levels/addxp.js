const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db");

module.exports = {
    name: 'give-xp',
    aliases: ["g", "gxp", "addxp", "xp+"],
    description: "Points system for Leuxitai - Give",
    run: async (bot, message, args) => {
      
    let togglexp;

    let togglesxp = await db.fetch(`togglexp_${message.guild.id}`);

    if (togglesxp == null) {
      togglexp = "on";
    } else {
      togglexp = togglesxp;
    }

    if (togglexp !== "on")
      return message.channel.send("This command is not toggled on!");

    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.reply(
        "you do not have the **Manage Server** permission to use this command!"
      );

    const user = message.mentions.users.first();
    if (!user) return message.reply("mention someone!");

    const pointsToAdd = parseInt(args[1], 10);
    if (!pointsToAdd) return message.reply("put an amount of XP to give!");
    if (isNaN(pointsToAdd)) return message.reply("that's not a number!");

    await bot.dblevels.math(`xp_${message.guild.id}_${user.id}`, "+", pointsToAdd);
    let exp = bot.dblevels.get(`xp_${message.guild.id}_${user.id}`);
    message.channel.send(
      `Given successfully!\n${user} has received **${pointsToAdd}** XP!\nNew XP: **${exp}**.`
    );
  }
}
