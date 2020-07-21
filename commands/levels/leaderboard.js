const Discord = require("discord.js");

module.exports = {
  name: "leaderboard",
  aliases: ["lb", "top"],
  description: "Points system for Leuxitai - Leaderboard",
  run: async (bot, message, args) => {

    const db = bot.db

    let togglexp;

    let togglesxp = await db.fetch(`togglexp_${message.guild.id}`);

    if (togglesxp == undefined) {
      togglexp = "off";
      //return message.channel.send("That command is not enabled!");
    } else {
      togglexp = togglesxp;
    }

    if (togglexp !== "on")
      return message.channel.send("This command is not toggled on!");
    let data = bot.dblevels.all().filter(i => i.ID.startsWith(`xp_${message.guild.id}`)).sort((a, b) => b.data - a.data);
    if (data.length < 1) return message.channel.send("No leaderboard");
    data.length = 20;
    let lb = [];
    for (let i in data)  {
        let id = data[i].ID.split("_")[2];
        let user = await bot.users.get(`${id}`);
        user = user ? user.tag : "Unknown User#0000";
        let rank = data.indexOf(data[i]) + 1;
        let level = bot.dblevels.get(`level_${message.guild.id}_${id}`);
        let xp = data[i].data;
        let xpreq = Math.floor(Math.pow(level / 0.1, 2));
        lb.push({
            user: { id, tag: user },
            rank,
            level,
            xp,
            xpreq
        });
    };

    const embed = new Discord.RichEmbed()
    .setAuthor(`${message.guild.name} Leaderboard`, message.guild.iconURL)
    .setColor("RANDOM")
    lb.forEach(d => {
        embed.addField(`${d.rank}. ${d.user.tag}`, `**Level** - ${d.level}\n**XP** - ${d.xp} / ${d.xpreq}`);
    });
    return message.channel.send(embed);
  }
};