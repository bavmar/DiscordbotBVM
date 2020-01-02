const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    let botIcon = client.user.displayAvatarURL;
    let botEmbed = new Discord.RichEmbed()
    .setDescription("**Bot Information**")
    .setColor("#4ccfff")
    .setThumbnail(botIcon)
    .addField("Bot Name", client.user.username)
    .addField("Created On", client.user.createdAt);

    return message.channel.send(botEmbed);
}

module.exports.help = {
    name: "botinfo"
}