// apps/frontend/src/components/wizard/MethodScreen.tsx
import frameIcon from "../../assets/icons/frame.svg";
import stepsIcon from "../../assets/icons/bar-chart-steps.svg";
import aiFace from "../../assets/icons/ai-face.svg";
import xIcon from "../../assets/icons/x.svg";

export type Method = "step" | "ai";

export default function MethodScreen({
  onSelect,
  onClose,
}: {
  onSelect: (method: Method) => void;
  onClose: () => void;
}) {
  return (
    // 👉 RolePopup과 비슷한 큰 팝업 카드 래퍼
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 1040,
        margin: "0 auto",
        borderRadius: 32,
        padding: "32px 32px 28px",
        background:
          "radial-gradient(circle at top left, rgba(56,189,248,0.28), transparent 55%), radial-gradient(circle at bottom right, rgba(129,140,248,0.22), transparent 55%), rgba(15,23,42,0.98)",
        border: "1px solid rgba(148,163,184,0.6)",
        boxShadow: "0 32px 120px rgba(15,23,42,0.9)",
        color: "#e5e7eb",
      }}
    >
      {/* 우측 상단 X 버튼 */}
      <button
        type="button"
        onClick={onClose}
        aria-label="닫기"
        style={{
          position: "absolute",
          right: 20,
          top: 20,
          width: 32,
          height: 32,
          borderRadius: "999px",
          border: "1px solid rgba(148,163,184,0.7)",
          backgroundColor: "rgba(15,23,42,0.95)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <img src={xIcon} alt="close" style={{ width: 14, height: 14 }} />
      </button>

      {/* 카드 안 전체 컨텐츠 */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* 상단 아이콘 + 제목 + 설명 영역 */}
        <div
          style={{
            marginTop: 16,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <img
            src={frameIcon}
            alt="Project Wizard"
            style={{ width: 64, height: 64, transform: "translateY(4px)" }}
          />
          <h2
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 600,
              color: "#f9fafb",
            }}
          >
            프로젝트 생성 방법을 선택해보세요!
          </h2>
          <p
            style={{
              margin: 0,
              maxWidth: 560,
              fontSize: 14,
              lineHeight: 1.6,
              color: "#cbd5f5",
            }}
          >
            단계별로 직접 쌓아가거나, AI 비서에게 한 번에 로드맵을 맡길 수 있어요.
          </p>
        </div>

        {/* 선택 카드 2개 영역 */}
        <div
          style={{
            marginTop: 32,
            width: "100%",
            maxWidth: 720,
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 16,
          }}
        >
          {/* 단계별 생성 – 비활성 (준비중) */}
          <button
            type="button"
            disabled
            style={{
              cursor: "not-allowed",
              opacity: 0.6,
              borderRadius: 18,
              border: "1px solid rgba(51,65,85,0.9)",
              backgroundColor: "rgba(15,23,42,0.9)",
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              textAlign: "left",
              color: "#e5e7eb",
            }}
          >
            <div
              style={{
                marginBottom: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  borderRadius: 999,
                  padding: "4px 10px",
                  fontSize: 11,
                  fontWeight: 500,
                  backgroundColor: "rgba(15,23,42,0.9)",
                  color: "#9ca3af",
                }}
              >
                준비 중
              </span>
              <img
                src={stepsIcon}
                alt="단계별 생성"
                style={{ width: 24, height: 24 }}
              />
            </div>
            <div>
              <h3
                style={{
                  margin: 0,
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#f9fafb",
                }}
              >
                단계별로 생성하기
              </h3>
              <p
                style={{
                  marginTop: 8,
                  marginBottom: 0,
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: "#9ca3af",
                }}
              >
                각 단계별로 차근차근하게 과정을 쌓아가며
                <br />
                프로젝트를 직접 설계할 수 있어요.
              </p>
            </div>
          </button>

          {/* AI 생성 */}
          <button
            type="button"
            onClick={() => onSelect("ai")}
            style={{
              cursor: "pointer",
              borderRadius: 18,
              border: "1px solid rgba(56,189,248,0.8)",
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              textAlign: "left",
              backgroundImage:
                "linear-gradient(135deg, rgba(56,189,248,0.45), rgba(15,23,42,0.98), rgba(34,211,238,0.4))",
              boxShadow: "0 24px 80px rgba(8,47,73,0.95)",
              color: "#e0f2fe",
            }}
          >
            <div
              style={{
                marginBottom: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  borderRadius: 999,
                  padding: "4px 10px",
                  fontSize: 11,
                  fontWeight: 600,
                  backgroundColor: "rgba(0,0,0,0.4)",
                  color: "#e0f2fe",
                }}
              >
                NEW
              </span>
              <img
                src={aiFace}
                alt="AI 생성"
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 12,
                  padding: 6,
                  backgroundColor: "rgba(15,23,42,0.9)",
                  boxShadow: "0 6px 16px rgba(15,23,42,0.9)",
                }}
              />
            </div>
            <div>
              <h3
                style={{
                  margin: 0,
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#f9fafb",
                }}
              >
                AI로 쉽게 생성하기
              </h3>
              <p
                style={{
                  marginTop: 8,
                  marginBottom: 0,
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: "#e0f2fe",
                }}
              >
                AI 비서와 함께 6주짜리 사이드 프로젝트 로드맵을
                <br />
                단 한 번의 설명으로 받아보세요.
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}