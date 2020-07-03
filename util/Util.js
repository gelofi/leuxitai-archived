const yes = [
  "yes",
  "y",
  "ye",
  "yeah",
  "yup",
  "yea",
  "ya",
  "hai",
  "si",
  "sí",
  "oui",
  "はい",
  "correct"
];
const no = [
  "no",
  "n",
  "nah",
  "nope",
  "nop",
  "iie",
  "いいえ",
  "non",
  "fuck off"
];
const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true });

module.exports = class Util {
  static async verify(
    channel,
    user,
    { time = 30000, extraYes = [], extraNo = [] } = {}
  ) {
    const filter = res => {
      const value = res.content.toLowerCase();
      return (
        (user ? res.author.id === user.id : true) &&
        (yes.includes(value) ||
          no.includes(value) ||
          extraYes.includes(value) ||
          extraNo.includes(value))
      );
    };
    const verify = await channel.awaitMessages(filter, {
      max: 1,
      time
    });
    if (!verify.size) return 0;
    const choice = verify.first().content.toLowerCase();
    if (yes.includes(choice) || extraYes.includes(choice)) return true, channel.bulkDelete(1);
    if (no.includes(choice) || extraNo.includes(choice)) return false;
    return false;
  }

  static mention(mention) {
    if (!mention) return;

    if (mention.startsWith("<@") && mention.endsWith(">")) {
      mention = mention.slice(2, -1);

      if (mention.startsWith("!")) {
        mention = mention.slice(1);
      }

      return bot.users.get(mention);
    }
  }
};
