const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports = {
    name: 'warn',
    aliases: ["w", "punish", "rewarn"],
    description: "warns a user",
    run: async (bot, message, args) => {
      
    let channel;
  
    let channels = await db.fetch(`channel_${message.guild.id}`)
    
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
        
    if(!args[0]) return message.reply("please specify a member/user to warn! (Do not ping them!)")
      
    let user = bot.users.find("username", args[0]) || bot.users.find("id", `${args[0]}`);
        
    let warn;

    let warns = await db.fetch(`warn_${message.guild.id}_${user.id}`)
    
    if(warns == null){
      warn = 0;
    } else {
      warn = warns;
    }
        
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.reply("you don't have enough permissions to change my prefix!");
        if(!user) return message.reply("please specify a member/user to warn!");
        let reason = args.slice(2).join(" ");
          if (!reason) reason = "No reason provided.";

        //let user = message.mentions.users.first();
        const mod = message.author.tag;
        const member = user
        if(!args[1]) return message.reply("specify a warn level!")
        if(args[1] >= 6) return message.channel.send("No warnings above Level 6! Level 5 will get the warned person banned.")
        if(isNaN(args[1]) == true) return message.reply("that's not a number!")
        
        await db.set(`warn_${message.guild.id}_${user.id}`, args[1])
        
        let newarn = db.fetch(`warn_${message.guild.id}_${user.id}`)
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
      let newarno = args[1]
      
      if(newarno == "2"){
         member.removeRole(mainrole.id)
         member.addRole(muterole.id)
        
        setTimeout(function(){
           member.addRole(mainrole.id)
           member.removeRole(muterole.id)
           var set = message.guild.channels.find(`name`, `${channel}`)
           let embed = new Discord.RichEmbed()
           .setTitle("Logs | Unmuted!")
           .setColor("#1a40a1")
           .setDescription(`${member.user.tag} has been unmuted (2 minutes)`)
           set.send(embed)
         }, ms('2m'));
      }
      
      if(newarno == "3"){
         member.removeRole(mainrole.id)
         member.addRole(muterole.id)
        
        setTimeout(function(){
           member.addRole(mainrole.id)
           member.removeRole(muterole.id)
          
           var set = message.guild.channels.find(`name`, `${channel}`)
           let embed = new Discord.RichEmbed()
           .setTitle("Logs | Unmuted!")
           .setColor("#1a40a1")
           .setDescription(`${member.user.tag} has been unmuted (5 minutes)`)
           set.send(embed)
         }, ms('5m'));
      }
      if(newarno == "4"){
         member.removeRole(mainrole.id)
         member.addRole(muterole.id)
        
        setTimeout(function(){
           member.addRole(mainrole.id)
           member.removeRole(muterole.id)
          
           var set = message.guild.channels.find(`name`, `${channel}`)
           let embed = new Discord.RichEmbed()
           .setTitle("Logs | Unmuted!")
           .setColor("#1a40a1")
           .setDescription(`${member.user.tag} has been unmuted (5 minutes)`)
           set.send(embed)
         }, ms('5m'));
      }
      
      if(newarno == "5"){
         member.removeRole(mainrole.id)
         member.addRole(muterole.id)
         message.guild.member(user).ban(reason)
      }
            }
}