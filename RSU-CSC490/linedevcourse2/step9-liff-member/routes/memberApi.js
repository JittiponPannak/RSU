import { Router } from 'express';
import {
  addPoints,
  findByLineUserId,
  registerMember,
  redeemQrCode,
} from '../store/memberStore.js';

const router = Router();

router.get('/:lineUserId', async (req, res) => {
  const member = await findByLineUserId(req.params.lineUserId);
  if (!member) {
    return res.status(404).json({ error: 'NOT_MEMBER' });
  }
  return res.json(member);
});

router.post('/register', async (req, res) => {
  const { lineUserId, displayName, fullName, phone } = req.body ?? {};

  if (!lineUserId || !fullName?.trim()) {
    return res.status(400).json({ error: 'INVALID_INPUT' });
  }

  try {
    const member = await registerMember({
      lineUserId,
      displayName: displayName ?? '',
      fullName: fullName.trim(),
      phone: phone?.trim() ?? '',
    });
    return res.status(201).json(member);
  } catch (err) {
    if (err.code === 'ALREADY_REGISTERED') {
      return res.status(409).json({ error: err.code });
    }
    console.error(err);
    return res.status(500).json({ error: 'SERVER_ERROR' });
  }
});

router.post('/:lineUserId/points', async (req, res) => {
  const amount = Number(req.body?.amount ?? 0);
  if (!Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({ error: 'INVALID_AMOUNT' });
  }

  try {
    const member = await addPoints(req.params.lineUserId, amount);
    return res.json(member);
  } catch (err) {
    if (err.code === 'NOT_FOUND') {
      return res.status(404).json({ error: err.code });
    }
    console.error(err);
    return res.status(500).json({ error: 'SERVER_ERROR' });
  }
});

router.post('/:lineUserId/redeem-qr', async (req, res) => {
  const text = req.body?.text;
  if (!text?.trim()) {
    return res.status(400).json({ error: 'INVALID_INPUT' });
  }

  try {
    const member = await redeemQrCode(req.params.lineUserId, text);
    return res.json(member);
  } catch (err) {
    if (err.code === 'NOT_FOUND') {
      return res.status(404).json({ error: err.code });
    }
    if (err.code === 'INVALID_QR' || err.code === 'ALREADY_REDEEMED') {
      return res.status(400).json({ error: err.code });
    }
    console.error(err);
    return res.status(500).json({ error: 'SERVER_ERROR' });
  }
});

export default router;
