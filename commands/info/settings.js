const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db");

module.exports = {
    name: 'settings',
    aliases: ["serversettings", "stgs"],
    description: "Send the server's settings.",
    run: async (bot, message, args) => {
      
      let set = {
        "off":"Off",
        "on":"On"
      }
      
      //Channels
      let logc = await db.fetch(`channel_${message.guild.id}`)
      if(logc == null) logc = "Not set.";
      let modc = await db.fetch(`wchannel_${message.guild.id}`)
      if(modc == null) modc = "Not set.";
      
      //Toggles
      let levels = await db.fetch(`togglexp_${message.guild.id}`)
      if(levels == null) levels = "off";
      let economy = await db.fetch(`eco_${message.guild.id}`)
      if(economy == null) economy = "off";
      let antispam = await db.fetch(`antispam_${message.guild.id}`)
      if(antispam == null) antispam = "off";
      let rank = await db.fetch(`rank_${message.guild.id}`)
      if(rank == null) rank = "on";
      
      //Warn Roles
      let w1 = await db.fetch(`warn1_${message.guild.id}`)
      if(w1 == null) w1 = "Not set.";
      let w2 = await db.fetch(`warn2_${message.guild.id}`)
      if(w2 == null) w2 = "Not set.";
      let w3 = await db.fetch(`warn3_${message.guild.id}`)
      if(w3 == null) w3 = "Not set.";
      let w4 = await db.fetch(`warn4_${message.guild.id}`)
      if(w4 == null) w4 = "Not set.";
      let w5 = await db.fetch(`warn5_${message.guild.id}`)
      if(w5 == null) w5 = "Not set.";
        
      //Mute Roles
      let main = await db.fetch(`mainRole_${message.guild.id}`)
      if(main == null) main = "Not set.";
      let mute = await db.fetch(`muteRole_${message.guild.id}`)
      if(mute == null) mute = "Not set.";
      
      //Prefix
      let prefix = await db.fetch(`prefix_${message.guild.id}`)
      if(prefix == null) prefix = "l."
      
      let settings = new Discord.RichEmbed()
      .setAuthor(`${message.guild.name} - Settings`)
      .setColor(message.member.displayHexColor)
      .setDescription("View all toggles, set roles, and set channels.\nIf some are not set, please set them up to manage Leuxitai thoroughly.")
      .addField("**Prefix** (Optional)", `\`${prefix}\``)
      .addField("**Toggles** (Optional)", `**XP System** - ${set[levels]}\n**Economy System** - ${set[economy]}\n**Anti-spam** - ${set[antispam]}\n**Image Cards** - ${set[rank]}`)
      .addField("**Roles** (Required to use the Mute command)", `**Mute Role** - ${mute}\n**Main Role** - ${main}`)
      .addField("**Autoroles** (Optional)", `This list varies. Do \`${prefix}autoroles\` to view this list.`)
      .addField("**Warn Roles** (Required to use the Warning System)", `**W1** - ${w1}\n**W2** - ${w2}\n**W3** - ${w3}\n**W4** - ${w4}\n**W5** - ${w5}`)
      .addField("**Level Roles** (Optional)", `This list is long. Do \`${prefix}levelroles\` to view this list.`)
      .addField("**Channels**", `**Logging Channel** - \`${logc}\`\n**Moderation Log Channel** - \`${modc}\``)
      .setFooter(`You can modify these toggles using other commands.\nDo ${prefix}manual to view the instructions.`)
      message.channel.send(settings)
    }
}