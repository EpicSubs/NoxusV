const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
var prefix = ayarlar.prefix;

exports.run = async (message, client, args) => {
  const MedusaCode = Discord.MessageEmbed()
    .setColor("RANDOM") //İstediğiniz Rengin İngilizcesini Yazın RANDOM yazarsaniz Random Rekler çikar
    .setTitle("Noxus Yardım Menüsü")
    .addField(`${prefix}yetkili`)
    .addField(`${prefix}eğlence`)
    .addField(`${prefix}logo`)
    .addField(`${prefix}davet`)
    .addField(`${prefix}istatistik`)
    message.channel.send(MedusaCode);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: "y",
  permLevel: 0
};
exports.help = {
  name: "yardım",
  description: "Yardım Menüsünü",
  usage: "yardım"
};