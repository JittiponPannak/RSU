// LIFF Initialization & Profile Logic (Requirement 3.1 - 3.4)

let userProfile = {
  displayName: 'ผู้ใช้งาน LINE',
  pictureUrl: '',
  statusMessage: '',
  userId: '',
};

let lastScannedValue = '';

async function fetchConfig() {
  try {
    const res = await fetch('/api/config');
    if (res.ok) {
      const data = await res.json();
      return data.liffId;
    }
  } catch (err) {
    console.warn('Could not fetch /api/config:', err);
  }
  return '';
}

async function main() {
  const statusEl = document.getElementById('liff-status');

  try {
    const serverLiffId = await fetchConfig();
    const urlParams = new URLSearchParams(window.location.search);
    const liffId = urlParams.get('liffId') || window.LIFF_ID || serverLiffId;

    if (typeof liff !== 'undefined' && liffId) {
      await liff.init({ liffId });

      if (!liff.isLoggedIn()) {
        liff.login();
        return;
      }

      await loadUserProfile();

      if (statusEl) {
        statusEl.textContent = '🟢 ดึงข้อมูลโปรไฟล์ liff.getProfile() สำเร็จ';
        statusEl.style.background = 'rgba(6, 199, 85, 0.15)';
        statusEl.style.color = '#06c755';
      }
    } else if (typeof liff !== 'undefined') {
      try {
        const profile = await liff.getProfile();
        userProfile.displayName = profile.displayName || userProfile.displayName;
        userProfile.pictureUrl = profile.pictureUrl || userProfile.pictureUrl;
        userProfile.statusMessage = profile.statusMessage || '';
        userProfile.userId = profile.userId || '';
        if (statusEl) {
          statusEl.textContent = '🟢 โหลดโปรไฟล์จาก liff.getProfile()';
          statusEl.style.background = 'rgba(6, 199, 85, 0.15)';
          statusEl.style.color = '#06c755';
        }
      } catch {
        if (statusEl) {
          statusEl.textContent = '🟡 กรุณาตั้งค่า LIFF_ID ใน .env';
          statusEl.style.background = 'rgba(234, 179, 8, 0.15)';
          statusEl.style.color = '#eab308';
        }
      }
    } else {
      if (statusEl) {
        statusEl.textContent = '🟡 โหมดจำลองใน Browser';
        statusEl.style.background = 'rgba(234, 179, 8, 0.15)';
        statusEl.style.color = '#eab308';
      }
    }
  } catch (err) {
    console.warn('LIFF initialization:', err);
    if (statusEl) {
      statusEl.textContent = '🟡 โหมด Preview (liff.init)';
      statusEl.style.background = 'rgba(234, 179, 8, 0.15)';
      statusEl.style.color = '#eab308';
    }
  }

  updateUserPreview();
}

async function loadUserProfile() {
  if (typeof liff !== 'undefined' && liff.isLoggedIn()) {
    try {
      const profile = await liff.getProfile();
      userProfile = {
        displayName: profile.displayName || userProfile.displayName,
        pictureUrl: profile.pictureUrl || userProfile.pictureUrl,
        statusMessage: profile.statusMessage || '',
        userId: profile.userId || '',
      };
      updateUserPreview();
    } catch (err) {
      console.error('liff.getProfile error:', err);
    }
  }
}

function switchTab(tabName) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

  if (tabName === 'user') {
    document.querySelectorAll('.tab-btn')[0].classList.add('active');
    document.getElementById('tab-user').classList.add('active');
  } else if (tabName === 'nera') {
    document.querySelectorAll('.tab-btn')[1].classList.add('active');
    document.getElementById('tab-nera').classList.add('active');
  } else if (tabName === 'qr') {
    document.querySelectorAll('.tab-btn')[2].classList.add('active');
    document.getElementById('tab-qr').classList.add('active');
  }
}

function updateUserPreview() {
  const studentId = document.getElementById('input-student-id').value || 'ยังไม่ได้ระบุ';
  const major = document.getElementById('input-major').value || 'วิทยาลัยนวัตกรรมดิจิทัลเทคโนโลยี';

  if (userProfile.displayName && userProfile.displayName !== 'ผู้ใช้งาน LINE') {
    document.getElementById('prev-name').textContent = userProfile.displayName;
    const displayNameBanner = document.getElementById('user-display-name');
    if (displayNameBanner) displayNameBanner.textContent = userProfile.displayName;
  }

  if (userProfile.pictureUrl) {
    document.getElementById('prev-avatar').src = userProfile.pictureUrl;
    const avatarBanner = document.getElementById('user-profile-avatar');
    if (avatarBanner) avatarBanner.src = userProfile.pictureUrl;
  }

  if (userProfile.statusMessage) {
    const statusTextBanner = document.getElementById('user-status-text');
    if (statusTextBanner) statusTextBanner.textContent = userProfile.statusMessage;
  }

  document.getElementById('prev-student-id').textContent = studentId;
  document.getElementById('prev-major').textContent = major;
}

