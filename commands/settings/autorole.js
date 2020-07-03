const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true });
const db = require("quick.db");
const ms = require("ms");
const { stripIndents } = require("common-tags");

module.exports = {
  name: "autorole",
  aliases: ["timedroles", "timedrole", "autoroles"],
  description: "Repeats what the user said.",
  run: async (bot, message, args) => {
    let check = "<:leuxcheck:716819913901211658>";
    let no = "<:no:716819317852733480>";
    let coins = "<:leuxicoin:715493556810416238>";

    let channel;

    let channels = await db.fetch(`channel_${message.guild.id}`);

    if (channels == null) {
      channel = message.channel.name;
    } else {
      channel = channels;
    }

    let plus = await db.fetch(`plus_${message.guild.id}`);

    let tr1 = await db.fetch(`timedrole1_${message.guild.id}`);
    let tr1t = await db.fetch(`timedrole1time_${message.guild.id}`);

    let tr2 = await db.fetch(`timedrole2_${message.guild.id}`);
    let tr2t = await db.fetch(`timedrole2time_${message.guild.id}`);

    let tr3 = await db.fetch(`timedrole3_${message.guild.id}`);
    let tr3t = await db.fetch(`timedrole3time_${message.guild.id}`);

    let tr4 = await db.fetch(`timedrole4_${message.guild.id}`);
    let tr4t = await db.fetch(`timedrole4time_${message.guild.id}`);

    let tr5 = await db.fetch(`timedrole5_${message.guild.id}`);
    let tr5t = await db.fetch(`timedrole5time_${message.guild.id}`);

    if (!message.guild.me.hasPermission("MANAGE_GUILD")) {
      return message.reply(
        `I don't have the **Manage Server** permission to execute this command!`
      );
    }

    if (args[0] === "add") {
      if (!message.member.hasPermission("MANAGE_GUILD")) {
        return message.reply(
          "you don't have the **Manage Server** permission to use this command!"
        );
      }
      let x = args[1];
      let time = ms(x);
      let role = args.slice(2).join(" ");

      if (!x)
        return message.reply(
          "please specify an amount of time to add the autorole!"
        );
      if (!role)
        return message.reply(
          "please specify a role to be given! (Do not mention the role!)"
        );

      if (tr1 == null) {
        await db.set(`timedrole1_${message.guild.id}`, role);
        await db.set(`timedrole1time_${message.guild.id}`, time);
        let settr1 = new Discord.RichEmbed()
          .setColor("#3654ff")
          .setDescription(
            `${check} Added **${role}** as an autorole, that will be given in **${ms(
              time
            )}**.`
          );
        message.channel.send(settr1);

        var addEmb = new Discord.RichEmbed()
          .setTitle("Logs | Autorole added!")
          .setThumbnail(message.guild.iconURL)
          .setDescription(
            `**${role}** role has been added to the autorole list.`
          )
          .setColor("#3654ff")
          .setFooter(`ID: ${message.author.id}`)
          .setTimestamp();
        var set = message.guild.channels.find(`name`, `${channel}`);
        set.send(addEmb);
      } else if (tr1 !== null && tr2 == null) {
        await db.set(`timedrole2_${message.guild.id}`, role);
        await db.set(`timedrole2time_${message.guild.id}`, time);
        let settr2 = new Discord.RichEmbed()
          .setColor("#3654ff")
          .setDescription(
            `${check} Added **${role}** as an autorole, that will be given in **${ms(
              time
            )}**.`
          );
        message.channel.send(settr2);

        var addEmb = new Discord.RichEmbed()
          .setTitle("Logs | Autorole added!")
          .setThumbnail(message.guild.iconURL)
          .setDescription(
            `**${role}** role has been added to the autorole list.`
          )
          .setColor("#3654ff")
          .setFooter(`ID: ${message.author.id}`)
          .setTimestamp();
        var set = message.guild.channels.find(`name`, `${channel}`);
        set.send(addEmb);
      } else if (tr1 !== null && tr2 !== null && tr3 == null) {
        await db.set(`timedrole3_${message.guild.id}`, role);
        await db.set(`timedrole3time_${message.guild.id}`, time);
        let settr3 = new Discord.RichEmbed()
          .setColor("#3654ff")
          .setDescription(
            `${check} Added **${role}** as an autorole, that will be given in **${ms(
              time
            )}**.`
          );
        message.channel.send(settr3);

        var addEmb = new Discord.RichEmbed()
          .setTitle("Logs | Autorole added!")
          .setThumbnail(message.guild.iconURL)
          .setDescription(
            `**${role}** role has been added to the autorole list.`
          )
          .setColor("#3654ff")
          .setFooter(`ID: ${message.author.id}`)
          .setTimestamp();
        var set = message.guild.channels.find(`name`, `${channel}`);
        set.send(addEmb);
      } else if (plus == "subscriber") {
        if (tr1 !== null && tr2 !== null && tr3 !== null && tr4 == null) {
          await db.set(`timedrole4_${message.guild.id}`, role);
          await db.set(`timedrole4time_${message.guild.id}`, time);
          let settr4 = new Discord.RichEmbed()
            .setColor("#3654ff")
            .setDescription(
              `${check} Added **${role}** as an autorole, that will be given in **${ms(
                time
              )}**.`
            );
          message.channel.send(settr4);

          var addEmb = new Discord.RichEmbed()
            .setTitle("Logs | Autorole added!")
            .setThumbnail(message.guild.iconURL)
            .setDescription(
              `**${role}** role has been added to the autorole list.`
            )
            .setColor("#3654ff")
            .setFooter(`ID: ${message.author.id}`)
            .setTimestamp();
          var set = message.guild.channels.find(`name`, `${channel}`);
          set.send(addEmb);
        } else if (
          tr1 !== null &&
          tr2 !== null &&
          tr3 !== null &&
          tr4 !== null &&
          tr5 == null
        ) {
          await db.set(`timedrole5_${message.guild.id}`, role);
          await db.set(`timedrole5time_${message.guild.id}`, time);
          let settr5 = new Discord.RichEmbed()
            .setColor("#3654ff")
            .setDescription(
              `${check} Added **${role}** as an autorole, that will be given in **${ms(
                time
              )}**.`
            );
          message.channel.send(settr5);

          var addEmb = new Discord.RichEmbed()
            .setTitle("Logs | Autorole added!")
            .setThumbnail(message.guild.iconURL)
            .setDescription(
              `**${role}** role has been added to the autorole list.`
            )
            .setColor("#3654ff")
            .setFooter(`ID: ${message.author.id}`)
            .setTimestamp();
          var set = message.guild.channels.find(`name`, `${channel}`);
          set.send(addEmb);
        } else {
          let full = new Discord.RichEmbed()
            .setColor("#ff3434")
            .setDescription(
              `${no} This server's autorole storage (5/5) is **full**!\nDelete some roles to create new autoroles`
            );
          message.channel.send(full);
        }
      } else {
        message.channel.send(
          new Discord.RichEmbed()
            .setColor("#ff3434")
            .setDescription(
              `${no} This server's autorole storage (3/3) is **full**!\nDelete some roles to create new autoroles.`
            )
        );
      }
    } else if (args[0] === "delete") {
      if (!message.member.hasPermission("MANAGE_GUILD"))
        return message.reply(
          "you can't delete autoroles, because you don't have the **Manage Server** permission!"
        );
      let therole = args.slice(1).join(" ");

      if (therole == `${tr1}`) {
        await db.delete(`timedrole1_${message.guild.id}`);
        await db.delete(`timedrole1time_${message.guild.id}`);
        message.channel.send(
          `**${therole}** has been deleted from the autoroles list.`
        );
      } else if (therole == `${tr2}`) {
        await db.delete(`timedrole2_${message.guild.id}`);
        await db.delete(`timedrole2time_${message.guild.id}`);
        message.channel.send(
          `**${therole}** has been deleted from the autoroles list.`
        );
      } else if (therole == `${tr4}`) {
        await db.delete(`timedrole4_${message.guild.id}`);
        await db.delete(`timedrole4time_${message.guild.id}`);
        message.channel.send(
          `**${therole}** has been deleted from the autoroles list.`
        );
      } else if (therole == `${tr5}`) {
        await db.delete(`timedrole5_${message.guild.id}`);
        await db.delete(`timedrole5time_${message.guild.id}`);
        message.channel.send(
          `**${therole}** has been deleted from the autoroles list.`
        );
      } else if (therole == `${tr3}`) {
        await db.delete(`timedrole3_${message.guild.id}`);
        await db.delete(`timedrole3time_${message.guild.id}`);
        message.channel.send(
          `**${therole}** has been deleted from the autoroles list.`
        );
      } else {
        message.reply(
          "I couldn't find that autorole! Define an autorole and be very specific!"
        );
      }
    } else {
      
        if (tr1 == null) {
          tr1 = "N/A";
          tr1t = "N/A";
        }
        if (tr2 == null) {
          tr2 = "N/A";
          tr2t = "N/A";
        }
        if (tr3 == null) {
          tr3 = "N/A";
          tr3t = "N/A";
        }

        let t1tt;
        let t2tt;
        let t3tt;

        if (tr1t === "N/A") {
          t1tt = "N/A";
        } else {
          t1tt = ms(tr1t);
        }

        if (tr2t === "N/A") {
          t2tt = "N/A";
        } else {
          t2tt = ms(tr2t);
        }

        if (tr3t === "N/A") {
          t3tt = "N/A";
        } else {
          t3tt = ms(tr3t);
        }

        let autoroles = new Discord.RichEmbed()
          .setAuthor("Autoroles list", message.guild.iconURL)
          .setDescription(
            stripIndents`
**N/A** shows if there is a free space.

**${tr1}** - ${t1tt}
**${tr2}** - ${t2tt}
**${tr3}** - ${t3tt}
`
          )
          .setColor("#9feb65");
        
      if (plus == "subscriber") {
          
          if (tr1 == null) {
            tr1 = "N/A";
            tr1t = "N/A";
          }
          if (tr2 == null) {
            tr2 = "N/A"
            tr2t = "N/A";
          }
          if (tr3 == null) {
            tr3 = "N/A"
            tr3t = "N/A";
          }
          if (tr4 == null) {
            tr4 = "N/A"
            tr4t = "N/A";
          }
          if (tr5 == null) {
            tr5 = "N/A"
            tr5t = "N/A";
          }
        
        let t1t; let t2t; let t3t; let t4t; let t5t;
        
        if(tr1t === "N/A"){
          t1t = "N/A"
        } else {
          t1t = ms(tr1t)
        }
        
        if(tr2t === "N/A"){
          t2t = "N/A"
        } else {
          t2t = ms(tr2t)
        }
        
        if(tr3t === "N/A"){
          t3t = "N/A"
        } else {
          t3t = ms(tr3t)
        }
        
        if(tr4t === "N/A"){
          t4t = "N/A"
        } else {
          t4t = ms(tr4t)
        }
        
        if(tr5t === "N/A"){
          t5t = "N/A"
        } else {
          t5t = ms(tr5t)
        }
        
          let subs = new Discord.RichEmbed().setAuthor(
            "Autoroles list",
            message.guild.iconURL
          ).setDescription(stripIndents`
**N/A** shows if there is a free space.

**${tr1}** - ${t1t}
**${tr2}** - ${t2t}
**${tr3}** - ${t3t}
**${tr4}** - ${t4t}
**${tr5}** - ${t5t}
`)
          .setColor("#9feb65")
          return message.channel.send(subs);
      } else {
       return message.channel.send(autoroles)
      }
      if (tr1 == null) {
        let nulled = new Discord.RichEmbed()
          .setAuthor("Autoroles list", message.guild.iconURL)
          .setDescription(
            "There are no autoroles set for this server.\nSet an autorole by using the `autorole` command.\nExample: `l.autorole add [time] [role_name]`\n\nIf you're going to delete an autorole, please start at the last role you added."
          );
        message.channel.send(nulled);
      }
    }
  }
};
