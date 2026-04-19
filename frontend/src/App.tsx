
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
import { StudentCourses } from './pages/StudentCourses';
import { AcademicHistory } from './pages/AcademicHistory';
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
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { useUser, type UserRole } from './context/UserContext';
import { type ReactNode } from 'react';

const ProtectedRoute = ({ children, allowedRoles }: { children: ReactNode; allowedRoles?: UserRole[] }) => {
  const { user, role } = useUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function App() {
  const { role } = useUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!role ? <LandingPage /> : <Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={
            role === 'student' ? <StudentPortal /> :
            role === 'parent' ? <ParentPortal /> :
            role === 'teacher' ? <TeacherPortal /> :
            <Dashboard />
          } />

          {/* Role specific routes */}
          <Route path="analytics" element={
            <ProtectedRoute allowedRoles={['super-admin']}>
              <Analytics />
            </ProtectedRoute>
          } />

          <Route path="branches" element={
            <ProtectedRoute allowedRoles={['super-admin']}>
              <Branches />
            </ProtectedRoute>
          } />

          <Route path="students" element={
            <ProtectedRoute allowedRoles={['super-admin', 'school-admin', 'parent']}>
              <Students />
            </ProtectedRoute>
          } />

          <Route path="students/:id" element={
            <ProtectedRoute allowedRoles={['super-admin', 'school-admin']}>
              <StudentProfile />
            </ProtectedRoute>
          } />

          <Route path="teachers" element={
            <ProtectedRoute allowedRoles={['super-admin', 'school-admin']}>
              <Teachers />
            </ProtectedRoute>
          } />

          <Route path="attendance" element={
            <ProtectedRoute allowedRoles={['super-admin', 'school-admin', 'teacher', 'student']}>
              {role === 'teacher' ? <TeacherAttendance /> : role === 'student' ? <AcademicHistory /> : <Attendance />}
            </ProtectedRoute>
          } />

          <Route path="schedule-builder" element={
            <ProtectedRoute allowedRoles={['super-admin', 'school-admin']}>
              <ScheduleBuilder />
            </ProtectedRoute>
          } />

          <Route path="inventory" element={
            <ProtectedRoute allowedRoles={['super-admin', 'school-admin']}>
              <Inventory />
            </ProtectedRoute>
          } />

          <Route path="library" element={
            <ProtectedRoute allowedRoles={['super-admin', 'librarian']}>
              <Library />
            </ProtectedRoute>
          } />

          <Route path="courses" element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentCourses />
            </ProtectedRoute>
          } />

          <Route path="schedule" element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <TeacherSchedule />
            </ProtectedRoute>
          } />

          <Route path="grades" element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <GradeEntry />
            </ProtectedRoute>
          } />

          <Route path="finance" element={<Finance />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="exams" element={<Exams />} />
          <Route path="settings" element={<Settings />} />
          <Route path="exam/:examId" element={<ExamSession />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
