const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("wio.db");
exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      ` Bu komudu kullanabilmek için "ADMINISTRATOR" yetkisine sahip olman gerek.`
    );
  let Henor = args[0];

  if (!Henor) {
    const Henoer = new Discord.MessageEmbed().setDescription(
      "Kimin Banını Açcam İd Versene"
    );
    
    return message.channel.send(Henoer);
  }

  message.guild.members.unban(Henor);
  
  const s = new Discord.MessageEmbed().setDescription(
    `${Henor} idli kişi ${message.author.tag} tarafından yasağı kaldırıldı`
  );
  return message.channel.send(s);
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
