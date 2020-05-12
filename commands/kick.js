const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});

module.exports = {
    name: 'kick',
    description: "Kicks a user.",
    run: async (bot, message, args) => {
        if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("You don't have enough permissions to do this command!");
        if(!message.guild.me.hasPermission("KICK_MEMBERS")) {
        return message.reply(`I do not have enough permissions to use this command!`)
          }
            const user = message.mentions.users.first();
          let reason = args.slice(1).join(" ");
          if (!reason) reason = "No reason provided.";
            if(user){
                const member = message.guild.member(user);
                const memberID = user.tag
                if(member.id === message.author.id) {
                return message.reply(`You can't kick yourself, and self-harm is bad!`)
                }
                if(member){
                    member.kick(reason).then(() => {
                        const embed = new Discord.RichEmbed()
                        .setAuthor(`Member kicked: ${memberID}`, member.user.displayAvatarURL)
                        .setColor("RANDOM")
                        .setThumbnail()
                        .setDescription(
                         `Reason: ${reason}\nModerator: ${message.member}`)
                        .setTimestamp();
                         message.channel.send(embed);
                    }).catch(err => {
                        message.reply('I cannot kick this member!');
                        console.log(err);
                    });
                } else{
                    message.reply("I cannot find this member, or that user isn't in the server!");
                }
            } else {
                    message.reply('Please specify a member / person to be kicked! ');
                }
            }
}