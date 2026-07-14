/**
 * Flex Message templates — เครื่องคำนวณวัสดุ
 */
import { getProductById } from '../data/productDB.js';

/**
 * สร้าง Flex Carousel เมนูเลือกเครื่องคำนวณ
 */
export function createCalculatorMenu() {
  return {
    type: 'flex',
    altText: '🧮 เครื่องคำนวณวัสดุก่อสร้าง',
    contents: {
      type: 'carousel',
      contents: [
        calcMenuBubble(
          '🧱 คำนวณปูนซีเมนต์',
          'คำนวณจำนวนถุงปูนที่ต้องใช้สำหรับเทพื้น',
          'cement',
          '#E65100',
        ),
        calcMenuBubble(
          '🎨 คำนวณสีทาบ้าน',
          'คำนวณจำนวนถังสีที่ต้องใช้ทาผนัง',
          'paint',
          '#1565C0',
        ),
        calcMenuBubble(
          '🏗️ คำนวณกระเบื้อง',
          'คำนวณจำนวนแผ่นกระเบื้องปูพื้น',
          'tile',
          '#2E7D32',
        ),
      ],
    },
  };
}

function calcMenuBubble(title, description, calcType, color) {
  return {
    type: 'bubble',
    size: 'kilo',
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: title,
          weight: 'bold',
          size: 'lg',
          color: color,
        },
        {
          type: 'text',
          text: description,
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
          color: color,
          action: {
            type: 'postback',
            label: 'เริ่มคำนวณ',
            data: `action=calc&type=${calcType}`,
            displayText: `คำนวณ${title.replace(/[^\u0E00-\u0E7F]/g, '')}`, // เอาแค่ภาษาไทย
          },
        },
      ],
    },
  };
}

/**
 * สร้าง Flex Bubble แสดงผลลัพธ์การคำนวณ
 * @param {object} result — ผลลัพธ์จาก calculator.js
 * @returns {object} LINE Flex Message
 */
export function createCalculatorResult(result) {
  const product = getProductById(result.productId);
  const totalPrice = product ? product.price * result.quantity : 0;

  const contents = [
    {
      type: 'text',
      text: '🧮 ผลลัพธ์การคำนวณ',
      weight: 'bold',
      size: 'lg',
      color: '#FF6B00',
    },
    {
      type: 'separator',
      margin: 'md',
    },
    {
      type: 'text',
      text: result.detail,
      size: 'sm',
      color: '#333333',
      margin: 'lg',
      wrap: true,
    },
    {
      type: 'separator',
      margin: 'lg',
    },
    {
      type: 'box',
      layout: 'horizontal',
      margin: 'lg',
      contents: [
        {
          type: 'text',
          text: 'จำนวนที่ต้องใช้:',
          size: 'md',
          color: '#555555',
          flex: 0,
        },
        {
          type: 'text',
          text: `${result.quantity} ${result.unit}`,
          size: 'md',
          color: '#FF6B00',
          weight: 'bold',
          align: 'end',
        },
      ],
    },
  ];

  if (product) {
    contents.push({
      type: 'box',
      layout: 'horizontal',
      margin: 'sm',
      contents: [
        {
          type: 'text',
          text: 'ราคาประมาณ:',
          size: 'md',
          color: '#555555',
          flex: 0,
        },
        {
          type: 'text',
          text: `฿${totalPrice.toLocaleString()}`,
          size: 'md',
          color: '#1DB446',
          weight: 'bold',
          align: 'end',
        },
      ],
    });
  }

  const bubble = {
    type: 'bubble',
    size: 'kilo',
    body: {
      type: 'box',
      layout: 'vertical',
      contents,
    },
  };

  // ถ้ามีสินค้าในระบบ เพิ่มปุ่ม "สั่งซื้อ"
  if (product) {
    bubble.footer = {
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
            label: `🛒 สั่งซื้อ ${result.quantity} ${result.unit}`,
            data: `action=reserve&item=${product.id}&qty=${result.quantity}`,
            displayText: `สั่งซื้อ ${product.name} จำนวน ${result.quantity} ${result.unit}`,
          },
        },
        {
          type: 'button',
          style: 'secondary',
          action: {
            type: 'postback',
            label: '🔄 คำนวณใหม่',
            data: 'action=calc_menu',
            displayText: 'คำนวณใหม่',
          },
        },
      ],
    };
  }

  return {
    type: 'flex',
    altText: `ผลคำนวณ: ต้องใช้ ${result.quantity} ${result.unit}`,
    contents: bubble,
  };
}
