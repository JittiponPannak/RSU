import { createProductCard } from '../messages/flexMenu.js';

const COMMANDS = {
  สวัสดี: () => [
    { type: 'text', text: 'สวัสดีครับ! พิมพ์ "สินค้า" เพื่อดู Flex Message' },
  ],
  ช่วยเหลือ: () => [
    {
      type: 'text',
      text: [
        'คำสั่งที่ใช้ได้:',
        '• สวัสดี — ทักทาย',
        '• สินค้า — แสดง Flex Message (มีปุ่ม postback)',
        '• ช่วยเหลือ — แสดงคำสั่งนี้',
      ].join('\n'),
    },
  ],
  สินค้า: () => [createProductCard()],
};

export async function handleMessage(client, event) {
  if (event.message.type !== 'text') {
    return null;
  }

  const text = event.message.text.trim();
  const buildMessages = COMMANDS[text];
  const messages = buildMessages
    ? buildMessages()
    : [{ type: 'text', text: `พิมพ์ "ช่วยเหลือ" เพื่อดูคำสั่งที่ใช้ได้` }];

  return client.replyMessage({
    replyToken: event.replyToken,
    messages,
  });
}
