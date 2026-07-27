import { createLiffOrderCard } from '../messages/liffMenu.js';

const COMMANDS = {
  สวัสดี: () => [
    { type: 'text', text: 'สวัสดีครับ! พิมพ์ "สั่งซื้อ" เพื่อเปิดหน้าสั่งซื้อ LIFF' },
  ],
  ช่วยเหลือ: () => [
    {
      type: 'text',
      text: [
        'คำสั่งที่ใช้ได้:',
        '• สวัสดี — ทักทาย',
        '• สั่งซื้อ — เปิด Flex Message พร้อมปุ่ม LIFF',
        '• ช่วยเหลือ — แสดงคำสั่งนี้',
      ].join('\n'),
    },
  ],
  สั่งซื้อ: () => {
    const liffId = process.env.LIFF_ID?.trim();
    if (!liffId) {
      return [
        {
          type: 'text',
          text: 'ยังไม่ได้ตั้ง LIFF_ID ใน .env\nสร้าง LIFF app แล้วใส่ LIFF ID',
        },
      ];
    }
    return [createLiffOrderCard(liffId)];
  },
};

export async function handleMessage(client, event) {
  if (event.message.type !== 'text') {
    return null;
  }

  const text = event.message.text.trim();
  const buildMessages = COMMANDS[text];
  const messages = buildMessages
    ? buildMessages()
    : [{ type: 'text', text: 'พิมพ์ "สั่งซื้อ" เพื่อเปิดหน้าสั่งซื้อ หรือ "ช่วยเหลือ"' }];

  return client.replyMessage({
    replyToken: event.replyToken,
    messages,
  });
}
