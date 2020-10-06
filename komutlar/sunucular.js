const Discord = require("discord.js");
exports.run = (client, msg, args) => {
  msg.channel.send(
    "Ben şu an ${client.guilds.size} sunucuda ${client.users.size} kullanıcı ile sana hizmet veriyorum!"
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: "sunucular",
  description: "Botun bulunduğu sunucuları gösterir.",
  usage: "sunucular"
};
