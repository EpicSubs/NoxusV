const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("wio.db");
exports.run = async (client, message, args) => {
   if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      ` Bu komudu kullanabilmek için "ADMINISTRATOR" yetkisine sahip olman gerek.`
    );
  let Henor = message.mentions.users.first();
  let sebep = args.slice(1).join(" ");

  if (!Henor) {
    const Ottoman = new Discord.MessageEmbed().setDescription(
      "Kimi Kickleyeceğini Yazmalısın!"
    );
    return message.channel.send(Ottoman);
  }

  if (Henor.id === client.user.id) {
    const Henor1 = new Discord.MessageEmbed().setDescription(
      "Kendi Komutumla Benimi Vurcaktın"
    );
    return message.channel.send(Henor1);
  }
  if (Henor.id === message.author.id) {
    const Henor2 = new Discord.MessageEmbed().setDescription(
      "Dostum Kendini Kickleyemezssin!"
    );
    return message.channel.send(Henor2);
  }

  if (!sebep) {
    const Henor3 = new Discord.MessageEmbed().setDescription(
      "Bir Sebep Belirtmelisin!"
    );
    return message.channel.send(Henor3);
  }

  message.guild.member(Henor).kick();
  const Henor4 = new Discord.MessageEmbed().setDescription(
    `${Henor} adlı kişi başarıyla ${sebep} sebebinden dolayı ${message.auhtor.tag} tarafından sunucudan Uçuruldu!`
  );
  return message.channel.send(Henor4);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2
};
exports.help = {
  name: "kicks"
};
