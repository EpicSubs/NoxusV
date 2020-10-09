const Discord = require("discord.js");
const db = require("wio.db");
const ayarlar = require("../ayarlar.json");

var prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_NICKNAMES")) {
    const embed = new Discord.RichEmbed()
      .setTitle(`Kayıt Sistemi`)
      .setDescription(
        "Bu Komutu Kullanabilmek İçin ``İsimleri Yönet`` Yetkisine Sahip Olmalısın"
      )
      .setColor("RANDOM");
    return message.reply(embed);
  }
  let bayanrol = await db.fetch(`bayanrol_${message.guild.id}`);
  let kayıtsızrol = await db.fetch(`kayıtsızrol_${message.guild.id}`);
  let kayıtkanal = await db.fetch(`kayitkanal_${message.guild.id}`);
  let member =
    message.mentions.users.first() || client.users.get(args.join(" "));

  const hata1 = new Discord.RichEmbed() //kişi hata
    .setColor("RED")
    .setTitle(`Yanlış Kullanım Tespit Edildi.`)
    .addField(`Doğru Kullanım:`, `\`${ayarlar.prefix}bayan @Üye İsim Yaş\``)
    .setFooter(`${message.author.tag}`, message.author.avatarURL);
  if (!member) return message.channel.send(hata1);
  const m = message.guild.member(member);
  const isim = args[1];
  const yas = args[2];

  const hata2 = new Discord.RichEmbed() //nick hata
    .setColor("RED")
    .setTitle(`Yanlış Kullanım Tespit Edildi.`)
    .addField(`Doğru Kullanım:`, `\`${ayarlar.prefix}bayan @Üye İsim Yaş\``)
    .setFooter(`${message.author.tag}`, message.author.avatarURL);
  if (!isim) return message.channel.send(hata2);

  const hata3 = new Discord.RichEmbed() //yas hata
    .setColor("RED")
    .setTitle(`Yanlış Kullanım Tespit Edildi.`)
    .addField(`Doğru Kullanım:`, `\`${ayarlar.prefix}bayan @Üye İsim Yaş\``)
    .setFooter(`${message.author.tag}`, message.author.avatarURL);
  if (!yas) return message.channel.send(hata3);

  m.addRole(bayanrol);
  m.removeRole(kayıtsızrol);
  m.setNickname(`${isim} | ${yas}`);

  const embed = new Discord.RichEmbed()
    .setColor(`RANDOM`)
    .setTitle(`<a:evet:696318840560287754> | Başarıyla Kayıt Edildi!`)
    .addField(`Kayıt Edilen:`, `${member}`)
    .addField(`Kayıt Esnasında Verilen Rol:`, `<@&${bayanrol}>`)
    .addField(`Kayıt Eden Yetkili:`, `<@${message.author.id}>`)
    .addField(`Kayıt Esnasında Verilen İsim:`, `${isim} | ${yas}`)
    .setFooter(`${message.author.tag}`, message.author.avatarURL);
  message.guild.channels.get(kayıtkanal).send(embed);
};
//}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "bayan",
  usage: ["bayan"],
  description: "Bayanları Kayıt Yapar."
};
