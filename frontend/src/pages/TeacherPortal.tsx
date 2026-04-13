
import { BookOpen, Users, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockClasses } from '../data/mockData';

export const TeacherPortal = () => {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">Welcome back, Ato Solomon!</h2>
          <p className="text-blue-100 max-w-md">Your first class today is Grade 10A Mathematics starting in 15 minutes.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/attendance"
              className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-50 transition-colors"
            >
              Take Attendance
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/schedule"
              className="bg-blue-500/30 text-white border border-blue-400/30 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-500/50 transition-colors"
            >
              View Schedule
            </Link>
          </div>
        </div>
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <BookOpen size={200} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="bg-amber-50 text-amber-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <Users size={24} />
          </div>
          <p className="text-slate-500 text-sm font-medium">Total Students</p>
          <h3 className="text-2xl font-bold text-slate-800">87</h3>
          <p className="text-xs text-slate-400 mt-1">Across 2 active classes</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="bg-purple-50 text-purple-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <Calendar size={24} />
          </div>
          <p className="text-slate-500 text-sm font-medium">Classes Today</p>
          <h3 className="text-2xl font-bold text-slate-800">4</h3>
          <p className="text-xs text-slate-400 mt-1">Next: 10:00 AM</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="bg-emerald-50 text-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <Clock size={24} />
          </div>
          <p className="text-slate-500 text-sm font-medium">Weekly Hours</p>
          <h3 className="text-2xl font-bold text-slate-800">18</h3>
          <p className="text-xs text-slate-400 mt-1">Target: 22 hours</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-4">My Assigned Classes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockClasses.map((cls) => (
            <div key={cls.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-slate-100 p-4 rounded-2xl text-slate-600">
                  <Users size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{cls.name}</h4>
                  <p className="text-sm text-slate-500">{cls.students} Students</p>
                </div>
              </div>
              <Link
                to="/attendance"
                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
              >
                <ArrowRight size={24} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
