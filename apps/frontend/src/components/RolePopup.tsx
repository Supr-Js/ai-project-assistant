// apps/frontend/src/components/RolePopup.tsx
import { useState } from "react";
import aiFace from "../assets/icons/ai-face.svg";

type Role = "design" | "dev" | "pm" | "lead";

const META: Record<
  Role,
  {
    label: string;
    badge: string;
    desc: string;
    accent: string;
  }
> = {
  design: {
    label: "디자인 담당",
    badge: "UI · UX",
    desc: "와이어프레임 / 디자인 시스템",
    accent: "linear-gradient(135deg, #fb7185, #ec4899)",
  },
  dev: {
    label: "개발 담당",
    badge: "CODE · MVP",
    desc: "툴 / 자료구조 / 파일별 코드 / 배포",
    accent: "linear-gradient(135deg, #facc15, #fbbf24)",
  },
  pm: {
    label: "기획 담당",
    badge: "PLAN",
    desc: "요구사항 / 일정 / 리스크",
    accent: "linear-gradient(135deg, #38bdf8, #22c55e)",
  },
  lead: {
    label: "프로젝트 총괄",
    badge: "LEAD",
    desc: "로드맵 / 역할 / 커뮤니케이션",
    accent: "linear-gradient(135deg, #22c55e, #a3e635)",
  },
};

