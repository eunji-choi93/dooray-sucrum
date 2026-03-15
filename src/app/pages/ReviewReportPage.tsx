import { Trash2, Plus, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function ReviewReportPage() {
  const [expandedTag, setExpandedTag] = useState<string | null>(null);

  const toggleTag = (tagId: string) => {
    setExpandedTag(expandedTag === tagId ? null : tagId);
  };

  return (
    <div className="p-6">
      {/* Page Title and Action */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">성과 보고 (리뷰)</h1>
          <p className="text-sm text-gray-500 mt-1">기간별 성과를 확인하고 AI 요약을 검토하세요</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          <span>성과 보고 생성</span>
        </button>
      </div>

      {/* Review Report Card */}
      <div className="mb-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Header with Period and Delete */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900">2026-01-01 ~ 2026-12-31 (연간)</h2>
            <p className="text-sm text-gray-500 mt-0.5">총 투입시간: 1,920시간</p>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded">
            <Trash2 className="w-4 h-4" />
            <span>삭제</span>
          </button>
        </div>

        {/* Tag Summary Table */}
        <table className="w-full">
          <thead className="bg-gray-200 border-b border-gray-300">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 w-8"></th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">월간 태그</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">투입시간</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">투입률</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">AI 요약 (500자 내외)</th>
            </tr>
          </thead>
          <tbody>
            {/* ESM Project Tag */}
            <tr className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer" onClick={() => toggleTag('esm')}>
              <td className="px-4 py-3">
                {expandedTag === 'esm' ? (
                  <ChevronUp className="w-4 h-4 text-gray-600" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                )}
              </td>
              <td className="px-4 py-3 font-medium text-gray-900">ESM 프로젝트</td>
              <td className="px-4 py-3">1,680시간</td>
              <td className="px-4 py-3">87.5%</td>
              <td className="px-4 py-3">
                <div className="bg-blue-50 rounded border border-blue-200 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-medium text-blue-600">AI 태그별 요약</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    ESM 프로젝트의 전반적인 개발을 주도했습니다. 백엔드에서는 JWT 기반 인증 시스템, 
                    RESTful API 설계 및 구현, PostgreSQL 데이터베이스 최적화 작업을 완료했습니다. 
                    프론트엔드에서는 React를 활용한 사용자 인터페이스 구축, 반응형 디자인 적용, 
                    사용자 경험 개선 작업을 수행했습니다. 또한 지속적인 코드 리뷰와 리팩토링을 통해 
                    코드 품질을 높였으며, 단위 테스트 및 통합 테스트를 작성하여 안정성을 확보했습니다. 
                    전체 프로젝트의 85% 이상을 완료하여 예정된 일정보다 빠르게 진행되었습니다.
                  </p>
                </div>
              </td>
            </tr>

            {/* Expanded Detail */}
            {expandedTag === 'esm' && (
              <tr className="bg-gray-50">
                <td colSpan={5} className="px-4 py-4">
                  <div className="ml-8">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">상세 업무 목록</h3>
                    <div className="space-y-3">
                      {/* Task 1 */}
                      <div className="bg-white rounded border border-gray-200 p-3">
                        <div className="flex items-start justify-between mb-2">
                          <a href="#" className="text-blue-600 hover:underline font-medium">
                            백엔드 API 개발 (850시간)
                          </a>
                          <span className="text-sm text-gray-500">50.6%</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">
                          <strong>한 일:</strong> JWT 인증, REST API 구현, 데이터베이스 연동
                        </p>
                        <div className="bg-purple-50 rounded border border-purple-200 p-2">
                          <div className="flex items-center gap-2 mb-1">
                            <Sparkles className="w-3 h-3 text-purple-600" />
                            <span className="text-xs font-medium text-purple-600">업무별 AI 요약</span>
                          </div>
                          <p className="text-xs text-gray-600">
                            확장 가능한 RESTful API 아키텍처 설계 및 구현. 인증/인가 시스템 구축.
                          </p>
                        </div>
                        <div className="mt-2 p-2 bg-yellow-50 rounded border border-yellow-200">
                          <p className="text-xs font-medium text-yellow-700 mb-1">어필할 성과:</p>
                          <p className="text-xs text-gray-700">
                            API 응답 시간을 평균 200ms에서 50ms로 개선하여 성능 향상. 
                            단위 테스트 커버리지 90% 달성.
                          </p>
                        </div>
                      </div>

                      {/* Task 2 */}
                      <div className="bg-white rounded border border-gray-200 p-3">
                        <div className="flex items-start justify-between mb-2">
                          <a href="#" className="text-blue-600 hover:underline font-medium">
                            프론트엔드 UI 개발 (680시간)
                          </a>
                          <span className="text-sm text-gray-500">40.5%</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">
                          <strong>한 일:</strong> React 컴포넌트 개발, 반응형 UI, 상태 관리
                        </p>
                        <div className="bg-purple-50 rounded border border-purple-200 p-2">
                          <div className="flex items-center gap-2 mb-1">
                            <Sparkles className="w-3 h-3 text-purple-600" />
                            <span className="text-xs font-medium text-purple-600">업무별 AI 요약</span>
                          </div>
                          <p className="text-xs text-gray-600">
                            모던 React 패턴을 활용한 재사용 가능한 UI 컴포넌트 라이브러리 구축.
                          </p>
                        </div>
                        <div className="mt-2 p-2 bg-yellow-50 rounded border border-yellow-200">
                          <p className="text-xs font-medium text-yellow-700 mb-1">어필할 성과:</p>
                          <p className="text-xs text-gray-700">
                            Lighthouse 성능 점수 95점 달성. 모바일/태블릿/데스크톱 완벽 대응.
                          </p>
                        </div>
                      </div>

                      {/* Task 3 */}
                      <div className="bg-white rounded border border-gray-200 p-3">
                        <div className="flex items-start justify-between mb-2">
                          <a href="#" className="text-blue-600 hover:underline font-medium">
                            코드 품질 개선 (150시간)
                          </a>
                          <span className="text-sm text-gray-500">8.9%</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">
                          <strong>한 일:</strong> 리팩토링, 테스트 코드 작성, 코드 리뷰
                        </p>
                        <div className="bg-purple-50 rounded border border-purple-200 p-2">
                          <div className="flex items-center gap-2 mb-1">
                            <Sparkles className="w-3 h-3 text-purple-600" />
                            <span className="text-xs font-medium text-purple-600">업무별 AI 요약</span>
                          </div>
                          <p className="text-xs text-gray-600">
                            레거시 코드 개선 및 테스트 자동화 환경 구축으로 코드 안정성 향상.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            )}

            {/* Internal Work Tag */}
            <tr className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer" onClick={() => toggleTag('internal')}>
              <td className="px-4 py-3">
                {expandedTag === 'internal' ? (
                  <ChevronUp className="w-4 h-4 text-gray-600" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                )}
              </td>
              <td className="px-4 py-3 font-medium text-gray-900">내부 업무</td>
              <td className="px-4 py-3">240시간</td>
              <td className="px-4 py-3">12.5%</td>
              <td className="px-4 py-3">
                <div className="bg-green-50 rounded border border-green-200 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-green-600" />
                    <span className="text-xs font-medium text-green-600">AI 태그별 요약</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    팀 내부 업무로 주간/월간 스프린트 회의 진행, 요구사항 분석 및 정리, 
                    기술 문서 작성, 신입 팀원 온보딩 지원 등을 수행했습니다. 
                    팀 협업 문화 개선을 위한 코드 리뷰 프로세스를 도입하고 정착시켰습니다.
                  </p>
                </div>
              </td>
            </tr>

            {expandedTag === 'internal' && (
              <tr className="bg-gray-50">
                <td colSpan={5} className="px-4 py-4">
                  <div className="ml-8">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">상세 업무 목록</h3>
                    <div className="space-y-3">
                      <div className="bg-white rounded border border-gray-200 p-3">
                        <div className="flex items-start justify-between mb-2">
                          <span className="font-medium">팀 회의 및 기획 (240시간)</span>
                          <span className="text-sm text-gray-500">100%</span>
                        </div>
                        <p className="text-sm text-gray-700">
                          <strong>한 일:</strong> 스프린트 회의, 기획 문서 작성, 팀원 온보딩
                        </p>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">성과 보고 생성 안내</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• 시작일/종료일을 지정하여 원하는 기간의 성과 보고를 생성할 수 있습니다</li>
          <li>• AI가 월간 보고의 데이터를 바탕으로 태그별 요약을 자동 생성합니다 (500자 내외)</li>
          <li>• 상세보기를 통해 개별 업무의 AI 요약과 어필할 성과를 확인할 수 있습니다</li>
          <li>• 기간이 중복되는 성과 보고는 생성할 수 없습니다</li>
        </ul>
      </div>
    </div>
  );
}
