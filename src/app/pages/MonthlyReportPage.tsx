import { Trash2, Sparkles, Pencil, Check, X, Copy, ClipboardList, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function MonthlyReportPage() {
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedMonth, setSelectedMonth] = useState(3);
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [showGrmPopup, setShowGrmPopup] = useState(false);
  const [editingPerformance, setEditingPerformance] = useState<string | null>(null);
  const [performanceEditValue, setPerformanceEditValue] = useState('');

  const handlePrevMonth = () => {
    if (selectedMonth === 1) {
      setSelectedYear(selectedYear - 1);
      setSelectedMonth(12);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 12) {
      setSelectedYear(selectedYear + 1);
      setSelectedMonth(1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  // 현재 월 이후로는 이동 불가
  const isCurrentOrFuture = selectedYear > 2026 || (selectedYear === 2026 && selectedMonth >= 3);

  // 선택된 월에 보고가 있는지 (mock: 2026년 2월, 3월만 있음)
  const hasReport = (selectedYear === 2026 && selectedMonth === 3) || (selectedYear === 2026 && selectedMonth === 2);

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

  const handlePerformanceEdit = (key: string, currentValue: string) => {
    setEditingPerformance(key);
    setPerformanceEditValue(currentValue);
  };

  const handlePerformanceSave = () => {
    setEditingPerformance(null);
    setPerformanceEditValue('');
  };

  const handlePerformanceCancel = () => {
    setEditingPerformance(null);
    setPerformanceEditValue('');
  };

  const handleCopyGrm = () => {
    const grmText = document.getElementById('grm-content')?.textContent || '';
    navigator.clipboard.writeText(grmText);
    setShowGrmPopup(false);
  };

  const grmContent = `[월간 업무 보고] 2026-03-01 ~ 2026-03-25

■ ESM 프로젝트 (145시간 / 90.6%)

1. 백엔드 API 개발 - 85시간 (53.1%)
  • 사용자 인증 API 개발
  • 데이터베이스 연동
  • REST API 엔드포인트 구현
  [성과] JWT 기반 인증 시스템 구축 완료, PostgreSQL 연동 및 주요 API 엔드포인트 개발

2. 프론트엔드 UI 개발 - 60시간 (37.5%)
  • 로그인/대시보드 화면 구현
  • 반응형 레이아웃 적용
  [성과] React 기반 사용자 인터페이스 구현, 반응형 디자인 적용으로 모바일 지원

■ 내부 업무 (15시간 / 9.4%)

1. 팀 회의 및 기획 - 15시간 (9.4%)
  • 스프린트 회의 참석 및 기획 문서 작성
  [성과] 요구사항 정리 및 스프린트 계획 수립 완료

총 투입시간: 160시간`;

  return (
    <div className="p-6">
      {/* AI 월간 보고 자동 생성 배너 */}
      <div className="mb-6 flex items-center justify-between rounded-lg border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-5">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
            <Sparkles className="h-5 w-5 text-blue-600" />
            AI 월간 보고 자동 생성
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            AI로 이번달에 했던 업무 보고를 생성해보세요
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700">
          <Sparkles className="h-4 w-4" />
          AI로 생성하기
        </button>
      </div>

      {/* 작성된 월간 보고 섹션 헤더 + 월 선택 */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">작성된 월간 보고</h2>
        <div className="flex items-center gap-1">
          <button
            onClick={handlePrevMonth}
            className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="min-w-[120px] text-center text-sm font-semibold text-gray-900">
            {selectedYear}년 {String(selectedMonth).padStart(2, '0')}월
          </span>
          <button
            onClick={handleNextMonth}
            disabled={isCurrentOrFuture}
            className={`rounded p-1.5 ${isCurrentOrFuture ? 'cursor-not-allowed text-gray-300' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* 보고가 없는 경우 */}
      {!hasReport && (
        <div className="mb-6 flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 py-16">
          <p className="text-sm text-gray-500">
            {selectedYear}년 {String(selectedMonth).padStart(2, '0')}월에 작성된 월간 보고가 없습니다.
          </p>
        </div>
      )}

      {/* Monthly Report Card */}
      {hasReport && (
      <div className="mb-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Header with Period and Actions */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900">2026-03-01 ~ 2026-03-25</h2>
            <p className="text-sm text-gray-500 mt-0.5">총 투입시간: 160시간</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowGrmPopup(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-indigo-600 hover:bg-indigo-50 rounded border border-indigo-200"
            >
              <ClipboardList className="w-4 h-4" />
              <span>GRM포맷으로 복사</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded">
              <Trash2 className="w-4 h-4" />
              <span>삭제</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <table className="w-full">
          <thead className="bg-gray-200 border-b border-gray-300">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">월간 태그</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">업무명</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">투입률(투입시간)</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">업무내용</th>
            </tr>
          </thead>
          <tbody>
            {/* Tag Group Header */}
            <tr className="bg-blue-50">
              <td colSpan={4} className="px-4 py-2 font-medium text-gray-900">
                ESM 프로젝트 (145시간 / 90.6%)
              </td>
            </tr>

            {/* 백엔드 API 개발 */}
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3">
                <a href="#" className="text-blue-600 hover:underline">백엔드 API 개발</a>
              </td>
              <td className="px-4 py-3">53.1% (85시간)</td>
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
                    <span className="flex-1 whitespace-pre-line">{'• 사용자 인증 API 개발\n• 데이터베이스 연동\n• REST API 엔드포인트 구현'}</span>
                    <button onClick={() => handleEdit('0-0', '• 사용자 인증 API 개발\n• 데이터베이스 연동\n• REST API 엔드포인트 구현')} className="shrink-0 rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"><Pencil className="h-3.5 w-3.5" /></button>
                  </div>
                )}
                {/* 업무 성과 */}
                <div className="mt-2 rounded border border-emerald-200 bg-emerald-50 p-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-xs font-medium text-emerald-700">업무 성과</span>
                    </div>
                    {editingPerformance !== 'perf-0-0' && (
                      <button onClick={() => handlePerformanceEdit('perf-0-0', 'JWT 기반 인증 시스템 구축 완료, PostgreSQL 연동 및 주요 API 엔드포인트 개발')} className="shrink-0 rounded p-0.5 text-emerald-400 hover:bg-emerald-100 hover:text-emerald-600"><Pencil className="h-3 w-3" /></button>
                    )}
                  </div>
                  {editingPerformance === 'perf-0-0' ? (
                    <div className="flex flex-col gap-2">
                      <textarea className="w-full rounded border border-emerald-300 bg-white px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500" rows={3} value={performanceEditValue} onChange={(e) => setPerformanceEditValue(e.target.value)} />
                      <div className="flex gap-2">
                        <button onClick={handlePerformanceSave} className="flex items-center gap-1 rounded bg-emerald-600 px-2.5 py-0.5 text-xs font-medium text-white hover:bg-emerald-700"><Check className="h-3 w-3" />저장</button>
                        <button onClick={handlePerformanceCancel} className="flex items-center gap-1 rounded border border-gray-300 px-2.5 py-0.5 text-xs font-medium text-gray-600 hover:bg-gray-50"><X className="h-3 w-3" />취소</button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-emerald-800 leading-relaxed">JWT 기반 인증 시스템 구축 완료, PostgreSQL 연동 및 주요 API 엔드포인트 개발</p>
                  )}
                </div>
              </td>
            </tr>

            {/* 프론트엔드 UI 개발 */}
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3">
                <a href="#" className="text-blue-600 hover:underline">프론트엔드 UI 개발</a>
              </td>
              <td className="px-4 py-3">37.5% (60시간)</td>
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
                    <span className="flex-1 whitespace-pre-line">{'• 로그인/대시보드 화면 구현\n• 반응형 레이아웃 적용'}</span>
                    <button onClick={() => handleEdit('0-1', '• 로그인/대시보드 화면 구현\n• 반응형 레이아웃 적용')} className="shrink-0 rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"><Pencil className="h-3.5 w-3.5" /></button>
                  </div>
                )}
                {/* 업무 성과 */}
                <div className="mt-2 rounded border border-emerald-200 bg-emerald-50 p-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-xs font-medium text-emerald-700">업무 성과</span>
                    </div>
                    {editingPerformance !== 'perf-0-1' && (
                      <button onClick={() => handlePerformanceEdit('perf-0-1', 'React 기반 사용자 인터페이스 구현, 반응형 디자인 적용으로 모바일 지원')} className="shrink-0 rounded p-0.5 text-emerald-400 hover:bg-emerald-100 hover:text-emerald-600"><Pencil className="h-3 w-3" /></button>
                    )}
                  </div>
                  {editingPerformance === 'perf-0-1' ? (
                    <div className="flex flex-col gap-2">
                      <textarea className="w-full rounded border border-emerald-300 bg-white px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500" rows={3} value={performanceEditValue} onChange={(e) => setPerformanceEditValue(e.target.value)} />
                      <div className="flex gap-2">
                        <button onClick={handlePerformanceSave} className="flex items-center gap-1 rounded bg-emerald-600 px-2.5 py-0.5 text-xs font-medium text-white hover:bg-emerald-700"><Check className="h-3 w-3" />저장</button>
                        <button onClick={handlePerformanceCancel} className="flex items-center gap-1 rounded border border-gray-300 px-2.5 py-0.5 text-xs font-medium text-gray-600 hover:bg-gray-50"><X className="h-3 w-3" />취소</button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-emerald-800 leading-relaxed">React 기반 사용자 인터페이스 구현, 반응형 디자인 적용으로 모바일 지원</p>
                  )}
                </div>
              </td>
            </tr>

            {/* Another Tag Group */}
            <tr className="bg-green-50">
              <td colSpan={4} className="px-4 py-2 font-medium text-gray-900">
                내부 업무 (15시간 / 9.4%)
              </td>
            </tr>

            <tr className="border-b border-gray-100">
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3">팀 회의 및 기획</td>
              <td className="px-4 py-3">9.4% (15시간)</td>
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
                    <span className="flex-1">스프린트 회의 참석 및 기획 문서 작성</span>
                    <button onClick={() => handleEdit('0-2', '스프린트 회의 참석 및 기획 문서 작성')} className="shrink-0 rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"><Pencil className="h-3.5 w-3.5" /></button>
                  </div>
                )}
                {/* 업무 성과 */}
                <div className="mt-2 rounded border border-emerald-200 bg-emerald-50 p-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-xs font-medium text-emerald-700">업무 성과</span>
                    </div>
                    {editingPerformance !== 'perf-0-2' && (
                      <button onClick={() => handlePerformanceEdit('perf-0-2', '요구사항 정리 및 스프린트 계획 수립 완료')} className="shrink-0 rounded p-0.5 text-emerald-400 hover:bg-emerald-100 hover:text-emerald-600"><Pencil className="h-3 w-3" /></button>
                    )}
                  </div>
                  {editingPerformance === 'perf-0-2' ? (
                    <div className="flex flex-col gap-2">
                      <textarea className="w-full rounded border border-emerald-300 bg-white px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500" rows={3} value={performanceEditValue} onChange={(e) => setPerformanceEditValue(e.target.value)} />
                      <div className="flex gap-2">
                        <button onClick={handlePerformanceSave} className="flex items-center gap-1 rounded bg-emerald-600 px-2.5 py-0.5 text-xs font-medium text-white hover:bg-emerald-700"><Check className="h-3 w-3" />저장</button>
                        <button onClick={handlePerformanceCancel} className="flex items-center gap-1 rounded border border-gray-300 px-2.5 py-0.5 text-xs font-medium text-gray-600 hover:bg-gray-50"><X className="h-3 w-3" />취소</button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-emerald-800 leading-relaxed">요구사항 정리 및 스프린트 계획 수립 완료</p>
                  )}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      )}

      {/* GRM 포맷 복사 팝업 */}
      {showGrmPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowGrmPopup(false)}>
          <div className="w-full max-w-lg rounded-lg bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h3 className="text-base font-semibold text-gray-900">GRM 포맷으로 복사</h3>
              <button onClick={() => setShowGrmPopup(false)} className="rounded p-1 hover:bg-gray-100">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="px-6 py-5">
              <div id="grm-content" className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-800 whitespace-pre-line leading-relaxed max-h-96 overflow-y-auto font-mono">
                {grmContent}
              </div>
            </div>
            <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
              <button onClick={() => setShowGrmPopup(false)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                취소
              </button>
              <button
                onClick={handleCopyGrm}
                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                <Copy className="h-4 w-4" />
                복사
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
