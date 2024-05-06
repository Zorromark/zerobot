// Updated userinfo.js

const { EmbedBuilder } = require("discord.js");

const command = {
  name: 'userinfo',
  description: 'Get information about a user.',
  execute: async function(message, mentionedUser) {
    const user = mentionedUser || message.author;

    let userToFind = message.mentions.users.first();
    if (!userToFind) {
      const userId = message.content.split(' ')[1];
      userToFind = message.guild.members.cache.get(userId);
    }

    const joinDateDiscord = userToFind.createdAt;
    const joinDateServer = message.guild.members.cache.get(userToFind.id).joinedAt;

    const userinfoEmbed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('User Information')
      .setDescription(`Username: ${userToFind.username}\nID: ${userToFind.id}`)
      .addFields(
        { name: 'Joined Discord', value: joinDateDiscord.toUTCString() },
        { name: 'Joined Server', value: joinDateServer.toUTCString() }
      )
      .setThumbnail(userToFind.displayAvatarURL({ dynamic: true }))
      .setTimestamp();

    message.channel.send({ embeds: [userinfoEmbed] });
  }
};

module.exports = command;