/** 3.4 ระบบสแกน QR Code / Barcode (liff.scanCodeV2()) */
async function scanQRCode() {
  const resultBox = document.getElementById('scan-result-box');
  const resultValueEl = document.getElementById('scan-result-value');

  if (typeof liff !== 'undefined' && liff.isApiAvailable('scanCodeV2')) {
    try {
      const res = await liff.scanCodeV2();
      if (res && res.value) {
        lastScannedValue = res.value;
        if (resultValueEl) resultValueEl.textContent = lastScannedValue;
        if (resultBox) resultBox.style.display = 'block';

        // Auto-send scan result into current chat if inside LINE client
        if (liff.isInClient()) {
          try {
            await liff.sendMessages([
              {
                type: 'text',
                text: `📷 ผลการสแกน QR Code:\n${lastScannedValue}`,
              },
            ]);
          } catch (sendErr) {
            console.warn('Could not auto-send scan result:', sendErr);
          }
        }
      }
    } catch (err) {
      alert('การสแกน QR Code ยกเลิกหรือล้มเหลว: ' + (err.message || err));
    }
  } else {
    // Browser mock fallback
    lastScannedValue = 'https://wutthipong.info';
    if (resultValueEl) resultValueEl.textContent = lastScannedValue;
    if (resultBox) resultBox.style.display = 'block';
    alert(`[โหมดจำลองนอกแอป LINE] สแกนสำเร็จ: ${lastScannedValue}`);
  }
}

async function sendScanResultToChat() {
  if (!lastScannedValue) {
    alert('ยังไม่มีผลการสแกน QR Code');
    return;
  }

  const message = {
    type: 'text',
    text: `📷 ผลการสแกน QR Code:\n${lastScannedValue}`,
  };

  await sendFlexMessage(message);
}

/** 1. นามบัตรตัวเอง (ข้อ 3.2 Dynamic Flex Message) */
function buildUserFlexCard() {
  const studentId = document.getElementById('input-student-id').value || '6606405';
  const major = document.getElementById('input-major').value || 'เทคโนโลยีสารสนเทศ (IT)';
  const avatarSrc = document.getElementById('prev-avatar')?.src || userProfile.pictureUrl || 'assets/se92mL7ZPYkjtTvw3RSPbw==.jpg';
  const nameText = document.getElementById('prev-name')?.textContent || userProfile.displayName || 'ผู้ใช้งาน LINE';

  return {
    type: 'flex',
    altText: `นามบัตรดิจิทัล - ${nameText}`,
    contents: {
      type: 'bubble',
      size: 'mega',
      header: {
        type: 'box',
        layout: 'vertical',
        backgroundColor: '#0F172A',
        paddingAll: 'lg',
        contents: [
          {
            type: 'text',
            text: '🪪 DIGITAL BUSINESS CARD',
            color: '#38BDF8',
            weight: 'bold',
            size: 'xs',
          },
          {
            type: 'text',
            text: nameText,
            color: '#FFFFFF',
            weight: 'bold',
            size: 'xl',
            margin: 'xs',
          },
        ],
      },
      hero: {
        type: 'image',
        url: avatarSrc,
        size: 'full',
        aspectRatio: '1:1',
        aspectMode: 'cover',
      },
      body: {
        type: 'box',
        layout: 'vertical',
        spacing: 'md',
        contents: [
          {
            type: 'box',
            layout: 'vertical',
            spacing: 'xs',
            contents: [
              {
                type: 'text',
                text: '🆔 รหัสนักศึกษา',
                size: 'xs',
                color: '#64748B',
                weight: 'bold',
              },
              {
                type: 'text',
                text: studentId,
                size: 'md',
                weight: 'bold',
                color: '#0F172A',
              },
            ],
          },
          {
            type: 'separator',
          },
          {
            type: 'box',
            layout: 'vertical',
            spacing: 'xs',
            contents: [
              {
                type: 'text',
                text: '🎓 หลักสูตรที่เรียน',
                size: 'xs',
                color: '#64748B',
                weight: 'bold',
              },
              {
                type: 'text',
                text: major,
                size: 'sm',
                weight: 'bold',
                color: '#1E293B',
                wrap: true,
              },
            ],
          },
          {
            type: 'separator',
          },
          {
            type: 'box',
            layout: 'vertical',
            spacing: 'xs',
            contents: [
              {
                type: 'text',
                text: '🏫 สถาบันการศึกษา',
                size: 'xs',
                color: '#64748B',
                weight: 'bold',
              },
              {
                type: 'text',
                text: 'วิทยาลัยนวัตกรรมดิจิทัลเทคโนโลยี มหาวิทยาลัยรังสิต (RSU)',
                size: 'xs',
                color: '#475569',
                wrap: true,
              },
            ],
          },
        ],
      },
    },
  };
}

