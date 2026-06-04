# My Hack Club Slack Bot

A Slack bot built with JavaScript, Node.js, and Slack Bolt. Deployed on Hack Club Nest.

## Features

- Responds to `@mentions` with a friendly wave
- `/ping` slash command that replies "Pong!"
- Socket Mode (no public URL needed)

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

## Deploying to Nest

1. SSH into your Nest server: `ssh username@username.hackclub.app`
2. Clone or copy this repo
3. Run `npm install`
4. Create `.env` with your tokens on the server
5. Keep it online with PM2: `pm2 start app.js --name slack-bot`

## Files

| File | Description |
|------|-------------|
| `app.js` | Main bot code |
| `.env` | Slack tokens (not committed) |
| `.gitignore` | Ignores node_modules and .env |
| `package.json` | Dependencies and scripts |

## License

ISC
