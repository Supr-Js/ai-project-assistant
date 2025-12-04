// apps/frontend/src/pages/Home.tsx
import React, { useState } from "react";
import TopNav from "../components/TopNav";
import RolePopup from "../components/RolePopup";
import LoginForm from "../components/LoginForm";
import ProjectWizard from "../components/wizard/ProjectWizard";
import ProfileOverlay from "../components/ProfileOverlay";
import aiFace from "../assets/icons/ai-face.svg";

type Tab = "home" | "profile" | "assistant" | "project";

export default function Home({
  authed,
  onAuthed,
}: {
  authed: boolean;
  onAuthed: () => void;
}) {
  const [active, setActive] = useState<Tab>("home");

  // AI 비서 역할 선택 팝업
  const [assistantPopupOpen, setAssistantPopupOpen] = useState(false);

  // 프로젝트 생성 위저드 모달
  const [projectWizardOpen, setProjectWizardOpen] = useState(false);

  // 프로필 중앙 팝업
  const [profileOverlayOpen, setProfileOverlayOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  if (!authed) return <LoginForm onDone={onAuthed} />;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <TopNav
        active={active}
        onHome={() => {
          setActive("home");
          setAssistantPopupOpen(false);
          setProjectWizardOpen(false);
          setProfileOverlayOpen(false);
        }}
        onProfile={() => {
          setActive("profile");
          setAssistantPopupOpen(false);
          setProjectWizardOpen(false);
          setProfileOverlayOpen(true);
        }}
        onProject={() => {
          setActive("project");
          setAssistantPopupOpen(false);
          setProjectWizardOpen(true);
          setProfileOverlayOpen(false);
        }}
        onAssistant={() => {
          setActive("assistant");
          setAssistantPopupOpen(true); // 역할 선택 팝업 ON
          setProjectWizardOpen(false);
          setProfileOverlayOpen(false);
        }}
        onLogout={handleLogout}
      />

      {/* 메인 컨텐츠 영역 (배경용) */}
      <main className="mx-auto flex max-w-6xl flex-col items-center px-6 pb-20 pt-24">
        {/* HOME 화면 – 중앙 카드 오버레이 */}
        {active === "home" && !assistantPopupOpen && !projectWizardOpen && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                pointerEvents: "auto",
                minWidth: "320px",
                maxWidth: "760px",
                margin: "0 16px",
                padding: "28px 32px",
                borderRadius: "28px",
                background:
                  "radial-gradient(circle at top left, rgba(56,189,248,0.25), transparent 55%), radial-gradient(circle at bottom right, rgba(129,140,248,0.18), transparent 55%), rgba(15,23,42,0.96)",
                border: "1px solid rgba(148, 163, 184, 0.45)",
                boxShadow: "0 30px 120px rgba(15,23,42,0.9)",
                color: "#e5e7eb",
              }}
            >
              {/* 상단 작은 배지 */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "4px 10px",
                  borderRadius: "999px",
                  border: "1px solid rgba(148,163,184,0.5)",
                  backgroundColor: "rgba(15,23,42,0.9)",
                  fontSize: 11,
                  marginBottom: 12,
                  color: "#cbd5f5",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 8,
                    height: 8,
                    borderRadius: "999px",
                    backgroundColor: "#22c55e",
                  }}
                />
                프로젝트 준비를 AI와 함께 빠르게 시작해 보세요
              </div>

              {/* 제목 + 아이콘 */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 8,
                }}
              >
                <img
                  src={aiFace}
                  alt="AI"
                  style={{ width: 28, height: 28 }}
                />
                <h1
                  style={{
                    margin: 0,
                    fontSize: 28,
                    fontWeight: 700,
                    color: "#ffffff",
                  }}
                >
                  환영합니다!
                </h1>
              </div>

              {/* 설명 문구 */}
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: "#cbd5f5",
                }}
              >
                상단의 <b>프로젝트 생성</b> 버튼을 눌러 6주 로드맵과 역할별 진행
                방법을 받아보거나,
                <br />
                <b>AI 비서</b>를 통해 개발 스택 · 파일 구조 · 배포 방법까지 한 번에
                안내받을 수 있습니다.
              </p>
            </div>
          </div>
        )}

        {/* profile 탭에서는 본문 비움 (팝업만 사용) */}
        {active === "profile" && (
          <section className="sr-only" aria-hidden="true" />
        )}

        {/* assistant 탭도 본문은 비워두고 RolePopup(중앙 팝업)만 사용 */}
        {active === "assistant" && (
          <section className="sr-only" aria-hidden="true" />
        )}

        {/* 프로젝트 생성 탭 – 안내 문구 (위저드 닫혀있을 때만) */}
        {active === "project" && !projectWizardOpen && (
          <section className="mt-10 w-full max-w-2xl text-center">
            <p className="text-sm text-slate-300">
              상단의 <b>프로젝트 생성</b> 버튼을 다시 눌러 프로젝트 생성 마법사를 열 수
              있습니다.
            </p>
          </section>
        )}
      </main>

      {/* AI 비서 역할 선택 팝업 */}
      <RolePopup
        open={assistantPopupOpen}
        onClose={() => {
          setAssistantPopupOpen(false);
          setActive("home");
        }}
      />

      {/* 프로젝트 생성 Wizard 모달 */}
      <ProjectWizard
        open={projectWizardOpen}
        onClose={() => {
          setProjectWizardOpen(false);
          setActive("home");
        }}
      />

      {/* 프로필 중앙 팝업 */}
      <ProfileOverlay
        open={profileOverlayOpen}
        onClose={() => {
          setProfileOverlayOpen(false);
          setActive("home");
        }}
      />
    </div>
  );
}