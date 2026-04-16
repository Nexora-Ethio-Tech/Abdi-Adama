
import { useState } from 'react';
import { useUser, type UserRole } from '../context/UserContext';
import { StudentRegistration } from '../components/StudentRegistration';
import {
  GraduationCap,
  Users,
  ShieldCheck,
  BookOpen,
  Building2,
  ArrowRight,
  Sparkles,
  ChevronDown,
  LogIn
} from 'lucide-react';

export const LandingPage = () => {
  const { setRole } = useUser();
  const [showAdmission, setShowAdmission] = useState(false);

  const roles: { id: UserRole; label: string; icon: any; color: string }[] = [
    { id: 'super-admin', label: 'Super Admin', icon: Sparkles, color: 'bg-purple-500' },
    { id: 'school-admin', label: 'School Admin', icon: ShieldCheck, color: 'bg-blue-600' },
    { id: 'teacher', label: 'Teacher', icon: GraduationCap, color: 'bg-emerald-500' },
    { id: 'student', label: 'Student', icon: Users, color: 'bg-orange-500' },
    { id: 'parent', label: 'Parent', icon: BookOpen, color: 'bg-rose-500' },
    { id: 'finance-clerk', label: 'Finance', icon: Building2, color: 'bg-amber-500' },
    { id: 'librarian', label: 'Librarian', icon: BookOpen, color: 'bg-indigo-500' },
  ];

  if (showAdmission) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg text-white">
                <GraduationCap size={32} />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Abdi Adama Admission Portal</h1>
            </div>
            <button
              onClick={() => setShowAdmission(false)}
              className="text-slate-500 hover:text-blue-600 font-bold transition-colors"
            >
              ← Back to Main
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-1 shadow-xl border border-slate-100 dark:border-slate-800">
             <StudentRegistration isAdminView={false} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500">
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent z-0" />

        <div className="relative z-10 text-center px-4 space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm font-bold mb-4 animate-bounce">
            <Sparkles size={18} />
            Integrated School Management System
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tight">
            Abdi <span className="text-blue-600">Adama</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Empowering the next generation with modern education and seamless administration.
            Join our community today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button
              onClick={() => setShowAdmission(true)}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-blue-200 dark:shadow-none flex items-center justify-center gap-3 group"
            >
              Online Admission
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#portal"
              className="w-full sm:w-auto bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-slate-200 transition-all flex items-center justify-center gap-3"
            >
              Access Portal
              <ChevronDown />
            </a>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
           <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center p-1">
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-scroll" />
           </div>
        </div>
      </header>

      {/* Role Selection (Dummy Auth) */}
      <section id="portal" className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Unified Portal Access</h2>
            <p className="text-slate-500 dark:text-slate-400">Select your role to access your personalized workstation.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setRole(role.id)}
                className="group bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center"
              >
                <div className={`${role.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg`}>
                  <role.icon size={28} />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1 group-hover:text-blue-600 transition-colors">
                  {role.label}
                </h3>
                <div className="flex items-center justify-center gap-1 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-bold uppercase tracking-widest">Enter</span>
                  <LogIn size={12} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 dark:border-slate-800 text-center text-slate-400 text-sm">
        <div className="flex items-center justify-center gap-2 mb-4 font-bold text-slate-600 dark:text-slate-300">
           <GraduationCap className="text-blue-600" />
           Abdi Adama Integrated School © 2026
        </div>
        <p>Providing excellence in education since 2005.</p>
      </footer>
    </div>
  );
};
