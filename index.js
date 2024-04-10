const Discord = require('discord.js');
const { Client, GatewayIntentBits, ActivityType, AttachmentBuilder, Partials } = require('discord.js');
require('dotenv/config');

const { createCanvas, loadImage } = require('canvas');
const crypto = require('crypto');
const { MessageEmbed } = require('discord.js')
const { EmbedBuilder } = require('discord.js')
const { MessageAttachment } = require('discord.js');
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const { ButtonStyle } = require('discord.js');



const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on('ready', () => {
  console.log('Bot is ready to rick and roll')
  client.user.setStatus('available')
  client.user.setActivity(
    'r!help',
    { type: ActivityType.Playing })

  const canvacord = require("canvacord")

  client.on('guildMemberAdd', async member => {
    const welcome = new canvacord.Welcomer()
      .setUsername(member.user.username)
      .setAvatar(member.user.displayAvatarURL({ format: "png" }))
      .setColor("title", "#ffffff")
      .setBackground("https://images-ext-1.discordapp.net/external/zKZmzv9zrEnJ-Ma0u8lpJAtaKp6db2RZ3M9uq9lcaL4/https/img.freepik.com/premium-photo/abstract-metal-background-with-light-effect_760214-2220.jpg?format=webp")
      .setMemberCount(member.guild.memberCount)
    let attachment = new Discord.AttachmentBuilder(await welcome.build(), "welcome.png")
    const welcomeEmbed = new Discord.EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("Welcome to the server!")
      .setDescription(`Welcome ${member.user} to the server!`)
      .setImage("attachment://welcome.png");

    member.guild.channels.cache.get(process.env.welcomechannel).send({ embeds: [welcomeEmbed], files: [attachment] });
  });
// in the .setbackground you can choose whatever image link adress you want, just make sure its in jpg/png format//

//for line 47, you have to create a secret called welcomechannel and put your channel id in there, in the last line as well you have to create a token secret and put your bot token in there//

  
})
function serverInfo(guild) {
  return guild.available ? new EmbedBuilder()
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
    const pingEmbed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Ping')
      .setDescription(`Pong! Bot latency is ${pingTime}ms.`);

    message.channel.send({ embeds: [pingEmbed] });
  }

  if (message.content === 'r!help') {
    const embuilder = new EmbedBuilder()
      .setTitle("Zerobot help")
      .setDescription(`Zerobot is a moderation bot used in many occasions for moderating servers and was created by absolutezer0z.

          Commands:
          \`help\`
          \`ping\`
          \`serverinfo\`
          \`built in welcomecard guild feature when user joins server\`
          \`invite\`
          `)
      .setColor('#eb2617');
    message.channel.send({ embeds: [embuilder] });

  }
  if (message.content === 'r!invite') {
    const embuilder = new EmbedBuilder()
      .setTitle("Invite Zerobot")
      .setDescription(`[Click here to invite](https://discord.com/api/oauth2/authorize?client_id=1110068022976192513&permissions=8&scope=bot)
  `)
      .setColor('#8f2121');
    message.channel.send({ embeds: [embuilder] });
  }

  if (message.content === 'r!serverinfo') {
    message.channel.send({ embeds: [serverInfo(message.guild)] });
  }
});
client.login(process.env.token);