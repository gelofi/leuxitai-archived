const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});

module.exports = {
    name: 'ball',
    description: "Initiates 8ball.",
    run: async (message, args) => {
        let question = message.content.split(/\s+/g).slice(1).join(" ");

        if (!question) {
            return message.channel.send('You must provide a question! **Usage: `l.8ball`<question>**');
        }

    var answer = ['It is certain',
                                    'It is decidedly so.',
                                    'Without a doubt.',
                                    'Yes, definitely.',
                                    'You may rely on it.',
                                    'As I see it, yes.',
                                    'Most likely.',
                                    'Outlook good.',
                                    'Perhaps.',
                                    'Yes!',
                                    'If you say so.',
                                    'Signs point to yes.',
                                    'Reply hazy try again.',
                                    'Ask again later.',
                                    'Better not tell you now.',
                                    'Cannot predict now.',
                                    'Concentrate and ask again.',
                                    'Don\'t count on it.',
                                    'My reply is no!',
                                    'My sources say no...',
                                    'I don\'t know... ask others.',
                                    'Outlook not so good.',
                                    'Very doubtful.'];
            const ballEmbed = new Discord.RichEmbed()
                .setAuthor(question)
                .setDescription(answer[Math.round(Math.random() * (answer.length - 1))] + '.')
                .setColor(0x154360);
            message.react("🎱");
            message.channel.send(ballEmbed);
    }
}