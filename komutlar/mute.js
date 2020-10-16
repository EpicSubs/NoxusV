const Discord = require("discord.js");
const ms = require("ms");
const ayarlar = require("../ayarlar.json");
const prefix = ayarlar.prefix;

var mutelirolu = "Mute"; //MUTELENDİGİ ZAMAN VERİLECEK ROLU  BURAYA YAZINIZ...

module.exports.run = (bot, message, args) => {
  let mutekisi = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  if (!mutekisi)
    return message.reply(
      `<a:emoji:754599471580446810> Lütfen bir kullanıcı etiketleyiniz! \nDoğru Kullanım; \`mute <@kullanıcı> <1sn/1dk/1sa/1g>\``
    );
  if (mutekisi.hasPermission("MANAGE_MESSAGES"))
    return message.reply(
      `<a:emoji:754599471580446810> Yetkili bir kişiyi muteleyemem! \nDoğru Kullanım; \`mute <@kullanıcı> <1sn/1dk/1sa/1g>\``
    );
  let muterol = message.guild.roles.cache.find(`name`, mutelirolu);
  if (!muterol) {
    try {
      muterol = message.guild.roles.create({
        name: mutelirolu,
        color: "#000000",
        permissions: []
      });
      message.guild.channels.cache.forEach(async (channel, id) => {
        channel.overwritePermissions(muterol, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
  }
  let mutezaman = args[1]
    .replace(`sn`, `s`)
    .replace(`dk`, `m`)
    .replace(`sa`, `h`)
    .replace(`g`, `d`);

  if (!mutezaman)
    return message.reply(
      `<a:emoji:754599471580446810> Lütfen bir zaman giriniz! \nDoğru Kullanım; \`mute <@kullanıcı> <1sn/1dk/1sa/1g>\``
    )(mutekisi.roles.add(muterol.id));
  message.reply(
    `<a:emoji:759035318556688405><@${mutekisi.id}> kullanıcısı ${
      args[1]
    } süresi boyunca mutelendi!`
  );

  setTimeout(function() {
    mutekisi.roles.remove(muterol.id);
    message.channel.send(
      `<a:emoji:759035318556688405><@${mutekisi.id}> kullanıcısının mutelenme süresi sona erdi!`
    );
  }, ms(mutezaman));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "mute",
  description: "Etiketlediğiniz kişiye belirttiğiniz süre kadar muteler.",
  usage: "mute @kullanıcı 1sn-1dk-1sa-1g"
};
