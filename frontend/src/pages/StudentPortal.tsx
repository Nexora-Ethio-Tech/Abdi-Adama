
import { BookOpen, Award, Clock, ArrowRight, Star, Trophy, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockExams } from '../data/examData';
import { mockTeachers } from '../data/mockData';
import { useState } from 'react';

export const StudentPortal = () => {
  const assignmentCount = mockExams.filter(e => e.category === 'Assignment').length;
  const examCount = mockExams.filter(e => e.category !== 'Assignment').length;
  const [votedTeacher, setVotedTeacher] = useState<string | null>(null);

  const isWeekend = () => {
    // For demonstration, we assume today is a weekend
    return true;
  };

  const handleVote = (id: string) => {
    setVotedTeacher(id);
  };

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
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg text-orange-600 dark:text-orange-400 w-fit mb-4">
            <BookOpen size={24} />
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">Active Courses</h3>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">6</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-lg text-emerald-600 dark:text-emerald-400 w-fit mb-4">
            <Clock size={24} />
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">Attendance Rate</h3>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">96%</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg text-blue-600 dark:text-blue-400 w-fit mb-4">
            <Award size={24} />
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">CGPA</h3>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">92%</p>
        </div>
      </div>

      {isWeekend() && (
        <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-amber-100 dark:border-amber-900/30 shadow-xl shadow-amber-500/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Trophy size={120} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/50 text-amber-600 rounded-xl">
                <Star size={24} fill="currentColor" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Teacher of the Week</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">It's the weekend! Vote for your favorite teacher to reward them points.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockTeachers.slice(0, 4).map((teacher) => (
                <button
                  key={teacher.id}
                  disabled={!!votedTeacher}
                  onClick={() => handleVote(teacher.id)}
                  className={`p-4 rounded-2xl border transition-all text-left group relative ${
                    votedTeacher === teacher.id
                      ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
                      : 'bg-slate-50 border-slate-100 hover:border-blue-300 dark:bg-slate-800/50 dark:border-slate-700 dark:hover:border-blue-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center font-bold text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-700 shadow-sm">
                      {teacher.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-white">{teacher.name}</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase">{teacher.subjects[0]}</p>
                    </div>
                  </div>
                  {votedTeacher === teacher.id && (
                    <div className="absolute top-3 right-3 text-blue-600">
                      <CheckCircle2 size={20} />
                    </div>
                  )}
                </button>
              ))}
            </div>
            {votedTeacher && (
              <p className="mt-4 text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2 animate-in slide-in-from-left-2">
                <CheckCircle2 size={16} />
                Thank you for voting! Your teacher will be rewarded.
              </p>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6">Today's Schedule</h3>
          <div className="space-y-4">
            {[
              { time: '08:00 AM', subject: 'Mathematics', room: 'Room 102' },
              { time: '10:00 AM', subject: 'Physics', room: 'Lab 1' },
              { time: '01:00 PM', subject: 'History', room: 'Room 204' },
            ].map((session, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                <div className="text-xs md:text-sm font-bold text-blue-600 dark:text-blue-400 w-16 md:w-20 flex-shrink-0">{session.time}</div>
                <div>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{session.subject}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{session.room}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6">Upcoming Deadlines</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border border-slate-100 dark:border-slate-800">
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Math Assignment 4</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Homework</p>
              </div>
              <div className="text-xs font-bold text-orange-600 bg-orange-50 dark:bg-orange-900/30 px-2 py-1 rounded">
                Tomorrow
              </div>
            </div>

            <Link
              to="/exam/math-101"
              className="flex items-center justify-between p-4 rounded-lg border border-blue-100 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-900/20 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors group"
            >
              <div>
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Mathematics Mid-term</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">Live Exam • 60 mins</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-blue-700 dark:text-blue-300">
                <span>Start Now</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <div className="flex items-center justify-between p-4 rounded-lg border border-slate-100 dark:border-slate-800 opacity-60">
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Physics Mid-term</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Exam</p>
              </div>
              <div className="text-xs font-bold text-slate-600 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                Fri, Apr 18
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
