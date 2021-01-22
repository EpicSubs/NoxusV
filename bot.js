const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "Bot Başarı İle Aktif Edildi");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  //dokunma al
  http.get(`http://jewel-boatneck-duck.glitch.me/`);
}, 280000);

const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const Canvas = require("canvas"),
  Image = Canvas.Image,
  Font = Canvas.Font,
  path = require("path");
const snekfetch = require("snekfetch");
const fs = require("fs");
const DBL = require("dblapi.js");
const YouTube = require("simple-youtube-api");
const queue = new Map();
const ytdl = require("ytdl-core");
const generator = require("generate-password");
const math = require("math-expression-evaluator");
const db = require("wio.db");
const moment = require("moment");
const ms = require("parse-ms");
const GIFEncoder = require("gifencoder");
require("moment-duration-format");
require("./util/eventLoader")(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

////////KOMUTLAR BURDAN SONRA

client.login(ayarlar.token);
//-------------—------------—---—————-------KOMUTLAR-----------------------------------------//
//glitch.com/edit/#!/join/6db097ce-066e-4ffa-a
client.on("message", async (msg, member, guild) => {
  let i = await db.fetch(`saas_${msg.guild.id}`);
  if (i === "açık") {
    if (msg.content.toLowerCase() === "sa") {
      msg.reply("Aleyküm Selam, Hoşgeldin ");
    }
  }
});

client.on("message", async (msg, member, guild) => {
  let i = await db.fetch(`saas_${msg.guild.id}`);
  if (i === "açık") {
    if (msg.content.toLowerCase() === "hi") {
      msg.reply("Hi welcome ");
    }
  }
});
client.on("message", async msg => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return;

  let i = await db.fetch(`reklamFiltre_${msg.guild.id}`);
  if (i == "acik") {
    const reklam = [
      "discord.app",
      "discord.gg",
      "invite",
      "discordapp",
      "discordgg",
      ".com",
      ".net",
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".org",
      ".com.tr",
      ".biz",
      ".party",
      ".rf.gd",
      ".az"
    ];
    if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
      try {
        if (!msg.member.hasPermission("ADMINISTRATOR")) {
          msg.delete();
          let embed = new Discord.MessageEmbed()
            .setColor(0xffa300)
            .setFooter("Reklam engellendi.", client.user.avatarURL())
            .setAuthor(
              msg.guild.owner.user.username,
              msg.guild.owner.user.avatarURL()
            )
            .setDescription(
              "Reklam sistemi, " +
                `***${msg.guild.name}***` +
                " adlı sunucunuzda reklam yakaladım."
            )
            .addField(
              "Reklamı yapan kişi",
              "Kullanıcı: " + msg.author.tag + "\nID: " + msg.author.id,
              true
            )
            .addField("Engellenen mesaj", msg.content, true)
            .setTimestamp();
          msg.guild.owner.user.send(embed);
          return msg.channel
            .send(`${msg.author.tag}, Reklam Yapmak Yasak Bunu Biliyorsun.`)
            .then(msg => msg.delete(25000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});

client.on("message", async msg => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return;

  let i = await db.fetch(`küfürFiltre_${msg.guild.id}`);
  if (i == "acik") {
    const küfür = [
      "amk",
      "amq",
      "orospu",
      "piç",
      "pıç",
      "göt",
      "got",
      "sg",
      "aq",
      "AMK",
      "AMQ",
      "OROSPU",
      "PİÇ"
    ];
    if (küfür.some(word => msg.content.toLowerCase().includes(word))) {
      try {
        if (!msg.member.hasPermission("ADMINISTRATOR")) {
          msg.delete();
          let embed = new Discord.MessageEmbed()
            .setColor(0xffa300)
            .setFooter("  Küfür Engel.", client.user.avatarURL())
            .setAuthor(
              msg.guild.owner.user.username,
              msg.guild.owner.user.avatarURL()
            )
            .setDescription(
              "Küfür sistemi " +
                `***${msg.guild.name}***` +
                " adlı sunucunuzda küfür yakaladım."
            )
            .addField(
              "Küfür eden kişi",
              "Kullanıcı: " + msg.author.tag + "\nID: " + msg.author.id,
              true
            )
            .addField("Engellenen mesaj", msg.content, true)
            .setTimestamp();
          msg.guild.owner.user.send(embed);
          return msg.channel
            .send(`${msg.author.tag}, Küfür Etmek Yasak Bunu Biliyorsun.`)
            .then(msg => msg.delete(25000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});
client.on("guildMemberRemove", async member => {
  let sayac = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let otorole = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let arole = otorole[member.guild.id].sayi;
  let giriscikis = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let embed = new Discord.MessageEmbed()
    .setTitle("Otorol Sistemi")
    .setDescription(`**${member.user.tag}** Güle güle !!! Neden gittin ki ?  `)
    .setColor("GREEN")
    .setFooter("Harmony", client.user.avatarURL());

  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds
      .get(member.guild.id)
      .channels.cache.get(giriscikiskanalID);
    giriscikiskanali.send(
      `**${member.user.tag}** Güle güle !!! Neden gittin ki ? `
    );
  } catch (e) {
    // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e);
  }
});

client.on("guildMemberAdd", async member => {
  let autorole = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let role = autorole[member.guild.id].sayi;

  member.roles.add(role);
});
//----------------Projeyi Aktif Tutma----------------\\
const server = http
  .createServer((req, res) => {
    if (req.url == "/uptime") {
      res.write(
        `KemerBey Uptime Hizmetleri LTD. ŞTD. İNT. Tüm hakları saklıdır. Çalan olursa çalsın umrumda değil.`
      );
      console.log("a request accepted.");
      res.end();
    }
  })
  .listen(8000);
client.on("guildCreate", async function(guild) {
  const owner = client.users.cache.get(guild.ownerID);
  const kanal = "782250112294060063"; //Eklendim mesajının atılacağı kanal ID'sini giriniz.
  const henor = new Discord.MessageEmbed()
    .setTitle(`Yeni bir sunucuya eklendim`)
    .setColor("BLACK")
    .addField(`Sunucu Adı`, guild.name)
    .addField(`Sunucu Sahibi`, owner.username + "#" + owner.discriminator)
    .addField(`Sunucu Üye Sayısı`, guild.memberCount);
  client.channels.cache
    .get(kanal)
    .send({ embed: henor })
    .catch(err => console.log("Kanala mesaj atamıyorum!"));
});
//

//Atıldım
client.on("guildDelete", async function(guild) {
  const owner = client.users.cache.get(guild.ownerID);
  const kanal = "782250112294060063"; //Atıldım mesajının atılacağı kanal ID'sini giriniz.
  const henor = new Discord.MessageEmbed()
    .setTitle(`Bir sunucudan atıldım`)
    .setColor("BLACK")
    .addField(`**Sunucu Adı**`, guild.name)
    .addField(`*Sunucu Sahibi*`, owner.username + "#" + owner.discriminator)
    .addField(`**Sunucu Üye Sayısı**`, guild.memberCount);
  client.channels.cache
    .get(kanal)
    .send({ embed: henor })
    .catch(err => console.log("Kanala mesaj atamıyorum!"));
});

client.on("ready", () => {
  const moment = require("moment");
  require("moment-duration-format");

  setInterval(() => {
    const calismasure = moment
      .duration(client.uptime)
      .format(" D [gün], H [saat], m [dakika], s [saniye]");
    let botdurum = client.channels.cache.find(c => c.id === "795930063362981890"); //Botun sürekli mesaj atacağı kanal.
    const botistatistik = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle("= Bot İstatistikleri :blush: ="

      .addField(
        `RAM`,
        `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/512mb`
      )
      .addField(`Çalışma Süresi`, `${calismasure}`)
      .addField(`Ping`, `${client.ws.ping}`)
      .addField(`discord.js`, `v${Discord.version}`)
      .addField(
        `Bilgi`,
        `${client.guilds.cache.size.toLocaleString()} sunucu ve ${
          client.users.array().length
        } kullanıcıya hizmet veriyor.`
      )
      .setTimestamp()
      .setFooter("CNSLink", "https://www.canes.cf/images/caneslogo.png");
    botdurum.send(botistatistik);
  }, 600000);
});