/**
 * Step 4: จัดการ event อื่นนอกจากข้อความ
 * - follow: ผู้ใช้เพิ่มบอทเป็นเพื่อน
 * - unfollow: ผู้ใช้บล็อก/ลบบอท (ตอบกลับไม่ได้)
 * - postback: กดปุ่มใน Flex Message
 */

export async function handleEvent(client, event) {
  switch (event.type) {
    case 'follow':
      return handleFollow(client, event);
    case 'unfollow':
      return handleUnfollow(event);
    case 'postback':
      return handlePostback(client, event);
    default:
      return null;
  }
}

async function handleFollow(client, event) {
  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [
      {
        type: 'text',
        text: 'ขอบคุณที่เพิ่มเพื่อน! 🎉\nพิมพ์ "ช่วยเหลือ" เพื่อดูคำสั่งที่ใช้ได้',
      },
    ],
  });
}

function handleUnfollow(event) {
  const userId = event.source.userId ?? 'unknown';
  console.log(`[unfollow] user ${userId} blocked or removed the bot`);
  // ไม่สามารถ reply ได้หลัง unfollow — บันทึก log หรืออัปเดต DB แทน
  return null;
}

async function handlePostback(client, event) {
  const data = new URLSearchParams(event.postback.data);
  const action = data.get('action');

  if (action === 'order') {
    const item = data.get('item') ?? 'สินค้า';
    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [
        {
          type: 'text',
          text: `รับคำสั่งซื้อ ${item} แล้วครับ! ขอบคุณที่สนใจ 🙏`,
        },
      ],
    });
  }

  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [
      { type: 'text', text: `ได้รับ postback: ${event.postback.data}` },
    ],
  });
}
