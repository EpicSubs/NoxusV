const Discord = require("discord.js");
const db = require("wio.db");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      ` Bu komudu kullanabilmek için "ADMINISTRATOR" yetkisine sahip olman gerek.`
    );
  if (!args[0])
    return message.channel.send(
      `:no_entry: Küfür Filtresini Ayarlamak İçin \`-küfür-engel aç\` | Kapatmak İstiyorsanız \`-küfür-engel kapat\` Yazabilirsiniz`
    );
  if (args[0] !== "aç" && args[0] !== "kapat")
    return message.channel.send(
      `:no_entry: Küfür Filtresini Ayarlamak İçin \`-küfür-engel aç\` | Kapatmak İstiyorsanız \`-küfür-engel  kapat\` Yazabilirsiniz`
    );

  if (args[0] == "aç") {
    db.set(`küfürFiltre_${message.guild.id}`, "acik");
    let i = await db.fetch(`reklamFiltre_${message.guild.id}`);
    message.channel.send(
      `Küfür Filtresi başarıyla aktifleştirildi :white_check_mark:`
    );
  }

  if (args[0] == "kapat") {
    db.delete(`küfürFiltre_${message.guild.id}`);

    message.channel.send(
      `Küfür Filtresi Başarıyla Kapatıldı :white_check_mark:`
    );
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["küfür-engel"],
  permLevel: 0
};

exports.help = {
  name: "küfür-engel",
  description: "reklamm",
  usage: "s$$kanal"
};
