import { Link, useLocation } from 'react-router';
import { Calendar } from 'lucide-react';

export default function TeamSharePage() {
  const location = useLocation();
  const activeTab = location.pathname.split('/').pop() || 'daily';

  return (
    <div className="p-6">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">팀 업무 공유</h1>
        <p className="text-sm text-gray-500 mt-1">팀원들의 보고를 확인하세요 (조회 전용)</p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex gap-6">
          <Link
            to="/team/daily"
            className={`pb-3 px-1 border-b-2 text-sm font-medium transition-colors ${
              activeTab === 'daily'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            일간 보고
          </Link>
          <Link
            to="/team/weekly"
            className={`pb-3 px-1 border-b-2 text-sm font-medium transition-colors ${
              activeTab === 'weekly'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            주간 보고
          </Link>
        </nav>
      </div>

      {/* Daily Report Tab */}
      {activeTab === 'daily' && (
        <div>
          {/* Date Filter */}
          <div className="mb-6 flex items-center gap-3">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="2026-03-15"
              />
            </div>
          </div>

          {/* Daily Report Card */}
          <div className="mb-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-base font-bold text-gray-900">2026-03-15 (토)</h2>
            </div>

            <table className="w-full">
              <thead className="bg-gray-200 border-b border-gray-300">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">팀원</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">총 투입시간</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">업무명</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">투입률</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">업무 내용</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">내일 할 일</th>
                </tr>
              </thead>
              <tbody>
                {/* Member 1 - Multiple Tasks */}
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-900" rowSpan={3}>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">
                        홍
                      </div>
                      <span>홍길동</span>
                    </div>
                  </td>
                  <td className="px-4 py-3" rowSpan={3}>8시간</td>
                  <td className="px-4 py-3">
                    <a href="#" className="text-blue-600 hover:underline">
                      사용자 인증 API 개발
                    </a>
                  </td>
                  <td className="px-4 py-3">4시간 (50%)</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    JWT 기반 인증 로직 구현 완료
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700" rowSpan={3}>
                    토큰 갱신 로직 구현 예정
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3">
                    <a href="#" className="text-blue-600 hover:underline">
                      데이터베이스 스키마 설계
                    </a>
                  </td>
                  <td className="px-4 py-3">2시간 (25%)</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    ERD 작성 및 테이블 구조 정의
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3">코드 리뷰</td>
                  <td className="px-4 py-3">2시간 (25%)</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    팀원 코드 리뷰 및 피드백
                  </td>
                </tr>

                {/* Member 2 */}
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-900" rowSpan={2}>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm">
                        김
                      </div>
                      <span>김팀원</span>
                    </div>
                  </td>
                  <td className="px-4 py-3" rowSpan={2}>7시간</td>
                  <td className="px-4 py-3">
                    <a href="#" className="text-blue-600 hover:underline">
                      로그인 화면 구현
                    </a>
                  </td>
                  <td className="px-4 py-3">5시간 (71%)</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    React로 로그인/회원가입 UI 개발
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700" rowSpan={2}>
                    폼 유효성 검사 추가
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3">반응형 레이아웃 적용</td>
                  <td className="px-4 py-3">2시간 (29%)</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    모바일 대응 CSS 작성
                  </td>
                </tr>

                {/* Member 3 */}
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm">
                        이
                      </div>
                      <span>이개발</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">6시간</td>
                  <td className="px-4 py-3">테스트 코드 작성</td>
                  <td className="px-4 py-3">6시간 (100%)</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    단위 테스트 및 통합 테스트 작성
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    E2E 테스트 추가
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Weekly Report Tab */}
      {activeTab === 'weekly' && (
        <div>
          {/* Date Filter */}
          <div className="mb-6 flex items-center gap-3">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="2026-03-10"
              />
            </div>
            <span className="text-sm text-gray-600">~ 2026-03-16</span>
          </div>

          {/* Weekly Report Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-base font-bold text-gray-900">2026-03-10 (월) ~ 2026-03-16 (일)</h2>
            </div>

            <table className="w-full">
              <thead className="bg-gray-200 border-b border-gray-300">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">팀원</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">월간 태그</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">업무명</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">투입시간</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">투입률</th>
                </tr>
              </thead>
              <tbody>
                {/* Member 1 */}
                <tr className="bg-blue-50">
                  <td className="px-4 py-2 font-medium text-gray-900" rowSpan={3}>
                    홍길동
                  </td>
                  <td colSpan={4} className="px-4 py-2 font-medium text-gray-900">
                    ESM 프로젝트 (35시간 / 87.5%)
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3">
                    <a href="#" className="text-blue-600 hover:underline">백엔드 API 개발</a>
                  </td>
                  <td className="px-4 py-3">25시간</td>
                  <td className="px-4 py-3">62.5%</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3">
                    <a href="#" className="text-blue-600 hover:underline">코드 리뷰</a>
                  </td>
                  <td className="px-4 py-3">10시간</td>
                  <td className="px-4 py-3">25%</td>
                </tr>

                {/* Member 2 */}
                <tr className="bg-green-50">
                  <td className="px-4 py-2 font-medium text-gray-900" rowSpan={2}>
                    김팀원
                  </td>
                  <td colSpan={4} className="px-4 py-2 font-medium text-gray-900">
                    ESM 프로젝트 (38시간 / 100%)
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3">
                    <a href="#" className="text-blue-600 hover:underline">프론트엔드 UI 개발</a>
                  </td>
                  <td className="px-4 py-3">38시간</td>
                  <td className="px-4 py-3">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-6 bg-yellow-50 rounded-lg border border-yellow-200 p-4">
        <h3 className="text-sm font-semibold text-yellow-900 mb-2">팀 공유 안내</h3>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• 팀원들의 보고를 조회만 할 수 있습니다 (수정/삭제 불가)</li>
          <li>• 민감정보(어필할 성과, 동료 협업 기록)는 표시되지 않습니다</li>
          <li>• 일간 보고: 업무 내용과 내일 할 일을 확인할 수 있습니다</li>
          <li>• 주간/월간 보고: 투입시간과 투입률을 확인할 수 있습니다</li>
        </ul>
      </div>
    </div>
  );
}
