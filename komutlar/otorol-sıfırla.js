//SYNX KOD PAYLAŞIM
const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (client, message, args) => {
  let sunucuyaözelayarlarOtorol = JSON.parse(
    fs.readFileSync("./otorol.json", "utf8")
  );
  let otorolkapat = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  if (!sunucuyaözelayarlarOtorol[message.guild.id]) {
    const embed = new Discord.MessageEmbed()
      .setDescription(`**Otorol Ayarlı Olmadığı İçin Kapatamam.**`)
      .setColor("RED")
      .setTimestamp(
        "**Ayarlamak İçin n!otorol-ayarla `@rol `#kanal` Yazmalısın.**! "
      );
    message.channel.send({ embed });
    return;
  }
  delete sunucuyaözelayarlarOtorol[message.guild.id];
  fs.writeFile(
    "./otorol.json",
    JSON.stringify(sunucuyaözelayarlarOtorol),
    err => {
      console.log(err);
    }
  );
  const embed = new Discord.MessageEmbed()
    .setDescription(`**Otorol Başarılı Bir Şekilde Kapatılmıştır.** `)
    .setColor("RANDOM")
    .setTimestamp();
  message.channel.send({ embed });
  return;
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["otorolsıfırla", "kapat otorol"],
  permLevel: 0
};

exports.help = {
  name: "otorol-kapat",
  description: "Otorol Kapatır",
  usage: "otorolkapat"
};
