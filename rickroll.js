const Discord = require('discord.js');
const { EmbedBuilder } = Discord;

function execute(message) {
  if (message.content === 'r!rickroll') {
    const rickrollEmbed = new EmbedBuilder()
      .setTitle("You've been Rickrolled!")
      .setDescription("Never gonna give you up, never gonna let you down lol")
      .setImage("https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmkzNTZmeWdjOXVoOGVkbzBpenVreHRrNnZ3cXZmdmdoMGRwMGt2cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/g7GKcSzwQfugw/giphy.gif")

      .setColor('#ff0000');
    message.channel.send({ embeds: [rickrollEmbed] });
  }
}

module.exports = { execute };

