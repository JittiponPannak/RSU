import { forgetChat, rememberChat } from '../utils/groupStore.js';
import { getSourceContext } from '../utils/sourceContext.js';

export async function handleEvent(client, event) {
  switch (event.type) {
    case 'follow':
      return handleFollow(client, event);
    case 'unfollow':
      return handleUnfollow(event);
    case 'join':
      return handleJoin(client, event);
    case 'leave':
      return handleLeave(event);
    case 'memberJoined':
      return handleMemberJoined(client, event);
    case 'memberLeft':
      return handleMemberLeft(event);
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
        text: 'ขอบคุณที่เพิ่มเพื่อน! เชิญบอทเข้ากลุ่มแล้ว @mention เพื่อใช้งานครับ',
      },
    ],
  });
}

function handleUnfollow(event) {
  console.log(`[unfollow] user ${event.source.userId ?? 'unknown'}`);
  return null;
}

async function handleJoin(client, event) {
  rememberChat(event);
  const ctx = getSourceContext(event);
  const chatLabel = ctx.chatType === 'group' ? 'กลุ่ม' : 'ห้องแชท';

  console.log(`[join] bot joined ${ctx.chatType}: ${ctx.recipientId}`);

  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [
      {
        type: 'text',
        text: [
          `สวัสดีทุกคน! บอทเข้าร่วม${chatLabel}แล้ว 🎉`,
          'พิมพ์ @บอท ช่วยเหลือ เพื่อดูคำสั่ง',
        ].join('\n'),
      },
    ],
  });
}

function handleLeave(event) {
  forgetChat(event);
  const ctx = getSourceContext(event);
  console.log(`[leave] bot removed from ${ctx.chatType}: ${ctx.recipientId}`);
  return null;
}

async function handleMemberJoined(client, event) {
  rememberChat(event);
  const ctx = getSourceContext(event);
  const count = event.joined?.members?.length ?? 0;

  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [
      {
        type: 'text',
        text: `มีสมาชิกใหม่เข้า${ctx.chatType === 'group' ? 'กลุ่ม' : 'ห้องแชท'} ${count} คน ยินดีต้อนรับครับ!`,
      },
    ],
  });
}

function handleMemberLeft(event) {
  const ctx = getSourceContext(event);
  const count = event.left?.members?.length ?? 0;
  console.log(
    `[memberLeft] ${count} member(s) left ${ctx.chatType}: ${ctx.recipientId}`,
  );
  return null;
}
