/**
 * Message Handler — จัดการข้อความจากผู้ใช้
 *
 * ฟีเจอร์หลัก:
 *  1. เครื่องคำนวณวัสดุ (calculator session flow)
 *  2. ค้นหาสินค้า / เช็คราคา
 *  3. ข้อมูลร้าน & FAQ
 */

import { searchProduct, getAllProducts } from '../data/productDB.js';
import { calculateCement, calculatePaint, calculateTiles } from '../services/calculator.js';
import { getSession, clearSession } from '../store/calculatorSession.js';
import { createProductCard, createProductCarousel, createCategoryMenu } from '../messages/flexMenu.js';
import { createCalculatorMenu, createCalculatorResult } from '../messages/flexCalculator.js';
import { createStoreInfoCard } from '../messages/flexStoreInfo.js';

// ──────────────────────────────────────────
// Keyword patterns (Thai)
// ──────────────────────────────────────────

const CALC_KEYWORDS = ['คำนวณ', 'calculator', 'เครื่องคิด'];
const PRODUCT_KEYWORDS = ['สินค้า', 'สินค้าทั้งหมด', 'แคตตาล็อก'];
const PRICE_PATTERNS = [/ราคา(.+)/, /(.+)ราคาเท่าไ(ห?)ร/, /(.+)กี่บาท/];
const HAVE_PATTERNS = [/มี(.+)ไหม/, /มี(.+)มั้ย/, /ขาย(.+)ไหม/, /หา(.+)/];

const STORE_INFO_KEYWORDS = ['ร้าน', 'ที่อยู่', 'แผนที่', 'อยู่ไหน', 'อยู่ที่ไหน'];
const HOURS_KEYWORDS = ['เปิด', 'ปิด', 'เวลา', 'กี่โมง', 'เปิดกี่โมง', 'ปิดกี่โมง'];
const DELIVERY_KEYWORDS = ['ส่ง', 'จัดส่ง', 'ส่งของ', 'delivery', 'ส่งสินค้า'];
const CONTACT_KEYWORDS = ['โทร', 'เบอร์', 'ติดต่อ', 'โทรศัพท์'];

// ──────────────────────────────────────────
// Main handler
// ──────────────────────────────────────────

export async function handleMessage(client, event) {
  if (event.message.type !== 'text') return null;

  const userId = event.source.userId;
  const text = event.message.text.trim();

  // ── 1. ถ้ามี calculator session ค้างอยู่ ให้จัดการก่อน ──
  const session = getSession(userId);
  if (session) {
    const messages = handleCalculatorInput(userId, text, session);
    return client.replyMessage({ replyToken: event.replyToken, messages });
  }

  // ── 2. เช็ค keyword ตามลำดับ ──
  const messages = await matchMessage(text);
  return client.replyMessage({ replyToken: event.replyToken, messages });
}

// ──────────────────────────────────────────
// Keyword matching
// ──────────────────────────────────────────

