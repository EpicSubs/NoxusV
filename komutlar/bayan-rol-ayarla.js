const Discord = require("discord.js");
const db = require("wio.db");
module.exports.run = async (bot, message, args) => {
  let prefix = await db.fetch(`prefix_${message.guild.id}`);
  if (!message.member.hasPermission("KICK_MEMBERS")) {
    const embed = new Discord.RichEmbed()
      .setDescription(`Ne yazık ki bu komutu kullanmaya yetkin yok!`)
      .setColor("RANDOM")
      .setFooter(bot.user.username, bot.user.avatarURL);
    message.channel.send(embed);
    return;
  }

  let bayan =
    message.mentions.roles.first() ||
    message.guild.roles.find(rol => rol.name === args[0]);
  if (!bayan) {
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription(`Lütfen bir bayan rol belirtiniz!`)
        .setColor("RANDOM")
        .setFooter(bot.user.username, bot.user.avatarURL)
    );
  }
  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle("Kayıt Sistemi")
    .addField(`Ayarlanan Bayan Rolü:`, `${bayan}`)
    .addField(`Rolü Ayarlayan Yetkili:`, `<@${message.author.id}>`)
    .setDescription(`Bayan rolünü başarıyla ${bayan} olarak ayarlandı!`)
    .setFooter(bot.user.username, bot.user.avatarURL);
  message.channel.send(embed);

  db.set(`bayanrol_${message.guild.id}`, bayan.id);
};

module.exports.conf = {
  aliases: [],
  permLevel: 2,
  enabled: true,
  guildOnly: false,
  kategori: "moderasyon"
};

module.exports.help = {
  name: "bayan-rol-ayarla",
  description: "Bayan Rolü Ayarlarınız",
  usage: "bayan-rol-ayarla <@rol>"
};
