const Discord = require('discord.js')
const db = require('wio.db');

exports.run = async (client, message, args) => {
let otorol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
if(!otorol) {
  return message.channel.send(`Otorol için Etiket veya ID yaz.`);
}else{
  db.set(`${message.guild.id}.otorol`, otorol.id);
  message.channel.send(`Otorol başarıyla ayarlandı.`);
}

}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ["otorol"],
	permLevel: 4 

}

exports.help = {
	name: 'otorol',
	description: '.',
	usage: 'otorol'
}