const Discord = require("discord.js");
const db = require("wio.db");
//DarknessCode
exports.run = async (client, message, args) => {
  let user = message.author;
  let sebep = args.join(" ");
  //DarknessCode
  if (!sebep) return message.channel.send(`:x: Bir sebep yazmalısın.`);
  //DarknessCode
  db.set(`afk_${user.tag}`, sebep);
  message.channel.send(`:x:@${user.tag} ,  **__${sebep}__**  sebebiyle AFK.`);
};
//DarknessCode
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
//DarknessCode
exports.help = {
  name: "afk",
  description: "AFK olmanızı sağlar.",
  usage: "afk <sebep>"
}; //DarknessCode
