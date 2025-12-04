// apps/frontend/src/components/TopNav.tsx
type Tab = "none" | "home" | "profile" | "assistant" | "project";

export default function TopNav({
  active,
  onHome,
  onProfile,
  onAssistant,
  onProject,
  onLogout,
}: {
  active: Tab;
  onHome: () => void;
  onProfile: () => void;
  onAssistant: () => void;
  onProject: () => void;
  onLogout: () => void;
}) {
  const pill = (tab: Exclude<Tab, "none">) => ({
    padding: "8px 14px",
    borderRadius: 999,
    border:
      "1px solid " +
      (active === tab ? "rgba(56,189,248,0.75)" : "rgba(148,163,184,0.0)"),
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    background:
      active === tab
        ? "linear-gradient(135deg,#e0f2fe,#bae6fd)"
        : "transparent",
    color: active === tab ? "#0f172a" : "#e5e7eb",
    boxShadow:
      active === tab
        ? "0 10px 30px rgba(56,189,248,0.35)"
        : "0 0 0 rgba(0,0,0,0)",
  });

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        boxSizing: "border-box",
        background:
          "linear-gradient(90deg,#020617 0%,#020617 40%,#020617 60%,#020617 100%)",
        borderBottom: "1px solid rgba(56,189,248,0.38)",
        zIndex: 20,
      }}
    >
      {/* 좌측 브랜드 */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 12,
            background:
              "radial-gradient(circle at 30% 0%,#e0f2fe,#38bdf8 60%,#0f172a)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 800,
            color: "#0f172a",
            boxShadow: "0 6px 16px rgba(15,23,42,0.55)",
          }}
        >
          AI
        </div>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#f9fafb" }}>
            AI Project Assistant
          </span>
          <span style={{ fontSize: 11, color: "#a5b4fc" }}>
            Side Project Companion
          </span>
        </div>
      </div>

      {/* 우측 탭 */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "2px 4px",
            borderRadius: 999,
            background:
              "linear-gradient(90deg,rgba(15,23,42,0.9),rgba(15,23,42,0.85))",
            border: "1px solid rgba(56,189,248,0.45)",
          }}
        >
          <button type="button" style={pill("home")} onClick={onHome}>
            Home
          </button>
          <button type="button" style={pill("profile")} onClick={onProfile}>
            Profile
          </button>
          <button type="button" style={pill("project")} onClick={onProject}>
            프로젝트 생성
          </button>
          <button type="button" style={pill("assistant")} onClick={onAssistant}>
            AI 비서
          </button>
        </div>

        <button
          type="button"
          onClick={onLogout}
          style={{
            fontSize: 13,
            color: "#e5e7eb",
            padding: "6px 12px",
            borderRadius: 999,
            border: "1px solid rgba(56,189,248,0.45)",
            background: "rgba(15,23,42,0.9)",
            cursor: "pointer",
          }}
        >
          로그아웃
        </button>
      </div>
    </header>
  );
}