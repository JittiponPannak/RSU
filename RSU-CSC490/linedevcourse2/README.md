# LINE Chatbot Starter — ชุดตัวอย่างสำหรับการเรียนการสอน

โปรเจกต์นี้จัดทำสำหรับใช้สอนนักศึกษาพัฒนา LINE Chatbot ด้วย JavaScript แยกเป็นโฟลเดอร์ตามขั้นบทเรียน แต่ละ step เป็นโปรเจกต์ที่รันได้อิสระ

**ใบงานปฏิบัติการสำหรับนักศึกษา:**

- **เว็บ (แนะนำ):** [docs/lab-worksheet/index.html](docs/lab-worksheet/index.html) — ใบงาน Lab สำหรับนักศึกษา + ซิงค์ Firebase  
  **Deploy เว็บ:** [docs/DEPLOY.md](docs/DEPLOY.md) (Firebase Hosting / Netlify)
- **Dashboard ผู้สอน:** [docs/lab-worksheet/dashboard.html](docs/lab-worksheet/dashboard.html) — ภาพรวมความคืบหน้าทั้งชั้น (เปิดผ่าน URL โดยตรง)
- **Markdown:** [docs/LAB_WORKSHEET.md](docs/LAB_WORKSHEET.md)

## โครงสร้างโปรเจกต์

| โฟลเดอร์ | หัวข้อที่เรียน |
|----------|---------------|
| [step1-echo](step1-echo/) | Webhook + Echo bot |
| [step2-messages](step2-messages/) | Keyword, Sticker, Image |
| [step3-flex](step3-flex/) | Flex Message |
| [step4-events](step4-events/) | Follow / Unfollow / Postback |
| [step5-gemini](step5-gemini/) | เชื่อมต่อ Google Gemini AI |
| [step6-group](step6-group/) | Bot ในกลุ่ม (Group Chat) |
| [step7-liff](step7-liff/) | LINE Front-end Framework (LIFF) — พื้นฐาน |
| [step8-liff-bot](step8-liff-bot/) | LIFF + Messaging API (เปิดจากแชท, sendMessages) |
| [step9-liff-member](step9-liff-member/) | LIFF ระบบสมาชิก (ลงทะเบียน, บัตรสมาชิก, แต้ม) |
| [deploy-render](deploy-render/) | Deploy บน Render (แนะนำ — โค้ดเหมือน local) |
| [firebase](firebase/) | Deploy บน Firebase Cloud Functions (ทางเลือก) |

## สิ่งที่ต้องเตรียม

