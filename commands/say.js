const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    //!say <message>
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("you don't have acces to do that.");
    let botmessage = args.join(" ");
    message.delete().catch();
    message.channel.send(botmessage);
}

module.exports.help = {
    name: "say"
}