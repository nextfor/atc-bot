const Discord = require('discord.js');
const EventEmitter = require('events');
const { OpusEncoder } = require('@discordjs/opus');
const ytdl = require('ytdl-core');
const got = require('got');

require('dotenv').config()

const client = new Discord.Client();
const encoder = new OpusEncoder(48000, 2);

const atc = require('./atc.json');
const airports = require('./airports.json');
const resources = require('./resources.json');

let voice, player, listeningAirport;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("✈ ATC Live, start by typing atc connect");
});

const undefinedEmbed = new Discord.MessageEmbed()
    .setColor(resources.embed.color)
    .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/no-entry-sign_1f6ab.png')
    .setTitle("This airport doesn't exist, retry")
    .setDescription("Currently, these airports are available : " + "**" + Object.keys(atc).join(" - ") + "**")
    .setTimestamp()
    .setFooter(resources.embed.footer);

const connectEmbed = new Discord.MessageEmbed()
    .setColor(resources.embed.color)
    .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/radio_1f4fb.png')
    .setTitle("Connected to your voice channel, waiting airport to stream with *atc play <airport>*")
    .setTimestamp()
    .setFooter(resources.embed.footer);

const disconnectEmbed = new Discord.MessageEmbed()
    .setColor(resources.embed.color)
    .setTitle('Disconnected from your channel')
    .addFields({ name: '**To reconnect :**', value: '*atc connect*' })
    .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/no-entry_26d4.png')
    .setTimestamp()
    .setFooter(resources.embed.footer);

const stopEmbed = new Discord.MessageEmbed()
    .setColor(resources.embed.color)
    .setTitle('Audio stopped')
    .addFields({ name: '**To play another airport ATC :**', value: '*atc play <airport-code>*' }, { name: '\u200B', value: '\u200B' }, { name: '**To disconnect the bot from your channel :**', value: 'atc disconnect' }, )
    .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/octagonal-sign_1f6d1.png')
    .setTimestamp()
    .setFooter(resources.embed.footer);

client.on('message', async message => {
    if (message.content.startsWith('atc')) {
        if (message.content === 'atc connect') {
            if (message.member.voice.channel && (message.member.voice.channel.id != undefined && message.member.voice.channel.id == resources.atcChannel) || message.member.voice.channel) {
                connection = await message.member.voice.channel.join();
                message.channel.send(connectEmbed);
            } else {
                message.reply('You need to join the correct voice channel first !');
            }
        }
        if (message.content.startsWith("atc play")) {
            let atcRequest2 = message.content.slice(9);
            listeningAirport = atcRequest2;
            if (atc[atcRequest2] !== undefined) {
                const playEmbed = new Discord.MessageEmbed()
                    .setColor(resources.embed.color)
                    .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/speaker-with-three-sound-waves_1f50a.png')
                    .setTitle("Now playing  : ATC - " + airports[atcRequest2].name)
                    .setTimestamp()
                    .setFooter(resources.embed.footer);
                message.channel.send(playEmbed);
                listeningAirport = atc[atcRequest2];
                connection.play(atc[atcRequest2][1]);
                client.user.setActivity(`listening ${atc[atcRequest2][0]}`);
            } else {
                message.channel.send(undefinedEmbed)
            }
        }
        if (message.content == "atc disconnect" || message.content == "atc leave") {
            message.channel.send(disconnectEmbed)
            message.member.voice.channel.leave()
        }
        if (message.content == 'atc info' || message.content == 'atc help') {
            // const embed = new Discord.MessageEmbed()
            // TODO : Help embed
        }
    }
});

client.login(process.env.TOKEN);