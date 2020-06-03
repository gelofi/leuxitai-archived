const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db");
const ms = require("parse-ms");

module.exports = {
    name: 'shop',
    aliases: ["store"],
    description: "store infos.",
    run: async (bot, message, args, util) => {
  
    let prefix = await db.fetch(`prefix_${message.guild.id}`)
    if(prefix == null) prefix = "l.";
    let eco;
  
    let econ = await db.fetch(`eco_${message.guild.id}`)
    
    if(econ == null){
      eco = 'off';
      //return message.channel.send("That command is not enabled!");
    } else {
      eco = econ;
    }
      
    if(eco !== 'on') return message.channel.send("This command is not toggled on!");
    
  let check = "<:leuxcheck:716819913901211658>"
  let no = "<:no:716819317852733480>"
  let coins = "<:leuxicoin:715493556810416238>";
  
    let items1 = await db.fetch(`item1_${message.guild.id}`)

    let item1 = items1
      
    let items1desc = await db.fetch(`item1desc_${message.guild.id}`)
    
    let item1desc = items1desc;
    
    let items1cost = await db.fetch(`item1cost_${message.guild.id}`)
    
    let item1cost = items1cost;
    
    let items2 = await db.fetch(`item2_${message.guild.id}`)
    
    let item2 = items2;
    
    let items2desc = await db.fetch(`item2desc_${message.guild.id}`)
    
    let item2desc = items2desc;

    let items2cost = await db.fetch(`item2cost_${message.guild.id}`)
    
    let item2cost = items2cost;
    
    let items3 = await db.fetch(`item3_${message.guild.id}`)
    
    let item3 = items3;
  
    let items3desc = await db.fetch(`item3desc_${message.guild.id}`)
    
    let item3desc = items3desc;

    let items3cost = await db.fetch(`item3cost_${message.guild.id}`)
    
    let item3cost = items3cost;
   
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
      }

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

      }

   if(item1 !== null && item2 !== null && item3 == null){
    if(!args[1]) return message.channel.send(`${no} Please add a name to the item!\nMake your name 1 word as possible.`)
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

      }
    
    if(item1 !== null && item2 !== null && item3 !== null){
        let over = new Discord.RichEmbed()
        .setColor("#3654ff")
        .setAuthor("Storage full!", message.guild.iconURL)
        .setDescription("You have used 3/3 custom items in Leuxitai's shop!\nDelete some items to create more.")
        message.channel.send(over)
      }

    } else

    if(args[0] == "delete"){
      
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("you don't have the Manage Server permission to use this command!")
    if(!args[1]) return message.reply("specify an item to delete!")
     if(args[1] == item1) {
      await db.delete(`item1_${message.guild.id}`)
      await db.delete(`item1desc_${message.guild.id}`)
      await db.delete(`item1cost_${message.guild.id}`)
      message.channel.send(`**${args[1]}** has been deleted from the shop.`)
     }
    if(args[1] !== item1 && args[1] == item2) {
      await db.delete(`item2_${message.guild.id}`)
      await db.delete(`item2desc_${message.guild.id}`)
      await db.delete(`item2cost_${message.guild.id}`)
      message.channel.send(`**${args[1]}** has been deleted from the shop.`)
     }
     if(args[1] !== item1 && args[1] !== item2 && args[1] == item3) {
      await db.delete(`item3_${message.guild.id}`)
      await db.delete(`item3desc_${message.guild.id}`)
      await db.delete(`item3cost_${message.guild.id}`)
      message.channel.send(`**${args[1]}** has been deleted from the shop.`)
     }
     if(args[1] !== item1 && args[1] !== item2 && args[1] !== item3) {
     message.reply("I couldn't find that item!")
      }
      
     } else {

     if(item1 !== null && item2 == null && item3 == null) {
      let shop1 = new Discord.RichEmbed()
      .setAuthor(`${message.guild.name}'s Shop`, message.guild.iconURL)
      .setDescription(`Buy items using \`${prefix}buy [item name]\`\nBuy custom items using \`${prefix}buy custom [item]\``)
      .addField(`${item1} - ${coins} ${item1cost}`, `${item1desc}`)
      .addField("LeuxItems", `Items you can buy to flex, or earn more money.\n\n• **charm** ${coins} **10000**\n- increase working efficiency by 20%\n• **rob shield** ${coins} **7000**\n- decrease others' rob efficiency by 50%\n• **image** ${coins} **25000**\n- unlock this command to manipulate images!`)
      .setColor("#3654ff")
      message.channel.send(shop1)

     } else 

     if(item1 !== null && item2 !== null && item3 == null) {
      let shop2 = new Discord.RichEmbed()
      .setAuthor(`${message.guild.name}'s Shop`, message.guild.iconURL)
      .setDescription(`Buy items using \`${prefix}buy [item name]\`\nBuy custom items using \`${prefix}buy custom [item]\``)
      .addField(`${item1} - ${coins} ${item1cost}`, `${item1desc}`)
      .addField(`${item2} - ${coins} ${item2cost}`, `${item2desc}`)
      .addField("LeuxItems", `Items you can buy to flex, or earn more money.\n\n• **charm** ${coins} **10000**\n- increase working efficiency by 20%\n• **rob shield** ${coins} **7000**\n- decrease others' rob efficiency by 50%\n• **image** ${coins} **25000**\n- unlock this command to manipulate images!`)
      .setColor("#3654ff")
      message.channel.send(shop2)

     } else 

     if(item1 !== null && item2 !== null && item3 !== null) {
      let shopfull = new Discord.RichEmbed()
      .setAuthor(`${message.guild.name}'s Shop`, message.guild.iconURL)
      .setDescription(`Buy items using \`${prefix}buy [item name]\`\nBuy custom items using \`${prefix}buy custom [item]\``)
      .addField(`${item1} - ${coins} ${item1cost}`, `${item1desc}`)
      .addField(`${item2} - ${coins} ${item2cost}`, `${item2desc}`)
      .addField(`${item3} - ${coins} ${item3cost}`, `${item3desc}`)
      .addField("LeuxItems", `Items you can buy to flex, or earn more money.\n\n• **charm** ${coins} **10000**\n- increase working efficiency by 20%\n• **rob shield** ${coins} **7000**\n- decrease others' rob efficiency by 50%\n• **image** ${coins} **25000**\n- unlock this command to manipulate images!`)
      .setColor("#3654ff")
      message.channel.send(shopfull)

     } else {

      let noshop = new Discord.RichEmbed()
      .setAuthor(`${message.guild.name}'s Shop`, message.guild.iconURL)
      .setDescription("No custom items!\nAdd items!\n`shop [additem] [itemname] [itemcost] [itemdescription]\nIf you're gonna delete an item, please start on the last item you added.`")
      .addField("LeuxItems", `Items you can buy to flex, or earn more money.\n\n• **charm** ${coins} **10000**\n- increase working efficiency by 20%\n• **rob shield** ${coins} **7000**\n- decrease others' rob efficiency by 50%\n• **dm** ${coins} **25000**\n- unlock this command to manipulate images!`)
      message.channel.send(noshop)
      }
     }


    }
}
