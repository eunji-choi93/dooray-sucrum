import { useState, useMemo, useCallback } from 'react';
import { format } from 'date-fns';
import type { ScrumEntry } from '../types/scrum';

const STORAGE_KEY = 'scrum-entries';

// 초기 mock 데이터
const MOCK_ENTRIES: ScrumEntry[] = [
  {
    id: 'mock-1',
    title: '사용자 인증 API 개발',
    hours: 4,
    weeklyTag: '개발',
    monthlyTag: 'ESM 프로젝트',
    todayWork: 'JWT 기반 인증 로직 구현 완료',
    tomorrowWork: '토큰 갱신 로직 구현 예정',
    achievement: '인증 모듈 설계 및 구현 완료',
    status: 'in_progress',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'mock-2',
    title: '데이터베이스 스키마 설계',
    hours: 2,
    weeklyTag: '개발',
    monthlyTag: 'ESM 프로젝트',
    todayWork: 'ERD 작성 및 테이블 구조 정의',
    tomorrowWork: '인덱스 최적화 작업 예정',
    achievement: '',
    status: 'completed',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'mock-3',
    title: '요구사항 정리',
    hours: 2,
    weeklyTag: '기획',
    monthlyTag: '내부 업무',
    todayWork: '사용자 스토리 작성 및 검토',
    tomorrowWork: '우선순위 정리 및 백로그 등록',
    achievement: '',
    status: 'in_progress',
    createdAt: new Date().toISOString(),
  },
];

function loadEntries(): ScrumEntry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as ScrumEntry[];
    }
  } catch {
    // 파싱 실패 시 mock 데이터 사용
  }
  // 최초 로딩 시 mock 데이터 저장
  localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_ENTRIES));
  return MOCK_ENTRIES;
}

function saveEntries(entries: ScrumEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function useScrumEntries() {
  const [entries, setEntries] = useState<ScrumEntry[]>(loadEntries);

  const today = format(new Date(), 'yyyy-MM-dd');

  // 오늘 등록된 엔트리만 필터
  const todayEntries = useMemo(
    () => entries.filter((e) => e.createdAt.startsWith(today)),
    [entries, today],
  );

  // 오늘 총 투입시간
  const totalHoursToday = useMemo(
    () => todayEntries.reduce((sum, e) => sum + e.hours, 0),
    [todayEntries],
  );

  const addEntry = useCallback((entry: Omit<ScrumEntry, 'id' | 'createdAt'>) => {
    const newEntry: ScrumEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setEntries((prev) => {
      const next = [...prev, newEntry];
      saveEntries(next);
      return next;
    });
  }, []);

  const updateEntry = useCallback((id: string, updates: Partial<ScrumEntry>) => {
    setEntries((prev) => {
      const next = prev.map((e) => (e.id === id ? { ...e, ...updates } : e));
      saveEntries(next);
      return next;
    });
  }, []);

  const deleteEntry = useCallback((id: string) => {
    setEntries((prev) => {
      const next = prev.filter((e) => e.id !== id);
      saveEntries(next);
      return next;
    });
  }, []);

  return {
    entries,
    todayEntries,
    totalHoursToday,
    addEntry,
    updateEntry,
    deleteEntry,
  };
}
