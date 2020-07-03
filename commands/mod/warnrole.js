const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db");
const ms = require("ms")

module.exports = {
    name: 'warnrole',
    aliases: ["warnroles", "warningrole", "warningroles"],
    description: "warning roles for the warning system",
    run: async (bot, message, args) => {
        
    let check = "<:leuxcheck:716819913901211658>";
    let no = "<:no:716819317852733480>";
    let coins = "<:leuxicoin:715493556810416238>";

    let channel;
  
    let channels = await db.fetch(`channel_${message.guild.id}`)
    
    if(channels == null){
      channel = message.channel.name;
    } else {
      channel = channels;
    }
	   
      if(!message.guild.me.hasPermission("ADMINISTRATOR")) {
        return message.reply(`I don't have the **Administrator** permission to execute this command!`)
          }
      
    let w1 = await db.fetch(`warn1_${message.guild.id}`)
    let w2 = await db.fetch(`warn2_${message.guild.id}`)
    
    let w3 = await db.fetch(`warn3_${message.guild.id}`)
    let w4 = await db.fetch(`warn4_${message.guild.id}`)
    
    let w5 = await db.fetch(`warn5_${message.guild.id}`)
    if(args[0] === "add") {
    if(!message.member.hasPermission("MANAGE_GUILD")) {
      return message.reply("you don't have the **Manage Server** permission to use this command!")
    }
    
      let role = args[1]
      let warnrole = args.slice(2).join(" ")
      
      if(!role) return message.reply("please specify a warn level to set their warn role! (`w1`, `w2`, `w3`, `w4`, `w5`)")
  
      if(role == "w1") {
      await db.set(`warn1_${message.guild.id}`, warnrole)

      let settr1 = new Discord.RichEmbed()
      .setColor("#3654ff")
      .setDescription(`${check} Added **${warnrole}** as warn role for W1.`)
      message.channel.send(settr1)
        
        var addEmb = new Discord.RichEmbed()
        .setTitle("Logs | Warn role added!")
        .setThumbnail(message.guild.iconURL)
        .setDescription(`**${warnrole}** role has been added as the role for W1.`)
        .setColor("#3654ff")
        .setFooter(`ID: ${message.author.id}`)
        .setTimestamp()
        var set = message.guild.channels.find(`name`, `${channel}`)
        set.send(addEmb);
        
      } else

      if(role == "w2") {
      await db.set(`warn2_${message.guild.id}`, warnrole)

      let settr1 = new Discord.RichEmbed()
      .setColor("#3654ff")
      .setDescription(`${check} Added **${warnrole}** as warn role for W2.`)
      message.channel.send(settr1)
        
        var addEmb = new Discord.RichEmbed()
        .setTitle("Logs | Warn role added!")
        .setThumbnail(message.guild.iconURL)
        .setDescription(`**${warnrole}** role has been added as the role for W2.`)
        .setColor("#3654ff")
        .setFooter(`ID: ${message.author.id}`)
        .setTimestamp()
        var set = message.guild.channels.find(`name`, `${channel}`)
        set.send(addEmb);
        
      } else

      if(role == "w3") {
      await db.set(`warn3_${message.guild.id}`, warnrole)

      let settr1 = new Discord.RichEmbed()
      .setColor("#3654ff")
      .setDescription(`${check} Added **${warnrole}** as warn role for W3.`)
      message.channel.send(settr1)
        
        var addEmb = new Discord.RichEmbed()
        .setTitle("Logs | Warn role added!")
        .setThumbnail(message.guild.iconURL)
        .setDescription(`**${warnrole}** role has been added as the role for W3.`)
        .setColor("#3654ff")
        .setFooter(`ID: ${message.author.id}`)
        .setTimestamp()
        var set = message.guild.channels.find(`name`, `${channel}`)
        set.send(addEmb);
        
      } else

      if(role == "w4") {
      await db.set(`warn4_${message.guild.id}`, warnrole)

      let settr1 = new Discord.RichEmbed()
      .setColor("#3654ff")
      .setDescription(`${check} Added **${warnrole}** as warn role for W4.`)
      message.channel.send(settr1)
        
        var addEmb = new Discord.RichEmbed()
        .setTitle("Logs | Warn role added!")
        .setThumbnail(message.guild.iconURL)
        .setDescription(`**${warnrole}** role has been added as the role for W4.`)
        .setColor("#3654ff")
        .setFooter(`ID: ${message.author.id}`)
        .setTimestamp()
        var set = message.guild.channels.find(`name`, `${channel}`)
        set.send(addEmb);

      } else 

      if(role == "w5") {
      await db.set(`warn5_${message.guild.id}`, warnrole)

      let settr1 = new Discord.RichEmbed()
      .setColor("#3654ff")
      .setDescription(`${check} Added **${warnrole}** as warn role for W5.`)
      message.channel.send(settr1)
        
        var addEmb = new Discord.RichEmbed()
        .setTitle("Logs | Warn role added!")
        .setThumbnail(message.guild.iconURL)
        .setDescription(`**${warnrole}** role has been added as the role for W5.`)
        .setColor("#3654ff")
        .setFooter(`ID: ${message.author.id}`)
        .setTimestamp()
        var set = message.guild.channels.find(`name`, `${channel}`)
        set.send(addEmb);
        
      } else {
        
        message.channel.send(`${no} I can't set a role for that!.`)
        
      }
    } else
      
      if(args[0] === "delete") {
      if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("you can't delete warn roles, because you don't have the **Manage Server** permission!")
      let therole = args.slice(1).join(" ")
        
      if(therole == `${w1}`) {
        await db.delete(`warn1_${message.guild.id}`)
        message.channel.send(`**${therole}** has been deleted as the role for W1.`)
      } else
      
      if(therole == `${w2}`) {
        await db.delete(`warn2_${message.guild.id}`)
        message.channel.send(`**${therole}** has been deleted as the role for W2.`)
      } else
       
      if(therole == `${w3}`) {
        await db.delete(`warn3_${message.guild.id}`)
        message.channel.send(`**${therole}** has been deleted as the role for W3.`)
      } else

      if(therole == `${w4}`) {
        await db.delete(`warn4_${message.guild.id}`)
        message.channel.send(`**${therole}** has been deleted as the role for W4.`)
      } else 

      if(therole == `${w5}`) {
        await db.delete(`warn5_${message.guild.id}`)
        message.channel.send(`**${therole}** has been deleted as the role for W5.`)
      } else {
        message.reply("I couldn't find that warn role! Define an warn role and be very specific!")
      }
        
    } else {
      
      if(w1 !== null && w2 !== null && w3 !== null && w4 !== null && w5 !== null) {
      let timerolesembed = new Discord.RichEmbed()
      .setAuthor("Warn roles list", message.guild.iconURL)
      .setDescription(`**${w1}** - W1\n**${w2}** - W2\n**${w3}** - W3\n**${w4}** - W4\n**${w5}** - W5`)
      .setColor("#9feb65")
      message.channel.send(timerolesembed)
      } 

      if(w1 !== null && w2 !== null && w3 !== null && w4 !== null && w5 == null) {
      let timerolesembed = new Discord.RichEmbed()
      .setAuthor("Warn roles list", message.guild.iconURL)
      .setDescription(`**${w1}** - W1\n**${w2}** - W2\n**${w3}** - W3\n**${w4}** - W4`)
      .setColor("#9feb65")
      message.channel.send(timerolesembed)
      } 

      if(w1 !== null && w2 !== null && w3 !== null && w4 == null) {
      let embedroles = new Discord.RichEmbed()
      .setAuthor("Warn roles list", message.guild.iconURL)
      .setDescription(`**${w1}** - W1\n**${w2}** - W2\n**${w3}** - W3`)
      .setColor("#9feb65")
      message.channel.send(embedroles)
      }
 
      if(w1 !== null && w2 !== null && w3 == null) {
      let timeroles = new Discord.RichEmbed()
      .setAuthor("Warn roles list", message.guild.iconURL)
      .setDescription(`**${w1}** - W1\n**${w2}** - W2`)
      .setColor("#9feb65")
      message.channel.send(timeroles)
      }
      if(w1 !== null && w2 == null) {
        let autoroles = new Discord.RichEmbed()
        .setAuthor("Warn roles list", message.guild.iconURL)
        .setDescription(`**${w1}** - W1`)
        .setColor("#9feb65")
        message.channel.send(autoroles)
      }
      
      if(w1 == null && w2 == null){
        let nulled = new Discord.RichEmbed()
        .setAuthor("Warn roles list", message.guild.iconURL)
        .setDescription("There are no warning roles set for this server!\nSet a warnrole by using the `warnrole` command.\nExample: `l.warnrole add [warning level (w1, w2, w3, w4, w5)] [role_name]`\n\nIf you're going to delete an warn role, please add another one immediately, or the warning system won't work.")
        message.channel.send(nulled)
      }
    }
      
    }
}