import { Trash2, Plus, Sparkles } from 'lucide-react';

export default function MonthlyReportPage() {
  return (
    <div className="p-6">
      {/* Page Title and Action */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">월간 보고 (GRM)</h1>
          <p className="text-sm text-gray-500 mt-1">월간 단위로 집계된 보고 및 AI 요약을 확인하세요</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          <span>월간 보고 생성</span>
        </button>
      </div>

      {/* Monthly Report Card */}
      <div className="mb-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Header with Period and Delete */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900">2026-03-01 ~ 2026-03-25</h2>
            <p className="text-sm text-gray-500 mt-0.5">총 투입시간: 160시간</p>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded">
            <Trash2 className="w-4 h-4" />
            <span>삭제</span>
          </button>
        </div>

        {/* Table */}
        <table className="w-full">
          <thead className="bg-gray-200 border-b border-gray-300">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">월간 태그</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">업무명</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">투입시간</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">투입률</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">업무 내용 / AI 요약</th>
            </tr>
          </thead>
          <tbody>
            {/* Tag Group Header with AI Summary */}
            <tr className="bg-blue-50">
              <td colSpan={5} className="px-4 py-3">
                <div className="flex items-start gap-2">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-2">ESM 프로젝트 (145시간 / 90.6%)</p>
                    <div className="bg-white rounded border border-blue-200 p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-medium text-blue-600">AI 태그별 요약 (200자 내외)</span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        ESM 프로젝트의 백엔드 API 및 프론트엔드 UI 개발을 중점적으로 진행했습니다. 
                        사용자 인증 시스템 구축을 완료하고 데이터베이스 스키마를 설계했으며, 
                        주요 화면의 UI 구현을 마쳤습니다. 코드 품질 개선을 위해 리팩토링 및 
                        테스트 코드 작성을 병행했습니다.
                      </p>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            
            {/* Tasks under monthly tag */}
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3">
                <a href="#" className="text-blue-600 hover:underline">
                  백엔드 API 개발
                </a>
              </td>
              <td className="px-4 py-3">85시간</td>
              <td className="px-4 py-3">53.1%</td>
              <td className="px-4 py-3">
                <div className="text-sm text-gray-700 mb-2 whitespace-pre-line">
                  • 사용자 인증 API 개발{'\n'}
                  • 데이터베이스 연동{'\n'}
                  • REST API 엔드포인트 구현
                </div>
                <div className="bg-purple-50 rounded border border-purple-200 p-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-3 h-3 text-purple-600" />
                    <span className="text-xs font-medium text-purple-600">AI 업무별 요약</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    JWT 기반 인증 시스템 구축 완료. PostgreSQL 연동 및 주요 API 엔드포인트 개발.
                  </p>
                </div>
              </td>
            </tr>
            
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3">
                <a href="#" className="text-blue-600 hover:underline">
                  프론트엔드 UI 개발
                </a>
              </td>
              <td className="px-4 py-3">60시간</td>
              <td className="px-4 py-3">37.5%</td>
              <td className="px-4 py-3">
                <div className="text-sm text-gray-700 mb-2 whitespace-pre-line">
                  • 로그인/대시보드 화면 구현{'\n'}
                  • 반응형 레이아웃 적용
                </div>
                <div className="bg-purple-50 rounded border border-purple-200 p-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-3 h-3 text-purple-600" />
                    <span className="text-xs font-medium text-purple-600">AI 업무별 요약</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    React 기반 사용자 인터페이스 구현. 반응형 디자인 적용으로 모바일 지원.
                  </p>
                </div>
              </td>
            </tr>

            {/* Another Tag Group */}
            <tr className="bg-green-50">
              <td colSpan={5} className="px-4 py-3">
                <div className="flex items-start gap-2">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-2">내부 업무 (15시간 / 9.4%)</p>
                    <div className="bg-white rounded border border-green-200 p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-green-600" />
                        <span className="text-xs font-medium text-green-600">AI 태그별 요약 (200자 내외)</span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        팀 내부 업무로 주간 스프린트 회의 참석, 요구사항 정리 및 기획 문서 작성을 수행했습니다.
                      </p>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3">팀 회의 및 기획</td>
              <td className="px-4 py-3">15시간</td>
              <td className="px-4 py-3">9.4%</td>
              <td className="px-4 py-3">
                <div className="text-sm text-gray-700">
                  스프린트 회의 참석 및 기획 문서 작성
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
