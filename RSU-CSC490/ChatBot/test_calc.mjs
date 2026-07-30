/**
 * Test the full calculator flow end-to-end
 */
import 'dotenv/config';
import { handleMessage } from './handlers/messageHandler.js';

const capturedMessages = [];
const mockClient = {
  replyMessage: async ({ replyToken, messages }) => {
    console.log(`replyMessage called (token: ${replyToken})`);
    console.log(JSON.stringify(messages, null, 2));
    capturedMessages.push(...(Array.isArray(messages) ? messages : [messages]));
    return {};
  }
};

const userId = 'Utest00000000000000000000000000001'; // not a real LINE ID - no push

async function step(text) {
  console.log(`\n>>> User sends: "${text}"`);
  await handleMessage(mockClient, {
    type: 'message',
    replyToken: 'fake-token',
    source: { type: 'user', userId },
    message: { id: 'test', type: 'text', text },
  });
}

// Step 1: Start calculator
await step('คำนวณปูนซีเมนต์');

// Step 2: Enter area number
await step('20');

console.log('\n--- Final captured messages ---');
console.log(JSON.stringify(capturedMessages, null, 2));
