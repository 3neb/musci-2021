const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("wio.db");

module.exports = {
  name: "resume",
  aliases: ["restart", "back"],
  category: "Music",
  description: "Resume The Music!",
  usage: "Resume",
  run: async (client, message, args) => {
    
    const Channel = message.member.voice.channel;
    
    if (!Channel) return message.channel.send(new Discord.MessageEmbed().setColor(message.guild.member(client.user).roles.highest.hexColor)
.setDescription("Please Join A Voice Channel!"))
    
    const Queue = await client.queue.get(message.guild.id);
    
    if (!Queue) return message.channel.send(new Discord.MessageEmbed().setColor(message.guild.member(client.user).roles.highest.hexColor)
.setDescription("Nothing Is Playing Right Now, Add Some Songs To Queue"))
   
    if (Queue.Playing) return message.channel.send(new Discord.MessageEmbed().setColor(message.guild.member(client.user).roles.highest.hexColor)
.setDescripti("Already Playing"))
    
    Queue.Playing = true;
    Queue.Bot.dispatcher.resume();
    
    const Embed = new Discord.MessageEmbed()
    .setColor(message.guild.member(client.user).roles.highest.hexColor)
    .setDescription("✔ | Resumed the Paused Song")
    
    return message.channel.send(Embed).catch(() => message.channel.send("🎶 Music Has Been Resumed!"));
  }
};