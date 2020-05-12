const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});

module.exports = {
    name: 'sync',
    aliases: ["cleanup"],
    description: "Points system for Leuxitai - Clean up",
    run: async (bot, message, args) => {
      if(!message.member.hasPermission("MANAGE_GUILD"))
      return message.reply("you do not have enough permissions to do this command!");

    // Get a filtered list (for this guild only).
    const filtered = bot.points.filter( p => p.guild === message.guild.id );

    // We then filter it again (ok we could just do this one, but for clarity's sake...)
    // So we get only users that haven't been online for a month, or are no longer in the guild.
    const rightNow = new Date();
    const toRemove = filtered.filter(data => {
      return !message.guild.members.has(data.user) || rightNow - 2592000000 > data.lastSeen;
    });
    message.channel.send('Are you sure to sync, and DELETE user profiles that has no activity for the past month?\nReply `YES` if you are now sure.\nThis will end in 30 seconds.')
    .then(() => {
    message.channel.awaitMessages(response => response.content === 'YES', {
      maxMatches: 1,
      time: 30000,
      errors: ['time'],
      })
      .then((collected) => {
          toRemove.forEach(data => {
        bot.points.delete(`${message.guild.id}-${data.user}`);
          });
      message.channel.send(`Level System has been synced!\nI've updated and pruned ${toRemove.size} users without activity for a month.`);
        })
        .catch((err) => {
          message.channel.send('Syncing and pruning has been cancelled.');
          });
      });
    
    
  }
}