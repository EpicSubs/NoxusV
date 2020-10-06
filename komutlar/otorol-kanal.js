const Discord = require("discord.js");
const db = require("wio.db");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send("Yönetici yetkisi gerekli.");

  const kanal = message.mentions.channels.first();
  if (!kanal) return message.channel.send("Lütfen bir kanal etiketleyin.");

  db.set(`otorolkanal_${message.guild.id}`, kanal.id);

  message.channel.send(`Otorol kanalı başarıyla ${kanal} olarak ayarlandı!`);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: []
};

exports.help = {
  name: "otorol-kanal",
  description: "Emir Bolat & Vagus Tarafından Kodlanmıştır..",
  usage: "otorol-kanal #kanal"
};
