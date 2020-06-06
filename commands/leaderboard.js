const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db");
const leveling = require("discord-leveling");

module.exports = {
    name: 'leaderboard',
    aliases: ["lb", "top"],
    description: "Points system for Leuxitai - Leaderboard",
    run: async (bot, message, args) => {
  
    let togglexp;
  
    let togglesxp = await db.fetch(`togglexp_${message.guild.id}`)
    
    if(togglesxp == null){
      togglexp = 'off';
      //return message.channel.send("That command is not enabled!");
    } else {
      togglexp = togglesxp;
    }
      
      if(togglexp !== 'on') return message.channel.send("This command is not toggled on!")
    
      if (message.mentions.users.first()) {
      var output = await leveling.Leaderboard({
        search: message.mentions.members.first().id
      });
      message.channel.send(`**${message.mentions.users.first().tag}** is No. ${output.placement} on the leaderboards!`);
 
      //Searches for the top 3 and outputs it to the user.
    } else {
 
      leveling.Leaderboard({
        limit: 10 //Only takes top 3 ( Totally Optional )
      }).then(async users => { //make sure it is async
 
        if (users[0]) var firstplace = await bot.fetchUser(users[0].userid) 
        if (users[1]) var secondplace = await bot.fetchUser(users[1].userid)
        if (users[2]) var thirdplace = await bot.fetchUser(users[2].userid)
        if (users[3]) var four = await bot.fetchUser(users[3].userid) 
        if (users[4]) var piv = await bot.fetchUser(users[4].userid)
        if (users[5]) var ses = await bot.fetchUser(users[5].userid)
        if (users[6]) var set = await bot.fetchUser(users[6].userid) 
        if (users[7]) var otsch = await bot.fetchUser(users[7].userid)
        if (users[8]) var syam = await bot.fetchUser(users[8].userid)
        if (users[9]) var sampe = await bot.fetchUser(users[9].userid) 
        
        const lb = new Discord.RichEmbed()
        .setAuthor(`Universal Leaderboard`, message.guild.iconURL)
        .setDescription(`
          \`1)\` **${firstplace && firstplace.tag || 'Nobody Yet'}** - Lvl. ${users[0] && users[0].level || 'N/A'} (${users[0] && users[0].xp || 'N/A'} XP)
\`2)\` **${secondplace && secondplace.tag || 'Nobody Yet'}** - Lvl. ${users[1] && users[1].level || 'N/A'} (${users[1] && users[1].xp || 'N/A'} XP)
\`3)\` **${thirdplace && thirdplace.tag || 'Nobody Yet'}** - Lvl. ${users[2] && users[2].level || 'N/A'} (${users[2] && users[2].xp || 'N/A'} XP)
\`4)\` **${four && four.tag || 'Nobody Yet'}** - Lvl. ${users[3] && users[3].level || 'N/A'} (${users[3] && users[3].xp || 'N/A'} XP)
\`5)\` **${piv && piv.tag || 'Nobody Yet'}** - Lvl. ${users[4] && users[4].level || 'N/A'} (${users[4] && users[4].xp || 'N/A'} XP)
\`6)\` **${ses && ses.tag || 'Nobody Yet'}** - Lvl. ${users[5] && users[5].level || 'N/A'} (${users[5] && users[5].xp || 'N/A'} XP)
\`7)\` **${set && set.tag || 'Nobody Yet'}** - Lvl. ${users[6] && users[6].level || 'N/A'} (${users[6] && users[6].xp || 'N/A'} XP)
\`8)\` **${otsch && otsch.tag || 'Nobody Yet'}** - Lvl. ${users[7] && users[7].level || 'N/A'} (${users[7] && users[7].xp || 'N/A'} XP)
\`9)\` **${syam && syam.tag || 'Nobody Yet'}** - Lvl. ${users[8] && users[8].level || 'N/A'} (${users[8] && users[8].xp || 'N/A'} XP)
\`10)\` **${sampe && sampe.tag || 'Nobody Yet'}** - Lvl. ${users[9] && users[9].level || 'N/A'} (${users[9] && users[9].xp || 'N/A'} XP)
`)
        .setColor("#3654ff")
        .setFooter("The leaderboard is a collection of top 10 users of all servers with Leuxitai XP System.")
         message.channel.send(lb)
      })
 
    }
}
}