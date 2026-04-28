
import { Bell, Search, User, LogOut, Moon, Sun, Menu, Calendar as CalendarIcon, X } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useStore } from '../context/useStore';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar } from '../pages/Calendar';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
}

export const Header = ({ title, onMenuClick }: HeaderProps) => {
  const { user, logout, selectedBranch, role } = useUser();
  const { isExamLockedDown } = useStore();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [showCalendar, setShowCalendar] = useState(false);

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('abdi_adama_language', lng);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
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

      <div className="flex items-center gap-1 md:gap-6">
        <div className={cn("relative group hidden sm:block", isExamLockedDown && "opacity-50 pointer-events-none")}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
          <input
            type="text"
            placeholder={t('header.search')}
            disabled={isExamLockedDown}
            className="pl-9 pr-4 py-1.5 bg-slate-100 dark:bg-slate-800 dark:text-slate-100 border-none rounded-full text-xs focus:ring-2 focus:ring-blue-500 outline-none w-32 md:w-48 xl:w-64"
          />
        </div>

        <select
          value={i18n.language}
          onChange={(e) => handleLanguageChange(e.target.value)}
          disabled={isExamLockedDown}
          className={cn("bg-transparent text-xs font-bold text-slate-600 dark:text-slate-300 outline-none cursor-pointer hover:text-school-primary transition-colors", isExamLockedDown && "opacity-50 cursor-not-allowed")}
        >
          <option value="en">EN</option>
          <option value="am">AM</option>
          <option value="om">OM</option>
        </select>

        <button
          onClick={toggleTheme}
          disabled={isExamLockedDown}
          className={cn("p-2.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all", isExamLockedDown && "opacity-50 cursor-not-allowed")}
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <button
          onClick={() => setShowCalendar(true)}
          disabled={isExamLockedDown}
          className={cn("p-2.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all", isExamLockedDown && "opacity-50 cursor-not-allowed")}
          title="Open Calendar"
        >
          <CalendarIcon size={20} />
        </button>

        <button
          disabled={isExamLockedDown}
          className={cn("relative p-2.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all", isExamLockedDown && "opacity-50 cursor-not-allowed")}
        >
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-school-secondary rounded-full border-2 border-white dark:border-slate-900"></span>
        </button>

        <div className="flex items-center gap-1 md:gap-3 md:pl-6 md:border-l border-slate-200 dark:border-slate-800 relative">
          <div className="flex items-center gap-1 md:gap-4 p-1">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black text-slate-900 dark:text-white leading-tight">{user?.name || t('header.guest')}</p>
              <p className="text-[10px] font-bold text-school-primary uppercase tracking-widest">{role?.replace('-', ' ')}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-school-primary to-school-accent rounded-xl flex items-center justify-center text-white shadow-lg shadow-school-primary/20">
              <User size={20} />
            </div>
          </div>

          <button
            onClick={handleLogout}
            disabled={isExamLockedDown}
            className={cn("p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all", isExamLockedDown && "opacity-50 cursor-not-allowed")}
            title="Sign Out"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>

    {showCalendar && (
      <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
        <div className="bg-slate-50 dark:bg-slate-950 w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl relative animate-in zoom-in-95 duration-300 border border-white/20">
          <button
            onClick={() => setShowCalendar(false)}
            className="absolute top-6 right-6 z-[110] p-3 bg-white dark:bg-slate-800 text-slate-500 hover:text-rose-500 rounded-2xl shadow-lg transition-all hover:scale-110 active:scale-95"
          >
            <X size={24} />
          </button>
          <div className="p-8 md:p-12">
            <Calendar />
          </div>
        </div>
      </div>
    )}
    </>
  );
};
