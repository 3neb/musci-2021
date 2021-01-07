const { Default_Prefix, Color } = require("../../config.js");
const { Player } = require("../../Functions.js")
const Discord = require("discord.js"), Ytdl = require("discord-ytdl-core"), db = require("wio.db");

module.exports = {
  name: "bassboost",
  aliases: ["bb"],
  category: "Music",
  description: "Enable Or Disable Bassboost!",
  usage: "Bassboost",
  run: async (client, message, args) => {
    const Channel = message.member.voice.channel;

    if (!Channel) return message.channel.send("Please Join A Voice Channel!");

    const Queue = await client.queue.get(message.guild.id);

    if (!Queue)
      return message.channel.send(new Discord.MessageEmbed().setColor(message.guild.member(client.user).roles.highest.hexColor).setDescription((
        "Nothing Is Playing Right Now, Add Some Songs To Queue :D"
      )))
    
    const Embed = new Discord.MessageEmbed()
      .setColor(message.guild.member(client.user).roles.highest.hexColor)
      .setDescription(`Bassboost Has Been \`${Queue.Filters["bassboost"] ? "Disabled" : "Enabled"}\``)
      .setTimestamp()
      .setFooter(`${message.author.username} `, message.author.avatarURL({dynamic:true}));

    
    Queue.Filters["bassboost"] = Queue.Filters["bassboost"] ? false : true;
    
    await Player(message, Discord, client, Ytdl, { Filter: true, Play: Queue.Songs[0], Color: Color, db: db });

    return message.channel.send(Embed).catch(() => message.channel.send(`🎶 Nightcore Has Been ${Queue.Filters["bassboost"] ? "Disabled" : "Enabled"}`));
    
  }
};