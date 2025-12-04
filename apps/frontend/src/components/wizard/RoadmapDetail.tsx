import React, { useMemo, useState } from "react";
import unionIcon from "../../assets/icons/union.svg";
import xIcon from "../../assets/icons/x.svg";
import aiFace from "../../assets/icons/ai-face.svg";
import roadmapHero from "../../assets/images/roadmap-hero.png";
import type {
  DescribeFormData,
  WeeklyItem,
  RoadmapFromApi,
} from "./AIDescribeScreen";

interface RoadmapDetailProps {
  onBack: () => void;   // 설명 입력 화면으로
  onClose: () => void;  // 프로젝트 생성 첫 화면(MethodScreen)으로
  formData: DescribeFormData | null;
}

type RoadmapData = {
  title: string;
  subtitle: string;
  roles: string[];
  weekly: Record<string, WeeklyItem[]>;
  checkpoints: string[];
};

const DEFAULT_ROLES = ["기획자", "개발자", "디자이너"];

function normalizeRoadmap(raw?: RoadmapFromApi): RoadmapData {
  const title = (raw?.title ?? "6주로 완성하는 사이드프로젝트").trim();
  const subtitle = (raw?.subtitle ?? "시연 가능한 MVP가 목적이에요.").trim();
  const roles =
    raw?.roles && raw.roles.length ? [...raw.roles] : [...DEFAULT_ROLES];

  const weeklyRaw = raw?.weekly ?? {};
  const weekly: Record<string, WeeklyItem[]> = {};
  roles.forEach((r) => {
    weekly[r] = weeklyRaw[r] ?? [];
  });

  const checkpoints = raw?.checkpoints ?? [];

  return { title, subtitle, roles, weekly, checkpoints };
}

