module.exports = {
    name: 'play',
    aliases: ["p"],
    description: "Play a song.",
    run: async (bot, message, args, play, handleVideo, Discord) => {
      
        const searchString = args.slice(0).join(" ");
        const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
        const serverQueue = bot.queue.get(message.guild.id);
        const youtube = bot.yt;
      
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel)
      return message.channel.send("🔊 **Join a voice channel to play music.**");
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT")) {
      return message.channel.send(
        "I cannot connect to your voice channel, please make sure I have permissions."
      );
    }
    if (!permissions.has("SPEAK")) {
      return message.channel.send(
        "I cannot speak in this voice channel, please make sure I have permissions."
      );
    }

    if (!args[0]) {
      return message.channel.send("Put a song to play!");
    }
    
    message.channel.send(`🔎 **| Searching**  \`${searchString}\``)
    
    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();
      for (const video of Object.values(videos)) {
        const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
        await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
      }
      var embed = new Discord.RichEmbed()
        .setTitle("Playlist added")
        .setDescription(`Requested song has been added to the queue. 👍`)
        .setColor("RANDOM");
      return message.channel.send(embed);
    } else {
      try {
        var video = await youtube.getVideo(url);
      } catch (error) {
        try {
          var videos = await youtube.searchVideos(searchString, 2);
          var video = await youtube.getVideoByID(videos[0].id);
        } catch (err) {
          console.error(err);
          return message.channel.send("🆘 I could not obtain any search results.");
        }
      }
      return handleVideo(video, message, voiceChannel);
    }
    }
}