const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});

module.exports = {
    name: 'coinflip',
    description: "Coinflip command, heads or tails!",
    run: async (message, args) => {
        //function for l.coinflip
   function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
    var msg2 = Array(2);
    msg2[1] = "It's heads!";
      msg2[2] = "It's tails!";
        var x = getRandomInt(0, 8);
    if (x < 4){
      message.channel.send(msg2[1]);
    }
    else{
      message.channel.send(msg2[2]);
    }
    }
}