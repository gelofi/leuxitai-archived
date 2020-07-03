const solenolyrics= require("solenolyrics"); 

module.exports = {
    name: 'queue',
    aliases: ["q"],
    description: "Queue command. Duh.",
    run: async (bot, message, args, play, handleVideo, Discord) => {
      
        const searchString = args.slice(1).join(" ");
        const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
        const serverQueue = bot.queue.get(message.guild.id);
        const youtube = bot.yt;
      
    if (!serverQueue)
      return message.channel.send("There is nothing playing. What's to queue?");
    let index = 0;
    var embed = new Discord.RichEmbed()
      .setAuthor(`Queue on ${message.guild.name}`, message.author.displayAvatarURL)
      .setDescription(
        `${serverQueue.songs
          .map(song => `\`${++index}.)\` [${song.title}](${song.url})`)
          .join("\n")}

__Now playing:__\n**• ${serverQueue.songs[0].title}** - \`${
          serverQueue.songs[0].duration.hours
        }:${serverQueue.songs[0].duration.minutes}:${
          serverQueue.songs[0].duration.seconds
        }\``
      )
      .setColor("RANDOM");
    return message.channel.send(embed);
    }
}