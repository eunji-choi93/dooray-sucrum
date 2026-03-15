import { useState } from 'react';
import type { ScrumFormData, EditTask } from '../../types/scrum';
import WeeklyTagSelector from './WeeklyTagSelector';
import TaskTitleCombobox from './TaskTitleCombobox';

const WEEKLY_TAGS = ['개발', '버그 수정', '회의', '기획', '디자인', '코드 리뷰', '배포', '문서화'];

const MONTHLY_TAG_OPTIONS = [
  { value: 'ESM 프로젝트', label: 'ESM 프로젝트' },
  { value: '내부 업무', label: '내부 업무' },
  { value: '유지보수', label: '유지보수' },
  { value: '기술 조사', label: '기술 조사' },
];

const INITIAL_FORM: ScrumFormData = {
  title: '',
  hours: '',
  weeklyTag: '',
  monthlyTag: MONTHLY_TAG_OPTIONS[0].value,
  todayWork: '',
  tomorrowWork: '',
  achievement: '',
  status: 'in_progress',
};

interface ScrumEntryFormProps {
  onSubmit: (data: Omit<import('../../types/scrum').ScrumEntry, 'id' | 'createdAt'>) => void;
  initialData?: EditTask;
  isEditMode?: boolean;
}

export default function ScrumEntryForm({ onSubmit, initialData, isEditMode }: ScrumEntryFormProps) {
  const [form, setForm] = useState<ScrumFormData>(() => {
    if (initialData) {
      return {
        title: initialData.title,
        hours: String(initialData.hours),
        weeklyTag: initialData.weeklyTag,
        monthlyTag: initialData.monthlyTag,
        todayWork: initialData.todayWork,
        tomorrowWork: initialData.tomorrowWork,
        achievement: initialData.achievement,
        status: initialData.status,
      };
    }
    return INITIAL_FORM;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [monthlyTagLocked] = useState(true);

  const updateField = <K extends keyof ScrumFormData>(key: K, value: ScrumFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.title.trim()) newErrors.title = '업무 제목을 입력하세요';
    if (!form.hours) {
      newErrors.hours = '투입시간을 선택하세요';
    }
    if (!form.weeklyTag) newErrors.weeklyTag = '주간 태그를 선택하세요';
    if (!form.todayWork.trim()) newErrors.todayWork = '오늘 한 일을 입력하세요';
    if (!form.tomorrowWork.trim()) newErrors.tomorrowWork = '내일 할 일을 입력하세요';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSubmit({
      title: form.title,
      hours: parseInt(form.hours, 10),
      weeklyTag: form.weeklyTag,
      monthlyTag: form.monthlyTag,
      todayWork: form.todayWork,
      tomorrowWork: form.tomorrowWork,
      achievement: form.achievement,
      status: form.status,
    });

    if (!isEditMode) {
      setForm(INITIAL_FORM);
    }
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setErrors({});
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-5">
      {/* 업무 제목 (콤보박스) */}
      <div>
        <label className="block text-sm font-bold text-gray-900 mb-1">
          업무 제목 <span className="text-red-500">*</span>
        </label>
        <TaskTitleCombobox
          value={form.title}
          onChange={(v) => updateField('title', v)}
          hasError={!!errors.title}
        />
        {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
      </div>

      {/* 투입시간 */}
      <div>
        <label className="block text-sm font-bold text-gray-900 mb-1">
          투입시간 <span className="text-red-500">*</span>
        </label>
        <select
          value={form.hours}
          onChange={(e) => updateField('hours', e.target.value)}
          className={`w-full px-3 py-2.5 border rounded-lg text-sm ${
            errors.hours ? 'border-red-400' : 'border-gray-300'
          }`}
        >
          <option value="">선택</option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
            <option key={h} value={String(h)}>
              {h}시간
            </option>
          ))}
        </select>
        {errors.hours && <p className="text-xs text-red-500 mt-1">{errors.hours}</p>}
      </div>

      {/* 주간 태그 + 월간 태그 */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-1">
            주간 태그 <span className="text-red-500">*</span>
          </label>
          <WeeklyTagSelector
            tags={WEEKLY_TAGS}
            selected={form.weeklyTag}
            onChange={(tag) => updateField('weeklyTag', tag)}
          />
          {errors.weeklyTag && <p className="text-xs text-red-500 mt-1">{errors.weeklyTag}</p>}
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-1">월간 태그</label>
          <select
            value={form.monthlyTag}
            onChange={(e) => updateField('monthlyTag', e.target.value)}
            disabled={monthlyTagLocked}
            className={`w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm ${
              monthlyTagLocked ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''
            }`}
          >
            <option value="">선택</option>
            {MONTHLY_TAG_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 오늘 한 일 */}
      <div>
        <label className="block text-sm font-bold text-gray-900 mb-1">
          오늘 한 일 <span className="text-red-500">*</span>
        </label>
        <textarea
          placeholder="오늘 한 일을 입력하세요"
          rows={3}
          value={form.todayWork}
          onChange={(e) => updateField('todayWork', e.target.value)}
          className={`w-full px-3 py-2.5 border rounded-lg text-sm resize-none ${
            errors.todayWork ? 'border-red-400' : 'border-gray-300'
          }`}
        />
        {errors.todayWork && <p className="text-xs text-red-500 mt-1">{errors.todayWork}</p>}
      </div>

      {/* 내일 할 일 */}
      <div>
        <label className="block text-sm font-bold text-gray-900 mb-1">
          내일 할 일 <span className="text-red-500">*</span>
        </label>
        <textarea
          placeholder="내일 할 일을 입력하세요"
          rows={3}
          value={form.tomorrowWork}
          onChange={(e) => updateField('tomorrowWork', e.target.value)}
          className={`w-full px-3 py-2.5 border rounded-lg text-sm resize-none ${
            errors.tomorrowWork ? 'border-red-400' : 'border-gray-300'
          }`}
        />
        {errors.tomorrowWork && <p className="text-xs text-red-500 mt-1">{errors.tomorrowWork}</p>}
      </div>

      {/* 어필할 성과 */}
      <div>
        <label className="block text-sm font-bold text-gray-900 mb-1">어필할 성과</label>
        <textarea
          placeholder="어필하고 싶은 성과가 있다면 입력하세요"
          rows={3}
          value={form.achievement}
          onChange={(e) => updateField('achievement', e.target.value)}
          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm resize-none"
        />
      </div>

      {/* 하단 버튼 */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2.5 text-sm text-gray-700 hover:text-gray-900 transition-colors"
        >
          취소
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="px-6 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
        >
          {isEditMode ? '수정' : '저장'}
        </button>
      </div>
    </div>
  );
}
