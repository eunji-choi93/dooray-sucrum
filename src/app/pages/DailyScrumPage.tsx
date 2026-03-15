import { useLocation } from 'react-router';
import type { LocationState, ScrumEntry } from '../types/scrum';
import { useScrumEntries } from '../hooks/useScrumEntries';
import { useTeam } from '../hooks/useTeam';
import ScrumEntryForm from '../components/daily-scrum/ScrumEntryForm';
import TodayEntryList from '../components/daily-scrum/TodayEntryList';
import NoTeamPlaceholder from '../components/NoTeamPlaceholder';

export default function DailyScrumPage() {
  const { hasTeam } = useTeam();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const isEditMode = state?.mode === 'edit';

  const { todayEntries, totalHoursToday, addEntry, deleteEntry } = useScrumEntries();

  const handleAdd = (data: Omit<ScrumEntry, 'id' | 'createdAt'>) => {
    addEntry(data);
  };

  if (!hasTeam) {
    return <NoTeamPlaceholder />;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* 페이지 제목 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditMode ? '데일리 슈크럼 수정' : '데일리 슈크럼 작성'}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {isEditMode ? '업무 내용을 수정하세요' : '오늘의 업무를 기록하세요'}
        </p>
      </div>

      {/* 2단 레이아웃 */}
      <div className="flex gap-6">
        {/* 좌측: 입력 폼 */}
        <div className="flex-1 min-w-0">
          <ScrumEntryForm
            onSubmit={handleAdd}
            initialData={state?.task}
            isEditMode={isEditMode}
          />
        </div>

        {/* 우측: 오늘의 목록 */}
        <div className="w-80 shrink-0">
          <TodayEntryList
            entries={todayEntries}
            totalHours={totalHoursToday}
            onDelete={deleteEntry}
          />
        </div>
      </div>
    </div>
  );
}
