const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true });
const request = require("node-superfetch");

module.exports = {
  name: "qrcode",
  aliases: ["qr", "toqr", "qr-code"],
  description: "Repeats what the user said.",
  run: async (bot, message, args) => {
    if (!args[0])
      return message.reply("input a text or a URL to turn it into a QR Code!");

    try {
      const { body } = await request
        .get("https://api.qrserver.com/v1/create-qr-code/")
        .query({ data: args.join(" ") });
      return message.channel.send(`QR Code created!\n**Text/URL** - ${args.join(" ")}`, {
        files: [{ attachment: body, name: "qr-code.png" }]
      },);
    } catch (err) {
      return message.reply(
        `:warning: An error occurred: \`${err.message}\`. Try again later!`
      );
    }
  }
};
