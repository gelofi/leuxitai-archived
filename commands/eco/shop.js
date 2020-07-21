const Discord = require('discord.js')
const ms = require("parse-ms");

module.exports = {
    name: 'shop',
    aliases: ["store"],
    description: "store infos.",
    run: async (bot, message, args, util) => {

    const db = bot.db

    let prefix = await db.fetch(`prefix_${message.guild.id}`)
    if(prefix == null) prefix = "l.";

    let eco;
  
    let econ = await db.fetch(`eco_${message.guild.id}`)
    
    if(econ == null || econ == undefined){
      eco = 'off';
      //return message.channel.send("That command is not enabled!");
    } else {
      eco = econ;
    }
      
    if(eco !== 'on') return message.channel.send("This command is not toggled on!");
    
  let check = "<:leuxcheck:716819913901211658>"
  let no = "<:no:716819317852733480>"
  let coins = "<:leuxicoin:715493556810416238>";
  
    let plus = await db.fetch(`plus_${message.guild.id}`)
      
    let item1 = await db.fetch(`item1_${message.guild.id}`)
    let item1desc = await db.fetch(`item1desc_${message.guild.id}`)
    let item1cost = await db.fetch(`item1cost_${message.guild.id}`)
  
    let item2 = await db.fetch(`item2_${message.guild.id}`)
    let item2desc = await db.fetch(`item2desc_${message.guild.id}`)
    let item2cost = await db.fetch(`item2cost_${message.guild.id}`)
    
    let item3 = await db.fetch(`item3_${message.guild.id}`)
    let item3desc = await db.fetch(`item3desc_${message.guild.id}`)
    let item3cost = await db.fetch(`item3cost_${message.guild.id}`)
    
    let item4 = await db.fetch(`item4_${message.guild.id}`)
    let item4desc = await db.fetch(`item4desc_${message.guild.id}`)
    let item4cost = await db.fetch(`item4cost_${message.guild.id}`)

    let item5 = await db.fetch(`item5_${message.guild.id}`)
    let item5desc = await db.fetch(`item5desc_${message.guild.id}`)
    let item5cost = await db.fetch(`item5cost_${message.guild.id}`)

    const name = args[1]
    const cost = args[2]
    const description = args.slice(3).join(" ")

    if(args[0] == "additem"){

    if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("you don't have the permission Manage Server to use this command!")
    if(item1 == null){
    if(!args[1]) return message.channel.send(`${no} Please add a name to the item!\nMake your name 1 word as possible.`)
    if(!cost) cost = 0;
    if(!description) description = "No description provided.";
       await db.set(`item1_${message.guild.id}`, name)
       await db.set(`item1desc_${message.guild.id}`, description)
       await db.set(`item1cost_${message.guild.id}`, cost)
       let itemis = new Discord.RichEmbed()
       .setColor("#3654ff")
       .setAuthor("Item created!", message.guild.iconURL)
       .setDescription(`**Item name**: ${name}\n**Description**: ${description}\n**Cost**: ${cost}`)
       message.channel.send(itemis)
      
      } else

   if(item1 !== null && item2 == null){
    if(!args[1]) return message.channel.send(`${no} Please add a name to the item!\nMake your name 1 word as possible.`)
    if(!cost) cost = 0;
    if(!description) description = "No description provided.";
       await db.set(`item2_${message.guild.id}`, name)
       await db.set(`item2desc_${message.guild.id}`, description)
       await db.set(`item2cost_${message.guild.id}`, cost)
       let itemdou = new Discord.RichEmbed()
       .setColor("#3654ff")
       .setAuthor("Item created!", message.guild.iconURL)
       .setDescription(`**Item name**: ${name}\n**Description**: ${description}\n**Cost**: ${cost}`)
       message.channel.send(itemdou)

      } else

   if(item1 !== null && item2 !== null && item3 == null){
    if(!name) return message.channel.send(`${no} Please add a name to the item!\nMake your name 1 word as possible.`)
    if(!cost) cost = 0;
    if(!description) description = "No description provided.";
       await db.set(`item3_${message.guild.id}`, name)
       await db.set(`item3desc_${message.guild.id}`, description)
       await db.set(`item3cost_${message.guild.id}`, cost)
       let itemdou = new Discord.RichEmbed()
       .setAuthor("Item created!", message.guild.iconURL)
       .setColor("#3654ff")
       .setDescription(`**Item name**: ${name}\n**Description**: ${description}\n**Cost**: ${cost}`)
       message.channel.send(itemdou)
    
    } else 
    if(plus == "subscriber"){
    if(item1 !== null && item2 !== null && item3 !== null && item4 == null){
    if(!name) return message.channel.send(`${no} Please add a name to the item!\nMake your name 1 word as possible.`)
    if(!cost) cost = 0;
    if(!description) description = "No description provided.";
       await db.set(`item4_${message.guild.id}`, name)
       await db.set(`item4desc_${message.guild.id}`, description)
       await db.set(`item4cost_${message.guild.id}`, cost)
       let itemf = new Discord.RichEmbed()
       .setAuthor("Item created!", message.guild.iconURL)
       .setColor("#3654ff")
       .setDescription(`**Item name**: ${name}\n**Description**: ${description}\n**Cost**: ${cost}`)
       message.channel.send(itemf)
    } else
     //item5
    if(item1 !== null && item2 !== null && item3 !== null && item4 !== null && item5 == null){
    if(!name) return message.channel.send(`${no} Please add a name to the item!\nMake your name 1 word as possible.`)
    if(!cost) cost = 0;
    if(!description) description = "No description provided.";
       await db.set(`item5_${message.guild.id}`, name)
       await db.set(`item5desc_${message.guild.id}`, description)
       await db.set(`item5cost_${message.guild.id}`, cost)
       let itempiv = new Discord.RichEmbed()
       .setAuthor("Item created!", message.guild.iconURL)
       .setColor("#3654ff")
       .setDescription(`**Item name**: ${name}\n**Description**: ${description}\n**Cost**: ${cost}`)
       message.channel.send(itempiv)
    } else {
       let full = new Discord.RichEmbed()
        .setColor("#ff3434")
        .setAuthor("Storage full!", message.guild.iconURL)
        .setDescription("You have used 5/5 custom items in Leuxitai's shop!\nDelete some items to create more.")
        message.channel.send(full)
     } 
    } else {
        let over = new Discord.RichEmbed()
        .setColor("#ff3434")
        .setAuthor("Storage full!", message.guild.iconURL)
        .setDescription("You have used 3/3 custom items in Leuxitai's shop!\nDelete some items to create more.")
        .setFooter("Subscribe to Leuxitai+ and get 2 more slots.")
        message.channel.send(over)
       }
      
    } else

    if(args[0] == "delete"){
      
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("you don't have the Manage Server permission to use this command!")
    if(!args[1]) return message.reply("specify a custom item to delete!")
     if(args[1] === item1) {
      await db.delete(`item1_${message.guild.id}`)
      await db.delete(`item1desc_${message.guild.id}`)
      await db.delete(`item1cost_${message.guild.id}`)
      message.channel.send(`**${args[1]}** has been deleted from the shop.`)
     } else
       
    if(args[1] == item4) {
      await db.delete(`item4_${message.guild.id}`)
      await db.delete(`item4desc_${message.guild.id}`)
      await db.delete(`item4cost_${message.guild.id}`)
      message.channel.send(`**${args[1]}** has been deleted from the shop.`)
     } else
       
    if(args[1] == item5) {
      await db.delete(`item5_${message.guild.id}`)
      await db.delete(`item5desc_${message.guild.id}`)
      await db.delete(`item5cost_${message.guild.id}`)
      message.channel.send(`**${args[1]}** has been deleted from the shop.`)
     } else
       
    if(args[1] === item2) {
      await db.delete(`item2_${message.guild.id}`)
      await db.delete(`item2desc_${message.guild.id}`)
      await db.delete(`item2cost_${message.guild.id}`)
      message.channel.send(`**${args[1]}** has been deleted from the shop.`)
     } else
       
     if(args[1] === item3) {
      await db.delete(`item3_${message.guild.id}`)
      await db.delete(`item3desc_${message.guild.id}`)
      await db.delete(`item3cost_${message.guild.id}`)
      message.channel.send(`**${args[1]}** has been deleted from the shop.`)
     } else {
     //if(args[1] !== item1 && args[1] !== item2 && args[1] !== item3) 
     message.reply("I couldn't find that custom item!")
      }
     } else {

     if(item1 !== null && item2 == null) {
      let shop1 = new Discord.RichEmbed()
      .setAuthor(`${message.guild.name}'s Shop`, message.guild.iconURL)
      .setDescription(`Buy items using \`${prefix}buy [item name]\`\nBuy custom items using \`${prefix}buy custom [item]\``)
      .addField(`${item1} - ${coins} ${item1cost}`, `${item1desc}`)
      .addField("LeuxItems", `Items you can buy to flex, or earn more money.\n\n• **charm** ${coins} **10000**\n- increase working efficiency by 20%\n• **rob shield** ${coins} **7000**\n- decrease others' rob efficiency by 50%\nand your rob fine if caught by 50%\n• **booster** ${coins} **1000**\n- get 450 LeuxiCoins daily instead of 200!\nLasts for 7 days.\n• **chicken** ${coins} **150**\n- buy a chicken to play chickenfights!`)
      .setColor("#3654ff")
      message.channel.send(shop1)

     } else 

     if(item1 !== null && item2 !== null && item3 == null) {
      let shop2 = new Discord.RichEmbed()
      .setAuthor(`${message.guild.name}'s Shop`, message.guild.iconURL)
      .setDescription(`Buy items using \`${prefix}buy [item name]\`\nBuy custom items using \`${prefix}buy custom [item]\``)
      .addField(`${item1} - ${coins} ${item1cost}`, `${item1desc}`)
      .addField(`${item2} - ${coins} ${item2cost}`, `${item2desc}`)
      .addField("LeuxItems", `Items you can buy to flex, or earn more money.\n\n• **charm** ${coins} **10000**\n- increase working efficiency by 20%\n• **rob shield** ${coins} **7000**\n- decrease others' rob efficiency by 50%\nand your rob fine if caught by 50%\n• **booster** ${coins} **1000**\n- get 450 LeuxiCoins daily instead of 200!\nLasts for 7 days.\n• **chicken** ${coins} **150**\n- buy a chicken to play chickenfights!`)
      .setColor("#3654ff")
      message.channel.send(shop2)

     } else 

     if(item1 !== null && item2 !== null && item3 !== null && item4 == null) {
      let shopfull = new Discord.RichEmbed()
      .setAuthor(`${message.guild.name}'s Shop`, message.guild.iconURL)
      .setDescription(`Buy items using \`${prefix}buy [item name]\`\nBuy custom items using \`${prefix}buy custom [item]\``)
      .addField(`${item1} - ${coins} ${item1cost}`, `${item1desc}`)
      .addField(`${item2} - ${coins} ${item2cost}`, `${item2desc}`)
      .addField(`${item3} - ${coins} ${item3cost}`, `${item3desc}`)
      .addField("LeuxItems", `Items you can buy to flex, or earn more money.\n\n• **charm** ${coins} **10000**\n- increase working efficiency by 20%\n• **rob shield** ${coins} **7000**\n- decrease others' rob efficiency by 50%\nand your rob fine if caught by 50%\n• **booster** ${coins} **1000**\n- get 450 LeuxiCoins daily instead of 200!\nLasts for 7 days.\n• **chicken** ${coins} **150**\n- buy a chicken to play chickenfights!`)
      .setColor("#3654ff")
      message.channel.send(shopfull)

     } else
      
    if(item1 !== null && item2 !== null && item3 !== null && item4 !== null && item5 == null) {
      let sh4 = new Discord.RichEmbed()
      .setAuthor(`${message.guild.name}'s Shop`, message.guild.iconURL)
      .setDescription(`Buy items using \`${prefix}buy [item name]\`\nBuy custom items using \`${prefix}buy custom [item]\``)
      .addField(`${item1} - ${coins} ${item1cost}`, `${item1desc}`)
      .addField(`${item2} - ${coins} ${item2cost}`, `${item2desc}`)
      .addField(`${item3} - ${coins} ${item3cost}`, `${item3desc}`)
      .addField(`${item4} - ${coins} ${item4cost}`, `${item4desc}`)
      .addField("LeuxItems", `Items you can buy to flex, or earn more money.\n\n• **charm** ${coins} **10000**\n- increase working efficiency by 20%\n• **rob shield** ${coins} **7000**\n- decrease others' rob efficiency by 50%\nand your rob fine if caught by 50%\n• **booster** ${coins} **1000**\n- get 450 LeuxiCoins daily instead of 200!\nLasts for 7 days.\n• **chicken** ${coins} **150**\n- buy a chicken to play chickenfights!`)
      .setColor("#3654ff")
      message.channel.send(sh4)

    } else 
      
      if(item1 !== null && item2 !== null && item3 !== null && item4 !== null && item5 !== null) {
      let sh5 = new Discord.RichEmbed()
      .setAuthor(`${message.guild.name}'s Shop`, message.guild.iconURL)
      .setDescription(`Buy items using \`${prefix}buy [item name]\`\nBuy custom items using \`${prefix}buy custom [item]\``)
      .addField(`${item1} - ${coins} ${item1cost}`, `${item1desc}`)
      .addField(`${item2} - ${coins} ${item2cost}`, `${item2desc}`)
      .addField(`${item3} - ${coins} ${item3cost}`, `${item3desc}`)
      .addField(`${item4} - ${coins} ${item4cost}`, `${item4desc}`)
      .addField(`${item5} - ${coins} ${item5cost}`, `${item5desc}`)
      .addField("LeuxItems", `Items you can buy to flex, or earn more money.\n\n• **charm** ${coins} **10000**\n- increase working efficiency by 20%\n• **rob shield** ${coins} **7000**\n- decrease others' rob efficiency by 50%\nand your rob fine if caught by 50%\n• **booster** ${coins} **1000**\n- get 450 LeuxiCoins daily instead of 200!\nLasts for 7 days.\n• **chicken** ${coins} **150**\n- buy a chicken to play chickenfights!`)
      .setColor("#3654ff")
      message.channel.send(sh5)

     } else {

      let noshop = new Discord.RichEmbed()
      .setAuthor(`${message.guild.name}'s Shop`, message.guild.iconURL)
      .setDescription("No custom items!\nAdd items!\n`shop [additem] [itemname] [itemcost] [itemdescription]\nIf you're gonna delete an item, please start on the last item you added.`")
      .addField("LeuxItems", `Items you can buy to flex, or earn more money.\n\n• **charm** ${coins} **10000**\n- increase working efficiency by 20%\n• **rob shield** ${coins} **7000**\n- decrease others' rob efficiency by 50%\nand your rob fine if caught by 50%\n• **booster** ${coins} **1000**\n- get 450 LeuxiCoins daily instead of 200!\nLasts for 7 days.\n• **chicken** ${coins} **150**\n- buy a chicken to play chickenfights!`)
      message.channel.send(noshop)
      }
     }


    }
}
