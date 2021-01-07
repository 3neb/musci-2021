const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");

module.exports = {
  name: "volume",
  aliases: ["vol"],
  category: "Music",
  description: "Show Volume  & You Can Also Set Volume!",
  usage: "Volume | <1 - 150>",
  run: async (client, message, args) => {
    const Channel = message.member.voice.channel;

    if (!Channel) return message.channel.send("Please Join A Voice Channel!");

    const Queue = await client.queue.get(message.guild.id);

    if (!Queue)
      return message.channel.send(new Discord.MessageEmbed().setColor(message.guild.member(client.user).roles.highest.hexColor)
.setDescription("Nothing Is Playing Right Now, Add Some Songs To Queue :D"))

    const Embed = new Discord.MessageEmbed()
      .setColor(message.guild.member(client.user).roles.highest.hexColor)
      .setDescription(`^ THE VOLUME \`${Queue.Volume}\``)
 
    if (!args[0]) return message.channel.send(Embed).catch(() => message.channel.send(`🎶 Volume - ${Queue.Volume}`));

    if (args[0]) {
      if (isNaN(args[0]))
        return message.channel.send(new Discord.MessageEmbed().setColor(message.guild.member(client.user).roles.highest.hexColor)
.setDescription("Please Give A Valid Number"))
      if (args[0] > 150) return message.channel.send(new Discord.MessageEmbed().setColor(message.guild.member(client.user).roles.highest.hexColor)
.setDescription("^ JUST TURN UP THE VOLUME 150 ^"))
      if (parseInt(Queue.Volume) === parseInt(args[0]))
        return message.channel.send("Current Volume Is The Same!");

      Queue.Volume = parseInt(args[0]);
      Queue.Bot.dispatcher.setVolumeLogarithmic(Queue.Volume / 100);
      
      const Embeded = new Discord.MessageEmbed()
      .setColor(message.guild.member(client.user).roles.highest.hexColor)
      .setDescription(`VOLUME ′\`${Queue.Volume}\``)
      
      return message.channel.send(Embeded).catch(() => message.channel.send(`VOLUME ’\`${Queue.Volume}\``));
    };
  }
};
