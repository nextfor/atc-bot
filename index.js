const Discord = require('discord.js');
const client = new Discord.Client();
var voice, player;

const EventEmitter = require('events');
const { OpusEncoder } = require('@discordjs/opus');
const encoder = new OpusEncoder(48000, 2);
const ytdl = require('ytdl-core');
require('dotenv').config()
const got = require('got');

const atc = require('./atc.json');



var voiceChannel = client.channels.cache.get("743187443205013520");
// LiveATC

for(var key in atc) {
  var value = atc[key];

  // do something with "key" and "value" variables
}


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("✈ ATC Live")
});

client.on('message', async message => {
  const connection = await message.member.voice.channel.join();
  if(message.content.startsWith("atc")){
    
  if (message.content === 'atc connect') {
    if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.join();
        const connectEmbed = new Discord.MessageEmbed()
        .setColor('#0F8735')
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/radio_1f4fb.png')
        .setTitle("Connected to your voice channel, playing LFPG by default")
        .setTimestamp()
        .setFooter('Made by gcn59#8558', 'https://i.imgur.com/UMt7XvF.png');
        message.channel.send(connectEmbed)
        connection.play('./lfpg3_dep.pls')
      } else {
        message.reply('You need to join a voice channel first!');
      }
  }
  if (message.content.startsWith("atc play")) {
    let atcrequest2 = message.content.slice(9)
    if (atc[atcrequest2] !== undefined){
      const playEmbed = new Discord.MessageEmbed()
      .setColor('#0F8735')
      .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/speaker-with-three-sound-waves_1f50a.png')
      .setTitle("Now playing  : ATC - " + atc[atcrequest2][0])
      .setTimestamp()
      .setFooter('Made by gcn59#8558', 'https://i.imgur.com/UMt7XvF.png');
    message.channel.send(playEmbed)
    connection.play(atc[atcrequest2][1])
    }
    else{
      const undefinedEmbed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/no-entry-sign_1f6ab.png')
        .setTitle("This airport doesn't exist, retry")
        .setDescription("Currently, these airports are available : " + "**" + Object.keys(atc).join(" ") + "**")
        .setTimestamp()
        .setFooter('Made by gcn59#8558', 'https://i.imgur.com/UMt7XvF.png');
      message.channel.send(undefinedEmbed)
    }
  }
  if (message.content == "atc rickroll"){
    message.channel.send("Now rickrolling peoples")
    const rickroll = connection.play(ytdl('https://www.youtube.com/watch?v=dQw4w9WgXcQ', { filter: 'audioonly' }));
  }
  if (message.content == "atc stop"){
    connection.play(ytdl('https://www.youtube.com/watch?v=dQw4w9WgXcQ', { filter: 'audioonly' })).destroy()
    const stopEmbed = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setTitle('Audio stopped')
    .addFields(
      { name: '**To play another airport ATC :**', value: '*atc play <airport-code>*' },
      { name: '\u200B', value: '\u200B' },
      { name: '**To disconnect the bot from your channel :**', value: 'atc disconnect' },
    )
    .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/octagonal-sign_1f6d1.png')
    .setTimestamp()
    .setFooter('Made by gcn59#8558', 'https://i.imgur.com/UMt7XvF.png');
    message.channel.send(stopEmbed)
  }
  if (message.content == "atc disconnect"){
    const disconnectEmbed = new Discord.MessageEmbed()
      .setColor('#0F8735')
      .setTitle('Disconnected from your channel')
      .addFields(
        { name: '**To reconnect :**', value: '*atc connect*' },
      )
      .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/no-entry_26d4.png')
      .setTimestamp()
      .setFooter('Made by gcn59#8558', 'https://i.imgur.com/UMt7XvF.png');
    message.channel.send(disconnectEmbed)
    connection.disconnect()
  }
  }
  if(message.content.startsWith("am")){
    if(message.content.startsWith("am play")){
      let g = message.content.slice(8)
      if(g.includes('youtu')){
        const amPlayEmbed = new Discord.MessageEmbed()
        .setColor('#0F8735')
        .setTitle('Playing music')
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/musical-score_1f3bc.png')
        .setTimestamp()
        .setFooter('Made by gcn59#8558', 'https://i.imgur.com/UMt7XvF.png');
        message.channel.send(amPlayEmbed)
        connection.play(ytdl(g, { filter: 'audioonly' }))
      }
      else{
        const wrongLinkEmbed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Invalid link')
        .addFields(
          { name: '**Link invalid**', value: 'Please provide a YouTube link' },
        )
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/no-entry-sign_1f6ab.png')
        .setTimestamp()
        .setFooter('Made by gcn59#8558', 'https://i.imgur.com/UMt7XvF.png');
        message.channel.send(wrongLinkEmbed)
      }
    }
    if(message.content == 'am help'){
      const helpAMEmbed = new Discord.MessageEmbed()
      .setColor('#0F8735')
      .setTitle('Help for music')
      .addFields(
        { name: '**To play music :**', value: '*am play <YouTube link>*' },
      )
      .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/musical-note_1f3b5.png')
      .setTimestamp()
      .setFooter('Made by gcn59#8558', 'https://i.imgur.com/UMt7XvF.png');
    message.channel.send(helpAMEmbed)
    }
  }

});



client.login(process.env.TOKEN);


