module.exports = {
  name: "mesaj",
  cooldown: 5,
  guildOnly: true,
  permission: "MANAGE_MESSAGES",
  execute(client, message, params, perms, Discord){
  
    const channel = message.mentions.channels.first();
    if(!channel) return message.channel.send(Embed("","Lütfen Bir Kanal Etiketleyiniz","info"));
    
    const text = args.splice(1, args.lenght-1).join(" ");
    if (!text) return message.channel.send(Embed("","Lütfen Bir Mesaj Giriniz","info"));
    
    channel.send(text);