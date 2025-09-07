import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

interface MenuItem {
  path: string;
  title: string;
  icon: string;
}

interface DashboardSidebarProps {
  items?: MenuItem[];
}

const DashboardSidebar = ({ items = [] }: DashboardSidebarProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="w-64 h-screen bg-[#0F1F17] text-white fixed left-0 top-0 flex flex-col border-r border-gray-800">
      {/* Logo and Title */}
      <div className="p-6 border-b border-gray-800">
        <Link to="/" className="flex items-center space-x-3">
          <Logo />
          <span className="text-xl font-bold">ChainTrack</span>
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        {items.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              isActive(item.path)
                ? 'bg-primary text-white'
                : 'text-gray-300 hover:bg-[#1F2937] hover:text-white'
            }`}
          >
            <span className="material-icons">{item.icon}</span>
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-800">
        <Link
          to="/settings"
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-[#1F2937] hover:text-white transition-colors"
        >
          <span className="material-icons">settings</span>
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default DashboardSidebar;
