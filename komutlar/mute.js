const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermissions("KICK_MEMBERS"))
    return message.channel.send(
      "Komudu Kullanmak İçin Kick Members Yetkisine Sahip Olmalısın."
    );
  const mod = message.author;
  let user = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  if (!user) return message.channel.send(`:kirmizi: Kullanıcıyı Bulamıyorum`);
  let reason = message.content
    .split(" ")
    .slice(2)
    .join(" ");
  if (!reason)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setAuthor("Hata")
        .setDecription("Mute Sebebini Yazman Gerek")
        .setColor("RANDOM")
    );
  let muterole = message.guild.roles.cache.find(`name`, "Susturulmuş");
  if (!muterole) {
    try {
      muterole = await message.guild.roles.create({
        name: "Susturulmuş",
        color: "#000000",
        permissions: []
      });
      message.guild.channels.cache.cache.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
  }

  await user.roles.add(muterole.id);
  const muteembed = new Discord.MessageEmbed()
    .setAuthor("Eylem: Mute")
    .addField("Kullanıcı", `<@${user.id}>`)
    .addField("Sebep", `${reason}`)
    .addField("Moderatör", `${mod}`)
    .setColor("RANDOM");
  message.channel.send(muteembed);
};

exports.conf = {
  aliases: [],
  permLevel: 2
};

module.exports.help = {
  name: "mute",
  description: "Etiketlenen Kişiye Mute Atar",
  usage: "mute [kullanıcı] [sebep]"
};
