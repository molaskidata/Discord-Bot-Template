const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const express = require('express');

const BOT_INFO = {
    name: "CoderMaster",
    version: "1.0.0",
    author: "mola"
    // Note: publicKey removed for security - store in .env if needed
};

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

let gameTimer = 0;
const MAX_HOURS = 20;

const app = express();
const PORT = process.env.PORT || 3000;

// Security: Limit request body size to prevent DoS attacks
app.use(express.json({ limit: '100kb' }));

// Helper function to check if request is from localhost
const isLocalhost = (req) => {
    const ip = req.ip || req.connection.remoteAddress;
    return ip === '127.0.0.1' || ip === '::1' || ip === '::ffff:127.0.0.1';
};

app.get('/', (req, res) => {
    // Security: Only expose detailed info to localhost
    if (!isLocalhost(req)) {
        return res.status(200).json({ status: 'OK' });
    }
    
    res.json({
        status: 'Bot Online',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        bot: BOT_INFO
    });
});

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

const server = app.listen(PORT, () => {
    console.log(`✅ HTTP Server running on port ${PORT}`);
    console.log(`🌍 Accessible at http://localhost:${PORT}`);
});


// Import command handler from commands.js
const { handleCommand } = require('./commands');

client.once('ready', () => {
    console.log(`${BOT_INFO.name} v${BOT_INFO.version} is online!`);
    console.log(`Logged in as ${client.user.tag}`);
    
    updateGameStatus();
    setInterval(updateGameStatus, 3600000);
});

function updateGameStatus() {
    gameTimer++;
    if (gameTimer > MAX_HOURS) {
        gameTimer = 2;
    }
    
    client.user.setPresence({
        activities: [{
            name: 'Battlefield 6',
            type: ActivityType.Playing,
            details: `${gameTimer}h gespielt`,
            state: `Multiplayer Match`,
            applicationId: '1435244593301159978',
            assets: {
                large_image: 'battlefield',
                large_text: 'Battlefield 6'
            },
            timestamps: {
                start: Date.now() - (gameTimer * 3600000)
            }
        }],
        status: 'online'
    });
}

const processedMessages = new Set();

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    const messageId = message.id;
    if (processedMessages.has(messageId)) return;
    processedMessages.add(messageId);

    setTimeout(() => {
        processedMessages.delete(messageId);
    }, 60000);

    // Use the new command handler
    handleCommand(message, BOT_INFO);
});

client.login(process.env.DISCORD_TOKEN);

setInterval(() => {
    console.log(`Bot alive: ${new Date().toISOString()}`);
    process.stdout.write('\x1b[0G');
}, 60000);

setInterval(() => {
    console.log(`Bot alive at: ${new Date().toISOString()}`);
}, 300000);

module.exports = { client, BOT_INFO, app };