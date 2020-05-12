const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});

module.exports = {
    name: 'sync',
    aliases: ["cleanup"],
    description: "Points system for Leuxitai - Clean up",
    run: async (bot, message, args) => {
    // Get a filtered list (for this guild only).
    const filtered = bot.points.filter( p => p.guild === message.guild.id );

    // We then filter it again (ok we could just do this one, but for clarity's sake...)
    // So we get only users that haven't been online for a month, or are no longer in the guild.
    const rightNow = new Date();
    const toRemove = filtered.filter(data => {
      return !message.guild.members.has(data.user) || rightNow - 2592000000 > data.lastSeen;
    });

    toRemove.forEach(data => {
      bot.points.delete(`${message.guild.id}-${data.user}`);
    });

    message.channel.send(`Level System has been synced!\nI've up ${toRemove.size} users without activity for a month.`);
  }
}