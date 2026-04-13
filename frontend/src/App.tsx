
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Students } from './pages/Students';
import { Teachers } from './pages/Teachers';
import { Finance } from './pages/Finance';
import { Branches } from './pages/Branches';
import { StudentPortal } from './pages/StudentPortal';
import { ParentPortal } from './pages/ParentPortal';
import { useUser } from './context/UserContext';

const Placeholder = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center h-[60vh]">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">{title}</h2>
      <p className="text-slate-500">This module is part of Phase 2/3 and will be fully implemented soon.</p>
    </div>
  </div>
);

function App() {
  const { role } = useUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Common Routes */}
          <Route index element={
            role === 'student' ? <StudentPortal /> :
            role === 'parent' ? <ParentPortal /> :
            <Dashboard />
          } />

          {/* Role specific routes */}
          {role === 'super-admin' && (
            <>
              <Route path="branches" element={<Branches />} />
              <Route path="analytics" element={<Placeholder title="Analytics" />} />
            </>
          )}

          {(role === 'school-admin' || role === 'super-admin') && (
            <>
              <Route path="students" element={<Students />} />
              <Route path="teachers" element={<Teachers />} />
              <Route path="attendance" element={<Placeholder title="Attendance Tracking" />} />
            </>
          )}

          {role === 'student' && (
            <>
              <Route path="courses" element={<Placeholder title="My Courses" />} />
              <Route path="attendance" element={<Placeholder title="My Attendance" />} />
            </>
          )}

          {role === 'parent' && (
            <>
              <Route path="students" element={<Students />} />
            </>
          )}

          <Route path="finance" element={<Finance />} />
          <Route path="settings" element={<Placeholder title="System Settings" />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
