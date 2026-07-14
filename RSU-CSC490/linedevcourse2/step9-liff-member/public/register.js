const TIER_LABELS = { bronze: 'บรอนซ์', silver: 'ซิลเวอร์', gold: 'โกลด์' };

const statusEl = document.getElementById('status');
const formEl = document.getElementById('register-form');
const memberInfoEl = document.getElementById('member-info');
const profilePreviewEl = document.getElementById('profile-preview');

let lineUserId = '';
let displayName = '';

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

  await liff.init({ liffId });
  if (!liff.isLoggedIn()) {
    liff.login();
    return;
  }

  const profile = await liff.getProfile();
  lineUserId = profile.userId;
  displayName = profile.displayName;

  profilePreviewEl.innerHTML = `
    <img src="${profile.pictureUrl}" alt="" width="64" height="64" />
    <span>${escapeHtml(profile.displayName)}</span>
  `;

  const existing = await fetchMember(lineUserId);
  if (existing) {
    showMember(existing);
    return;
  }

  document.getElementById('fullName').value = profile.displayName;
  setStatus('กรอกข้อมูลแล้วกดยืนยัน');
  formEl.classList.remove('hidden');
}

async function fetchMember(id) {
  const res = await fetch(`/api/members/${encodeURIComponent(id)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('โหลดข้อมูลไม่สำเร็จ');
  return res.json();
}

function showMember(member) {
  formEl.classList.add('hidden');
  memberInfoEl.classList.remove('hidden');
  memberInfoEl.innerHTML = `
    <h2>คุณเป็นสมาชิกแล้ว</h2>
    <p>เลขสมาชิก: <strong>${escapeHtml(member.memberNo)}</strong></p>
    <p>ระดับ: ${TIER_LABELS[member.tier] ?? member.tier} (${member.points} แต้ม)</p>
    <a class="link-btn" href="/card.html">ไปหน้าบัตรสมาชิก</a>
  `;
  setStatus('ลงทะเบียนเรียบร้อยแล้ว');
}

async function handleSubmit(event) {
  event.preventDefault();
  const fullName = document.getElementById('fullName').value.trim();
  const phone = document.getElementById('phone').value.trim();

  setStatus('กำลังบันทึก...');

  const res = await fetch('/api/members/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lineUserId, displayName, fullName, phone }),
  });

  if (res.status === 409) {
    const member = await fetchMember(lineUserId);
    if (member) showMember(member);
    return;
  }

  if (!res.ok) {
    setStatus('ลงทะเบียนไม่สำเร็จ', true);
    return;
  }

  showMember(await res.json());
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

document.addEventListener('DOMContentLoaded', () => {
  initLiff().catch((err) => setStatus(err.message, true));
  formEl.addEventListener('submit', (e) => {
    handleSubmit(e).catch((err) => setStatus(err.message, true));
  });
});
