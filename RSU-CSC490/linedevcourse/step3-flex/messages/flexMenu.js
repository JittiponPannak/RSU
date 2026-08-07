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

function formatTomorrowPrice(price) {
  if (price == null) return '-';
  const formatted = price.toFixed(2);
  if (formatted.endsWith('.00')) {
    return price.toFixed(0);
  }
  if (formatted.endsWith('0')) {
    return price.toFixed(1);
  }
  return formatted;
}

function formatDiff(diff) {
  if (diff == null || diff === 0) return '-';
  if (diff > 0) return `+${diff.toFixed(2)}`;
  return `${diff.toFixed(2)}`;
}

function getDiffColor(diff) {
  if (diff == null || diff === 0) return '#000000';
  if (diff > 0) return '#D32F2F'; // Red for price increase
  return '#28A745'; // Green for price decrease
}

/** การ์ดราคาน้ำมัน — ใช้ข้อมูลจาก fetchThaiOilPrices() */
export function createThaiOilPriceCard(oilData) {
  const { oilDateNow, oilList, oilRemark } = oilData;

  const rows = oilList.map((oil, idx) => {
    const isEven = idx % 2 === 0;
    const backgroundColor = isEven ? '#ffffff' : '#f5f5f5';

    return {
      type: 'box',
      layout: 'horizontal',
      alignItems: 'center',
      backgroundColor: backgroundColor,
      paddingTop: 'md',
      paddingBottom: 'md',
      paddingStart: 'lg',
      paddingEnd: 'lg',
      contents: [
        {
          type: 'box',
          layout: 'vertical',
          flex: 5,
          contents: [
            {
              type: 'image',
              url: oil.icon || 'https://webbcpopaprd001.azurewebsites.net/ApiGetImages?FileName=nobanneroilprice.jpg',
              size: 'full',
              aspectMode: 'fit',
              aspectRatio: '5:2',
              gravity: 'center',
            },
          ],
        },
        {
          type: 'text',
          text: oil.priceToday != null ? oil.priceToday.toFixed(2) : '-',
          flex: 2,
          align: 'center',
          gravity: 'center',
          color: '#555555',
          size: 'sm',
        },
        {
          type: 'text',
          text: formatTomorrowPrice(oil.priceTomorrow),
          flex: 2,
          align: 'center',
          gravity: 'center',
          weight: 'bold',
          color: '#000000',
          size: 'sm',
        },
        {
          type: 'text',
          text: formatDiff(oil.priceDifTomorrow),
          flex: 2,
          align: 'center',
          gravity: 'center',
          weight: 'bold',
          color: getDiffColor(oil.priceDifTomorrow),
          size: 'sm',
        },
      ],
    };
  });

  return {
    type: 'flex',
    altText: `ราคาน้ำมันบางจากวันนี้ ${oilDateNow}`,
    contents: {
      type: 'bubble',
      header: {
        type: 'box',
        layout: 'horizontal',
        alignItems: 'center',
        paddingAll: 'md',
        backgroundColor: '#ffffff',
        contents: [
          {
            type: 'image',
            url: 'https://oil-price.bangchak.co.th/icon/logo_bcp.svg',
            size: 'md',
            aspectMode: 'fit',
            aspectRatio: '3:1',
          },
          {
            type: 'text',
            text: oilDateNow ? `วันที่ ${oilDateNow}` : '',
            align: 'end',
            gravity: 'center',
            weight: 'bold',
            size: 'sm',
            color: '#333333',
          },
        ],
      },
      body: {
        type: 'box',
        layout: 'vertical',
        paddingAll: 'none',
        contents: [
          {
            type: 'box',
            layout: 'horizontal',
            backgroundColor: '#70B214',
            paddingTop: 'md',
            paddingBottom: 'md',
            paddingStart: 'lg',
            paddingEnd: 'lg',
            contents: [
              {
                type: 'text',
                text: 'ชนิดน้ำมัน',
                flex: 3,
                align: 'start',
                gravity: 'center',
                weight: 'bold',
                color: '#ffffff',
                size: 'sm',
              },
              {
                type: 'text',
                text: 'บาท/ลิตร',
                flex: 2,
                align: 'center',
                gravity: 'center',
                weight: 'bold',
                color: '#ffffff',
                size: 'sm',
              },
              {
                type: 'text',
                text: 'วันนี้',
                flex: 2,
                align: 'center',
                gravity: 'center',
                weight: 'bold',
                color: '#ffffff',
                size: 'sm',
              },
              {
                type: 'text',
                text: 'พรุ่งนี้',
                flex: 2,
                align: 'center',
                gravity: 'center',
                weight: 'bold',
                color: '#ffffff',
                size: 'sm',
              },
              {
                type: 'text',
                text: 'ส่วนต่าง',
                flex: 2,
                align: 'center',
                gravity: 'center',
                weight: 'bold',
                color: '#ffffff',
                size: 'sm',
              },
            ],
          },
          ...rows,
          {
            type: 'box',
            layout: 'vertical',
            paddingAll: 'lg',
            contents: [
              {
                type: 'text',
                text: oilRemark || 'หมายเหตุ: ราคาขายปลีก กทม. ที่ยังไม่รวมภาษีบำรุงท้องถิ่น กทม.',
                color: '#D35400',
                size: 'xs',
                align: 'center',
                wrap: true,
              },
            ],
          },
        ],
      },
    },
  };
}

