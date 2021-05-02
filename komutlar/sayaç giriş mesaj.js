const discord = require("discord.js");

const db = require("wio.db");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send("Bu komut için yetkin yetmiyor..");

  const gmesaj = await db.fetch(`sayacgirismesaj_${message.guild.id}`);

  const cmesaj = await db.fetch(`sayaccikismesaj_${message.guild.id}`);

   const skanal = await db.fetch(`sayackanal_${message.guild.id}`);

  if (!skanal)
    return message.reply(
      "Çıkış mesajı ayarlamak için önce sayaç kanalını ve hedefinizi belirlemelisiniz. ***n!sayaç**"
    );

  const sayi = await db.fetch(`sayacsayi_${message.guild.id}`);

  const kanal = await db.fetch(`sayackanal_${message.guild.id}`);

  const knl = client.channels.get(kanal);

  const emirdamla = args.slice(0).join(" ");

  if (!emirdamla)
    return message.channel.send(
      `Mesaj Ne Olacak? \n***Terimler :: *** .gelenkisi. .sunucuisim. .toplamkisi. .hedef.`
    );
  else {
    await db.set(`sayacgirismesaj_${message.guild.id}`, emirdamla);

    const msjjj = emirdamla
      .replace(".gelenkisi.", message.author)

      .replace(".sunucuisim.", message.guild.name)

      .replace(".toplamkisi.", message.guild.memberCount)

      .replace(".hedef.", sayi);

    const embed = new discord.MessageEmbed()

      .setColor("GREEN")

      .setDescription(`Başarılı..`)

      .addField(`Örnek Görünüm`, msjjj);

    message.channel.send(embed);
  }
};

exports.conf = {
  enabled: true, //True => Komut açık, False => Komut kapalı

  guildOnly: false, //True => Sadece Servere Özel, False => Heryerde kullanılabilir

  aliases: [], //Komutun farklı kullanımları ÖR: !ping, !p

  permLevel: 0 //kimlerin kullanabileceğini  (bot.js dosyasında perm leveller yazıyor)
};

exports.help = {
  name: "sayaç-giriş-mesaj" //Komutun adı (Komutu girerken lazım olucak)
};
