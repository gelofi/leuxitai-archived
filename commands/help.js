const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true });
const db = require("quick.db");

module.exports = {
  name: "help",
  aliases: ["manual", "h", "commands"],
  description: "Sends all commands in the channel.",
  run: async (bot, message, args) => {
    let prefix;

    let prefixes = await db.fetch(`prefix_${message.guild.id}`);

    if (prefixes == null) {
      prefix = "l.";
    } else {
      prefix = prefixes;
    }

    let check = "<:leuxcheck:716819913901211658>";
    let no = "<:no:716819317852733480>";
    let coins = "<:leuxicoin:715493556810416238>";

    if (args[0] === "support") {
      const support = new Discord.RichEmbed()
        .setAuthor("❓ Command: `support`")
        .setDescription("will give you a server link through DMs.");
      return message.channel.send(support);
    } else if (args[0] === "economy") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("Economy System", message.guild.iconURL)
        .setDescription("Our little economy system can spice up your server.")
        .addField("balance", "- fetches a user's money and bank information.")
        .addField("daily", `- collect ${coins} **200** coins everyday!`)
        .addField("weekly", `- collect ${coins} **500** coins every week!`)
        .addField("work", `- work and earn ${coins} LeuxiCoins.`)
        .addField(
          "deposit",
          `- deposit your cash to the bank, so you don't get robbed.`
        )
        .addField(
          "withdraw",
          `- withdraw coins from the bank to gamble or buy your needs`
        )
        .addField("beg", `- get small amount of coins in short amount of time.`)
        .addField("transfer", `- give members money, if you have.`)
        .addField(
          "addmoney",
          `- give members money, without harming your wallet.`
        )
        .addField(
          "removemoney",
          `- remove money from abusive members, or just because you want to.`
        )
        .addField("rob", `- rob members to get money from them. hehe`)
        .addField("roulette", `- play the roulette, get coins!`)
        .setFooter("You can toggle the economy system if desired.")
        .setColor("#3654ff");
      message.channel.send(cmd);
    } else if (args[0] === "ping") {
      const ping = new Discord.RichEmbed()
        .setAuthor("❓ Command: `ping`")
        .setDescription("sends the API latency on the bot.")
        .addField("Aliases", "`p`  `pong`");
      return message.channel.send(ping);
    } else if (args[0] === "invite") {
      const invite = new Discord.RichEmbed()
        .setAuthor("❓ Command: `invite`")
        .setDescription(
          "will give you a link to invite Leuxitai in your server."
        );
      return message.channel.send(invite);
    } else if (args[0] === "weather") {
      const weather = new Discord.RichEmbed()
        .setAuthor("❓ Command: `weather`")
        .setDescription(
          `shows a weather on a desired location.\nUsage: \`${prefix}weather <location>\``
        );
      return message.channel.send(weather);
    } else if (args[0] === "changelogs") {
      const changelogs = new Discord.RichEmbed()
        .setAuthor("❓ Command: `changelogs`")
        .setDescription("sends the changelogs of Leuxitai through DMs.")
        .addField("Aliases", "`chlog`  `changelog`");
      return message.channel.send(changelogs);
    } else if (args[0] === "coinflip") {
      const coinflip = new Discord.RichEmbed()
        .setAuthor("❓ Command: `coinflip`")
        .setDescription("flips a coin and sends the results.");
      return message.channel.send(coinflip);
    } else if (args[0] === "say") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Command: `say`")
        .setDescription(
          `will repeat what you said.\nUsage: \`${prefix}say <message>\``
        )
        .addField("Aliases", "`msg`");
      return message.channel.send(cmd);
    } else if (args[0] === "help") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Command: `help`")
        .setDescription("will send all commands in the channel.")
        .addField("Aliases", "`h`  `manual`");
      return message.channel.send(cmd);
    } else if (args[1] === "8ball") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Command: `8ball`")
        .setDescription(
          `ask something, then it responds with it's wisdom.\nUsage: \`${prefix}8ball <question>\``
        )
        .addField("Aliases", "`8b`");
      return message.channel.send(cmd);
    } else if (args[0] === "topic") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Command: `topic`")
        .setDescription("will send a random question to the channel.")
        .addField("Aliases", "`tp`");
      return message.channel.send(cmd);
    } else if (args[0] === "wisdom") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Command: `wisdom`")
        .setDescription(
          "sends a random quote of a famous person, or an artist."
        );
      return message.channel.send(cmd);
    } else if (args[0] === "cat") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Command: `cat`")
        .setDescription("will send a random cat image. Powered by an API.")
        .addField("Aliases", "`catto`");
      return message.channel.send(cmd);
    } else if (args[0] === "dog") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Command: `dog`")
        .setDescription("will send a random dog image. Powered by an API.")
        .addField("Aliases", "`doggo`  `puppy`");
      return message.channel.send(cmd);
    } else if (args[0] === "meme") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Command: `meme`")
        .setDescription("will send a meme from subreddits");
      return message.channel.send(cmd);
    } else if (args[0] === "shiba") {
      const weather = new Discord.RichEmbed()
        .setAuthor("❓ Command: `shiba`")
        .setDescription("sends a random shiba photo.")
        .addField("Aliases", "`shibe`");
      return message.channel.send(weather);
    } else if (args[0] === "cumberbatch") {
      const weather = new Discord.RichEmbed()
        .setAuthor("❓ Command: `cumberbatch`")
        .setDescription("returns a random cumberbatch name")
        .addField("Aliases", "`cb`");
      return message.channel.send(weather);
    } else if (args[0] === "anime") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Command: `anime`")
        .setDescription("`will send an anime GIF from r/animegifs.");
      return message.channel.send(cmd);
    } else if (args[0] === "reddit") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Command: `reddit`")
        .setDescription(
          `will send a random image post from a subreddit.\nUsage: \`${prefix}reddit <subreddit>\``
        )
        .addField("Aliases", "`redditfetch`");
      return message.channel.send(cmd);
    } else if (args[0] === "hug") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Command: `hug`")
        .setDescription(
          `ping someone to hug them! \nUsage: \`${prefix}hug <pinged_user>\``
        );
      return message.channel.send(cmd);
    } else if (args[0] === "info") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Command: `info`")
        .setDescription(
          `will send an information of the server, yourself, or someone by pingin them.\nUsage: \`${prefix}info server | me | pinged user\``
        )
        .addField("Aliases", "`information`");
      return message.channel.send(cmd);
    } else if (args[0] === "purge") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Command: `purge`")
        .setDescription(
          `will delete a number of messages.\nUsage: \`${prefix}purge <number of messages to be purged>\``
        )
        .addField("Aliases", "`delete`  `prune`");
      return message.channel.send(cmd);
    } else if (args[0] === "avatar") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Command: `avatar`")
        .setDescription(
          `will send the avatar of a user.\nUsage: \`${prefix}avatar <me | pinged user>\``
        )
        .addField("Aliases", "`av`");
      return message.channel.send(cmd);
    } else if (args[0] === "toggle") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("Toggling Commands ON / OFF", message.guild.iconURL)
        .setDescription(
          "You can toggle commands below on or off.\nDefault settings for all toggles are off."
        )
        .addField(
          "• XP System (xp)",
          "Toggle the whole level system on or off."
        )
        .addField(
          "• Economy System (eco)",
          "Disable or enable the economy system."
        )
        .setFooter("More commands to come!")
        .setColor("#3654ff");
      message.channel.send(cmd);
    } else if (args[0] === "kick") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Command: `kick`")
        .setDescription(
          `will kick a mentioned user.\nUsage: \`${prefix}kick <user>\``
        );
      return message.channel.send(cmd);
    } else if (args[0] === "ban") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Command: `ban`")
        .setDescription(
          `will ban a mentioned user.\nUsage: \`${prefix}ban <user>\``
        )
        .addField("Aliases", "`wee`");
      return message.channel.send(cmd);
    } else if (args[0] === "poll") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Command: `poll`")
        .setDescription(
          `will initiate poll. Will react to your message.\nUsage: \`${prefix}poll <message>\``
        );
      return message.channel.send(cmd);
    } else if (args[0] === "coronavirus") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Command: `coronavirus`")
        .setDescription(
          `sends the COVID-19 statistics. Stats may vary. Powered by NovelCovid.\nUsage: \`${prefix}coronavirus <country | worldwide>\``
        )
        .addField("Aliases", "`covid`  `covid19`");
      return message.channel.send(cmd);
    } else if (args[0] === "points") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Command: `points`")
        .setDescription("sends the statistics of your points/XP and level.")
        .addField("Aliases", "`rank`  `profile`");
      message.channel.send(cmd);
    } else if (args[0] === "leaderboard") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Command: `leaderboard`")
        .setDescription(
          `sends the Top 10 leaderboard of the points system.\nUsage: \`${prefix}leaderboard <page>\``
        );
      message.channel.send(cmd);
    } else if (args[0] === "urban") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Command: `urban`")
        .setDescription(
          `fetches a word from Urban Dictionary.\nUsage:\n\`${prefix}urban\`\nor search a word\n\`${prefix}urban <word>\``
        )
        .addField("Aliases", "`urbandict`");
      message.channel.send(cmd);
    } else if (args[0] === "addxp") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Command: `addxp`")
        .setDescription(
          `is used to give someone points or XP.\nUsage: \`${prefix}give <@user> <no. of XP>\``
        )
        .addField("Aliases", "`xpadd`  `xp+`");
      message.channel.send(cmd);
    } else if (args[0] === "setxp") {
      const changelogs = new Discord.RichEmbed()
        .setAuthor("❓ Command: `setxp`")
        .setDescription(
          "resets the XP of the specified user to the desired amount."
        )
        .addField("Aliases", "`xpset`  `xp`");
      return message.channel.send(changelogs);
    } else if (args[0] === "setlevel") {
      const changelogs = new Discord.RichEmbed()
        .setAuthor("❓ Command: `setlevel`")
        .setDescription(
          "resets the level of the specified user to the desired amount."
        )
        .addField("Aliases", "`setlvl`  `levelset`");
      return message.channel.send(changelogs);
    } else if (args[0] === "xpreset") {
      const changelogs = new Discord.RichEmbed()
        .setAuthor("❓ Command: `xpreset`")
        .setDescription("resets the XP and Level of the specified user to 0.")
        .addField("Aliases", "`resetpoints`  `resetxp`");
      return message.channel.send(changelogs);
    } else if (args[0] === "remindme") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Command: `remindme`")
        .setDescription(
          `remind yourself the things you need to do.\nUsage: \`${prefix}remindme <time> <reminder>\``
        )
        .addField("Aliases", "`remind`  `reminder`");
    } else if (args[0] === "prefix") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Command: `setprefix`")
        .setDescription(
          `is used to change Leuxitai's prefix in your guild.\nUsage: \`${prefix}setprefix <new_prefix>\``
        )
        .addField("Aliases", "`setprefix`  `sp`");
      message.channel.send(cmd);
    } else if (args[0] === "musicprefix") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Command: `musicprefix`")
        .setDescription(
          `is used to change the prefix of Leuxitai's music module.\nUsage: \`${prefix}musicprefix <new_prefix>\``
        );
      message.channel.send(cmd);
    } else if (args[0] === "wallpaper") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Command: `info`")
        .setDescription(
          "sends a random images from unsplash.com. Some are wallpaper worthy."
        )
        .addField("Aliases", "`images`  `randomimage`  `unsplash`");
      return message.channel.send(cmd);
    } else if (args[0] === "fox") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Command: `fox`")
        .setDescription("sends a random fox image.")
        .addField("Aliases", "`kitsune`");
      return message.channel.send(cmd);
    } else if (args[0] === "pat") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Command: `pat`")
        .setDescription(
          `ping someone to pat them!\nUsage: \`${prefix}pat <@user>\``
        );
      message.channel.send(cmd);
    } else if (args[0] === "bird") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Command: `bird`")
        .setDescription("sends a random bird image.");
      message.channel.send(cmd);
    } else if (args[0] === "sync") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Command: `sync`")
        .setDescription(
          "syncs the level system, and prunes users without an activity for a month."
        );
      message.channel.send(cmd);
    } else if (args[0] === "translate") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Command: `translate`")
        .setDescription(
          `translate the given text to a desired language\nUsage: \`${prefix}translate <language> <text>\``
        )
        .addField("Aliases", "`tl`");
      return message.channel.send(cmd);
    } else if (args[0] === "percent") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Command: `percent`")
        .setDescription(
          `rates you by the given argument in percentile.\nUsage: \`${prefix}percent <@user> <adj.>\``
        )
        .addField("Aliases", "`%`  `percentile`");
      message.channel.send(cmd);
    } else if (args[0] === "logchannel") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Command: `logchannel`")
        .setDescription(
          `changes your logging channel for kick, ban, or prefix logs.\nUsage: \`${prefix}logchannel <channel> (Specify channels without #)\``
        );
      message.channel.send(cmd);
    } else if (args[0] === "setmuterole") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Command: `setmuterole`")
        .setDescription(
          `is used to change the mute role of the server.\nUsage: \`${prefix}setmuterole <role> (Do not mention the role!)\``
        );
      message.channel.send(cmd);
    } else if (args[0] === "setmainrole") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Command: `setmainrole`")
        .setDescription(
          `is used to change the main role of the server. ( [!] The main role is the role you give out to new members.)\nUsage: \`${prefix}setmainrole <role>\``
        );
      message.channel.send(cmd);
    } else if (args[0] === "mute") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Command: `mute`")
        .setDescription(
          `mutes a mentioned/specified user.\nUsage: \`${prefix}mute <@user> <time>\``
        )
        .addField("Aliases", "`shh`  `shutup`");
      message.channel.send(cmd);
    } else if (args[0] === "unmute") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Command: `unmute`")
        .setDescription(
          `unmutes a muted mentioned/specified user.\nUsage: \`${prefix}unmute <@user>\``
        );
      message.channel.send(cmd);
    } else if (args[0] === "role") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Command: `role`")
        .setDescription(
          `adds a role to the specified user.\nUsage: \`${prefix}role [add | remove] [@user] [role] (Do not mention!)\``
        );
      return message.channel.send(cmd);
    } else if (args[0] === "warn") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Command: `warn`")
        .setDescription(
          `edits the warn profile of a specified user. No roles. No bans or kicks.\nUsage: \`${prefix}warn <user> (Don't mention!) <warn level> <reason>\``
        )
        .addField("Aliases", "`w`  `punish`  `rewarn`");
      message.channel.send(cmd);
    } else if (args[0] === "embed") {
      /* if (args[0] === "unwarn"){
         var cmd = new Discord.RichEmbed()
       .setAuthor("❓ Command: `unwarn`")
       .setDescription(`unwarns a mentioned/specified user. Removes a warn.\nUsage: \`${prefix}unwarn <@user>\``)
       .addField("Tip", "5 warns will grant a ban. 4 and 3 warns will grant a 5 minute mute. 2 warns will grant a 2 minute mute.")
       .addField("Aliases", "`uw`  `pardon`")
       message.channel.send(cmd)
      } else*/
      let embed = new Discord.RichEmbed()
        .setTitle("Embedding messages")
        .setDescription("Embed messages based on your desired template.")
        .addField(
          "colored",
          `Sets a full template of an embed.\nExample:\n\`${prefix}embed colored Title Footer #color Description here!\``
        )
        .addField(
          "footer",
          `A full template of an embed. No colors.\nExample:\n\`${prefix}embed footer Title Footer Description right here.\``
        )
        .addField(
          "titled",
          `An embed without colors or footer. Just title.\nExample\n\`${prefix}embed titled Title Description here.\``
        )
        .setColor("#3654ff")
        .setFooter(
          "You can also create a simple embed without these modifications."
        );
      message.channel.send(embed);
    } else if (args[0] === "music") {
      var cmd = new Discord.RichEmbed()
        .setAuthor("❓ Music Commands")
        .setDescription("All of music commands are here.")
        .addField(
          `play`,
          "When initiated, will play a song on a voice channel. You must join a channel first."
        )
        .addField(`skip`, "Will skip the current song playing.")
        .addField(`pause`, "Will pause the current song playing.")
        .addField(`resume`, "Will resume the current song playing, if paused.")
        .addField(`np`, "Checks the current song playing.")
        .addField(
          `volume`,
          "Will check the volume of the song, increase or decrease it."
        )
        .addField(
          `queue`,
          "Checks the current song playing, and the next songs that will play."
        )
        .addField(
          `disconnect`,
          "Will stop the all songs in the queue and disconnects from the voice channel."
        )
        .addField(
          `lyrics`,
          "Sends the lyrics of the current song playing, if there is one."
        );
      message.channel.send(cmd);
    } else {
      const help = new Discord.RichEmbed()
        .setAuthor("Command List", bot.user.displayAvatarURL)
        .setDescription(
          `**Use \`${prefix}help <command>\` (Letter L) to view the command information.\nClick 🔘 to expand the commands' description.**`
        )
        .addField(
          `:dividers:  Information`,
          "`help`, `support`, `ping`, `invite`, `weather`, `changelogs`"
        )
        .addField(
          `:video_game:  Fun and Random`,
          "`coinflip`, `say`, `8ball`, `topic`, `wisdom`, `percent`, `cumberbatch`"
        )
        .addField(
          `:frame_photo:  Images`,
          "`cat`, `dog`, `meme`, `anime`, `hug`, `wallpaper`, `fox`, `pat`, `bird`, `shiba`"
        )
        .addField(
          `:tools:  Tools`,
          "`info`, `avatar`, `poll`, `reddit`, `urban`, `translate`, `embed`, `remindme`, `role`"
        )
        .addField(
          `:gear:  Settings`,
          "`prefix`, `musicprefix`, `logchannel`, `setmainrole`, `setmuterole`, `toggle`"
        )
        .addField(
          `:tickets:  Levels`,
          "`points`, `leaderboard`, `addxp`, `setxp`, `setlevel`, `addlevel`, `xpreset`"
        )
        .addField(
          `${coins}  Economy`,
          "`work`, `beg`, `daily`, `balance`, `rob`, `roulette`, `weekly`, `deposit`, `withdraw`, `addmoney`, `removemoney`"
        )
        .addField(
          `:shield:  Moderation`,
          "`mute`, `kick`, `ban`, `purge`, `unmute`, `warn`"
        )
        .addField(
          `:musical_note:  Music`,
          "`play`, `pause`, `resume`, `skip`, `np`, `volume`, `queue`, `lyrics`, `disconnect`"
        )
        .addField(`:calendar_spiral:  Event Commands`, "`coronavirus`")
        .addField(
          "Leuxitai - v11",
          `[Add me to your server!](https://tinyurl.com/leuxitai) (in ${bot.guilds.size} servers now) \n[Join our server!](https://discord.gg/4VXEXWP) (Get notifications about updates, changelogs, etc.)\n[Visit our website!](https://leuxitai.glitch.me) (See changelogs, commands list, dashboard [TBM])`
        )
        .setFooter("FizxCreations. | twitter.com/Fizx26S")
        .setColor(0x3654ff);
      message.channel.send(help).then(msg => {
        msg.react("🔘").then(r => {
          const homef = (reaction, user) =>
            reaction.emoji.name == "🔘" && user.id === message.author.id;
          const home = msg.createReactionCollector(homef, { time: "200000" });
          home.on("collect", r => {
            let i = new Discord.RichEmbed()
              .setAuthor("Expanded Command List", bot.user.displayAvatarURL)
              .setDescription(
                `**This is the expanded help command. Click ⭕ to collapse this manual.\nUse \`${prefix}help\` to view a normal, embedded manual.**`
              )
              .addField(
                `:dividers:  Information`,
                "`help` - shows all Leuxitai's commands.\n`support` - sends a server link to Leuxitai's server through DMs.\n`ping` - sends the API latency of the bot.\n`invite` - sends an invite to invite Leuxitai to your server through DMs.\n`weather` - sends the weather information at the desired location.\n`changelogs` - sends the latest changelogs through DMs."
              )
              .addField(
                `:video_game:  Fun and Random`,
                "`coinflip` - flips a coin, will send either heads, or tails.\n`say` - will repeat what the user said.\n`8ball` - ask a question, Leuxitai amswers it!\n`topic` -will send a random question for you to answer.\n`wisdom` - will send a random quote from famous artists or philosophers.\n`percent` - rates you by the argument in percentile.\n`cumberbatch` - sends a random cumberbatch name."
              )
              .addField(
                `:frame_photo:  Images`,
                "`cat` - sends a random cat image.\n`dog` - sends a random dog image.\n`meme` - sends a random meme from random meme subreddits.\n`anime` - sends a random anime GIF from r/animegifs\n`hug` - mention someone and hug them!\n`wallpaper` - gets a random image from Unsplash.com\n`fox` - sends a random fox image\n`pat` - mention someone to pat them!\n`bird` - sends a random birbo image\n`shiba` - sends a random shiba image."
              )
              .addField(
                `:tools:  Tools`,
                "`info` - collects the information of the server, you, or mentioned user.\n`avatar` - fetches the avatar of a user.\n`poll` - will initiate a poll, and react in the message.\n`reddit` - gets a random image from a post from a desired subreddit.\n`urban` - fetches a word from Urban Dictionary.\n`translate` - translate the given text to the desired language\n`embed` - turn your message into an embed!\n`remindme` - remind yourself the things you need to do.\n`role` - adds or removes a role from a user."
              )
              .addField(
                `:gear:  Settings`,
                "`prefix` - change Leuxitai's prefix in this server.\n`musicprefix` - change Leuxitai's music module prefix in this server.\n`logchannel` - changes the log channel for kicking, banning, changing prefixes, etc..\n`setmainrole` - will set your main role in your server.\n`setmuterole` - changes the default mute role for your server.\n`toggle` - toggles commands on or off"
              )
              .addField(
                `:tickets:  Levels`,
                "`points` - sends your level and point count.\n`leaderboard` - sends the leaderboard of the level system in a server.\n`addxp` - gives a member a desired amount of points.\n`setxp` - resets the XP of the user to the desired amount.\n`setlevel` - resets the level of the user to the desired level.\n`addlevel` - adds a level to the specified user.\n`xpreset` - resets the XP profile of the specified user."
              )
            .addField(
              `${coins}  Economy`,
              "`work` - work and earn LeuxiCoins\n`beg` - beg for money, earn money\n`daily` - collect daily rewards everyday!\n`balance` - fetches user money and bank info.\n`rob` - rob people, earn LeuxiCoins.\n`roulette` - play roulette, get rewarded.\n`weekly`- collect your weekly rewards.\n`deposit` - deposit your money to not get robbed.\n`withdraw` - withdraw coins to gamble or buy things.\n`addmoney` - add money to members without harming your wallet.\n`removemoney` - remove members' money as a punishment, etc."
            )
              .addField(
                `:shield:  Moderation`,
                "`mute` - temporarily mutes a user for a defined time.\n`kick` - kicks the mentioned user from the server.\n`ban` - bans the mentioned user from the server\n`purge` - used in bulk deleting messages, purges an amount of messages desired.\n`unmute` - unmutes a muted user\n`warn` - edits the warning profile of a user."
              )
              .addField(
                `:musical_note:  Music`,
                "`play`- plays the song you put.\n`pause` - will pause the current song playing\n`resume` - will resume the current song playing if paused.\n`skip` - will skip the current song to the next song.\n`np` - will send the current song playing in queue.\n`volume` - will send the current volume, which you can increase or decrease.\n`queue` - sends the song queue in the server.\n`lyrics` - sends the lyrics of the current song, if there is. Buggy.\n`disconnect` - disconnects from the voice channel and stops music playback."
              )
              .addField(
                `:calendar_spiral:  Event Commands`,
                "`coronavirus` - sends the coronavirus statistics, worldwide or a country."
              )
              .addField(
                "Leuxitai - v11",
                `[Add me to your server!](https://tinyurl.com/leuxitai) (in ${bot.guilds.size} servers now) \n[Join our server!](https://discord.gg/4VXEXWP) (Get notifications about updates, changelogs, etc.)\n[Visit our website!](https://leuxitai.glitch.me) (See changelogs, commands list, dashboard [TBM])`
              )
              .setFooter("FizxCreations. | twitter.com/Fizx26S")
              .setColor(0x3654ff);
            msg.edit(i).then(msg => {
              msg.react("⭕").then(r => {
                const homex = (reaction, user) =>
                  reaction.emoji.name == "⭕" && user.id === message.author.id;
                const homeex = msg.createReactionCollector(homex, {
                  time: "200000"
                });
                homeex.on("collect", rr => {
                  msg.edit(help);
                });
              });
            });
            let userId = message.author.id;
            const userReactions = msg.reactions.filter(reaction =>
              reaction.users.has(userId)
            );
          });
        });
      });
    }
  }
};
