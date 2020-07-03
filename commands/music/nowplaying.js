const solenolyrics= require("solenolyrics"); 

module.exports = {
    name: 'nowplaying',
    aliases: ["playingnow", "np", "pn"],
    description: "Sends the current song playing.",
    run: async (bot, message, args, play, handleVideo, Discord) => {
      
        const searchString = args.slice(1).join(" ");
        const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
        const serverQueue = bot.queue.get(message.guild.id);
        const youtube = bot.yt;
      
    if(!serverQueue) return message.reply("there no songs currently playing.")
    var embed = new Discord.RichEmbed()
      .setTitle("🎶  Now Playing")
      .setThumbnail(serverQueue.songs[0].thumbnail)
      .setDescription(
        `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})
    \n| \`${serverQueue.songs[0].duration.hours}:${serverQueue.songs[0].duration.minutes}:${serverQueue.songs[0].duration.seconds}\` |`
      )
      .setColor("#8cffb3");
    return message.channel.send(embed);
    }
}