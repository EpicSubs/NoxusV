const Discord = require("discord.js");
const client = new Discord.Client();
exports.run = function(client, message, args) {
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.reply("Bu Komutu Kullanmak İçin İzniniz Yok!");
  if (!args[0])
    return message.channel.send(
      "<:warning:495950887898841089> Lütfen Silinicek Mesaj Miktarını Yazın.!"
    );
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(` ${args[0]} Adet Mesajı Sildim. `);
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sil"],
  permLevel: 2
};

exports.help = {
  name: "sil",
  description: "Belirlenen miktarda mesajı siler.",
  usage: "sil <silinicek mesaj sayısı>"
};
