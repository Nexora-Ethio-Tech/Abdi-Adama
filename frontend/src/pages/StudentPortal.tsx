
import { BookOpen, Award, Clock, ArrowRight, Star, Trophy, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      {isWeekend() && (
        <div className="bg-gradient-to-br from-amber-500 via-orange-600 to-rose-700 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl shadow-amber-500/20 relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12 pointer-events-none">
            <Trophy size={200} />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="space-y-4 max-w-xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest">
                  <Star size={14} fill="currentColor" /> Weekend Special
                </div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">Vote Your Teacher of the Week!</h2>
                <p className="text-lg md:text-xl font-medium opacity-90">
                  Recognize excellence and help your favorite teacher earn reward points.
                </p>
              </div>

              <div className="flex-1">
                <div className="grid grid-cols-2 gap-4">
                  {mockTeachers.slice(0, 4).map((teacher) => (
                    <motion.button
                      key={teacher.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={!!votedTeacher}
                      onClick={() => handleVote(teacher.id)}
                      className={`p-4 rounded-3xl backdrop-blur-xl transition-all text-left relative group border-2 ${
                        votedTeacher === teacher.id
                          ? 'bg-white text-orange-600 border-white shadow-xl'
                          : 'bg-white/10 border-white/20 hover:bg-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm ${votedTeacher === teacher.id ? 'bg-orange-100 text-orange-600' : 'bg-white/20'}`}>
                          {teacher.name[0]}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-black truncate">{teacher.name}</p>
                          <p className={`text-[10px] font-bold uppercase tracking-widest opacity-70 ${votedTeacher === teacher.id ? 'text-orange-500' : 'text-white'}`}>{teacher.subjects[0]}</p>
                        </div>
                      </div>
                      {votedTeacher === teacher.id && (
                        <div className="absolute -top-2 -right-2 bg-emerald-500 text-white rounded-full p-1 shadow-lg">
                          <CheckCircle2 size={16} />
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>
                {votedTeacher && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mt-6 flex items-center justify-center gap-3 bg-emerald-500 text-white py-3 rounded-2xl font-black text-xs uppercase tracking-widest"
                  >
                    <CheckCircle2 size={18} />
                    Vote Cast Successfully!
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-10 text-slate-900 dark:text-white shadow-xl border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">Welcome back, Abebe!</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium max-w-2xl">
            You're doing amazing! You have <span className="text-blue-600 dark:text-blue-400 font-black decoration-wavy underline">{assignmentCount} assignments</span> and <span className="text-indigo-600 dark:text-indigo-400 font-black decoration-wavy underline">{examCount} exams</span> to conquer this week.
          </p>
        </div>
        <div className="absolute -bottom-10 -right-10 opacity-5 rotate-12 transition-transform group-hover:scale-110 duration-700">
          <Award size={240} className="text-blue-600" />
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
