const Discord = require('discord.js');
const { Client, GatewayIntentBits, ActivityType, MessageEmbed, Embuilder } = require('discord.js');
require('dotenv/config');
const userinfo = require('./userinfo.js');
const rickrollCommand = require('./rickroll.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on('error', (error) => {
    console.error('An error occurred:', error);
});

client.commands = new Map();

client.on('ready', () => {
    console.log('Bot is ready to rick and roll');
    client.user.setStatus('available');
    client.user.setActivity('r!help', { type: ActivityType.Playing });
});


const canvacord = require ("canvacord")

client.on('guildMemberAdd', async member => {
  const welcome = new canvacord.Welcomer()
  .setUsername(member.user.username)
  .setAvatar(member.user.displayAvatarURL({format: "png"}))
  .setColor("title", "#ffffff")
  .setBackground("https://images-ext-1.discordapp.net/external/LtGt6J7yli4cbNLlgVwdwKx8Jxs1C8kU4-M2n11xcps/%3Fsize%3D626%26ext%3Djpg/https/img.freepik.com/free-photo/illustration-cosmic-background-with-orange-neon-laser-lights_181624-19567.jpg?format=webp")
  .setMemberCount(member.guild.memberCount)
  let attachment = new Discord.AttachmentBuilder(await welcome.build(), "welcome.png")
  const welcomeEmbed = new Discord.EmbedBuilder()
    .setColor("#0099ff")
    .setTitle("Welcome to the server!")
    .setDescription(`Welcome ${member.user} to the server!`)
    .setImage("attachment://welcome.png");

  member.guild.channels.cache.get("1138967181162467420").send({ embeds: [welcomeEmbed], files: [attachment] });
});


function serverInfo(guild){
    return guild.available ? new Discord.EmbedBuilder()
    .setTitle(`Server information for ${guild.name} (${guild.id})`)
    .setDescription(
        `Creation Time: ${guild.createdAt}`
    ) : new Discord.EmbedBuilder()
    .setTitle('Server information for ${guild.name} (${guild.id})')
    .setDescription('error, try again later');
}

client.on('messageCreate', (message) => {
  if (message.content === 'r!ping') {
    const pingTime = Date.now() - message.createdTimestamp;
    const pingEmbed = new Discord.EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Ping')
      .setDescription(`Pong! Bot latency is ${pingTime}ms.`);
    message.channel.send({ embeds: [pingEmbed] });
  }

  if (message.content === 'r!help') {
    const embuilder = new Discord.EmbedBuilder()
      .setTitle("Zerobot help")
      .setDescription(`Zerobot is a moderation bot used in many occasions for moderating servers and is going to be an outstanding bot in the future
      Commands:
      \`help\`
      \`ping\`
      \`serverinfo\`
      \`welcomecardguild\`
      \`invite\`
      \`userinfo\`
      \`kick\`
      \`rickroll\`
      `)
      .setColor('#eb2617');
    message.channel.send({ embeds: [embuilder] });
  }

  if (message.content === 'r!invite') {
    const embuilder = new Discord.EmbedBuilder()
      .setTitle("Invite Zerobot")
      .setDescription(`[Click here](https://discord.com/api/oauth2/authorize?client_id=1110068022976192513&permissions=8&scope=bot)`)
      .setColor('#8f2121');
    message.channel.send({ embeds: [embuilder] });
  }

  if (message.content === 'r!serverinfo') {
    message.channel.send({ embeds: [serverInfo(message.guild)] });
  }

  client.commands.set(userinfo.name, userinfo);
  if (message.content.startsWith('r!userinfo')) {
    const mentionedUser = message.mentions.users.first();
    client.commands.get('userinfo').execute(message, mentionedUser);
  }

  if (message.content === 'r!rickroll') {
    rickrollCommand.execute(message);
  }

  const kickCommand = require('./kick.js');
  client.commands.set(kickCommand.name, kickCommand);
});

client.login(process.env.token);
