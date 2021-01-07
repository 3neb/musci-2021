const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("wio.db");

module.exports = {
  name: "clear-queue",
  aliases: ["cq"],
  category: "Music",
  description: "Clear The Music Queue!",
  usage: "Clearqueue",
  run: async (client, message, args) => {
    
    const Channel = message.member.voice.channel;
    
    if (!Channel) return message.channel.send(new Discord.MessageEmbed().setColor(message.guild.member(client.user).roles.highest.hexColor).setDescription(("Please Join A Voice Channel!")))
    
    const Queue = await client.queue.get(message.guild.id);
    
    if (!Queue) return message.channel.send(new Discord.MessageEmbed().setColor(message.guild.member(client.user).roles.highest.hexColor).setDescription(("Nothing Is Playing Right Now, Add Some Songs To Queue :D"))
    )
    Queue.Songs = [];
    await Queue.Bot.dispatcher.end();
    
    const Embed = new Discord.MessageEmbed()
    .setColor(message.guild.member(client.user).roles.highest.hexColor)
    .setDescription("🎶 Music Queue Has Been Cleared!")
    .setTimestamp()
    .setFooter(`${message.author.username} `, message.author.avatarURL({dynamic:true}));
    
    return message.channel.send(Embed).catch(() => message.channel.send("🎶 Music Queue Has Been Cleared!"));
  }
};