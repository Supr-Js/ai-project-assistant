import React, { useState, type FormEvent } from 'react';
import { login, register } from '../lib/api';
import sideweblogo from '../assets/sideweblogo.png';

export default function LoginForm({ onDone }: { onDone: () => void }) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isLogin = mode === 'login';

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError(isLogin ? '이메일과 비밀번호를 입력해주세요.' : '회원가입을 위해 이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      if (isLogin) {
        setLoadingLogin(true);
        await login(email, password);
        onDone();
      } else {
        setLoadingRegister(true);
        await register(email, password);
        setMode('login');
        setError('회원가입이 완료되었습니다. 같은 계정으로 로그인해주세요.');
      }
    } catch {
      setError('요청 처리 중 오류가 발생했습니다.');
    } finally {
      setLoadingLogin(false);
      setLoadingRegister(false);
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg,#eaf3ff 0%, #f6fbff 100%)',
        boxSizing: 'border-box',
        padding: 16,
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          width: 420,
          maxWidth: '100%',
          background: '#fff',
          borderRadius: 24,
          boxShadow: '0 16px 40px rgba(15,23,42,.15)',
          padding: '26px 28px 24px',
        }}
      >
        {/* 로고 + 제목/부제목 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src={sideweblogo} alt="Side Project" style={{ width: 28, height: 28, borderRadius: 6, objectFit: 'contain' }} />
            <span style={{ fontWeight: 800, fontSize: 18 }}>Side Project</span>
          </div>
          <div style={{ marginTop: 4, fontSize: 12, color: '#6b7280' }}>AI Project Assistant</div>
        </div>

        {error && (
          <p style={{ color: '#dc2626', fontSize: 12, textAlign: 'center', marginBottom: 10, whiteSpace: 'pre-line' }}>
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          style={{
            width: '100%',
            boxSizing: 'border-box',
            border: '1px solid #e5e7eb',
            borderRadius: 12,
            padding: '10px 12px',
            marginBottom: 8,
            backgroundColor: '#f9fafb',
            color: '#111827',
            fontSize: 13,
          }}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            boxSizing: 'border-box',
            border: '1px solid #e5e7eb',
            borderRadius: 12,
            padding: '10px 12px',
            marginBottom: 12,
            backgroundColor: '#f9fafb',
            color: '#111827',
            fontSize: 13,
          }}
        />

        {/* 진행/전환 버튼 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <button
            type="submit"
            disabled={isLogin ? loadingLogin : loadingRegister}
            style={{
              width: '100%',
              background: '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              padding: '10px 0',
              fontWeight: 700,
              fontSize: 14,
              opacity: (isLogin && loadingLogin) || (!isLogin && loadingRegister) ? 0.7 : 1,
              cursor: 'pointer',
            }}
          >
            {isLogin ? (loadingLogin ? '로그인 중…' : '로그인') : loadingRegister ? '가입 중…' : '회원가입 완료'}
          </button>

          <button
            type="button"
            onClick={() => {
              setMode(isLogin ? 'signup' : 'login');
              setError(null);
            }}
            style={{
              width: '100%',
              background: '#f3f4f6',
              color: '#111827',
              border: '1px solid #e5e7eb',
              borderRadius: 12,
              padding: '10px 0',
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            {isLogin ? '회원가입' : '로그인으로 돌아가기'}
          </button>
        </div>
      </form>
    </div>
  );
}