const RoadmapDetail: React.FC<RoadmapDetailProps> = ({
  onBack,
  onClose,
  formData,
}) => {
  const cached: RoadmapData = useMemo(
    () => normalizeRoadmap(formData?.roadmap),
    [formData]
  );

  const [role, setRole] = useState<string>(
    cached.roles[0] || DEFAULT_ROLES[0]
  );
  const weekly: WeeklyItem[] = cached.weekly?.[role] ?? [];

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 960,
        margin: "0 auto",
        borderRadius: 28,
        border: "1px solid rgba(56,189,248,0.4)",
        background:
          "radial-gradient(circle at top left, rgba(56,189,248,0.28), transparent 52%), radial-gradient(circle at bottom right, rgba(37,99,235,0.22), transparent 55%), rgba(15,23,42,0.96)",
        color: "#e5e7eb",
        boxShadow: "0 30px 120px rgba(15,23,42,0.9)",
        position: "relative",
        padding: "32px 32px 28px",
        boxSizing: "border-box",

        // ★ 팝업 높이 고정, 안쪽 컨텐츠만 스크롤
        maxHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* 좌상단 뒤로가기 */}
      <button
        type="button"
        onClick={onBack}
        style={{
          position: "absolute",
          left: 24,
          top: 20,
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 10px",
          borderRadius: 999,
          border: "1px solid rgba(148,163,184,0.7)",
          backgroundColor: "rgba(15,23,42,0.9)",
          fontSize: 12,
          color: "#e5e7eb",
          cursor: "pointer",
        }}
      >
        <img
          src={unionIcon}
          alt="back"
          style={{ width: 14, height: 14, transform: "translateY(-0.5px)" }}
        />
        <span>뒤로가기</span>
      </button>

      {/* 우상단 X – 프로젝트 생성 첫 화면으로 */}
      <button
        type="button"
        onClick={onClose}
        aria-label="닫기"
        style={{
          position: "absolute",
          right: 24,
          top: 20,
          width: 30,
          height: 30,
          borderRadius: 999,
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

      {/* 상단 중앙 AI 로드맵 배지 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 16,
          marginTop: 4,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 12px",
            borderRadius: 999,
            border: "1px solid rgba(148,163,184,0.75)",
            backgroundColor: "rgba(15,23,42,0.92)",
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          <img
            src={aiFace}
            alt="AI"
            style={{
              width: 22,
              height: 22,
              borderRadius: 12,
              backgroundColor: "rgba(15,23,42,1)",
              padding: 4,
            }}
          />
          <span style={{ color: "#bae6fd", fontWeight: 600 }}>AI 로드맵</span>
        </div>
      </div>

      {/* ★ 여기부터가 스크롤 영역 */}
      <div
        style={{
          paddingInline: 8,
          paddingBottom: 4,
          flex: "1 1 auto",
          overflowY: "auto",
          paddingRight: 12, // 스크롤바가 카드 테두리 안쪽에 오게 여유 공간
        }}
      >
        {/* 히어로 / 타이틀 / 역할 버튼 */}
        <div
          style={{
            maxWidth: 768,
            margin: "0 auto 24px",
            textAlign: "center",
          }}
        >
          <img
            src={roadmapHero}
            alt=""
            style={{
              width: "100%",
              maxWidth: 640,
              height: 160,
              objectFit: "cover",
              borderRadius: 18,
              margin: "0 auto 16px",
            }}
          />
          <h1
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#f9fafb",
              marginBottom: 4,
            }}
          >
            {cached.title}
          </h1>
          <p
            style={{
              fontSize: 13,
              color: "#e5e7eb",
              marginBottom: 16,
            }}
          >
            {cached.subtitle}
          </p>

          {/* 역할 버튼 */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 10,
              marginBottom: 12,
            }}
          >
            {cached.roles.map((r) => {
              const active = r === role;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  style={{
                    minWidth: 80,
                    padding: "7px 14px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 600,
                    border: active
                      ? "none"
                      : "1px solid rgba(56,189,248,0.7)",
                    background: active
                      ? "linear-gradient(90deg,#38bdf8,#22d3ee)"
                      : "rgba(56,189,248,0.18)",
                    color: active ? "#020617" : "#e0f2fe",
                    boxShadow: active
                      ? "0 14px 40px rgba(56,189,248,0.8)"
                      : "none",
                    cursor: "pointer",
                  }}
                >
                  {r}
                </button>
              );
            })}
          </div>
        </div>

        {/* 역할별 6주 계획 */}
        <div
          style={{
            maxWidth: 768,
            margin: "8px auto 0",
            textAlign: "left",
          }}
        >
          <h3
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#e0f2fe",
              marginBottom: 8,
            }}
          >
            {role} 6주 계획
          </h3>

          {weekly.length > 0 ? (
            <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
              {weekly.map((w, i) => (
                <li
                  key={`${role}-${i}`}
                  style={{
                    marginBottom: 8,
                    padding: "10px 12px",
                    borderRadius: 12,
                    border: "1px solid rgba(30,64,175,0.7)",
                    backgroundColor: "rgba(15,23,42,0.9)",
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: "#e5e7eb",
                  }}
                >
                  <span style={{ marginRight: 4 }}>●</span>
                  <span style={{ fontWeight: 600 }}>{w.week}</span>
                  <span> : {w.description}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div
              style={{
                borderRadius: 12,
                border: "1px solid rgba(30,64,175,0.7)",
                backgroundColor: "rgba(15,23,42,0.9)",
                padding: "10px 12px",
                fontSize: 13,
                color: "#cbd5f5",
              }}
            >
              이 역할에 대한 주차 계획이 비어 있습니다.
            </div>
          )}
        </div>

        {/* 공통 체크포인트 */}
        {cached.checkpoints.length > 0 && (
          <div
            style={{
              maxWidth: 768,
              margin: "18px auto 0",
              borderRadius: 18,
              border: "1px solid rgba(30,64,175,0.7)",
              backgroundColor: "rgba(15,23,42,0.94)",
              padding: "14px 16px",
              textAlign: "left",
            }}
          >
            <h3
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#e0f2fe",
                marginBottom: 6,
              }}
            >
              공통 체크포인트
            </h3>
            <ul
              style={{
                paddingLeft: 18,
                margin: 0,
                fontSize: 13,
                color: "#e5e7eb",
              }}
            >
              {cached.checkpoints.map((c, i) => (
                <li key={`cp-${i}`} style={{ marginBottom: 3 }}>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 입력 정보 요약 */}
        {formData && (
          <p
            style={{
              maxWidth: 768,
              margin: "14px auto 0",
              fontSize: 11,
              color: "#9ca3af",
              textAlign: "left",
            }}
          >
            * 입력: {formData.input || ""} / 태그:{" "}
            {formData.tags.join(", ")}
          </p>
        )}
      </div>
    </div>
  );
};

export default RoadmapDetail;