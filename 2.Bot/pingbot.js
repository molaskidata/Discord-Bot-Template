require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('ready', () => {
    console.log('PingBot is online!');
});

client.on('messageCreate', (message) => {
    if (message.content === '!pingme') {
        message.channel.send('!ponggg');
    }
});

client.login(process.env.PINGBOT_TOKEN);
