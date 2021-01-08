const { Default_Prefix, Color, Support } = require("../../config.js");
const Discord = require("discord.js");
const db = require("wio.db");

module.exports = {
  name: "ping",
  aliases: ["ms"],
  category: "Other",
  description: "Show Bot Ping!",
  usage: "Ping",
  run: async (client, message, args) => {
  var ping = `${Date.now() - message.createdTimestamp}`
var api = `${Math.round(client.ws.ping)}`
const disco = new Discord.MessageEmbed()
.setColor(message.guild.member(client.user).roles.highest.hexColor)
.setDescription(`
\`Speed message :  ${Date.now() - message.createdTimestamp} ms
Discord Api : ${api} ms
Ping Bot : ${ping} ms\`
  `)
    message.channel.send(disco);
  }
};
