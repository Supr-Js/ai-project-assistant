// apps/frontend/src/components/wizard/ProjectWizard.tsx
import React, { useState } from "react";
import MethodScreen, { type Method } from "./MethodScreen";
import AIDescribeScreen, { type DescribeFormData } from "./AIDescribeScreen";
import RoadmapDetail from "./RoadmapDetail";

type Step = "method" | "describe" | "result";

export interface ProjectWizardProps {
  open: boolean;
  onClose: () => void;
}

const ProjectWizard: React.FC<ProjectWizardProps> = ({ open, onClose }) => {
  const [step, setStep] = useState<Step>("method");
  const [describeData, setDescribeData] = useState<DescribeFormData | null>(
    null
  );

  // 위저드 완전 종료 (홈으로)
  const handleExitWizard = () => {
    setStep("method");
    setDescribeData(null);
    onClose();
  };

  // 결과 → 프로젝트 생성 첫 화면(MethodScreen)으로 리셋
  const handleResetToMethod = () => {
    setStep("method");
    setDescribeData(null);
  };

  if (!open) return null;

  const handleSelectMethod = (method: Method) => {
    if (method === "step") {
      alert("단계별 생성은 추후 제공 예정이에요.");
    } else {
      setStep("describe");
    }
  };

  const renderContent = () => {
    if (step === "method") {
      // ✅ 카드 래퍼 제거: MethodScreen 쪽 카드 스타일만 사용
      return (
        <MethodScreen
          onSelect={handleSelectMethod}
          onClose={handleExitWizard}
        />
      );
    }

    if (step === "describe") {
      return (
        <AIDescribeScreen
          initialData={describeData || undefined}
          onBack={() => setStep("method")}
          onCancel={handleExitWizard}
          onSubmit={(form) => {
            setDescribeData(form);
            setStep("result");
          }}
        />
      );
    }

    // step === "result"
    return (
      <RoadmapDetail
        formData={describeData}
        onBack={() => setStep("describe")}
        onClose={handleResetToMethod}
      />
    );
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.6)",
      }}
      onClick={handleExitWizard}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          margin: "0 16px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default ProjectWizard;