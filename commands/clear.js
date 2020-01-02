const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    //!clear <amount>
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("you don't have acces to do that.");
    if(!args[0]) return message.channel.send("``!clear <amount>``");
    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`Cleared ${args[0]} messages. command called by ${message.author}`).then(msg => msg.delete(5000));
    });
}

module.exports.help = {
    name: "clear"
}