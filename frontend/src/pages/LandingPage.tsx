
import { Link } from 'react-router-dom';
import { Chatbot } from '../components/Chatbot';
import { ShootingStars } from '../components/Effects';
import logo from '../assets/logo.jpg';
import {
  GraduationCap,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  Sparkles,
  School,
  FileText
} from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500">
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-school-primary/10 to-transparent z-0" />
        <ShootingStars />

        <div className="relative z-10 text-center px-4 space-y-6 max-w-4xl">
          <div className="flex justify-center mb-8 floating">
             <div className="bg-white dark:bg-slate-900 p-4 rounded-full shadow-2xl border border-slate-100 dark:border-slate-800">
                <School size={64} className="text-[#0076BA]" />
             </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-[#0076BA] dark:text-blue-400 rounded-full text-sm font-bold mb-4 animate-pulse">
            <Sparkles size={18} />
            Abdi Adama Smart-School ERP
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tight">
            Abdi <span className="text-[#0076BA]">Adama</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Empowering the next generation with modern education and seamless administration.
            Your gateway to academic excellence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link
              to="/signup"
              className="w-full sm:w-auto bg-[#0076BA] hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-blue-200 dark:shadow-none flex items-center justify-center gap-3 group"
            >
              Apply for Admission
              <FileText className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-3 group"
            >
              Student & Parent Portal
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
           <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center p-1">
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-scroll" />
           </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Why Abdi Adama?</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Discover the features that make our school a leader in modern education.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Digital ID Ready', desc: 'Secure login using your national digital ID for seamless access.', icon: ShieldCheck, color: 'bg-blue-600' },
              { title: 'Real-time Progress', desc: 'Track grades, attendance, and performance in real-time.', icon: GraduationCap, color: 'bg-[#C16266]' },
              { title: 'Resource Hub', desc: 'Access library books, course materials, and schedules anywhere.', icon: BookOpen, color: 'bg-emerald-500' },
            ].map((feature, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className={`${feature.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}>
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-slate-400 text-sm mb-6">Providing excellence in education since 2005.</p>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 dark:border-slate-800 text-center text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-slate-600 dark:text-slate-300">
             <GraduationCap className="text-[#0076BA]" />
             Abdi Adama Integrated School © 2026
          </div>
          <p>Providing excellence in education since 2005.</p>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 w-full flex justify-center">
            <Link to="/login" className="text-slate-400 hover:text-[#0076BA] transition-colors text-xs font-medium uppercase tracking-widest">
              Staff Portal Access
            </Link>
          </div>
        </div>
      </footer>

      <Chatbot />
    </div>
  );
};
