const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const { stripIndents } = require('common-tags');
const slots = ['🍇', '🍊', '🍐', '🍒', '🍋', '🍌', '🔔'];
const db = require("quick.db");

module.exports = {
    name: 'slots',
    aliases: ["sl", "slot"],
    description: "Slots for Economy Module.",
    run: async (bot, message, args) => {
        
      let money = await db.fetch(`money_${message.guild.id}_${message.author.id}`)
      
      if(!args[0]) return message.reply("bet money on the slots!")
      if(money < parseInt(args[0])) return message.reply("you're betting more coins than you have!")
      if(isNaN(args[0])) return message.reply("that's not a number if coins!")
      if(message.content.includes("-")) return message.reply("you can't bet negative amount of coins!");
      
    const slotOne = Math.floor(Math.random() * slots.length);
		const slotTwo = Math.floor(Math.random() * slots.length);
		const slotThree = Math.floor(Math.random() * slots.length);
		message.channel.send(stripIndents`
			**[  🎰 | SLOTS ]**
			------------------
			${wrapSlots(slotOne, false)} : ${wrapSlots(slotTwo, false)} : ${wrapSlots(slotThree, false)}

			${slots[slotOne]} : ${slots[slotTwo]} : ${slots[slotThree]} **<**

			${wrapSlots(slotOne, true)} : ${wrapSlots(slotTwo, true)} : ${wrapSlots(slotThree, true)}
			------------------
	    | : : :  **${(slotOne === slotTwo && slotOne === slotThree) || (slotOne === slotTwo) ? 'WIN' : 'LOSE'}**  : : : |
		`);
	
      if(slotOne === slotTwo && slotOne === slotThree || slotOne === slotTwo){
        await db.add(`money_${message.guild.id}_${message.author.id}`,parseInt(args[0] * 2))
        message.channel.send(`**${message.author.username}** won **${parseInt(args[0] * 2)}** coins!`)
      } else {
        await db.subtract(`money_${message.guild.id}_${message.author.id}`, parseInt(args[0]))
        message.channel.send(`**${message.author.username}** lost! You also lost **${args[0]}** coins.`)
      }
  
  function wrapSlots(slot, add) {
		if (add) {
			if (slot + 1 > slots.length - 1) return slots[0];
			return slots[slot + 1];
		}
		if (slot - 1 < 0) return slots[slots.length - 1];
		return slots[slot - 1];
  }
      
      
    }
}