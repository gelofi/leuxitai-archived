const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});

module.exports = {
    name: 'hug',
    description: "Hugs a person",
    run: async (bot, message, args) => {
        var hugger = message.mentions.users.first();

        var hug = ['wavv u!!! ~//~ :heart: :heart:',
                'owo >_<',
                'huggers :heart:'];
        
        var hugfact = ['Cuddling boosts immune system, as your brain releases oxytocin.',
                'Cuddling reduces social anxiety. Oxytocin inspires positive thinking.',
                'Hugs are good for emotional health. They reduce temper, too.',
                'Hugs alleviate our fears and more hugs lead to lower blood pressure.',
                'Hugging leads to lower reactivity to stressful events and may benefit cardiovascular health.',
                'The studies found that hugging helps soothe individuals’ existential fears.'];

        var hugimage = ['https://i.imgur.com/wOmoeF8.gif',
                'https://i.makeagif.com/media/10-24-2015/KyjvJK.gif',
                'https://media1.tenor.com/images/dbd5f352c80e3445b801d548ca330a6a/tenor.gif?itemid=14214458',
                'https://media.tenor.com/images/3a9d2bd1bde9ed8ea02b2222988be6da/tenor.gif',
                'https://i.pinimg.com/originals/f3/05/85/f3058569bd60525e7d7532beb993dba3.gif',
                'https://gifimage.net/wp-content/uploads/2018/06/steven-universe-hug-gif-10.gif',
                'https://media1.tenor.com/images/936e1a7b2634428e3cb5bba92f705274/tenor.gif?itemid=5203742',
                'https://media1.tenor.com/images/b7492c8996b25e613a2ab58a5d801924/tenor.gif?itemid=14227401',
                'https://media1.tenor.com/images/f20151a1f7e003426ca7f406b6f76c82/tenor.gif?itemid=13985247'];

      if (!hugger) {
              return message.channel.send("You can't hug the air! Hug someone! **Usage: `l.hug` <user>**");
          }
          
        const hugEmbed = new Discord.RichEmbed()
        .setTitle(`:heart: ${message.author.username} hugged ${hugger.username}! :heart:`)
        .setDescription(hug[Math.round(Math.random() * (hug.length - 1))])
        .setImage(hugimage[Math.round(Math.random() * (hugimage.length - 1))])
        .setColor(0x82e0aa)
        .setFooter('Did you know? ' + hugfact[Math.round(Math.random() * (hugfact.length - 1))])
        message.channel.send(hugEmbed); 
    }
}