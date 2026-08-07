/**
 * Calculator Session Store — เก็บสถานะการคำนวณของผู้ใช้ (ชั่วคราว)
 *
 * เมื่อผู้ใช้เริ่มคำนวณ (เช่น กดปุ่ม "คำนวณปูน") ระบบจะสร้าง session ให้
 * แล้วรอรับตัวเลขจากผู้ใช้  session จะหมดอายุอัตโนมัติหลัง 5 นาที
 */

const SESSION_TTL_MS = 5 * 60 * 1000; // 5 นาที

/** @type {Map<string, { type: string, step: string, data: object, expiresAt: number }>} */
const sessions = new Map();

/**
 * สร้าง session ใหม่
 * @param {string} userId
 * @param {'cement'|'paint'|'tile'} calcType
 */
export function startSession(userId, calcType) {
  sessions.set(userId, {
    type: calcType,
    step: 'awaiting_area',
    data: {},
    expiresAt: Date.now() + SESSION_TTL_MS,
  });
}

/**
 * ดึง session ปัจจุบัน (ถ้ายังไม่หมดอายุ)
 * @param {string} userId
 * @returns {object|null}
 */
export function getSession(userId) {
  const session = sessions.get(userId);
  if (!session) return null;

  if (Date.now() > session.expiresAt) {
    sessions.delete(userId);
    return null;
  }

  return session;
}

/**
 * อัปเดต session (เช่น เปลี่ยน step หรือเก็บค่าที่ผู้ใช้ป้อน)
 */
export function updateSession(userId, updates) {
  const session = sessions.get(userId);
  if (!session) return;

  Object.assign(session, updates);
  session.expiresAt = Date.now() + SESSION_TTL_MS; // รีเซ็ตเวลา
}

/**
 * ลบ session (เมื่อคำนวณเสร็จ)
 */
export function clearSession(userId) {
  sessions.delete(userId);
}
