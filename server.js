const Discord = require("discord.js");
const fs = require("fs");
const ms = "ms";
const db = require("wio.db");
const client = new Discord.Client();
const { Default_Prefix, Token, Support, Color } = require("./config.js");
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://music-2004-js.glitch.me/`);
}, 280000)


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.queue = new Map();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  var ms = 10000;
  const version = require("./package.json").version;
  var setGame = [
    {
      name: `Héllo Çukur.`,
      type: "LISTENING"
    },
    {
      name: "",
      type: ""
    }
  ];
  var i = -0;
  var j = 1;
  setInterval(function() {
    if (i == -0) {
      j = 0;
    }
    if (i == setGame.length - 1) {
      j = -1;
    }
    i = i + j;
    client.user.setActivity(setGame[i]);
  }, ms);
});

let modules = ["Config", "Music", "Other"];

modules.forEach(function(module) {
  fs.readdir(`./commands/${module}`, function(error, files) {
    if (error) return new Error(`${error}`);
    files.forEach(function(file) {
      if (!file.endsWith(".js"))
        throw new Error(`A File Does Not End With .js!`);
      let command = require(`./commands/${module}/${file}`);
      console.log(`${command.name} --Done`);
      if (command.name) client.commands.set(command.name, command);
      if (command.aliases) {
        command.aliases.forEach(alias =>
          client.aliases.set(alias, command.name)
        );
      }
      if (command.aliases.length === 0) command.aliases = null;
    });
  });
});

client.on("message", async message => {
  if (message.author.bot || !message.guild || message.webhookID) return;

  let Prefix = await db.fetch(`Prefix_${message.guild.id}`);
  if (!Prefix) Prefix = Default_Prefix;

  if (!message.content.startsWith(Prefix)) return;

  let args = message.content
    .slice(Prefix.length)
    .trim()
    .split(/ +/g);
  let cmd = args.shift().toLowerCase();

  let command =
    client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
  
  if (!message.guild.me.hasPermission("SEND_MESSAGES")) return;

  if (!command)
    return message.channel.send(
      `No Command Found - ${cmd.charAt(0).toUpperCase() + cmd.slice(1)}`
    );

  try {
    if (command) {
      command.run(client, message, args);
    }
  } catch (error) {
    return message.channel.send(`Something Went Wrong, Try Again Later!`);
  };
});

client.login(Token).catch(() => console.log(`Invalid Token Is Provided - Please Give Valid Token!`));