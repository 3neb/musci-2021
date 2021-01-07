const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("wio.db");

module.exports = {
  name: "shuffle",
  aliases: ["sf", "sh"],
  category: "Music",
  description: "Shuffle Music Queue!",
  usage: "Play random songs",
  run: async (client, message, args) => {
    const Channel = message.member.voice.channel;

    if (!Channel) return message.channel.send(new Discord.MessageEmbed().setColor(message.guild.member(client.user).roles.highest.hexColor)
.setDescription("Please Join A Voice Channel!"))

    const Queue = await client.queue.get(message.guild.id);

    if (!Queue)
      return message.channel.send(
        "Nothing Is Playing Right Now, Add Some Songs To Queue");
    
    const Current = await Queue.Songs.shift();
    
    Queue.Songs = Queue.Songs.sort(() => Math.random() - 0.5);
    await Queue.Songs.unshift(Current);
    
    const Embed = new Discord.MessageEmbed()
    .setColor(message.guild.member(client.user).roles.highest.hexColor)
    .setDescription("shuffled the queue")
    
    return message.channel.send(Embed).catch(() => message.channel.send("🎶 Queue Has Been Shuffled"));
  }
};