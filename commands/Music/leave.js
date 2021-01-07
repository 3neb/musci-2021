const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("wio.db");

module.exports = {
  name: "leave",
  aliases: ["le", 'خروج'],
  category: "Music",
  description: "Leave The Voice Channel!",
  usage: "Leave",
  run: async (client, message, args) => {
    
    const Channel = message.member.voice.channel;
    
    if (!Channel) return message.channel.send(new Discord.MessageEmbed().setColor(message.guild.member(client.user).roles.highest.hexColor)
.setDescription(("Please Join A Voice Channel!")))
    
    if (!message.guild.me.voice) return message.channel.send(new Discord.MessageEmbed().setColor(message.guild.member(client.user).roles.highest.hexColor)
.setDescription(("I Am Not In Any Voice Channel!")))
    
    try {
    
    await message.guild.me.voice.kick(client.user.id);
      
    } catch (error) {
      await message.guild.me.voice.kick(message.guild.me.id);
      return  message.channel.send(new Discord.MessageEmbed().setColor(message.guild.member(client.user).roles.highest.hexColor)
.setDescription(("Trying To Leave The Voice Channel...")))
    };
    
    const Embed = new Discord.MessageEmbed()
    .setColor(message.guild.member(client.user).roles.highest.hexColor)
    .setDescription("LEFT THE VOICE CHANNEL !")
    
    
    return message.channel.send(Embed).catch(() => message.channel.send("LEFT THE VOICE CHANNEL !"));
  }
};