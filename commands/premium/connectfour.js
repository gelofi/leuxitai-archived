const { stripIndents } = require('common-tags');
const { verify } = require('../../util/Util');
const blankEmoji = '⚪️';
const playerOneEmoji = '🔴';
const playerTwoEmoji = '🟡';
const nums = ["1️⃣", '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣'];
const db = require("quick.db")
const { RichEmbed } = require("discord.js");

module.exports = {
    name: 'connectfour',
    aliases: ["confour", "con4", "c4"],
    description: "Connect four game on Discord.",
    run: async (bot, message, args) => {
      
      /*let plus = await db.fetch(`plus_${message.guild.id}`)
      let lp = "<:leuxitailight:720799037145612349>"
      
      let noplus = new RichEmbed()
      .setColor("#3654ff")
      .setAuthor(message.guild.name, message.guild.iconURL)
      .setDescription(stripIndents`
This server isn't subscribed to ${lp}  **Leuxitai Plus**!
Enjoy more features by having a Leuxitai+ subscription.
Do \`l.plus\` to discover Leuxitai+ features.
`)
      .setFooter("Leuxitai+ is one-time payment only. Get more features with a subscription!")
      
      if(plus !== "subscriber")
        return message.channel.send(noplus)*/
      
      let msg = message
      let opponent = message.mentions.users.first()
      if(!opponent) return msg.reply("invite an opponent first!")
      if (opponent.bot) return msg.reply('you cannot play with bots!.');
      
		if (opponent.id === msg.author.id) return msg.reply("you can't play alone, silly.");
		const current = bot.playing.has(msg.channel.id);
		if (current) return msg.reply(`please wait until the current game in this channel is finished!`);
		bot.playing.add(msg.channel.id);
		try {
			let play = await msg.channel.send(`${opponent}, do you accept ${msg.author}'s challenge?`);
			const verification = await verify(msg.channel, opponent);
			if (!verification) {
				bot.playing.delete(msg.channel.id);
				return msg.channel.send('It seems that they declined.');
			}
			const board = generateBoard();
			let userTurn = true;
			let winner = null;
			const colLevels = [5, 5, 5, 5, 5, 5, 5];
			let lastTurnTimeout = false;
			while (!winner && board.some(row => row.includes(null))) {
				const user = userTurn ? msg.author : opponent;
				const sign = userTurn ? 'user' : 'oppo';
        
				let game = new RichEmbed()
        .setAuthor(`Connect Four - ${msg.author.username} VS ${opponent.username}`, user.displayAvatarURL)
        .setDescription(stripIndents`
					${user}'s turn
          Pick a column! Type \`end\` to quit the game.

					${displayBoard(board)}
					${nums.join('')}
				`)
        .setFooter("Each turn's waiting time lasts 60 seconds.")
        if(user == msg.author){
          game.setColor("#ff3636")
        } else {
          game.setColor("#f5e642")
        }
        await play.edit("", game)
				const filter = res => {
					if (res.author.id !== user.id) return false;
					const choice = res.content;
					if (choice.toLowerCase() === 'end') return true;
					const i = parseInt(choice, 10) - 1;
					return board[colLevels[i]] && board[colLevels[i]][i] !== undefined;
				};
				const turn = await msg.channel.awaitMessages(filter, {
					maxMatches: 1,
					time: 60000
				});
        if(bot.playing.has(msg.channel.id)){
          msg.channel.bulkDelete(1)
        }
				if (!turn.size) {
					await msg.channel.send('Sorry, time is up!');
					if (lastTurnTimeout) {
						winner = 'time';
						break;
					} else {
						lastTurnTimeout = true;
						userTurn = !userTurn;
						continue;
					}
				}
				const choice = turn.first().content;
				if (choice.toLowerCase() === 'end') {
					winner = userTurn ? opponent : msg.author;
					break;
				}
				const i = Number.parseInt(choice, 10) - 1;
				board[colLevels[i]][i] = sign;
				colLevels[i]--;
				if (verifyWin(board)) winner = userTurn ? msg.author : opponent;
				if (lastTurnTimeout) lastTurnTimeout = false;
				userTurn = !userTurn;
			}
			bot.playing.delete(msg.channel.id);
      
      const user = userTurn ? msg.author : opponent;
			const sign = userTurn ? 'user' : 'oppo';

      let game = new RichEmbed()
        .setAuthor(`Connect Four - ${msg.author.username} VS ${opponent.username}`, user.displayAvatarURL)
        .setDescription(stripIndents`
					${user}'s turn
          Pick a column! Type \`end\` to quit the game.

					${displayBoard(board)}
					${nums.join('')}
				`)
        .setFooter("Each turn's waiting time lasts 60 seconds.")

			if (winner === 'time') return msg.say('Game ended! Players are inactive.');
      play.edit("", game)
			return msg.channel.send(winner ? `GG, ${winner}! You won the game!` : 'Hey, it\'s a draw!');
		} catch (err) {
		  bot.playing.delete(msg.channel.id);
			throw err;
		}
  
	function checkLine(a, b, c, d) {
		return (a !== null) && (a === b) && (a === c) && (a === d);
	}

	function verifyWin(bd) {
		for (let r = 0; r < 3; r++) {
			for (let c = 0; c < 7; c++) {
				if (checkLine(bd[r][c], bd[r + 1][c], bd[r + 2][c], bd[r + 3][c])) return bd[r][c];
			}
		}
		for (let r = 0; r < 6; r++) {
			for (let c = 0; c < 4; c++) {
				if (checkLine(bd[r][c], bd[r][c + 1], bd[r][c + 2], bd[r][c + 3])) return bd[r][c];
			}
		}
		for (let r = 0; r < 3; r++) {
			for (let c = 0; c < 4; c++) {
				if (checkLine(bd[r][c], bd[r + 1][c + 1], bd[r + 2][c + 2], bd[r + 3][c + 3])) return bd[r][c];
			}
		}
		for (let r = 3; r < 6; r++) {
			for (let c = 0; c < 4; c++) {
				if (checkLine(bd[r][c], bd[r - 1][c + 1], bd[r - 2][c + 2], bd[r - 3][c + 3])) return bd[r][c];
			}
		}
		return null;
	}

	function generateBoard() {
		const arr = [];
		for (let i = 0; i < 6; i++) {
			arr.push([null, null, null, null, null, null, null]);
		}
		return arr;
	}

	function displayBoard(board) {
		return board.map(row => row.map(piece => {
			if (piece === 'user') return playerOneEmoji;
			if (piece === 'oppo') return playerTwoEmoji;
			return blankEmoji;
		}).join('')).join('\n');
	}
      
    }
}