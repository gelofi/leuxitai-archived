const solenolyrics= require("solenolyrics"); 

module.exports = {
    name: 'resume',
    aliases: ["res"],
    description: "Resume command. Duh.",
    run: async (bot, message, args, play, handleVideo, Discord) => {
      
        const searchString = args.slice(1).join(" ");
        const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
        const serverQueue = bot.queue.get(message.guild.id);
        const youtube = bot.yt;
      
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      message.react("▶️");
       }
    }
}