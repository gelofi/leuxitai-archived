const { readdirSync } = require("fs");
const m = require('moment')
const ascii = require("ascii-table");

// Create a new Ascii table
let table = new ascii("Commands");
table.setHeading("Command", "Load status");

module.exports = (bot) => {
  
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
  
    // Read every commands subfolder
    readdirSync("./commands/").forEach(dir => {
        // Filter so we only have .js command files
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
    
        // Loop over the commands, and add all of them to a collection
        // If there's no name found, prevent it from returning an error,
        // By using a cross in the table we made.
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
    
            if (pull.name) {
                bot.commands.set(pull.name, pull);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, `❌  -> missing a help.name, or help.name is not a string.`);
                continue;
            }
    
            // If there's an aliases key, read the aliases.
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => bot.aliases.set(alias, pull.name));
        }
    });
    // Log the table
    console.log(dateTime + " changes saved")
    //console.log(table.toString());
}