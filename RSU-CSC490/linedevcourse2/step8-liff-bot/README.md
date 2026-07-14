# Step 8 — LIFF + Messaging API Bot

## สิ่งที่เรียนในบทนี้

- รวม **Webhook Bot** กับ **LIFF** บน server เดียว (Express)
- เปิด LIFF จากแชทด้วย **Flex Message** ปุ่ม `uri`
- ใช้ `liff.sendMessages()` ส่งข้อความกลับห้องแชท
- ใช้ `liff.closeWindow()` ปิดหน้า LIFF หลังส่งสำเร็จ
- ตั้งค่า **Webhook URL** และ **LIFF Endpoint URL** ให้ชี้ domain เดียวกัน

## สถาปัตยกรรม

```
ผู้ใช้พิมพ์ "สั่งซื้อ" ในแชท
        ↓
Bot ส่ง Flex Message (ปุ่ม uri → liff.line.me/...)
        ↓
เปิดหน้า order.html ในแอป LINE
        ↓
ผู้ใช้กรอกฟอร์ม → liff.sendMessages() → ข้อความปรากฏในแชท
```

## ตั้งค่า LINE Console

### LINE Login (ทำครั้งเดียว — ต่อจาก Lab 7)

- ตรวจว่า **LINE Login channel** Publish แล้ว และผูกกับ Messaging API channel แล้ว
- ถ้ายังไม่ทำ ดูขั้นตอนใน [step7-liff/README.md](../step7-liff/README.md)

### Messaging API (เหมือน step ก่อนหน้า)

- Webhook URL: `https://xxxx.ngrok-free.app/callback`
- เปิด **Use webhook**

### LIFF app (สร้างใหม่หรือแก้จาก step 7)

ขั้นตอนเพิ่ม LIFF App ใน Console ดูรายละเอียดใน [step7-liff/README.md](../step7-liff/README.md#2-เพิ่ม-liff-app-ใน-line-console) — สำหรับ step 8 แนะนำ **สร้าง LIFF app ใหม่** (ชื่อเช่น `Step8 Order`) หรือแก้ Endpoint URL ของ app เดิม

Messaging API channel → แท็บ **LIFF** → **Add** (หรือ **Edit**)

| ฟิลด์ | ค่า |
|-------|-----|
| LIFF app name | `Step8 Order` |
| Endpoint URL | `https://xxxx.ngrok-free.app/` (รากเว็บ — **ไม่**ใส่ `/order.html`) |
| Size | Full |
| Scope | **profile** + **chat_message.write** (Scope → Edit → View all) |
| Bot link feature | On (แนะนำ — ให้เปิดจากแชทบอทได้) |

คัดลอก **LIFF ID** ใส่ `.env` — ปุ่ม Flex ใช้ `https://liff.line.me/{LIFF_ID}` (server เสิร์ฟหน้าสั่งซื้อที่ `/`)

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

อัปเดตทั้ง Webhook URL และ LIFF Endpoint URL ด้วย URL จาก ngrok

## คำสั่งทดสอบ

| การทดสอบ | ผลลัพธ์ |
|----------|---------|
| พิมพ์ `สั่งซื้อ` | ได้ Flex Message พร้อมปุ่ม "เปิดหน้าสั่งซื้อ" |
| กดปุ่ม | เปิดฟอร์ม LIFF |
| เลือกสินค้า + ยืนยัน | ข้อความสั่งซื้อปรากฏในแชท แล้วหน้า LIFF ปิด |

## ไฟล์สำคัญ

| ไฟล์ | หน้าที่ |
|------|--------|
| `index.js` | Webhook + เสิร์ฟ static LIFF |
| `handlers/messageHandler.js` | คำสั่ง `สั่งซื้อ` ส่ง Flex |
| `messages/liffMenu.js` | Flex ปุ่ม `uri` ไป LIFF URL |
| `public/order.html` | ฟอร์มสั่งซื้อ |
| `public/order.js` | `sendMessages` + `closeWindow` |

## หมายเหตุสำหรับการสอน

- `liff.sendMessages()` ใช้ได้เมื่อเปิด LIFF จากแชทที่บอทอยู่ (1:1 หรือกลุ่มที่มีบอท)
- LIFF URL ใน Flex ใช้ `https://liff.line.me/{liffId}` — Endpoint URL ตั้งเป็นราก ngrok (`/`) ไม่ใส่ path `/order.html`
- Deploy จริงใช้ URL ถาวร (เช่น Render) แทน ngrok — ดู [deploy-render](../deploy-render/)

## บทถัดไป

[step9-liff-member](../step9-liff-member/) — ระบบสมาชิกด้วย LIFF
