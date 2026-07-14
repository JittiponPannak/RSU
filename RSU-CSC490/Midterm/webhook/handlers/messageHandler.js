/**
 * Step 2: ตอบตาม keyword และส่งข้อความหลายประเภท
 *
 * คำสั่งทดสอบ:
 *   สวัสดี    → ข้อความต้อนรับ
 *   ช่วยเหลือ → รายการคำสั่ง
 *   เมนู      → ส่งรูปภาพ
 *   สติกเกอร์  → ส่ง sticker
 *   อื่นๆ     → echo ข้อความ
 */

const COMMANDS = {
  Flex: () => ({
    "type": "flex",
    "altText": "Flex Message",
    "contents": {
      "type": "bubble",
      "hero": {
        "type": "image",
        "url": "https://www.rsu.ac.th/api/v2/uploads/1704438064-RSU-01.jpg",
        "size": "full",
        "aspectRatio": "20:13",
        "aspectMode": "cover",
        "action": {
          "type": "uri",
          "label": "Line",
          "uri": "https://linecorp.com/"
        }
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "Rangsit University",
            "weight": "bold",
            "size": "xl",
            "contents": []
          },
          {
            "type": "box",
            "layout": "vertical",
            "spacing": "sm",
            "margin": "lg",
            "contents": [
              {
                "type": "box",
                "layout": "baseline",
                "spacing": "sm",
                "contents": [
                  {
                    "type": "text",
                    "text": "Place",
                    "size": "sm",
                    "color": "#AAAAAA",
                    "flex": 1,
                    "contents": []
                  },
                  {
                    "type": "text",
                    "text": "52, 347 ถนน พหลโยธิน, Lak Hok, Mueang Pathum Thani District, Pathum Thani 12000",
                    "size": "sm",
                    "color": "#666666",
                    "flex": 5,
                    "wrap": true,
                    "contents": []
                  }
                ]
              },
              {
                "type": "box",
                "layout": "baseline",
                "spacing": "sm",
                "contents": [
                  {
                    "type": "text",
                    "text": "Time",
                    "size": "sm",
                    "color": "#AAAAAA",
                    "flex": 1,
                    "contents": []
                  },
                  {
                    "type": "text",
                    "text": "8:30 - 16:30",
                    "size": "sm",
                    "color": "#666666",
                    "flex": 5,
                    "wrap": true,
                    "contents": []
                  }
                ]
              }
            ]
          }
        ]
      },
      "footer": {
        "type": "box",
        "layout": "vertical",
        "flex": 0,
        "spacing": "sm",
        "contents": [
          {
            "type": "button",
            "action": {
              "type": "message",
              "label": "LOCATION",
              "text": "แผนที่ ม.รังสิต"
            },
            "height": "sm",
            "style": "link"
          },
          {
            "type": "button",
            "action": {
              "type": "uri",
              "label": "WEBSITE",
              "uri": "https://www.rsu.ac.th/"
            },
            "height": "sm",
            "style": "link"
          },
          {
            "type": "spacer",
            "size": "sm"
          }
        ]
      }
    }
  })
};

export async function handleEvent(client, event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return null;
  }

  const text = event.message.text.trim();
  const buildMessages = COMMANDS[text];
  const messages = buildMessages
    ? [buildMessages()]
    : [

    ];

  return client.replyMessage({
    replyToken: event.replyToken,
    messages,
  });
}
