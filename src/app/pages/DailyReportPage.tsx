import { Trash2, Pencil } from "lucide-react";
import { useNavigate } from "react-router";
import type { EditTask } from "../types/scrum";

export default function DailyReportPage() {
  const navigate = useNavigate();

  const handleEdit = (task: EditTask) => {
    navigate("/", { state: { mode: "edit", task } });
  };

  return (
    <div className="p-6">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">일간 보고</h1>
        <p className="text-sm text-gray-500 mt-1">
          작성한 일간 보고를 확인하세요
        </p>
      </div>

      {/* Report Card - Date Based */}
      <div className="mb-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Header with Date and Delete */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              2026-03-15 (토) | 총 투입시간: 8시간
            </h2>
          </div>
        </div>

        {/* Table */}
        <table className="w-full">
          <thead className="bg-gray-200 border-b border-gray-300">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                주간 태그
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
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                어필한 성과
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                작업
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Tag Group Header */}
            <tr className="bg-blue-50">
              <td colSpan={7} className="px-4 py-2 font-medium text-gray-900">
                개발 (6시간 / 75%)
              </td>
            </tr>
            {/* Tasks under tag */}
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3">
                <a href="#" className="text-blue-600 hover:underline">
                  사용자 인증 API 개발
                </a>
              </td>
              <td className="px-4 py-3">4시간 (50%)</td>
              <td className="px-4 py-3 text-sm text-gray-700">
                JWT 기반 인증 로직 구현 완료
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">
                토큰 갱신 로직 구현 예정
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">
                인증 모듈 설계 및 구현 완료
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      handleEdit({
                        title: "사용자 인증 API 개발",
                        hours: 4,
                        weeklyTag: "개발",
                        monthlyTag: "ESM 프로젝트",
                        todayWork: "JWT 기반 인증 로직 구현 완료",
                        tomorrowWork: "토큰 갱신 로직 구현 예정",
                        achievement: "인증 모듈 설계 및 구현 완료",
                        status: "completed",
                      })
                    }
                    className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded flex items-center gap-1"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    수정
                  </button>
                  <button className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded flex items-center gap-1">
                    <Trash2 className="w-3.5 h-3.5" />
                    삭제
                  </button>
                </div>
              </td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3">
                <a href="#" className="text-blue-600 hover:underline">
                  데이터베이스 스키마 설계
                </a>
              </td>
              <td className="px-4 py-3">2시간 (25%)</td>
              <td className="px-4 py-3 text-sm text-gray-700">
                ERD 작성 및 테이블 구조 정의
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">
                인덱스 최적화 작업 예정
              </td>
              <td className="px-4 py-3 text-sm text-gray-700"></td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      handleEdit({
                        title: "데이터베이스 스키마 설계",
                        hours: 2,
                        weeklyTag: "개발",
                        monthlyTag: "ESM 프로젝트",
                        todayWork: "ERD 작성 및 테이블 구조 정의",
                        tomorrowWork: "인덱스 최적화 작업 예정",
                        achievement: "",
                        status: "completed",
                      })
                    }
                    className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded flex items-center gap-1"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    수정
                  </button>
                  <button className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded flex items-center gap-1">
                    <Trash2 className="w-3.5 h-3.5" />
                    삭제
                  </button>
                </div>
              </td>
            </tr>

            {/* Another Tag Group */}
            <tr className="bg-green-50">
              <td colSpan={7} className="px-4 py-2 font-medium text-gray-900">
                기획 (2시간 / 25%)
              </td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3">요구사항 정리</td>
              <td className="px-4 py-3">2시간 (25%)</td>
              <td className="px-4 py-3 text-sm text-gray-700">
                사용자 스토리 작성 및 검토
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">
                우선순위 정리 및 백로그 등록
              </td>
              <td className="px-4 py-3 text-sm text-gray-700"></td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      handleEdit({
                        title: "요구사항 정리",
                        hours: 2,
                        weeklyTag: "기획",
                        monthlyTag: "내부 업무",
                        todayWork: "사용자 스토리 작성 및 검토",
                        tomorrowWork: "우선순위 정리 및 백로그 등록",
                        achievement: "",
                        status: "completed",
                      })
                    }
                    className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded flex items-center gap-1"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    수정
                  </button>
                  <button className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded flex items-center gap-1">
                    <Trash2 className="w-3.5 h-3.5" />
                    삭제
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Another Report Card (Different Date) */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              2026-03-14 (금) | 총 투입시간: 7시간
            </h2>
          </div>
        </div>

        <table className="w-full">
          <thead className="bg-gray-200 border-b border-gray-300">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                주간 태그
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
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                어필한 성과
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                작업
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-blue-50">
              <td colSpan={7} className="px-4 py-2 font-medium text-gray-900">
                개발 (7시간 / 100%)
              </td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3">코드 리뷰 및 리팩토링</td>
              <td className="px-4 py-3">7시간 (100%)</td>
              <td className="px-4 py-3 text-sm text-gray-700">
                레거시 코드 개선 및 테스트 코드 작성
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">
                테스트 커버리지 확대 예정
              </td>
              <td className="px-4 py-3 text-sm text-gray-700"></td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      handleEdit({
                        title: "코드 리뷰 및 리팩토링",
                        hours: 7,
                        weeklyTag: "개발",
                        monthlyTag: "",
                        todayWork: "레거시 코드 개선 및 테스트 코드 작성",
                        tomorrowWork: "테스트 커버리지 확대 예정",
                        achievement: "",
                        status: "completed",
                      })
                    }
                    className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded flex items-center gap-1"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    수정
                  </button>
                  <button className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded flex items-center gap-1">
                    <Trash2 className="w-3.5 h-3.5" />
                    삭제
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
