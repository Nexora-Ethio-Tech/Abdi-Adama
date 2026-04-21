
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import { Attendance } from './pages/Attendance';
import { Settings } from './pages/Settings';
import { ExamSession } from './pages/ExamSession';
import Exams from './pages/Exams';
import { Clinic } from './pages/Clinic';
import { ParentClinicChat } from './pages/ParentClinicChat';
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { useUser, type UserRole } from './context/UserContext';
import { type ReactNode } from 'react';

const ProtectedRoute = ({
  children,
  allowedRoles
}: {
  children: ReactNode;
  allowedRoles?: UserRole[]
}) => {
  const { user, role } = useUser();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role as UserRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { user, role } = useUser();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {!user ? (
          <>
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <Route path="/" element={<Layout />}>
            <Route index element={
              role === 'student' ? <StudentPortal /> :
              role === 'parent' ? <ParentPortal /> :
              role === 'teacher' ? <TeacherPortal /> :
              role === 'librarian' ? <Dashboard /> :
              <Dashboard />
            } />

            {/* Role specific routes */}
            <Route path="branches" element={
              <ProtectedRoute allowedRoles={['super-admin']}>
                <Branches />
              </ProtectedRoute>
            } />
            <Route path="analytics" element={
              <ProtectedRoute allowedRoles={['super-admin']}>
                <Analytics />
              </ProtectedRoute>
            } />

            <Route path="students" element={
              <ProtectedRoute allowedRoles={['school-admin', 'super-admin', 'parent']}>
                <Students />
              </ProtectedRoute>
            } />
            <Route path="students/:id" element={
              <ProtectedRoute allowedRoles={['school-admin', 'super-admin']}>
                <StudentProfile />
              </ProtectedRoute>
            } />

            <Route path="teachers" element={
              <ProtectedRoute allowedRoles={['school-admin', 'super-admin']}>
                <Teachers />
              </ProtectedRoute>
            } />

            <Route path="attendance" element={
              <ProtectedRoute allowedRoles={['school-admin', 'super-admin', 'teacher', 'student']}>
                 {role === 'teacher' ? <TeacherAttendance /> :
                  role === 'student' ? <AcademicHistory /> :
                  <Attendance />}
              </ProtectedRoute>
            } />

            <Route path="schedule-builder" element={
              <ProtectedRoute allowedRoles={['school-admin', 'super-admin']}>
                <ScheduleBuilder />
              </ProtectedRoute>
            } />

            <Route path="inventory" element={
              <ProtectedRoute allowedRoles={['school-admin', 'super-admin']}>
                <Inventory />
              </ProtectedRoute>
            } />

            <Route path="library" element={
              <ProtectedRoute allowedRoles={['librarian', 'super-admin']}>
                <Library />
              </ProtectedRoute>
            } />

            <Route path="clinic" element={
              <ProtectedRoute allowedRoles={['clinic-admin', 'super-admin']}>
                <Clinic />
              </ProtectedRoute>
            } />

            <Route path="clinic-chat" element={
              <ProtectedRoute allowedRoles={['parent']}>
                <ParentClinicChat />
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
            <Route path="exams" element={<Exams />} />
            <Route path="settings" element={<Settings />} />
            <Route path="exam/:examId" element={<ExamSession />} />

            {/* Catch-all within layout */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
