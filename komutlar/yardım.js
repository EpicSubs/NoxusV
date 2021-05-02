const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json")
const db = require("wio.db");  
var prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {
  const MedusaCode = Discord.MessageEmbed()
    .setColor("RANDOM") //İstediğiniz Rengin İngilizcesini Yazın RANDOM yazarsaniz Random Rekler çikar
    .setTitle("Noxus Yardım Menüsü")
    .addField(`${prefix}moderasyon`)
    .addField(`${prefix}eğlence`)
    .addField(`${prefix}kullanıcı`)
    .addField(`${prefix}davet`)
    .addField(`${prefix}istatistik`)
    .setThumbnail(``); //Komuta Resim Eklersiniz İstediğiniz Resim linkini yapiştirin
  message.channel.send(MedusaCode);
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
