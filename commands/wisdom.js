const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});

module.exports = {
    name: 'wisdom',
    description: "Gives a wisdom from various people",
    run: async (bot, message, args) => {

        var answer = ['“Nobody can make you feel inferior without your permission.” —Eleanor Roosevelt',
                        '“You can never plan the future by the past.” —Edmund Burke',
                        '“He who has a why to live can bear almost any how.” —Friedrich Nietzsche',
                        '“He that respects himself is safe from others.” —Henry Wadsworth Longfellow',
                        '“If you want something you never had, you have to do something you’ve never done.”',
                        '“Change your thoughts and you change your world.” —Norman Vincent Peale',
                        '“Life is too important to be taken seriously.” —Oscar Wilde',
                        '"In the end, it\'s not the years in your life that count. It\'s the life in your years." —Abraham Lincoln',
                        '"Only a life lived for others is a life worthwhile." -Albert Einstein',
                        '“There are many ways of going forward, but only one way of standing still.” – Franklin D. Roosevelt',
                        '“An unexamined life is not worth living.” – Socrates',
                        '“Love all, trust a few, do wrong to none.”  ― William Shakespeare, All\'s Well That Ends Well',
                        '“The fool doth think he is wise, but the wise man knows himself to be a fool.” ― William Shakespeare, As You Like It',
                        '“There is nothing either good or bad, but thinking makes it so.” ― William Shakespeare, Hamlet',
                        '“When he shall die,\nTake him and cut him out in little stars,\nAnd he will make the face of heaven so fine\nThat all the world will be in love with night\nAnd pay no worship to the garish sun.” \n― William Shakespeare, Romeo and Juliet',
                        'Seemed Possible\nPoet: Adelaide A. Procter\nHave we not all, amid life\'s petty strife,\nSome pure ideal of a noble life\nThat once seemed possible? Did we not hear\nThe flutter of its wings and feel it near,\nAnd just within our reach? It was. And yet\nWe lost it in this daily jar and fret.\nBut still our place is kept and it will wait,\nReady for us to fill it, soon or late.\nNo star is ever lost we once have seen:\nWe always may be what we might have been.',
                        '“Self-love, my liege, is not so vile a sin, as self-neglecting.” – William Shakespeare',
                        '“It is not in the stars to hold our destiny but in ourselves.” – William Shakespeare',
                        '“Give every man thy ear, but few thy voice.” – William Shakespeare',
                        '“Some are born great, some achieve greatness, and some have greatness thrust upon them.” – William Shakespeare',
                        '“There is no darkness but ignorance.” – William Shakespeare',
                        '“God has given you one face, and you make yourself another.” – William Shakespeare',
                        '“We know what we are, but know not what we may be.” – William Shakespeare',
                        '“The empty vessel makes the loudest sound.” – William Shakespeare',
                        '“This above all: to thine own self be true.” – William Shakespeare',
                        '“One touch of nature makes the whole world kin.” – William Shakespeare',
                        '"Live life to the fullest, and focus on the positive." -Matt Cameron'];
                const wisdomEmbed = new Discord.RichEmbed()
                    .setAuthor("Random Wisdom!")
                    .setDescription(answer[Math.round(Math.random() * (answer.length - 1))] + '.')
                    .setColor(0x85c1e9);
                message.channel.send(wisdomEmbed);
    }
}