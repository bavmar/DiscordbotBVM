const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    //!8ball <question>
    if(!args[2]) return message.reply("Please ask a full question.");
    let replies = [
        "It is certain.",
        "It is decidedly so.",
        "Without a doubt",
        "Yes – definitely",
        "You may rely on it.",
        "As I see it, yes.",
        "Most likely",
        "Outlook good",
        "Yes.",
        "Signs point to yes.",
        "Reply hazy, try again",
        "Ask again later",
        "Better not tell you now.",
        "Cannot predict now.",
        "Concentrate and ask again",
        "Don't count on it",
        "My reply is no.",
        "My sources say no.",
        "Outlook not so good",
        "Very doubtful",
        "Kennismeting",
        "You know it yourself.",
        "My advice is: Play with yourself",
        "I don't know",
        "Should be good",
        "Whatever",
        "Could you please repeat the question?",
        "Who cares?",
        "Not again."
    ]
    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(0).join(" ");

    let ballembed = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .setColor("#4ccfff")
    .addField("Question", question)
    .addField("Answer", replies[result])

    message.channel.send(ballembed);

}

module.exports.help = {
    name: "8ball"
}
