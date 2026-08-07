/**
 * Event Handler — จัดการ event อื่นนอกจากข้อความ
 * - follow: ผู้ใช้เพิ่มบอทเป็นเพื่อน
 * - unfollow: ผู้ใช้บล็อก/ลบบอท (ตอบกลับไม่ได้)
 * - postback: กดปุ่มใน Flex Message
 */

import { getProductById, getProductsByCategory } from '../data/productDB.js';
import { startSession } from '../store/calculatorSession.js';
import { createCalculatorMenu } from '../messages/flexCalculator.js';
import { createProductCarousel, createCategoryMenu } from '../messages/flexMenu.js';

export async function handleEvent(client, event) {
  switch (event.type) {
    case 'follow':
      return handleFollow(client, event);
    case 'unfollow':
      return handleUnfollow(event);
    case 'postback':
      return handlePostback(client, event);
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
        text:
          '🏪 ยินดีต้อนรับสู่ร้านจิตติภณ ต้าวัสดุ\n\n' +
          'เราพร้อมให้บริการครับ:\n' +
          '🧮 คำนวณวัสดุ — พิมพ์ "คำนวณ"\n' +
          '🔍 ค้นหาสินค้า — พิมพ์ "มี...ไหม"\n' +
          '📍 ข้อมูลร้าน — พิมพ์ "ร้าน"\n\n' +
          'พิมพ์ "ช่วยเหลือ" เพื่อดูคำสั่งทั้งหมดครับ',
      },
    ],
  });
}

function handleUnfollow(event) {
  const userId = event.source.userId ?? 'unknown';
  console.log(`[unfollow] user ${userId} blocked or removed the bot`);
  // ไม่สามารถ reply ได้หลัง unfollow — บันทึก log หรืออัปเดต DB แทน
  return null;
}

async function handlePostback(client, event) {
  const data = new URLSearchParams(event.postback.data);
  const action = data.get('action');

  // ── จองสินค้า ──
  if (action === 'reserve') {
    const itemId = data.get('item');
    const qty = data.get('qty');
    const product = getProductById(itemId);
    const productName = product ? product.name : 'สินค้า';

    let text = `✅ จองสินค้า "${productName}" เรียบร้อยครับ!\n`;
    if (qty) {
      text += `📦 จำนวน: ${qty} ${product?.unit ?? 'ชิ้น'}\n`;
    }
    if (product) {
      const totalPrice = qty ? product.price * parseInt(qty) : product.price;
      text += `💰 ราคารวม: ฿${totalPrice.toLocaleString()}\n`;
    }
    text += '\n📞 เจ้าหน้าที่จะติดต่อกลับเพื่อยืนยันครับ\nขอบคุณที่ใช้บริการ 🙏';

    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [{ type: 'text', text }],
    });
  }

  // ── เริ่มคำนวณ ──
  if (action === 'calc') {
    const calcType = data.get('type');
    const userId = event.source.userId;
    startSession(userId, calcType);

    const prompts = {
      cement: '🧱 คำนวณปูนซีเมนต์\n\nกรุณาพิมพ์พื้นที่ที่ต้องการเทพื้น (ตร.ม.)\nเช่น พิมพ์ "20" = 20 ตร.ม.',
      paint: '🎨 คำนวณสีทาบ้าน\n\nกรุณาพิมพ์พื้นที่ผนังที่ต้องการทาสี (ตร.ม.)\nเช่น พิมพ์ "50" = 50 ตร.ม.',
      tile: '🏗️ คำนวณกระเบื้อง\n\nกรุณาพิมพ์พื้นที่ที่ต้องการปูกระเบื้อง (ตร.ม.)\nเช่น พิมพ์ "30" = 30 ตร.ม.',
    };

    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [
        {
          type: 'text',
          text: prompts[calcType] ?? 'กรุณาพิมพ์พื้นที่ (ตร.ม.)',
        },
      ],
    });
  }

  // ── กลับไปเมนูคำนวณ ──
  if (action === 'calc_menu') {
    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [createCalculatorMenu()],
    });
  }

  // ── ดูสินค้าตามหมวดหมู่ ──
  if (action === 'category') {
    const category = decodeURIComponent(data.get('cat') ?? '');
    const items = getProductsByCategory(category);

    if (items.length === 0) {
      return client.replyMessage({
        replyToken: event.replyToken,
        messages: [
          { type: 'text', text: `ไม่พบสินค้าในหมวด "${category}" ครับ` },
        ],
      });
    }

    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [createProductCarousel(items)],
    });
  }

  // ── กลับไปเมนูหมวดหมู่ ──
  if (action === 'category_menu') {
    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [createCategoryMenu()],
    });
  }

  // ── เดิม: action=order (backward compat) ──
  if (action === 'order') {
    const item = data.get('item') ?? 'สินค้า';
    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [
        {
          type: 'text',
          text: `รับคำสั่งซื้อ ${item} แล้วครับ! ขอบคุณที่สนใจ 🙏`,
        },
      ],
    });
  }

  // fallback
  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [
      { type: 'text', text: `ได้รับ postback: ${event.postback.data}` },
    ],
  });
}
