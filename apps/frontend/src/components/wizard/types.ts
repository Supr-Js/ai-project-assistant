// apps/frontend/src/components/wizard/types.ts
export type RoleName = "기획자" | "개발자" | "디자이너";

export interface WeeklyPlan {
  week: string;
  description: string;
}

export interface RoleRoadmap {
  role: RoleName;
  weekly: WeeklyPlan[];
  checkpoints: string[];
}

export interface RoadmapAIResult {
  summary: string;
  roles: RoleRoadmap[];
  commonCheckpoints: string[];
  note: string;
}