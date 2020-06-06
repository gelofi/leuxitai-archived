const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db");
const ms = require("ms")

module.exports = {
    name: 'autorole',
    aliases: ["timedroles", "timedrole", "autoroles"],
    description: "Repeats what the user said.",
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
	   
    let tr1 = await db.fetch(`timedrole1_${message.guild.id}`)
    let tr1t = await db.fetch(`timedrole1time_${message.guild.id}`)
    
    let tr2 = await db.fetch(`timedrole2_${message.guild.id}`)
    let tr2t = await db.fetch(`timedrole2time_${message.guild.id}`)
    
    if(args[0] === "add") {
    if(!message.member.hasPermission("MANAGE_GUILD")) {
      return message.reply("you don't have the **Manage Server** permission to use this command!")
    }
      let x = args[1]
      let time = ms(x)
      let role = args.slice(2).join(" ")
      
      if(!x) return message.reply("please specify an amount of time to add the autorole!")
      if(!role) return message.reply("please specify a role to be given! (Do not mention the role!)")
      
      if(tr1 == null) {
      await db.set(`timedrole1_${message.guild.id}`, role)
      await db.set(`timedrole1time_${message.guild.id}`, time)
      let settr1 = new Discord.RichEmbed()
      .setColor("#3654ff")
      .setDescription(`${check} Added **${role}** as an autorole, that will be given in **${ms(time)}**.`)
      message.channel.send(settr1)
        
        var addEmb = new Discord.RichEmbed()
        .setTitle("Logs | Autorole added!")
        .setThumbnail(message.guild.iconURL)
        .setDescription(`**${role}** role has been added to the autorole list.`)
        .setColor("#3654ff")
        .setFooter(`ID: ${message.author.id}`)
        .setTimestamp()
        var set = message.guild.channels.find(`name`, `${channel}`)
        set.send(addEmb);
        
      } else

      if(tr1 !== null && tr2 == null){
      await db.set(`timedrole2_${message.guild.id}`, role)
      await db.set(`timedrole2time_${message.guild.id}`, time)
      let settr2 = new Discord.RichEmbed()
      .setColor("#3654ff")
      .setDescription(`${check} Added **${role}** as an autorole, that will be given in **${ms(time)}**.`)
      message.channel.send(settr2)
        
        var addEmb = new Discord.RichEmbed()
        .setTitle("Logs | Autorole added!")
        .setThumbnail(message.guild.iconURL)
        .setDescription(`**${role}** role has been added to the autorole list.`)
        .setColor("#3654ff")
        .setFooter(`ID: ${message.author.id}`)
        .setTimestamp()
        var set = message.guild.channels.find(`name`, `${channel}`)
        set.send(addEmb);
        
      } else {
        
        message.channel.send("This server's autorole storage (2/2) is **full**!\nDelete some roles to create new ones.")
        
      }
    } else
      
      if(args[0] === "delete") {
      if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("you can't delete autoroles, because you don't have the **Manage Server** permission!")
      let therole = args.slice(1).join(" ")
        
      if(therole == `${tr1}`) {
        await db.delete(`timedrole1_${message.guild.id}`)
        await db.delete(`timedrole1time_${message.guild.id}`)
        message.channel.send(`**${therole}** has been deleted from the autoroles list.`)
      } else
      
      if(therole == `${tr2}`) {
        await db.delete(`timedrole2_${message.guild.id}`)
        await db.delete(`timedrole2time_${message.guild.id}`)
        message.channel.send(`**${therole}** has been deleted from the autoroles list.`)
      } else {
        message.reply("I couldn't find that autorole!")
      }
        
    } else {
      
      if(tr1 !== null && tr2 !== null) {
      let timeroles = new Discord.RichEmbed()
      .setAuthor("Autoroles list", message.guild.iconURL)
      .setDescription(`**${tr1}** - ${ms(tr1t)}\n**${tr2}** - ${ms(tr2t)}`)
      .setColor("#9feb65")
      message.channel.send(timeroles)
      }
      if(tr1 !== null && tr2 == null) {
        let autoroles = new Discord.RichEmbed()
        .setAuthor("Autoroles list", message.guild.iconURL)
        .setDescription(`**${tr1}** - ${ms(tr1t)}`)
        .setColor("#9feb65")
        message.channel.send(autoroles)
      }
      
      if(tr1 == null && tr2 == null){
        let nulled = new Discord.RichEmbed()
        .setAuthor("Autoroles list", message.guild.iconURL)
        .setDescription("There are no autoroles set for this server.\nSet an autorole by using the `autorole` command.\nExample: `l.autorole add [time] [role_name]`")
        message.channel.send(nulled)
      }
    }
      
    }
}