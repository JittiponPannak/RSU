# Step 9 — LIFF ระบบสมาชิก

## สิ่งที่เรียนในบทนี้

- ออกแบบ **ระบบสมาชิก** ที่ผูก `lineUserId` กับข้อมูลสมาชิก
- สร้าง REST API ด้วย Express (`/api/members/...`)
- หน้า LIFF ลงทะเบียน + แสดงบัตรสมาชิก
- ระดับสมาชิก (บรอนซ์ / ซิลเวอร์ / โกลด์) จากแต้มสะสม
- **`liff.scanCodeV2()`** — สแกน QR แลกแต้มโปรโมชัน
- **`liff.shareTargetPicker()`** — แชร์บัตรสมาชิกให้เพื่อน/กลุ่ม
- บอทตรวจสถานะสมาชิกและเปิด LIFF จากแชท

## โฟลว์การทำงาน

```
ผู้ใช้พิมพ์ "ลงทะเบียน" → เปิด LIFF register.html
        ↓
กรอกชื่อ → POST /api/members/register
        ↓
ได้เลขสมาชิก → เปิด card.html ดูแต้มและระดับ
        ↓
พิมพ์ "ข้อมูลสมาชิก" ในแชท → บอทอ่านจาก memberStore
```

## ระดับสมาชิก

| แต้มสะสม | ระดับ |
|----------|-------|
| 0–99 | บรอนซ์ |
| 100–499 | ซิลเวอร์ |
| 500+ | โกลด์ |

## วิธีรัน

```bash
npm install
cp .env.example .env
# ใส่ CHANNEL_SECRET, CHANNEL_ACCESS_TOKEN, LIFF_ID
nodemon index.js
```

```bash
ngrok http 3000
```

ตั้ง **Webhook URL** และ **LIFF Endpoint URL** ให้ชี้ URL เดียวกัน

### ตั้งค่า LIFF app (เพิ่มจาก Lab 8)

Messaging API channel → แท็บ **LIFF** → เลือก/สร้าง LIFF app ของ step 9 → **Edit**

| ฟิลด์ | ค่า |
|-------|-----|
| Endpoint URL | `https://xxxx.ngrok-free.app/` |
| Scope | profile |
| **Scan QR** | **On** (จำเป็นสำหรับ `liff.scanCodeV2()`) |

> `shareTargetPicker` ใช้ได้ในแอป LINE — ตรวจด้วย `liff.isApiAvailable('shareTargetPicker')` ก่อนเรียก

### QR ทดสอบแลกแต้ม

สร้าง QR Code ที่มีข้อความ (plain text) ตรงๆ จากเว็บสร้าง QR ใดก็ได้:

| ข้อความใน QR | แต้มที่ได้ |
|--------------|-----------|
| `linedev:member+20` | +20 |
| `linedev:member+50` | +50 |

ใช้ได้ครั้งเดียวต่อสมาชิกต่อรหัส

## คำสั่งทดสอบ

| คำสั่ง / การทดสอบ | ผลลัพธ์ |
|-------------------|---------|
| `ลงทะเบียน` | เปิดหน้าสมัครสมาชิก LIFF |
| `สมาชิก` | เปิดบัตรสมาชิก |
| `ข้อมูลสมาชิก` | แสดงเลขสมาชิก/แต้มในแชท |
| กด "รับแต้มทดลอง" ในบัตร | แต้ม +10 |

**แบบฝึกหัด (ทำในใบงาน 9.4–9.6):** เพิ่ม `scanCodeV2` และ `shareTargetPicker` ใน `public/card.js` ทีละขั้น — API `/redeem-qr` พร้อมใน server แล้ว

| หลังทำแบบฝึกหัด | ผลลัพธ์ |
|-----------------|---------|
| สแกน QR `linedev:member+20` | แต้ม +20 |
| แชร์บัตรสมาชิก | target picker ส่งข้อความได้ |

## ไฟล์สำคัญ

| ไฟล์ | หน้าที่ |
|------|--------|
| `store/memberStore.js` | เก็บข้อมูลสมาชิกใน `data/members.json` |
| `routes/memberApi.js` | API ลงทะเบียน / ดูข้อมูล / เพิ่มแต้ม |
| `public/register.js` | ฟอร์มสมัครสมาชิก |
| `public/card.js` | แสดงบัตร + รับแต้มทดลอง (เพิ่ม scan/share ตามใบงาน 9.4–9.6) |
| `handlers/messageHandler.js` | คำสั่งบอทเชื่อมกับระบบสมาชิก |

## หมายเหตุสำหรับการสอน

- ตัวอย่างนี้ส่ง `lineUserId` จากฝั่ง LIFF โดยตรง — **ระบบจริง** ควรตรวจสอบด้วย [LINE ID token](https://developers.line.biz/en/docs/liff/using-user-profile/)
- `data/members.json` สร้างอัตโนมัติเมื่อมีการลงทะเบียน — ระบบจริงควรใช้ database
- รหัสผ่านไม่เกี่ยวข้องในบทนี้ (ใช้ LINE login เป็นตัวยืนยันตัวตน)

## บทถัดไป

[deploy-render](../deploy-render/) — Deploy บอทขึ้น Render