1. **Node.js** — ติดตั้งเวอร์ชัน **LTS** จาก [nodejs.org](https://nodejs.org/) (ไม่เลือก Current)
2. **npm** (มากับ Node.js)
3. **IDE** — แนะนำ [Antigravity IDE](https://antigravity.google/) (หรือ VS Code / Cursor) สำหรับแก้โค้ดและรัน terminal
4. **บัญชี LINE Developers** — [https://developers.line.biz/](https://developers.line.biz/)
5. **ngrok** — สำหรับทดสอบ webhook บนเครื่องตัวเอง — [https://ngrok.com/](https://ngrok.com/)
6. **Render** (แนะนำเมื่อ deploy) — [https://render.com/](https://render.com/)
7. **Firebase CLI** (ทางเลือก) — `npm install -g firebase-tools`

## สร้าง LINE Messaging API Channel

1. เข้า [LINE Developers Console](https://developers.line.biz/console/)
2. สร้าง Provider (ถ้ายังไม่มี)
3. สร้าง Channel ประเภท **Messaging API**
4. บันทึกค่าต่อไปนี้:
   - **Channel Secret** — แท็บ Basic settings
   - **Channel Access Token** — แท็บ Messaging API → Issue

## เริ่มต้นรัน (Step 1)

```bash
cd step1-echo
cp .env.example .env
# แก้ไข .env ใส่ CHANNEL_SECRET และ CHANNEL_ACCESS_TOKEN

npm install
nodemon index.js
```

เปิด terminal อีกหน้าต่าง รัน ngrok:

```bash
ngrok http 3000
```

คัดลอก URL จาก ngrok (เช่น `https://xxxx.ngrok-free.app`) แล้วตั้งค่าใน LINE Console:

- **Webhook URL:** `https://xxxx.ngrok-free.app/callback`
- กด **Verify** (ต้องได้ Success)
- เปิด **Use webhook**

เพิ่มบอทเป็นเพื่อนแล้วส่งข้อความทดสอบ — บอทจะตอบกลับข้อความเดียวกัน (echo)

## ลำดับการสอน

| คาบ | Step | ไฟล์หลักที่ควรดู |
|-----|------|------------------|
| 1 | step1-echo | `index.js`, `handlers/messageHandler.js` |
| 2 | step2-messages | `handlers/messageHandler.js` |
| 3 | step3-flex | `services/priceService.js`, `messages/flexMenu.js` |
| 4 | step4-events | `handlers/eventHandler.js`, `handlers/messageHandler.js` |
| 5 | step5-gemini | `services/geminiService.js`, `handlers/messageHandler.js` |
| 6 | step6-group | `utils/sourceContext.js`, `handlers/eventHandler.js` |
| 7 | step7-liff | `public/app.js`, `index.js` (`/config.js`) |
| 8 | step8-liff-bot | `public/order.js`, `messages/liffMenu.js` |
| 9 | step9-liff-member | `store/memberStore.js`, `public/register.js` |
| 10 | deploy-render | `index.js` (เหมือน step5), Environment Variables |
| (ทางเลือก) | firebase | `functions/index.js` (ต่างจาก local) |

### นักศึกษาตามไม่ทัน?

แต่ละ step เป็นโปรเจกต์สมบูรณ์ — copy โฟลเดอร์ step ถัดไปมารันแทนได้ทันที แล้วเปรียบเทียบ diff กับ step ก่อนหน้าเพื่อเรียนรู้สิ่งที่เพิ่มเข้ามา

### โครงสร้างโค้ดที่ใช้ร่วมกันทุก step

```
stepN-xxx/
├── index.js              ← ตั้งค่า server + เรียก processEvents()
└── handlers/
    ├── webhook.js        ← วน loop events + แยกประเภท message/อื่นๆ
    └── messageHandler.js ← logic ตอบกลับ (แต่ละ step ต่างกัน)
```

`deploy-render/` และ `step5-gemini/` ใช้ `index.js` แบบเดียวกัน  
`firebase/functions/` ใช้ handlers เหมือน step5 แต่ `index.js` ต่าง (Cloud Function)

## Deploy บน Render (แนะนำ)

ดูรายละเอียดใน [deploy-render/README.md](deploy-render/README.md)

สรุปขั้นตอน:

1. Push โค้ดขึ้น GitHub
2. สร้าง Web Service บน [Render](https://render.com/) — Root Directory: `deploy-render`
3. ตั้ง Environment Variables: `CHANNEL_SECRET`, `CHANNEL_ACCESS_TOKEN`, `GEMINI_API_KEY`
4. นำ URL ไปตั้ง Webhook: `https://YOUR-APP.onrender.com/callback`

## Deploy บน Firebase (ทางเลือก)

ดูรายละเอียดใน [firebase/README.md](firebase/README.md)

สรุปขั้นตอน:

```bash
cd firebase
firebase login
firebase init functions   # เลือกโปรเจกต์ Firebase ของคุณ
firebase functions:secrets:set CHANNEL_SECRET
firebase functions:secrets:set CHANNEL_ACCESS_TOKEN
firebase functions:secrets:set GEMINI_API_KEY
firebase deploy --only functions
```

นำ URL ของ Cloud Function ไปตั้งเป็น Webhook URL ใน LINE Console

## แก้ปัญหาที่พบบ่อย

| อาการ | สาเหตุที่เป็นไปได้ | วิธีแก้ |
|-------|-------------------|--------|
| Webhook Verify ล้มเหลว | server ไม่รัน / ngrok หมดอายุ | ตรวจ `nodemon index.js` และ ngrok URL |
| 401 Invalid signature | Channel Secret ผิด | ตรวจค่าใน `.env` |
| บอทไม่ตอบ | Use webhook ปิด / server ไม่รัน | ตรวจการตั้งค่าใน LINE Console |
| Reply ไม่สำเร็จ | replyToken หมดอายุ (30 วินาที) | ตอบกลับเร็วขึ้น / ลด logic ก่อน reply |
| Gemini ไม่ตอบ | API Key ผิด / หมด quota | ตรวจ `GEMINI_API_KEY` ใน `.env` หรือ Render |
| บอทไม่ตอบครั้งแรก (Render) | Free tier sleep | รอ 30–60 วินาที แล้วลองใหม่ |
| Firebase signature fail | ใช้ middleware แทน validateSignature | ใช้โค้ดใน `firebase/functions/index.js` |
| LIFF เปิดไม่ได้ | Endpoint URL ไม่ตรง ngrok / ไม่ใช่ HTTPS | อัปเดต LIFF app ใน LINE Console |
| `sendMessages` error | เปิด LIFF นอกแชทบอท | เปิดจากแชท 1:1 หลังกดปุ่มใน Flex |

## เทคโนโลยี

- [Express](https://expressjs.com/)
- [@line/bot-sdk](https://github.com/line/line-bot-sdk-nodejs)
- [dotenv](https://github.com/motdotla/dotenv)
- [Render](https://render.com/)
- [Firebase Cloud Functions](https://firebase.google.com/docs/functions)
