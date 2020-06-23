const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const moment = require("moment")

module.exports = {
    name: 'info',
    aliases: ["information"],
    description: "Gives info for the server or you",
    run: async (bot, message, args) => {
      
const verificationLevels = {
	NONE: 'None',
	LOW: 'Low',
	MEDIUM: 'Medium',
	HIGH: 'High\n(╯°□°）╯︵ ┻━┻',
	VERY_HIGH: 'Very High\n┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};

      
        if(args[0] === 'server'){
        const serverembed = new Discord.RichEmbed()
        .setTitle('Info for ' + message.guild.name)
        .setThumbnail(message.guild.iconURL)
        .addField('Server ID', message.guild.id)
        .addField('Owner', message.guild.owner, true)
        .addField('Boosts', message.guild.premiumSubscriptionCount || 0, true)
        .addField('Booster Tier', message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None', true)
        //.addField('Verification Level', verificationLevels[message.guild.verificationLevel], true)
        .addField('Members', message.guild.members.filter(member => !member.user.bot).size, true)
        .addField("Bots", message.guild.members.filter(m => m.user.bot).size, true)
        .addField("Roles", message.guild.roles.size, true)
        .addField('Channels', message.guild.channels.filter(channel => channel.type !== 'category' && channel.type !== 'voice').size, true)
        .addField("Catergories", message.guild.channels.filter(channel => channel.type == 'category').size, true)
        .addField('Voice Channels', message.guild.channels.filter(c => c.type === 'voice').size, true)
        .addField('Created on', moment.utc(message.guild.createdAt).format('MM/DD/YYYY h:mm A'), true)
        .setTimestamp()
        .setColor(0x3654ff);
        message.channel.send(serverembed);
    }else
    if(message.mentions.users.first()) {
      let inline = true
      const userstatus = {
        online: "Online",
        idle: "Idle",
        dnd: "Do Not Disturb",
        offline: "Offline/Invisible"
      }
        const membere = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
        let target = message.mentions.users.first() || message.author

        let userembed = new Discord.RichEmbed()
          .setAuthor(membere.user.username + "'s information")
          .setThumbnail(target.displayAvatarURL)
          .setColor(0x3654ff)
          .addField('Tag', membere.user.tag)
          .addField("ID", membere.user.id)
          .addField("Nickname", `${membere.nickname !== null ? `Nickname: ${membere.nickname}` : "None"}`, true)
          .addField("Roles", `${membere.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "No Roles"}`, true)
          .addField("Status", `${userstatus[membere.user.presence.status]}`, inline, true)
          .addField("Activity", `${membere.user.presence.game ? `🎮 ${membere.user.presence.game.name}` : "No activities"}`, true)
          .addField('Avatar URL', membere.user.avatarURL)
          .addField("Created Account", membere.user.createdAt)
          .setTimestamp()
    
            message.channel.send(userembed);
    }else
    if(args[0] === 'me'){
      let inlineme = true
      const status = {
        online: "Online",
        idle: "Idle",
        dnd: "Do Not Disturb",
        offline: "Offline/Invisible"
      }
        const meembed = new Discord.RichEmbed()
          .setTitle(message.author.username + "'s infomation")
          .setThumbnail(message.author.avatarURL)
          .addField('Tag', message.author.tag)
          .addField('ID', message.author.id)
          .addField('Nickname:', `${message.member.nickname !== null ? `${message.member.nickname}` : 'None'}`, true)
          .addField("Roles", `${message.member.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "No Roles"}`, true)
          .addField("Status", `${status[message.author.presence.status]}`, inlineme, true)
          .addField("Activity", `${message.author.presence.game ? `🎮 ${message.author.presence.game.name}` : "No activities"}`, true)
          .addField('Avatar URL:', message.author.avatarURL)
          .addField("Color", message.member.displayHexColor)
          .addField('Created Account', message.author.createdAt, true)
          .addField("You joined here on", message.member.joinedAt)
          .setTimestamp()
          .setColor(message.member.displayHexColor);
          message.channel.send(meembed);
      }else{
          message.channel.send('Please put a valid argument! (`server`, `me`, or ping a user!)');
      }
    }
}