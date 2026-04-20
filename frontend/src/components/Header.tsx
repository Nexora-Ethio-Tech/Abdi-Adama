
import { Bell, Search, User, LogOut, Moon, Sun, Menu } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
}

export const Header = ({ title, onMenuClick }: HeaderProps) => {
  const { user, logout, selectedBranch, role } = useUser();
  const { theme, toggleTheme } = useTheme();
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
        <h1 className="text-lg md:text-xl font-black text-slate-900 dark:text-white tracking-tight truncate max-w-[150px] sm:max-w-none">{title}</h1>
        {selectedBranch && role === 'super-admin' && (
          <span className="hidden sm:inline-block bg-school-primary/10 text-school-primary px-3 py-1 rounded-full text-xs font-bold border border-school-primary/20">
            Branch: {selectedBranch.name}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        <div className="relative group hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 dark:text-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 outline-none w-48 xl:w-64"
          />
        </div>

        <button
          onClick={toggleTheme}
          className="p-2.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <button className="relative p-2.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all hidden sm:block">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-school-secondary rounded-full border-2 border-white dark:border-slate-900"></span>
        </button>

        <div className="flex items-center gap-3 md:pl-6 md:border-l border-slate-200 dark:border-slate-800 relative">
          <div className="flex items-center gap-2 md:gap-4 p-1">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black text-slate-900 dark:text-white leading-tight">{user?.name || 'Guest'}</p>
              <p className="text-[10px] font-bold text-school-primary uppercase tracking-widest">{role?.replace('-', ' ')}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-school-primary to-school-accent rounded-xl flex items-center justify-center text-white shadow-lg shadow-school-primary/20">
              <User size={20} />
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
            title="Sign Out"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};
