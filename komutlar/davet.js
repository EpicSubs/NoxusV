const Discord = require("discord.js");

exports.run = async (client, message) => {
  let prefix = "n!";

  const noxus = new Discord.MessageEmbed()

    .addField(
      "Noxus Botumuzu Sizde Sunucunuza Ekleyin",
      ` \n[📥 | Davet Et](https://discord.com/oauth2/authorize?client_id=757233280469827621&scope=bot&permissions=8)` +
        "**  **" +
        `\n[📨 | Destek Sunucusu](https://discord.gg/Q4ETV84)`,
      true
    ) // Bu Kısımlara URL Giriniz

    .setColor("ORANGE");

  return message.channel.send(noxus);
};

// FWHY

exports.conf = {
  enabled: true,

  guildOnly: false,

  aliases: [],

  permLevel: 0,

  kategori: `Geliştirici`
};

exports.help = {
  name: "davet",

  description: "Davet Linki Atar",

  usage: "davet"
};
