const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    //!addrole @user <Role>
    if(!message.member.hasPermission("MANAGE_MEMBERS")) {
        return message.channel.send("No can do pal!");
    } 
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!rMember) return message.channel.send("Couldn't find that user!");
    let role = args.join(" ").slice(22);
    if(!role) return message.channel.send("!addrole @user <role>");
    let gRole = message.guild.roles.find(`name`, role);
    if(!gRole) return message.channel.send("Couldn't find the role.");

    if(rMember.roles.has(gRole.id)) return message.reply("They already have that role!.");
    await(rMember.addRole(gRole.id));
    let shoutoutchannel = message.guild.channels.find(`name`, "shoutouts");
        message.channel.send(`Congrats to <@${rMember.id}>, they have achieved the role **${gRole.name}**.`);
        shoutoutchannel.send(`Congrats to <@${rMember.id}>, they have achieved the role **${gRole.name}**.`);
}

module.exports.help = {
    name: "addrole"
}