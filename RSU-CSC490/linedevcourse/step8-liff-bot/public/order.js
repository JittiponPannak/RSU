const statusEl = document.getElementById('status');
const formEl = document.getElementById('order-form');
const submitBtn = document.getElementById('submit-btn');

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.classList.toggle('error', isError);
}

async function initLiff() {
  const liffId = window.LIFF_CONFIG?.liffId;

  if (!liffId) {
    setStatus('ไม่พบ LIFF_ID — ตรวจไฟล์ .env', true);
    return;
  }

  try {
    await liff.init({ liffId });

    if (!liff.isLoggedIn()) {
      liff.login();
      return;
    }

    if (!liff.isInClient()) {
      setStatus('เปิดหน้านี้จากแชทบอท (กดปุ่มใน Flex) — sendMessages ใช้ได้ในแอป LINE เท่านั้น', true);
    } else {
      setStatus('เลือกสินค้าแล้วกดยืนยัน — ข้อความจะถูกส่งกลับแชท');
    }
    formEl.classList.remove('hidden');
  } catch (err) {
    console.error(err);
    setStatus(`เกิดข้อผิดพลาด: ${err.message}`, true);
  }
}

async function handleSubmit(event) {
  event.preventDefault();

  const item = document.getElementById('item').value;
  const qty = document.getElementById('qty').value;
  const text = `✅ สั่งซื้อผ่าน LIFF\n• ${item} x ${qty}`;

  submitBtn.disabled = true;
  setStatus('กำลังส่งข้อความ...');

  try {
    await liff.sendMessages([{ type: 'text', text }]);
    setStatus('ส่งคำสั่งซื้อแล้ว — ปิดหน้าต่าง');
    liff.closeWindow();
  } catch (err) {
    console.error(err);
    const hint =
      err.code === 403
        ? 'เปิด scope chat_message.write ใน LIFF app (Scope → Edit → View all) แล้วปิด-เปิด LIFF จากแชทบอทใหม่'
        : err.message;
    setStatus(`ส่งไม่สำเร็จ: ${hint}`, true);
    submitBtn.disabled = false;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initLiff();
  formEl.addEventListener('submit', handleSubmit);
});