/** 2. นามบัตร อ.เนร (ข้อ 3.3 Static Flex Message) */
function buildNeraFlexCard() {
  return {
    type: 'flex',
    altText: 'นามบัตร อาจารย์วุฒิพงษ์ ชินศรี (อ.เนร)',
    contents: {
      type: 'bubble',
      size: 'mega',
      hero: {
        type: 'image',
        url: 'https://wutthipong.info/image/LCC2024.webp',
        size: 'full',
        aspectRatio: '1:1',
        aspectMode: 'cover',
      },
      body: {
        type: 'box',
        layout: 'vertical',
        spacing: 'md',
        contents: [
          {
            type: 'text',
            text: 'วุฒิพงษ์ ชินศรี',
            weight: 'bold',
            size: 'xl',
            color: '#0F172A',
          },
          {
            type: 'text',
            text: 'อาจารย์ ม.รังสิต',
            weight: 'bold',
            size: 'sm',
            color: '#2563EB',
          },
          {
            type: 'separator',
            margin: 'md',
          },
          {
            type: 'text',
            text: 'วิทยาลัยนวัตกรรมดิจิทัลเทคโนโลยี มหาวิทยาลัยรังสิต',
            size: 'xs',
            color: '#64748B',
            wrap: true,
          },
        ],
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        spacing: 'sm',
        contents: [
          {
            type: 'button',
            style: 'primary',
            color: '#2563EB',
            action: {
              type: 'uri',
              label: 'Website',
              uri: 'https://wutthipong.info',
            },
          },
        ],
      },
    },
  };
}

async function sendUserCard() {
  const card = buildUserFlexCard();
  await sendFlexMessage(card);
}

async function shareUserCard() {
  const card = buildUserFlexCard();
  await shareFlexMessage(card);
}

async function sendNeraCard() {
  const card = buildNeraFlexCard();
  await sendFlexMessage(card);
}

async function shareNeraCard() {
  const card = buildNeraFlexCard();
  await shareFlexMessage(card);
}

async function sendFlexMessage(flexCard) {
  if (typeof liff !== 'undefined') {
    try {
      if (!liff.isLoggedIn()) {
        liff.login();
        return;
      }
      await liff.sendMessages([flexCard]);
      alert('ส่งนามบัตรเข้าแชทเรียบร้อย!');
      if (liff.isInClient()) {
        liff.closeWindow();
      }
    } catch (err) {
      alert('ส่งนามบัตรไม่สำเร็จ: ' + (err.message || err));
    }
  } else {
    alert('ส่งนามบัตรเรียบร้อย! (โหมดจำลองใน Browser)');
    console.log('Flex Card Object:', flexCard);
  }
}

async function shareFlexMessage(flexCard) {
  if (typeof liff !== 'undefined') {
    try {
      if (!liff.isLoggedIn()) {
        liff.login();
        return;
      }
      const res = await liff.shareTargetPicker([flexCard]);
      if (res) {
        alert('แชร์นามบัตรสำเร็จ!');
      }
    } catch (err) {
      if (err.code === 'FORBIDDEN' || err.message?.includes('disabled') || err.message?.includes('isApiAvailable')) {
        alert('⚠️ ระบบ Share Target Picker ยังไม่ได้เปิดใช้งานใน LINE Developers Console\n\nวิธีแก้ไข:\n1. ไปที่ LINE Developers Console -> LIFF Tab\n2. เปิดสวิตช์ "Share target picker" เป็น ON');
      } else {
        alert('การแชร์ยกเลิกหรือล้มเหลว: ' + (err.message || err));
      }
    }
  } else {
    alert('ระบบแชร์เปิดใช้งานเฉพาะบนแอป LINE (Share Target Picker)');
    console.log('Flex Card Object:', flexCard);
  }
}

window.addEventListener('DOMContentLoaded', main);
