import { useSyncExternalStore, useCallback } from 'react';

const STORAGE_KEY = 'team-data';

interface TeamData {
  name: string;
  members: string[];
}

// 모든 useTeam 인스턴스 간 동기화를 위한 리스너
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

function getSnapshot(): string | null {
  return localStorage.getItem(STORAGE_KEY);
}

function parseTeamData(raw: string | null): TeamData | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as TeamData;
  } catch {
    return null;
  }
}

export function useTeam() {
  const raw = useSyncExternalStore(subscribe, getSnapshot);
  const teamData = parseTeamData(raw);

  const setTeamData = useCallback((data: TeamData | null) => {
    if (data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
    listeners.forEach((l) => l());
  }, []);

  const hasTeam = teamData !== null;

  return { hasTeam, teamData, setTeamData };
}
