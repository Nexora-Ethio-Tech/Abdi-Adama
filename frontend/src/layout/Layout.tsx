
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { useUser } from '../context/UserContext';

export const Layout = () => {
  const location = useLocation();
  const { role } = useUser();

  const getTitle = (path: string) => {
    if (role === 'student') {
      switch (path) {
        case '/': return 'Student Dashboard';
        case '/courses': return 'My Courses';
        case '/attendance': return 'Attendance Record';
        case '/finance': return 'Fee Payments';
        default: return 'Student Portal';
      }
    }

    if (role === 'parent') {
      switch (path) {
        case '/': return 'Parental Dashboard';
        case '/students': return 'My Children';
        case '/finance': return 'Tuition & Fees';
        default: return 'Parent Portal';
      }
    }

    if (role === 'super-admin') {
      switch (path) {
        case '/': return 'Network Overview';
        case '/branches': return 'Branch Management';
        case '/analytics': return 'Global Analytics';
        case '/finance': return 'Group Financials';
        default: return 'Super Admin Console';
      }
    }

    switch (path) {
      case '/': return 'Dashboard Overview';
      case '/students': return 'Student Information System';
      case '/teachers': return 'Teacher Workstation';
      case '/attendance': return 'Attendance Tracking';
      case '/finance': return 'Financial Auditing';
      case '/settings': return 'System Settings';
      default: return 'Abdi Adama School IMS';
    }
  };

  if (role === 'parent') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <main className="p-4 md:p-8 max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header title={getTitle(location.pathname)} />
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
