/**
 * เก็บ groupId / roomId ชั่วคราวในหน่วยความจำ (สำหรับการสอน)
 * ในระบบจริงควรเก็บใน database
 */
const joinedChats = new Map();

export function rememberChat(event) {
  const { source } = event;
  if (source.type === 'group' && source.groupId) {
    joinedChats.set(source.groupId, { type: 'group', id: source.groupId });
  }
  if (source.type === 'room' && source.roomId) {
    joinedChats.set(source.roomId, { type: 'room', id: source.roomId });
  }
}

export function forgetChat(event) {
  const { source } = event;
  if (source.type === 'group' && source.groupId) {
    joinedChats.delete(source.groupId);
  }
  if (source.type === 'room' && source.roomId) {
    joinedChats.delete(source.roomId);
  }
}

export function listJoinedChats() {
  return [...joinedChats.values()];
}
