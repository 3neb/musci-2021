const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("wio.db");

module.exports = {
  name: "say",
  aliases: [""],
  category: "say",
  description: "The bot writes about you",
  usage: "say",
  run: async (client, message, args) => {
    
    if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD"))
return message.channel.send("**Your Must Have Manage gulid Permission**")
if(!message.guild.member(client.user).hasPermission("MANAGE_GUILD"))
return message.channel.send("**I Must Have a Manage gulid Permission**")
  let arg = message.content.split(" ").slice(1).join(" ")
message.channel.send(arg)
    message.delete();

}
}