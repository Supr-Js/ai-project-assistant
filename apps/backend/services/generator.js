// apps/backend/services/generator.js
import { generateWithOpenAI } from './providers/openai.js';

/**
 * Dev Assistant가 기대하는 기본 초안 구조를 간단히 만들어 둡니다.
 * - stack: 요약 스택 설명
 * - tools: { name, url } 리스트
 * - files: 파일 경로 -> 코드 스니펫
 * - deploy: 배포 관련 설명 리스트
 */
function buildBaseDraft(topic) {
  const safeTopic = topic?.trim() || '사이드 프로젝트';

  return {
    topic: safeTopic,
    stack: 'React + Node.js + PostgreSQL 기반 웹 서비스',
    tools: [
      { name: 'Node.js', url: 'https://nodejs.org/' },
      { name: 'React', url: 'https://react.dev/' },
      { name: 'PostgreSQL', url: 'https://www.postgresql.org/' },
      { name: 'Vite', url: 'https://vitejs.dev/' },
    ],
    files: {
      'frontend/src/App.tsx': `// ${safeTopic} 메인 화면 엔트리
import React from 'react';

export default function App() {
  return (
    <div style={{ padding: 24 }}>
      <h1>${safeTopic}</h1>
      <p>여기서부터 페이지 컴포넌트를 구성해 주세요.</p>
    </div>
  );
}
`,
      'backend/server.js': `// ${safeTopic} 백엔드 서버 기본 예시
import express from 'express';
const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.listen(8080, () => {
  console.log('[backend] listening on http://localhost:8080');
});
`,
      'README.md': `# ${safeTopic}

이 프로젝트는 React + Node.js + PostgreSQL 조합으로 구성된 사이드 프로젝트입니다.
Dev Assistant가 제안한 구조를 바탕으로 기능을 확장해 보세요.
`,
    },
    deploy: [
      'GitHub 레포지토리를 만든 뒤 frontend / backend 폴더를 푸시합니다.',
      '프론트엔드는 Vercel 또는 Netlify에 연결하여 배포합니다.',
      '백엔드는 Render, Railway, 또는 AWS EC2에 Node.js 서버로 배포합니다.',
      '환경 변수(데이터베이스 URL, API 키 등)를 배포 환경에 설정합니다.',
    ],
  };
}

/**
 * 기존 /api/assistant/generate 에서 사용하는 핵심 함수
 * - topic: 사용자가 입력한 주제
 * - profile: (선택) 프로필 정보 – 없으면 null
 *
 * 반환 형태는 프론트의 api.generate() 타입과 맞춰서:
 * {
 *   stack: string;
 *   tools: { name: string; url: string }[];
 *   files: Record<string, string>;
 *   deploy: string[];
 *   llm?: string;             // 사용된 LLM 이름 (예: "gpt-4o-mini")
 *   profileApplied?: boolean; // 프로필 반영 여부
 * }
 */
export async function generate({ topic, profile }) {
  const baseDraft = buildBaseDraft(topic || '');

  let llmText = null;
  try {
    // OpenAI가 켜져 있으면, ruleBased 초안을 참고해 더 정교한 설명을 생성
    llmText = await generateWithOpenAI({
      topic,
      profile,
      baseDraft,
    });
  } catch (err) {
    console.error('[generator] OpenAI 호출 중 오류', err);
  }

  return {
    stack: baseDraft.stack,
    tools: baseDraft.tools,
    files: baseDraft.files,
    deploy: baseDraft.deploy,
    llm: llmText ?? undefined,
    profileApplied: !!profile,
  };
}