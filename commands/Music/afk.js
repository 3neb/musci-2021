const { Default_Prefix, Color } = require("../../config.js");

const Discord = require("discord.js");

const db = require("wio.db");

module.exports = {

  name: "afk",

  aliases: ["a"],

  category: "Music",

  description: "afk a room voice",

  usage: "afk room",

  run: async (client, message, args) => {

    

    const Channel = message.member.voice.channel;

    

    if (!Channel) return message.channel.send(new Discord.MessageEmbed().setColor(message.guild.member(client.user).roles.highest.hexColor)

                                              .setDescription(("Please Join A Voice Channel!")))

    

    if (!Channel.joinable) return message.channel.send(new Discord.MessageEmbed().setColor(message.guild.member(client.user).roles.highest.hexColor)

                                                      .setDescription(("I Can't Join The Voice Channel!")))

    

    await Channel.join().catch(() => {

      return message.channel.send(new Discord.MessageEmbed().setColor(message.guild.member(client.user).roles.highest.hexColor)

                              .setDescription(("Unable To Join The Voice Channel!")))

    });

    

    const Embed = new Discord.MessageEmbed() 

    .setColor(message.guild.member(client.user).roles.highest.hexColor)

    .setDescription(`ًں’¤  **|**  AFK in a room`)

    

    return message.channel.send(Embed).catch(() => message.channel.send("ًں’¤  **|**  AFK in a room"));

  }

};
