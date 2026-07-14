/**
 * Step 1: จัดการข้อความ — ตอบกลับแบบ echo (ทำซ้ำข้อความที่ผู้ใช้ส่งมา)
 */
export async function handleEvent(client, event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return null;
  }

  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [{ type: 'text', text: event.message.text }],
  });
}
