const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const weather = require('weather-js');
module.exports = {
    name: 'weather',
    description: "Gives weather info on a location",
    run: async (message, args) => {
        const skies = {
        Clear: ":sun_with_face: Clear Skies",
        'Mostly Sunny': ":white_sun_small_cloud: Mostly Sunny",
        'Mostly Cloudy': ":cloud: Mostly Cloud",
        'Light Rain': ":white_sun_rain_cloud: Light Rain",
        'Blowing Dust': ":dash: Blowing Dust",
        Sunny: ":sunny: Sunny",
        Haze: ":fog: Haze",
        'Partly Sunny': ":partly_sunny: Partly Sunny",
        'Fair': ":thumbsup: Fair",
        Cloudy: ":white_sun_cloud: Cloudy",
        'Rain Showers': ":cloud_rain: Rain Showers"
      }
      weather.find({search: args.join(" "), degreeType: "C"}, function(err, result) {
        if(err) message.channel.send(err)

        if(result.length === 0) {
            message.channel.send(`**${message.author.tag}, please enter a valid location.**`)
            return;
        }

        var current = result[0].current
        var location = result[0].location

        let weatherembed = new Discord.RichEmbed()
           .setTitle(`Weather for ${current.observationpoint}`)
           .setColor(0x8cd7ff)
           .addField("Sky", `${skies[current.skytext]}`)
           .addField(":thermometer: Temperature:", `${current.temperature}°C`, true)
           .addField(":dash: Winds", current.winddisplay, true)
           .addField(":thermometer_face: Feels like", `${current.feelslike}°C`, true)
           .addField(":droplet: Humidity", ` ${current.humidity}%`, true)
           .setTimestamp()
           message.channel.send(weatherembed)

    });
    }
}