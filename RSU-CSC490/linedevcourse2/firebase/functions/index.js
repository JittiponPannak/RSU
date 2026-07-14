import { onRequest } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';
import * as line from '@line/bot-sdk';
import { processEvents } from './handlers/webhook.js';

const channelSecret = defineSecret('CHANNEL_SECRET');
const channelAccessToken = defineSecret('CHANNEL_ACCESS_TOKEN');
const geminiApiKey = defineSecret('GEMINI_API_KEY');

export const lineWebhook = onRequest(
  {
    region: 'asia-southeast1',
    secrets: [channelSecret, channelAccessToken, geminiApiKey],
  },
  async (req, res) => {
    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }

    // === ส่วนนี้ต่างจาก local: ตรวจ signature เอง (แทน line.middleware) ===
    const signature = req.get('x-line-signature') ?? '';
    if (!line.validateSignature(req.rawBody, channelSecret.value(), signature)) {
      res.status(401).send('Invalid signature');
      return;
    }

    process.env.GEMINI_API_KEY = geminiApiKey.value();

    const client = line.LineBotClient.fromChannelAccessToken({
      channelAccessToken: channelAccessToken.value(),
    });

    // === ส่วนนี้เหมือน step5-gemini/index.js ทุกประการ ===
    try {
      await processEvents(client, req.body.events);
      res.status(200).send('OK');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },
);
