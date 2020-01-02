const Discord = require("discord.js")
const moment = require('moment');
module.exports.run = async (client, message, args) => {
    //!ban @user reason
    let incidentchannel = message.guild.channels.find(`name`, "bans");
    if(!incidentchannel) return channel.send("Can't find incidents channel.");
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Can't find user!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("No can do pal!");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    //Format
    let format = moment().format('HH:mm DD-MM-YYYY');
    let memberBannedAt = moment(message.createdAt).format(format);

    bUser.send("You have been banned from **BvmDevelopment**. You have done things that are not allowed. **Dont try to go on another account because the ban is an IP-ban** Go to this link to fill in a form why you think you should unbanned. **https://www.youwontgetunbanned.com**");
    message.guild.member(bUser).ban(bReason);
    let banEmbed = new Discord.RichEmbed()
    .setColor("#bc0000")
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", memberBannedAt)
    .addField("Reason", bReason);

    incidentchannel.send(banEmbed);
    return;
}

module.exports.help = {
    name: "ban"
}