const discord = require("discord.js");

const db = require("wio.db");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.reply(
      "Bu komutu kullanmak için yönetici yetkisi gerekmektedir."
    );

  const emir = message.mentions.channels.first();

  if (!emir) return message.channel.send("Kanal etiketle");

  const noxus = args.slice(1).join(" ");

  if (isNaN(noxus)) return message.channel.send("Hedef gir.");

  if (parseInt(message.guild.memberCount) > parseInt(noxus))
    return message.channel.send(
      "Üye hedefini sunucudaki toplam kullanıcı sayısından yüksek yapmalısınız."
    );
  else {
    await db.set(`sayackanal_${message.guild.id}`, emir.id);

    await db.set(`sayacsayi_${message.guild.id}`, noxus);

    message.channel.send(
      `${emir} Kanalını başarıyla, ${noxus} hedefi başarıyla ayarladım.`
    );
  }
};

exports.conf = {
  enabled: true, //True => Komut açık, False => Komut kapalı

  guildOnly: false, //True => Sadece Servere Özel, False => Heryerde kullanılabilir

  aliases: [], //Komutun farklı kullanımları ÖR: !ping, !p

  permLevel: 0 //kimlerin kullanabileceğini  (bot.js dosyasında perm leveller yazıyor)
};

exports.help = {
  name: "sayaç" //Komutun adı (Komutu girerken lazım olucak)
};
