import { Link, useLocation } from "react-router";
import { Calendar, X } from "lucide-react";
import { useState } from "react";

export default function TeamSharePage() {
  const location = useLocation();
  const activeTab = location.pathname.split("/").pop() || "daily";
  const [detailPopup, setDetailPopup] = useState<{
    taskName: string;
    content: string;
  } | null>(null);

  return (
    <div className="p-6">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">팀 업무 공유</h1>
        <p className="text-sm text-gray-500 mt-1">
          팀원들의 보고를 확인하세요 (조회 전용)
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex gap-6">
          <Link
            to="/team/daily"
            className={`pb-3 px-1 border-b-2 text-sm font-medium transition-colors ${
              activeTab === "daily"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            일간 보고
          </Link>
          <Link
            to="/team/weekly"
            className={`pb-3 px-1 border-b-2 text-sm font-medium transition-colors ${
              activeTab === "weekly"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            주간 보고
          </Link>
        </nav>
      </div>

      {/* Daily Report Tab */}
      {activeTab === "daily" && (
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
              <h2 className="text-base font-bold text-gray-900">
                2026-03-15 (토)
              </h2>
            </div>

            <table className="w-full">
              <thead className="bg-gray-200 border-b border-gray-300">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                    팀원
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                    업무명
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                    투입률
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                    오늘 한 일
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                    내일 할 일
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Member 1 - Multiple Tasks */}
                <tr className="border-b border-gray-100">
                  <td
                    className="px-4 py-3 font-medium text-gray-900"
                    rowSpan={3}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">
                        홍
                      </div>
                      <span>홍길동</span>
                    </div>
                  </td>
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
                  <td
                    className="px-4 py-3 font-medium text-gray-900"
                    rowSpan={2}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm">
                        김
                      </div>
                      <span>김팀원</span>
                    </div>
                  </td>
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
      {activeTab === "weekly" && (
        <div>
          {/* Weekly Report Table - 홍길동 */}
          <div className="mb-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900">
                2026-03-10 (월) ~ 2026-03-16 (일)
              </h2>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">
                  홍
                </div>
                <span className="text-sm font-medium text-gray-900">홍길동</span>
              </div>
            </div>

            <table className="min-w-full divide-y divide-gray-300 select-none border-t border-gray-300 table-fixed">
              <colgroup>
                <col className="w-[13%]" />
                <col className="w-[27%]" />
                <col className="w-[8%]" />
                <col className="w-[52%]" />
              </colgroup>
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-900 uppercase border-r border-gray-300 whitespace-nowrap tracking-wide">
                    월간 태그
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase border-r border-gray-300 whitespace-nowrap tracking-wide">
                    업무명
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-900 uppercase border-r border-gray-300 whitespace-nowrap tracking-wide">
                    투입률
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase whitespace-nowrap tracking-wide">
                    한 일 요약
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {/* 두레이 */}
                <tr
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => setDetailPopup({ taskName: "두레이 API 연동 검토", content: "프로토타입에서는 지원하지 않습니다" })}
                >
                  <td rowSpan={1} className="px-4 py-3 text-sm align-middle text-center border-r border-gray-300 bg-gray-50">
                    <div className="font-semibold text-gray-800">두레이</div>
                    <div className="text-xs text-gray-500 mt-1">4.5h (53%)</div>
                  </td>
                  <td className="px-4 py-3 text-sm align-middle border-r border-gray-300">
                    <span className="font-medium text-blue-600">
                      두레이 API 연동 검토
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm align-middle text-center border-r border-gray-300">
                    <span className="text-gray-700">4.5h</span>
                    <span className="text-gray-400 ml-1">(53%)</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 align-middle">
                    <span className="text-gray-400">프로토타입에서는 지원하지 않습니다</span>
                  </td>
                </tr>
                {/* 슈크럼 */}
                <tr
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => setDetailPopup({ taskName: "데일리 슈크럼 UI 기획", content: "프로토타입에서는 지원하지 않습니다" })}
                >
                  <td rowSpan={2} className="px-4 py-3 text-sm align-middle text-center border-r border-gray-300 bg-gray-50">
                    <div className="font-semibold text-gray-800">슈크럼</div>
                    <div className="text-xs text-gray-500 mt-1">4h (47%)</div>
                  </td>
                  <td className="px-4 py-3 text-sm align-middle border-r border-gray-300">
                    <span className="font-medium text-blue-600">
                      데일리 슈크럼 UI 기획
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm align-middle text-center border-r border-gray-300">
                    <span className="text-gray-700">3h</span>
                    <span className="text-gray-400 ml-1">(35%)</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 align-middle">
                    <span className="text-gray-400">프로토타입에서는 지원하지 않습니다</span>
                  </td>
                </tr>
                <tr
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => setDetailPopup({ taskName: "PR 리뷰", content: "프로토타입에서는 지원하지 않습니다" })}
                >
                  <td className="px-4 py-3 text-sm align-middle border-r border-gray-300">
                    <span className="font-medium text-blue-600">
                      PR 리뷰
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm align-middle text-center border-r border-gray-300">
                    <span className="text-gray-700">1h</span>
                    <span className="text-gray-400 ml-1">(12%)</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 align-middle">
                    <span className="text-gray-400">프로토타입에서는 지원하지 않습니다</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 한 일 상세 팝업 */}
      {detailPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setDetailPopup(null)}>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-base font-semibold text-gray-900">{detailPopup.taskName}</h3>
              <button onClick={() => setDetailPopup(null)} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{detailPopup.content}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
