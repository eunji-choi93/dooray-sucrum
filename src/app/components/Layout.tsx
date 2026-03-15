import { useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useUserName } from '../hooks/useUserName';

export default function Layout() {
  const location = useLocation();
  const { isRegistered, setUserName } = useUserName();
  const [nameInput, setNameInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      setUserName(nameInput);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />

      <div className="relative flex flex-1 overflow-hidden">
        <div className={`flex flex-1 overflow-hidden ${!isRegistered ? 'blur-sm pointer-events-none' : ''}`}>
          <Sidebar currentPath={location.pathname} />
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>

        {!isRegistered && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm flex flex-col gap-4"
            >
              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  이름을 입력해주세요
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  시작하려면 이름을 입력해주세요.
                </p>
                <p className="mt-2 text-xs text-gray-400">
                  [프로토타입] 실서비스에서는 Dooray API Token을 입력받아 인증 처리합니다.
                </p>
              </div>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="이름"
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <button
                type="submit"
                disabled={!nameInput.trim()}
                className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                확인
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
