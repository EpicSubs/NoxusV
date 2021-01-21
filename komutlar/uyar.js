const Discord = require("discord.js");
const client = new Discord.Client();
exports.run = (client, message, args) => {
  if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send('Bu komutu kullanmak için gerekli yetkiye sahip değilsin')
  if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
      .setColor(0xff0000)
      .setTimestamp()
      .setAuthor(message.author.username, message.author.avatarURL())
      .addField(
        ":warning: **Uyarı** :warning:",
        "`uyar` **adlı komutu özel mesajlarda kullanamazsın.**"
      );
    return message.author.send(ozelmesajuyari);
  }
  let guild = message.guild;
  let reason = args.slice(1).join(" ");
  let user = message.mentions.users.first();
  if (reason.length < 1)
    return message.reply("**Uyarı Sebebini Belirtmedin!**");
  if (message.mentions.users.size < 1)
    return message.reply("**Kimi Uyaracağını Yazmadın!**").catch(console.error);
  const embed = new Discord.MessageEmbed()
    .setColor(0x00ae86)
    .setTimestamp()
    .addField("Eylem:", "Uyarı verme")
    .addField("Kullanıcı:", `${user.username}#${user.discriminator}`)
    .addField(
      "Yetkili:",
      `${message.author.username}#${message.author.discriminator}`
    )
    .addField("Sebep", reason);
  return message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: "uyar",
  description: "İstediğiniz kişiyi uyarır.",
  usage: "uyar [kullanıcı] [sebep]"
};
