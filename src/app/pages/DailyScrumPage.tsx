import { Plus, Trash2 } from 'lucide-react';

export default function DailyScrumPage() {
  return (
    <div className="p-6">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">데일리 슈크럼 작성</h1>
        <p className="text-sm text-gray-500 mt-1">오늘의 업무를 기록하세요</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
          동료 협업 기록
        </button>
        <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          내일 할 일
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">업무 링크</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">업무 제목</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">주간 태그*</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">월간 태그</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">한 일*</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">투입시간*</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">어필할 성과</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">작업</th>
            </tr>
          </thead>
          <tbody>
            {/* Sample Row */}
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3">
                <input 
                  type="text" 
                  placeholder="업무 링크 입력"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">두레이 업무의 링크 복사 버튼을 통해 붙여넣기</p>
              </td>
              <td className="px-4 py-3">
                <input 
                  type="text" 
                  placeholder="업무 제목"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-gray-50"
                  disabled
                />
              </td>
              <td className="px-4 py-3">
                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm">
                  <option>선택</option>
                  <option>개발</option>
                  <option>기획</option>
                  <option>디자인</option>
                </select>
              </td>
              <td className="px-4 py-3">
                <input 
                  type="text" 
                  value="ESM 프로젝트"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-gray-50"
                  disabled
                />
              </td>
              <td className="px-4 py-3">
                <textarea 
                  placeholder="오늘 한 일을 입력하세요"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  rows={2}
                />
              </td>
              <td className="px-4 py-3">
                <input 
                  type="number" 
                  placeholder="시간"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  min="1"
                  max="24"
                />
              </td>
              <td className="px-4 py-3">
                <button className="px-3 py-1.5 text-sm bg-orange-500 text-white rounded hover:bg-orange-600">
                  성과 입력
                </button>
              </td>
              <td className="px-4 py-3">
                <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        
        {/* Add Row Button */}
        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded">
            <Plus className="w-4 h-4" />
            <span className="text-sm">업무 추가</span>
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <button className="px-6 py-2.5 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium">
          저장
        </button>
      </div>
    </div>
  );
}
