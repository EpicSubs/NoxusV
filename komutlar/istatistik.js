const Discord = require("discord.js");

const moment = require("moment");

const ayarlar = require("../ayarlar.json");

require("moment-duration-format");

exports.run = async (client, message, args) => {
  let noxus = new Discord.MessageEmbed()

    .setThumbnail(message.author.displayAvatarURL())

    .setAuthor(client.user.username, client.user.avatarURL)

    .addField(
      "Veriler",
      `Toplam sunucu: **${
        client.guilds.cache.size
      }** \nToplam kullanıcı: **${client.guilds.cache
        .reduce((a, b) => a + b.memberCount, 0)
        .toLocaleString()}** \nToplam kanal: **${client.channels.cache.size}**`
    )

    .addField(
      "Bot Geliştiricisi",
      `Bot geliştiricisi ➡ <@749966727881687070> \n Bot geliştiricisi ➡ <@590847090205392896> `
    )

    .addField(
      "Sürümler",
      `Discord.js sürümü: **v${Discord.version}** \nNode.js sürümü: **${process.version}**`
    )

    .addField(
      "Gecikmeler",
      `Bot pingi: **${
        client.ws.ping
      }** \nMesaj gecikmesi: **${new Date().getTime() -
        message.createdTimestamp}**`
    )

    .setTimestamp()

    .setColor("RANDOM");

  message.channel.send(noxus);
};

exports.conf = {
  enabled: true,

  guildOnly: false,

  permLevel: 0,

  aliases: ["istatistik", "i"]
};

exports.help = {
  name: "istatistik",

  description: "Türkiyenin Saatini Gösterir",

  usage: "gç"
};

//Coder By Onur