/** การ์ดราคาโลหะมีค่า (สามกษัตริย์) — ใช้ข้อมูลจาก fetchPreciousMetalsPrices() */
export function createPreciousMetalsCard(metalsData) {
  const { metals, updatedAt, source } = metalsData;

  const metalColors = {
    gold: '#D4AF37',
    silver: '#7E8C8D',
    platinum: '#4B779A',
  };

  const bodyContents = [];

  metals.forEach((metal, idx) => {
    if (idx > 0) {
      bodyContents.push({
        type: 'separator',
        margin: 'md',
      });
    }

    const priceUsdFormatted = metal.priceUsd != null
      ? `$${metal.priceUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : '-';

    const priceThbFormatted = metal.priceThb != null
      ? `≈ ฿${metal.priceThb.toLocaleString('th-TH', { maximumFractionDigits: 0 })}`
      : '-';

    bodyContents.push({
      type: 'box',
      layout: 'vertical',
      margin: 'md',
      contents: [
        {
          type: 'text',
          text: metal.name,
          weight: 'bold',
          size: 'md',
          color: metalColors[metal.key] || '#333333',
        },
        {
          type: 'box',
          layout: 'horizontal',
          margin: 'xs',
          contents: [
            {
              type: 'text',
              text: `${priceUsdFormatted} / oz`,
              size: 'sm',
              color: '#666666',
            },
            {
              type: 'text',
              text: priceThbFormatted,
              size: 'sm',
              weight: 'bold',
              align: 'right',
              color: '#333333',
            },
          ],
        },
      ],
    });
  });

  return {
    type: 'flex',
    altText: 'ราคาโลหะมีค่าวันนี้ (Spot)',
    contents: {
      type: 'bubble',
      header: {
        type: 'box',
        layout: 'vertical',
        backgroundColor: '#1A1A2E',
        paddingAll: 'lg',
        contents: [
          {
            type: 'text',
            text: 'ราคาโลหะมีค่า (Spot)',
            color: '#ffffff',
            weight: 'bold',
            size: 'lg',
          },
          {
            type: 'text',
            text: `อัปเดต: ${formatUpdatedAt(updatedAt)}`,
            color: '#A9B8C4',
            size: 'xs',
            margin: 'xs',
          },
        ],
      },
      body: {
        type: 'box',
        layout: 'vertical',
        paddingAll: 'lg',
        contents: bodyContents,
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'button',
            style: 'primary',
            color: '#1A1A2E',
            action: {
              type: 'postback',
              label: 'รีเฟรชราคา',
              data: 'action=refresh-precious',
              displayText: 'ขอราคาโลหะมีค่าล่าสุด',
            },
          },
          {
            type: 'text',
            text: `แหล่งข้อมูล: ${source}`,
            size: 'xxs',
            color: '#aaaaaa',
            align: 'center',
            margin: 'md',
          },
        ],
      },
    },
  };
}
