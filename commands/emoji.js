const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});

module.exports = {
    name: 'emoji',
    aliases: ["emote"],
    description: "view an emoji, add, or clone.",
    run: async (bot, message, args) => {
  
  let query = args[0]
  if(!query) return message.reply("what will happen to the emoji?")
  let req = args[1]
   
  if(query === "view" || query === "big"){
 	if(!req) return message.reply("animated or inanimated?")
 	if(!args[2]) return message.reply("what emoji would be viewed?")
 	let emote = args[2]
  emote = emote.replace(/:/g, "").replace(/</g, "").replace(/>/g, "").replace(/[a-z]/g, "").replace(/[A-Z]/g, "")

  if(req === "animated" || req === "gif"){
  message.channel.send("https://cdn.discordapp.com/emojis/" + emote + ".gif")
  }
  if(req === "png" || req === "inanimated" || req === "normal"){
   message.channel.send("https://cdn.discordapp.com/emojis/" + emote + ".png")
  	}
  }
  
  if(!message.guild.me.hasPermission("MANAGE_EMOJIS"))
    return message.reply("you don't have the **Manage Emoji** permission to use this command!")
      
  if(!message.member.hasPermission("MANAGE_EMOJIS"))
    return message.reply("you don't have the **Manage Emoji** permission to use this command!")
      
  if(query === "clone"){
  	if(!req) return message.reply("what emoji will be cloned?")
  	if(!args[2]) return message.reply("what emoji would be viewed?")

  	let emote = args[2]
   emote = emote.replace(/:/g, "").replace(/</g, "").replace(/>/g, "").replace(/[a-z]/g, "").replace(/[A-Z]/g, "")
  	if(req === "png" || req === "inanimated" || req === "normal"){
  		if(!args[3]) return message.reply("input a name for that cloned emoji!")
  	message.guild.createEmoji(`https://cdn.discordapp.com/emojis/${emote}.png`, args[3])
  	.then(emoji =>
  		message.channel.send(`**Created emoji**: ${emoji} ${emoji.name}`))
  	 } else
  	if(req === "gif" || req === "animated"){
  		if(!args[3]) return message.reply("input a name for that cloned emoji!")
  	message.guild.createEmoji(`https://cdn.discordapp.com/emojis/${emote}.gif`, args[3])
  	.then(emoji =>
  		message.channel.send(`**Created animated emoji**: ${emoji} ${emoji.name} `))
  	 } else {
  	 	message.reply("inanimated or animated?")
  	 	}
  	}
      
    if(query === "add"){
  	if(!req) return message.reply("what emoji will be added?")
  	if(!args[2]) return message.reply("input a link of an image file!")

  	let emote = args[2]
   // emote = emote.replace(/:/g, "").replace(/</g, "").replace(/>/g, "").replace(/[a-z]/g, "").replace(/[A-Z]/g, "")
  
  	if(!args[3]) return message.reply("input a name for that new emoji!")
  	message.guild.createEmoji(emote, `${args[3]}`)
  	.then(emoji =>
  		message.channel.send(`**Created emoji**: ${emoji} ${emoji.name}`))
  	
  	}

    }
}