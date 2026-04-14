
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
  PieChart,
  X
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useUser } from '../context/UserContext';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { role } = useUser();

  const getNavItems = () => {
    switch (role) {
      case 'super-admin':
        return [
          { icon: LayoutDashboard, label: 'Overview', path: '/' },
          { icon: Building2, label: 'Branches', path: '/branches' },
          { icon: PieChart, label: 'Analytics', path: '/analytics' },
          { icon: Package, label: 'Inventory', path: '/inventory' },
          { icon: BookOpen, label: 'Library', path: '/library' },
          { icon: Wallet, label: 'Finance', path: '/finance' },
          { icon: Calendar, label: 'Calendar', path: '/calendar' },
          { icon: Settings, label: 'Settings', path: '/settings' },
        ];
      case 'school-admin':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
          { icon: Users, label: 'Students', path: '/students' },
          { icon: UserSquare2, label: 'Teachers', path: '/teachers' },
          { icon: CalendarCheck, label: 'Attendance', path: '/attendance' },
          { icon: BookOpen, label: 'Schedule Builder', path: '/schedule-builder' },
          { icon: Package, label: 'Inventory', path: '/inventory' },
          { icon: BookOpen, label: 'Library', path: '/library' },
          { icon: Wallet, label: 'Finance', path: '/finance' },
          { icon: Calendar, label: 'Calendar', path: '/calendar' },
          { icon: Settings, label: 'Settings', path: '/settings' },
        ];
      case 'teacher':
        return [
          { icon: LayoutDashboard, label: 'Teacher Portal', path: '/' },
          { icon: CalendarCheck, label: 'Attendance', path: '/attendance' },
          { icon: BookOpen, label: 'My Schedule', path: '/schedule' },
          { icon: Calendar, label: 'Calendar', path: '/calendar' },
        ];
      case 'student':
        return [
          { icon: LayoutDashboard, label: 'My Dashboard', path: '/' },
          { icon: BookOpen, label: 'My Courses', path: '/courses' },
          { icon: CalendarCheck, label: 'Academic History', path: '/attendance' },
          { icon: Calendar, label: 'Calendar', path: '/calendar' },
        ];
      case 'parent':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
          { icon: Users, label: 'My Children', path: '/students' },
          { icon: Calendar, label: 'Calendar', path: '/calendar' },
        ];
      case 'finance-clerk':
        return [
          { icon: LayoutDashboard, label: 'Overview', path: '/' },
          { icon: Wallet, label: 'Finance', path: '/finance' },
          { icon: Calendar, label: 'Calendar', path: '/calendar' },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 dark:bg-black text-white flex flex-col h-screen transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <GraduationCap size={24} />
          </div>
          <span className="font-bold text-xl tracking-tight">Abdi Adama</span>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-slate-800 rounded-lg lg:hidden"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => {
              if (window.innerWidth < 1024) onClose();
            }}
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
