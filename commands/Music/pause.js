const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("wio.db");

module.exports = {
  name: "pause",
  aliases: ["wait" ,'pa'],
  category: "Music",
  description: "Pause Music!",
  usage: "Pause",
  run: async (client, message, args) => {
    
    const Channel = message.member.voice.channel;
    
    if (!Channel) return message.channel.send("Please Join A Voice Channel!");
    
    const Queue = await client.queue.get(message.guild.id);
    
    if (!Queue) return message.channel.send(new Discord.MessageEmbed().setColor(message.guild.member(client.user).roles.highest.hexColor)
.setDescription("Nothing Is Playing Right Now, Add Some Songs To Queue"))
   
    if (!Queue.Playing) return message.channel.send(new Discord.MessageEmbed().setColor(message.guild.member(client.user).roles.highest.hexColor)
                                                    .setDescription("Already Paused"))
    
    Queue.Playing = false;
    Queue.Bot.dispatcher.pause();
    
    const Embed = new Discord.MessageEmbed()
    .setColor(message.guild.member(client.user).roles.highest.hexColor)
    .setDescription("✔  | Paused The Current Playing Song")
    
    return message.channel.send(Embed).catch(() => message.channel.send("✔  | Paused The Current Playing Song"));
  }
};