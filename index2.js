const discord = require('discord.js')
const voice =  require('@discordjs/voice')
require('dotenv').config()

const client = new discord.Client({ intents: [discord.Intents.FLAGS.GUILDS] })

const atc = require('./atc.json');
const airports = require('./airports.json');
const resources = require('./resources.json');


client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("✈ ATC Live, start by typing atc connect");
});

client.on('messageCreate', message => {
    console.log('hello')
    if (message.content.startsWith('atc')) {
        console.log(message.content)
        switch (message.content) {
            case 'atc connect':
                joinVoiceChannel({
                    channelId: message.member.voice.channel.id,
                    guildId: message.guild.id,
                    adapterCreator: message.guild.voiceAdapterCreator
                })
                console.log("Connected to voice channel")
        }
}});

client.login(process.env.TOKEN);