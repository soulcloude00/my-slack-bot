# DSB Bot — Hack Club Slack Bot

A Slack bot built with JavaScript, Node.js, and Slack Bolt. Deployed on Hack Club Nest.

## Features

- **Slash commands** with the `/dsb-` prefix
- **@mention** responses
- **API integration** (fetches jokes from the web)
- **Rich Slack Block Kit** UI for `/dsb-status` and `/dsb-help`

## Commands

| Command | Description |
|---------|-------------|
| `/dsb-ping` | Check if the bot is alive |
| `/dsb-hello` | Get a personalized greeting |
| `/dsb-status` | See bot uptime and system info |
| `/dsb-joke` | Fetch a random joke from an API |
| `/dsb-help` | Show all available commands |

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with your Slack tokens:
   ```env
   SLACK_BOT_TOKEN=xoxb-your-bot-token
   SLACK_APP_TOKEN=xapp-your-app-token
   ```

3. Run locally:
   ```bash
   npm start
   ```

## Slack App Configuration

Create a Slack app at [api.slack.com/apps](https://api.slack.com/apps):

1. **Enable Socket Mode** and generate an App-Level Token with `connections:write`
2. **OAuth & Permissions** → add Bot Token Scopes:
   - `commands`
   - `chat:write`
   - `app_mentions:read`
3. **Slash Commands** → create each `/dsb-*` command
4. **Event Subscriptions** → enable `app_mention` bot event
5. **Reinstall to Workspace** after each change

## Deploying to Nest

1. SSH into your Nest server: `ssh username@username.hackclub.app`
2. Clone or copy this repo
3. Run `npm install`
4. Create `.env` with your tokens on the server
5. Keep it online with PM2:
   ```bash
   pm2 start app.js --name dsb-bot
   pm2 save
   pm2 startup
   ```

## Files

| File | Description |
|------|-------------|
| `app.js` | Main bot code |
| `.env` | Slack tokens (not committed) |
| `.gitignore` | Ignores node_modules and .env |
| `package.json` | Dependencies and scripts |

## License

ISC
