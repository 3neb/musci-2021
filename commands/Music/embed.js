const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("wio.db");

module.exports = {
  name: "embed",
  aliases: [""],
  category: "Writing",
  description: "The bot writes about you",
  usage: "embed message",
  run: async (client, message, args) => {
    if (!message.guild.member(message.author).hasPermission("MANAGE_GUILD"))
      return message.channel.send("**Your Must Have Manage gulid Permission**");
    if (!message.guild.member(client.user).hasPermission("MANAGE_GUILD"))
      return message.channel.send("**I Must Have a Manage gulid Permission**");
    let arg = message.content.split(" ").slice(1);
    let system = arg.join(" ");
    let say = new Discord.MessageEmbed()
      .setColor(message.guild.member(client.user).roles.highest.hexColor)
      .setDescription(system, { t: true });
    message.channel.send(say);
    message.delete();
  }
};
