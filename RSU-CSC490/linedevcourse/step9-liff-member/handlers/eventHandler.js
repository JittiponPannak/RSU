export async function handleEvent(client, event) {
  if (event.type === 'follow') {
    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [
        {
          type: 'text',
          text: 'ยินดีต้อนรับ! 🎉\nพิมพ์ "ลงทะเบียน" เพื่อสมัครสมาชิก หรือ "สมาชิก" เพื่อดูบัตรสมาชิก',
        },
      ],
    });
  }
  return null;
}
