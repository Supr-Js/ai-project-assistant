// apps/frontend/src/components/wizard/AIDescribeScreen.tsx
import { type FormEvent, useState } from "react";
import aiFace from "../../assets/icons/ai-face.svg";
import roadmapHero from "../../assets/images/roadmap-hero.png";
import unionIcon from "../../assets/icons/union.svg";
import { generateRoadmap } from "../../lib/api";

export type WeeklyItem = { week: string; description: string };

export type RoadmapFromApi = {
  title?: string;
  subtitle?: string;
  roles?: string[];
  weekly?: Record<string, WeeklyItem[]>;
  checkpoints?: string[];
};

export type DescribeFormData = {
  input: string;
  tags: string[];
  roadmap?: RoadmapFromApi;
};

interface Props {
  initialData?: DescribeFormData;
  onBack: () => void;
  // ❌ onCancel 제거
  onSubmit: (form: DescribeFormData) => void;
}

type TopicPreset = {
  id: string;
  label: string;
  example: string;
  defaultTags: string[];
};

const TOPIC_PRESETS: TopicPreset[] = [
  {
    id: "creative-it",
    label: "창의IT코딩",
    example:
      "창의IT코딩 수업이나 대회에 제출할 만한 6주짜리 웹 기반 인터랙티브 코딩 프로젝트를 만들고 싶어요. 초·중급 수준의 학생들이 재미있게 참여하면서도 알고리즘과 문제 해결 능력을 키울 수 있는 내용을 원합니다.",
    defaultTags: ["study", "career"],
  },
  {
    id: "design-contest",
    label: "디자인공모전",
    example:
      "디자인 공모전 출품을 목표로 한 6주 사이드 프로젝트를 진행하고 싶어요. UX/UI 기획부터 와이어프레임, 프로토타입, 간단한 구현까지 이어지는 흐름이 있으면 좋겠습니다.",
    defaultTags: ["career"],
  },
  {
    id: "planning",
    label: "기획",
    example:
      "서비스 기획 역량을 키우기 위해 6주 동안 진행할 사이드 프로젝트를 계획하고 싶어요. 시장 조사, 페르소나 정의, 문제 정의, 기능 우선순위, 로드맵 수립까지 체계적으로 연습하고 싶습니다.",
    defaultTags: ["study"],
  },
  {
    id: "mvp-launch",
    label: "MVP개발/출시",
    example:
      "6주 안에 실제로 배포 가능한 웹 서비스 MVP를 만드는 것이 목표입니다. 핵심 기능에 집중해서 프론트엔드·백엔드를 최소 범위로 구현하고, 마지막 주에 실제 배포와 간단한 지표 수집까지 하고 싶어요.",
    defaultTags: ["mvp", "web-app", "career"],
  },
  {
    id: "startup",
    label: "스타트업/비즈니스",
    example:
      "장기적으로 스타트업 창업을 염두에 두고 6주짜리 비즈니스 실험 프로젝트를 진행하고 싶어요. 문제/시장 검증, 고객 인터뷰, 간단한 랜딩 페이지 제작, 수익 모델 실험까지 경험해보고 싶습니다.",
    defaultTags: ["startup"],
  },
  {
    id: "social",
    label: "소셜 네트워킹",
    example:
      "사이드 프로젝트를 통해 새로운 사람들을 만나고 소셜 네트워킹을 확장하고 싶어요. 6주 동안 커뮤니티 기반 웹 서비스나 오프라인 모임과 연계된 프로젝트를 진행해보고 싶습니다.",
    defaultTags: ["startup"],
  },
  {
    id: "collab",
    label: "협업 경험",
    example:
      "개발자, 디자이너, 기획자가 함께 협업하는 경험을 쌓고 싶어요. 6주 동안 역할을 나누어 실제 협업 프로세스(Jira, Git, Figma 등)를 연습할 수 있는 프로젝트가 필요합니다.",
    defaultTags: ["career", "study"],
  },
  {
    id: "ecommerce",
    label: "이커머스",
    example:
      "간단한 이커머스 서비스를 6주 안에 설계·구현하고 싶어요. 상품 리스트, 장바구니, 주문 흐름 중심으로 최소 기능만 구현해서 실제 결제 혹은 모의 결제까지 연결해보고 싶습니다.",
    defaultTags: ["mvp", "web-app"],
  },
  {
    id: "study-academic",
    label: "학업 및 스터디",
    example:
      "학교 수업이나 전공 스터디와 연계해서 6주 동안 진행할 학습용 프로젝트를 만들고 싶어요. 이론을 정리하고 실습 코드와 문서를 함께 남길 수 있는 형태면 좋겠습니다.",
    defaultTags: ["study"],
  },
];

