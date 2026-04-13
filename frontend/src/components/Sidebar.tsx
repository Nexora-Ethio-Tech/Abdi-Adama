
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserSquare2,
  CalendarCheck,
  Wallet,
  Settings,
  LogOut,
  GraduationCap,
  Building2,
  BookOpen,
  PieChart
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useUser } from '../context/UserContext';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Sidebar = () => {
  const { role } = useUser();

  const getNavItems = () => {
    switch (role) {
      case 'super-admin':
        return [
          { icon: LayoutDashboard, label: 'Overview', path: '/' },
          { icon: Building2, label: 'Branches', path: '/branches' },
          { icon: PieChart, label: 'Analytics', path: '/analytics' },
          { icon: Wallet, label: 'Finance', path: '/finance' },
          { icon: Settings, label: 'Settings', path: '/settings' },
        ];
      case 'school-admin':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
          { icon: Users, label: 'Students', path: '/students' },
          { icon: UserSquare2, label: 'Teachers', path: '/teachers' },
          { icon: CalendarCheck, label: 'Attendance', path: '/attendance' },
          { icon: BookOpen, label: 'Schedule Builder', path: '/schedule-builder' },
          { icon: Wallet, label: 'Finance', path: '/finance' },
          { icon: Settings, label: 'Settings', path: '/settings' },
        ];
      case 'student':
        return [
          { icon: LayoutDashboard, label: 'My Dashboard', path: '/' },
          { icon: BookOpen, label: 'My Courses', path: '/courses' },
          { icon: CalendarCheck, label: 'Academic History', path: '/attendance' },
        ];
      case 'parent':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
          { icon: Users, label: 'My Children', path: '/students' },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <aside className="w-64 bg-slate-900 dark:bg-black text-white flex flex-col h-screen sticky top-0 transition-colors duration-300">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-lg">
          <GraduationCap size={24} />
        </div>
        <span className="font-bold text-xl tracking-tight">Abdi Adama</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
              isActive
                ? "bg-blue-600 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-white transition-colors">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};
