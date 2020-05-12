const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const { NovelCovid } = require("novelcovid");
const track = new NovelCovid();

module.exports = {
    name: 'corona',
    description: "Gives corona information",
    run: async (bot, message, args) => {
      if(!args[0]) {
      return message.channel.send("Please give the name of country, or worldwide.")
      }
    
    if(args[0] === "worldwide") {
      let corona = await track.all() //it will give global cases
      
      let corembed = new Discord.RichEmbed()
      .setTitle("Global Cases")
      .setColor("#f55538")
      .setDescription("Sometimes cases number may differ from small amount.")
      .addField("Total Cases", corona.cases, true)
      .addField("Total Deaths", corona.deaths, true)
      .addField("Total Recovered", corona.recovered, true)
      .addField("Cases Today", corona.todayCases, true)
      .addField("Deaths Today", corona.todayDeaths, true)
      .addField("Active Cases", corona.active, true)
      .setFooter("Wash your hands!")
      .setTimestamp();
      
      return message.channel.send(corembed)
  
    } else {
      let corona = await track.countries(args[0]) //change it to countries
      if(!corona.country) return message.channel.send("Invalid location! Please put a REAL country.")
      let coronaembed = new Discord.RichEmbed()
      .setTitle(`${corona.country}`)
      .setColor("#f55538")
      .setDescription("Sometimes cases number may differ from small amount.")
      .addField("Total Cases", corona.cases, true)
      .addField("Total Deaths", corona.deaths, true)
      .addField("Total Recovered", corona.recovered, true)
      .addField("Cases Today", corona.todayCases, true)
      .addField("Deaths Today", corona.todayDeaths, true)
      .addField("Active Cases", corona.active, true)
      .setFooter("Wash your hands!")
      .setTimestamp();
      
      return message.channel.send(coronaembed)
    }
    }
}