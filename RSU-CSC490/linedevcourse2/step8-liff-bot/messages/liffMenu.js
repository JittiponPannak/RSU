/**
 * Flex Message — ปุ่มเปิด LIFF app
 * action type: uri → เปิด https://liff.line.me/{liffId}
 * Endpoint URL ใน Console ตั้งเป็น https://xxxx.ngrok-free.app/ (ไม่ใส่ /order.html)
 */
export function createLiffOrderCard(liffId) {
  const id = String(liffId ?? '').trim();
  const liffUrl = `https://liff.line.me/${id}`;

  return {
    type: 'flex',
    altText: 'เปิดหน้าสั่งซื้อ LIFF',
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
            text: 'สั่งซื้อผ่าน LIFF',
            weight: 'bold',
            size: 'xl',
          },
          {
            type: 'text',
            text: 'กดปุ่มด้านล่างเพื่อเปิดฟอร์มสั่งซื้อในแอป LINE',
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
            color: '#06C755',
            action: {
              type: 'uri',
              label: 'เปิดหน้าสั่งซื้อ',
              uri: liffUrl,
            },
          },
        ],
      },
    },
  };
}
