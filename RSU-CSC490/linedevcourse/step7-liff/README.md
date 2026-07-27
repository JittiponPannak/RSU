# Step 7 — LINE Front-end Framework (LIFF) พื้นฐาน

## สิ่งที่เรียนในบทนี้

- **LIFF** คืออะไร — เปิดหน้าเว็บ (HTML/JS) ภายในแอป LINE
- เพิ่ม **LIFF App** ใน LINE Developers Console
- ใช้ **LIFF SDK** (`liff.init`, `liff.getProfile`, `liff.getContext`)
- เสิร์ฟหน้าเว็บด้วย Express + ทดสอบผ่าน **ngrok** (ต้องใช้ HTTPS)
- แยก **LIFF ID** ออกจากโค้ดด้วย `/config.js`

## LIFF vs Messaging API Bot

| หัวข้อ | Messaging API (step 1–6) | LIFF (step 7+) |
|--------|--------------------------|----------------|
| รันที่ไหน | Server (Node.js) | Browser ในแอป LINE |
| รับ event | Webhook | เปิดจาก URL / ปุ่มในแชท |
| ใช้ทำอะไร | ตอบข้อความอัตโนมัติ | ฟอร์ม, ชำระเงิน, UI ซับซ้อน |

## ตั้งค่า LINE Console (ก่อนสร้าง LIFF)

### 1. สร้าง LINE Login Channel + Publish

LIFF ที่ใช้ `profile` และ `liff.login()` ต้องมี **LINE Login channel** ผูกกับ Messaging API channel

1. [LINE Developers Console](https://developers.line.biz/console/) → Provider เดียวกับบอท
2. **Create a new channel** → เลือก **LINE Login**
3. กรอกชื่อ channel, อีเมล — App types: **Web app**
4. เปิด **Messaging API channel** → แท็บ **Basic settings** → **Linked LINE Login channel** → เลือก Login channel ที่สร้าง
5. เปิด **LINE Login channel** → **Basic settings** → **Publish** → ยืนยัน
6. เปิด **Messaging API channel** → **Publish** (ถ้ายังสถานะ Developing)

> ช่วงเรียนอาจทดสอบใน Developing ได้ถ้าบัญชี LINE เป็น Admin/Developer — แต่ควร Publish ก่อนใช้กับผู้ใช้ทั่วไป

### 2. เพิ่ม LIFF App ใน LINE Console

LIFF app สร้างใน **Messaging API channel** ของบอท ไม่ใช่ใน LINE Login channel

1. [LINE Developers Console](https://developers.line.biz/console/) → Provider → เปิด **Messaging API channel** ของบอท
2. แท็บ **LIFF** → กด **Add**
3. กรอกฟอร์ม:

| ฟิลด์ | ค่าที่แนะนำ | หมายเหตุ |
|-------|-------------|----------|
| LIFF app name | `Step7 Profile` | ตั้งชื่อแยกตาม lab ได้ (เช่น Step8 Order) |
| Size | **Full** | Compact = ครึ่งจอ, Tall ≈ 80% ความสูง |
| Endpoint URL | `https://xxxx.ngrok-free.app/` | ต้องเป็น **HTTPS** — ใช้ URL จาก ngrok |
| Scope | **profile** | ติ๊ก profile เพื่อใช้ `getProfile()` / `liff.login()` |

4. กด **Add** → ในตาราง LIFF apps คัดลอก **LIFF ID** ใส่ใน `.env`
5. ทดสอบเปิด `https://liff.line.me/{LIFF_ID}` ในแอป LINE (หรือสแกน QR จาก Console)

> **Endpoint URL ต้องตรง ngrok:** รัน server + `ngrok http 3000` ก่อน แล้วนำ HTTPS URL ไปใส่ — ถ้า restart ngrok แล้ว URL เปลี่ยน ให้กลับมา **Edit** LIFF app ในแท็บ LIFF

## วิธีรัน

```bash
npm install
cp .env.example .env
# แก้ .env ใส่ LIFF_ID

nodemon index.js
```

เปิด terminal อีกหน้าต่าง:

```bash
ngrok http 3000
```

1. นำ URL จาก ngrok (เช่น `https://abcd.ngrok-free.app`) ไปตั้งเป็น **Endpoint URL** ใน LIFF app
2. เปิด LIFF URL ในแอป LINE: `https://liff.line.me/{LIFF_ID}`

## ผลลัพธ์ที่คาดหวัง

- หน้าเว็บแสดงรูปโปรไฟล์, ชื่อ, userId ของผู้ใช้
- แสดง JSON จาก `liff.getContext()` (เช่น `type`, `userId`, `liffId`)

## ไฟล์สำคัญ

| ไฟล์ | หน้าที่ |
|------|--------|
| `index.js` | Express เสิร์ฟ static + endpoint `/config.js` |
| `public/index.html` | หน้า LIFF |
| `public/app.js` | เรียก LIFF SDK ดึง profile |
| `public/style.css` | สไตล์หน้าเว็บ |

## หมายเหตุสำหรับการสอน

- LIFF Endpoint URL **ต้องเป็น HTTPS** — localhost ใช้ได้เฉพาะบางกรณี แนะนำใช้ ngrok
- ถ้าเปลี่ยน ngrok URL ต้องอัปเดต Endpoint URL ใน LIFF app ทุกครั้ง (free tier)
- เปิดนอกแอป LINE จะเห็นข้อความแจ้งให้เปิดผ่าน LIFF URL

## บทถัดไป

[step8-liff-bot](../step8-liff-bot/) — เชื่อม LIFF กับบอท (เปิดจากแชท + ส่งข้อความกลับ)
