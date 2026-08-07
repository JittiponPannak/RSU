/**
 * Flex Message template — การ์ดแสดงสินค้าร้านวัสดุก่อสร้าง
 */
import { getCategories } from '../data/productDB.js';

/**
 * สร้าง Flex Bubble การ์ดสินค้า พร้อมปุ่ม "จองสินค้า"
 * @param {object} product — สินค้าจาก productDB
 * @returns {object} LINE Flex Message
 */
export function createProductCard(product) {
  const stockLabel = product.inStock ? '✅ มีสินค้า' : '❌ สินค้าหมด';
  const stockColor = product.inStock ? '#1DB446' : '#DD2222';

  return {
    type: 'flex',
    altText: `สินค้า: ${product.name}`,
    contents: {
      type: 'bubble',
      size: 'kilo',
      hero: {
        type: 'image',
        url: product.image,
        size: 'full',
        aspectRatio: '20:13',
        aspectMode: 'cover',
      },
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: product.name,
            weight: 'bold',
            size: 'xl',
            wrap: true,
          },
          {
            type: 'box',
            layout: 'baseline',
            margin: 'md',
            contents: [
              {
                type: 'text',
                text: `฿${product.price.toLocaleString()}`,
                size: 'xl',
                color: '#FF6B00',
                weight: 'bold',
              },
              {
                type: 'text',
                text: `/ ${product.unit}`,
                size: 'sm',
                color: '#aaaaaa',
                margin: 'sm',
              },
            ],
          },
          {
            type: 'text',
            text: stockLabel,
            size: 'sm',
            color: stockColor,
            margin: 'md',
            weight: 'bold',
          },
          {
            type: 'text',
            text: product.description,
            size: 'sm',
            color: '#666666',
            margin: 'md',
            wrap: true,
          },
          {
            type: 'text',
            text: `หมวด: ${product.category}`,
            size: 'xs',
            color: '#999999',
            margin: 'md',
          },
        ],
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        spacing: 'sm',
        contents: [
          {
            type: 'button',
            style: 'primary',
            color: '#FF6B00',
            action: {
              type: 'postback',
              label: '🛒 จองสินค้า',
              data: `action=reserve&item=${product.id}`,
              displayText: `จองสินค้า: ${product.name}`,
            },
          },
        ],
      },
    },
  };
}

/**
 * สร้าง Flex Carousel แสดงสินค้าหลายรายการ
 * @param {object[]} productList — รายการสินค้า (สูงสุด 10)
 * @returns {object} LINE Flex Message (carousel)
 */
export function createProductCarousel(productList) {
  const bubbles = productList.slice(0, 10).map((product) => {
    const card = createProductCard(product);
    return card.contents; // ดึงเฉพาะ bubble ออกมา
  });

  return {
    type: 'flex',
    altText: 'สินค้าร้านวัสดุก่อสร้าง',
    contents: {
      type: 'carousel',
      contents: bubbles,
    },
  };
}

// ── Emoji + สี สำหรับแต่ละหมวดหมู่ ──
const CATEGORY_STYLE = {
  'วัสดุก่อสร้าง': { emoji: '🧱', color: '#E65100' },
  'ประปา':       { emoji: '🚰', color: '#1565C0' },
  'เครื่องมือช่าง': { emoji: '🔧', color: '#4E342E' },
  'สี':          { emoji: '🎨', color: '#6A1B9A' },
  'เครื่องมือไฟฟ้า': { emoji: '🔌', color: '#1B5E20' },
  'กระเบื้อง':    { emoji: '🏗️', color: '#00695C' },
  'ไฟฟ้า':       { emoji: '⚡', color: '#F57F17' },
};

/**
 * สร้าง Flex Carousel เมนูเลือกหมวดหมู่สินค้า
 * @returns {object} LINE Flex Message
 */
export function createCategoryMenu() {
  const categories = getCategories();

  const bubbles = categories.map((cat) => {
    const style = CATEGORY_STYLE[cat] ?? { emoji: '📦', color: '#FF6B00' };

    return {
      type: 'bubble',
      size: 'kilo',
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: `${style.emoji} ${cat}`,
            weight: 'bold',
            size: 'lg',
            color: style.color,
          },
          {
            type: 'text',
            text: `ดูสินค้าในหมวด "${cat}"`,
            size: 'sm',
            color: '#666666',
            margin: 'md',
            wrap: true,
          },
        ],
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'button',
            style: 'primary',
            color: style.color,
            action: {
              type: 'postback',
              label: 'ดูสินค้า',
              data: `action=category&cat=${encodeURIComponent(cat)}`,
              displayText: `ดูสินค้าหมวด ${cat}`,
            },
          },
        ],
      },
    };
  });

  return {
    type: 'flex',
    altText: '📂 เลือกหมวดหมู่สินค้า',
    contents: {
      type: 'carousel',
      contents: bubbles,
    },
  };
}

