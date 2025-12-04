// apps/backend/services/providers/ruleBased.js
export function inferTechStack(topic) {
  const lower = (topic || '').toLowerCase();
  if (lower.includes('flutter')) return 'flutter';
  if (lower.includes('spring') || lower.includes('java')) return 'spring';
  if (lower.includes('python') || lower.includes('flask')) return 'flask';
  return 'react';
}

export function summarizeTools(stack) {
  const map = {
    react: [
      { name: 'Node.js', url: 'https://nodejs.org' },
      { name: 'Vite', url: 'https://vitejs.dev' },
      { name: 'React', url: 'https://react.dev' },
      { name: 'TailwindCSS', url: 'https://tailwindcss.com' }
    ],
    flask: [
      { name: 'Python', url: 'https://www.python.org/downloads/' },
      { name: 'Flask', url: 'https://flask.palletsprojects.com' }
    ],
    spring: [
      { name: 'Temurin JDK 17', url: 'https://adoptium.net' },
      { name: 'Spring Boot', url: 'https://spring.io/projects/spring-boot' },
      { name: 'Maven', url: 'https://maven.apache.org' }
    ],
    flutter: [
      { name: 'Flutter', url: 'https://flutter.dev/docs/get-started/install' },
      { name: 'Dart', url: 'https://dart.dev' }
    ]
  };
  return map[stack] || map.react;
}

export function recommendDeploy(stack) {
  const map = {
    react: ['프론트: Vercel/Netlify', '백엔드: Render/Railway/Fly.io 또는 EC2'],
    flask: ['Railway/Render(Flask 지원)', '데이터: SQLite → Postgres 권장'],
    spring: ['Back: Render(유료)/EC2, Front: Vercel', 'DB: RDS(Postgres)'],
    flutter: ['앱 스토어 배포 또는 Flutter Web']
  };
  return map[stack] || map.react;
}