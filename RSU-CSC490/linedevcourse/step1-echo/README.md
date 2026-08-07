# Step 1 — Echo Bot

## สิ่งที่เรียนในบทนี้

- โครงสร้าง webhook server ด้วย Express
- การตรวจสอบ signature ด้วย LINE middleware
- การรับ event ข้อความและตอบกลับด้วย Reply API

## วิธีรัน

```bash
npm install
cp .env.example .env
# แก้ไข .env ใส่ CHANNEL_SECRET และ CHANNEL_ACCESS_TOKEN

nodemon index.js
```

เปิด terminal ใหม่ รัน `ngrok http 3000` แล้วตั้ง Webhook URL เป็น `https://YOUR_NGROK_URL/callback`

## ไฟล์สำคัญ

| ไฟล์ | หน้าที่ |
|------|--------|
| `index.js` | สร้าง Express server และลงทะเบียน webhook |
| `handlers/messageHandler.js` | รับ event แล้ว echo ข้อความกลับ |

## ทดสอบ

ส่งข้อความใดๆ ให้บอท — บอทจะตอบกลับข้อความเดียวกัน

## บทถัดไป

[step2-messages](../step2-messages/) — ตอบตาม keyword และส่ง Sticker / Image
