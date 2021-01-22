const Discord = require("discord.js");

exports.run = (client, message, params) => {
  
    const sunucubilgi = new Discord.MessageEmbed()
      .setTitle(message.guild.name)
      .setImage(`${message.guild.iconURL()}`);
message.channel.send(sunucubilgi);
  }


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