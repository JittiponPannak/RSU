import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

/** ส่ง LIFF ID ให้หน้าเว็บ — ไม่ hardcode ใน HTML */
app.get('/config.js', (_req, res) => {
  res.type('application/javascript');
  res.send(
    `window.LIFF_CONFIG = { liffId: ${JSON.stringify(process.env.LIFF_ID ?? '')} };`
  );
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Step 7 LIFF listening on http://localhost:${port}`);
  console.log('ตั้ง LIFF Endpoint URL ใน LINE Console = URL จาก ngrok (ต้องเป็น https)');
  if (!process.env.LIFF_ID) {
    console.warn('⚠ ยังไม่ได้ตั้ง LIFF_ID ใน .env');
  }
});
