const Discord = require("discord.js");

exports.run = (client, message, args) => {
  if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
      .setColor(0x2488e7)
      .setTimestamp()
      .setAuthor(message.author.username, message.author.avatarURL())
      .addField("Selamun Aleyküm");
  }
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["help", "y", "h"],
    permLevel: 0
  };

  exports.help = {
    name: "yardımü",
    description: "Yardım Listesini Gösterir",
    usage: "yardımü"
  };
};
