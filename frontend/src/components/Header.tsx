
import { Bell, Search, User, ChevronDown, Moon, Sun } from 'lucide-react';
import { useUser, type UserRole } from '../context/UserContext';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export const Header = ({ title }: { title: string }) => {
  const { role, setRole, selectedBranch } = useUser();
  const { theme, toggleTheme } = useTheme();
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const roles: { val: UserRole; label: string }[] = [
    { val: 'super-admin', label: 'Super Admin' },
    { val: 'school-admin', label: 'School Admin' },
    { val: 'student', label: 'Student' },
    { val: 'parent', label: 'Parent' },
  ];

  return (
    <header className="h-16 border-b dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-8 sticky top-0 z-10 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100">{title}</h1>
        {selectedBranch && role === 'super-admin' && (
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
            Branch: {selectedBranch.name}
          </span>
        )}
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 dark:text-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64"
          />
        </div>

        <button
          onClick={toggleTheme}
          className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <button className="relative p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-6 border-l dark:border-slate-800 relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 p-2 rounded-lg transition-colors"
          >
            <div className="text-right">
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Admin User</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{role.replace('-', ' ')}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <User size={24} />
            </div>
            <ChevronDown size={16} className="text-slate-400" />
          </button>

          {showRoleMenu && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-lg py-2 z-50">
              <div className="px-4 py-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Switch Role
              </div>
              {roles.map((r) => (
                <button
                  key={r.val}
                  onClick={() => {
                    setRole(r.val);
                    setShowRoleMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    role === r.val
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
