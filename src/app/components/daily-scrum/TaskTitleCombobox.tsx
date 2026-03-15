import { useState, useRef, useEffect } from 'react';

// 업무 목록 mock 데이터 (추후 API 연동)
const TASK_SUGGESTIONS = [
  '사용자 인증 API 개발',
  '데이터베이스 스키마 설계',
  '프론트엔드 컴포넌트 리팩토링',
  'CI/CD 파이프라인 구축',
  'API 문서화 작업',
  '성능 최적화',
  '버그 수정 - 로그인 이슈',
  '코드 리뷰 및 리팩토링',
  '요구사항 정리',
  '디자인 시스템 구축',
];

interface TaskTitleComboboxProps {
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
}

export default function TaskTitleCombobox({ value, onChange, hasError }: TaskTitleComboboxProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 입력값으로 필터링
  const filtered = value.trim()
    ? TASK_SUGGESTIONS.filter((t) => t.toLowerCase().includes(value.toLowerCase()))
    : TASK_SUGGESTIONS;

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <input
        type="text"
        placeholder="업무 내용을 간략히 요약하세요"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        className={`w-full px-3 py-2.5 border rounded-lg text-sm ${
          hasError ? 'border-red-400' : 'border-gray-300'
        }`}
      />

      {open && filtered.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full max-h-48 overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
          {filtered.map((task) => (
            <li
              key={task}
              onClick={() => {
                onChange(task);
                setOpen(false);
              }}
              className="px-3 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
            >
              {task}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
