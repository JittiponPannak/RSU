import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import * as line from '@line/bot-sdk';
import { processEvents } from './handlers/webhook.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = line.LineBotClient.fromChannelAccessToken({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

const app = express();

// API endpoint to get LIFF ID
app.get('/api/config', (_req, res) => {
  res.json({
    liffId: process.env.LIFF_ID || '',
  });
});

// Serve LIFF Static Web App
app.use(express.static(path.join(__dirname, 'public')));

app.get('/liff', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
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
  console.log(`Step 3 Flex Bot & LIFF Application listening on http://localhost:${port}`);
  console.log(`LIFF URL: http://localhost:${port}/liff`);
});
