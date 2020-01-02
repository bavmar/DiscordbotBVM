const Discord = require("discord.js")
const moment = require('moment');

module.exports.run = async (client, message, args) => {
    //!kick @user reason
        
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Can't find user!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You cant kick people.");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    //Format
    let format = moment().format('HH:mm DD-MM-YYYY');
    let memberKickedAt = moment(message.createdAt).format(format);

    let kickEmbed = new Discord.RichEmbed()
    .setColor("#e56b00")
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Time", memberKickedAt)
    .addField("Reason", kReason);

    let kickChannel = message.guild.channels.find(`name`, "kicks");
    if(!kickChannel) return message.channel.send("Can't find incidents channel.");
    kUser.send("**You have been kicked from BvmDevelopment**. Remember that you still have 1 chance to join back.");
    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    return;
}

module.exports.help = {
    name: "kick"
}