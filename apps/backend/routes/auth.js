// apps/backend/routes/auth.js
import { Router } from 'express';

const router = Router();

// 아주 단순한 인메모리 유저 저장소 (서버 재시작 시 초기화됨)
const users = new Map(); // email -> { password, createdAt }

function isValidEmail(email = '') {
  return typeof email === 'string' && email.includes('@');
}
function isValidPassword(password = '') {
  return typeof password === 'string' && password.length >= 4;
}

// 회원가입
router.post('/register', (req, res) => {
  const { email, password } = req.body || {};

  if (!isValidEmail(email) || !isValidPassword(password)) {
    return res.status(400).json({ error: 'invalid_email_or_password' });
  }
  if (users.has(email)) {
    return res.status(409).json({ error: 'user_already_exists' });
  }

  users.set(email, { password, createdAt: new Date().toISOString() });
  return res.json({ ok: true });
});

// 로그인
router.post('/login', (req, res) => {
  const { email, password } = req.body || {};

  if (!isValidEmail(email) || !isValidPassword(password)) {
    return res.status(400).json({ error: 'invalid_email_or_password' });
  }

  const user = users.get(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'invalid_credentials' });
  }

  const token = Buffer.from(`${email}|demo|${Date.now()}`).toString('base64');
  res.json({ token, user: { email } });
});

export default router;