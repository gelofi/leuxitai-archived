const Discord = require('discord.js');
const math = require("mathjs");

module.exports = {
    name: 'math',
    aliases: ["calculate", "calc"],
    description: "calculates the input",
    run: async (bot, message, args) => {
      
      let input = args.join(" ");
      if(!input) return message.reply("provide an input to calculate!")
      
      let resp;
      
      try {
        resp = math.eval(input)
      } catch (err) {
        return message.channel.send("Hmm... that's a weird input, I cannot calculate that.")
      }
      
      const output = new Discord.RichEmbed()
      .setAuthor("Calculator")
      .setColor("#3654ff")
      .addField("**Input:**", `\`\`\`${input}\`\`\``)
      .addField("**Output:**", `\`\`\`${resp}\`\`\``)
      
      message.channel.send(output)
    }
}