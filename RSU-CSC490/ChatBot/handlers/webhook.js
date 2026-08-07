import { handleMessage } from './messageHandler.js';
import { handleEvent as handleOtherEvent } from './eventHandler.js';

export async function handleWebhookEvent(client, event) {
  if (event.type === 'message') {
    return handleMessage(client, event);
  }
  return handleOtherEvent(client, event);
}

/** วน loop ทุก event — LINE อาจส่งหลายข้อความใน request เดียว */
export async function processEvents(client, events) {
  for (const event of events ?? []) {
    try {
      await handleWebhookEvent(client, event);
    } catch (err) {
      console.error('processEvents failed:', err);
    }
  }
}

/** จัดการ Webhook จาก Dialogflow */
export async function handleDialogflowWebhook(reqBody) {
  let lineEvent = null;

  // 1. Detect LINE integration format (Dialogflow ES style)
  if (
    reqBody.originalDetectIntentRequest &&
    reqBody.originalDetectIntentRequest.source === 'line' &&
    reqBody.originalDetectIntentRequest.payload &&
    reqBody.originalDetectIntentRequest.payload.data
  ) {
    lineEvent = reqBody.originalDetectIntentRequest.payload.data;
  }
  // 2. Detect standard/fallback Dialogflow ES style (where queryText represents the message)
  else if (reqBody.queryResult) {
    const text = reqBody.queryResult.queryText || '';
    const session = reqBody.session || '';
    const userId = session.split('/').pop() || 'dialogflow-user';
    lineEvent = {
      type: 'message',
      replyToken: 'dialogflow-reply-token',
      source: {
        type: 'user',
        userId: userId
      },
      message: {
        id: 'dialogflow-msg-id',
        type: 'text',
        text: text
      }
    };
  }
  // 3. Detect Dialogflow CX style
  else if (reqBody.intentInfo || reqBody.sessionInfo) {
    const text = reqBody.text || '';
    const session = reqBody.sessionInfo?.session || '';
    const userId = session.split('/').pop() || 'dialogflow-cx-user';
    lineEvent = {
      type: 'message',
      replyToken: 'dialogflow-reply-token',
      source: {
        type: 'user',
        userId: userId
      },
      message: {
        id: 'dialogflow-msg-id',
        type: 'text',
        text: text
      }
    };
  }

  if (!lineEvent) {
    console.warn('Unknown Dialogflow payload structure received:', reqBody);
    return {
      fulfillmentText: 'ขออภัยครับ เกิดข้อผิดพลาดในการประมวลผลข้อมูล'
    };
  }

  // Intercept reply messages
  const capturedMessages = [];
  const mockClient = {
    replyMessage: async ({ messages }) => {
      if (Array.isArray(messages)) {
        capturedMessages.push(...messages);
      } else if (messages) {
        capturedMessages.push(messages);
      }
      return {};
    }
  };

  try {
    console.log(mockClient, lineEvent)
    await handleWebhookEvent(mockClient, lineEvent);
  } catch (err) {
    console.error('Error handling Dialogflow webhook event:', err);
  }

  // Format the captured LINE message objects into Dialogflow's payload responses
  const fulfillmentMessages = capturedMessages.map(msg => ({
    payload: {
      line: msg
    }
  }));

  // Create a default fallback fulfillmentText if we got plain text back
  let fulfillmentText = '';
  const firstTextMsg = capturedMessages.find(m => m.type === 'text');
  if (firstTextMsg) {
    fulfillmentText = firstTextMsg.text;
  }

  return {
    fulfillmentText,
    fulfillmentMessages,
    fulfillment_response: {
      messages: capturedMessages.map(msg => ({
        payload: {
          line: msg
        }
      }))
    }
  };
}

