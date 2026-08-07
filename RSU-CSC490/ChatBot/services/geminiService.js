/**
 * Gemini AI Service
 * ใช้ Google Generative AI SDK เพื่อตอบคำถามผู้ใช้
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// System prompt สำหรับบริบทร้านค้า
const SYSTEM_PROMPT = `คุณคือผู้ช่วย AI ของร้านจิตติภณ ต้าวัสดุ ซึ่งเป็นร้านขายวัสดุก่อสร้างในประเทศไทย
คุณช่วยตอบคำถามเกี่ยวกับวัสดุก่อสร้าง เช่น ปูน ทราย หิน เหล็ก สี กระเบื้อง ท่อ สุขภัณฑ์ และสินค้าก่อสร้างทั่วไป
ตอบภาษาไทยเป็นหลัก ให้คำตอบกระชับชัดเจน เป็นมิตร และมีประโยชน์
หากถามเรื่องที่ไม่เกี่ยวกับวัสดุก่อสร้างหรือร้านค้า ให้ตอบสุภาพว่าคุณเชี่ยวชาญด้านวัสดุก่อสร้างเป็นหลัก`;

/**
 * ถาม Gemini AI และรับคำตอบ
 * @param {string} question - คำถามจากผู้ใช้
 * @returns {Promise<string>} - คำตอบจาก AI
 */
export async function askGemini(question) {
  const modelName = process.env.GEMINI_MODEL || 'gemini-1.5-flash-latest';
  const model = genAI.getGenerativeModel({
    model: modelName,
    systemInstruction: SYSTEM_PROMPT,
  });

  const result = await model.generateContent(question);
  const response = result.response;
  return response.text();
}
