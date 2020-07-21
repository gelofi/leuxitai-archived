const Discord = require('discord.js')

module.exports = {
    name: 'warnprofile',
    aliases: ["wprofile", "case", "warnc"],
    description: "fetches a warn info",
    run: async (bot, message, args) => {

      const db = bot.db;

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

    if(!args[0]) return message.reply("please specify a to view their warning profile!")
      
    let user = getUserFromMention(args[0]);
        
    let warn;

    let warns = await db.fetch(`warn_${message.guild.id}_${user.id}`);
    
    if(warns == undefined){
      warn = 0;
    } else {
      warn = warns;
    }
        
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.reply("you don't have **Manage Guild** permission to view warn profiles!");
      
        const mod = message.author.tag;
        const member = message.mentions.members.first()

        let newarno;
        let newarn = parseInt(db.fetch(`warn_${message.guild.id}_${user.id}`))
        if(isNaN(newarn)){
          newarno = "0";
        } else {
          newarno = newarn
        }
        var warnEmb = new Discord.RichEmbed()
        .setTitle("Warn Profile")
        .setThumbnail(user.displayAvatarURL)
        .setDescription(`Member: ${user.tag}\nWarns: ${newarno}`)
        .setColor("#3654ff")
        .setFooter(`ID: ${user.id}`)
        .setTimestamp()
        message.channel.send(warnEmb)
      
            }
}