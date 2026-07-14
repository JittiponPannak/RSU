export function createMemberLiffCard(liffId, page, title) {
  const liffUrl = `https://liff.line.me/${liffId}/${page}`;
  const descriptions = {
    'register.html': 'กรอกข้อมูลเพื่อสมัครสมาชิกและรับเลขสมาชิก',
    'card.html': 'ดูบัตรสมาชิก ระดับ และแต้มสะสม',
  };

  return {
    type: 'flex',
    altText: title,
    contents: {
      type: 'bubble',
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: title,
            weight: 'bold',
            size: 'xl',
            color: '#06C755',
          },
          {
            type: 'text',
            text: descriptions[page] ?? 'เปิดหน้า LIFF',
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
              label: 'เปิดหน้า LIFF',
              uri: liffUrl,
            },
          },
        ],
      },
    },
  };
}
