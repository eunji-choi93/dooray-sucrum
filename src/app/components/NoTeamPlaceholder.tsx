import { useNavigate } from 'react-router';

export default function NoTeamPlaceholder() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center">
      <span className="text-6xl mb-6" role="img" aria-label="손 흔들기">
        👋
      </span>
      <p className="text-gray-600 text-lg mb-8">
        팀을 먼저 생성하거나 팀원들에게 멤버등록을 요청하세요.
      </p>
      <button
        type="button"
        onClick={() => navigate('/setting')}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        팀 생성하기
      </button>
    </div>
  );
}
