const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true });
const db = require("quick.db");
const ms = require("parse-ms");

module.exports = {
  name: "cockfight",
  aliases: ["cf", "chickenfight"],
  description: "cf command for eco",
  run: async (bot, message, args, util) => {
    let eco;

    let econ = await db.fetch(`eco_${message.guild.id}`);

    if (econ == null) {
      eco = "off";
      //return message.channel.send("That command is not enabled!");
    } else {
      eco = econ;
    }

    if (eco !== "on")
      return message.channel.send("This command is not toggled on!");

    let check = "<:leuxcheck:716819913901211658>";
    let no = "<:no:716819317852733480>";
    let coins = "<:leuxicoin:715493556810416238>";

    let user = message.author;

    let chicken = await db.fetch(`chicken_${message.guild.id}_${user.id}`);
    if (chicken !== true)
      return message.reply("you don't have a chicken! Buy on one the shop!");

    if (message.content.includes("-"))
      return message.reply("no lose evasions!");
    
    let money = parseInt(args[0]);
    
    if (money < 100)
      return message.reply("you can't bet less than 100 coins!");

    if (isNaN(money)) return message.reply("that's not a number of coins!");
    let moneydb = await db.fetch(`money_${message.guild.id}_${user.id}`);
    if (money > moneydb)
      return message.reply("you're betting more money than you have!");
    let random = Math.floor(Math.random() * 100);

    if (random < 50) {
      let lost = new Discord.RichEmbed()
        .setAuthor(`${message.author.username} lost!`)
        .setDescription(
          `:rooster: Your chicken got mugged so bad. You lost ${coins} **${money}**.`
        )
        .setColor("#ff3636");
      message.channel.send(lost);
      db.set(`chicken_${message.guild.id}_${user.id}`, null);
      db.subtract(`money_${message.guild.id}_${user.id}`, money);
    } else {
      let won = new Discord.RichEmbed()
        .setAuthor(`${message.author.username} won!`)
        .setDescription(
          `:rooster: Your chicken knocked out the others. You won ${coins} **${money}**!`
        )
        .setColor("#3654ff");
      message.channel.send(won);
      db.add(`money_${message.guild.id}_${user.id}`, money);
    }
  }
};
