import 'dotenv/config';
import express from 'express';
import * as line from '@line/bot-sdk';
import { processEvents } from './handlers/webhook.js';

const config = {
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = line.LineBotClient.fromChannelAccessToken({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

const app = express();

app.get('/', (_req, res) => {
  res.send('LINE Bot Step 4 — Events. Webhook: POST /callback');
});

app.post('/callback', line.middleware(config), async (req, res) => {
  try {
    await processEvents(client, req.body.events);
    res.status(200).end();
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Step 4 Events Bot listening on http://localhost:${port}`);
});
