const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const request = require("node-superfetch")

module.exports = {
    name: 'autocomplete',
    aliases: ["google", "auto"],
    description: "Repeats what the user said.",
    run: async (bot, message, args) => {
      
      try {
			const { text } = await request
				.get('https://suggestqueries.google.com/complete/search')
				.query({
					client: 'firefox',
					q: args.join(" ")
				});
			const data = JSON.parse(text)[1];
			if (!data.length) return message.reply('I couldn\'t find any results.');

      let search = new Discord.RichEmbed()
      .setTitle(args.join(" "))
      .setDescription(`${data.join('\n')}`)
      message.channel.send(search)
		} catch (err) {
			return message.channel.send(`:warning: An error occurred!\n\`${err.message}\``);
    }
      
    }
}