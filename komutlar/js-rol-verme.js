const Discord = require("discord.js");

exports.run = function(client, message) {
  var role = message.guild.roles.get(role => role.id === "761160248874500097"); // JS Rolünün ID sini yaziniz
  if (message.member.roles.has(role.id))//noxys botlist bak
    return message.channel.send("⛔ Zaten bu role sahipsin :/");
  message.member.roles.add(role);
  message.channel.send(`✅ JavaScript rolü başarıyla verildi :)`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["discord.js", "javascript"],
  permLevel: 0
};

exports.help = {
  name: "js",
  description: "JavaScript kanallarına erişim sağlar.",
  usage: "js"
};
