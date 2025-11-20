# Discord Bot Template

## Overview

This repository provides a complete template for a Discord bot with secure handling of sensitive data, multiple bot examples, and the option to publish the project as an npm or GitHub package. The goal is to offer a safe, easily adaptable starting point that anyone can copy and extend—without accidentally exposing tokens or credentials.

---

## Features
- Separation of bot code and sensitive data (.env)
- Example for multiple bots (Pingbot, Mainbot)
- Secure handling of Discord tokens and API keys
- Easy customization and extension
- Ready for npm and GitHub package publishing

---

## Step-by-Step Guide

### 1. Clone the repository

```sh
git clone https://github.com/molaskidata/Discord-Bot-Template.git
cd Discord-Bot-Template
```

### 2. Install dependencies

```sh
npm install
```

### 3. Create environment variable files

In each bot folder (e.g., `2.Bot/` or `Bot-template/`), create a `.env` file:

```
PINGBOT_TOKEN=your_discord_token
DISCORD_TOKEN=your_mainbot_token
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
PORT=3000
```

**Note:**
Insert your own tokens and secrets here. The `.env` file is protected by `.gitignore` and will not be published.

### 4. Start the bot

In the respective bot folder:

```sh
node pingbot.js
```
or
```sh
node infobot.js
```

---

## Example Code: Discord Bot with .env

```js
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('ready', () => {
    console.log('Bot is online!');
});

client.login(process.env.PINGBOT_TOKEN); // Token is loaded from .env
```

---

## Publishing as npm or GitHub Package

1. Adjust your `package.json` (name, version, description, etc.).
2. Create a `.npmignore` to exclude sensitive or unnecessary files.
3. Publish with:
   ```sh
   npm publish --access public
   ```
   or for GitHub Packages:
   ```sh
   npm login --registry=https://npm.pkg.github.com/
   npm publish
   ```

---

## Security Notes
- Never publish tokens or secrets in code or repositories!
- Always use `.env` files and add them to `.gitignore`.
- If a token is leaked, immediately generate a new one and invalidate the old one.

---

## Result

With this template, you get a secure, flexible foundation for Discord bots that you can safely share, fork, and publish as an npm or GitHub package—without including any sensitive data.

---

For questions or issues: Please open an issue in the GitHub repository.
