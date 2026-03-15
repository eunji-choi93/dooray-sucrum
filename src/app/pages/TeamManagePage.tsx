import { Plus, Trash2, Edit2, ArrowRight, Info, Upload, FileText, X, Users } from "lucide-react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { useTeam } from "../hooks/useTeam";
import { useUserName } from "../hooks/useUserName";

interface TeamMember {
  id: string;
  name: string;
  role: "admin" | "member";
  isMe: boolean;
}

interface WeeklyTag {
  id: string;
  name: string;
}

interface MonthlyTag {
  id: string;
  name: string;
  weeklyTags: WeeklyTag[];
}

let nextId = 100;
function generateId() {
  return String(nextId++);
}

interface TemplateFile {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
}

function WeeklyReportTemplate() {
  const [template, setTemplate] = useState<TemplateFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setTemplate({
      id: generateId(),
      name: file.name,
      size: file.size < 1024 ? `${file.size}B` : `${(file.size / 1024).toFixed(1)}KB`,
      uploadedAt: new Date().toLocaleDateString('ko-KR'),
    });
    // input 초기화
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemove = () => {
    setTemplate(null);
  };

  return (
    <div className="mb-6 bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-base font-semibold text-gray-900 mb-4">
        주간보고 템플릿 관리
      </h2>

      {template ? (
        <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">{template.name}</p>
              <p className="text-xs text-gray-500">{template.size} · {template.uploadedAt} 업로드</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
            >
              변경
            </button>
            <button
              onClick={handleRemove}
              className="rounded p-1.5 text-red-600 hover:bg-red-50"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-gray-300 py-8 text-gray-400 transition-colors hover:border-blue-400 hover:text-blue-500"
        >
          <Upload className="h-8 w-8" />
          <p className="text-sm font-medium">클릭하여 템플릿 파일을 업로드하세요</p>
          <p className="text-xs">.xlsx, .xls, .csv 파일 지원</p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={handleUpload}
        className="hidden"
      />

      <div className="mt-3 flex items-center gap-2 rounded-lg bg-gray-50 border border-gray-200 px-3 py-2.5">
        <Info className="h-4 w-4 flex-shrink-0 text-gray-500" />
        <p className="text-xs text-gray-600">
          {template
            ? "업로드한 템플릿이 주간보고 생성 시 적용됩니다."
            : "템플릿이 등록되지 않으면 기본 템플릿으로 주간보고가 생성됩니다."}
        </p>
      </div>
    </div>
  );
}

function TeamCreateSection() {
  const { setTeamData } = useTeam();
  const { userName } = useUserName();
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState("");

  const handleCreate = () => {
    const trimmed = teamName.trim();
    if (!trimmed) return;
    setTeamData({ name: trimmed, members: [userName] });
    navigate('/');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">설정</h1>
      </div>

      {/* 탭 - 팀 설정만 */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex gap-6">
          <button className="pb-3 px-1 font-medium text-sm border-b-2 border-blue-600 text-blue-600">
            팀 설정
          </button>
        </div>
      </div>

      {/* 팀 생성 영역 */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">새 팀 생성</h2>
          <p className="text-sm text-gray-500">
            팀을 생성하고 멤버를 초대하여 슈크럼을 시작하세요.
          </p>
        </div>

        <div className="max-w-sm mx-auto space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              팀 이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="예: FE파트, 백엔드팀"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleCreate(); }}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              autoFocus
            />
          </div>
          <button
            onClick={handleCreate}
            disabled={!teamName.trim()}
            className="w-full px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            팀 생성하기
          </button>
        </div>

        <div className="flex items-start gap-2 mt-6 bg-yellow-50 rounded-lg p-3 border border-yellow-200 max-w-sm mx-auto">
          <Info className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-yellow-800">
            [프로토타입] 팀 생성 시 현재 사용자가 관리자로 등록됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TeamManagePage() {
  const { hasTeam } = useTeam();
  const [activeTab, setActiveTab] = useState<"team" | "general">("team");

  const [members, setMembers] = useState<TeamMember[]>([
    { id: "1", name: "최겸준", role: "admin", isMe: true },
  ]);
  const [newMemberName, setNewMemberName] = useState("");

  const addMember = () => {
    const trimmed = newMemberName.trim();
    if (!trimmed) return;
    setMembers((prev) => [
      ...prev,
      { id: generateId(), name: trimmed, role: "member", isMe: false },
    ]);
    setNewMemberName("");
  };

  const removeMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const [monthlyTags, setMonthlyTags] = useState<MonthlyTag[]>([
    {
      id: "1",
      name: "ESM 프로젝트",
      weeklyTags: [
        { id: "11", name: "백엔드 개발" },
        { id: "12", name: "프론트엔드 개발" },
        { id: "13", name: "QA 테스트" },
      ],
    },
    {
      id: "2",
      name: "내부 업무",
      weeklyTags: [{ id: "21", name: "회의 및 기획" }],
    },
  ]);

  const addMonthlyTag = () => {
    setMonthlyTags((prev) => [
      ...prev,
      { id: generateId(), name: "", weeklyTags: [] },
    ]);
  };

  const removeMonthlyTag = (monthlyId: string) => {
    setMonthlyTags((prev) => prev.filter((t) => t.id !== monthlyId));
  };

  const updateMonthlyTagName = (monthlyId: string, name: string) => {
    setMonthlyTags((prev) =>
      prev.map((t) => (t.id === monthlyId ? { ...t, name } : t))
    );
  };

  const addWeeklyTag = (monthlyId: string) => {
    setMonthlyTags((prev) =>
      prev.map((t) =>
        t.id === monthlyId
          ? {
              ...t,
              weeklyTags: [...t.weeklyTags, { id: generateId(), name: "" }],
            }
          : t
      )
    );
  };

  const removeWeeklyTag = (monthlyId: string, weeklyId: string) => {
    setMonthlyTags((prev) =>
      prev.map((t) =>
        t.id === monthlyId
          ? {
              ...t,
              weeklyTags: t.weeklyTags.filter((w) => w.id !== weeklyId),
            }
          : t
      )
    );
  };

  const updateWeeklyTagName = (
    monthlyId: string,
    weeklyId: string,
    name: string
  ) => {
    setMonthlyTags((prev) =>
      prev.map((t) =>
        t.id === monthlyId
          ? {
              ...t,
              weeklyTags: t.weeklyTags.map((w) =>
                w.id === weeklyId ? { ...w, name } : w
              ),
            }
          : t
      )
    );
  };

  if (!hasTeam) {
    return <TeamCreateSection />;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">설정</h1>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab("team")}
            className={`pb-3 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === "team"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            팀 설정
          </button>
          <button
            onClick={() => setActiveTab("general")}
            className={`pb-3 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === "general"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            일반 설정
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "team" && (
        <div>
          {/* Team Name */}
          <div className="mb-6 bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-3">
              팀 정보
            </h2>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">
                  팀 이름:
                </span>
                <span className="text-base font-semibold text-gray-900">
                  ESM 개발팀
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">
                  관리자:
                </span>
                <span className="text-base text-gray-900">김철수</span>
              </div>
            </div>
          </div>

          {/* 새 팀원 등록 */}
          <div className="mb-6 bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-3">
              새 팀원 등록
            </h2>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="팀원 이름 입력"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addMember();
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={addMember}
                disabled={!newMemberName.trim()}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                등록
              </button>
            </div>
            <div className="flex items-start gap-2 mt-3 bg-yellow-50 rounded-lg p-3 border border-yellow-200">
              <Info className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-yellow-800">
                [프로토타입] 이름 입력으로 멤버를 생성합니다. 실서비스에서는
                Dooray API로 사원 정보를 조회합니다.
              </p>
            </div>
          </div>

          {/* 현재 팀원 목록 */}
          <div className="mb-6 bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-3">
              현재 팀원 ({members.length}명)
            </h2>
            <div className="space-y-2">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between py-2.5 px-3 rounded-lg border border-gray-100 bg-gray-50"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">
                      {member.name}
                    </span>
                    {member.role === "admin" && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                        관리자
                      </span>
                    )}
                    {member.isMe && (
                      <span className="text-xs text-gray-500">(나)</span>
                    )}
                  </div>
                  <div>
                    {member.role === "admin" && member.isMe ? (
                      <span className="text-xs text-gray-400">
                        본인 관리자 권한은 해제할 수 없습니다
                      </span>
                    ) : (
                      <button
                        onClick={() => removeMember(member.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Schedule Settings */}
          <div className="mb-6 bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">
              주간 보고 시작/종료 요일 설정
            </h2>

            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    시작 요일 <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">선택</option>
                    <option value="1">월요일</option>
                    <option value="2">화요일</option>
                    <option value="3">수요일</option>
                    <option value="4">목요일</option>
                    <option value="5">금요일</option>
                  </select>
                </div>

                <div className="pb-2.5 px-2">
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    종료 요일 <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">선택</option>
                    <option value="1">월요일</option>
                    <option value="2">화요일</option>
                    <option value="3">수요일</option>
                    <option value="4">목요일</option>
                    <option value="5">금요일</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 mt-3 bg-blue-50 rounded-lg p-3 border border-blue-200">
              <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-blue-800">
                시작~종료가 정확히 일주일(7일)이 되어야 저장 가능합니다 (예:
                월요일~일요일, 수요일~화요일)
              </p>
            </div>
          </div>

          {/* Monthly Tags (ESM) */}
          <div className="mb-6 bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900">
                월간 태그 (ESM명)
              </h2>
              <button
                onClick={addMonthlyTag}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700"
              >
                <Plus className="w-4 h-4" />
                월간 태그 추가
              </button>
            </div>

            <div className="space-y-4">
              {monthlyTags.map((monthly) => (
                <div
                  key={monthly.id}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <input
                      type="text"
                      placeholder="월간 태그 이름 (ESM 프로젝트명)"
                      value={monthly.name}
                      onChange={(e) =>
                        updateMonthlyTagName(monthly.id, e.target.value)
                      }
                      autoFocus={monthly.name === ""}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeMonthlyTag(monthly.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* 주간 태그 */}
                  <div className="ml-4 space-y-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        주간 태그
                      </span>
                      <button
                        onClick={() => addWeeklyTag(monthly.id)}
                        className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        <Plus className="w-3 h-3" />
                        추가
                      </button>
                    </div>

                    {monthly.weeklyTags.map((weekly) => (
                      <div key={weekly.id} className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="주간 태그 이름"
                          value={weekly.name}
                          onChange={(e) =>
                            updateWeeklyTagName(
                              monthly.id,
                              weekly.id,
                              e.target.value
                            )
                          }
                          autoFocus={weekly.name === ""}
                          className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded"
                        />
                        <button
                          onClick={() => removeWeeklyTag(monthly.id, weekly.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}

                    {monthly.weeklyTags.length === 0 && (
                      <p className="text-xs text-gray-400 py-1">
                        주간 태그를 추가해주세요
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {monthlyTags.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-8">
                  월간 태그가 없습니다. 위의 버튼으로 추가해주세요.
                </p>
              )}
            </div>
          </div>

          {/* 주간보고 템플릿 관리 */}
          <WeeklyReportTemplate />

          {/* Save Button */}
          <div className="flex justify-end gap-3">
            <button className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 font-medium">
              취소
            </button>
            <button className="px-6 py-2.5 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium">
              저장
            </button>
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-blue-50 rounded-lg border border-blue-200 p-4">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">
              태그 설정 안내
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 월간 태그: ESM 프로젝트명 등 상위 그룹</li>
              <li>• 주간 태그: 월간 태그 하위의 세부 업무 분류</li>
              <li>• 주간 태그는 반드시 월간 태그에 속해야 합니다</li>
              <li>
                • 월간 태그가 있는데 주간 태그가 없으면 저장할 수 없습니다
              </li>
              <li>• 저장 시 기존 태그를 모두 삭제 후 다시 일괄 저장됩니다</li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === "general" && (
        <div>
          {/* 배치 기능 설정 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">
              배치 기능
            </h2>

            <div className="flex items-center justify-between py-3">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  배치 기능 활성화
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  자동 데이터 수집 및 보고서 생성 배치를 활성화합니다
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
