import { Search, HelpCircle, Settings, User } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

export function Header() {
  const [showTeamSettings, setShowTeamSettings] = useState(false);

  return (
    <header className="bg-blue-700 text-white px-4 py-2.5 flex items-center justify-between">
      {/* Left side - Logo */}
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-bold">Dooray! sucrum</h1>
      </div>
      
      {/* Center - Search */}
      <div className="flex-1 max-w-md mx-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="모든 업무"
            className="w-full bg-white text-gray-900 placeholder-gray-400 pl-10 pr-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
      
      {/* Right side - Icons */}
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-blue-600 rounded">
          <Search className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-blue-600 rounded">
          <HelpCircle className="w-5 h-5" />
        </button>
        
        {/* Team Settings Dropdown */}
        <div className="relative">
          <button 
            className="p-2 hover:bg-blue-600 rounded"
            onClick={() => setShowTeamSettings(!showTeamSettings)}
          >
            <Settings className="w-5 h-5" />
          </button>
          
          {showTeamSettings && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <Link
                to="/setting"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setShowTeamSettings(false)}
              >
                팀 정보 세팅
              </Link>
            </div>
          )}
        </div>
        
        <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center hover:bg-gray-100">
          <User className="w-5 h-5 text-blue-700" />
        </button>
      </div>
    </header>
  );
}