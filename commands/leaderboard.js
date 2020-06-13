const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true });
const db = require("quick.db");

module.exports = {
  name: "leaderboard",
  aliases: ["lb", "top"],
  description: "Points system for Leuxitai - Leaderboard",
  run: async (bot, message, args) => {
    let togglexp;

    let togglesxp = await db.fetch(`togglexp_${message.guild.id}`);

    if (togglesxp == null) {
      togglexp = "on";
      //return message.channel.send("That command is not enabled!");
    } else {
      togglexp = togglesxp;
    }

    if (togglexp !== "on")
      return message.channel.send("This command is not toggled on!");
    // Get a filtered list (for this guild only), and convert to an array while we're at it.
    const filtered = bot.points
      .filter(p => p.guild === message.guild.id)
      .array();

    // Sort it to get the top results... well... at the top. Y'know.
    const sorted = filtered.sort((a, b) => b.points - a.points);

    // Slice it, dice it, get the top 10 of it!
    const top10 = sorted.splice(0, 10);
    const top50 = sorted.splice(0, 50);
    const top100 = sorted.splice(0, 100);
    let index = 0;

    if (args[0] === "50" || args[0] === "top50") {
      const topp = new Discord.RichEmbed()
        .setAuthor(
          message.guild.name + " Leaderboard - 50",
          message.guild.iconURL
        )
        .setColor(0x1b03a3);
      for (const data of top50) {
        topp.addField(
          `\`${++index})\` ${bot.users.get(data.user).tag}`,
          `~ **Level** ${data.level} (${data.points} XP)\n**Total XP:** ${data.totalpoints}`
        );
      }
      message.author.send(topp);
      message.reply("check your DMs!");
    } else if (args[0] === "100" || args[0] === "top100") {
      const toppp = new Discord.RichEmbed()
        .setAuthor(
          message.guild.name + " Leaderboard - Top 100",
          message.guild.iconURL
        )
        .setColor(0x1b03a3);
      for (const data of top100) {
        toppp.addField(
          `\`${++index}\` ${bot.users.get(data.user).tag}`,
          `~ **Level** ${data.level} (${data.points} XP)\n**Total XP:** ${data.totalpoints}`
        );
      }
      message.author.send(toppp);
      message.reply("check your DMs!");
    } else {
      // Now shake it and show it! (as a nice embed, too!)
      const embed = new Discord.RichEmbed()
        .setAuthor(
          message.guild.name + " Leaderboard - Top 10",
          message.guild.iconURL
        )
        .setColor(0x1b03a3)
        .setFooter("You can also view Top 50, and Top 100.");
      for (const data of top10) {
        embed.addField(
          `\`${++index})\` ${bot.users.get(data.user).tag}`,
          `~ **Level** ${data.level} (${data.points} XP)\n**Total XP:** ${data.totalpoints}`
        );
      }
      message.channel.send(embed);
    }
  }
};