async function matchMessage(text) {
  const lower = text.toLowerCase();

  // ── ถาม AI n8n เมื่อพิมพ์ "ถาม: ..." หรือ "...คืออะไร" ──
  if (text.startsWith('ถาม:') || text.startsWith('ถาม: ') || text.startsWith('ถาม ')) {
    const question = text.replace(/^ถาม:\s*|^ถาม\s+/, '').trim();
    return await askN8N(question);
  }

  if (text.includes('คืออะไร')) {
    return await askN8N(text);
  }

  // เครื่องคำนวณ
  if (CALC_KEYWORDS.some((kw) => lower.includes(kw))) {
    return [createCalculatorMenu()];
  }

  // ข้อมูลร้าน
  if (STORE_INFO_KEYWORDS.some((kw) => lower.includes(kw))) {
    return [createStoreInfoCard()];
  }

  // เวลาเปิด-ปิด
  if (HOURS_KEYWORDS.some((kw) => lower.includes(kw))) {
    return [
      {
        type: 'text',
        text:
          '🕐 เวลาทำการ\n\n' +
          '📅 จันทร์-เสาร์: 08:00 - 17:00 น.\n' +
          '📅 อาทิตย์: 08:00 - 16:00 น.\n\n'
      },
    ];
  }

  // จัดส่ง
  if (DELIVERY_KEYWORDS.some((kw) => lower.includes(kw))) {
    return [
      {
        type: 'text',
        text:
          '🚛 บริการจัดส่ง\n\n' +
          '✅ จัดส่งในรัศมี 20 กม. ฟรี! (สั่งขั้นต่ำ ฿2,000)\n' +
          '✅ เกิน 20 กม. คิดค่าส่งตามระยะทาง\n' +
          '✅ จัดส่งภายใน 1-2 วันทำการ\n\n' +
          '📞 โทรสอบถาม: 099-309-5171',
      },
    ];
  }

  // ติดต่อ
  if (CONTACT_KEYWORDS.some((kw) => lower.includes(kw))) {
    return [
      {
        type: 'text',
        text:
          '📞 ช่องทางติดต่อ\n\n' +
          '☎️ โทร: 099-309-5171\n' +
          '📱 LINE: @jittiponhardware\n' +
          '📍 189/6 9 ถนนติวานนท์ - ปทุมธานี, ตำบล บางกะดี อำเภอเมืองปทุมธานี 12000',
      },
    ];
  }

  // ค้นหาสินค้าจาก pattern "ราคา..."
  for (const pattern of PRICE_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      const query = match[1].trim();
      return searchAndReply(query);
    }
  }

  // ค้นหาสินค้าจาก pattern "มี...ไหม"
  for (const pattern of HAVE_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      const query = match[1].trim();
      return searchAndReply(query);
    }
  }

  // แสดงหมวดหมู่สินค้า
  if (PRODUCT_KEYWORDS.some((kw) => lower.includes(kw))) {
    return [createCategoryMenu()];
  }

  // ช่วยเหลือ
  if (lower === 'ช่วยเหลือ' || lower === 'help') {
    return [
      {
        type: 'text',
        text: [
          '🏪 ร้านจิตติภณ ต้าวัสดุ',
          '━━━━━━━━━━━━━',
          '📌 คำสั่งที่ใช้ได้:',
          '',
          '🧮 "คำนวณ" — เครื่องคำนวณวัสดุ',
          '   (ปูน / สี / กระเบื้อง)',
          '',
          '🔍 "มี...ไหม" — ค้นหาสินค้า',
          '   เช่น "มีค้อนไหม" "ราคาปูน"',
          '',
          '🛒 "สินค้า" — เลือกดูสินค้าตามหมวดหมู่',
          '',
          '🤖 "ถาม: [คำถาม]" — ถาม AI',
          '   เช่น "ถาม: ปูนคืออะไร"',
          '',
          '📍 "ร้าน" — ข้อมูลร้าน / แผนที่',
          '🕐 "เปิดกี่โมง" — เวลาทำการ',
          '🚛 "จัดส่ง" — นโยบายจัดส่ง',
          '📞 "ติดต่อ" — ช่องทางติดต่อ',
        ].join('\n'),
      },
    ];
  }

  // สวัสดี / ทักทาย
  if (['สวัสดี', 'หวัดดี', 'ดี', 'hi', 'hello'].some((w) => lower === w)) {
    return [
      {
        type: 'text',
        text:
          'สวัสดีครับ! 🏪 ยินดีต้อนรับสู่ร้านจิตติภณ ต้าวัสดุ\n\n' +
          'พิมพ์ "ช่วยเหลือ" เพื่อดูคำสั่งที่ใช้ได้ครับ',
      },
    ];
  }

  // ไม่ตรงอะไรเลย → ลองค้นหาสินค้าจากข้อความ
  const found = searchProduct(text);
  if (found.length > 0) {
    return found.length === 1
      ? [createProductCard(found[0])]
      : [createProductCarousel(found)];
  }

  // fallback
  return [
    {
      type: 'text',
      text: 'ขออภัยครับ ไม่เข้าใจคำสั่ง 😅\nพิมพ์ "ช่วยเหลือ" เพื่อดูคำสั่งที่ใช้ได้ครับ',
    },
  ];
}

