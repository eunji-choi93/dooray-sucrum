import { Outlet, useLocation } from 'react-router';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export default function Layout() {
  const location = useLocation();

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header at the top spanning full width */}
      <Header />
      
      {/* Sidebar and Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar currentPath={location.pathname} />
        
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}