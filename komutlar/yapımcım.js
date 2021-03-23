const Discord = require("discord.js");

const client = new Discord.Client();

exports.run = (client, message) => {
  if (message.channel.type !== "dm") {
    const noxus = new Discord.MessageEmbed()
      .setAuthor(message.author.username)
      .setColor("GOLD")
      .setTimestamp()
      .addField(
        "**Yapımcılarım: **",
        `<@813352032919617616> | <@749966727881687070>(BIRAKTI) | <@747502749041688688>`
      );
    message.channel.send(noxus);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yapımcımlarım"],
  permLevel: 0
};

exports.help = {
  name: "yapımcılarım",
  description: "Yapımcıyı Gösterir.",
  usage: "prefix yapımcılarım"
};
