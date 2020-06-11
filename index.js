const { ShardingManager } = require("discord.js");
const { token } = require("./config.js");
const manager = new ShardingManager("./bot.js", { token: token });

manager.spawn();
manager.on("launch", shard => console.log(`Launched shard / Spawned ${shard.id} !`));
