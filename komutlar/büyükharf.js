const Discord = require("discord.js");
const db = require("wio.db");
const ayarlar = require("../ayarlar.json");
exports.run = async (client, message, args) => {
  let prefix =
    (await require("wio.db").fetch(`prefix_${message.guild.id}`)) ||
    ayarlar.prefix;

  if (message.author.id !== ayarlar.sahip)
    return message.channel.send(
      `Capslock engelleme adlı komut gereksinimini karşılamıyorsun`
    );
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(`:fire: Yeterli yetki, bulunmamakta!`);

  let capslock = await db.fetch(`capslock_${message.guild.id}`);
  if (capslock) {
    db.delete(`capslock_${message.guild.id}`);
    message.channel.send(
      `Capslock Engelleme Sistemi kapatıldı || açmak için ${ayarlar.prefix}caps-sistemi:white_check_mark:`
    );
  }

  if (!capslock) {
    db.set(`capslock_${message.guild.id}`, "acik");
    message.channel.send(
      `Capslock Engelleme Sistemi Aktifleştirildi :white_check_mark:`
    );
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["capslock-engel", "caps-sistem"],
  permLevel: 3
};
exports.help = {
  name: "capslock-engelleme",
  category: "Moderasyon komutları!",
  description: "büyük harfmi gördüm? Capslock kullanımını engeller.",
  usage: "capslock-engelleme"
};
