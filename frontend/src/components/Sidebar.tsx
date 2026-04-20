
import { NavLink, useNavigate } from 'react-router-dom';
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
  ClipboardList,
  X,
  UserCog,
  HeartPulse
} from 'lucide-react';
import logo from '../assets/logo.jpg';
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
  const { role, logout, switchRole, schoolName } = useUser();
  const navigate = useNavigate();

  const displaySchoolName = schoolName.english;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getNavItems = () => {
    switch (role) {
      case 'super-admin':
        return [
          { icon: LayoutDashboard, label: 'Overview', path: '/' },
          { icon: Building2, label: 'Branches', path: '/branches' },
          { icon: UserSquare2, label: 'Teachers', path: '/teachers' },
          { icon: PieChart, label: 'Analytics', path: '/analytics' },
          { icon: Package, label: 'Inventory', path: '/inventory' },
          { icon: Wallet, label: 'Finance', path: '/finance' },
          { icon: HeartPulse, label: 'Parent Chats', path: '/clinic/chats' },
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
          { icon: Wallet, label: 'Finance', path: '/finance' },
          { icon: HeartPulse, label: 'Parent Chats', path: '/clinic/chats' },
          { icon: ClipboardList, label: 'Exams & Assignments', path: '/exams' },
          { icon: Settings, label: 'Settings', path: '/settings' },
        ];
      case 'teacher':
        return [
          { icon: LayoutDashboard, label: 'Teacher Portal', path: '/' },
          { icon: CalendarCheck, label: 'Attendance', path: '/attendance' },
          { icon: BookOpen, label: 'My Schedule', path: '/schedule' },
          { icon: ClipboardList, label: 'Exams & Assignments', path: '/exams' },
        ];
      case 'student':
        return [
          { icon: LayoutDashboard, label: 'My Dashboard', path: '/' },
          { icon: BookOpen, label: 'Grades & Courses', path: '/courses' },
          { icon: CalendarCheck, label: 'Academic History', path: '/attendance' },
          { icon: ClipboardList, label: 'Exams & Assignments', path: '/exams' },
        ];
      case 'parent':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
          { icon: Users, label: 'My Children', path: '/students' },
          { icon: HeartPulse, label: 'Clinic Support', path: '/clinic-chat' },
          { icon: ClipboardList, label: 'Exams & Assignments', path: '/exams' },
        ];
      case 'finance-clerk':
        return [
          { icon: LayoutDashboard, label: 'Overview', path: '/' },
          { icon: Wallet, label: 'Finance', path: '/finance' },
        ];
      case 'librarian':
        return [
          { icon: LayoutDashboard, label: 'Librarian Portal', path: '/' },
          { icon: BookOpen, label: 'Library', path: '/library' },
        ];
      case 'clinic-admin':
        return [
          { icon: LayoutDashboard, label: 'Clinic Dashboard', path: '/' },
          { icon: HeartPulse, label: 'Clinic Management', path: '/clinic' },
          { icon: HeartPulse, label: 'Parent Chats', path: '/clinic/chats' },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  const roles: { id: typeof role; label: string }[] = [
    { id: 'super-admin', label: 'Super Admin' },
    { id: 'school-admin', label: 'School Admin' },
    { id: 'teacher', label: 'Teacher' },
    { id: 'student', label: 'Student' },
    { id: 'parent', label: 'Parent' },
    { id: 'finance-clerk', label: 'Finance Clerk' },
    { id: 'librarian', label: 'Librarian' },
    { id: 'clinic-admin', label: 'Clinic Admin' },
  ];

  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-30 w-72 bg-slate-900 dark:bg-black text-white flex flex-col h-screen transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto border-r border-slate-800/50",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="p-8 mt-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative p-1 bg-white rounded-xl shadow-lg">
            <img src={logo} alt="Abdi Adama Logo" className="w-10 h-10 rounded-lg object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="font-black text-lg tracking-tight block truncate text-white">{displaySchoolName}</span>
            <span className="text-[10px] text-school-accent font-bold uppercase tracking-widest block truncate">Smart-School</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-slate-800 rounded-lg lg:hidden"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => {
              if (window.innerWidth < 1024) onClose();
            }}
            className={({ isActive }) => cn(
              "flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group",
              isActive
                ? "bg-school-primary text-white shadow-lg shadow-school-primary/20 scale-[1.02]"
                : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
            )}
          >
            {({ isActive }) => (
              <>
                <item.icon size={20} className={cn("transition-transform group-hover:scale-110", isActive ? "text-white" : "text-slate-500 group-hover:text-school-accent")} />
                <span className="font-bold text-sm tracking-wide">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-800/50 space-y-4">
        <div className="relative group/role">
          <div className="flex items-center gap-4 px-5 py-3 rounded-2xl bg-slate-800/30 text-slate-400 border border-slate-700/50">
            <UserCog size={20} className="text-school-accent" />
            <select
              value={role || ''}
              onChange={(e) => switchRole(e.target.value as any)}
              className="bg-transparent text-xs font-bold outline-none cursor-pointer w-full appearance-none"
            >
              {roles.map(r => (
                <option key={r.id} value={r.id || ''} className="bg-slate-900 text-white">
                  {r.label}
                </option>
              ))}
            </select>
          </div>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider ml-5 mt-2">Active Role</p>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-4 px-5 py-4 w-full text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 rounded-2xl transition-all duration-300 group"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold text-sm tracking-wide">Logout Session</span>
        </button>
      </div>
    </aside>
  );
};
