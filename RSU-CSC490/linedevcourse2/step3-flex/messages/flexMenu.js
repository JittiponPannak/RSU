/**
 * Flex Message templates
 * ทดสอบด้วย Flex Message Simulator: https://developers.line.biz/flex-simulator/
 */

function formatUsd(value) {
  return `$${Number(value).toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
}

function formatThb(value) {
  return `฿${Number(value).toLocaleString('th-TH', { maximumFractionDigits: 0 })}`;
}

function formatUpdatedAt(iso) {
  try {
    return new Date(iso).toLocaleString('th-TH', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  } catch {
    return '-';
  }
}

/** การ์ดสินค้าตัวอย่าง (static) — สำหรับเรียนโครงสร้าง Flex */
export function createProductCard() {
  return {
    type: 'flex',
    altText: 'สินค้าแนะนำ',
    contents: {
      type: 'bubble',
      hero: {
        type: 'image',
        url: 'https://developers-resource.landpress.line.me/fx/img/01_1_cafe.png',
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
            text: 'กาแฟลาเต้',
            weight: 'bold',
            size: 'xl',
          },
          {
            type: 'box',
            layout: 'baseline',
            margin: 'md',
            contents: [
              {
                type: 'text',
                text: '฿65',
                size: 'lg',
                color: '#1DB446',
                weight: 'bold',
              },
              {
                type: 'text',
                text: '/ แก้ว',
                size: 'sm',
                color: '#aaaaaa',
                margin: 'sm',
              },
            ],
          },
          {
            type: 'text',
            text: 'ตัวอย่างการ์ด Flex แบบ static — ดู keyword ราคาทอง สำหรับดึงราคาจาก API',
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
        spacing: 'sm',
        contents: [
          {
            type: 'button',
            style: 'primary',
            action: {
              type: 'postback',
              label: 'สั่งซื้อ',
              data: 'action=order&item=latte',
              displayText: 'สั่งกาแฟลาเต้',
            },
          },
        ],
      },
    },
  };
}

/** การ์ดราคาทอง — ใช้ข้อมูลจาก fetchGoldPrice() */
export function createGoldPriceCard({ priceUsd, priceThb, unit, updatedAt, source }) {
  const priceLines = [
    {
      type: 'text',
      text: formatUsd(priceUsd),
      size: 'xxl',
      weight: 'bold',
      color: '#D4AF37',
    },
  ];

  if (priceThb != null) {
    priceLines.push({
      type: 'text',
      text: `≈ ${formatThb(priceThb)} ${unit}`,
      size: 'md',
      color: '#333333',
      margin: 'sm',
      wrap: true,
    });
  }

  return {
    type: 'flex',
    altText: `ราคาทองวันนี้ ${formatUsd(priceUsd)}`,
    contents: {
      type: 'bubble',
      hero: {
        type: 'image',
        url: 'https://developers-resource.landpress.line.me/fx/img/01_4_news.png',
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
            text: 'ราคาทองคำ (Spot)',
            weight: 'bold',
            size: 'xl',
          },
          {
            type: 'box',
            layout: 'vertical',
            margin: 'lg',
            spacing: 'sm',
            contents: priceLines,
          },
          {
            type: 'separator',
            margin: 'lg',
          },
          {
            type: 'text',
            text: `อัปเดต: ${formatUpdatedAt(updatedAt)}`,
            size: 'xs',
            color: '#888888',
            margin: 'md',
            wrap: true,
          },
          {
            type: 'text',
            text: `แหล่งข้อมูล: ${source ?? 'Public API'}`,
            size: 'xs',
            color: '#aaaaaa',
            margin: 'sm',
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
            color: '#C9A227',
            action: {
              type: 'postback',
              label: 'รีเฟรชราคา',
              data: 'action=refresh-gold',
              displayText: 'ขอราคาทองล่าสุด',
            },
          },
        ],
      },
    },
  };
}
