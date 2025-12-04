// apps/frontend/src/lib/api.ts
import axios, { type InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:8080/api",
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function register(email: string, password: string) {
  const { data } = await api.post("/auth/register", { email, password });
  return data as { ok: boolean };
}

export async function login(email: string, password: string) {
  const { data } = await api.post("/auth/login", { email, password });
  localStorage.setItem("token", data.token);
  return data as { token: string; user: { email: string } };
}

// 예전 DevAssistant용 생성 API (그대로 유지)
export async function generate(topic: string, useProfile?: boolean) {
  const body = typeof useProfile === "boolean" ? { topic, useProfile } : { topic };
  const { data } = await api.post("/assistant/generate", body);
  return data as {
    stack: string;
    tools: { name: string; url: string }[];
    files: Record<string, string>;
    deploy: string[];
    llm?: string;
    profileApplied?: boolean;
  };
}

// 🔹 6주 로드맵 생성 API – 이제 /roadmaps/generate 로 분리
export async function generateRoadmap(description: string, tags: string[]) {
  const { data } = await api.post("/roadmaps/generate", {
    description,
    tags,
  });
  // AIDescribeScreen 쪽에서 RoadmapFromApi 타입으로 사용
  return data;
}