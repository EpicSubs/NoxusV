const Discord = require("discord.js");
const client = new Discord.Client();

exports.run = (client, message, args) => {
  if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
      .setColor(0xff0000)
      .setTimestamp()
      .setAuthor(message.author.username, message.author.avatarURL())
      .addField(
        ":warning: Uyarı :warning:",
        "ban adlı komutu özel mesajlarda kullanamazsın."
      );
    return message.author.send(ozelmesajuyari);
  }
  let guild = message.guild;
  let reason = args.slice(1).join(" ");
  let user = message.mentions.users.first();

  if (!args[0]) return message.channel.send("Kimi banlayacağını yazmalısın.");
  if (!reason) return message.reply("Ban sebebini yazmalısın.");

  message.guild.member(user).ban();

  const embed = new Discord.MessageEmbed()
    .setColor(0x00ae86)
    .setTimestamp()
    .addField("Eylem:", "Ban")
    .addField("Sebep", reason);

  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sg"],
  permLevel: 2
};

exports.help = {
  name: "ban",
  description: "İstediğiniz kişiyi banlar.",
  usage: "ban [kullanıcı] [sebep]"
};
