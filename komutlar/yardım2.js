const Discord = require("discord.js");

exports.run = (client, message, args) => {
  message.author.avatarURL())
  .setDescription("")
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
  guildOnly: false,
  aliases: ["help", "y", "h"],
  permLevel: 0
};

exports.help = {
  name: "yardım",
  description: "Yardım Listesini Gösterir",
  usage: "yardım"
};
