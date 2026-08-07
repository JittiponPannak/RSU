import {
  getCommandText,
  getSourceContext,
  shouldHandleMessage,
} from '../utils/sourceContext.js';

const USER_COMMANDS = {
  สวัสดี: () => [{ type: 'text', text: 'สวัสดีครับ! (แชทส่วนตัว)' }],
  ช่วยเหลือ: () => [
    {
      type: 'text',
      text: [
        'คำสั่งแชทส่วนตัว:',
        '• สวัสดี',
        '• ช่วยเหลือ',
        '',
        'ในกลุ่ม: @บอท แล้วพิมพ์คำสั่ง',
        '• ช่วยเหลือ',
        '• ข้อมูลกลุ่ม',
        '• สวัสดี',
        '• ประกาศ <ข้อความ>',
      ].join('\n'),
    },
  ],
};

const GROUP_COMMANDS = {
  ช่วยเหลือ: () => [
    {
      type: 'text',
      text: [
        'คำสั่งในกลุ่ม (ต้อง @mention บอทก่อน):',
        '• ช่วยเหลือ — แสดงคำสั่งนี้',
        '• ข้อมูลกลุ่ม — ชื่อกลุ่มและจำนวนสมาชิก',
        '• สวัสดี — ทักทายพร้อมชื่อผู้ส่ง',
        '• ประกาศ <ข้อความ> — ส่ง push message ในกลุ่ม',
      ].join('\n'),
    },
  ],
};

export async function handleMessage(client, event, botUserId) {
  if (!shouldHandleMessage(event, botUserId)) {
    return null;
  }

  const ctx = getSourceContext(event);
  const commandText = getCommandText(event.message);

  if (ctx.chatType === 'group' || ctx.chatType === 'room') {
    return handleGroupMessage(client, event, ctx, commandText);
  }

  return handleUserMessage(client, event, commandText);
}

async function handleUserMessage(client, event, commandText) {
  const buildMessages = USER_COMMANDS[commandText];
  const messages = buildMessages
    ? buildMessages()
    : [{ type: 'text', text: `คุณพิมพ์: ${commandText}` }];

  return client.replyMessage({
    replyToken: event.replyToken,
    messages,
  });
}

async function handleGroupMessage(client, event, ctx, commandText) {
  if (commandText === 'ข้อมูลกลุ่ม') {
    return replyGroupInfo(client, event, ctx);
  }

  if (commandText === 'สวัสดี') {
    return replyGroupGreeting(client, event, ctx);
  }

  if (commandText.startsWith('ประกาศ ')) {
    const announcement = commandText.slice('ประกาศ '.length).trim();
    if (!announcement) {
      return client.replyMessage({
        replyToken: event.replyToken,
        messages: [{ type: 'text', text: 'ใช้รูปแบบ: ประกาศ ข้อความที่ต้องการส่ง' }],
      });
    }
    return pushAnnouncement(client, event, ctx, announcement);
  }

  const buildMessages = GROUP_COMMANDS[commandText];
  const messages = buildMessages
    ? buildMessages()
    : [
        {
          type: 'text',
          text: `ไม่รู้จักคำสั่ง "${commandText}" — พิมพ์ @บอท ช่วยเหลือ`,
        },
      ];

  return client.replyMessage({
    replyToken: event.replyToken,
    messages,
  });
}

async function replyGroupInfo(client, event, ctx) {
  if (!ctx.groupId) {
    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [
        {
          type: 'text',
          text: 'คำสั่งนี้ใช้ได้ในกลุ่ม LINE เท่านั้น (ไม่รองรับ multi-person room)',
        },
      ],
    });
  }

  const [summary, count] = await Promise.all([
    client.getGroupSummary(ctx.groupId),
    client.getGroupMemberCount(ctx.groupId),
  ]);

  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [
      {
        type: 'text',
        text: [
          `ชื่อกลุ่ม: ${summary.groupName}`,
          `จำนวนสมาชิก: ${count.count} คน`,
          `groupId: ${ctx.groupId}`,
        ].join('\n'),
      },
    ],
  });
}

async function replyGroupGreeting(client, event, ctx) {
  let displayName = 'เพื่อน';

  if (ctx.groupId && ctx.userId) {
    try {
      const profile = await client.getGroupMemberProfile(ctx.groupId, ctx.userId);
      displayName = profile.displayName;
    } catch {
      // ผู้ใช้ไม่อนุญาตให้ดึง profile ได้
    }
  }

  const chatLabel = ctx.chatType === 'group' ? 'กลุ่ม' : 'ห้องแชท';

  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [
      {
        type: 'text',
        text: `สวัสดี ${displayName}! ยินดีที่ได้คุยใน${chatLabel}นี้ครับ 👋`,
      },
    ],
  });
}

/** ตัวอย่าง push message — ใช้ quota (ต่างจาก reply ที่ฟรี) */
async function pushAnnouncement(client, event, ctx, text) {
  if (!ctx.recipientId) {
    return null;
  }

  await client.pushMessage({
    to: ctx.recipientId,
    messages: [{ type: 'text', text: `📢 ประกาศ: ${text}` }],
  });

  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [{ type: 'text', text: 'ส่งประกาศในกลุ่มแล้วครับ' }],
  });
}
