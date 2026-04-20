
import { BookOpen, Users, Calendar, ArrowRight, Award, ClipboardList, FileText, Star, ShieldCheck, CheckCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockClasses, mockTeachers, mockWeeklyPlans } from '../data/mockData';
import { mockExams } from '../data/examData';
import { useState } from 'react';
import { useUser } from '../context/UserContext';

export const TeacherPortal = () => {
  const { user } = useUser();
  const pendingAssignments = mockExams.filter(e => e.category === 'Assignment').length;
  const currentTeacher = mockTeachers.find(t => t.name.includes(user?.name || '')) || mockTeachers[0];
  const isDean = currentTeacher?.isDean;

  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showDeanModal, setShowDeanModal] = useState(false);
  const [plans, setPlans] = useState(mockWeeklyPlans);

  const handleApprovePlan = (id: string, rating: number) => {
    setPlans(prev => prev.map(p => p.id === id ? { ...p, status: 'Approved', rating } : p));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.name || 'Ato Solomon'}!</h2>
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
            <Link
              to="/grades"
              className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-white/20 transition-colors"
            >
              <Award size={18} />
              Grade Entry
            </Link>
          </div>
        </div>
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <BookOpen size={200} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <Users size={24} />
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Students</p>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">87</h3>
          <p className="text-xs text-slate-400 mt-1">Across 2 active classes</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <Calendar size={24} />
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Classes Today</p>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">4</h3>
          <p className="text-xs text-slate-400 mt-1">Next: 10:00 AM</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <ClipboardList size={24} />
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Active Assignments</p>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{pendingAssignments}</h3>
          <p className="text-xs text-slate-400 mt-1">Pending submissions</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <Star size={24} />
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Reward Points</p>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{currentTeacher?.rewardPoints || 0}</h3>
          <p className="text-xs text-slate-400 mt-1">Monthly total</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Users size={20} className="text-blue-600" />
            My Assigned Classes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockClasses.map((cls) => (
              <div key={cls.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between group hover:border-blue-500 transition-all">
                <div className="flex items-center gap-4">
                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl text-slate-600 dark:text-slate-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 transition-colors">
                    <Users size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white">{cls.name}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{cls.students} Students Enrolled</p>
                  </div>
                </div>
                <Link
                  to="/attendance"
                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-all"
                >
                  <ArrowRight size={24} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <FileText size={20} className="text-purple-600" />
            Weekly Planning
          </h3>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Submit your teaching plans for the upcoming week for dean review.
            </p>
            <button
              onClick={() => setShowPlanModal(true)}
              className="w-full bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <FileText size={18} />
              Submit Weekly Plan
            </button>
            {isDean && (
              <button
                onClick={() => setShowDeanModal(true)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-100 dark:shadow-none"
              >
                <ShieldCheck size={18} />
                Review Dept Plans
              </button>
            )}
          </div>
        </div>
      </div>

      {showPlanModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 w-full max-w-md overflow-hidden animate-in zoom-in duration-300">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
              <h3 className="font-bold text-slate-800 dark:text-white uppercase tracking-wider text-sm">Submit Weekly Plan</h3>
              <button onClick={() => setShowPlanModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setShowPlanModal(false); }}>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Week Number</label>
                <input required type="text" placeholder="e.g. Week 13" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Plan Title</label>
                <input required type="text" placeholder="e.g. Advanced Thermodynamics" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Description & Objectives</label>
                <textarea required rows={4} placeholder="Summary of what will be covered..." className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-200 dark:shadow-none flex items-center justify-center gap-2">
                <CheckCircle size={18} />
                <span>Submit to Dean</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {showDeanModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 w-full max-w-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-purple-50/50 dark:bg-purple-900/20">
              <div className="flex items-center gap-3 text-purple-700 dark:text-purple-300">
                <ShieldCheck size={20} />
                <h3 className="font-bold uppercase tracking-wider text-sm">Department Plans Review</h3>
              </div>
              <button onClick={() => setShowDeanModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
              {plans.filter(p => p.teacherId !== currentTeacher.id).map((plan) => (
                <div key={plan.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-black text-purple-600 dark:text-purple-400 uppercase tracking-widest">{plan.week}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        plan.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {plan.status}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-800 dark:text-white">{plan.title}</h4>
                    <p className="text-xs text-slate-500 font-medium">By {plan.teacherName}</p>
                  </div>
                  {plan.status === 'Pending' ? (
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          onClick={() => handleApprovePlan(plan.id, star)}
                          className="p-1 hover:scale-125 transition-transform text-amber-400"
                        >
                          <Star size={16} />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star size={16} fill="currentColor" />
                      <span className="text-sm font-black">{plan.rating}/5</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setShowDeanModal(false)}
                className="px-6 py-2 bg-slate-800 dark:bg-slate-700 text-white rounded-xl text-sm font-bold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
