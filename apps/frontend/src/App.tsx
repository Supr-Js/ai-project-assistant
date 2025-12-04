// apps/frontend/src/App.tsx
import { useState } from 'react';
import Home from './pages/Home';

export default function App() {
  const [authed, setAuthed] = useState<boolean>(!!localStorage.getItem('token'));

  return (
    <Home
      authed={authed}
      onAuthed={() => setAuthed(true)}
    />
  );
}
