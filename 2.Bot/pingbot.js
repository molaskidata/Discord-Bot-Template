
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Channel and guild IDs for pinging (keine sensiblen Daten)
const PING_GUILD_ID = '1358882135284519113';
const PING_CHANNEL_ID = '1440688647207649460';

function sendPingToMainBot() {
    const guild = client.guilds.cache.get(PING_GUILD_ID);
    if (guild) {
        const channel = guild.channels.cache.get(PING_CHANNEL_ID);
        if (channel) {
            channel.send('!pingmeee');
        }
    }
}

setInterval(sendPingToMainBot, 90 * 60 * 1000); // every 1.5 hours

client.on('ready', () => {
    console.log('PingBot is online!');
    client.user.setPresence({
        activities: [{
            name: '"Das große Buch der Herzschlag-Bots"',
            type: 1, // Streaming/Streamt
            details: 'Seite 102 von 376',
            state: 'Vorlesen: auf Seite 171 von 304'
        }],
        status: 'online'
    });
});

client.on('messageCreate', (message) => {
    if (message.content === '!pingme') {
        message.channel.send('!ponggg');
    }
});

// Login nur über Umgebungsvariable
client.login(process.env.PINGBOT_TOKEN);
