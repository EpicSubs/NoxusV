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
  return message.reply("Ban sebebini yazmalısın.");
  if (message.mentions.users.cache.size < 1)
    if (reason.length < 1)
      return message
        .reply("Kimi banlayacağını yazmalısın.")
        .catch(console.error);

  if (!message.guild.member(user).members.bannable)
    return message.reply("Yetkilileri banlayamam.");
  message.guild.members.ban(user, 2);

  const embed = new Discord.MessageEmbed()
    .setColor(0x00ae86)
    .setTimestamp()
    .addField("Eylem:", "Ban")
    .addField("Sebep", reason);
  let modlog = guild.channels.cache.find("mod-log", "mod-log");
  if (!modlog) return message.reply("mod-log kanalını bulamıyorum.");
  return guild.channels.cache.get(modlog.id).send(embed);
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
