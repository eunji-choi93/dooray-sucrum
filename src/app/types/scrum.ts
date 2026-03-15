// 슈크럼 엔트리 상태
export type ScrumEntryStatus = 'in_progress' | 'completed';

// 저장된 슈크럼 엔트리
export interface ScrumEntry {
  id: string;
  title: string;
  hours: number;
  weeklyTag: string;
  monthlyTag: string;
  todayWork: string;
  tomorrowWork: string;
  achievement: string;
  status: ScrumEntryStatus;
  createdAt: string; // ISO 날짜 문자열
}

// 폼 입력 데이터
export interface ScrumFormData {
  title: string;
  hours: string; // 입력 시 string, 제출 시 parseFloat
  weeklyTag: string;
  monthlyTag: string;
  todayWork: string;
  tomorrowWork: string;
  achievement: string;
  status: ScrumEntryStatus;
}

// DailyReportPage에서 수정 시 전달하는 타입
export interface EditTask {
  title: string;
  hours: number;
  weeklyTag: string;
  monthlyTag: string;
  todayWork: string;
  tomorrowWork: string;
  achievement: string;
  status: ScrumEntryStatus;
}

// 라우터 location state
export interface LocationState {
  mode?: 'edit';
  task?: EditTask;
}
