require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('ready', () => {
    console.log('PingBot is online!');
});

client.on('messageCreate', (message) => {
    if (message.content === '!pingmeee') {
        message.channel.send('!pingme'); // Ping the main bot
    }
});

client.login(process.env.PINGBOT_TOKEN);
