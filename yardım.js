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
    aliases: ["yardım"],
    permLevel: 0
  };

  exports.help = {
    name: "yardım",
    description: "Yardım Listesini Gösterir",
    usage: "yardım"
  };
};
