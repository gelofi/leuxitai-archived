const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db");
const Canva = require("canvacord")
const canva = new Canva.Canvas()

module.exports = {
    name: 'image',
    aliases: ["imagedit"],
    description: "edit images",
    run: async (bot, message, args, util) => {
  
    let user = message.author;

    let dm = db.fetch(`dm_${message.guild.id}_${user.id}`)
    if(dm == null) return message.reply("you haven't bought this command yet!\nBuy it using the `buy` command.")
    
  let check = "<:leuxcheck:716819913901211658>"
  let no = "<:no:716819317852733480>"
  let coins = "<:leuxicoin:715493556810416238>";

  
  let img = message.attachments.first()
  if(!img) return message.reply("provide an image to edit!")
  let want = args[0]
  if(!want) return message.reply("specify an action to be done in the image!")
    if(want === "trigger"){
     try {
        let image = await canva.trigger(img.url);
        message.channel.sendFile(image,'triggered.gif');
      } catch (error) {
     message.channel.send(":warning: An error occured!\n\n```" + error + "```")
        }
    }

    if(want === "delete"){
     try {
        let image = await canva.delete(img.url);
        message.channel.sendFile(image,'delete.png');
      } catch (error) {
     message.channel.send(":warning: An error occured!\n\n```" + error + "```")
        }
    }
    
     if(want === "greyscale"){
     try {
        let image = await canva.greyscale(img.url);
        message.channel.sendFile(image,'greyscaled.png');
      } catch (error) {
     message.channel.send(":warning: An error occured!\n\n```" + error + "```")
        }
    }
      
     if(want === "sepia"){
     try {
        let image = await canva.sepia(img.url);
        message.channel.sendFile(image,'madesepia.png');
      } catch (error) {
     message.channel.send(":warning: An error occured!\n\n```" + error + "```")
        }
    }
      
     if(want === "blur"){
       let lvl = args[1]
       if(!lvl) return message.reply("specify a blur level!")
       if(isNaN(lvl) == true) return message.reply("that's not a number!")
     try {
        let image = await canva.blur(img.url, lvl);
        message.channel.sendFile(image,'blurred.png');
      } catch (error) {
     message.channel.send(":warning: An error occured!\n\n```" + error + "```")
        }
    }
      
      if(want === "trash"){
     try {
        let image = await canva.trash(img.url);
        message.channel.sendFile(image,'urtrash.png');
      } catch (error) {
     message.channel.send(":warning: An error occured!\n\n```" + error + "```")
        }
    }
      
      if(want === "invert"){
     try {
        let image = await canva.invert(img.url);
        message.channel.sendFile(image,'inverted.png');
      } catch (error) {
     message.channel.send(":warning: An error occured!\n\n```" + error + "```")
        }
    }
      
     if(want === "gay"){
     try {
        let image = await canva.gay(img.url);
        message.channel.sendFile(image,'gae.png');
      } catch (error) {
     message.channel.send(":warning: An error occured!\n\n```" + error + "```")
        }
    }
      
      if(want === "rip"){
     try {
        let image = await canva.rip(img.url);
        message.channel.sendFile(image,'rip.png');
      } catch (error) {
     message.channel.send(":warning: An error occured!\n\n```" + error + "```")
        }
    }
      
      if(want === "beautiful"){
     try {
        let image = await canva.beautiful(img.url);
        message.channel.sendFile(image,'gae.png');
      } catch (error) {
     message.channel.send(":warning: An error occured!\n\n```" + error + "```")
        }
    }
      
      if(want === "circle"){
     try {
        let image = await canva.circle(img.url);
        message.channel.sendFile(image,'circled.png');
      } catch (error) {
     message.channel.send(":warning: An error occured!\n\n```" + error + "```")
        }
    }
      
      if(want === "jail"){
     try {
        let image = await canva.jail(img.url);
        message.channel.sendFile(image,'jail.png');
      } catch (error) {
     message.channel.send(":warning: An error occured!\n\n```" + error + "```")
        }
    }
      
    }
}
