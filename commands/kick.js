const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});

module.exports = {
    name: 'kick',
    description: "Kicks a user.",
    run: async (message, args) => {
        if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("You don't have enough permissions to do this command!");

            const user = message.mentions.users.first();

            if(user){
                const member = message.guild.member(user);

                if(member){
                    member.kick('Unfortunately, you have been kicked!').then(() => {
                        message.reply(`${user.tag} has been kicked. :white_check_mark:`);
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