
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';

export const Layout = () => {
  const location = useLocation();

  const getTitle = (path: string) => {
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

  return (
    <div className="flex min-h-screen bg-slate-50">
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
