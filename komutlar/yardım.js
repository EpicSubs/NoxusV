const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
var prefix = ayarlar.prefix;

exports.run = async (message, client, async) => {
  const embed = Discord.MessageEmbed()
    .setColor("RANDOM") //İstediğiniz Rengin İngilizcesini Yazın RANDOM yazarsaniz Random Rekler çikar
    .setTitle("Noxus Yardım Menüsü")
    .setDescription(`${prefix}yetkili`)
    .setDescription(`${prefix}eğlence`)
    .setDescription(`${prefix}logo`)
    .setDescription(`${prefix}davet`)
    .setDescription(`${prefix}istatistik`)
    .setThumbnail(``); //Komuta Resim Eklersiniz İstediğiniz Resim linkini yapiştirin
    message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["y", "h", "help", "yardim"],
  permLevel: 0
};
exports.help = {
  name: "yardım",
  description: "Yardım Menüsünü",
  usage: "yardım"
};
