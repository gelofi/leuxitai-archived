const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});

module.exports = {
    name: 'give',
    aliases: ["g"],
    description: "Points system for Leuxitai - Give",
    run: async (bot, message, args) => {
    // Limited to guild owner - adjust to your own preference!
    if(!message.member.hasPermission("ADMINISTRATOR"))
      return message.reply("you do not have enough permissions to do this command!");

    const user = message.mentions.users.first()
    if(!user) return message.reply("mention someone or put their ID!");

    const pointsToAdd = parseInt(args[0], 10);
    if(!pointsToAdd) 
      return message.reply("put an amount of XP to give!")

    // Ensure there is a points entry for this user.
    bot.points.ensure(`${message.guild.id}-${user.id}`, {
      user: message.author.id,
      guild: message.guild.id,
      points: 0,
      level: 1
    });

    // Get their current points.
    let userPoints = bot.points.get(`${message.guild.id}-${user.id}`, "points");
    userPoints += pointsToAdd;
    
    // And we save it!
    bot.points.set(`${message.guild.id}-${user.id}`, userPoints, "points")

    message.channel.send(`Given successfully.\n${user.tag} has received ${pointsToAdd} points, and now has ${userPoints} points.`);
  }
}