const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (!message.guild)
    return message.author.send(
      "Bu Komutu Sadece Sunucularda Kulanabilirsiniz!"
    );

  const voiceChannels = message.guild.channels.cache.filter(
    c => c.type === "voice"
  );
  let count = 0;
  for (const [id, voiceChannel] of voiceChannels)
    count += voiceChannel.members.size;
  let tag = "TAG ADI";
  let botlar = message.guild.members.cache.filter(m => m.user.bot).size;
  const bruh = new Discord.MessageEmbed()
    .setColor("RED")
    .setTitle(`Say Sistemi`)
    .addField("Sunucudaki üye sayısı", message.guild.memberCount)
    .addField(
      "Çevrimiçi üye sayısı",
      message.guild.members.cache.filter(
        m => !m.user.bot && m.user.presence.status !== "offline"
      ).size
    )
    .addField("Seslideki üye sayısı", count)
    .addField(
      "Kişi",
      `Çevrimiçi : **${
        message.guild.members.cache.filter(o => o.presence.status === "online")
          .size
      }** \n Rahatsız Etmeyin : **${
        message.guild.members.cache.filter(dnd => dnd.presence.status === "dnd")
          .size
      }** \n Boşta: **${
        message.guild.members.cache.filter(i => i.presence.status === "idle")
          .size
      }** \n Görünmez/Çevrimdışı : **${
        message.guild.members.cache.filter(
          off => off.presence.status === "offline"
        ).size
      }** \n Botlar : **${botlar}**`
    );
  message.channel.send(bruh);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sayı"],
  permLevel: 0
};

exports.help = {
  name: "say",
  description: "Say",
  usage: "say"
};
