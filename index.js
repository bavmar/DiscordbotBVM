const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client({disableEveryone: true});
const moment = require('moment');
const emojiCharacters = require('./emojiCharacters');
client.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0) {
        console.log("could't find commands");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        client.commands.set(props.help.name, props);
    })
})

client.on("ready", async () => {
    console.log(`${client.user.username} is active!`);
    client.user.setActivity("over you..", {type: "WATCHING"});
});
client.on("message", async message => {
    //Moet bot zijn
    if(message.author.bot) return;
    //Moet geen Directe message zijn
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = client.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(client,message,args);

    //React by whishlist channels
    if(message.channel.id === '441724504381587476' || message.channel.id === '457999593318383616' || message.channel.id === '462940450140061699' ) {
        message.react("👍").then(() => {
        message.react("👎");
        });
    }
    //React with polls
    if(message.channel.id === '441987844236378124') {
        //Als poll geen nummers heeft.
        if(!message.content.includes(emojiCharacters[2]) 
        && !message.content.includes(emojiCharacters[3])
        && !message.content.includes(emojiCharacters[4])
        && !message.content.includes(emojiCharacters[5])
        && !message.content.includes(emojiCharacters[6])
        && !message.content.includes(emojiCharacters[7]
        )) {
            message.react("👍").then(() => {
            message.react("👎");
            });
        }
        //Poll of 2
        if(message.content.includes(emojiCharacters[2]) && !message.content.includes(emojiCharacters[3])) {
            message.react(emojiCharacters[1]).then(() => {
            message.react(emojiCharacters[2]);
        }); 
        }
        //Poll of 3
        if(message.content.includes(emojiCharacters[3]) && !message.content.includes(emojiCharacters[4])) {
            message.react(emojiCharacters[1]).then(() => {
            message.react(emojiCharacters[2]).then(() => {
            message.react(emojiCharacters[3]);  
        });
        });
        }
        //Poll of 4
        if(message.content.includes(emojiCharacters[4]) && !message.content.includes(emojiCharacters[5])) {
            message.react(emojiCharacters[1]).then(() => {
            message.react(emojiCharacters[2]).then(() => {
            message.react(emojiCharacters[3]).then(() => {
            message.react(emojiCharacters[4]);  
        });
        });
        });
        }
        //Poll of 5
        if(message.content.includes(emojiCharacters[5]) && !message.content.includes(emojiCharacters[6])) {
            message.react(emojiCharacters[1]).then(() => {
            message.react(emojiCharacters[2]).then(() => {
            message.react(emojiCharacters[3]).then(() => {
            message.react(emojiCharacters[4]).then(() => {
            message.react(emojiCharacters[5]);
        });
        });
        });
        });
        }
        //Poll of 6
        if(message.content.includes(emojiCharacters[6])) {
            message.react(emojiCharacters[1]).then(() => {
            message.react(emojiCharacters[2]).then(() => {
            message.react(emojiCharacters[3]).then(() => {
            message.react(emojiCharacters[4]).then(() => {
            message.react(emojiCharacters[5]).then(() => {
            message.react(emojiCharacters[6]);   
        });
        });
        });
        });
        });
        }
        
    }

    //Serverinfo Update
    //Channel
    let serverinfoChannel = message.guild.channels.find(`name`, "server-info");
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
    .addField("Servers online?", "Yes")
    .setFooter("This message is updated every few seconds.");
        
    serverinfoChannel.bulkDelete(1).then(() => {
        serverinfoChannel.send(serverEmbed); 
    });

});
//Als een user erbij komt
client.on("guildMemberAdd", async member => {
    let welcomeChannel = member.guild.channels.find(`name`, "welcome-leave");
    member.send(":wave::skin-tone-1:");
    member.send("Welcome to **BvmDevelopment** " + member.user.username);

    let format = moment().format('HH:mm DD-MM-YY');
    let memberJoinedAt = moment(member.joinedAt).format(format);

    let welcomeEmbed = new Discord.RichEmbed()
    .setDescription(`:inbox_tray: **New user has joined!**`)
    .setColor("#4ccfff")
    .setThumbnail(member.displayAvatarURL)
    .addField("Username", `${member}`)
    .addField("Joined at", memberJoinedAt);

    welcomeChannel.send(welcomeEmbed);
    });
//Als een user weg gaat
client.on("guildMemberRemove", async member => {
    let welcomeChannel = member.guild.channels.find(`name`, "welcome-leave");

    let format = moment().format('HH:mm DD-MM-YY');
    let memberLeftAt = moment(member.joinedAt).format(format);

        let byeEmbed = new Discord.RichEmbed()
        .setDescription(`:outbox_tray: **User left**`)
        .setColor("#4ccfff")
        .setThumbnail(member.displayAvatarURL)
        .addField("Username", `${member}`)
        .addField(`Left at`, memberLeftAt);
        welcomeChannel.send(byeEmbed);
});
//If user gets deleted
client.on("messageDelete", async message => { 
        let deleteChannel = message.guild.channels.find(`name`, "deletes");

        let DeleteEmbed = new Discord.RichEmbed()
        .setColor("#4ccfff")
        .addField("Message deleted from User", `${message.author} with ID ${message.author.id}`)
        .addField("Message content:", message.content)
        .addField("Message deleted By", `${message.author} with ID ${message.author.id}`)
        deleteChannel.send(DeleteEmbed);
});
//Ban
client.on("guildBanRemove", async (guild, user) =>  {
    let incidentchannel = guild.channels.find(`name`, "bans");
    let BanRemoveEmbed = new Discord.RichEmbed() 
    .setColor("#bc0000")
    .addField("Unbanned user", `**@${user.username}** with ID **${user.id}**`)
    .setFooter("This is very rare, we usually ban people that have really crossed the line.");

    incidentchannel.send(BanRemoveEmbed);
});

client.login(botconfig.token);
