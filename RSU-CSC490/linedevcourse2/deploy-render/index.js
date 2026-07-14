/**
 * index.js — เหมือน step5-gemini/index.js ทุกประการ
 * ต่างแค่ข้อความหน้าแรกและรันบน Render แทนเครื่อง local
 */
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
  res.send('LINE Bot on Render — Webhook: POST /callback');
});

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
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
app.listen(port, '0.0.0.0', () => {
  console.log(`LINE Bot listening on port ${port}`);
});
