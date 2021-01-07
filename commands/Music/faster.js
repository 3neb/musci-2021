const { Default_Prefix, Color } = require("../../config.js");
const { Player } = require("../../Functions.js")
const Discord = require("discord.js"), Ytdl = require("discord-ytdl-core"), db = require("wio.db");

module.exports = {
  name: "faster",
  aliases: ['fa'],
  category: "Music",
  description: "Enable Or Disable Nightcore!",
  usage: "Nightcore",
  run: async (client, message, args) => {
    const Channel = message.member.voice.channel;

    if (!Channel) return message.channel.send(new Discord.MessageEmbed().setColor(message.guild.member(client.user).roles.highest.hexColor)
.setDescription("Please Join A Voice Channel!"))

    const Queue = await client.queue.get(message.guild.id);

    if (!Queue)
      return message.channel.send(new Discord.MessageEmbed().setColor(message.guild.member(client.user).roles.highest.hexColor).setDescription(
        "Nothing Is Playing Right Now, Add Some Songs To Queue :D"
      ))

    const Embed = new Discord.MessageEmbed()
      .setColor(message.guild.member(client.user).roles.highest.hexColor)
      .setDescription(`Nightcore Has Been \`${Queue.Filters["nightcore"] ? "Disabled" : "Enabled"}\``)
    
    Queue.Filters["nightcore"] = Queue.Filters["nightcore"] ? false : true;
    
    await Player(message, Discord, client, Ytdl, { Filter: true, Play: Queue.Songs[0], Color: Color }, db);

    return message.channel.send(Embed).catch(() => message.channel.send(`🎶 Nightcore Has Been ${Queue.Filters["nightcore"] ? "Disabled" : "Enabled"}`));
    
  }
};