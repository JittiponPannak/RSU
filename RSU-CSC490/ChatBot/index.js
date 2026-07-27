import 'dotenv/config';
import express from 'express';
import * as line from '@line/bot-sdk';
import { processEvents, handleDialogflowWebhook } from './handlers/webhook.js';

const config = {
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = line.LineBotClient.fromChannelAccessToken({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

const app = express();

app.get('/', (_req, res) => {
  res.send('🏪 Hardware Store Line OA Bot. Webhook: POST /callback');
});

app.post(
  '/callback',
  (req, res, next) => {
    if (req.headers['x-line-signature']) {
      line.middleware(config)(req, res, next);
    } else {
      express.json()(req, res, next);
    }
  },
  async (req, res) => {
    try {
      if (req.headers['x-line-signature']) {
        // Direct LINE webhook
        await processEvents(client, req.body.events);
        res.status(200).end();
      } else {
        // Dialogflow webhook
        const responsePayload = await handleDialogflowWebhook(req.body);
        res.status(200).json(responsePayload);
      }
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  }
);

app.post('/dialogflow-fulfillment', express.json(), async (req, res) => {
  try {
    const responsePayload = await handleDialogflowWebhook(req.body);
    res.status(200).json(responsePayload);
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🏪 Hardware Store Bot listening on http://localhost:${port}`);
});

