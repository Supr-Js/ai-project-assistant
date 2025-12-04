// apps/backend/services/providers/openai.js
import OpenAI from 'openai';

let client = null;
if (process.env.OPENAI_API_KEY) {
  client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

// 기존 Dev Assistant (그대로 유지)
export async function generateWithOpenAI({ topic, profile, baseDraft }) {
  if (!client) return null;
  const profileLine = `전문화: ${profile?.specialization ?? 'unknown'} | 대표 툴: ${(profile?.tools || []).join(', ') || '없음'}`;
  const projectsLines = (profile?.projects || [])
    .slice(0, 5)
    .map((p) => `- ${p.name} (${p.role}): ${p.stack.join(', ')} — ${p.summary}`)
    .join('\n');

  const sys = `너는 시니어 소프트웨어 아키텍트다. 출력은 한국어. 간결한 불릿과 코드블록 포함.`;
  const user = `주제: ${topic}
프로필: ${profileLine}
주요 프로젝트:
${projectsLines || '- (프로젝트 정보 없음)'}
요구사항:
1) 필요한 툴과 다운로드 URL (프로필을 반영해 구체화)
2) 자료구조와 파일별 최소 실행코드
3) 배포 추천
ruleBased 초안(JSON 일부):
${JSON.stringify(baseDraft).slice(0, 3500)}`;

  const res = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: sys },
      { role: 'user', content: user },
    ],
    temperature: 0.4,
  });
  return res.choices?.[0]?.message?.content || null;
}

// 로드맵 전용 – 주제 반영, 띄어쓰기/가독성, 체크포인트 자세화
export async function generateRoadmapWithOpenAI({ input, tags = [], profile }) {
  if (!client) return null;

  const tagText = Array.isArray(tags) && tags.length ? tags.join(', ') : '태그 없음';
  const prof = profile
    ? `전문화: ${profile.specialization}, 주요 툴: ${(profile.tools || []).join(', ')}`
    : '(프로필 없음)';

  const sys = `
너는 6주 안에 MVP를 완성해야 하는 팀을 돕는 시니어 PM + Tech Lead다.
출력은 반드시 JSON 하나만. 자연어 설명 금지.
각 문장은 한국어 맞춤법과 띄어쓰기를 준수한다.
역할은 ["기획자","개발자","디자이너"]로 고정한다.
주차별 설명은 요청 주제(input)와 태그(tags)를 최대한 구체적으로 반영한다.
각 주차 description은 18~28자 사이의 한 문장으로 요약한다(불릿/줄바꿈 금지).
공통 checkpoints는 최소 6개, 각 항목은 실행 가능한 점검 문장으로 작성한다(예: "MVP 범위 확정 및 문서화").`;

  const user = `
[input]
${input}

[tags]
${tagText}

[profile]
${prof}

아래 JSON 스키마와 동일한 구조로만 응답해라:
{
  "title": "6주로 완성하는 사이드프로젝트",
  "subtitle": "시연 가능한 MVP가 목적이에요.",
  "roles": ["기획자","개발자","디자이너"],
  "weekly": {
    "기획자": [
      { "week": "1주차", "description": "..." },
      { "week": "2주차", "description": "..." },
      { "week": "3주차", "description": "..." },
      { "week": "4주차", "description": "..." },
      { "week": "5주차", "description": "..." },
      { "week": "6주차", "description": "..." }
    ],
    "개발자": [
      { "week": "1주차", "description": "..." },
      { "week": "2주차", "description": "..." },
      { "week": "3주차", "description": "..." },
      { "week": "4주차", "description": "..." },
      { "week": "5주차", "description": "..." },
      { "week": "6주차", "description": "..." }
    ],
    "디자이너": [
      { "week": "1주차", "description": "..." },
      { "week": "2주차", "description": "..." },
      { "week": "3주차", "description": "..." },
      { "week": "4주차", "description": "..." },
      { "week": "5주차", "description": "..." },
      { "week": "6주차", "description": "..." }
    ]
  },
  "checkpoints": [
    "실행 가능한 체크포인트 1",
    "실행 가능한 체크포인트 2",
    "실행 가능한 체크포인트 3",
    "실행 가능한 체크포인트 4",
    "실행 가능한 체크포인트 5",
    "실행 가능한 체크포인트 6"
  ]
}`;

  const res = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: sys },
      { role: 'user', content: user },
    ],
    temperature: 0.3,
  });

  const raw = res.choices?.[0]?.message?.content;
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error('[openai] roadmap JSON parse error', e, raw);
    return null;
  }
}