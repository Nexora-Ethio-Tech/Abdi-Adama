
import { BookOpen, Award, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockExams } from '../data/examData';

export const StudentPortal = () => {
  const assignmentCount = mockExams.filter(e => e.category === 'Assignment').length;
  const examCount = mockExams.filter(e => e.category !== 'Assignment').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 md:p-10 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-black mb-3">Welcome back, Abebe!</h2>
          <p className="opacity-90 text-lg font-medium">Keep up the great work. You have <span className="underline decoration-wavy decoration-yellow-400 font-bold">{assignmentCount} assignments</span> and <span className="underline decoration-wavy decoration-emerald-400 font-bold">{examCount} exams</span> pending.</p>
        </div>
        <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12">
          <Award size={160} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="bg-orange-100 p-3 rounded-lg text-orange-600 w-fit mb-4">
            <BookOpen size={24} />
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Active Courses</h3>
          <p className="text-2xl font-bold text-slate-800 mt-1">6</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600 w-fit mb-4">
            <Clock size={24} />
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Attendance Rate</h3>
          <p className="text-2xl font-bold text-slate-800 mt-1">96%</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="bg-blue-100 p-3 rounded-lg text-blue-600 w-fit mb-4">
            <Award size={24} />
          </div>
          <h3 className="text-slate-500 text-sm font-medium">CGPA</h3>
          <p className="text-2xl font-bold text-slate-800 mt-1">92%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Today's Schedule</h3>
          <div className="space-y-4">
            {[
              { time: '08:00 AM', subject: 'Mathematics', room: 'Room 102' },
              { time: '10:00 AM', subject: 'Physics', room: 'Lab 1' },
              { time: '01:00 PM', subject: 'History', room: 'Room 204' },
            ].map((session, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100">
                <div className="text-xs md:text-sm font-bold text-blue-600 w-16 md:w-20 flex-shrink-0">{session.time}</div>
                <div>
                  <p className="text-sm font-medium text-slate-800">{session.subject}</p>
                  <p className="text-xs text-slate-500">{session.room}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Upcoming Deadlines</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border border-slate-100">
              <div>
                <p className="text-sm font-medium text-slate-800">Math Assignment 4</p>
                <p className="text-xs text-slate-500">Homework</p>
              </div>
              <div className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded">
                Tomorrow
              </div>
            </div>

            <Link
              to="/exam/math-101"
              className="flex items-center justify-between p-4 rounded-lg border border-blue-100 bg-blue-50/50 hover:bg-blue-50 transition-colors group"
            >
              <div>
                <p className="text-sm font-medium text-blue-900">Mathematics Mid-term</p>
                <p className="text-xs text-blue-600 font-semibold">Live Exam • 60 mins</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-blue-700">
                <span>Start Now</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <div className="flex items-center justify-between p-4 rounded-lg border border-slate-100 opacity-60">
              <div>
                <p className="text-sm font-medium text-slate-800">Physics Mid-term</p>
                <p className="text-xs text-slate-500">Exam</p>
              </div>
              <div className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded">
                Fri, Apr 18
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
