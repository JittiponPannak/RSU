# Step 5 — เชื่อมต่อ Google Gemini AI

## สิ่งที่เรียนในบทนี้

- ขอและตั้งค่า **Gemini API Key** อย่างปลอดภัย
- เรียก Google Gemini จาก Node.js ด้วย `@google/generative-ai`
- แยก AI logic ออกเป็น `services/geminiService.js`
- เก็บประวัติสนทนาชั่วคราวต่อผู้ใช้ (in-memory)
- แสดง **Loading animation** ใน LINE ขณะรอ Gemini ตอบ (`showLoadingAnimation`)
- จัดการ error และจำกัดความยาวข้อความตอบกลับ

## ขอ Gemini API Key

1. ไปที่ [Google AI Studio](https://aistudio.google.com/apikey)
2. สร้าง API Key
3. ใส่ใน `.env` → `GEMINI_API_KEY=...`
4. **ห้าม** commit หรือแชร์ API Key

## วิธีรัน

```bash
npm install
cp .env.example .env
# ใส่ CHANNEL_SECRET, CHANNEL_ACCESS_TOKEN, GEMINI_API_KEY

nodemon index.js
```

## คำสั่งทดสอบ

| ข้อความ | ผลลัพธ์ |
|---------|---------|
| `ช่วยเหลือ` | รายการคำสั่ง |
| `ถาม JavaScript คืออะไร` | Gemini ตอบคำถาม (มี loading animation ในแชท 1:1) |
| `ai What is webhook?` | Gemini ตอบ (ภาษาอังกฤษได้) |
| `ถาม อธิบายต่อ` | ใช้ประวัติสนทนาก่อนหน้า |
| `ล้าง` | ล้างประวัติ AI |
| `สินค้า` | Flex Message (จาก step ก่อนหน้า) |

## ไฟล์สำคัญ

| ไฟล์ | หน้าที่ |
|------|--------|
| `index.js` | ตั้งค่า Express + เรียก `processEvents()` |
| `handlers/webhook.js` | วน loop events + แยก message / event อื่น |
| `services/geminiService.js` | เรียก Gemini API + เก็บ history |
| `handlers/messageHandler.js` | แยกคำสั่งปกติ vs คำถาม AI |
| `handlers/eventHandler.js` | follow / postback |

## โฟลว์การทำงาน

```
ผู้ใช้พิมพ์ "ถาม ..."
    → messageHandler ดึงคำถาม
    → showLoadingAnimation (แสดง loading ในแชท)
    → geminiService.askGemini(userId, คำถาม)
    → Gemini API ตอบกลับ (model: gemini-3.1-flash-lite)
    → replyMessage ส่งให้ผู้ใช้ใน LINE
```

## หมายเหตุสำหรับการสอน

- `replyToken` หมดอายุใน 30 วินาที — loading animation ช่วยให้ผู้ใช้รู้ว่าบอทกำลังประมวลผล
- Loading ใช้ได้ในแชท 1:1 เท่านั้น (`showLoadingAnimation` + `chatId` = userId)
- ประวัติสนทนาเก็บใน RAM — รีสตาร์ท server แล้วหาย (production ใช้ DB)
- Model เริ่มต้น: `gemini-3.1-flash-lite` (เปลี่ยนได้ด้วย `GEMINI_MODEL` ใน `.env`)
- ควรจำกัดคำสั่ง AI ด้วย prefix `ถาม` เพื่อควบคุมค่าใช้จ่าย API

## Deploy

- [deploy-render](../deploy-render/) — Deploy บน Render (แนะนำ, โค้ดเหมือน local)
- [firebase](../firebase/) — Deploy บน Firebase (ทางเลือก)

## บทถัดไป

[step6-group](../step6-group/) — Bot ในกลุ่ม (Group Chat)
