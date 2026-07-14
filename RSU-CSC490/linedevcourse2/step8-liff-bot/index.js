import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import * as line from '@line/bot-sdk';
import { processEvents } from './handlers/webhook.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config = {
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = line.LineBotClient.fromChannelAccessToken({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

const app = express();

app.get('/config.js', (_req, res) => {
  res.type('application/javascript');
  res.send(
    `window.LIFF_CONFIG = { liffId: ${JSON.stringify(process.env.LIFF_ID ?? '')} };`
  );
});

app.use(express.static(path.join(__dirname, 'public')));

// LIFF Endpoint URL ชี้มาที่ / — ให้โหลดหน้าสั่งซื้อโดยตรง (ไม่ต้องใส่ /order.html ใน liff.line.me)
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'order.html'));
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
  console.log(`Step 8 LIFF + Bot listening on http://localhost:${port}`);
  console.log('ตั้ง Webhook URL และ LIFF Endpoint URL เป็น URL เดียวกันจาก ngrok');
  if (!process.env.LIFF_ID) {
    console.warn('⚠ ยังไม่ได้ตั้ง LIFF_ID ใน .env');
  }
});
