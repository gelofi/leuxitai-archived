const solenolyrics= require("solenolyrics"); 

module.exports = {
    name: 'volume',
    aliases: ["vol"],
    description: "Volume command. Duh.",
    run: async (bot, message, args, play, handleVideo, Discord) => {
      
        const searchString = args.slice(1).join(" ");
        const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
        const serverQueue = bot.queue.get(message.guild.id);
        const youtube = bot.yt;
      
    if (!message.member.voiceChannel)
      return message.channel.send("🔊 **Join a voice channel first!**");
    if (!serverQueue)
      return message.channel.send(
        "There is nothing playing. I can't make the air louder."
      );
    if (!args[1])
      return message.channel.send(
        `The current volume is **${serverQueue.volume}**.`
      );
    serverQueue.volume = args[1];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 4);
    return message.channel
      .send(`Volume set to **${args[1]}**.`)
      .then(message.react("🔊"));
    }
}