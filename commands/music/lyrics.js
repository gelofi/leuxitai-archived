const solenolyrics= require("solenolyrics"); 
const str = require("str_shorten")

module.exports = {
    name: 'lyrics',
    aliases: ["ly"],
    description: "Sends the lyrics of the current song playing.",
    run: async (bot, message, args, play, handleVideo, Discord) => {
      
    const serverQueue = bot.queue.get(message.guild.id);
      
    try {
    let song = args.join(" ");
    if(!song) return message.reply("please search for a song lyrics!")
    var songs = await solenolyrics.requestTitleFor(song)
    var lyrics = await solenolyrics.requestLyricsFor(song)
    var singer = await solenolyrics.requestAuthorFor(song)
    
   if(songs == undefined) return message.reply("I can't find lyrics for this song!")
   var ly = new Discord.RichEmbed()
   .setTitle(`${songs}\nby ${singer}`)
   .setDescription(str(lyrics, 2040))
   .setColor("#ff5454")
   message.channel.send(ly)
    } catch (error) {
      message.channel.send("I can't find the lyrics for this song!\n" + error)
    }
    }
}