const { EmbedBuilder } = require("discord.js");

const command = {
  name: 'userinfo',
  description: 'Get information about a user.',
  execute: async function(message) {
    const user = message.author;

    const joinDateDiscord = user.createdAt;
    const joinDateServer = message.guild.members.cache.get(user.id).joinedAt;

    const userinfoEmbed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('User Information')
      .setDescription(`Username: ${user.username}\nID: ${user.id}`)
      .addFields(
        { name: 'Joined Discord', value: joinDateDiscord.toUTCString() },
        { name: 'Joined Server', value: joinDateServer.toUTCString() }
      )
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .setTimestamp();

    message.channel.send({ embeds: [userinfoEmbed] });
  }
};

module.exports = command;