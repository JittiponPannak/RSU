import { createGoldPriceCard, createProductCard, createThaiOilPriceCard, createPreciousMetalsCard } from '../messages/flexMenu.js';
import { fetchGoldPrice, fetchThaiOilPrices, fetchPreciousMetalsPrices } from '../services/priceService.js';

const COMMANDS = {
  สวัสดี: () => [
    {
      type: 'text',
      text: 'สวัสดีครับ! พิมพ์ "ราคาทอง" เพื่อดูราคาทองล่าสุด หรือ "สินค้า" เพื่อดู Flex ตัวอย่าง',
    },
  ],
  ช่วยเหลือ: () => [
    {
      type: 'text',
      text: [
        'คำสั่งที่ใช้ได้:',
        '• สวัสดี — ทักทาย',
        '• ราคาทอง — ดึงราคาทองจาก API แสดง Flex',
        '• ราคาน้ำมัน — ดึงราคาน้ำมันจาก API แสดง Flex',
        '• ราคาโลหะ — ดึงราคาทอง เงิน แพลทินัม แสดง Flex',
        '• สินค้า — ตัวอย่าง Flex แบบ static',
        '• ช่วยเหลือ — แสดงคำสั่งนี้',
      ].join('\n'),
    },
  ],
  สินค้า: () => [createProductCard()],
};

async function buildGoldPriceMessages() {
  try {
    const price = await fetchGoldPrice();
    const priceObj = Array.isArray(price) ? price[0] : price;
    return [createGoldPriceCard(priceObj)];
  } catch (err) {
    console.error('fetchGoldPrice failed:', err);
    return [
      {
        type: 'text',
        text: 'ดึงราคาทองไม่สำเร็จ ลองใหม่อีกครั้ง หรือตรวจการเชื่อมต่ออินเทอร์เน็ต',
      },
    ];
  }
}

async function buildThaiOilPriceMessages() {
  try {
    const price = await fetchThaiOilPrices();
    return [createThaiOilPriceCard(price)];
  } catch (err) {
    console.error('fetchThaiOilPrices failed:', err);
    return [
      {
        type: 'text',
        text: 'ดึงราคาน้ำมันไม่สำเร็จ ลองใหม่อีกครั้ง หรือตรวจการเชื่อมต่ออินเทอร์เน็ต',
      },
    ];
  }
}

async function buildPreciousMetalsMessages() {
  try {
    const data = await fetchPreciousMetalsPrices();
    return [createPreciousMetalsCard(data)];
  } catch (err) {
    console.error('fetchPreciousMetalsPrices failed:', err);
    return [
      {
        type: 'text',
        text: 'ดึงราคาโลหะมีค่าไม่สำเร็จ ลองใหม่อีกครั้ง หรือตรวจการเชื่อมต่ออินเทอร์เน็ต',
      },
    ];
  }
}

export async function handleEvent(client, event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return null;
  }

  const text = event.message.text.trim();

  let messages;
  if (text === 'ราคาทอง') {
    messages = await buildGoldPriceMessages();
  } else if (text === 'ราคาน้ำมัน' || text == "ขอราคาน้ำมันล่าสุด") {
    messages = await buildThaiOilPriceMessages();
  } else if (text === 'ราคาโลหะ') {
    messages = await buildPreciousMetalsMessages();
  } else {
    const buildMessages = COMMANDS[text];
    messages = buildMessages
      ? buildMessages()
      : [{ type: 'text', text: 'พิมพ์ "ช่วยเหลือ" เพื่อดูคำสั่งที่ใช้ได้' }];
  }

  return client.replyMessage({
    replyToken: event.replyToken,
    messages,
  });
}
