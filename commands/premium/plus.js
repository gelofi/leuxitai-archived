const Discord = require('discord.js')
const { stripIndents } = require("common-tags")
const db = require("quick.db")
module.exports = {
    name: 'plus',
    aliases: ["leuxitai+", "premium"],
    description: "Discover Leuxitai+ subscription features.",
    run: async (bot, message, args) => {
      
      let plus = await db.fetch(`plus_${message.guild.id}`)
      
      let sub = new Discord.RichEmbed()
      .setAuthor("Leuxitai+ Features", bot.user.displayAvatarURL)
      .setColor("#3654ff")
      .setDescription(stripIndents`
Subscribe to **[Leuxitai Plus](https://leuxitai.glitch.me/plus)**!
Get more features, and upcoming features in development!
No monthly fees, only one-time payment!

**Features**
> • More Commands
> | Some *special* commands are restricted to **Leuxitai+**.
> | | Do \`l.plus commands\` to discover all commands that come with Leuxitai+

> • More Storage
> | Your **Server Storage**'s maximum is 3/3.
> | | Bump it up to \`5/5\`! More items to \`shop\` and \`autorole\` !

> • Custom Rank Card
> | Almost everybody loves customization.
> | | Let your members customize their rank card **within** the server.
> | | | Get the \`rcbg\` command to customize your rank card.

> • Support Leuxitai & The Dev!
> | It will make Leuxitai running smooth, 24/7.
> | | It'll also support to developer, Fizx#5360 for further bot enhancements!

**Subscribe now** for only **$0.99** (or equivalent) via [PayPal](https://paypal.com)
(the only way the dev can receive money internationally)

[Click here to subscribe!](https://www.paypal.me/fizx26)
Don't forget to add a note with your server's ID.
**[Leuxitai+](https://leuxitai.glitch.me/plus)** will be activated in 8 - 10 hours.
`)
      if(plus == "subscriber"){
        sub.setFooter("This server is already subscribed to Leuxitai+.")
      } else {
        sub.setFooter("This server isn't subscribed to Leuxitai+")
      }
  
      let commands = new Discord.RichEmbed()
      .setAuthor("Leuxitai+ Commands List")
      .setColor("#3654ff")
      .setDescription(stripIndents`
The commands listed here on also written in the \`l.help\` command.

**Commands**
\`rcbg\`, \`connectfour\`
`)
      .setFooter("More commands to come! Get notified! Join our server. | l.support |")
      
      if(args[0] === "commands"){
        message.channel.send(commands)
      } else
      if(args[0] === "check"){
        if(plus !== "subscriber"){
          message.channel.send("This server is **NOT SUBSCRIBED** to Leuxitai Plus!")
        } else {
          message.channel.send("This server is **SUBSCRIBED** to Leuxitai Plus.")
        }
      } else {
        message.channel.send(sub)
      }
    }
}