export default function RolePopup({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [pickedRole, setPickedRole] = useState<Role | null>(null);

  if (!open) return null;

  const handlePick = (role: Role) => {
    setPickedRole(role);
    setNoticeOpen(true);
  };

  const handleNoticeClose = () => {
    setNoticeOpen(false);
    // 여기서 onClose()를 부르지 않으므로
    // 확인 버튼을 눌러도 역할 선택 팝업은 그대로 유지됨
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9990,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(15,23,42,0.92)",
        backdropFilter: "blur(10px)",
      }}
      onClick={onClose}
    >
      {/* 메인 역할 선택 카드 */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 1040,
          margin: "0 20px",
          borderRadius: 32,
          padding: "32px 32px 28px",
          background:
            "radial-gradient(circle at top left, rgba(56,189,248,0.28), transparent 55%), radial-gradient(circle at bottom right, rgba(129,140,248,0.22), transparent 55%), rgba(15,23,42,0.98)",
          border: "1px solid rgba(148,163,184,0.6)",
          boxShadow: "0 32px 120px rgba(15,23,42,0.9)",
          color: "#e5e7eb",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 우측 상단 닫기 버튼 */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: "absolute",
            right: 20,
            top: 20,
            padding: "6px 10px",
            borderRadius: 999,
            border: "1px solid rgba(148,163,184,0.6)",
            backgroundColor: "rgba(15,23,42,0.9)",
            fontSize: 11,
            color: "#e5e7eb",
            cursor: "pointer",
          }}
        >
          닫기
        </button>

        {/* 상단 제목 영역 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 999,
              background:
                "radial-gradient(circle at 30% 0%, rgba(244,114,182,0.4), transparent 60%), rgba(15,23,42,1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 40px rgba(236,72,153,0.5)",
            }}
          >
            <img
              src={aiFace}
              alt="AI"
              style={{ width: 30, height: 30, display: "block" }}
            />
          </div>
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: "0.02em",
              }}
            >
              어떤 역할의 AI 비서를 사용하시겠어요?
            </h2>
            <p
              style={{
                marginTop: 6,
                marginBottom: 0,
                fontSize: 13,
                color: "#cbd5f5",
              }}
            >
              지금은 역할별 책을 설계하는 덱만 준비하는 단계예요.
              <br />
              역할을 선택하면 추후 제공될 기능에 대한 안내 문구가 표시됩니다.
            </p>
          </div>
        </div>

        {/* 역할 카드 그리드 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 16,
          }}
        >
          {(Object.keys(META) as Role[]).map((role) => {
            const m = META[role];
            const isDev = role === "dev";

            return (
              <button
                key={role}
                type="button"
                onClick={() => handlePick(role)}
                style={{
                  position: "relative",
                  borderRadius: 24,
                  padding: "18px 18px 16px",
                  textAlign: "left",
                  border: isDev
                    ? "1px solid rgba(250,204,21,0.9)"
                    : "1px solid rgba(148,163,184,0.6)",
                  background:
                    "linear-gradient(135deg, rgba(15,23,42,0.98), rgba(15,23,42,0.9))",
                  cursor: "pointer",
                  boxShadow: isDev
                    ? "0 0 30px rgba(250,204,21,0.3)"
                    : "0 0 0 rgba(0,0,0,0)",
                }}
              >
                {/* 상단 뱃지들 */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 10,
                  }}
                >
                  <span
                    style={{
                      padding: "3px 10px",
                      borderRadius: 999,
                      background: m.accent,
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#0f172a",
                    }}
                  >
                    {m.badge}
                  </span>
                  <span
                    style={{
                      padding: "2px 8px",
                      borderRadius: 999,
                      border: isDev
                        ? "1px solid rgba(250,204,21,0.9)"
                        : "1px solid rgba(148,163,184,0.6)",
                      backgroundColor: isDev
                        ? "rgba(250,204,21,0.12)"
                        : "rgba(30,64,175,0.4)",
                      fontSize: 10,
                      fontWeight: 600,
                      color: isDev ? "#fef9c3" : "#e5e7eb",
                    }}
                  >
                    {isDev ? "현재 사용 가능(예정)" : "준비 중"}
                  </span>
                </div>

                <h3
                  style={{
                    margin: 0,
                    marginBottom: 6,
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#f9fafb",
                  }}
                >
                  {m.label}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    color: "#cbd5f5",
                  }}
                >
                  {m.desc}
                </p>

                <div
                  style={{
                    marginTop: 14,
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 11,
                    color: "#94a3b8",
                  }}
                >
                  <span>
                    {isDev
                      ? "주제만 입력하면 추후 MVP 뼈대까지 제안될 예정입니다."
                      : "먼저 역할을 골라 두면 이후 전용 비서가 연결될 거예요."}
                  </span>
                  <span
                    style={{
                      marginLeft: 8,
                      fontWeight: 600,
                      color: "#e5e7eb",
                    }}
                  >
                    선택하기 →
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* 안내 모달 (역할 클릭 시) */}
        {noticeOpen && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(15,23,42,0.9)",
              backdropFilter: "blur(6px)",
              borderRadius: 32,
            }}
          >
            <div
              style={{
                minWidth: 320,
                maxWidth: 520,
                margin: "0 16px",
                padding: "26px 28px 22px",
                borderRadius: 26,
                background:
                  "radial-gradient(circle at top left, rgba(56,189,248,0.35), transparent 55%), rgba(15,23,42,0.98)",
                border: "1px solid rgba(148,163,184,0.7)",
                boxShadow: "0 28px 90px rgba(15,23,42,1)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 999,
                  backgroundColor: "rgba(15,23,42,0.95)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 10px",
                  boxShadow: "0 0 30px rgba(96,165,250,0.7)",
                }}
              >
                <img
                  src={aiFace}
                  alt="AI"
                  style={{ width: 26, height: 26, display: "block" }}
                />
              </div>
              <h3
                style={{
                  margin: 0,
                  marginBottom: 6,
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#f9fafb",
                }}
              >
                이후 제공 예정입니다
              </h3>
              <p
                style={{
                  margin: 0,
                  marginBottom: 16,
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: "#cbd5f5",
                }}
              >
                역할별 AI 비서는 프론트/개발/기획 흐름을 정리한 뒤
                <br />
                단계적으로 제공할 예정이에요.
                {pickedRole && (
                  <>
                    <br />
                    지금은 프로젝트 생성 기능을 먼저 이용해 주세요.
                  </>
                )}
              </p>
              <button
                type="button"
                onClick={handleNoticeClose}
                style={{
                  padding: "8px 26px",
                  borderRadius: 999,
                  border: "none",
                  background:
                    "radial-gradient(circle at top, #22d3ee, #0ea5e9)",
                  color: "#0f172a",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 18px 40px rgba(56,189,248,0.9)",
                }}
              >
                확인
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}