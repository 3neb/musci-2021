const { Default_Prefix, Color } = require("../../config.js");
const { Splitter } = require("../../Functions.js");
const Discord = require("discord.js");
const Finder = require("lyrics-finder");

module.exports = {
  name: "lyrics",
  aliases: ["ly"],
  category: "Music",
  description: "Show Song Lyrics!",
  usage: "Lyrics",
  run: async (client, message, args) => {
    
    const Queue = client.queue.get(message.guild.id);
    
    if (!Queue && !args[0]) return message.channel.send("Please Give Something To Search!");
    
    let Lyric, Thing = Queue ? Queue.Songs[0].Title : args.join(" ");
    
    try {
      Lyric = await Finder(Thing, '');
      if (!Lyric) {
        if (Queue && args[0]) {
          Lyric = await Finder(args.join(" "), '');
        } else {
          return message.channel.send(new Discord.MessageEmbed().setColor(message.guild.member(client.user).roles.highest.hexColor)
          .setDescription(Thing))
        };
      };
    } catch (error) {
     return message.channel.send(new Discord.MessageEmbed().setColor(message.guild.member(client.user).roles.highest.hexColor)
                        .setTitle("No Lyrics")
                        .setDescription(Thing))
    };
    
    Lyric = await Lyric.replace(/(.{2040})/g,"\n1\n");
    
    return message.channel.send(new Discord.MessageEmbed().setColor(message.guild.member(client.user).roles.highest.hexColor)
.setDescription(Lyric, { split: { char: "\n" }}))
  }
};