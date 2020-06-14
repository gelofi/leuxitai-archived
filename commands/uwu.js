const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true });
const faces = ["!!! 🧡", ";;w;;", "owo", "UwU", ">w<", "^w^", "uwu 🧡"];

module.exports = {
  name: "uwu",
  aliases: ["owo"],
  description: "Repeats what the user said.",
  run: async (bot, message, args) => {
    if (!args[0]) {
      
      let channel = bot.channels.get(message.channel.id)
      
      channel.fetchMessages({ limit: 2 }).then(messages => {
        let lastMessage = messages.last();
        return message.channel.send(uwu(lastMessage.content));
      });
    } else {
      return message.channel.send(uwu(args.join(" ")));
    }

    function uwu(text) {
      return text
        .replace(/(?:r|l)/g, "w")
        .replace(/(?:R|L)/g, "W")
        .replace(/n([aeiou])/g, "ny$1")
        .replace(/N([aeiou])/g, "Ny$1")
        .replace(/N([AEIOU])/g, "NY$1")
        .replace(/ove/g, "uv")
        .replace(/!+/g, ` ${faces[Math.floor(Math.random() * faces.length)]} `)
        .trim();
    }
  }
};