export default function AIDescribeScreen({
  initialData,
  onBack,
  onSubmit, // ✅ onCancel 제거
}: Props) {
  const [input, setInput] = useState(initialData?.input ?? "");
  const [tags, setTags] = useState<string[]>(initialData?.tags ?? []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = input.trim().length >= 6;

  const runGenerate = async (description: string, tagIds: string[]) => {
    if (description.trim().length < 6) {
      setError("설명은 최소 6자 이상 입력해야 합니다.");
      return;
    }
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const res = await generateRoadmap(description, tagIds);
      const formData: DescribeFormData = {
        input: description,
        tags: tagIds,
        roadmap: res,
      };
      setInput(description);
      setTags(tagIds);
      onSubmit(formData);
    } catch (err) {
      console.error("[AIDescribeScreen] generateRoadmap error", err);
      setError("로드맵 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit || loading) return;
    await runGenerate(input, tags);
  };

  const handlePresetClick = (preset: TopicPreset) => {
    const mergedTags = Array.from(
      new Set<string>([...tags, ...preset.defaultTags]),
    );
    runGenerate(preset.example, mergedTags);
  };

  const disabled = !canSubmit || loading;

  return (
    // 중앙에 떠 있는 팝업 카드
    <div
      style={{
        position: "relative",
        width: "100%",
        borderRadius: 32,
        padding: "32px 32px 28px",
        margin: "0 auto",
        background:
          "radial-gradient(circle at top left, rgba(56,189,248,0.28), transparent 55%), radial-gradient(circle at bottom right, rgba(129,140,248,0.22), transparent 55%), rgba(15,23,42,0.98)",
        border: "1px solid rgba(148,163,184,0.6)",
        boxShadow: "0 32px 120px rgba(15,23,42,0.9)",
        color: "#e5e7eb",
      }}
    >
      {/* 우측 상단 돌아가기 버튼 */}
      <button
        type="button"
        onClick={onBack}
        aria-label="프로젝트 생성 단계로 돌아가기"
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          width: 30,
          height: 30,
          borderRadius: "999px",
          border: "1px solid rgba(148,163,184,0.7)",
          backgroundColor: "rgba(15,23,42,0.95)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <img src={unionIcon} alt="" style={{ width: 13, height: 13 }} />
      </button>

      <div className="grid gap-6 md:grid-cols-[1.4fr,1fr]">
        {/* 왼쪽 영역 */}
        <div>
          {/* 상단 아이콘 + 설명 */}
          <div
            style={{
              maxWidth: 640,
              margin: "0 auto 10px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <img
              src={aiFace}
              alt="AI"
              style={{
                width: 40,
                height: 40,
                borderRadius: 16,
                padding: 8,
                backgroundColor: "rgba(15,23,42,0.9)",
                boxShadow: "0 10px 25px rgba(15,23,42,0.7)",
              }}
            />
            <div style={{ textAlign: "left" }}>
              <h2
                style={{
                  margin: 0,
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#e5e7eb",
                }}
              >
                어떤 프로젝트를 만들고 싶나요?
              </h2>
              <p
                style={{
                  marginTop: 6,
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: "#cbd5f5",
                }}
              >
                프로젝트 기간, 목표, 형태, 협업 방식 등을 자유롭게 적어주세요.
                <br />
                아래 <b>프로젝트 주제 예시 버튼</b>을 눌러 바로 로드맵을 받아보거나,
                입력란에 직접 설명을 적어도 좋아요.
              </p>
            </div>
          </div>

          {/* 프로젝트 주제 예시 버튼들 */}
          <div
            style={{
              maxWidth: 640,
              margin: "0 auto 14px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 8,
            }}
          >
            {TOPIC_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                disabled={loading}
                onClick={() => handlePresetClick(preset)}
                style={{
                  padding: "6px 12px",
                  borderRadius: 999,
                  border: "1px solid rgba(56,189,248,0.85)",
                  backgroundColor: "rgba(56,189,248,0.20)",
                  color: "#e0f2fe",
                  fontSize: 12,
                  cursor: loading ? "default" : "pointer",
                  opacity: loading ? 0.6 : 1,
                  whiteSpace: "nowrap",
                }}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* 입력 폼 */}
          <form onSubmit={handleSubmit}>
            <div
              style={{
                maxWidth: 620,
                margin: "0 auto",
              }}
            >
              <label
                className="text-xs font-medium uppercase tracking-[0.18em] text-sky-300"
                style={{ display: "block", marginBottom: 6 }}
              >
                프로젝트 설명
              </label>

              <textarea
                rows={6}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="resize-none rounded-2xl border px-4 py-3 text-sm shadow-inner outline-none placeholder:text-slate-500 focus:ring-1"
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  minHeight: 150,
                  maxHeight: 260,
                  backgroundColor: "#e1f4ff",
                  borderColor: "rgba(56,189,248,0.9)",
                  color: "#0f172a",
                  caretColor: "#0f172a",
                  fontFamily: "inherit",
                }}
                placeholder="예) 나는 취업 준비 중인 개발자고, 6주 동안 MVP를 완성할 수 있는 웹 서비스 프로젝트를 진행하려고 해. 프론트/백엔드/디자인까지 팀을 꾸려 협업 경험과 포트폴리오를 만들고 싶어."
              />

              <div
                style={{
                  marginTop: 4,
                  fontSize: 11,
                  textAlign: "right",
                  color: "#64748b",
                }}
              >
                {input.trim().length}/500
              </div>

              <div
                style={{
                  marginTop: 10,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: 11,
                    color: "#6b7280",
                  }}
                >
                  설명은 최소 6자 이상 입력해야 해요.
                </p>

                <button
                  type="submit"
                  disabled={disabled}
                  style={{
                    padding: "9px 22px",
                    borderRadius: 999,
                    border: "1px solid rgba(56,189,248,0.9)",
                    backgroundColor: "rgba(56,189,248,0.22)",
                    color: "#f9fbff",
                    fontSize: 13,
                    fontWeight: 600,
                    boxShadow:
                      "0 18px 45px rgba(56,189,248,0.9), 0 0 0 1px rgba(15,23,42,0.5)",
                    cursor: disabled ? "default" : "pointer",
                    opacity: disabled ? 0.55 : 1,
                    transition:
                      "background-color 0.15s ease, transform 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    if (disabled) return;
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                      "rgba(56,189,248,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    if (disabled) return;
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                      "rgba(56,189,248,0.22)";
                  }}
                >
                  {loading ? "로드맵 생성 중…" : "AI에게 로드맵 요청하기"}
                </button>
              </div>

              {error && (
                <p
                  style={{
                    marginTop: 8,
                    fontSize: 12,
                    color: "#fecaca",
                    textAlign: "center",
                  }}
                >
                  {error}
                </p>
              )}
            </div>
          </form>
        </div>

        {/* 오른쪽 Preview */}
        <div
          className="hidden md:flex"
          style={{ flexDirection: "column", alignItems: "center" }}
        >
          <div
            className="relative overflow-hidden rounded-2xl border border-sky-500/30 bg-slate-950/80"
            style={{
              width: "100%",
              maxWidth: 420,
              margin: "24px auto 0",
            }}
          >
            <img
              src={roadmapHero}
              alt="로드맵 예시"
              className="h-32 w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-300">
                Preview
              </p>
              <h3 className="mt-1 text-sm font-semibold text-slate-50">
                역할별 6주 로드맵 초안
              </h3>
              <p className="mt-1 text-[11px] text-slate-300">
                입력하신 설명을 바탕으로 기획자 · 개발자 · 디자이너
                <br />
                각 역할의 주차별 계획과 공통 체크포인트가 생성됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}