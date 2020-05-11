const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const prefix = 'l.';
module.exports = {
    name: 'help',
    description: "Sends all commands in the channel.",
    run: async (bot, message, args) => {
      if (args[1] === "support") {
        const support = new Discord.RichEmbed()
       .setAuthor("❓ Command: `support`")
       .setDescription("will give you a server link through DMs.")
       return message.channel.send(support)
       } else 
      if (args[1] === "ping"){
        const ping = new Discord.RichEmbed()
       .setAuthor("❓ Command: `ping`")
       .setDescription("sends the API latency on the bot.")
       .addField("Aliases", "`p`  `pong`")
       return message.channel.send(ping)
       } else
      if (args[1] === "prefix"){
        const prefix = new Discord.RichEmbed()
       .setAuthor("❓ Command: `prefix`")
       .setDescription("shows you the prefix of the bot.")
       return message.channel.send(prefix)
       } else
      if (args[1] === "invite"){
        const invite = new Discord.RichEmbed()
       .setAuthor("❓ Command: `invite`")
       .setDescription("will give you a link to invite Leuxitai in your server.")
       return message.channel.send(invite)
       } else
      if (args[1] === "weather"){
        const weather = new Discord.RichEmbed()
       .setAuthor("❓ Command: `weather`")
       .setDescription("shows a weather on a desired location.\nUsage: `l.weather <location>`")
       return message.channel.send(weather)
       } else
      if (args[1] === "changelogs"){
        const changelogs = new Discord.RichEmbed()
       .setAuthor("❓ Command: `changelogs`")
       .setDescription("sends the changelogs of Leuxitai through DMs.")
       .addField("Aliases", "`chlog`  `changelog`")
       return message.channel.send(changelogs)
       } else
      if (args[1] === "coinflip"){
        const coinflip = new Discord.RichEmbed()
       .setAuthor("❓ Command: `coinflip`")
       .setDescription("shows you the prefix of the bot. Not replacable yet.")
      return message.channel.send(coinflip)
      } else
      if (args[1] === "say"){
         var cmd = new Discord.RichEmbed()
       .setAuthor("❓ Command: `say`")
       .setDescription("will repeat what you said.\nUsage: `l.say <message>`")
       .addField("Aliases", "`msg`")
      return message.channel.send(cmd)
      } else
      if (args[1] === "help"){
         var cmd = new Discord.RichEmbed()
       .setAuthor("❓ Command: `help`")
       .setDescription("will send all commands in the channel.")
       .addField("Aliases", "`h`  `manual`")
      return message.channel.send(cmd)
      } else
      if (args[1] === "8ball"){
         var cmd = new Discord.RichEmbed()
       .setAuthor("❓ Command: `8ball`")
       .setDescription("ask something, then it responds with it's wisdom.\nUsage: `l.8ball <question>`")
       .addField("Aliases", "`8b`")
      return message.channel.send(cmd)
      } else
      if (args[1] === "topic"){
         var cmd = new Discord.RichEmbed()
       .setAuthor("❓ Command: `topic`")
       .setDescription("will send a random question to the channel.")
       .addField("Aliases", "`tp`")
       return message.channel.send(cmd)
      } else
      if (args[1] === "wisdom"){
         var cmd = new Discord.RichEmbed()
       .setAuthor("❓ Command: `wisdom`")
       .setDescription("sends a random quote of a famous person, or an artist.")
     return message.channel.send(cmd)
      } else
      if (args[1] === "cat"){
         var cmd = new Discord.RichEmbed()
       .setAuthor("❓ Command: `cat`")
       .setDescription("will send a random cat image. Powered by an API.")
       .addField("Aliases", "`catto`")
      return message.channel.send(cmd)
      } else
      if (args[1] === "dog"){
         var cmd = new Discord.RichEmbed()
       .setAuthor("❓ Command: `dog`")
       .setDescription("will send a random dog image. Powered by an API.")
       .addField("Aliases", "`doggo`  `puppy`")
      return message.channel.send(cmd)
      } else
      if (args[1] === "meme"){
         var cmd = new Discord.RichEmbed()
       .setAuthor("❓ Command: `meme`")
       .setDescription("will send a meme from subreddits")
      return message.channel.send(cmd)
      } else
      if (args[1] === "anime"){
         var cmd = new Discord.RichEmbed()
       .setAuthor("❓ Command: `anime`")
       .setDescription("`will send an anime GIF from r/animegifs.")
      return  message.channel.send(cmd)
      } else
      if (args[1] === "reddit"){
         var cmd = new Discord.RichEmbed()
       .setAuthor("❓ Command: `reddit`")
       .setDescription("will send a random image post from a subreddit.\nUsage: `l.reddit <subreddit>`")
       .addField("Aliases", "`redditfetch`")
       return message.channel.send(cmd)
      } else
      if (args[1] === "hug"){
         var cmd = new Discord.RichEmbed()
       .setAuthor("❓ Command: `hug`")
       .setDescription("ping someone to hug them! \nUsage: `l.hug <pinged_user>`")
      return message.channel.send(cmd)
      } else
      if (args[1] === "info"){
         var cmd = new Discord.RichEmbed()
       .setAuthor("❓ Command: `info`")
       .setDescription("will send an information of the server, yourself, or someone by pingin them.\nUsage: `l.info server | me | pinged user`")
       .addField("Aliases", "`information`")
      return message.channel.send(cmd)
      } else
      if (args[1] === "purge"){
         var cmd = new Discord.RichEmbed()
       .setAuthor("❓ Command: `purge`")
       .setDescription("will delete a number of messages.\nUsage: `l.purge <number of messages to be purged>`")
       .addField("Aliases", "`delete`  `prune`")
      return message.channel.send(cmd)
      } else
      if (args[1] === "avatar"){
         var cmd = new Discord.RichEmbed()
       .setAuthor("❓ Command: `avatar`")
       .setDescription("will send the avatar of a user.\nUsage: `l.avatar <me | pinged user>`")
       .addField("Aliases", "`av`")
      return message.channel.send(cmd)
      } else
      if (args[1] === "kick"){
         var cmd = new Discord.RichEmbed()
       .setAuthor("❓ Command: `kick`")
       .setDescription("will kick a mentioned user.\nUsage: `l.kick <user>`")
       return message.channel.send(cmd)
      } else
      if (args[1] === "ban"){
         var cmd = new Discord.RichEmbed()
       .setAuthor("❓ Command: `ban`")
       .setDescription("will ban a mentioned user.\nUsage: `l.ban <user>`")
       .addField("Aliases", "`wee`")
      return message.channel.send(cmd)
      } else
      if (args[1] === "poll"){
         var cmd = new Discord.RichEmbed()
       .setAuthor("❓ Command: `poll`")
       .setDescription("will initiate poll. Will react to your message.\nUsage: `l.poll <message>`")
       return message.channel.send(cmd)
      } else
      if (args[1] === "coronavirus"){
         var cmd = new Discord.RichEmbed()
       .setAuthor("❓ Command: `coronavirus`")
       .setDescription("sends the COVID-19 statistics. Stats may vary. Powered by NovelCovid.\nUsage: `l.coronavirus <country | worldwide>`")
       .addField("Aliases", "`covid`  `covid19`")
      return message.channel.send(cmd)
      } else
      if (args[1] === "points"){
        var cmd = new Discord.RichEmbed()
       .setAuthor("❓ Command: `points`")
       .setDescription("sends the statistics of your points/XP and level.")
       message.channel.send(cmd)
      } else
      if (args[1] === "leaderboard"){
         var cmd = new Discord.RichEmbed()
       .setAuthor("❓ Command: `leaderboard`")
       .setDescription("sends the Top 10 leaderboard of the points system.\nUsage: `l.leaderboard <page>`")
       message.channel.send(cmd)
      } else
      if (args[1] === 'urban'){
        var cmd = new Discord.RichEmbed()
       .setAuthor("❓ Command: `urban`")
       .setDescription("fetches a random word from Urban Dictionary.")
       .addField("Aliases", "`urbandict`")
      message.channel.send(cmd)
      } else
      if (args[1] === "give"){
         var cmd = new Discord.RichEmbed()
       .setAuthor("❓ Command: `give`")
       .setDescription("is used to give someone points or XP.\nUsage: `l.give <@user> <no. of XP>`")
       message.channel.send(cmd)
      } else
      if (args[1] === "setprefix"){
         var cmd = new Discord.RichEmbed()
       .setAuthor("❓ Command: `setprefix`")
       .setDescription("is used to change Leuxitai's prefix in your guild.\nUsage: `l.setprefix <new_prefix>`")
       message.channel.send(cmd)
      } else
      if (args[1] === "musicprefix"){
         var cmd = new Discord.RichEmbed()
       .setAuthor("❓ Command: `musicprefix`")
       .setDescription("is used to change the prefix of Leuxitai's music module.\nUsage: `l.musicprefix <new_prefix>`")
       message.channel.send(cmd)
      } else
      if (args[1] === "wallpaper"){
         var cmd = new Discord.RichEmbed()
       .setAuthor("❓ Command: `info`")
       .setDescription("sends a random images from unsplash.com. Some are wallpaper worthy.")
       .addField("Aliases", "`images`  `randomimage`  `unsplash`")
      return message.channel.send(cmd)
      } else
      if (args[1] === "fox"){
         var cmd = new Discord.RichEmbed()
       .setAuthor("❓ Command: `fox`")
       .setDescription("sends a random fox image.")
       .addField("Aliases", "`kitsune`")
      return message.channel.send(cmd)
      } else
      if (args[1] === "pat"){
         var cmd = new Discord.RichEmbed()
       .setAuthor("❓ Command: `pat`")
       .setDescription("ping someone to pat them!\nUsage: `l.pat <@user>`")
       message.channel.send(cmd)
      } else
      if (args[1] === "bird"){
         var cmd = new Discord.RichEmbed()
       .setAuthor("❓ Command: `bird`")
       .setDescription("sends a random bird image.")
       message.channel.send(cmd)
      } else
      
      if (args[1] === "music"){
         var cmd = new Discord.RichEmbed()
       .setAuthor("❓ Music Commands")
       .setDescription("All of music commands are here.")
       .addField(`${prefix}play`, "When initiated, will play a song on a voice channel. You must join a channel first.")
       .addField(`${prefix}skip`, "Will skip the current song playing.")
       .addField(`${prefix}pause`, "Will pause the current song playing.")
       .addField(`${prefix}resume`, "Will resume the current song playing, if paused.")
       .addField(`${prefix}np`, "Checks the current song playing.")
       .addField(`${prefix}volume`, "Will check the volume of the song, increase or decrease it.")
       .addField(`${prefix}queue`, "Checks the current song playing, and the next songs that will play.")
       .addField(`${prefix}disconnect`, "Will stop the all songs in the queue and disconnects from the voice channel.")
       .addField(`${prefix}lyrics`, "Sends the lyrics of the current song playing, if there is one. This command is still buggy.")
       message.channel.send(cmd)
      } else {
        const help = new Discord.RichEmbed()
       .setAuthor("Command List", bot.user.displayAvatarURL)
       .setDescription("**Use `l.help <command>` (Letter L) to view the command information.\nClick 🔘 to expand the commands' description.**")
       .addField(`:dividers:  Information`, '`help`, `support`, `prefix`, `ping`, `invite`, `weather`, `changelogs`')
       .addField(`:video_game:  Fun and Random`, "`coinflip`, `say`, `8ball`, `topic`, `wisdom`")
       .addField(`:frame_photo:  Images`, "`cat`, `dog`, `meme`, `anime`, `hug`, `wallpaper`, `fox`, `pat`, `bird`")
       .addField(`:tools:  Tools`, "`info`, `purge`, `avatar`, `kick`, `ban`, `poll`, `reddit`, `urban`, `setprefix`, `musicprefix`")
       .addField(":tickets:  Levels", "`points`, `leaderboard`, `give`")
       .addField(`:musical_note:  Music`, "`play`, `pause`, `resume`, `skip`, `np`, `volume`, `queue`, `lyrics`, `disconnect`")
       .addField(`:calendar_spiral:  Event Commands`, "`coronavirus`")
       .addField("Leuxitai - v9.0", `[Add me to your server!](https://tinyurl.com/leuxitai) (in ${bot.guilds.size} servers now) \n[Join our server!](https://discord.gg/4VXEXWP) (Get notifications about updates, changelogs, etc.)\n[Fizx's Twitter](https://twitter.com/Fizx26S) (My creator's Twitter!)`)
       .setFooter("If Leuxitai has a custom prefix in your server, use that one.\nIf you do not know Leuxitai's prefix in this server, mention Leuxitai.")
       .setColor(0x3654ff);
        message.channel.send(help).then(msg => {
  msg.react('🔘').then(r => {
     const homef = (reaction, user) => reaction.emoji.name == '🔘' && user.id === message.author.id;
    const home = msg.createReactionCollector(homef, { time: '100000' });
     home.on('collect', r => {
       let i = new Discord.RichEmbed()
       .setAuthor("Expanded Command List", bot.user.displayAvatarURL)
       .setDescription("**This is the expanded help command. Click ⭕ to collapse this manual.\nUse `l.help` to view a normal, embedded manual.**")
       .addField(`:dividers:  Information`, "`help` - shows all Leuxitai's commands.\n`support` - sends a server link to Leuxitai's server through DMs.\n`prefix` - will say it's prefix. Unchangeable.\n`ping` - sends the API latency of the bot.\n`invite` - sends an invite to invite Leuxitai to your server through DMs.\n`weather` - sends the weather information at the desired location.\n`changelogs` - sends the latest changelogs through DMs.")
       .addField(`:video_game:  Fun and Random`, "`coinflip` - flips a coin, will send either heads, or tails.\n`say` - will repeat what the user said.\n`8ball` - ask a question, Leuxitai amswers it!\n`topic` -will send a random question for you to answer.\n`wisdom` - will send a random quote from famous artists or philosophers.")
       .addField(`:frame_photo:  Images`, "`cat` - sends a random cat image.\n`dog` - sends a random dog image.\n`meme` - sends a random meme from random meme subreddits.\n`anime` - sends a random anime GIF from r/animegifs\n`hug` - mention someone and hug them!\n`wallpaper` - gets a random image from Unsplash.com\n`fox` - sends a random fox image\n`pat` - mention someone to pat them!\n`bird` - sends a random birbo image")
       .addField(`:tools:  Tools`, "`info` - collects the information of the server, you, or mentioned user.\n`purge` - used to bulk delete messages, with the desired amount.\n`avatar` - fetches the avatar of a user.\n`kick` - kicks the mentioned user.\n`ban` - will ban the mentioned user.\n`poll` - will initiate a poll, and react in the message.\n`reddit` - gets a random image from a post from a desired subreddit.\n`urban` - fetches a random word from Urban Dictionary.\n`setprefix` - change Leuxitai's prefix in this server.\n`musicprefix` - change Leuxitai's music module prefix in this server.")
       .addField(":tickets:  Levels", "`points` - sends your level and point count.\n`leaderboard` - sends the leaderboard of the level system in a server.\n`give` - gives a member a desired amount of points.")
       .addField(`:musical_note:  Music`, "`play`- plays the song you put.\n`pause` - will pause the current song playing\n`resume` - will resume the current song playing if paused.\n`skip` - will skip the current song to the next song.\n`np` - will send the current song playing in queue.\n`volume` - will send the current volume, which you can increase or decrease.\n`queue` - sends the song queue in the server.\n`lyrics` - sends the lyrics of the current song, if there is. Buggy.\n`disconnect` - disconnects from the voice channel and stops music playback.")
       .addField(`:calendar_spiral:  Event Commands`, "`coronavirus` - sends the coronavirus statistics, worldwide or a country.")
       .addField("Leuxitai - v9.0", `[Add me to your server!](https://tinyurl.com/leuxitai) (in ${bot.guilds.size} servers now) \n[Join our server!](https://discord.gg/4VXEXWP) (Get notifications about updates, changelogs, etc.)\n[Fizx's Twitter](https://twitter.com/Fizx26S) (My creator's Twitter!)`)
       .setFooter("If Leuxitai has a custom prefix in your server, use that one.\nIf you do not know your Leuxitai's prefix in this server, mention Leuxitai.")
       .setColor(0x3654ff);
            msg.edit(i).then(msg => {
            	msg.react('⭕').then(r => {
            		const homex = (reaction, user) => reaction.emoji.name == '⭕' && user.id === message.author.id;
            		const homeex = msg.createReactionCollector(homex, { time: '100000' });
            		homeex.on('collect', rr => {
            			msg.edit(help)
              			})
            			})
            })
          let userId = message.author.id;
          const userReactions = msg.reactions.filter(reaction => reaction.users.has(userId));
     })
  })
    })
      }
    }
}