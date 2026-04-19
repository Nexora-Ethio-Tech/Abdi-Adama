
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserSquare2,
  CalendarCheck,
  Wallet,
  Settings,
  LogOut,
  Building2,
  BookOpen,
  PieChart,
  Package,
  Calendar,
  ClipboardList,
  X
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useUser } from '../context/UserContext';
import logo from '../assets/logo.jpg';
import { useNavigate } from 'react-router-dom';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { role, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getNavItems = () => {
    switch (role) {
      case 'super-admin':
        return [
          { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
          { icon: Building2, label: 'Branches', path: '/dashboard/branches' },
          { icon: PieChart, label: 'Analytics', path: '/dashboard/analytics' },
          { icon: Package, label: 'Inventory', path: '/dashboard/inventory' },
          { icon: Wallet, label: 'Finance', path: '/dashboard/finance' },
          { icon: Calendar, label: 'Calendar', path: '/dashboard/calendar' },
          { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
        ];
      case 'school-admin':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
          { icon: Users, label: 'Students', path: '/dashboard/students' },
          { icon: UserSquare2, label: 'Teachers', path: '/dashboard/teachers' },
          { icon: CalendarCheck, label: 'Attendance', path: '/dashboard/attendance' },
          { icon: BookOpen, label: 'Schedule Builder', path: '/dashboard/schedule-builder' },
          { icon: Package, label: 'Inventory', path: '/dashboard/inventory' },
          { icon: Wallet, label: 'Finance', path: '/dashboard/finance' },
          { icon: Calendar, label: 'Calendar', path: '/dashboard/calendar' },
          { icon: ClipboardList, label: 'Exams & Assignments', path: '/dashboard/exams' },
          { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
        ];
      case 'teacher':
        return [
          { icon: LayoutDashboard, label: 'Teacher Portal', path: '/dashboard' },
          { icon: CalendarCheck, label: 'Attendance', path: '/dashboard/attendance' },
          { icon: BookOpen, label: 'My Schedule', path: '/dashboard/schedule' },
          { icon: Calendar, label: 'Calendar', path: '/dashboard/calendar' },
          { icon: ClipboardList, label: 'Exams & Assignments', path: '/dashboard/exams' },
        ];
      case 'student':
        return [
          { icon: LayoutDashboard, label: 'My Dashboard', path: '/dashboard' },
          { icon: BookOpen, label: 'Grades & Courses', path: '/dashboard/courses' },
          { icon: CalendarCheck, label: 'Academic History', path: '/dashboard/attendance' },
          { icon: Calendar, label: 'Calendar', path: '/dashboard/calendar' },
          { icon: ClipboardList, label: 'Exams & Assignments', path: '/dashboard/exams' },
        ];
      case 'parent':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
          { icon: Users, label: 'My Children', path: '/dashboard/students' },
          { icon: Calendar, label: 'Calendar', path: '/dashboard/calendar' },
          { icon: ClipboardList, label: 'Exams & Assignments', path: '/dashboard/exams' },
        ];
      case 'finance-clerk':
        return [
          { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
          { icon: Wallet, label: 'Finance', path: '/dashboard/finance' },
          { icon: Calendar, label: 'Calendar', path: '/dashboard/calendar' },
        ];
      case 'librarian':
        return [
          { icon: LayoutDashboard, label: 'Librarian Portal', path: '/dashboard' },
          { icon: BookOpen, label: 'Library', path: '/dashboard/library' },
          { icon: Calendar, label: 'Calendar', path: '/dashboard/calendar' },
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
          <img src={logo} alt="School Logo" className="w-10 h-10 rounded-lg shadow-lg" />
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
            end={item.path === '/dashboard'}
            onClick={() => {
              if (window.innerWidth < 1024) onClose();
            }}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
              isActive
                ? "bg-school-primary text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-red-400 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};
