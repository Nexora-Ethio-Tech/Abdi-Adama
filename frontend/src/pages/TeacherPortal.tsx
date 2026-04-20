
import { BookOpen, Users, Calendar, ArrowRight, Award, ClipboardList, FileText, Star, ShieldCheck, CheckCircle, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockClasses, mockTeachers, mockWeeklyPlans } from '../data/mockData';
import { mockExams } from '../data/examData';
import { useState } from 'react';
import { useUser } from '../context/UserContext';

type TabType = 'overview' | 'plans' | 'dean';

export const TeacherPortal = () => {
  const { user } = useUser();
  const pendingAssignments = mockExams.filter(e => e.category === 'Assignment').length;
  const currentTeacher = mockTeachers.find(t => t.name.includes(user?.name || '')) || mockTeachers[0];
  const isDean = currentTeacher?.isDean;

  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [plans, setPlans] = useState(mockWeeklyPlans);

  const handleApprovePlan = (id: string, rating: number) => {
    setPlans(prev => prev.map(p => p.id === id ? { ...p, status: 'Approved', rating } : p));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 p-1 bg-slate-100 dark:bg-slate-800/50 rounded-[2rem] w-fit border border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all ${
            activeTab === 'overview' ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-md' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <LayoutDashboard size={18} />
          Overview
        </button>
        <button
          onClick={() => setActiveTab('plans')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all ${
            activeTab === 'plans' ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-md' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <FileText size={18} />
          Weekly Plans
        </button>
        {isDean && (
          <button
            onClick={() => setActiveTab('dean')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all ${
              activeTab === 'dean' ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-md' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <ShieldCheck size={18} />
            Dept. Plans Review
          </button>
        )}
      </div>

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

      {activeTab === 'overview' && (
        <>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
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
                <Award size={20} className="text-amber-500" />
                Quick Actions
              </h3>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm grid grid-cols-2 gap-4">
                 <Link to="/attendance" className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-bold text-sm flex flex-col items-center gap-2 hover:scale-105 transition-all">
                    <Users size={24} />
                    Take Attendance
                 </Link>
                 <Link to="/grades" className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 font-bold text-sm flex flex-col items-center gap-2 hover:scale-105 transition-all">
                    <Award size={24} />
                    Grade Entry
                 </Link>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'plans' && (
        <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-2xl">
                <FileText size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Weekly Plan Submission</h3>
                <p className="text-sm text-slate-500 font-medium">Draft and submit your academic plans for dean approval.</p>
              </div>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => { e.preventDefault(); setActiveTab('overview'); }}>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Week Number</label>
                <input required type="text" placeholder="e.g. Week 13" className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-purple-500 dark:focus:border-purple-400 rounded-2xl text-sm font-bold outline-none transition-all shadow-inner" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Plan Title</label>
                <input required type="text" placeholder="e.g. Advanced Thermodynamics" className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-purple-500 dark:focus:border-purple-400 rounded-2xl text-sm font-bold outline-none transition-all shadow-inner" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Description & Objectives</label>
                <textarea required rows={5} placeholder="Summary of what will be covered and learning outcomes..." className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-purple-500 dark:focus:border-purple-400 rounded-2xl text-sm font-bold outline-none transition-all shadow-inner resize-none" />
              </div>
              <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                <button type="button" onClick={() => setActiveTab('overview')} className="px-8 py-4 text-slate-500 font-bold hover:text-slate-700 transition-colors">Cancel</button>
                <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-purple-200 dark:shadow-none flex items-center gap-2 transition-all hover:scale-105 active:scale-95">
                  <CheckCircle size={20} />
                  Submit Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeTab === 'dean' && isDean && (
        <div className="max-w-5xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
           <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl">
             <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-purple-50/50 dark:bg-purple-900/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-600 text-white rounded-2xl shadow-lg shadow-purple-200 dark:shadow-none">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Department Plans Review</h3>
                    <p className="text-xs text-purple-600 dark:text-purple-400 font-bold uppercase tracking-widest">Natural Sciences Department</p>
                  </div>
                </div>
                <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-xl border border-purple-100 dark:border-purple-800 text-purple-600 dark:text-purple-400 text-xs font-black">
                   {plans.filter(p => p.status === 'Pending').length} Pending Review
                </div>
             </div>

             <div className="p-8 space-y-4">
              {plans.filter(p => p.teacherId !== currentTeacher.id).map((plan) => (
                <div key={plan.id} className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-purple-300 dark:hover:border-purple-700 transition-all">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-purple-600 dark:text-purple-400 uppercase tracking-widest bg-purple-100 dark:bg-purple-900/40 px-3 py-1 rounded-full">{plan.week}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-tighter ${
                        plan.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {plan.status}
                      </span>
                    </div>
                    <h4 className="text-lg font-black text-slate-800 dark:text-white mt-2">{plan.title}</h4>
                    <p className="text-sm text-slate-500 font-bold flex items-center gap-2">
                      <Users size={14} />
                      {plan.teacherName}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    {plan.status === 'Pending' ? (
                      <div className="flex items-center gap-1 p-2 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            onClick={() => handleApprovePlan(plan.id, star)}
                            className="p-2 hover:scale-125 transition-transform text-slate-300 hover:text-amber-400"
                          >
                            <Star size={20} />
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 px-6 py-3 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-2xl font-black">
                        <Star size={20} fill="currentColor" />
                        <span>{plan.rating}/5 RATING</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
             </div>
           </div>
        </div>
      )}
    </div>
  );
};
