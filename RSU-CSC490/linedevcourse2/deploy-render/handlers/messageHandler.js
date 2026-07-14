import { createProductCard } from '../messages/flexMenu.js';
import {
  askGemini,
  clearChatHistory,
  isGeminiConfigured,
} from '../services/geminiService.js';

const COMMANDS = {
  สวัสดี: () => [
    { type: 'text', text: 'สวัสดีครับ! พิมพ์ "ถาม" ตามด้วยคำถาม หรือ "ช่วยเหลือ"' },
  ],
  ช่วยเหลือ: () => [
    {
      type: 'text',
      text: [
        'คำสั่งที่ใช้ได้:',
        '• สวัสดี — ทักทาย',
        '• สินค้า — แสดง Flex Message',
        '• ถาม <คำถาม> — ถาม Gemini AI',
        '• ai <คำถาม> — ถาม Gemini AI (ภาษาอังกฤษ)',
        '• ล้าง — ล้างประวัติการสนทนากับ AI',
        '• ช่วยเหลือ — แสดงคำสั่งนี้',
      ].join('\n'),
    },
  ],
  สินค้า: () => [createProductCard()],
  ล้าง: () => [{ type: 'text', text: 'ล้างประวัติแล้ว — เริ่มคุยกับ AI ใหม่ได้' }],
};

const AI_PREFIXES = ['ถาม ', 'ai ', 'AI '];

function extractAiQuestion(text) {
  for (const prefix of AI_PREFIXES) {
    if (text.startsWith(prefix)) {
      return text.slice(prefix.length).trim();
    }
  }
  return null;
}

export async function handleMessage(client, event) {
  if (event.message.type !== 'text') {
    return null;
  }

  const userId = event.source.userId ?? 'anonymous';
  const text = event.message.text.trim();

  if (text === 'ล้าง') {
    clearChatHistory(userId);
  }

  const buildMessages = COMMANDS[text];
  if (buildMessages) {
    return client.replyMessage({
      replyToken: event.replyToken,
      messages: buildMessages(),
    });
  }

  const aiQuestion = extractAiQuestion(text);
  if (aiQuestion) {
    return replyWithGemini(client, event, userId, aiQuestion);
  }

  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [
      {
        type: 'text',
        text: 'พิมพ์ "ถาม" ตามด้วยคำถาม เช่น ถาม JavaScript คืออะไร',
      },
    ],
  });
}

async function showAiLoading(client, userId) {
  if (!userId || userId === 'anonymous') return;

  try {
    await client.showLoadingAnimation({
      chatId: userId,
      loadingSeconds: 20,
    });
  } catch (err) {
    console.warn('[loading]', err.message);
  }
}

async function replyWithGemini(client, event, userId, question) {
  if (!question) {
    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [{ type: 'text', text: 'กรุณาพิมพ์คำถามหลังคำว่า "ถาม" เช่น ถาม อธิบาย webhook' }],
    });
  }

  if (!isGeminiConfigured()) {
    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [
        {
          type: 'text',
          text: 'ยังไม่ได้ตั้งค่า GEMINI_API_KEY\nขอ key ได้ที่ https://aistudio.google.com/apikey',
        },
      ],
    });
  }

  try {
    await showAiLoading(client, userId);
    const answer = await askGemini(userId, question);
    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [{ type: 'text', text: answer }],
    });
  } catch (err) {
    console.error('[Gemini]', err);
    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [
        {
          type: 'text',
          text: 'ขออภัย AI ตอบไม่ได้ในขณะนี้ ลองใหม่อีกครั้งหรือตรวจ API Key',
        },
      ],
    });
  }
}
