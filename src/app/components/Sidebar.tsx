import { 
  Calendar,
  Bell,
  Mail, 
  CalendarDays,
  Cloud, 
  FileText, 
  Users,
  Star,
  MoreHorizontal,
  Settings,
  Plus,
  ChevronRight,
  Edit
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { useTeam } from '../hooks/useTeam';
import { useUserName } from '../hooks/useUserName';
import NoTeamModal from './NoTeamModal';

interface SidebarProps {
  currentPath: string;
}

export function Sidebar({ currentPath }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showNoTeamModal, setShowNoTeamModal] = useState(false);
  const { hasTeam, teamData } = useTeam();
  const { userName } = useUserName();

  const isActive = (path: string) => currentPath === path;

  // 팀 미소속 시 Link 대신 모달을 띄우는 메뉴 아이템
  const MenuItem = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => {
    const baseClass = `w-full px-4 py-2 text-sm flex items-center justify-between`;
    const activeClass = isActive(to) ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50';

    if (!hasTeam) {
      return (
        <button onClick={() => setShowNoTeamModal(true)} className={`${baseClass} ${activeClass}`}>
          <div className="flex items-center gap-2">
            {icon}
            <span>{label}</span>
          </div>
        </button>
      );
    }

    return (
      <Link to={to} className={`${baseClass} ${activeClass}`}>
        <div className="flex items-center gap-2">
          {icon}
          <span>{label}</span>
        </div>
        {isActive(to) && <ChevronRight className="w-4 h-4" />}
      </Link>
    );
  };

  return (
    <div className="flex h-full bg-white border-r border-gray-200">
      {/* Icon Navigation */}
      <div className="w-12 bg-gray-100 flex flex-col items-center py-3 gap-1 border-r border-gray-200">
        <button className="w-10 h-10 flex items-center justify-center rounded text-gray-600 hover:bg-gray-200">
          <Calendar className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded text-gray-600 hover:bg-gray-200 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded text-gray-600 hover:bg-gray-200">
          <Mail className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded text-gray-600 hover:bg-gray-200">
          <CalendarDays className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded text-gray-600 hover:bg-gray-200">
          <Cloud className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded text-gray-600 hover:bg-gray-200">
          <FileText className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded text-gray-600 hover:bg-gray-200">
          <Users className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded text-gray-600 hover:bg-gray-200">
          <Star className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded text-gray-600 hover:bg-gray-200">
          <MoreHorizontal className="w-5 h-5" />
        </button>
        
        <div className="flex-1" />
        
        <button className="w-10 h-10 flex items-center justify-center rounded text-gray-600 hover:bg-gray-200">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Menu Panel */}
      {isExpanded && (
        <div className="w-56 bg-white flex flex-col">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="font-semibold text-gray-900">{userName}</p>
            <p className="text-xs text-gray-500 mt-0.5">
              소속된 팀: {hasTeam ? teamData?.name : '없음'}
            </p>
          </div>

          {/* Daily Scrum Button */}
          <div className="px-3 py-3 border-b border-gray-200">
            {hasTeam ? (
              <Link to="/">
                <button className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded ${
                  isActive('/')
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}>
                  <Edit className="w-4 h-4" />
                  <span className="text-sm font-medium">데일리 슈크럼 작성</span>
                </button>
              </Link>
            ) : (
              <button
                onClick={() => setShowNoTeamModal(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                <Edit className="w-4 h-4" />
                <span className="text-sm font-medium">데일리 슈크럼 작성</span>
              </button>
            )}
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto py-2">
            {/* 내 업무 보고 Section */}
            <div className="mb-3">
              <div className="px-4 py-1.5 text-xs text-gray-500 font-medium">내 업무 보고</div>
              <nav className="space-y-0.5">
                <MenuItem to="/reports/daily" icon={<FileText className="w-4 h-4" />} label="데일리 보고" />
                <MenuItem to="/reports/weekly" icon={<FileText className="w-4 h-4" />} label="주간 보고" />
                <MenuItem to="/reports/monthly" icon={<FileText className="w-4 h-4" />} label="월간 보고(GRM)" />
                <MenuItem to="/reports/review" icon={<Star className="w-4 h-4" />} label="성과 공유" />
              </nav>
            </div>

            {/* 팀 업무 보고 Section */}
            <div className="mb-3">
              <div className="px-4 py-1.5 text-xs text-gray-500 font-medium">팀 업무 보고</div>
              <nav className="space-y-0.5">
                <MenuItem to="/team/daily" icon={<FileText className="w-4 h-4" />} label="데일리 보고" />
                <MenuItem to="/team/weekly" icon={<FileText className="w-4 h-4" />} label="주간 보고" />
              </nav>
            </div>

            {/* Settings Section at bottom */}
            <div className="mt-auto pt-3 border-t border-gray-200">
              <Link 
                to="/setting"
                className={`w-full px-4 py-2 text-sm flex items-center justify-between ${
                  isActive('/setting')
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span>설정</span>
                </div>
                {isActive('/setting') && <ChevronRight className="w-4 h-4" />}
              </Link>
            </div>
          </div>
        </div>
      )}
      {showNoTeamModal && <NoTeamModal onClose={() => setShowNoTeamModal(false)} />}
    </div>
  );
}