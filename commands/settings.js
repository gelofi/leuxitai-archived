const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db");

module.exports = {
    name: 'settings',
    aliases: ["serversettings", "stgs"],
    description: "Repeats what the user said.",
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
      if(rank == null) rank = "off";
      
      //Autoroles
      let tr1 = await db.fetch(`timedrole1_${message.guild.id}`)
      if(tr1 == null) tr1 = "No autorole set. (1/3)";
      let tr2 = await db.fetch(`timedrole2_${message.guild.id}`)
      if(tr2 == null) tr2 = "No autorole set. (2/3)";
      let tr3 = await db.fetch(`timedrole3_${message.guild.id}`)
      if(tr3 == null) tr3 = "No autorole set. (3/3)";
      
      //Autorole Times.
      let tr1t = await db.fetch(`timerole1time_${message.guild.id}`)
      if(tr1t == null) tr1t = "None";
      let tr2t = await db.fetch(`timerole2time_${message.guild.id}`)
      if(tr2t == null) tr2t = "None";
      let tr3t = await db.fetch(`timerole3time_${message.guild.id}`)
      if(tr3t == null) tr3t = "None";
      
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
      .addField("**Toggles**", `**XP System** - ${set[levels]}\n**Economy System** - ${set[economy]}\n**Anti-spam** - ${set[antispam]}\n**Image Cards** - ${set[rank]}`)
      .addField("**Roles** (Required)", `**Mute Role** - ${mute}\n**Main Role** - ${main}`)
      .addField("**Autoroles** (Optional)", `**${tr1}** - ${tr1t}\n**${tr2}** - ${tr2t}\n**${tr3}** - ${tr3t}`)
      .addField("**Warn Roles** (Required)", `**W1** - ${w1}\n**W2** - ${w2}\n**W3** - ${w3}\n**W4** - ${w4}\n**W5** - ${w5}`)
      .setFooter(`You can modify these toggles using other commands.\nDo ${prefix}manual to view the instructions.`)
      message.channel.send(settings)
    }
}