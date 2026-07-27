# Step 2 — Keyword & Message Types

## สิ่งที่เรียนในบทนี้

- ตอบข้อความตาม keyword ด้วย object map
- ส่ง Sticker message
- ส่ง Image message
- โครงสร้างโค้ดที่แยกคำสั่งออกจาก logic หลัก

## วิธีรัน

```bash
npm install
cp .env.example .env
nodemon index.js
```

## คำสั่งทดสอบ

| ข้อความ | ผลลัพธ์ |
|---------|---------|
| `สวัสดี` | ข้อความต้อนรับ |
| `ช่วยเหลือ` | รายการคำสั่ง |
| `เมนู` | รูปภาพ + ข้อความ |
| `สติกเกอร์` | LINE Sticker |
| อื่นๆ | echo ข้อความ |

## ไฟล์สำคัญ

| ไฟล์ | หน้าที่ |
|------|--------|
| `index.js` | ตั้งค่า Express + เรียก `processEvents()` |
| `handlers/webhook.js` | วน loop ทุก event |
| `handlers/messageHandler.js` | object `COMMANDS` และ logic ตอบกลับ |

## บทถัดไป

[step3-flex](../step3-flex/) — Flex Message
