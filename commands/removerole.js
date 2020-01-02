const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    //!removerole @user <Role>
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("No can do pal!");
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!rMember) return message.reply("Couldn't find that user!");
    let role = args.join(" ").slice(22);
    if(!role) return message.reply("!addrole @user <role>");
    let gRole = message.guild.roles.find(`name`, role);
    if(!gRole) return message.reply("Couldn't find the role.");

    if(!rMember.roles.has(gRole.id)) return message.reply("They don't have that role");
    await(rMember.removeRole(gRole.id));
    let shoutoutchannel = message.guild.channels.find(`name`, "shoutouts");
        message.channel.send(`The role **${gRole.name}** from <@${rMember.id}> has been removed.`);
}

module.exports.help = {
    name: "removerole"
}