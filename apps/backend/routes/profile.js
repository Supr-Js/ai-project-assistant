// apps/backend/routes/profile.js
import { Router } from 'express';
import { z } from 'zod';
import { db } from '../services/db/memory.js';

const router = Router();

const ProfileSchema = z.object({
  badges: z.object({
    company: z.string().optional(),
    school: z.string().optional(),
    verified: z.boolean().optional()
  }),
  specialization: z.enum(['backend','frontend','fullstack','ml','mobile']),
  tools: z.array(z.string()).default([]),
  projects: z.array(z.object({
    name: z.string(),
    role: z.string(),
    summary: z.string(),
    stack: z.array(z.string())
  })).default([])
});

router.get('/', (_req, res) => {
  return res.json(db.profile);
});

router.put('/', (req, res) => {
  const parsed = ProfileSchema.safeParse(req.body);
  if(!parsed.success){
    return res.status(400).json({ error: 'invalid_profile', details: parsed.error.issues });
  }
  db.profile = parsed.data;
  return res.json(db.profile);
});

export default router;