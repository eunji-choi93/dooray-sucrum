import { Badge } from '@/app/components/ui/badge';
import type { ScrumEntry } from '../../types/scrum';

interface EntryCardProps {
  entry: ScrumEntry;
  onDelete: (id: string) => void;
}

export default function EntryCard({ entry, onDelete }: EntryCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-2">
      {/* 상단: 투입시간 뱃지 */}
      <div className="flex items-center justify-end">
        <Badge variant="outline" className="border-orange-300 bg-orange-50 text-orange-700 text-xs">
          {entry.hours}h
        </Badge>
      </div>

      {/* 업무 제목 */}
      <p className="text-sm font-medium text-gray-900 leading-snug">{entry.title}</p>

      {/* 태그 */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-xs text-gray-500">#{entry.weeklyTag}</span>
        {entry.monthlyTag && (
          <span className="text-xs text-gray-500">#{entry.monthlyTag}</span>
        )}
      </div>

      {/* 삭제 버튼 */}
      <div className="flex justify-end pt-1">
        <button
          type="button"
          onClick={() => onDelete(entry.id)}
          className="text-xs text-gray-400 hover:text-red-500 transition-colors"
        >
          삭제
        </button>
      </div>
    </div>
  );
}
