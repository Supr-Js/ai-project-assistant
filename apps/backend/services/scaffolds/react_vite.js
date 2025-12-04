// apps/backend/services/scaffolds/react_vite.js
export function reactViteScaffold(projectName = 'my-react-app') {
  return {
    [`${projectName}/index.html`]: `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,
    [`${projectName}/src/main.tsx`]: `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
ReactDOM.createRoot(document.getElementById('root')!).render(<App />)`,
    [`${projectName}/src/App.tsx`]: `export default function App(){ return <h1 className="text-2xl">Hello, ${projectName}</h1> }`,
    [`${projectName}/src/index.css`]: `@tailwind base;@tailwind components;@tailwind utilities;`,
    [`${projectName}/package.json`]: `{"name":"${projectName}","private":true,"scripts":{"dev":"vite","build":"vite build","preview":"vite preview"}}`
  };
}
