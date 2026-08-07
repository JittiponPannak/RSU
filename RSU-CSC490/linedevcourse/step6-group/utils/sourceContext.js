/**
 * แยกประเภทแชทจาก event.source
 * - user  = แชทส่วนตัว 1:1
 * - group = กลุ่ม LINE
 * - room  = แชทหลายคน (multi-person chat)
 */

export function getSourceContext(event) {
  const { source } = event;

  switch (source.type) {
    case 'user':
      return {
        chatType: 'user',
        userId: source.userId,
        groupId: null,
        roomId: null,
        recipientId: source.userId,
      };
    case 'group':
      return {
        chatType: 'group',
        userId: source.userId,
        groupId: source.groupId,
        roomId: null,
        recipientId: source.groupId,
      };
    case 'room':
      return {
        chatType: 'room',
        userId: source.userId,
        groupId: null,
        roomId: source.roomId,
        recipientId: source.roomId,
      };
    default:
      return {
        chatType: 'unknown',
        userId: null,
        groupId: null,
        roomId: null,
        recipientId: null,
      };
  }
}

/** ตรวจว่าข้อความมีการ @mention บอทหรือไม่ */
export function isBotMentioned(message, botUserId) {
  if (!botUserId || !message.mention?.mentionees?.length) {
    return false;
  }

  return message.mention.mentionees.some(
    (mention) => mention.type === 'user' && mention.userId === botUserId,
  );
}

/** ในกลุ่มตอบเฉพาะเมื่อถูก @mention — ในแชทส่วนตัวตอบได้ทุกข้อความ */
export function shouldHandleMessage(event, botUserId) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return false;
  }

  const { chatType } = getSourceContext(event);
  if (chatType === 'user') {
    return true;
  }
  if (chatType === 'group' || chatType === 'room') {
    return isBotMentioned(event.message, botUserId);
  }
  return false;
}

/** ตัดข้อความ @mention ออก เหลือเฉพาะคำสั่ง */
export function getCommandText(message) {
  if (!message.mention?.mentionees?.length) {
    return message.text.trim();
  }

  let text = message.text;
  const mentionees = [...message.mention.mentionees].sort(
    (a, b) => b.index - a.index,
  );

  for (const mention of mentionees) {
    text = text.slice(0, mention.index) + text.slice(mention.index + mention.length);
  }

  return text.trim();
}
