const Discord = require("discord.js")
const moment = require('moment');

module.exports.run = async (client, message, args) => {
    //Roles
    let adminRole = message.guild.roles.find(`name`, "Admin");
    let ModeratorRole = message.guild.roles.find(`name`, "Moderator");
    let TrialModRole = message.guild.roles.find(`name`, "Trial Moderator");
    let BotRole = message.guild.roles.find(`name`, "BOT");

    //Filters
    let onlineUsers = message.guild.members.filter(member => member.presence.status == "online").size;
    let onlineModerators = message.guild.members.filter(member => member.presence.status == "online" && member.roles.has(ModeratorRole.id) || member.roles.has(TrialModRole.id)).size;
    let onlineAdmins = message.guild.members.filter(member => member.presence.status == "online" && member.roles.has(adminRole.id)).size;
    let onlineBots = message.guild.members.filter(member => member.presence.status == "online" && member.roles.has(BotRole.id)).size;

    let serverIcon = message.guild.iconURL;
    let startDate = (message.guild.createdAt);


    //Format
    let format = moment().format('HH:mm DD-MM-YYYY');
    let startResult = moment(startDate, format).fromNow();

    let serverEmbed = new Discord.RichEmbed()
    .setDescription("**Server Information**")
    .setColor("#4ccfff")
    .setThumbnail(serverIcon)
    .addField("Server name", message.guild.name)
    .addField("Created", startResult)
    .addField("Total Members", message.guild.memberCount)
    .addField("Members Online", onlineUsers)
    .addField("Admins Online", onlineAdmins)
    .addField("Moderators Online", onlineModerators)
    .addField("Bot online?", "Yes")
    .addField("Servers online?", "Yes");

    return message.channel.send(serverEmbed);
}

module.exports.help = {
    name: "serverinfo"
}