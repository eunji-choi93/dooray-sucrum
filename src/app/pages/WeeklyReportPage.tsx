import { Trash2, Sparkles, Download, Pencil, Check, X, Info } from 'lucide-react';
import { useState, useMemo } from 'react';

// 설정된 주간보고 시작 요일에 해당하는 날짜 목록 생성
function getStartDates(dayOfWeek: number, count: number): string[] {
  const dates: string[] = [];
  const today = new Date();
  // 가장 최근 해당 요일 찾기
  const diff = (today.getDay() - dayOfWeek + 7) % 7;
  const latest = new Date(today);
  latest.setDate(today.getDate() - diff);

  for (let i = 0; i < count; i++) {
    const d = new Date(latest);
    d.setDate(latest.getDate() - i * 7);
    dates.push(d.toISOString().split('T')[0]);
  }
  return dates;
}

function formatDateWithDay(dateStr: string): string {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const d = new Date(dateStr);
  return `${dateStr} (${days[d.getDay()]})`;
}

function getEndDate(startDate: string): string {
  const d = new Date(startDate);
  d.setDate(d.getDate() + 6);
  return d.toISOString().split('T')[0];
}

const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];

type PopupType = 'ai' | 'import' | null;

export default function WeeklyReportPage() {
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [popup, setPopup] = useState<PopupType>(null);
  const [selectedStart, setSelectedStart] = useState('');

  // Mock: 팀 설정 - 주간보고 시작 요일 (0=일, 1=월, ..., 6=토)
  const teamName = 'FE파트';
  const weeklyStartDay = 1; // 월요일

  const startDates = useMemo(() => getStartDates(weeklyStartDay, 12), [weeklyStartDay]);

  const handleEdit = (key: string, currentValue: string) => {
    setEditingCell(key);
    setEditValue(currentValue);
  };

  const handleSave = () => {
    setEditingCell(null);
    setEditValue('');
  };

  const handleCancel = () => {
    setEditingCell(null);
    setEditValue('');
  };

  const openPopup = (type: PopupType) => {
    setSelectedStart(startDates[0]);
    setPopup(type);
  };

  return (
    <div className="p-6">
      {/* AI 주간 보고 자동 생성 배너 */}
      <div className="mb-6 flex items-center justify-between rounded-lg border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-5">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
            <Sparkles className="h-5 w-5 text-blue-600" />
            AI 주간 보고 자동 생성
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            AI로 이번주에 했던 업무 보고를 생성해보세요
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => openPopup('ai')}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
          >
            <Sparkles className="h-4 w-4" />
            업무내용 AI로 생성하기
          </button>
          <button
            onClick={() => openPopup('import')}
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Download className="h-4 w-4" />
            작성한 업무내용만 가져오기
          </button>
        </div>
      </div>

      {/* 작성된 주간 보고 섹션 헤더 */}
      <div className="mb-4 flex items-center gap-2">
        <h2 className="text-lg font-bold text-gray-900">작성된 주간 보고</h2>
        <div className="group relative">
          <Info className="h-4 w-4 cursor-help text-gray-400" />
          <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-80 -translate-x-1/2 rounded-lg bg-gray-900 px-4 py-3 text-xs leading-relaxed text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
            <p>※ 월간 보고 생성 타겟에 해당하는 주차들에 중복 업무가 발생할 시 업무별 AI 요약을 합쳐서 다시 AI 재요약됩니다. 월간 업무 AI 요약 수정이 필요하면 주간 AI 요약 내용을 수정해 주세요.</p>
            <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-gray-900" />
          </div>
        </div>
      </div>

      {/* Weekly Report Card */}
      <div className="mb-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900">2026-03-10 (월) ~ 2026-03-16 (일)</h2>
            <p className="text-sm text-gray-500 mt-0.5">총 투입시간: 40시간</p>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded">
            <Trash2 className="w-4 h-4" />
            <span>삭제</span>
          </button>
        </div>

        <table className="w-full">
          <thead className="bg-gray-200 border-b border-gray-300">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">월간 태그</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">업무명</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">투입률</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">업무 내용</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-blue-50">
              <td colSpan={4} className="px-4 py-2 font-medium text-gray-900">
                ESM 프로젝트 (35시간 / 87.5%)
              </td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3">
                <a href="#" className="text-blue-600 hover:underline">백엔드 API 개발</a>
              </td>
              <td className="px-4 py-3">20시간 (50%)</td>
              <td className="px-4 py-3 text-sm text-gray-700">
                {editingCell === '0-0' ? (
                  <div className="flex flex-col gap-2">
                    <textarea className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" rows={4} value={editValue} onChange={(e) => setEditValue(e.target.value)} />
                    <div className="flex gap-2">
                      <button onClick={handleSave} className="flex items-center gap-1 rounded bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700"><Check className="h-3 w-3" />저장</button>
                      <button onClick={handleCancel} className="flex items-center gap-1 rounded border border-gray-300 px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50"><X className="h-3 w-3" />취소</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2">
                    <span className="flex-1 whitespace-pre-line">{'• 사용자 인증 API 개발 완료\n• 데이터베이스 연동\n• 단위 테스트 작성'}</span>
                    <button onClick={() => handleEdit('0-0', '• 사용자 인증 API 개발 완료\n• 데이터베이스 연동\n• 단위 테스트 작성')} className="shrink-0 rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"><Pencil className="h-3.5 w-3.5" /></button>
                  </div>
                )}
              </td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3">
                <a href="#" className="text-blue-600 hover:underline">프론트엔드 UI 개발</a>
              </td>
              <td className="px-4 py-3">15시간 (37.5%)</td>
              <td className="px-4 py-3 text-sm text-gray-700">
                {editingCell === '0-1' ? (
                  <div className="flex flex-col gap-2">
                    <textarea className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" rows={4} value={editValue} onChange={(e) => setEditValue(e.target.value)} />
                    <div className="flex gap-2">
                      <button onClick={handleSave} className="flex items-center gap-1 rounded bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700"><Check className="h-3 w-3" />저장</button>
                      <button onClick={handleCancel} className="flex items-center gap-1 rounded border border-gray-300 px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50"><X className="h-3 w-3" />취소</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2">
                    <span className="flex-1 whitespace-pre-line">{'• 로그인 화면 구현\n• 대시보드 레이아웃 작업'}</span>
                    <button onClick={() => handleEdit('0-1', '• 로그인 화면 구현\n• 대시보드 레이아웃 작업')} className="shrink-0 rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"><Pencil className="h-3.5 w-3.5" /></button>
                  </div>
                )}
              </td>
            </tr>

            <tr className="bg-green-50">
              <td colSpan={4} className="px-4 py-2 font-medium text-gray-900">
                내부 업무 (5시간 / 12.5%)
              </td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3">팀 회의 및 기획</td>
              <td className="px-4 py-3">5시간 (12.5%)</td>
              <td className="px-4 py-3 text-sm text-gray-700">
                {editingCell === '0-2' ? (
                  <div className="flex flex-col gap-2">
                    <textarea className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" rows={4} value={editValue} onChange={(e) => setEditValue(e.target.value)} />
                    <div className="flex gap-2">
                      <button onClick={handleSave} className="flex items-center gap-1 rounded bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700"><Check className="h-3 w-3" />저장</button>
                      <button onClick={handleCancel} className="flex items-center gap-1 rounded border border-gray-300 px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50"><X className="h-3 w-3" />취소</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2">
                    <span className="flex-1">주간 스프린트 회의 참석 및 요구사항 정리</span>
                    <button onClick={() => handleEdit('0-2', '주간 스프린트 회의 참석 및 요구사항 정리')} className="shrink-0 rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"><Pencil className="h-3.5 w-3.5" /></button>
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Another Weekly Report */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900">2026-03-03 (월) ~ 2026-03-09 (일)</h2>
            <p className="text-sm text-gray-500 mt-0.5">총 투입시간: 38시간</p>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded">
            <Trash2 className="w-4 h-4" />
            <span>삭제</span>
          </button>
        </div>

        <table className="w-full">
          <thead className="bg-gray-200 border-b border-gray-300">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">월간 태그</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">업무명</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">투입률</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">업무 내용</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-blue-50">
              <td colSpan={4} className="px-4 py-2 font-medium text-gray-900">
                ESM 프로젝트 (38시간 / 100%)
              </td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3">초기 설계 및 환경 구축</td>
              <td className="px-4 py-3">38시간 (100%)</td>
              <td className="px-4 py-3 text-sm text-gray-700">
                {editingCell === '1-0' ? (
                  <div className="flex flex-col gap-2">
                    <textarea className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" rows={4} value={editValue} onChange={(e) => setEditValue(e.target.value)} />
                    <div className="flex gap-2">
                      <button onClick={handleSave} className="flex items-center gap-1 rounded bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700"><Check className="h-3 w-3" />저장</button>
                      <button onClick={handleCancel} className="flex items-center gap-1 rounded border border-gray-300 px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50"><X className="h-3 w-3" />취소</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2">
                    <span className="flex-1">프로젝트 초기 설정 및 개발 환경 구축</span>
                    <button onClick={() => handleEdit('1-0', '프로젝트 초기 설정 및 개발 환경 구축')} className="shrink-0 rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"><Pencil className="h-3.5 w-3.5" /></button>
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 주간 보고 생성 팝업 */}
      {popup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setPopup(null)}>
          <div className="w-full max-w-md rounded-lg bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
            {/* 팝업 헤더 */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h3 className="text-base font-semibold text-gray-900">
                {popup === 'ai' ? '업무내용 AI로 생성하기' : '작성한 업무내용만 가져오기'}
              </h3>
              <button onClick={() => setPopup(null)} className="rounded p-1 hover:bg-gray-100">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* 팝업 내용 */}
            <div className="space-y-5 px-6 py-5">
              <p className="text-sm text-gray-700">
                현재 <span className="font-semibold text-gray-900">{teamName}</span>의 주간보고 시작 요일은 <span className="font-semibold text-blue-600">{DAY_NAMES[weeklyStartDay]}요일</span>입니다.
              </p>

              {/* 시작일 선택 */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-900">시작일 선택</label>
                <select
                  value={selectedStart}
                  onChange={(e) => setSelectedStart(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {startDates.map((date) => (
                    <option key={date} value={date}>
                      {formatDateWithDay(date)}
                    </option>
                  ))}
                </select>
              </div>

              {/* 기간 표시 */}
              {selectedStart && (
                <div className="rounded-lg bg-gray-50 px-4 py-3">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-900">{formatDateWithDay(selectedStart)}</span>
                    <span className="mx-2 text-gray-400">&rarr;</span>
                    <span className="font-medium text-gray-900">{formatDateWithDay(getEndDate(selectedStart))}</span>
                  </p>
                </div>
              )}
            </div>

            {/* 팝업 하단 버튼 */}
            <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
              <button onClick={() => setPopup(null)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                취소
              </button>
              <button
                onClick={() => setPopup(null)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white ${
                  popup === 'ai' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {popup === 'ai' && <Sparkles className="h-4 w-4" />}
                {popup === 'ai' ? '생성하기' : '가져오기'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
