const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});

module.exports = {
    name: 'ban',
    description: "Bans a user.",
    run: async (message, args) => {
        if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("You don't have enough permissions to do this command!")

            const user1 = message.mentions.users.first();

            if(user1){
                const member1 = message.guild.member(user1);

                if(member1){
                    member1.ban('Unfortunately, you have been banned!').then(() => {
                        message.reply(`${user1.tag} has been banned. :hammer:`);
                    }).catch(err => {
                        message.reply('I cannot ban this member!')
                        console.log(err);
                    });
                } else{
                        message.reply("I cannot find this member, or that user isn't in the server!")
                }
            } else {
                        message.reply('Please specify a member / person to be banned! ');
                }
    }
}