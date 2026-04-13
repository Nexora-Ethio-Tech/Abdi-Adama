
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

const Placeholder = ({ title, description }: { title: string; description?: string }) => (
  <div className="flex items-center justify-center h-[60vh]">
    <div className="text-center max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">{title}</h2>
      {description && <p className="text-slate-600 mb-4">{description}</p>}
      <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm inline-block">
        This module is part of Phase 2/3 and will be fully implemented soon.
      </div>
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
              <Route path="analytics" element={
                <Placeholder
                  title="Global Analytics"
                  description="View comprehensive graphs on income, expenses, and net profit across all school branches."
                />
              } />
            </>
          )}

          {(role === 'school-admin' || role === 'super-admin') && (
            <>
              <Route path="students" element={<Students />} />
              <Route path="teachers" element={<Teachers />} />
              <Route path="attendance" element={
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Missed Classes & Substitutions</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-rose-50 border border-rose-100 rounded-lg">
                        <div>
                          <p className="font-bold text-rose-800">10A - Mathematics</p>
                          <p className="text-sm text-rose-600">Ato Solomon is absent today.</p>
                        </div>
                        <button className="bg-white text-rose-600 px-4 py-2 rounded-lg text-sm font-bold shadow-sm border border-rose-200">
                          Assign Substitute
                        </button>
                      </div>
                    </div>
                  </div>
                  <Placeholder
                    title="Attendance Tracking"
                    description="Monitor student and teacher attendance, manage leave requests, and track daily presence."
                  />
                </div>
              } />
              <Route path="schedule-builder" element={
                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-8">
                  <h2 className="text-2xl font-bold text-slate-800">Schedule Maker & Constraints</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-slate-700 border-b pb-2">School Hours</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-slate-500 uppercase">Start Time</label>
                          <input type="time" className="w-full mt-1 p-2 bg-slate-50 border rounded-lg" defaultValue="08:00" />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-500 uppercase">End Time</label>
                          <input type="time" className="w-full mt-1 p-2 bg-slate-50 border rounded-lg" defaultValue="15:30" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-semibold text-slate-700 border-b pb-2">Breaks</h3>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <input type="text" className="flex-1 p-2 bg-slate-50 border rounded-lg" placeholder="Break Name" defaultValue="Morning Break" />
                          <input type="text" className="w-24 p-2 bg-slate-50 border rounded-lg" placeholder="Duration" defaultValue="20 min" />
                        </div>
                        <button className="text-blue-600 text-xs font-bold">+ Add Another Break</button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-700 border-b pb-2">Course Frequencies</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <span>Mathematics</span>
                        <select className="bg-transparent font-bold">
                          <option>5 sessions/week</option>
                          <option>4 sessions/week</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              } />
            </>
          )}

          {role === 'student' && (
            <>
              <Route path="courses" element={
                <Placeholder
                  title="My Courses"
                  description="Access your enrolled courses, view teacher information, and track your grades for each subject."
                />
              } />
              <Route path="attendance" element={
                <Placeholder
                  title="Academic History"
                  description="Review your previous courses and historical grade records."
                />
              } />
            </>
          )}

          {role === 'parent' && (
            <>
              <Route path="students" element={<Students />} />
            </>
          )}

          <Route path="finance" element={<Finance />} />
          <Route path="settings" element={
            <Placeholder
              title="System Settings"
              description="Configure school-wide preferences, manage user accounts, and update system constraints."
            />
          } />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
