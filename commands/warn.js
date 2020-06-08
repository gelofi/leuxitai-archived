const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db");
const fs = require("fs");
const ms = require("ms");

module.exports = {
    name: 'warn',
    aliases: ["w", "punish", "rewarn"],
    description: "warns a user",
    run: async (bot, message, args) => {
      
    let channel;
  
    let channels = await db.fetch(`wchannel_${message.guild.id}`)
    
    if(channels == null){
      channel = message.channel.name;
    } else {
      channel = channels;
    }
      
      let muteRole;
  
         let muteRoles = await db.fetch(`muteRole_${message.guild.id}`)
    
         if(muteRoles == null) return message.reply("setup a mute role first!\nMake sure the role you will assign have right permissions.\nThe default role for mute command is `Mute`.");
         if(muteRoles == null){
            muteRole = "Muted";
         } else {
            muteRole = muteRoles;
         }
      
         let mainRole;
  
         let mainRoles = await db.fetch(`mainRole_${message.guild.id}`)
    
         if(mainRoles == null) return message.reply("setup a main role first!\nMake sure the role you will assign have right permissions.\nThe default main role is `Member`.")
         if(mainRoles == null){
            mainRole = "Member";
         } else {
            mainRole = mainRoles;
         }
       
      function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return bot.users.get(mention);
	}
}

    let w1 = await db.fetch(`warn1_${message.guild.id}`)
    if(w1 == null) return message.reply("set up a warn role for W1 first!")
      
    let w2 = await db.fetch(`warn2_${message.guild.id}`)
    if(w2 == null) return message.reply("set up a warn role for W2 first!")
      
    let w3 = await db.fetch(`warn3_${message.guild.id}`)
    if(w3 == null) return message.reply("set up a warn role for W3 first!")
      
    let w4 = await db.fetch(`warn4_${message.guild.id}`)
    if(w4 == null) return message.reply("set up a warn role for W4 first!")
      
    let w5 = await db.fetch(`warn5_${message.guild.id}`)
    if(w5 == null) return message.reply("set up a warn role for W5 first!")

    if(!args[0]) return message.reply("please specify a member/user to warn! (Do not ping them!)")
      
    let user = getUserFromMention(args[0])// || bot.users.find("username", args[0]);
        
    let warn;

    let warns = await db.fetch(`warn_${message.guild.id}_${user.id}`);
    
    if(warns == null){
      warn = 0;
    } else {
      warn = warns;
    }
        
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.reply("you don't have enough permissions to warn members!");
        if(!user) return message.reply("please specify a member/user to warn!");
        let reason = args.slice(2).join(" ");
          if (!reason) reason = "No reason provided.";

        //let user = message.mentions.users.first();
        const mod = message.author.tag;
        const member = message.mentions.members.first()
        if(!args[1]) return message.reply("specify a warn level!")
        if(isNaN(args[1])) return message.reply("that's not a warn level!")
        if(args[1] >= 6) return message.channel.send("No warnings above Level 6! Level 5 will get the warned person banned.")
        if(isNaN(args[1]) == true) return message.reply("that's not a number!")
        
        await db.set(`warn_${message.guild.id}_${user.id}`, args[1])
        
        let newarn = parseInt(db.fetch(`warn_${message.guild.id}_${user.id}`))
        message.channel.send(`<@${user.id}>'s warning profile has been updated!\nWarns: \`${newarn}\``)
        
        var warnEmb = new Discord.RichEmbed()
        .setTitle("Logs | Member warn profile updated!")
        .setThumbnail(user.displayAvatarURL)
        .setDescription(`Member: ${user.tag}\nReason: ${reason}\nModerator: ${message.member}\nWarns: ${newarn}`)
        .setColor("#3654ff")
        .setFooter(`ID: ${user.id}`)
        .setTimestamp()
        var set = message.guild.channels.find(`name`, `${channel}`)
        set.send(warnEmb);
      
      let mainrole = message.guild.roles.find(role => role.name === `${mainRole}`)
      let muterole = message.guild.roles.find(role => role.name === `${muteRole}`)
      
      let warn1 = message.guild.roles.find(role => role.name === `${w1}`)
      let warn2 = message.guild.roles.find(role => role.name === `${w2}`)
      let warn3 = message.guild.roles.find(role => role.name === `${w3}`)
      let warn4 = message.guild.roles.find(role => role.name === `${w4}`)
      let warn5 = message.guild.roles.find(role => role.name === `${w5}`)
      
      if(newarn >= 1){
        member.addRole(warn1)
      }
      
      if(newarn >= 2){
         member.addRole(warn2)
         member.removeRole(mainrole)
         member.addRole(muterole)
         message.channel.send(":warning: +**2m** mute.")
        setTimeout(function(){
           member.addRole(mainrole)
           member.removeRole(muterole)
           var set = message.guild.channels.find(`name`, `${channel}`)
           let embed = new Discord.RichEmbed()
           .setTitle("Logs | Unmuted!")
           .setColor("#1a40a1")
           .setDescription(`${member.user.tag} has been unmuted (2 minutes)`)
           set.send(embed)
         }, ms('2m'));
      }
      
      if(newarn >= 3){
        member.addRole(warn3)
         member.removeRole(mainrole)
         member.addRole(muterole)
         message.channel.send(":warning:  +**5m** mute.")
        setTimeout(function(){
           member.addRole(mainrole)
           member.removeRole(muterole)
          
           var set = message.guild.channels.find(`name`, `${channel}`)
           let embed = new Discord.RichEmbed()
           .setTitle("Logs | Unmuted!")
           .setColor("#1a40a1")
           .setDescription(`${member.user.tag} has been unmuted (5 minutes)`)
           set.send(embed)
         }, ms('5m'));
      }
      if(newarn >= 4){
        member.addRole(warn4)
         member.removeRole(mainrole)
         member.addRole(muterole)
         message.channel.send(":warning:  +**5m** mute.")
        setTimeout(function(){
           member.addRole(mainrole)
           member.removeRole(muterole)
          
           var set = message.guild.channels.find(`name`, `${channel}`)
           let embed = new Discord.RichEmbed()
           .setTitle("Logs | Unmuted!")
           .setColor("#1a40a1")
           .setDescription(`${member.user.tag} has been unmuted (5 minutes)`)
           set.send(embed)
         }, ms('5m'));
      }
      
      if(newarn === 5){
        member.addrole(warn5)
         member.removeRole(mainrole)
         member.addRole(muterole)
         message.guild.member(user).ban(reason)
         message.channel.send("**Banned**! That user has reached level 5 warnings.")
      }
            }
}