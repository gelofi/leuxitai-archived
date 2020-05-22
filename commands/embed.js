const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});

module.exports = {
    name: 'embed',
    aliases: ["emb"],
    description: "sends an embed.",
    run: async (bot, message, args) => {
        if(!args[0]) return message.reply("what's there to embed?");
      
      if(args[0] == "colored") {
      	let embed = new Discord.RichEmbed()
      	.setTitle(args[1])
      	.setDescription(args.slice(4).join(" "))
      	.setFooter(args[2])
      	.setColor(args[3])
      	message.channel.send(embed);
      	} else
      if(args[0] == "footer") {
      	let embed = new Discord.RichEmbed()
      	.setTitle(args[1])
      	.setDescription(args.slice(3).join(" "))
      	.setFooter(args[2])
      	message.channel.send(embed);
      	} else
      	if(args[0] == "titled") {
      	let embed = new Discord.RichEmbed()
      	.setTitle(args[1])
      	.setDescription(args.slice(2).join(" "))
      	message.channel.send(embed);
      	} else 
      	if(args[0]) {
      	let embed = new Discord.RichEmbed()
      .setDescription(`${args.slice(0).join(" ")}`)
      	message.channel.send(embed);
      	}
    }
}