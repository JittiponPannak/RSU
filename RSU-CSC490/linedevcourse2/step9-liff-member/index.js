import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import * as line from '@line/bot-sdk';
import { processEvents } from './handlers/webhook.js';
import memberApi from './routes/memberApi.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config = { channelSecret: process.env.CHANNEL_SECRET };
const client = line.LineBotClient.fromChannelAccessToken({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

const app = express();
app.use(express.json());

app.get('/config.js', (_req, res) => {
  res.type('application/javascript');
  res.send(
    `window.LIFF_CONFIG = { liffId: ${JSON.stringify(process.env.LIFF_ID ?? '')} };`
  );
});

app.use('/api/members', memberApi);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (_req, res) => {
  res.redirect('/register.html');
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
  console.log(`Step 9 LIFF Member listening on http://localhost:${port}`);
  if (!process.env.LIFF_ID) {
    console.warn('⚠ ยังไม่ได้ตั้ง LIFF_ID ใน .env');
  }
});
