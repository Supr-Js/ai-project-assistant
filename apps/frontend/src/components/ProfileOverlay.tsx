interface ProfileOverlayProps {
  open: boolean;
  onClose: () => void;
}

export default function ProfileOverlay({ open, onClose }: ProfileOverlayProps) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.6)",
      }}
      onClick={onClose}
    >
      {/* 가운데 카드 */}
      <div
        style={{
          minWidth: "320px",
          maxWidth: "640px",
          margin: "0 16px",
          padding: "24px 28px",
          borderRadius: "24px",
          background: "rgba(15,23,42,0.96)",
          color: "#e5e7eb",
          boxShadow: "0 30px 120px rgba(0,0,0,0.85)",
        }}
        onClick={(e) => e.stopPropagation()} // 배경 클릭만 닫히게
      >
        <h2
          style={{
            margin: 0,
            marginBottom: "12px",
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          내 정보 (준비 중)
        </h2>

        <p
          style={{
            fontSize: "14px",
            lineHeight: 1.6,
            color: "#cbd5f5",
            marginBottom: "12px",
          }}
        >
          현재 데모 버전에서는 이메일 기반의 간단한 로그인만 사용하고 있습니다.
          앞으로는 직장/학교, 보유 스택, 진행한 프로젝트 이력 등을 바탕으로 더
          정교한 개인화 추천을 제공할 예정이에요.
        </p>

        <div
          style={{
            fontSize: "13px",
            lineHeight: 1.6,
            borderRadius: "16px",
            padding: "12px 14px",
            border: "1px solid rgba(255,255,255,0.15)",
            backgroundColor: "rgba(15,23,42,0.9)",
            color: "#e5e7eb",
          }}
        >
          지금 로그인 상태로 <b>AI Project Assistant</b>를 자유롭게 사용하면서
          프로젝트 아이디어를 <b>빠르게</b> 구체화해 볼 수 있습니다.
        </div>

        <div
          style={{
            marginTop: "16px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              borderRadius: "999px",
              border: "1px solid rgba(56,189,248,0.6)",
              padding: "8px 20px",
              fontSize: "13px",
              fontWeight: 500,
              backgroundColor: "rgba(56,189,248,0.25)",
              color: "#e0f2fe",
              cursor: "pointer",
            }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}