import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { getTier } from '../utils/tier.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, '..', 'data', 'members.json');

async function readAll() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function writeAll(members) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(members, null, 2), 'utf8');
}

function nextMemberNo(count) {
  return `M${String(count + 1).padStart(6, '0')}`;
}

export async function findByLineUserId(lineUserId) {
  const members = await readAll();
  return members[lineUserId] ?? null;
}

export async function registerMember({ lineUserId, displayName, fullName, phone }) {
  const members = await readAll();

  if (members[lineUserId]) {
    const err = new Error('สมาชิกนี้ลงทะเบียนแล้ว');
    err.code = 'ALREADY_REGISTERED';
    throw err;
  }

  const member = {
    lineUserId,
    memberNo: nextMemberNo(Object.keys(members).length),
    displayName,
    fullName,
    phone,
    points: 0,
    tier: 'bronze',
    registeredAt: new Date().toISOString(),
  };

  members[lineUserId] = member;
  await writeAll(members);
  return member;
}

export async function addPoints(lineUserId, amount) {
  const members = await readAll();
  const member = members[lineUserId];

  if (!member) {
    const err = new Error('ไม่พบข้อมูลสมาชิก');
    err.code = 'NOT_FOUND';
    throw err;
  }

  member.points += amount;
  member.tier = getTier(member.points);
  members[lineUserId] = member;
  await writeAll(members);
  return member;
}
