const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db");

module.exports = {
    name: 'leaderboard',
    aliases: ["lb", "top"],
    description: "Points system for Leuxitai - Leaderboard",
    run: async (bot, message, args) => {
  
    let togglexp;
  
    let togglesxp = await db.fetch(`togglexp_${message.guild.id}`)
    
    if(togglesxp == null){
      togglexp = 'on';
      //return message.channel.send("That command is not enabled!");
    } else {
      togglexp = togglesxp;
    }
      
      
    // Get a filtered list (for this guild only), and convert to an array while we're at it.
  const filtered = bot.points.filter( p => p.guild === message.guild.id ).array();

  // Sort it to get the top results... well... at the top. Y'know.
  const sorted = filtered.sort((a, b) => b.points - a.points);

  // Slice it, dice it, get the top 10 of it!
  const top10 = sorted.splice(0, 10);
  const top20 = sorted.splice(0, 20);
  const top30 = sorted.splice(0, 30);
  let index = 0;
  let indexx = 10;
  let indexxx = 20;
    if(args[0] === "2"){
     // if(togglexp !== 'on' || 'off') return
      if(togglexp === 'off') return message.channel.send("This command is not toggled on!");
      const topp = new Discord.RichEmbed()
      .setAuthor("Leaderboard - 11 ~ 20", message.guild.iconURL)
      .setColor(0x1b03a3)
      for(const data of top20){
        topp.addField(`\`${++indexx})\` ${bot.users.get(data.user).tag}`, `~ has ${data.points} points (currently level ${data.level})`)
      }
      message.channel.send(topp)
    } else 
  if(args[0] === "3"){
    //if(togglexp !== 'on' || 'off') return
    if(togglexp === 'off') return message.channel.send("This command is not toggled on!");
    const toppp = new Discord.RichEmbed()
    .setAuthor("Leaderboard - 21 ~ 30", message.guild.iconURL)
    .setColor(0x1b03a3)
    for(const data of top30){
      toppp.addField(`\`${++indexxx}\` ${bot.users.get(data.user).tag}`, `~ has ${data.points} points (currently level ${data.level})`)
    }
    message.channel.send(toppp);
  } else
  if(!args[0]){
    //if(togglexp !== 'on' || 'off') return
    if(togglexp === 'off') return message.channel.send("This command is not toggled on!");
  // Now shake it and show it! (as a nice embed, too!)
  const embed = new Discord.RichEmbed()
    .setAuthor("Leaderboard - Top 10", message.guild.iconURL)
    .setColor(0x1b03a3);
  for(const data of top10) {
    embed.addField(`\`${++index})\` ${bot.users.get(data.user).tag}`, `~ has ${data.points} points (currently level ${data.level})`)
  }
  message.channel.send(embed);
  }
}
}