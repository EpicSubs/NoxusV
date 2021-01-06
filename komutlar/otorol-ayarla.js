const fs = require("fs");
const Discord = require("discord.js");
var sunucuyaözelayarlarOtorol = JSON.parse(
  fs.readFileSync("./otorol.json", "utf8")
);

exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("ADMİNİSTRATOR"))
    return message.channel.send(
      `**Bu Komutu Kullanabilmek İçin "\`Yönetici\`" Yetkisine Sahip Olmalısın.**`
    );

  let profil = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  var mentionedChannel = message.mentions.channels.first();
  if (!mentionedChannel && args[0] !== "sıfırla")
    return message.channel.send(
      "**Otorol Ayarlamam İçin Bir Kanal ve Rol Belirlemelisin.!** "
    );
  if (message.guild.member(message.author.id).hasPermission(0x8)) {
    var mentionedRole = message.mentions.roles.first();
    if (!mentionedRole)
      return message.channel.send(
        "**Doğru Kullanım = n!otorol-ayarla @<roladı> #<metinkanalı>!** ".then(
          msg => message.delete({ timeout: 100, reason: "Otorol Ayarlandı" })
        )
      );

    if (!profil[message.guild.id]) {
      profil[message.guild.id] = {
        sayi: mentionedRole.id,
        kanal: mentionedChannel.id
      };
    }

    profil[message.guild.id].sayi = mentionedRole.id;
    profil[message.guild.id].kanal = mentionedChannel.id;

    fs.writeFile("./otorol.json", JSON.stringify(profil), err => {
      console.log(err);
    });

    const embed = new Discord.MessageEmbed()
      .setDescription(
        `╔▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
                         ║► Otorol Başarılı Bir Şekilde Ayarlanmıştır.
                         ║► Otorol ${args[0]} Olarak Ayarlanmıştır.
                         ║► Otorol Kanalı ${mentionedChannel} Olarak Ayarlanmıştır.
                         ║► Otorolü Kapatmak İçin **n!otorol-kapat** Yazmalısınız.
                         ╚▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`
      )
      .setColor("RANDOM")
      .setTimestamp();
    message.channel.send({ embed });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["setautorole", "otorol", "otoroldeğiştir"]
};

exports.help = {
  name: "otorol-ayarla",
  description: "Sunucuya Girenlere Verilecek Olan Otorolü Ayarlar.",
  usage: "otorolayarla"
};
