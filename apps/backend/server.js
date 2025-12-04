// apps/backend/server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRouter from "./routes/auth.js";
import assistantRouter from "./routes/assistant.js";
import profileRouter from "./routes/profile.js";
import roadmapRouter from "./routes/roadmaps.js";

const app = express();

const PORT = process.env.PORT || 8080;
const ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: ORIGIN, credentials: true }));
app.use(express.json({ limit: "2mb" }));
app.use(morgan("dev"));

// 기존 AI 비서용 라우터
app.use("/api/auth", authRouter);
app.use("/api/assistant", assistantRouter);

// 🔹 로드맵 전용 라우터는 /api/roadmaps 로 분리
app.use("/api/roadmaps", roadmapRouter);

app.use("/api/profile", profileRouter);

app.get("/health", (_, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`[backend] listening on http://localhost:${PORT}`);
});