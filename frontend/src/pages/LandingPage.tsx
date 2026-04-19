
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StudentRegistration } from '../components/StudentRegistration';
import { Chatbot } from '../components/Chatbot';
import { ShootingStars } from '../components/Effects';
import {
  GraduationCap,
  ArrowRight,
  Sparkles,
  ChevronDown,
  LogIn,
  UserPlus,
  ShieldAlert
} from 'lucide-react';

export const LandingPage = () => {
  const navigate = useNavigate();
  const [showAdmission, setShowAdmission] = useState(false);

  if (showAdmission) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-school-primary p-2 rounded-lg text-white">
                <GraduationCap size={32} />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Abdi Adama Admission Portal</h1>
            </div>
            <button
              onClick={() => setShowAdmission(false)}
              className="text-slate-500 hover:text-school-primary font-bold transition-colors"
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
        <div className="absolute inset-0 bg-gradient-to-br from-school-primary/10 to-transparent z-0" />
        <ShootingStars />

        <div className="relative z-10 text-center px-4 space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-school-primary/10 text-school-primary rounded-full text-sm font-bold mb-4 animate-bounce">
            <Sparkles size={18} />
            Integrated School Management System
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tight">
            Abdi <span className="text-school-primary">Adama</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Empowering the next generation with modern education and seamless administration.
            Join our community today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button
              onClick={() => setShowAdmission(true)}
              className="w-full sm:w-auto bg-school-primary hover:bg-school-primary/90 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-school-primary/20 flex items-center justify-center gap-3 group"
            >
              Online Admission
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-slate-200 transition-all flex items-center justify-center gap-3"
            >
              Access Portal
              <LogIn size={20} />
            </button>
          </div>

          <div className="pt-4">
             <button
               onClick={() => navigate('/register')}
               className="text-slate-500 hover:text-school-primary font-bold flex items-center justify-center gap-2 mx-auto transition-colors"
             >
               <UserPlus size={18} />
               Create an Account
             </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block text-slate-300">
           <ChevronDown size={32} />
        </div>
      </header>

      {/* Discrete Staff Link */}
      <footer className="py-12 border-t border-slate-100 dark:border-slate-800 text-center">
        <div className="flex items-center justify-center gap-2 mb-4 font-bold text-slate-600 dark:text-slate-300">
           <GraduationCap className="text-school-primary" />
           Abdi Adama Integrated School © 2026
        </div>
        <p className="text-slate-400 text-sm mb-6">Providing excellence in education since 2005.</p>

        <div className="flex justify-center">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 text-[10px] text-slate-300 hover:text-school-primary transition-colors uppercase tracking-widest font-bold grayscale hover:grayscale-0 opacity-50 hover:opacity-100"
          >
            <ShieldAlert size={12} />
            Staff Portal
          </button>
        </div>
      </footer>

      <Chatbot />
    </div>
  );
};
