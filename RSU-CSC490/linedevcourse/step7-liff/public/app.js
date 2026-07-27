const statusEl = document.getElementById('status');
const profileEl = document.getElementById('profile');
const contextEl = document.getElementById('context');

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.classList.toggle('error', isError);
}

async function initLiff() {
  const liffId = window.LIFF_CONFIG?.liffId;

  if (!liffId) {
    setStatus('ไม่พบ LIFF_ID — ตรวจไฟล์ .env และรีสตาร์ท server', true);
    return;
  }

  try {
    await liff.init({ liffId });
    setStatus('LIFF พร้อมใช้งาน');

    if (!liff.isInClient()) {
      setStatus(
        'เปิดหน้านี้ผ่าน LIFF URL ในแอป LINE (หรือสแกน QR Code จาก LIFF URL)'
      );
    }

    if (!liff.isLoggedIn()) {
      liff.login();
      return;
    }

    const profile = await liff.getProfile();
    profileEl.classList.remove('hidden');
    profileEl.innerHTML = `
      <img src="${profile.pictureUrl}" alt="รูปโปรไฟล์" width="96" height="96" />
      <p class="name">${escapeHtml(profile.displayName)}</p>
      <p class="userid"><code>${escapeHtml(profile.userId)}</code></p>
    `;

    const context = liff.getContext();
    contextEl.textContent = JSON.stringify(context, null, 2);
  } catch (err) {
    console.error(err);
    setStatus(`เกิดข้อผิดพลาด: ${err.message}`, true);
  }
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

document.addEventListener('DOMContentLoaded', initLiff);
