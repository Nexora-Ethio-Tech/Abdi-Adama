
import { Bell, Search, User, Moon, Sun, Menu, LogOut, Fingerprint } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
}

export const Header = ({ title, onMenuClick }: HeaderProps) => {
  const { user, role, logout, selectedBranch } = useUser();
  const { theme, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="h-16 border-b border-slate-200/50 dark:border-slate-800/50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md flex items-center justify-between px-4 md:px-8 sticky top-0 z-20 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg lg:hidden"
          aria-label="Open Menu"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-lg md:text-xl font-semibold text-slate-800 dark:text-slate-100 truncate max-w-[150px] sm:max-w-none">{title}</h1>
        {selectedBranch && role === 'super-admin' && (
          <span className="hidden sm:inline-block bg-school-primary/10 text-school-primary px-3 py-1 rounded-full text-xs font-bold">
            Branch: {selectedBranch.name}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        <div className="relative group hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-school-primary transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 dark:text-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-school-primary outline-none w-48 xl:w-64"
          />
        </div>

        <button
          onClick={toggleTheme}
          className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <button className="relative p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors hidden sm:block">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-3 md:pl-6 md:border-l dark:border-slate-800 relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 md:gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 p-1 md:p-2 rounded-lg transition-colors"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{user?.name || 'User'}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{role?.replace('-', ' ')}</p>
            </div>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-school-primary/10 rounded-full flex items-center justify-center text-school-primary">
              <User size={20} className="md:w-6 md:h-6" />
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-2xl py-3 z-50">
              <div className="px-4 py-3 border-b border-slate-50 dark:border-slate-800 mb-2">
                <p className="text-sm font-bold text-slate-900 dark:text-white">{user?.name}</p>
                <div className="flex items-center gap-1.5 mt-1 text-slate-500">
                  <Fingerprint size={12} />
                  <p className="text-[10px] font-mono tracking-wider">{user?.digitalId}</p>
                </div>
              </div>

              <button
                className="w-full text-left px-4 py-2.5 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3 transition-colors"
                onClick={() => setShowUserMenu(false)}
              >
                <User size={18} />
                My Profile
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 transition-colors font-medium"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
