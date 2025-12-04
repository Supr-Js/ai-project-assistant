// apps/backend/routes/roadmaps.js
import { Router } from "express";
import { generateRoadmapForProject } from "../services/roadmap.js";

const router = Router();

/**
 * POST /api/roadmaps/generate
 * body: { description: string, tags: string[] }
 */
router.post("/generate", async (req, res) => {
  const { description, tags } = req.body ?? {};

  if (!description || typeof description !== "string") {
    return res.status(400).json({ error: "description is required" });
  }

  try {
    const roadmap = await generateRoadmapForProject(
      description,
      Array.isArray(tags) ? tags : []
    );
    res.json(roadmap);
  } catch (err) {
    console.error("[roadmaps] generate error", err);
    res.status(500).json({ error: "failed_to_generate_roadmap" });
  }
});

export default router;