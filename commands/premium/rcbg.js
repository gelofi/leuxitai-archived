const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db");
const { stripIndents } = require("common-tags");

module.exports = {
    name: 'rcbg',
    aliases: ["custom-bg", "rankbg", "rankcbg"],
    description: "Repeats what the user said.",
    run: async (bot, message, args) => {
      
      let plus = await db.fetch(`plus_${message.guild.id}`)
      let lp = "<:leuxitailight:720799037145612349>"
      
      let noplus = new Discord.RichEmbed()
      .setColor("#3654ff")
      .setAuthor(message.guild.name, message.guild.iconURL)
      .setDescription(stripIndents`
This server isn't subscribed to ${lp} **Leuxitai Plus**.
Enjoy more features by having a Leuxitai+ subscription.
Do \`l.plus\` to discover Leuxitai+ features!
`)
      .setFooter("Leuxitai+ is one-time payment only. Get more features with a subscription!")
      
      if(plus !== "subscriber")
        return message.channel.send(noplus)
      
      let bg = `rcbg_${message.guild.id}_${message.author.id}`
      let rcbg = await db.fetch(bg)
      
      let newBG = args[0] || message.attachments.first();
      if(!newBG) return message.reply("please attach a photo or input a valid image URL! Or `reset` to remove your custom background.");
      try {
      if(args[0]){
      if(args[0] === "reset" || args[0] === "remove" || args[0] === "delete"){
        await db.delete(bg)
        return message.channel.send(`Successfully reset ${message.author}'s Custom Rank Card Background.`)
      } else
      if(!args[0].startsWith("https://")) return message.reply("that's not a valid URL! My URLs must start with HTTPS.")
      await db.set(bg, args[0]);
      message.channel.send(`${message.author} Rank Card's Custom Background has been set to\n${args[0]} successfully.`);
      } else {
        let att = message.attachments.first().url
        await db.set(bg, att);
        message.channel.send(`${message.author} Rank Card's Custom Background has been set to\n${att} successfully.`);
      }
      } catch (err) {
        let error = new Discord.RichEmbed()
        .setAuthor("Error occurred: l.rcbg")
        .setColor("#ff3636")
        .setDescription("```" + err + "```")
        message.channel.send(":warning: An error occurred!\nThis has been reported to the developers automatically. No need to report.")
        bot.users.get("563351780944248843").send(error)
      }
    }
}