import { findByLineUserId } from '../store/memberStore.js';
import { TIER_LABELS } from '../utils/tier.js';
import { createMemberLiffCard } from '../messages/liffMenu.js';

const COMMANDS = {
  สวัสดี: () => [
    { type: 'text', text: 'สวัสดีครับ! พิมพ์ "สมาชิก" หรือ "ลงทะเบียน" เพื่อใช้ระบบสมาชิก' },
  ],
  ช่วยเหลือ: () => [
    {
      type: 'text',
      text: [
        'คำสั่งระบบสมาชิก:',
        '• ลงทะเบียน — เปิดหน้าสมัครสมาชิก LIFF',
        '• สมาชิก — เปิดบัตรสมาชิก / ดูแต้ม',
        '• ข้อมูลสมาชิก — แสดงสถานะในแชท',
        '• ช่วยเหลือ — แสดงคำสั่งนี้',
      ].join('\n'),
    },
  ],
};

function liffRequiredMessage() {
  return [
    {
      type: 'text',
      text: 'ยังไม่ได้ตั้ง LIFF_ID ใน .env\nสร้าง LIFF app แล้วใส่ LIFF ID',
    },
  ];
}

export async function handleMessage(client, event) {
  if (event.message.type !== 'text') {
    return null;
  }

  const text = event.message.text.trim();
  const userId = event.source.userId;
  const liffId = process.env.LIFF_ID;

  if (text === 'ลงทะเบียน' || text === 'สมาชิก') {
    if (!liffId) {
      return client.replyMessage({
        replyToken: event.replyToken,
        messages: liffRequiredMessage(),
      });
    }
    const page = text === 'ลงทะเบียน' ? 'register.html' : 'card.html';
    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [createMemberLiffCard(liffId, page, text)],
    });
  }

  if (text === 'ข้อมูลสมาชิก') {
    const member = userId ? await findByLineUserId(userId) : null;
    const messages = member
      ? [
          {
            type: 'text',
            text: [
              `เลขสมาชิก: ${member.memberNo}`,
              `ชื่อ: ${member.fullName}`,
              `ระดับ: ${TIER_LABELS[member.tier] ?? member.tier}`,
              `แต้มสะสม: ${member.points}`,
            ].join('\n'),
          },
        ]
      : [{ type: 'text', text: 'ยังไม่ได้ลงทะเบียนสมาชิก — พิมพ์ "ลงทะเบียน"' }];

    return client.replyMessage({ replyToken: event.replyToken, messages });
  }

  const buildMessages = COMMANDS[text];
  const messages = buildMessages
    ? buildMessages()
    : [{ type: 'text', text: 'พิมพ์ "ลงทะเบียน", "สมาชิก" หรือ "ช่วยเหลือ"' }];

  return client.replyMessage({ replyToken: event.replyToken, messages });
}
