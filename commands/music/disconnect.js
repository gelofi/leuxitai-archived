const solenolyrics= require("solenolyrics"); 

module.exports = {
    name: 'disconnect',
    aliases: ["dc", "leave", "stop", "fuckoff"],
    description: "Disconnects Leuxitai from the voice channel.",
    run: async (bot, message, args, play, handleVideo, Discord) => {
      
        const searchString = args.slice(1).join(" ");
        const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
        const serverQueue = bot.queue.get(message.guild.id);
        const youtube = bot.yt;
      
    if (!message.member.voiceChannel)
      return message.channel.send("🔊 **Join a voice channel first!**");
    if (!serverQueue)
      return message.channel.send(
        "There is nothing playing that I could stop for you."
      );
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end("Stop command has been used!");
    message.channel.send("**Music playback stopped and left the voice channel.**");
    return undefined;
    }
}