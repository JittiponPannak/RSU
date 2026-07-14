# Step 6 — Bot ในกลุ่ม (Group Chat)

## สิ่งที่เรียนในบทนี้

- ความแตกต่างระหว่างแชทส่วนตัว (`user`) กับกลุ่ม (`group`) / ห้องแชท (`room`)
- เปิดใช้งาน **Allow bot to join group chats** ใน LINE Console
- ตอบเฉพาะเมื่อถูก **@mention** ในกลุ่ม (ลด spam)
- จัดการ event: `join`, `leave`, `memberJoined`, `memberLeft`
- ดึงข้อมูลกลุ่มด้วย `getGroupSummary` / `getGroupMemberCount`
- ส่ง **push message** ไปยังกลุ่ม (ใช้ `groupId` เป็น `to`)

## ตั้งค่า LINE Console (สำคัญ)

1. ไปที่ [LINE Developers Console](https://developers.line.biz/console/)
2. แท็บ **Messaging API** ของ Channel คุณ
3. เปิด **Allow bot to join group chats** (ปิดอยู่ตามค่าเริ่มต้น)
4. ตั้ง Webhook URL เหมือน step ก่อนหน้า

## วิธีรัน

```bash
npm install
cp .env.example .env
nodemon index.js
```

## วิธีทดสอบในกลุ่ม

1. สร้างกลุ่ม LINE แล้วเชิญบอทเข้ากลุ่ม (เพิ่มเพื่อน → เชิญ)
2. บอทจะส่งข้อความต้อนรับเมื่อเข้ากลุ่ม (`join` event)
3. ในกลุ่ม **ต้อง @mention บอท** ก่อนสั่งคำสั่ง

| การทดสอบ | ผลลัพธ์ |
|----------|---------|
| @บอท ช่วยเหลือ | รายการคำสั่งในกลุ่ม |
| @บอท ข้อมูลกลุ่ม | ชื่อกลุ่ม, จำนวนสมาชิก, groupId |
| @บอท สวัสดี | ทักทายพร้อมชื่อผู้ส่ง |
| @บอท ประกาศ สวัสดีทุกคน | ส่ง push message ในกลุ่ม |
| พิมพ์ `สวัสดี` โดยไม่ @บอท | บอทไม่ตอบ (ถูกต้อง) |
| แชทส่วนตัว ส่ง `สวัสดี` | บอทตอบได้โดยไม่ต้อง @ |

## ไฟล์สำคัญ

| ไฟล์ | หน้าที่ |
|------|--------|
| `utils/sourceContext.js` | แยกประเภทแชท, ตรวจ @mention, ดึงคำสั่ง |
| `utils/groupStore.js` | เก็บ groupId ชั่วคราว (สอน concept) |
| `handlers/messageHandler.js` | logic แชทส่วนตัว vs กลุ่ม |
| `handlers/eventHandler.js` | join / leave / member events |
| `index.js` | ส่ง `req.body.destination` เป็น bot user id |

## หมายเหตุสำหรับการสอน

- ในกลุ่มหนึ่งมี Official Account ได้ **เพียง 1 บอท**
- `replyMessage` ไม่เสีย quota / `pushMessage` เสีย quota
- `groupId` ได้จาก webhook (`source.groupId`) หรือคำสั่ง `ข้อมูลกลุ่ม`
- ระบบจริงควรเก็บ `groupId` ใน database ไม่ใช่หน่วยความจำ

## บทถัดไป

[step7-liff](../step7-liff/) — LINE Front-end Framework (LIFF)
