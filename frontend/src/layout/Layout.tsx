
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { Chatbot } from '../components/Chatbot';
import { useUser } from '../context/UserContext';
import { useState } from 'react';

export const Layout = () => {
  const location = useLocation();
  const { role } = useUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

    if (role === 'teacher') {
      switch (path) {
        case '/': return 'Teacher Portal';
        case '/attendance': return 'Student Attendance';
        case '/schedule': return 'My Teaching Schedule';
        default: return 'Teacher Workstation';
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

  const isExamPage = location.pathname.startsWith('/exam/');

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Sidebar Backdrop for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {role !== 'parent' && (
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          title={getTitle(location.pathname)}
          onMenuClick={() => setIsSidebarOpen(true)}
        />
        <main className={`p-4 md:p-8 ${role === 'parent' ? 'max-w-7xl mx-auto w-full' : ''}`}>
          <Outlet />
        </main>
        {!isExamPage && <Chatbot />}
      </div>
    </div>
  );
};
