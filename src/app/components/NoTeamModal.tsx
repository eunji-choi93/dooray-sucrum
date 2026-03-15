import { useNavigate } from 'react-router';

interface NoTeamModalProps {
  onClose: () => void;
}

export default function NoTeamModal({ onClose }: NoTeamModalProps) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm flex flex-col gap-4 text-center">
        <span className="text-4xl" role="img" aria-label="안내">
          👋
        </span>
        <p className="text-sm text-gray-700">
          팀을 먼저 생성하거나 팀원들에게 멤버등록을 요청하세요.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            취소
          </button>
          <button
            onClick={() => {
              onClose();
              navigate('/setting');
            }}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            팀 생성하기
          </button>
        </div>
      </div>
    </div>
  );
}
