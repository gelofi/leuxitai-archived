const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});

module.exports = {
    name: 'shardstatus',
    aliases: ["shards", "shardstats"],
    description: "Repeats what the user said.",
    run: async (bot, message, args) => {
      
      if(message.author.id !== "563351780944248843") return
      
    try {
      const promises = [
			bot.shard.fetchClientValues('guilds.size'),
			bot.shard.broadcastEval('this.guilds.reduce((prev, guild) => prev + guild.memberCount, 0)'),
		];

		return Promise.all(promises)
			.then(results => {
				const totalGuilds = results[0].reduce((prev, guildCount) => prev + guildCount, 0);
				const totalMembers = results[1].reduce((prev, memberCount) => prev + memberCount, 0);
				return message.channel.send(`Server count: ${totalGuilds}\nMember count: ${totalMembers}`);
			})
    } catch (error) {
      message.channel.send("Currently, I am not running shards.")
    }
    }
}