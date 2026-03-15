import { useState, useCallback } from 'react';

const STORAGE_KEY = 'user-name';

function loadUserName(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? '';
  } catch {
    return '';
  }
}

export function useUserName() {
  const [userName, setUserNameState] = useState<string>(loadUserName);

  const setUserName = useCallback((name: string) => {
    const trimmed = name.trim();
    localStorage.setItem(STORAGE_KEY, trimmed);
    setUserNameState(trimmed);
  }, []);

  const isRegistered = userName.length > 0;

  return { userName, setUserName, isRegistered };
}
