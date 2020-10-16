const Discord = require("discord.js");

exports.run = (client, message, params) => {
  if (!message.guild) {
    const ozelmesajuyari = new Discord.MesageEmbed()
      .setColor(0xff0000)
      .setTimestamp()
      .setAuthor(message.author.username, message.author.avatarURL())
      .addField(
        ":warning: Uyarı :warning:",
        "`sunucuresmi` adlı komutu özel mesajlarda kullanamazsın."
      );
    return message.author.send(ozelmesajuyari);
  }
  if (message.channel.type !== "dm") {
    const sunucubilgi = new Discord.MessageEmbed()
      .setAuthor(message.guild.name)
      .setColor(3447003)
      .setTimestamp()
      .setDescription("")
      .setImage(`${message.guild.iconURL()} `);
    return message.channel.send(sunucubilgi);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sunucu-pp"],
  permLevel: 0
};

exports.help = {
  name: "sunucuresmi",
  description: "Sunucu Resminin Linkini Atar.",
  usage: "sunucuresmi"
};
