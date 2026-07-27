import { handleMessage } from './messageHandler.js';
import { handleEvent as handleOtherEvent } from './eventHandler.js';
import { rememberChat } from '../utils/groupStore.js';

export async function handleWebhookEvent(client, event, botUserId) {
  if (event.source?.type === 'group' || event.source?.type === 'room') {
    rememberChat(event);
  }

  if (event.type === 'message') {
    return handleMessage(client, event, botUserId);
  }
  return handleOtherEvent(client, event);
}

/** วน loop ทุก event — LINE อาจส่งหลายข้อความใน request เดียว */
export async function processEvents(client, events, botUserId) {
  for (const event of events ?? []) {
    try {
      await handleWebhookEvent(client, event, botUserId);
    } catch (err) {
      console.error('processEvents failed:', err);
    }
  }
}
