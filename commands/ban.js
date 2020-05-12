const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});

module.exports = {
    name: 'ban',
    aliases: ["wee"],
    description: "Bans a user.",
    run: async (bot, message, args) => {
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
                        .setAuthor(`Member banned: ${memberID}`, member.user.displayAvatarURL)
                        .setColor("RANDOM")
                        .setThumbnail()
                        .setDescription(
                         `Reason: ${reason}\nModerator: ${message.member}`)
                        .setTimestamp();
                         message.channel.send(embed);
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