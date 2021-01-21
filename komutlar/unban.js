const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("wio.db");
exports.run = async (client, message, args) => {
  let Henor = args[0];

  if (!Henor) {
    const Henor = new Discord.MessageEmbed().setDescription(
      "Kimin Banını Açcam İd Versene"
    );
    return message.channel.send(s);
  }

  message.guild.members.unban(Henor);
  const s = new Discord.MessageEmbed().setDescription(
    `${Henor} idli kişi ${message.author.tag} tarafından yasağı kaldırıldı`
  );
  return message.channel.send(Henor);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2
};
exports.help = {
  name: "unban"
};
