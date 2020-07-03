const Entities = require('html-entities').AllHtmlEntities;
const char = new Entities();

module.exports = {
    name: 'search',
    aliases: ["find", "f"],
    description: "Play a song.",
    run: async (bot, message, args, play, handleVideo, Discord) => {
      
        const searchString = args.slice(0).join(" ");
        //const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
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

        try {
          var videos = await youtube.searchVideos(searchString, 10);
          let index = 0;
          const sembed = new Discord.RichEmbed()
            .setAuthor("Select a song", message.guild.iconURL)
            .setDescription(char.decode(
              `${videos
                .map(video2 => `\`${++index}.\`  ${video2.raw.snippet.title}`)
                .join("\n")}`)
            )
            .setColor("#534beb")
            .setFooter(
              "Select a song simply by typing numbers 1-10. Song selection ends in 20 seconds."
            );
          message.channel.send(sembed).then(msg => {
            msg.delete(21000);
          });

          // eslint-disable-next-line max-depth
          try {
            var response = await message.channel.awaitMessages(
              msg2 => msg2.content > 0 && msg2.content < 11,
              {
                maxMatches: 1,
                time: 21000,
                errors: ["time"]
              }
            );
          } catch (err) {
            console.error(err);
            message.delete(sembed);
            return message.channel.send(
              "No or invalid value entered, song selection exited automatically."
            );
            
          }
          const videoIndex = parseInt(response.first().content);
          var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
        } catch (err) {
          console.error(err);
          return message.channel.send("🆘 I could not obtain any search results.");
        }
      
      return handleVideo(video, message, voiceChannel);
    }
}