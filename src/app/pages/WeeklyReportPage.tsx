import { Trash2, Plus } from 'lucide-react';

export default function WeeklyReportPage() {
  return (
    <div className="p-6">
      {/* Page Title and Action */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">주간 보고</h1>
          <p className="text-sm text-gray-500 mt-1">주간 단위로 집계된 보고를 확인하세요</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          <span>주간 보고 생성</span>
        </button>
      </div>

      {/* Weekly Report Card */}
      <div className="mb-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Header with Period and Delete */}
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

        {/* Table */}
        <table className="w-full">
          <thead className="bg-gray-200 border-b border-gray-300">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">월간 태그</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">업무명</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">투입시간</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">투입률</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">업무 내용</th>
            </tr>
          </thead>
          <tbody>
            {/* Tag Group Header */}
            <tr className="bg-blue-50">
              <td colSpan={5} className="px-4 py-2 font-medium text-gray-900">
                ESM 프로젝트 (35시간 / 87.5%)
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
              <td className="px-4 py-3">20시간</td>
              <td className="px-4 py-3">50%</td>
              <td className="px-4 py-3 text-sm text-gray-700 whitespace-pre-line">
                • 사용자 인증 API 개발 완료{'\n'}
                • 데이터베이스 연동{'\n'}
                • 단위 테스트 작성
              </td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3">
                <a href="#" className="text-blue-600 hover:underline">
                  프론트엔드 UI 개발
                </a>
              </td>
              <td className="px-4 py-3">15시간</td>
              <td className="px-4 py-3">37.5%</td>
              <td className="px-4 py-3 text-sm text-gray-700 whitespace-pre-line">
                • 로그인 화면 구현{'\n'}
                • 대시보드 레이아웃 작업
              </td>
            </tr>

            {/* Another Tag Group */}
            <tr className="bg-green-50">
              <td colSpan={5} className="px-4 py-2 font-medium text-gray-900">
                내부 업무 (5시간 / 12.5%)
              </td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3">팀 회의 및 기획</td>
              <td className="px-4 py-3">5시간</td>
              <td className="px-4 py-3">12.5%</td>
              <td className="px-4 py-3 text-sm text-gray-700">
                주간 스프린트 회의 참석 및 요구사항 정리
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
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">투입시간</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">투입률</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">업무 내용</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-blue-50">
              <td colSpan={5} className="px-4 py-2 font-medium text-gray-900">
                ESM 프로젝트 (38시간 / 100%)
              </td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3">초기 설계 및 환경 구축</td>
              <td className="px-4 py-3">38시간</td>
              <td className="px-4 py-3">100%</td>
              <td className="px-4 py-3 text-sm text-gray-700">
                프로젝트 초기 설정 및 개발 환경 구축
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
