# Step 4 — Follow / Unfollow / Postback

## สิ่งที่เรียนในบทนี้

- จัดการ `follow` event — ต้อนรับผู้ใช้ใหม่
- จัดการ `unfollow` event — บันทึก log (ตอบกลับไม่ได้)
- จัดการ `postback` event — รับข้อมูลจากปุ่มใน Flex Message
- แยก handler ตามประเภท event

## วิธีรัน

```bash
npm install
cp .env.example .env
nodemon index.js
```

## ทดสอบ

| การกระทำ | ผลลัพธ์ |
|----------|---------|
| เพิ่มบอทเป็นเพื่อน | ข้อความต้อนรับ |
| บล็อก/ลบบอท | log ใน console |
| พิมพ์ `สินค้า` แล้วกดปุ่ม "สั่งซื้อ" | ข้อความยืนยันคำสั่งซื้อ |

## ไฟล์สำคัญ

| ไฟล์ | หน้าที่ |
|------|--------|
| `index.js` | แยก message event กับ event อื่น |
| `handlers/messageHandler.js` | จัดการข้อความ |
| `handlers/eventHandler.js` | follow / unfollow / postback |

## บทถัดไป

[step5-gemini](../step5-gemini/) — เชื่อมต่อ Google Gemini AI
