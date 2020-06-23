const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});

module.exports = {
    name: 'avatar',
    aliases: ["av"],
    description: "Sends the desired avatar.",
    run: async (bot, message, args) => {
        if(args[0]=== "me"){
        let avatar = new Discord.RichEmbed()
        .setTitle('Your avatar and URL:')
        .setDescription(message.author.avatarURL)
        .setImage(message.author.avatarURL)
        .setFooter("HD Avatars!")
        .setTimestamp()
        .setColor(0x18adba);
        message.channel.sendEmbed(avatar);
        } else
        if(args[0] === `${message.mentions.users.first()}`) {
        const membere = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
        let target = message.mentions.users.first() || message.author

            let avatarembed = new Discord.RichEmbed()
                .setAuthor(membere.user.username + "'s avatar and URL:")
                .setDescription(target.avatarURL)
                .setImage(target.displayAvatarURL)
                .setColor(0xe34f44)
                .setFooter("HD Avatars!")
                .setTimestamp()
    
            message.channel.send(avatarembed);
        } else
        message.channel.send("Put a valid argument! Pick either `me` or ping a user.")
    }
}