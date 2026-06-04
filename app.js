require('dotenv').config();
const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

// Respond to @mentions
app.event('app_mention', async ({ event, say }) => {
  await say(`Hi there, <@${event.user}>! :wave:`);
});

// Slash command: /ping
app.command('/ping', async ({ ack, say }) => {
  await ack();
  await say('Pong! :table_tennis_paddle_and_ball:');
});

// Basic error handler
app.error(async (error) => {
  console.error('Bot error:', error);
});

(async () => {
  await app.start();
  console.log('Bot is running!');
})();
