// apps/backend/services/roadmap.js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * description + tags 를 받아서 역할별 6주 로드맵을 생성.
 * 반환 구조는 프론트의 RoadmapFromApi 타입 형태를 따른다.
 */
export async function generateRoadmapForProject(description, tags = []) {
  if (!process.env.OPENAI_API_KEY) {
    console.warn("[roadmap] OPENAI_API_KEY not set; returning fallback roadmap");
    return fallbackRoadmap(description, tags);
  }

  const tagText = tags.length ? `태그: ${tags.join(", ")}` : "태그 없음";

  const systemPrompt = `
당신은 사이드 프로젝트를 돕는 시니어 PM / Tech Lead / UX 리드입니다.
사용자 설명을 바탕으로 "기획, 개발, 디자인" (필요하면 리더/운영) 관점에서
6주짜리 로드맵을 설계하세요.

반환 형식은 반드시 JSON 하나만, 아래 스키마를 따라야 합니다.

{
  "title": string,
  "subtitle": string,
  "roles": string[],
  "weekly": {
    "<역할명>": [
      { "week": "1주차", "description": string },
      ...
      { "week": "6주차", "description": string }
    ]
  },
  "checkpoints": string[]
}

- 설명은 모두 한국어로 작성합니다.
- roles 는 최소 ["기획", "개발", "디자인"] 을 포함합니다.
- 각 역할마다 1주차~6주차 계획을 구체적으로 작성합니다.
- description 필드는 문장 2~4줄 정도로, 실제 작업 예시(예: API 설계, 와이어프레임, 배포 설정 등)를 포함합니다.
- title, subtitle 은 프로젝트를 한 줄/두 줄로 요약하는 느낌으로 작성합니다.
`;

  const userPrompt = `
프로젝트 설명:
${description}

${tagText}

요구사항:
- 기입한 설명/태그에 최대한 맞는 사이드 프로젝트로 가정합니다.
- 너무 추상적인 로드맵이 아니라, 각 주차에 무슨 작업을 할지 조금 디테일하게 써 주세요.
- 응답에는 JSON 이외의 텍스트(예: "다음은 JSON입니다")를 절대 포함하지 마세요.
`;

  const completion = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.7,
  });

  const raw = completion.choices[0]?.message?.content ?? "";

  try {
    const parsed = JSON.parse(raw);
    return parsed;
  } catch (err) {
    console.warn("[roadmap] JSON parse failed, content:", raw);
    return fallbackRoadmap(description, tags);
  }
}

function fallbackRoadmap(description, tags) {
  const subtitle =
    description && typeof description === "string"
      ? description.slice(0, 60)
      : "사용자 설명을 바탕으로 한 6주 로드맵입니다.";

  return {
    title: "6주 프로젝트 로드맵 (기본 템플릿)",
    subtitle,
    roles: ["기획", "개발", "디자인"],
    weekly: {
      기획: [
        { week: "1주차", description: "문제 정의, 타깃 사용자/페르소나 정의, 경쟁 서비스 간단 조사." },
        { week: "2주차", description: "핵심 가치 제안 도출, 주요 기능 리스트업 및 우선순위 정의." },
        { week: "3주차", description: "유저 플로우/스토리보드 작성, 와이어프레임 피드백 수집." },
        { week: "4주차", description: "기능 스펙 문서 정리, 개발/디자인과 스코프 확정." },
        { week: "5주차", description: "베타 사용 시나리오 작성, 피드백 수집 방법 설계." },
        { week: "6주차", description: "회고 및 다음 버전 로드맵 초안 작성, 지표 정의." },
      ],
      개발: [
        { week: "1주차", description: "개발 환경 세팅, 기본 리포지토리/브랜치 전략 설정." },
        { week: "2주차", description: "데이터 모델 및 API 설계, 기술 스택/라이브러리 확정." },
        { week: "3주차", description: "핵심 기능(인증/메인 기능) 구현 및 간단한 테스트." },
        { week: "4주차", description: "나머지 기능 구현, 리팩터링, 에러 핸들링 정리." },
        { week: "5주차", description: "배포 파이프라인 구성(CI/CD) 및 스테이징 배포." },
        { week: "6주차", description: "모니터링/로그 설정, 버그 수정, 최종 배포." },
      ],
      디자인: [
        { week: "1주차", description: "레퍼런스 수집, 톤앤매너/컬러 팔레트 정의." },
        { week: "2주차", description: "핵심 화면(홈, 주요 기능) 와이어프레임 작성." },
        { week: "3주차", description: "하이파이 시안 제작, 컴포넌트 스타일 가이드 초안." },
        { week: "4주차", description: "디자인 시스템 정리, 개발팀에 핸드오프." },
        { week: "5주차", description: "디자인 QA, 세부 인터랙션/마이크로카피 개선." },
        { week: "6주차", description: "랜딩/소개 자료 제작, 포트폴리오 정리." },
      ],
    },
    checkpoints: [
      "2주차: 문제 정의 및 핵심 기능 스코프 확정",
      "4주차: 베타 수준의 기능 구현 완료",
      "5주차: 스테이징 혹은 내부용 배포 완료",
      "6주차: 회고 및 다음 단계 로드맵 정의",
    ],
    tags,
  };
}