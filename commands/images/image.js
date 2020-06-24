const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db");
const Canva = require("canvacord")
const canva = new Canva()

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
  let coins = "<:leuxicoin:715493556810416238>"
  
  let img = message.mentions.users.first().avatarURL || message.attachments.first().url  
  if(!img) return message.reply("provide an image/@user to edit!")
  let want = args[0]
  if(!want) return message.reply("specify an action to be done in the image!")
    if(want === "trigger"){
     try {
        let image = await canva.trigger(img);
        message.channel.sendFile(image,'triggered.gif');
      } catch (error) {
     message.channel.send(":warning: An error occured!\n\n```" + error + "```")
        }
    }

    if(want === "delete"){
     try {
        let image = await canva.delete(img);
        message.channel.sendFile(image,'delete.png');
      } catch (error) {
     message.channel.send(":warning: An error occured!\n\n```" + error + "```")
        }
    }
    
     if(want === "greyscale"){
     try {
        let image = await canva.greyscale(img);
        message.channel.sendFile(image,'greyscaled.png');
      } catch (error) {
     message.channel.send(":warning: An error occured!\n\n```" + error + "```")
        }
    }
      
     if(want === "sepia"){
     try {
        let image = await canva.sepia(img);
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
        let image = await canva.blur(img, lvl);
        message.channel.sendFile(image,'blurred.png');
      } catch (error) {
     message.channel.send(":warning: An error occured!\n\n```" + error + "```")
        }
    }
      
      if(want === "trash"){
     try {
        let image = await canva.trash(img);
        message.channel.sendFile(image,'urtrash.png');
      } catch (error) {
     message.channel.send(":warning: An error occured!\n\n```" + error + "```")
        }
    }
      
      if(want === "invert"){
     try {
        let image = await canva.invert(img);
        message.channel.sendFile(image,'inverted.png');
      } catch (error) {
     message.channel.send(":warning: An error occured!\n\n```" + error + "```")
        }
    }
      
     if(want === "gay"){
     try {
        let image = await canva.gay(img);
        message.channel.sendFile(image,'gae.png');
      } catch (error) {
     message.channel.send(":warning: An error occured!\n\n```" + error + "```")
        }
    }
      
      if(want === "rip"){
     try {
        let image = await canva.rip(img);
        message.channel.sendFile(image,'rip.png');
      } catch (error) {
     message.channel.send(":warning: An error occured!\n\n```" + error + "```")
        }
    }
      
      if(want === "beautiful"){
     try {
        let image = await canva.beautiful(img);
        message.channel.sendFile(image,'gae.png');
      } catch (error) {
     message.channel.send(":warning: An error occured!\n\n```" + error + "```")
        }
    }
      
      if(want === "circle"){
     try {
        let image = await canva.circle(img);
        message.channel.sendFile(image,'circled.png');
      } catch (error) {
     message.channel.send(":warning: An error occured!\n\n```" + error + "```")
        }
    }
      
      if(want === "jail"){
     try {
        let image = await canva.jail(img);
        message.channel.sendFile(image,'jail.png');
      } catch (error) {
     message.channel.send(":warning: An error occured!\n\n```" + error + "```")
        }
    }
      
      if(want === "dither"){
     try {
        let image = await canva.dither(img);
        message.channel.sendFile(image,'dithered.png');
      } catch (error) {
     message.channel.send(":warning: An error occured!\n\n```" + error + "```")
        }
    }
      
      if(want === "deepfry" || want === "fry"){
     try {
        let image = await canva.deepfry(img);
        message.channel.sendFile(image,'fried.png');
      } catch (error) {
     message.channel.send(":warning: An error occured!\n\n```" + error + "```")
        }
    }
      
      if(want === "pixelize"){
        if(!args[1]) return message.reply("specify a pixelation level!")
        if(isNaN(args[1])) return message.reply("that's not a number!")
        
     try {
        let image = await canva.pixelate(img, args[1]);
        message.channel.sendFile(image,'pixelized.png');
      } catch (error) {
     message.channel.send(":warning: An error occured!\n\n```" + error + "```")
        }
    }
      
      if(want === "changemymind"){
        if(!args[1]) return message.channel.send("input a text to edit!")
     try {
        let image = await canva.changemymind(args[1]);
        message.channel.sendFile(image,'changemymind.png');
      } catch (error) {
     message.channel.send(":warning: An error occured!\n\n```" + error + "```")
        }
    }
      
      if(want === "shit"){
     try {
        let image = await canva.shit(img);
        message.channel.sendFile(image,'ewshit.png');
      } catch (error) {
     message.channel.send(":warning: An error occured!\n\n```" + error + "```")
        }
    }
      
    }
}
