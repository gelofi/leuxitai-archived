const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db");

module.exports = {
    name: 'ban',
    aliases: ["wee"],
    description: "Bans a user.",
    run: async (bot, message, args) => {
        let channel;
  
    let channels = await db.fetch(`channel_${message.guild.id}`)
    
    if(channels == null){
      channel = message.channel.name;
    } else {
      channel = channels;
    }
      
        if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("You don't have enough permissions to do this command!")
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
        return message.reply(`I do not have enough permissions to use this command!`)
          }
            const user = message.mentions.users.first();
          let reason = args.slice(1).join(" ");
          if (!reason) reason = "No reason provided.";
            if(user){
                const member = message.guild.member(user);
                const memberID = user.tag
                if(member.id === message.author.id) {
                return message.reply(`You can't ban yourself, self-harm is bad!`)
                }
                if(member){
                    member.ban(reason).then(() => {
                        const embed = new Discord.RichEmbed()
                        .setAuthor(`Logs | Member banned: ${memberID}`, message.guild.iconURL)
                        .setColor("RANDOM")
                        .setThumbnail(member.user.displayAvatarURL)
                        .setDescription(
                         `Reason: ${reason}\nModerator: ${message.member}`)
                        .setFooter(`ID: ${user.id}`)
                        .setTimestamp();
                         var set = message.guild.channels.find(`name`, `${channel}`)
                         set.send(embed)
                         message.channel.send(`${memberID} has been banned! 👻`);
                    }).catch(err => {
                        message.reply('I cannot ban this member!');
                        console.log(err);
                    });
                } else{
                    message.reply("I cannot find this member, or that user isn't in the server!");
                }
            } else {
                    message.reply('Please specify a member / person to be banned! ');
                }
            }
}