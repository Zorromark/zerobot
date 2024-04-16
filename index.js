const Discord = require('discord.js');
const { Client, GatewayIntentBits, ActivityType, AttachmentBuilder, Partials, Args } = require('discord.js');
require('dotenv/config');

const { createCanvas, loadImage } = require('canvas');
const crypto = require('crypto');
const { MessageEmbed }  = require('discord.js')
const { EmbedBuilder } = require('discord.js')
const { MessageAttachment } = require('discord.js');
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const { ButtonStyle } = require('discord.js');
const userinfo = require('./userinfo.js');



const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});
client.commands = new Map();

client.on('ready', () => {
    console.log('Bot is ready to rick and roll')
    client.user.setStatus('available')
    client.user.setActivity(
        'r!help',
        { type: ActivityType.Playing })

const canvacord = require ("canvacord")

client.on('guildMemberAdd', async member => {
  const welcome = new canvacord.Welcomer()
  .setUsername(member.user.username)
  .setAvatar(member.user.displayAvatarURL({format: "png"}))
  .setColor("title", "#ffffff")
  .setBackground("https://images-ext-2.discordapp.net/external/83IOoVnPsJtDiSwgYdz8lZHoRWtuk1bYbvcCERIJBSA/https/www.psdgraphics.com/wp-content/uploads/2018/05/data-tunnel.jpg?width=1405&height=937")
  .setMemberCount(member.guild.memberCount)
  let attachment = new Discord.AttachmentBuilder(await welcome.build(), "welcome.png")
  const welcomeEmbed = new Discord.EmbedBuilder()
    .setColor("#0099ff")
    .setTitle("Welcome to the server!")
    .setDescription(`Welcome ${member.user} to the server!`)
    .setImage("attachment://welcome.png");

  member.guild.channels.cache.get("1138967181162467420").send({ embeds: [welcomeEmbed], files: [attachment] });
});

})
function serverInfo(guild){
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

  if (message.content ==='r!help') {
    const embuilder = new EmbedBuilder()
    .setTitle("Zerobot help")
      .setDescription(`Zerobot is a moderation bot used in many occasions for moderating servers and is going to be an outstanding bot in the future

          Commands:
          \`help\`
          \`ping\`
          \`serverinfo\`
          \`welcomecardguild\`
          \`invite\`
          `)
    .setColor('#eb2617');
    message.channel.send({embeds:[embuilder]});

  }
  if (message.content ==='r!invite') {
    const embuilder = new EmbedBuilder()
      .setTitle("Invite Zerobot")
      .setDescription(`https://discord.com/api/oauth2/authorize?client_id=1110068022976192513&permissions=8&scope=bot`)
      .setColor('#8f2121');
    message.channel.send({ embeds: [ embuilder ] });
  }

  if (message.content === 'r!serverinfo') {
    message.channel.send({ embeds: [ serverInfo(message.guild) ] });
  }

  client.commands.set(userinfo.name, userinfo);
  if (message.content === 'r!userinfo') {
    const args = message.content.split(' ');
    const command = args.shift().slice('r!'.length);

    if (client.commands.has(command)) {
      try {
        client.commands.get(command).execute(message);
      } catch (error) {
        console.error(error);
        message.reply("There was an error executing that command.");
  
      } 
      }
    }
  }
);
client.login(process.env.token);
