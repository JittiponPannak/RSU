import 'dotenv/config';

/**
 * Service for calling Google Gemini Generative AI API
 * @param {string} userPrompt 
 * @returns {Promise<string>}
 */
export async function askGemini(userPrompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('GEMINI_API_KEY is not configured in .env');
    return 'ขออภัยครับ ระบบไม่ได้ตั้งค่า GEMINI_API_KEY';
  }

  // Model fallback order
  const primaryModel = process.env.GEMINI_MODEL || 'gemini-flash-latest';
  const fallbackModels = [primaryModel, 'gemini-flash-latest', 'gemini-2.0-flash-lite', 'gemini-1.5-flash'];
  // Remove duplicates while keeping order
  const modelList = [...new Set(fallbackModels)];

  const systemInstruction = `คุณคือผู้ช่วย AI อัจฉริยะ (Gen AI Chatbot) ประจำวิทยาลัยนวัตกรรมดิจิทัลเทคโนโลยี มหาวิทยาลัยรังสิต (RSU)
ข้อมูลสำคัญ:
- อาจารย์วุฒิพงษ์ ชินศรี (ชื่อเล่น: อ.เนร หรือ อาจารย์เนร) เป็นอาจารย์ประจำวิทยาลัยนวัตกรรมดิจิทัลเทคโนโลยี มหาวิทยาลัยรังสิต สอนวิชาด้านเทคโนโลยีสารสนเทศ วิทยาการคอมพิวเตอร์ การพัฒนาเว็บและแอปพลิเคชัน (เช่น วิชา CSC490)
- ให้ตอบคำถามผู้ใช้อย่างสุภาพ สดใส กระชับ ตรงประเด็น และเป็นกันเอง ใช้ภาษาไทยเป็นหลัก`;

  for (const model of modelList) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemInstruction }],
          },
          contents: [
            {
              role: 'user',
              parts: [{ text: userPrompt }],
            },
          ],
        }),
      });

      const data = await response.json();

      if (response.ok && data.candidates && data.candidates.length > 0) {
        const replyPart = data.candidates[0].content?.parts?.[0];
        if (replyPart && replyPart.text) {
          return replyPart.text.trim();
        }
      }

      console.warn(`Gemini model ${model} response issue:`, data.error?.message || data);
    } catch (error) {
      console.error(`Error querying Gemini with model ${model}:`, error);
    }
  }

  return 'ขออภัยครับ ไม่สามารถประมวลผลคำตอบจาก AI ได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง';
}
