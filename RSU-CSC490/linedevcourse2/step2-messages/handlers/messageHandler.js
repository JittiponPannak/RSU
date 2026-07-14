/**
 * Step 2: ตอบตาม keyword และส่งข้อความหลายประเภท
 *
 * คำสั่งทดสอบ:
 *   สวัสดี    → ข้อความต้อนรับ
 *   ช่วยเหลือ → รายการคำสั่ง
 *   เมนู      → ส่งรูปภาพ
 *   สติกเกอร์  → ส่ง sticker
 *   อื่นๆ     → echo ข้อความ
 */

const COMMANDS = {
  สวัสดี: () => [
    { type: 'text', text: 'สวัสดีครับ! ยินดีต้อนรับสู่ LINE Bot 🎉' },
  ],
  ช่วยเหลือ: () => [
    {
      type: 'text',
      text: [
        'คำสั่งที่ใช้ได้:',
        '• สวัสดี — ทักทาย',
        '• ช่วยเหลือ — แสดงคำสั่ง',
        '• เมนู — ส่งรูปภาพ',
        '• สติกเกอร์ — ส่ง sticker',
      ].join('\n'),
    },
  ],
  เมนู: () => [
    {
      type: 'image',
      originalContentUrl:
        'https://developers-resource.landpress.line.me/fx/img/01_1_cafe.png',
      previewImageUrl:
        'https://developers-resource.landpress.line.me/fx/img/01_1_cafe.png',
    },
    { type: 'text', text: 'เมนูเครื่องดื่มของเรา ☕' },
  ],
  สติกเกอร์: () => [
    {
      type: 'sticker',
      packageId: '446',
      stickerId: '1988',
    },
  ],
};

export async function handleEvent(client, event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return null;
  }

  const text = event.message.text.trim();
  const buildMessages = COMMANDS[text];
  const messages = buildMessages
    ? buildMessages()
    : [{ type: 'text', text: `คุณพิมพ์: ${text}` }];

  return client.replyMessage({
    replyToken: event.replyToken,
    messages,
  });
}
