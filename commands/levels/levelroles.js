const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "levelrole",
  aliases: ["levelroles", "lvlrole", "lvlroles", "lr"],
  description: "warning roles for the warning system",
  run: async (bot, message, args) => {

    const db = bot.db

    let check = "<:leuxcheck:716819913901211658>";
    let no = "<:no:716819317852733480>";
    let coins = "<:leuxicoin:715493556810416238>";

    let channel;

    let channels = await db.fetch(`channel_${message.guild.id}`);

    if (channels == undefined) {
      channel = message.channel.name;
    } else {
      channel = channels;
    }

    if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
      return message.reply(
        `I don't have the **Administrator** permission to execute this command!`
      );
    }

    let L5 = await db.fetch(`level5_${message.guild.id}`);
    if (L5 == undefined) L5 = "Not set.";
    let L10 = await db.fetch(`level10_${message.guild.id}`);
    if (L10 == undefined) L10 = "Not set.";
    let L15 = await db.fetch(`level15_${message.guild.id}`);
    if (L15 == undefined) L15 = "Not set.";
    let L20 = await db.fetch(`level20_${message.guild.id}`);
    if (L20 == undefined) L20 = "Not set.";
    let L25 = await db.fetch(`level25_${message.guild.id}`);
    if (L25 == undefined) L25 = "Not set.";
    let L30 = await db.fetch(`level30_${message.guild.id}`);
    if (L30 == undefined) L30 = "Not set.";
    let L35 = await db.fetch(`level35_${message.guild.id}`);
    if (L35 == undefined) L35 = "Not set.";
    let L40 = await db.fetch(`level40_${message.guild.id}`);
    if (L40 == undefined) L40 = "Not set.";
    let L45 = await db.fetch(`level45_${message.guild.id}`);
    if (L45 == undefined) L45 = "Not set.";
    let L50 = await db.fetch(`level50_${message.guild.id}`);
    if (L50 == undefined) L50 = "Not set.";
    let L55 = await db.fetch(`level55_${message.guild.id}`);
    if (L55 == undefined) L55 = "Not set.";
    let L60 = await db.fetch(`level60_${message.guild.id}`);
    if (L60 == undefined) L60 = "Not set.";
    let L70 = await db.fetch(`level70_${message.guild.id}`);
    if (L70 == undefined) L70 = "Not set.";
    let L80 = await db.fetch(`level80_${message.guild.id}`);
    if (L80 == undefined) L80 = "Not set.";
    let L90 = await db.fetch(`level90_${message.guild.id}`);
    if (L90 == undefined) L90 = "Not set.";
    let L100 = await db.fetch(`level100_${message.guild.id}`);
    if (L100 == undefined) L100 = "Not set.";

    if (args[0] === "add") {
      if (!message.member.hasPermission("MANAGE_GUILD")) {
        return message.reply(
          "you don't have the **Manage Server** permission to use this command!"
        );
      }

      let role = args[1];
      let levelrole = args.slice(2).join(" ");

      if (!role)
        return message.reply(
          "please specify a warn level to set their warn role! (`w1`, `w2`, `w3`, `w4`, `w5`)"
        );

      if (role == "L5") {
        await db.set(`level5_${message.guild.id}`, levelrole);

        let settr1 = new Discord.RichEmbed()
          .setColor("#3654ff")
          .setDescription(
            `${check} Added **${levelrole}** as a reward for Level 5.`
          );
        message.channel.send(settr1);

        var addEmb = new Discord.RichEmbed()
          .setTitle("Logs | Level role added!")
          .setThumbnail(message.guild.iconURL)
          .setDescription(
            `**${levelrole}** role has been added as the reward role for Level 5.`
          )
          .setColor("#3654ff")
          .setFooter(`ID: ${message.author.id}`)
          .setTimestamp();
        var set = message.guild.channels.find(`name`, `${channel}`);
        set.send(addEmb);
      } else if (role == "L10") {
        await db.set(`level10_${message.guild.id}`, levelrole);

        let settr1 = new Discord.RichEmbed()
          .setColor("#3654ff")
          .setDescription(
            `${check} Added **${levelrole}** as a reward for Level 10.`
          );
        message.channel.send(settr1);

        var addEmb = new Discord.RichEmbed()
          .setTitle("Logs | Level role added!")
          .setThumbnail(message.guild.iconURL)
          .setDescription(
            `**${levelrole}** role has been added as the reward role for Level 10.`
          )
          .setColor("#3654ff")
          .setFooter(`ID: ${message.author.id}`)
          .setTimestamp();
        var set = message.guild.channels.find(`name`, `${channel}`);
        set.send(addEmb);
      } else if (role == "L15") {
        await db.set(`level15_${message.guild.id}`, levelrole);

        let settr1 = new Discord.RichEmbed()
          .setColor("#3654ff")
          .setDescription(
            `${check} Added **${levelrole}** as a reward for Level 15.`
          );
        message.channel.send(settr1);

        var addEmb = new Discord.RichEmbed()
          .setTitle("Logs | Level role added!")
          .setThumbnail(message.guild.iconURL)
          .setDescription(
            `**${levelrole}** role has been added as the reward role for Level 15.`
          )
          .setColor("#3654ff")
          .setFooter(`ID: ${message.author.id}`)
          .setTimestamp();
        var set = message.guild.channels.find(`name`, `${channel}`);
        set.send(addEmb);
      } else if (role == "L20") {
        await db.set(`level20_${message.guild.id}`, levelrole);

        let settr1 = new Discord.RichEmbed()
          .setColor("#3654ff")
          .setDescription(
            `${check} Added **${levelrole}** as a reward for Level 20.`
          );
        message.channel.send(settr1);

        var addEmb = new Discord.RichEmbed()
          .setTitle("Logs | Level role added!")
          .setThumbnail(message.guild.iconURL)
          .setDescription(
            `**${levelrole}** role has been added as the reward role for Level 20.`
          )
          .setColor("#3654ff")
          .setFooter(`ID: ${message.author.id}`)
          .setTimestamp();
        var set = message.guild.channels.find(`name`, `${channel}`);
        set.send(addEmb);
      } else if (role == "L25") {
        await db.set(`level25_${message.guild.id}`, levelrole);

        let settr1 = new Discord.RichEmbed()
          .setColor("#3654ff")
          .setDescription(
            `${check} Added **${levelrole}** as a reward for Level 25.`
          );
        message.channel.send(settr1);

        var addEmb = new Discord.RichEmbed()
          .setTitle("Logs | Level role added!")
          .setThumbnail(message.guild.iconURL)
          .setDescription(
            `**${levelrole}** role has been added as the reward role for Level 25.`
          )
          .setColor("#3654ff")
          .setFooter(`ID: ${message.author.id}`)
          .setTimestamp();
        var set = message.guild.channels.find(`name`, `${channel}`);
        set.send(addEmb);
      } else if (role == "L30") {
        await db.set(`level30_${message.guild.id}`, levelrole);

        let settr1 = new Discord.RichEmbed()
          .setColor("#3654ff")
          .setDescription(
            `${check} Added **${levelrole}** as a reward for Level 30.`
          );
        message.channel.send(settr1);

        var addEmb = new Discord.RichEmbed()
          .setTitle("Logs | Level role added!")
          .setThumbnail(message.guild.iconURL)
          .setDescription(
            `**${levelrole}** role has been added as the reward role for Level 30.`
          )
          .setColor("#3654ff")
          .setFooter(`ID: ${message.author.id}`)
          .setTimestamp();
        var set = message.guild.channels.find(`name`, `${channel}`);
        set.send(addEmb);
      } else if (role == "L35") {
        await db.set(`level35_${message.guild.id}`, levelrole);

        let settr1 = new Discord.RichEmbed()
          .setColor("#3654ff")
          .setDescription(
            `${check} Added **${levelrole}** as a reward for Level 35.`
          );
        message.channel.send(settr1);

        var addEmb = new Discord.RichEmbed()
          .setTitle("Logs | Level role added!")
          .setThumbnail(message.guild.iconURL)
          .setDescription(
            `**${levelrole}** role has been added as the reward role for Level 35.`
          )
          .setColor("#3654ff")
          .setFooter(`ID: ${message.author.id}`)
          .setTimestamp();
        var set = message.guild.channels.find(`name`, `${channel}`);
        set.send(addEmb);
      } else if (role == "L40") {
        await db.set(`level40_${message.guild.id}`, levelrole);

        let settr1 = new Discord.RichEmbed()
          .setColor("#3654ff")
          .setDescription(
            `${check} Added **${levelrole}** as a reward for Level 40.`
          );
        message.channel.send(settr1);

        var addEmb = new Discord.RichEmbed()
          .setTitle("Logs | Level role added!")
          .setThumbnail(message.guild.iconURL)
          .setDescription(
            `**${levelrole}** role has been added as the reward role for Level 40.`
          )
          .setColor("#3654ff")
          .setFooter(`ID: ${message.author.id}`)
          .setTimestamp();
        var set = message.guild.channels.find(`name`, `${channel}`);
        set.send(addEmb);
      } else if (role == "L45") {
        await db.set(`level45_${message.guild.id}`, levelrole);

        let settr1 = new Discord.RichEmbed()
          .setColor("#3654ff")
          .setDescription(
            `${check} Added **${levelrole}** as a reward for Level 45.`
          );
        message.channel.send(settr1);

        var addEmb = new Discord.RichEmbed()
          .setTitle("Logs | Level role added!")
          .setThumbnail(message.guild.iconURL)
          .setDescription(
            `**${levelrole}** role has been added as the reward role for Level 45.`
          )
          .setColor("#3654ff")
          .setFooter(`ID: ${message.author.id}`)
          .setTimestamp();
        var set = message.guild.channels.find(`name`, `${channel}`);
        set.send(addEmb);
      } else if (role == "L50") {
        await db.set(`level50_${message.guild.id}`, levelrole);

        let settr1 = new Discord.RichEmbed()
          .setColor("#3654ff")
          .setDescription(
            `${check} Added **${levelrole}** as a reward for Level 50.`
          );
        message.channel.send(settr1);

        var addEmb = new Discord.RichEmbed()
          .setTitle("Logs | Level role added!")
          .setThumbnail(message.guild.iconURL)
          .setDescription(
            `**${levelrole}** role has been added as the reward role for Level 50.`
          )
          .setColor("#3654ff")
          .setFooter(`ID: ${message.author.id}`)
          .setTimestamp();
        var set = message.guild.channels.find(`name`, `${channel}`);
        set.send(addEmb);
      } else if (role == "L55") {
        await db.set(`level55_${message.guild.id}`, levelrole);

        let settr1 = new Discord.RichEmbed()
          .setColor("#3654ff")
          .setDescription(
            `${check} Added **${levelrole}** as a reward for Level 55.`
          );
        message.channel.send(settr1);

        var addEmb = new Discord.RichEmbed()
          .setTitle("Logs | Level role added!")
          .setThumbnail(message.guild.iconURL)
          .setDescription(
            `**${levelrole}** role has been added as the reward role for Level 55.`
          )
          .setColor("#3654ff")
          .setFooter(`ID: ${message.author.id}`)
          .setTimestamp();
        var set = message.guild.channels.find(`name`, `${channel}`);
        set.send(addEmb);
      } else if (role == "L60") {
        await db.set(`level60_${message.guild.id}`, levelrole);

        let settr1 = new Discord.RichEmbed()
          .setColor("#3654ff")
          .setDescription(
            `${check} Added **${levelrole}** as a reward for Level 60.`
          );
        message.channel.send(settr1);

        var addEmb = new Discord.RichEmbed()
          .setTitle("Logs | Level role added!")
          .setThumbnail(message.guild.iconURL)
          .setDescription(
            `**${levelrole}** role has been added as the reward role for Level 60.`
          )
          .setColor("#3654ff")
          .setFooter(`ID: ${message.author.id}`)
          .setTimestamp();
        var set = message.guild.channels.find(`name`, `${channel}`);
        set.send(addEmb);
      } else if (role == "L70") {
        await db.set(`level70_${message.guild.id}`, levelrole);

        let settr1 = new Discord.RichEmbed()
          .setColor("#3654ff")
          .setDescription(
            `${check} Added **${levelrole}** as a reward for Level 70.`
          );
        message.channel.send(settr1);

        var addEmb = new Discord.RichEmbed()
          .setTitle("Logs | Level role added!")
          .setThumbnail(message.guild.iconURL)
          .setDescription(
            `**${levelrole}** role has been added as the reward role for Level 70.`
          )
          .setColor("#3654ff")
          .setFooter(`ID: ${message.author.id}`)
          .setTimestamp();
        var set = message.guild.channels.find(`name`, `${channel}`);
        set.send(addEmb);
      } else if (role == "L80") {
        await db.set(`level80_${message.guild.id}`, levelrole);

        let settr1 = new Discord.RichEmbed()
          .setColor("#3654ff")
          .setDescription(
            `${check} Added **${levelrole}** as a reward for Level 80.`
          );
        message.channel.send(settr1);

        var addEmb = new Discord.RichEmbed()
          .setTitle("Logs | Level role added!")
          .setThumbnail(message.guild.iconURL)
          .setDescription(
            `**${levelrole}** role has been added as the reward role for Level 80.`
          )
          .setColor("#3654ff")
          .setFooter(`ID: ${message.author.id}`)
          .setTimestamp();
        var set = message.guild.channels.find(`name`, `${channel}`);
        set.send(addEmb);
      } else if (role == "L90") {
        await db.set(`level90_${message.guild.id}`, levelrole);

        let settr1 = new Discord.RichEmbed()
          .setColor("#3654ff")
          .setDescription(
            `${check} Added **${levelrole}** as a reward for Level 90.`
          );
        message.channel.send(settr1);

        var addEmb = new Discord.RichEmbed()
          .setTitle("Logs | Level role added!")
          .setThumbnail(message.guild.iconURL)
          .setDescription(
            `**${levelrole}** role has been added as the reward role for Level 90.`
          )
          .setColor("#3654ff")
          .setFooter(`ID: ${message.author.id}`)
          .setTimestamp();
        var set = message.guild.channels.find(`name`, `${channel}`);
        set.send(addEmb);
      } else if (role == "L100") {
        await db.set(`level100_${message.guild.id}`, levelrole);

        let settr1 = new Discord.RichEmbed()
          .setColor("#3654ff")
          .setDescription(
            `${check} Added **${levelrole}** as a reward for Level 100.`
          );
        message.channel.send(settr1);

        var addEmb = new Discord.RichEmbed()
          .setTitle("Logs | Level role added!")
          .setThumbnail(message.guild.iconURL)
          .setDescription(
            `**${levelrole}** role has been added as the reward role for Level 100.`
          )
          .setColor("#3654ff")
          .setFooter(`ID: ${message.author.id}`)
          .setTimestamp();
        var set = message.guild.channels.find(`name`, `${channel}`);
        set.send(addEmb);
      } else {
        message.channel.send(`${no} I can't set a role for that!.`);
      }
    } else if (args[0] === "delete") {
      if (!message.member.hasPermission("MANAGE_GUILD"))
        return message.reply(
          "you can't delete warn roles, because you don't have the **Manage Server** permission!"
        );
      let therole = args.slice(1).join(" ");

      if (therole == `${L5}`) {
        await db.delete(`level5_${message.guild.id}`);
        message.channel.send(
          `**${therole}** has been deleted as the role for Level 5.`
        );
      } else if (therole == `${L10}`) {
        await db.delete(`level10_${message.guild.id}`);
        message.channel.send(
          `**${therole}** has been deleted as the role for Level 10.`
        );
      } else if (therole == `${L15}`) {
        await db.delete(`level15_${message.guild.id}`);
        message.channel.send(
          `**${therole}** has been deleted as the role for Level 15.`
        );
      } else if (therole == `${L20}`) {
        await db.delete(`level20_${message.guild.id}`);
        message.channel.send(
          `**${therole}** has been deleted as the role for Level 20.`
        );
      } else if (therole == `${L25}`) {
        await db.delete(`level25_${message.guild.id}`);
        message.channel.send(
          `**${therole}** has been deleted as the role for Level 25.`
        );
      } else if (therole == `${L30}`) {
        await db.delete(`level30_${message.guild.id}`);
        message.channel.send(
          `**${therole}** has been deleted as the role for Level 30.`
        );
      } else if (therole == `${L35}`) {
        await db.delete(`level35_${message.guild.id}`);
        message.channel.send(
          `**${therole}** has been deleted as the role for Level 35.`
        );
      } else if (therole == `${L40}`) {
        await db.delete(`level40_${message.guild.id}`);
        message.channel.send(
          `**${therole}** has been deleted as the role for Level 40`
        );
      } else if (therole == `${L45}`) {
        await db.delete(`level45_${message.guild.id}`);
        message.channel.send(
          `**${therole}** has been deleted as the role for Level 45.`
        );
      } else if (therole == `${L50}`) {
        await db.delete(`level50_${message.guild.id}`);
        message.channel.send(
          `**${therole}** has been deleted as the role for Level 50.`
        );
      } else if (therole == `${L55}`) {
        await db.delete(`level55_${message.guild.id}`);
        message.channel.send(
          `**${therole}** has been deleted as the role for Level 55.`
        );
      } else if (therole == `${L60}`) {
        await db.delete(`level60_${message.guild.id}`);
        message.channel.send(
          `**${therole}** has been deleted as the role for Level 60.`
        );
      } else if (therole == `${L70}`) {
        await db.delete(`level70_${message.guild.id}`);
        message.channel.send(
          `**${therole}** has been deleted as the role for Level 70.`
        );
      } else if (therole == `${L80}`) {
        await db.delete(`level80_${message.guild.id}`);
        message.channel.send(
          `**${therole}** has been deleted as the role for Level 80.`
        );
      } else if (therole == `${L90}`) {
        await db.delete(`level90_${message.guild.id}`);
        message.channel.send(
          `**${therole}** has been deleted as the role for Level 90.`
        );
      } else if (therole == `${L100}`) {
        await db.delete(`level100_${message.guild.id}`);
        message.channel.send(
          `**${therole}** has been deleted as the role for Level 100.`
        );
      } else {
        message.reply(
          "I couldn't find that warn role! Define an warn role and be very specific!"
        );
      }
    } else {
      let nulled = new Discord.RichEmbed()
        .setAuthor("Level roles list", message.guild.iconURL)
        //.setDescription("There are no warning roles set for this server!\nSet a warnrole by using the `warnrole` command.\nExample: `l.warnrole add [warning level (w1, w2, w3, w4, w5)] [role_name]`\n\nIf you're going to delete an warn role, please add another one immediately, or the warning system won't work.")
        .setColor("#3654ff")
        .setDescription(
          `**Level 5** - ${L5}\n**Level 10** - ${L10}\n**Level 15** - ${L15}\n**Level 20** - ${L20}\n**Level 25** - ${L25}\n**Level 30** - ${L30}\n**Level 35** - ${L35}\n**Level 40** - ${L40}\n**Level 45** - ${L45}\n**Level 50** - ${L50}\n**Level 55** - ${L55}\n**Level 60** - ${L60}\n**Level 70** - ${L70}\n**Level 80** - ${L80}\n**Level 90** - ${L90}\n**Level 100** - ${L100}  `
        );
      message.channel.send(nulled);
    }
  }
};
