const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const translate = require ("@vitalets/google-translate-api");

module.exports = {
    name: 'translate',
    aliases: ["tl"],
    description: "translate the text",
    usage: "<language> <text>",
    run: async (bot, message, args) => {
        var phrase = args.slice(1).join(" ");
        var langue = args[0];
        
        var fix = {
          undefined: langue
        }
      
        if(!phrase) return message.reply("put a text to translate!")
        if(!langue) return message.reply("define a language I should translate the text to!")
        const autoC = {
          true: "✓ Auto-corrected!",
          false: "× Not auto-corrected!"
        }
      translate(phrase, {from: 'auto', to: langue}).then(res => {
         var tb = 'https://cdn.clipart.email/b362c028ba2007d4563c521999b73c72_download-best-free-google-logo-icon-vector-drawing-google-_2000-2000.png';
         //if(!translate.languages) return message.reply("sorry but that language isn't supported!")
         var translation = new Discord.RichEmbed()
         .setTitle(`Translated from\n${translate.languages[res.from.language.iso]} to ${translate.languages[langue]} (${langue})`)
         .setDescription(`**Auto-correction:**\n${autoC[res.from.text.autoCorrected]}`)
         .setThumbnail(tb)
         .addField(`Text:`, `${phrase}`, true)
         .addField(`Translation:`, `${res.text}`, true)
         .setFooter("Google Translate API is used.")
         .setTimestamp()
         .setColor("#4c8bf5")
        message.channel.send(translation)
         }).catch(err => {
         message.channel.send(err)
         console.error(err);
         });
    }
}