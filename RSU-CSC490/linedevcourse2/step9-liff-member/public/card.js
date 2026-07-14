const TIER_LABELS = { bronze: 'บรอนซ์', silver: 'ซิลเวอร์', gold: 'โกลด์' };
const TIER_CLASS = { bronze: 'tier-bronze', silver: 'tier-silver', gold: 'tier-gold' };

const statusEl = document.getElementById('status');
const cardEl = document.getElementById('member-card');
const notMemberEl = document.getElementById('not-member');

const scanBtn = document.getElementById('scan-btn');
const shareBtn = document.getElementById('share-btn');

let lineUserId = '';
let currentMember = null;

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.classList.toggle('error', isError);
}

function renderMember(member) {
  currentMember = member;

  cardEl.classList.remove('hidden');
  notMemberEl.classList.add('hidden');

  const badge = document.getElementById('tier-badge');
  badge.textContent = TIER_LABELS[member.tier] ?? member.tier;
  badge.className = `tier-badge ${TIER_CLASS[member.tier] ?? ''}`;

  document.getElementById('member-no').textContent = member.memberNo;
  document.getElementById('member-name').textContent = member.fullName;
  document.getElementById('member-points').textContent = member.points;
  setStatus('บัตรสมาชิกของคุณ');
}

async function initLiff() {
  const liffId = window.LIFF_CONFIG?.liffId;
  if (!liffId) {
    setStatus('ไม่พบ LIFF_ID', true);
    return;
  }

  await liff.init({ liffId });
  if (!liff.isLoggedIn()) {
    liff.login();
    return;
  }

  // ใน initLiff() หลัง login สำเร็จ:
  setupLiffActions();

  lineUserId = (await liff.getProfile()).userId;
  const res = await fetch(`/api/members/${encodeURIComponent(lineUserId)}`);

  if (res.status === 404) {
    notMemberEl.classList.remove('hidden');
    setStatus('กรุณาลงทะเบียนก่อน');
    return;
  }

  if (!res.ok) throw new Error('โหลดข้อมูลไม่สำเร็จ');
  renderMember(await res.json());

}

async function earnDemoPoints() {
  setStatus('กำลังเพิ่มแต้ม...');
  const res = await fetch(`/api/members/${encodeURIComponent(lineUserId)}/points`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: 10 }),
  });

  if (!res.ok) {
    setStatus('เพิ่มแต้มไม่สำเร็จ', true);
    return;
  }

  renderMember(await res.json());
}

function setupLiffActions() {
  scanBtn.disabled = !liff.isApiAvailable('scanCodeV2');
  shareBtn.disabled = !liff.isApiAvailable('shareTargetPicker');
}

async function scanQrForPoints() {
  if (!liff.isApiAvailable('scanCodeV2')) {
    setStatus('อุปกรณ์นี้ไม่รองรับสแกน QR', true);
    return;
  }

  setStatus('เปิดกล้องสแกน QR...');
  const result = await liff.scanCodeV2();
  const text = result?.value?.trim();

  if (!text) {
    setStatus('ไม่ได้รับข้อมูลจาก QR', true);
    return;
  }

  // ขั้นที่ 2 — เรียก API (ดูบล็อกถัดไป)

  const res = await fetch(`/api/members/${encodeURIComponent(lineUserId)}/redeem-qr`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  const data = await res.json().catch(() => ({}));

  if (res.status === 400 && data.error === 'ALREADY_REDEEMED') {
    setStatus('คุณใช้รหัส QR นี้แล้ว', true);
    return;
  }
  if (res.status === 400 && data.error === 'INVALID_QR') {
    setStatus('QR ไม่ถูกต้อง — ลอง linedev:member+20', true);
    return;
  }
  if (!res.ok) {
    setStatus('แลกแต้มไม่สำเร็จ', true);
    return;
  }

  renderMember(data);
  setStatus(`แลก QR สำเร็จ — แต้ม ${data.points}`);
}

async function shareMemberCard() {
  if (!currentMember) return;

  if (!liff.isApiAvailable('shareTargetPicker')) {
    setStatus('แชร์ได้ในแอป LINE เท่านั้น', true);
    return;
  }

  const liffId = window.LIFF_CONFIG?.liffId;
  const tier = TIER_LABELS[currentMember.tier] ?? currentMember.tier;
  const text = [
    '🎫 บัตรสมาชิกของฉัน',
    `เลขสมาชิก: ${currentMember.memberNo}`,
    `ระดับ: ${tier}`,
    `แต้มสะสม: ${currentMember.points}`,
    liffId ? `สมัคร: https://liff.line.me/${liffId}/register.html` : '',
  ].filter(Boolean).join('\n');

  setStatus('เลือกเพื่อนหรือกลุ่ม...');
  const result = await liff.shareTargetPicker([{ type: 'text', text }]);
  setStatus(result ? 'แชร์บัตรสมาชิกแล้ว' : 'ยกเลิกการแชร์');
}

document.addEventListener('DOMContentLoaded', () => {
  initLiff().catch((err) => setStatus(err.message, true));
  document.getElementById('earn-btn').addEventListener('click', () => {
    earnDemoPoints().catch((err) => setStatus(err.message, true));
  });

  scanBtn.addEventListener('click', () => {
    scanQrForPoints().catch((err) => setStatus(err.message, true));
  });

  shareBtn.addEventListener('click', () => {
    shareMemberCard().catch((err) => setStatus(err.message, true));
  });
});
