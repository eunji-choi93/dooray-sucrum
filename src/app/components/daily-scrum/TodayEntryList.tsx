import { useMemo } from 'react';
import { Badge } from '@/app/components/ui/badge';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import type { ScrumEntry } from '../../types/scrum';
import EntryCard from './EntryCard';

interface TodayEntryListProps {
  entries: ScrumEntry[];
  totalHours: number;
  onDelete: (id: string) => void;
}

export default function TodayEntryList({
  entries,
  totalHours,
  onDelete,
}: TodayEntryListProps) {
  // 월간 태그 기준으로 그룹화
  const groupedByMonthlyTag = useMemo(() => {
    const groups = new Map<string, ScrumEntry[]>();
    for (const entry of entries) {
      const key = entry.monthlyTag || '미분류';
      const list = groups.get(key) ?? [];
      list.push(entry);
      groups.set(key, list);
    }
    return groups;
  }, [entries]);

  return (
    <div className="rounded-lg border border-gray-200 bg-white flex flex-col h-fit">
      {/* 헤더 */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-gray-900">오늘의 목록</h2>
          <Badge variant="secondary" className="text-xs">
            {entries.length}건
          </Badge>
        </div>
      </div>

      {/* 엔트리 목록 (월간 태그별 그룹) */}
      <ScrollArea className="flex-1 max-h-[calc(100vh-320px)]">
        <div className="p-3 space-y-4">
          {entries.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">
              아직 등록된 업무가 없습니다
            </p>
          ) : (
            [...groupedByMonthlyTag.entries()].map(([tag, groupEntries]) => (
              <div key={tag}>
                <p className="text-xs font-semibold text-gray-500 mb-2 px-1">{tag}</p>
                <div className="space-y-3">
                  {groupEntries.map((entry) => (
                    <EntryCard
                      key={entry.id}
                      entry={entry}
                      onDelete={onDelete}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      {/* 하단 요약 */}
      <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">총 투입시간</span>
          <span className="text-sm font-bold text-orange-600">{totalHours}시간</span>
        </div>
      </div>
    </div>
  );
}
