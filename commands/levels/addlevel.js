const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true });
const db = require("quick.db");

module.exports = {
  name: "addlevel",
  aliases: ["level+", "leveladd"],
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
    if(user.bot) return message.reply("bots can't get levels and aren't eligible for ranking.")

    const pointsToAdd = parseInt(args[1], 10);
    if (!pointsToAdd) return message.reply("put an amount of levels to give!");
    if (isNaN(pointsToAdd)) return message.reply("that's not a number!");

    await bot.dblevels.math(`level_${message.guild.id}_${user.id}`, "+", pointsToAdd);
    let userLevel = bot.dblevels.get(`level_${message.guild.id}_${user.id}`);
    message.channel.send(
      `Given successfully!\n${user} has received **${pointsToAdd}** levels!\nNew Level: **${userLevel}**.`
    );
  }
};
