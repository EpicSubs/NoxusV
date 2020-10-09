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

  let erkek =
    message.mentions.roles.first() ||
    message.guild.roles.find(rol => rol.name === args[0]);
  if (!erkek) {
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription(`Lütfen bir erkek rol belirtiniz!`)
        .setColor("RANDOM")
        .setFooter(bot.user.username, bot.user.avatarURL)
    );
  }
  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle("Kayıt Sistemi")
    .addField(`Ayarlanan Erkek Rolü:`, `${erkek}`)
    .addField(`Rolü Ayarlayan Yetkili:`, `<@${message.author.id}>`)
    .setDescription(`Erkek rolünü başarıyla ${erkek} olarak ayarlandı!`)
    .setFooter(bot.user.username, bot.user.avatarURL);
  message.channel.send(embed);

  db.set(`erkekrol_${message.guild.id}`, erkek.id);
};

module.exports.conf = {
  aliases: [],
  permLevel: 2,
  enabled: true,
  guildOnly: false,
  kategori: "moderasyon"
};

module.exports.help = {
  name: "erkek-rol-ayarla",
  description: "Erkek Rolü Ayarlarınız",
  usage: "erkek-rol-ayarla <@rol>"
};
