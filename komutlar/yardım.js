const Discord = require("discord.js");

exports.run = (client, message, args) => {
  let pages = [
    "**MODERASYON**\n <a:hypesquad:757932784949133433> n!uyar \n <a:hypesquad:757932784949133433> n!rolinfo <rolismi> \n <a:hypesquad:757932784949133433> n!ban \n <a:hypesquad:757932784949133433> n!kick \n <a:hypesquad:757932784949133433> n!modlog \n <a:hypesquad:757932784949133433> n!otorol \n <a:hypesquad:757932784949133433> n!otorol-mesaj \n <a:hypesquad:757932784949133433> n!otorol-kanal \n <a:hypesquad:757932784949133433> n!sayaç \n <a:hypesquad:757932784949133433> n!sayaç giriş mesaj \n <a:hypesquad:757932784949133433> n!sayaç çıkış mesaj \n <a:hypesquad:757932784949133433> n!küfür-engel \n <a:hypesquad:757932784949133433> n!capslock-engelleme \n <a:hypesquad:757932784949133433> n!erkek-rol-ayarla \n <a:hypesquad:757932784949133433> n!erkek \n <a:hypesquad:757932784949133433> n!bayan-rol-ayarla \n <a:hypesquad:757932784949133433> n!bayan",
    "**EĞLENCE**\n <a:hypesquad:757932784949133433> n!espri \n <a:hypesquad:757932784949133433> n!balıktut \n <a:hypesquad:757932784949133433> n!inek \n <a:hypesquad:757932784949133433> n!atasözü \n <a:hypesquad:757932784949133433> n!aşk-ölçer <@kullanıcı>",
    "**KULLANICI**\n <a:hypesquad:757932784949133433> n!afk \n <a:hypesquad:757932784949133433> n!avatar \n <a:hypesquad:757932784949133433> n!sa-as",
    "**BOT** \n <a:hypesquad:757932784949133433> n!istatistik \n <a:hypesquad:757932784949133433> n!ping \n <a:hypesquad:757932784949133433> n!yapımcım",
    "**KAYIT KOMUTLARI BAKIMDADIR**"
  ];
  let page = 1; //naptın ? knk bi dur mmm ekliyommmmmmmmmmmmmmmmemojiyi omekliy
  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setThumbnail(
      "https://cdn.discordapom/attachments/487719679868272689/488329963926192158/image0.png"
    )
    .setFooter(`Sayfa ${page} / ${pages.length}`)
    .setDescription(pages[page - 1]);
  message.channel.send(embed).then(msg => {
    msg.react("⬅").then(r => {
      msg.react("➡");

      //Filter
      const backwardsFilter = (reaction, user) =>
        reaction.emoji.name === "⬅" && user.id === message.author.id;
      const forwardsFilter = (reaction, user) =>
        reaction.emoji.name === "➡" && user.id === message.author.id;

      const backwards = msg.createReactionCollector(backwardsFilter, {
        time: 100000
      });
      const forwards = msg.createReactionCollector(forwardsFilter, {
        time: 100000
      });

      forwards.on("collect", r => {
        if (page === pages.length) return;
        page++;
        embed.setDescription(pages[page - 1]);
        embed.setColor("RANDOM");
        embed.setFooter(`Sayfa ${page} / ${pages.length}`);
        msg.edit(embed);
      });
      backwards.on("collect", r => {
        if (page === 1) return;
        page--;
        embed.setColor("RANDOM");
        embed.setDescription(pages[page - 1]);
        embed.setFooter(`Sayfa ${page} / ${pages.length}`);
        msg.edit(embed);
      });
    });
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["help", "y", "h"],
  permLevel: 0
};

exports.help = {
  name: "yardım",
  description: "Yardım Listesini Gösterir",
  usage: "yardım"
};
