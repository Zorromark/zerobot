const Discord = require('discord.js');
const { Client, Permissions, GatewayIntentBits } = Discord;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on('messageCreate', async (message) => {
    if (message.content.startsWith('r!kick')) {
        if (!message.member.permissions.has('KICK_MEMBERS')) {
            message.reply({ content: 'You do not have permission to kick members.' });
            return;
        }

        const memberToKick = message.mentions.members.first();

        if (memberToKick) {
            memberToKick.kick()
                .then((kickedMember) => {
                    message.reply({ content: `Successfully kicked ${kickedMember.user.tag} from the server.` });
                })
                .catch((error) => {
                    console.error(error);
                    message.reply({ content: 'Failed to kick the member.' });
                });
        } else {
            message.reply({ content: 'Please mention a valid member to kick.' });
        }
    }
});

client.login(process.env.token);
