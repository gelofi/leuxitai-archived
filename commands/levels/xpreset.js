const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db");

module.exports = {
    name: 'xpreset',
    aliases: ["xpr", "resetxp"],
    description: "Points system for Leuxitai - Give",
    run: async (bot, message, args) => {
      
    let togglexp;
  
    let togglesxp = await db.fetch(`togglexp_${message.guild.id}`)
    
    if(togglesxp == null){
      togglexp = 'on';
    } else {
      togglexp = togglesxp;
    }
   
   if(togglexp !== 'on') return message.channel.send("This command is not toggled on!");
      
    if(!message.member.hasPermission("MANAGE_GUILD"))
      return message.reply("you do not have the **Manage Server** permission to use this command!");

    const user = message.author;
    
    message.channel.send('Are you sure to reset your XP profile?\nReply `YES` if you are now sure.\nThis menu will end in 30 seconds.')
    .then(() => {
    message.channel.awaitMessages(response => response.content === 'YES', {
      maxMatches: 1,
      time: 30000,
      errors: ['time'],
      })
      .then((collected) => {
      bot.dblevels.set(`level_${message.guild.id}_${user.id}`, 1)
      bot.dblevels.set(`xp_${message.guild.id}_${user.id}`, 1)
      message.channel.send(`Successfully reset the XP Profile for ${user}.`)
        })
        .catch((err) => {
          message.channel.send('XP Reset menu has been canceled.');
          });
      });

    
  }
}
