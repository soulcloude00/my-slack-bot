require('dotenv').config();
const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

// --- Event handlers ---

// Respond to @mentions
app.event('app_mention', async ({ event, say }) => {
  await say(`Hi there, <@${event.user}>! Try \`/dsb-help\` for available commands. :wave:`);
});

// --- Slash commands (/dsb-*) ---

// /dsb-ping — basic health check
app.command('/dsb-ping', async ({ ack, say }) => {
  await ack();
  await say('Pong! :table_tennis_paddle_and_ball:');
});

// /dsb-hello — personalized greeting
app.command('/dsb-hello', async ({ ack, body, say }) => {
  await ack();
  await say(`Hello, <@${body.user_id}>! :wave: Welcome to DSB — your friendly Hack Club bot.`);
});

// /dsb-status — bot status & uptime
app.command('/dsb-status', async ({ ack, say }) => {
  await ack();
  const uptime = process.uptime();
  const mins = Math.floor(uptime / 60);
  const secs = Math.floor(uptime % 60);

  await say({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*:gear: DSB Bot Status*',
        },
      },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*Uptime:*\n${mins}m ${secs}s` },
          { type: 'mrkdwn', text: `*Node Version:*\n${process.version}` },
          { type: 'mrkdwn', text: `*Platform:*\n${process.platform}` },
          { type: 'mrkdwn', text: `*Status:*\n:large_green_circle: Online` },
        ],
      },
    ],
    text: `DSB Bot Status: Online (uptime: ${mins}m ${secs}s)`,
  });
});

// /dsb-joke — fetch a random joke from an API
app.command('/dsb-joke', async ({ ack, say }) => {
  await ack();

  try {
    const res = await fetch('https://official-joke-api.appspot.com/random_joke');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const joke = await res.json();
    await say(`:clown_face: *${joke.setup}*\n> ${joke.punchline}`);
  } catch (err) {
    console.error('Joke fetch failed:', err);
    await say(':x: Could not fetch a joke right now. Try again later!');
  }
});

// /dsb-help — list all commands
app.command('/dsb-help', async ({ ack, say }) => {
  await ack();
  await say({
    blocks: [
      {
        type: 'header',
        text: { type: 'plain_text', text: ':robot_face: DSB Bot Commands', emoji: true },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text:
            '• `/dsb-ping` — Check if the bot is alive\n' +
            '• `/dsb-hello` — Get a greeting\n' +
            '• `/dsb-status` — See bot uptime and system info\n' +
            '• `/dsb-joke` — Fetch a random joke from the web\n' +
            '• `/dsb-help` — Show this help message',
        },
      },
      {
        type: 'context',
        elements: [
          { type: 'mrkdwn', text: ':zap: Built with Slack Bolt & Hack Club Nest' },
        ],
      },
    ],
    text: 'DSB Bot Commands: /dsb-ping, /dsb-hello, /dsb-status, /dsb-joke, /dsb-help',
  });
});

// --- Error handler ---

app.error(async (error) => {
  console.error('Bot error:', error);
});

// --- Start the bot ---

(async () => {
  await app.start();
  console.log('DSB Bot is running!');
})();
