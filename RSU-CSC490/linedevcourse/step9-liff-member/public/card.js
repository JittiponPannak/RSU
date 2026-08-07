const TIER_LABELS = { bronze: 'บรอนซ์', silver: 'ซิลเวอร์', gold: 'โกลด์' };
const TIER_CLASS = { bronze: 'tier-bronze', silver: 'tier-silver', gold: 'tier-gold' };

const statusEl = document.getElementById('status');
const cardEl = document.getElementById('member-card');
const notMemberEl = document.getElementById('not-member');

let lineUserId = '';

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.classList.toggle('error', isError);
}

function renderMember(member) {
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

document.addEventListener('DOMContentLoaded', () => {
  initLiff().catch((err) => setStatus(err.message, true));
  document.getElementById('earn-btn').addEventListener('click', () => {
    earnDemoPoints().catch((err) => setStatus(err.message, true));
  });
});
