export async function handleEvent(client, event) {
  switch (event.type) {
    case 'follow':
      return handleFollow(client, event);
    case 'unfollow':
      return handleUnfollow(event);
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
        text: 'ขอบคุณที่เพิ่มเพื่อน! 🎉\nพิมพ์ "สั่งซื้อ" เพื่อลองเปิดหน้า LIFF',
      },
    ],
  });
}

function handleUnfollow(event) {
  const userId = event.source.userId ?? 'unknown';
  console.log(`[unfollow] user ${userId} blocked or removed the bot`);
  return null;
}
