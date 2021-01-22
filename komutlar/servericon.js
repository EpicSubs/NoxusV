const Discord = require("discord.js");

exports.run = (client, message, params) => {
  
  let pp = message.guild.iconURL()
  if(!pp)return message.channel.send("Bu sunucunun resmi bulunmuyor.")
    const sunucubilgi = new Discord.MessageEmbed()
      .setTitle(message.guild.name)
      .setImage(`${message.guild.iconURL()}`);
if(pp)message.channel.send(sunucubilgi);
  
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