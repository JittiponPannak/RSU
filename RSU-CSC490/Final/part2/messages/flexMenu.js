/**
 * Flex Message templates
 * ทดสอบด้วย Flex Message Simulator: https://developers.line.biz/flex-simulator/
 */

/**
 * 1. นามบัตรตัวเอง (ข้อ 3.2 Dynamic Flex Message)
 * ดึงข้อมูลจาก liff.getProfile() หรือจากผู้ใช้ป้อนข้อมูลมาสร้าง Flex Message
 */
export function createUserBusinessCard({ displayName, pictureUrl, studentId, major }) {
  const userPic = pictureUrl && pictureUrl.trim() !== ''
    ? pictureUrl
    : '';
  const userName = displayName && displayName.trim() !== '' ? displayName : 'ผู้ใช้งาน LINE';
  const sId = studentId && studentId.trim() !== '' ? studentId : 'ยังไม่ได้ระบุรหัสนักศึกษา';
  const maj = major && major.trim() !== '' ? major : 'วิทยาลัยนวัตกรรมดิจิทัลเทคโนโลยี';

  return {
    type: 'flex',
    altText: `นามบัตรดิจิทัล - ${userName}`,
    contents: {
      type: 'bubble',
      size: 'mega',
      header: {
        type: 'box',
        layout: 'vertical',
        backgroundColor: '#0F172A',
        paddingAll: 'lg',
        contents: [
          {
            type: 'text',
            text: '🪪 DIGITAL BUSINESS CARD',
            color: '#38BDF8',
            weight: 'bold',
            size: 'xs',
          },
          {
            type: 'text',
            text: userName,
            color: '#FFFFFF',
            weight: 'bold',
            size: 'xl',
            margin: 'xs',
          },
        ],
      },
      hero: {
        type: 'image',
        url: userPic,
        size: 'full',
        aspectRatio: '1:1',
        aspectMode: 'cover',
      },
      body: {
        type: 'box',
        layout: 'vertical',
        spacing: 'md',
        contents: [
          {
            type: 'box',
            layout: 'vertical',
            spacing: 'xs',
            contents: [
              {
                type: 'text',
                text: '🆔 รหัสนักศึกษา',
                size: 'xs',
                color: '#64748B',
                weight: 'bold',
              },
              {
                type: 'text',
                text: sId,
                size: 'md',
                weight: 'bold',
                color: '#0F172A',
              },
            ],
          },
          {
            type: 'separator',
          },
          {
            type: 'box',
            layout: 'vertical',
            spacing: 'xs',
            contents: [
              {
                type: 'text',
                text: '🎓 หลักสูตรที่เรียน',
                size: 'xs',
                color: '#64748B',
                weight: 'bold',
              },
              {
                type: 'text',
                text: maj,
                size: 'sm',
                weight: 'bold',
                color: '#1E293B',
                wrap: true,
              },
            ],
          },
          {
            type: 'separator',
          },
          {
            type: 'box',
            layout: 'vertical',
            spacing: 'xs',
            contents: [
              {
                type: 'text',
                text: '🏫 สถาบันการศึกษา',
                size: 'xs',
                color: '#64748B',
                weight: 'bold',
              },
              {
                type: 'text',
                text: 'วิทยาลัยนวัตกรรมดิจิทัลเทคโนโลยี มหาวิทยาลัยรังสิต (RSU)',
                size: 'xs',
                color: '#475569',
                wrap: true,
              },
            ],
          },
        ],
      },
    },
  };
}

/**
 * 2. นามบัตร อ.เนร (ข้อ 3.3 Static Flex Message)
 * ข้อมูล Static ของอาจารย์วุฒิพงษ์ ชินศรี
 */
export function createAjarnNeraBusinessCard() {
  return {
    type: 'flex',
    altText: 'นามบัตร อาจารย์วุฒิพงษ์ ชินศรี (อ.เนร)',
    contents: {
      type: 'bubble',
      size: 'mega',
      hero: {
        type: 'image',
        url: 'https://wutthipong.info/image/LCC2023.webp',
        size: 'full',
        aspectRatio: '1:1',
        aspectMode: 'cover',
      },
      body: {
        type: 'box',
        layout: 'vertical',
        spacing: 'md',
        contents: [
          {
            type: 'text',
            text: 'วุฒิพงษ์ ชินศรี',
            weight: 'bold',
            size: 'xl',
            color: '#0F172A',
          },
          {
            type: 'text',
            text: 'อาจารย์ ม.รังสิต',
            weight: 'bold',
            size: 'sm',
            color: '#2563EB',
          },
          {
            type: 'separator',
            margin: 'md',
          },
          {
            type: 'text',
            text: 'วิทยาลัยนวัตกรรมดิจิทัลเทคโนโลยี มหาวิทยาลัยรังสิต',
            size: 'xs',
            color: '#64748B',
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
            color: '#2563EB',
            action: {
              type: 'uri',
              label: 'Website',
              uri: 'https://wutthipong.info',
            },
          },
        ],
      },
    },
  };
}

/** การ์ด Flex Message Demo — สำหรับแสดงผลเมื่อพิมพ์ "Flex" */
export function createFlexDemoCard() {
  return {
    type: 'flex',
    altText: 'Flex Message Showcase — RSU Smart Assistant',
    contents: {
      type: 'bubble',
      size: 'mega',
      hero: {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
        size: 'full',
        aspectRatio: '20:13',
        aspectMode: 'cover',
      },
      body: {
        type: 'box',
        layout: 'vertical',
        spacing: 'md',
        contents: [
          {
            type: 'text',
            text: '✨ Flex Message Showcase',
            weight: 'bold',
            size: 'xl',
            color: '#1DB446',
          },
          {
            type: 'text',
            text: 'ยินดีต้อนรับสู่ระบบ Flex Message ของ RSU Smart Bot! ออกแบบด้วยดีไซน์สวยงามและทันสมัย',
            size: 'sm',
            color: '#555555',
            wrap: true,
          },
          {
            type: 'separator',
            margin: 'md',
          },
          {
            type: 'box',
            layout: 'vertical',
            margin: 'md',
            spacing: 'sm',
            contents: [
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  { type: 'text', text: '🤖 Gen AI:', size: 'xs', color: '#888888', flex: 3 },
                  { type: 'text', text: 'Google Gemini API', size: 'xs', color: '#111111', flex: 7, weight: 'bold' },
                ],
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  { type: 'text', text: '🎓 สถาบัน:', size: 'xs', color: '#888888', flex: 3 },
                  { type: 'text', text: 'วิทยาลัยนวัตกรรมดิจิทัล RSU', size: 'xs', color: '#111111', flex: 7, weight: 'bold' },
                ],
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  { type: 'text', text: '👨‍🏫 อาจารย์ประจำ:', size: 'xs', color: '#888888', flex: 3 },
                  { type: 'text', text: 'อ.วุฒิพงษ์ ชินศรี (อ.เนร)', size: 'xs', color: '#111111', flex: 7, weight: 'bold' },
                ],
              },
            ],
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
            color: '#00C300',
            action: {
              type: 'message',
              label: 'ถาม อ.เนร',
              text: 'อ.เนร สอนวิชาอะไรบ้าง',
            },
          },
          {
            type: 'button',
            style: 'secondary',
            action: {
              type: 'message',
              label: 'ทักทายสวัสดี',
              text: 'สวัสดี',
            },
          },
        ],
      },
    },
  };
}

/** การ์ดสินค้าตัวอย่าง (static) */
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
            text: 'ตัวอย่างการ์ด Flex แบบ static',
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
