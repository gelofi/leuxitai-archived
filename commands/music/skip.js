module.exports = {
    name: 'skip',
    aliases: ["s"],
    description: "Skips the current song playing",
    run: async (bot, message, args, play, handleVideo, Discord) => {
      
        const searchString = args.slice(1).join(" ");
        const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
        const serverQueue = bot.queue.get(message.guild.id);
        const youtube = bot.yt;
      
        if (!message.member.voiceChannel)
      return message.channel.send(
        "🔊 **You are not in a voice channel! Join one to use my commands.**"
      );
    if (!serverQueue)
      return message.channel.send(
        "There is nothing playing that I could skip for you."
      );
    serverQueue.connection.dispatcher.end("Skip command has been used!");

    message.channel.send("*Song skipped* ⏩");

    return undefined;
    }
}