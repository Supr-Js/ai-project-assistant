// apps/backend/routes/assistant.js
import { Router } from "express";

const router = Router();

/**
 * (레거시) DevAssistant용 엔드포인트.
 * 현재 프론트에서는 사용하지 않지만, 기존 코드 호환을 위해
 * 최소한의 JSON 구조만 돌려줍니다.
 */
router.post("/generate", async (req, res) => {
  res.json({
    stack: "",
    tools: [],
    files: {},
    deploy: [],
    llm: "none",
    profileApplied: false,
  });
});

export default router;