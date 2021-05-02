const Discord = require('discord.js')
const db = require('wio.db');

exports.run = async (client, message, args) => {
let prefix = args.slice(0).join(" ")
if(!prefix) {
  message.channel.send(`Geçerli prefix girin.`)
  return false;
}else{
  db.set(`${message.guild.id}.prefix`, prefix)
  message.channel.send(`Yeni prefix ayarlandı.`)
  return true;
}

}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: 3 // gerekli yetkiyi ayarlayın.

}

exports.help = {
	name: 'prefix-ayarla',
	description: '.',
	usage: 'prefix-ayarla'
}