// ──────────────────────────────────────────
// Product search helper
// ──────────────────────────────────────────

function searchAndReply(query) {
  const results = searchProduct(query);
  if (results.length === 0) {
    return [
      {
        type: 'text',
        text: `ขออภัยครับ ไม่พบสินค้า "${query}" ในระบบ 😅\nลองพิมพ์ "สินค้า" เพื่อดูสินค้าทั้งหมดครับ`,
      },
    ];
  }
  if (results.length === 1) {
    return [createProductCard(results[0])];
  }
  return [createProductCarousel(results)];
}

// ──────────────────────────────────────────
// Calculator session handler
// ──────────────────────────────────────────

function handleCalculatorInput(userId, text, session) {
  // ผู้ใช้พิมพ์ "ยกเลิก" ระหว่างคำนวณ
  if (text === 'ยกเลิก' || text === 'cancel') {
    clearSession(userId);
    return [{ type: 'text', text: 'ยกเลิกการคำนวณแล้วครับ 👌' }];
  }

  const num = parseFloat(text);
  if (isNaN(num) || num <= 0) {
    return [
      {
        type: 'text',
        text: 'กรุณาพิมพ์ตัวเลขที่ถูกต้อง (มากกว่า 0) ครับ\nหรือพิมพ์ "ยกเลิก" เพื่อยกเลิก',
      },
    ];
  }

  let result;

  switch (session.type) {
    case 'cement':
      result = calculateCement(num);
      break;
    case 'paint':
      result = calculatePaint(num);
      break;
    case 'tile':
      result = calculateTiles(num);
      break;
    default:
      clearSession(userId);
      return [{ type: 'text', text: 'เกิดข้อผิดพลาด กรุณาลองใหม่ครับ' }];
  }

  clearSession(userId);
  return [createCalculatorResult(result)];
}

// ──────────────────────────────────────────
// n8n Webhook / AI Q&A helper
// ──────────────────────────────────────────

async function askN8N(text) {
  const url = process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/line-bot';

  console.log(url)

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: text }),
    });

    if (!response.ok) {
      throw new Error(`n8n responded with status ${response.status}`);
    }

    const responseText = await response.text();
    console.log('n8n raw response:', responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      data = responseText;
    }

    let replyText = '';

    if (typeof data === 'string') {
      replyText = data;
    } else if (data && typeof data.reply === 'string') {
      replyText = data.reply;
    } else if (data && typeof data.response === 'string') {
      replyText = data.response;
    } else if (data && typeof data.output === 'string') {
      replyText = data.output;
    } else if (data && typeof data.text === 'string') {
      replyText = data.text;
    } else if (data && typeof data.message === 'string') {
      replyText = data.message;
    } else if (data && typeof data.output === 'object') {
      // Handle nested output object from n8n AI node
      const nested = data.output;
      if (typeof nested.text === 'string') {
        replyText = nested.text;
      } else {
        replyText = JSON.stringify(nested);
      }
    } else if (Array.isArray(data) && data.length > 0) {
      // If it's an array, extract from first element
      const first = data[0];
      if (typeof first === 'string') {
        replyText = first;
      } else if (first && typeof first.output === 'string') {
        replyText = first.output;
      } else if (first && typeof first.text === 'string') {
        replyText = first.text;
      } else if (first && typeof first.message === 'string') {
        replyText = first.message;
      } else {
        replyText = JSON.stringify(first);
      }
    } else {
      // If object, try to extract first string value
      const values = Object.values(data);
      const strVal = values.find(v => typeof v === 'string');
      if (strVal) {
        replyText = strVal;
      } else {
        replyText = JSON.stringify(data);
      }
    }

    return [{ type: 'text', text: replyText || 'ไม่พบคำตอบจาก AI' }];
  } catch (err) {
    console.error('Error calling n8n:', err);
    return [
      {
        type: 'text',
        text: 'ขออภัยครับ ไม่สามารถเชื่อมต่อกับ AI ในขณะนี้ได้ 😅',
      },
    ];
  }
}

