/**
 * Flex Message template — ข้อมูลร้าน & FAQ
 */

/**
 * สร้าง Flex Bubble ข้อมูลร้าน
 */
export function createStoreInfoCard() {
  return {
    type: 'flex',
    altText: '📍 ข้อมูลร้านวัสดุก่อสร้าง',
    contents: {
      type: 'bubble',
      size: 'kilo',
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: '🏪 ร้านจิตติภณ ต้าวัสดุ',
            weight: 'bold',
            size: 'lg',
            color: '#FF6B00',
            wrap: true,
          },
          {
            type: 'separator',
            margin: 'lg',
          },
          infoRow('📍 ที่อยู่', '189/6 9 ถนนติวานนท์ - ปทุมธานี, ตำบล บางกะดี อำเภอเมืองปทุมธานี 12000'),
          infoRow('🕐 เวลาเปิด', 'จันทร์-เสาร์: 08:00 - 17:00 น.\nอาทิตย์ 08:00 - 16:00 น.'),
          infoRow('📞 โทรศัพท์', '099-309-5171'),
          infoRow('📱 LINE', '@jittiponhardware'),
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
              type: 'uri',
              label: '📍 ดูแผนที่ Google Maps',
              uri: 'https://maps.google.com/?q=13.985659125541689,100.55090396371105',
            },
          },
          {
            type: 'button',
            style: 'secondary',
            action: {
              type: 'uri',
              label: '📞 โทรหาร้าน',
              uri: 'tel:0993095171',
            },
          },
        ],
      },
    },
  };
}

function infoRow(label, value) {
  return {
    type: 'box',
    layout: 'vertical',
    margin: 'lg',
    contents: [
      {
        type: 'text',
        text: label,
        size: 'sm',
        color: '#FF6B00',
        weight: 'bold',
      },
      {
        type: 'text',
        text: value,
        size: 'sm',
        color: '#333333',
        margin: 'sm',
        wrap: true,
      },
    ],
  };
}
