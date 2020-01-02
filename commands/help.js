const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
   
    let HelpEmbed = new Discord.RichEmbed()
    .setDescription("**Commands**")
    .setColor("#4ccfff")
    .setThumbnail(message.guild.iconURL)
    .addField("``!kick @user <reason>``", "!kick @Userz321 he has violated the rules!")
    .addField("``!ban @user <reason>``", "!ban @Userz321 he has violated the rules very badly!")
    .addField("``!addrole @user <role>``", "!addrole @Userz321 LEGEND")
    .addField("``!removerole @user <role>``", "!removerole @Userz321 LEGEND")
    .addField("``!clear <amount>``", "!clear 5")

    return message.channel.send(HelpEmbed);
}

module.exports.help = {
    name: "help"
}