# Step 3 — Flex Message + ราคาทองจาก API

## สิ่งที่เรียนในบทนี้

- โครงสร้าง Flex Message (bubble, box, text, button)
- แยก JSON template ออกเป็นไฟล์ `messages/flexMenu.js`
- ดึงราคาทองจาก Public API แล้วแสดงใน Flex
- ใช้ AI ช่วยสร้าง Flex ราคาน้ำมันไทย (ต้นแบบ [บางจาก](https://www.bangchak.co.th/th/oilprice))

## วิธีรัน

```bash
npm install
cp .env.example .env
nodemon index.js
```

## คำสั่งทดสอบ

| ข้อความ | ผลลัพธ์ |
|---------|---------|
| `ราคาทอง` | ดึง API แล้วแสดง Flex ราคาทอง (USD + THB โดยประมาณ) |
| `สินค้า` | Flex ตัวอย่างแบบ static (กาแฟลาเต้) |
| `ช่วยเหลือ` | รายการคำสั่ง |

## Public API ที่ใช้

| ข้อมูล | API | หมายเหตุ |
|--------|-----|----------|
| ราคาทอง (USD/oz) | `https://mintedmetal.com/api/prices.json` | ไม่ต้องใช้ API key |
| อัตรา USD→THB | `https://api.frankfurter.app/latest?from=USD&to=THB` | แปลงเป็น THB โดยประมาณ |

แบบฝึกหัด **ราคาน้ำมันไทย**: ใช้ AI ช่วยหา API + สร้าง Flex ตามรูปแบบ [บางจาก — ราคาน้ำมันวันนี้](https://www.bangchak.co.th/th/oilprice) — **ไม่มีเฉลยโค้ด** ดู prompt ในใบงาน Lab 3.4

## เครื่องมือออกแบบ Flex

[Flex Message Simulator](https://developers.line.biz/flex-simulator/) — ออกแบบ JSON หรือใช้ AI ช่วยสร้าง แล้ว copy มาใส่ใน `messages/flexMenu.js`

## ไฟล์สำคัญ

| ไฟล์ | หน้าที่ |
|------|--------|
| `services/priceService.js` | ดึงราคาทองจาก Public API |
| `messages/flexMenu.js` | JSON template ของ Flex Message |
| `handlers/messageHandler.js` | เรียก API + ส่ง Flex เมื่อได้รับคำสั่ง |

## บทถัดไป

[step4-events](../step4-events/) — Follow / Unfollow / Postback
