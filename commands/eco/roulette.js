const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true });
const db = require("quick.db");
const ms = require("parse-ms");

module.exports = {
  name: "roulette",
  aliases: ["rou"],
  description: "roulette command for eco",
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

    function isOdd(num) {
      if (num % 2 == 0) return false;
      else if (num % 2 == 1) return true;
    }

    let colour = args[0];
    let money = parseInt(args[1]);
    let moneydb = await db.fetch(`money_${message.guild.id}_${user.id}`);

    let random = Math.floor(Math.random() * 50);

    if (!colour)
      return message.reply("specify a color to bet on! (red, indigo, cyan, black, orange)");
    colour = colour.toLowerCase();
    if(!money) return message.reply("specify an amount to bet!")
    if (isNaN(money)) return message.reply("that's not a number!");
    //if (!money) return message.reply("specify an amount to bet!");
    if (money > moneydb)
      return message.reply("you're betting more money than you have!");

    if (message.content.includes("-"))
      return message.reply("no lose evasions!");

    if (colour == "c" || colour.includes("cyan")) colour = 0;
    else if (colour == "r" || colour.includes("red")) colour = 1;
    else if (colour == "i" || colour.includes("indigo")) colour = 2;
    else if (colour == "b" || colour.includes("black")) colour = 3;
    else if (colour == "o" || colour.includes("orange")) colour = 4;
    else if (colour == "g" || colour.includes("green")) colour = 5;
    else
      return message.reply(
        "specify a color to bet on! (red, indigo, cyan, black, orange)"
      );

    
    
    if (random <= 30 && colour == 4) {
      // orange
      money = parseInt(money * 1.2);
      db.add(`money_${message.guild.id}_${user.id}`, money);
      let moneyEmbed0 = new Discord.RichEmbed()
        .setColor("#f28500")
        .setAuthor(
          `${message.author.username} won!`,
          message.author.displayAvatarURL
        )
        .setDescription(
          `<:narana:717574737148116993> You won ${money} coins!\nMultiplier: 1.2x`
        );
      message.channel.send(moneyEmbed0);
    } else if (random <= 4 && colour == 3) {
      // black
      money *= 12;
      db.add(`money_${message.guild.id}_${user.id}`, money);
      let moneyEmbed0 = new Discord.RichEmbed()
        .setColor("#000000")
        .setAuthor(
          `${message.author.username} won!`,
          message.author.displayAvatarURL
        )
        .setDescription(
          `<:black_shard:717630230612934692> You won ${money} coins!\nMultiplier: 12x`
        );
      message.channel.send(moneyEmbed0);
    } else if (random <= 10 && colour == 2) {
      // indigo
      money *= 5;
      db.add(`money_${message.guild.id}_${user.id}`, money);
      let moneyEmbed1 = new Discord.RichEmbed()
        .setColor("#3654ff")
        .setAuthor(
          `${message.author.username} won!`,
          message.author.displayAvatarURL
        )
        .setDescription(
          `<:indigo_shard:716890157248151566> You won ${money} coins!\nMultiplier: 5x`
        );
      message.channel.send(moneyEmbed1);
    } else if (random < 25 && colour == 1) {
      // Red
      money = parseInt(money * 1.5);
      db.add(`money_${message.guild.id}_${user.id}`, money);
      let moneyEmbed2 = new Discord.RichEmbed()
        .setColor("#FF5454")
        .setAuthor(
          `${message.author.username} won!`,
          message.author.displayAvatarURL
        )
        .setDescription(
          `<:coral_shard:716890226282332210> You won ${money} coins\nMultiplier: 1.5x`
        );
      message.channel.send(moneyEmbed2);
    } else if (random < 15 && colour == 0) {
      // cyan
      money = parseInt(money * 2);
      db.add(`money_${message.guild.id}_${user.id}`, money);
      let moneyEmbed3 = new Discord.RichEmbed()
        .setColor("#3be5eb")
        .setAuthor(
          `${message.author.username} won!`,
          message.author.displayAvatarURL
        )
        .setDescription(
          `<:cyan_shard:716890196838449162> You won ${money} coins\nMultiplier: 2x`
        );
      message.channel.send(moneyEmbed3);
    } else {
      // Wrong

      db.subtract(`money_${message.guild.id}_${user.id}`, money);
      let moneyEmbed4 = new Discord.RichEmbed()
        .setColor("#c7372")
        .setAuthor(
          `${message.author.username} lost!`,
          message.author.displayAvatarURL
        )
        .setDescription(`${no} You lost ${money} coins!\nMultiplier: \`0x\``);
      message.channel.send(moneyEmbed4);
    }
  }
};
