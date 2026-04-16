
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Students } from './pages/Students';
import { Teachers } from './pages/Teachers';
import { Finance } from './pages/Finance';
import { Branches } from './pages/Branches';
import { StudentProfile } from './pages/StudentProfile';
import { Analytics } from './pages/Analytics';
import { StudentPortal } from './pages/StudentPortal';
import { ParentPortal } from './pages/ParentPortal';
import { TeacherPortal } from './pages/TeacherPortal';
import { TeacherAttendance } from './pages/TeacherAttendance';
import { TeacherSchedule } from './pages/TeacherSchedule';
import { GradeEntry } from './pages/GradeEntry';
import { ScheduleBuilder } from './pages/ScheduleBuilder';
import { Inventory } from './pages/Inventory';
import { Library } from './pages/Library';
import { Calendar } from './pages/Calendar';
import { Attendance } from './pages/Attendance';
import { Settings } from './pages/Settings';
import { ExamSession } from './pages/ExamSession';
import Exams from './pages/Exams';
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
            role === 'teacher' ? <TeacherPortal /> :
            role === 'librarian' ? <Dashboard /> :
            <Dashboard />
          } />

          {/* Role specific routes */}
          {role === 'super-admin' && (
            <>
              <Route path="branches" element={<Branches />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="library" element={<Library />} />
            </>
          )}

          {(role === 'school-admin' || role === 'super-admin') && (
            <>
              <Route path="students" element={<Students />} />
              <Route path="students/:id" element={<StudentProfile />} />
              <Route path="teachers" element={<Teachers />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="schedule-builder" element={<ScheduleBuilder />} />
              <Route path="inventory" element={<Inventory />} />
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

          {role === 'teacher' && (
            <>
              <Route path="attendance" element={<TeacherAttendance />} />
              <Route path="schedule" element={<TeacherSchedule />} />
              <Route path="grades" element={<GradeEntry />} />
            </>
          )}

          {role === 'librarian' && (
            <>
              <Route path="library" element={<Library />} />
            </>
          )}

          <Route path="finance" element={<Finance />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="exams" element={<Exams />} />
          <Route path="settings" element={<Settings />} />
          <Route path="exam/:examId" element={<ExamSession />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
