import { createFlexDemoCard, createProductCard, createUserBusinessCard, createAjarnNeraBusinessCard } from '../messages/flexMenu.js';
import { askGemini } from '../services/geminiService.js';

/**
 * Handle Personalized Greeting
 * เมื่อผู้ใช้พิมพ์คำว่า "สวัสดี" ให้ระบบดึงชื่อผู้ใช้ (displayName) มาตอบกลับ เช่น "สวัสดีครับคุณ [displayName]"
 */
async function handlePersonalizedGreeting(client, event) {
  let displayName = '';
  if (event.source && event.source.userId) {
    try {
      const profile = await client.getProfile(event.source.userId);
      if (profile && profile.displayName) {
        displayName = profile.displayName;
      }
    } catch (err) {
      console.error('Failed to fetch user profile:', err?.message || err);
    }
  }

  const replyText = displayName ? `สวัสดีครับคุณ ${displayName}` : 'สวัสดีครับ!';
  return [{ type: 'text', text: replyText }];
}

/**
 * Handle User Business Card (Dynamic)
 */
async function handleUserBusinessCard(client, event) {
  let displayName = 'ผู้ใช้งาน LINE';
  let pictureUrl = '';

  if (event.source && event.source.userId) {
    try {
      const profile = await client.getProfile(event.source.userId);
      if (profile) {
        displayName = profile.displayName || displayName;
        pictureUrl = profile.pictureUrl || pictureUrl;
      }
    } catch (err) {
      console.error('Failed to fetch profile for card:', err?.message || err);
    }
  }

  return [createUserBusinessCard({ displayName, pictureUrl, studentId: '650123456', major: 'เทคโนโลยีสารสนเทศ (IT)' })];
}

/**
 * Build help menu message
 */
function buildHelpMessage() {
  return [
    {
      type: 'text',
      text: [
        '📌 คำสั่งที่สามารถใช้งานได้:',
        '• สวัสดี — ทักทายพร้อมแสดงชื่อของคุณ (Personalized Greeting)',
        '• Flex — แสดง Flex Message ตัวอย่างที่ออกแบบไว้อย่างสวยงาม',
        '• นามบัตร — นามบัตรดิจิทัลของคุณ (LIFF Dynamic Flex)',
        '• นามบัตร อ.เนร — นามบัตรอาจารย์วุฒิพงษ์ ชินศรี (Static Flex)',
        '• คำถามทั่วไป / ค้นหาเกี่ยวกับ "อ.วุฒิพงษ์ ชินศรี" หรือ "อ.เนร" — ระบบจะตอบกลับด้วย Generative AI (Gemini API)',
        '• ช่วยเหลือ — แสดงเมนูแนะนำนี้',
      ].join('\n'),
    },
  ];
}

export async function handleEvent(client, event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return null;
  }

  const text = event.message.text.trim();
  const lowerText = text.toLowerCase();

  let messages;

  if (text === 'สวัสดี' || text === 'สวัสดีครับ' || text === 'สวัสดีค่ะ') {
    // 1. Personalized Greeting
    messages = await handlePersonalizedGreeting(client, event);
  } else if (lowerText === 'flex' || text === 'สินค้า') {
    // 2. Flex Message Response
    messages = [createFlexDemoCard()];
  } else if (text === 'นามบัตร' || text === 'นามบัตรตัวเอง') {
    // LIFF Business Card (User Dynamic)
    messages = await handleUserBusinessCard(client, event);
  } else if (text === 'นามบัตร อ.เนร' || text === 'นามบัตรอาจารย์') {
    // LIFF Business Card (Ajarn Nera Static)
    messages = [createAjarnNeraBusinessCard()];
  } else if (text === 'ช่วยเหลือ' || text === 'help') {
    messages = buildHelpMessage();
  } else {
    // 3. AI Chatbot Integration (Gen AI) for General Questions & "อ.วุฒิพงษ์ ชินศรี" / "อ.เนร"
    // Display LINE Loading Animation while asking Gen AI
    if (event.source && event.source.userId) {
      try {
        await client.showLoadingAnimation({
          chatId: event.source.userId,
          loadingSeconds: 5,
        });
      } catch (err) {
        console.error('Failed to show loading animation:', err?.message || err);
      }
    }

    try {
      const aiReply = await askGemini(text);
      messages = [{ type: 'text', text: aiReply }];
    } catch (err) {
      console.error('AI Integration Error:', err);
      messages = [{ type: 'text', text: 'ขออภัยครับ ไม่สามารถประมวลผลคำตอบได้ในขณะนี้' }];
    }
  }

  return client.replyMessage({
    replyToken: event.replyToken,
    messages,
  });
}
