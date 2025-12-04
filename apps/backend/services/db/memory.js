// apps/backend/services/db/memory.js
// MVP용 인메모리 저장(서버 재시작시 초기화). 배포 전 DB로 교체 권장.
export const db = {
  profile: {
    badges: { company: '', school: '', verified: false },
    specialization: 'backend',
    tools: ['Node.js', 'Express', 'PostgreSQL'],
    projects: [
      { name: 'Sample API', role: 'Backend', summary: '간단한 REST API', stack: ['Node', 'Express'] }
    ]
  }
};