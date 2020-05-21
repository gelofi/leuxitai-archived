const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports = {
    name: 'warn',
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
        
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send("You don't have enough permissions to do this command!");
        if(!message.guild.me.hasPermission("MANAGE_GUILD")) return message.reply(`I do not have enough permissions to use this command!`)
        const user = message.mentions.users.first();
          
          if(!user) return message.reply("specify a user to be warned!")
          let reason = args.slice(1).join(" ");
          if (!reason) reason = "No reason provided.";
          const member = message.guild.member(user);
          if(member.id === message.author.id) {
                return message.reply(`You can't warn yourself, and self-harm is bad!`)
                }
          if(!args[0]) return message.reply('please specify a member / person to be warned!');
      
          if(!warns[user.id]) warns[user.id] = {
            warns: 0
          };
         var warnLevel = warns[user.id].warns;
         let mainrole = message.guild.roles.find(role => role.name === `${mainRole}`)
         let muterole = message.guild.roles.find(role => role.name === `${muteRole}`)

          warns[user.id].warns++;
      
          fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
            if (err) console.log(err);
          });
      
          message.channel.send(`${user} has been warned.\ | Warns: ${warns[user.id].warns}`);
          const embed = new Discord.RichEmbed()
                  .setAuthor(`Logs | Member warned: ${user.tag}`, message.guild.iconURL)
                  .setColor("RANDOM")
                  .setThumbnail(member.user.displayAvatarURL)
                  .setDescription(
                   `Reason: ${reason}\nModerator: ${message.member}\nWarns: ${warnLevel}`)
                  .setFooter(`ID: ${user.id}`)
                  .setTimestamp();
          var set = message.guild.channels.find(`name`, `${channel}`)
          set.send(embed);
      
      if(warns[user.id].warns == 2){
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
      
      if(warns[user.id].warns == 3){
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
      if(warns[user.id].warns == 4){
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
      
      if(warns[user.id].warns == 5){
         member.removeRole(mainrole.id)
         member.addRole(muterole.id)
         message.guild.member(user).ban(reason)
      }
            }
}