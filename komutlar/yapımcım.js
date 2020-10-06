const Discord = require("discord.js");

const client = new Discord.Client();

exports.run = (client, message) => {
  if (message.channel.type !== "dm") {
    const noxus = new Discord.RichEmbed()
      .setAuthor(message.author.username)
      .setColor("GOLD")
      .setTimestamp()
      .addField(
        "**Yapımcım: **",
        `<@590847090205392896> <@749966727881687070>`
      );
    message.channel.sendEmbed(noxus);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yapımcım"],
  permLevel: 0
};

exports.help = {
  name: "yapımcım",
  description: "Yapımcıyı Gösterir.",
  usage: "prefix yapımcım"
};
