const Discord = require("discord.js");

exports.run = (client, message, args) => {
  let user;

  if (message.mentions.users.first()) {
    user = message.mentions.users.first();
  } else {
    user = message.author;
  }
  let avava = user.avatarURL();
  if (!avava) return message.channel.send("Profil fotoğrafın bulunmuyor");
  const avatar = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setImage(user.avatarURL());
  if (avava) message.channel.send(avatar);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["avatar", "avt", "av"],
  permLevel: `Yetki gerekmiyor.`
};

exports.help = {
  name: "avatar",
  category: "kullanıcı",
  description: "Belirtilen Kişinin veya Komutu Yazan Kişinin Avatarını Atar.",
  usage: "avatar @kişi-etiket veya +avatar"
};
