
import { UserPlus, Calendar, Search, Filter, MoreVertical, DoorOpen, DoorClosed, Trophy, BarChart3, Star, Medal } from 'lucide-react';
import { mockTeachers, mockSchedules } from '../data/mockData';
import { useState } from 'react';

import { useUser } from '../context/UserContext';

export const Teachers = () => {
  const { role } = useUser();
  const isAdmin = role === 'school-admin' || role === 'super-admin';
  const [teachers, setTeachers] = useState(mockTeachers);
  const [viewingSchedule, setViewingSchedule] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'list' | 'leaderboard'>('list');
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);

  if (viewingSchedule) {
    const teacher = mockTeachers.find(t => t.id === viewingSchedule);
    const schedule = mockSchedules[viewingSchedule as keyof typeof mockSchedules] || [];

    return (
      <div className="space-y-6">
        <button
          onClick={() => setViewingSchedule(null)}
          className="text-blue-600 hover:underline font-medium"
        >
          ← Back to Teachers List
        </button>
        <div className="bg-white dark:bg-slate-900 p-4 md:p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Schedule for {teacher?.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {schedule.length > 0 ? (
              schedule.map((slot, i) => (
                <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <p className="text-blue-600 dark:text-blue-400 font-bold text-sm mb-1">{slot.day}</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{slot.time}</p>
                  <div className="mt-3 flex justify-between items-center text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Class: {slot.class}</span>
                    <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded font-medium">{slot.subject}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500 italic">No schedule set for this teacher yet.</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  const toggleInClass = (id: string) => {
    setTeachers(prev => prev.map(t =>
      t.id === id ? { ...t, isInClass: !t.isInClass } : t
    ));
  };

  const winners = [...mockTeachers]
    .map(t => ({
      ...t,
      average: t.performanceHistory ? t.performanceHistory.reduce((a, b) => a + b, 0) / t.performanceHistory.length : 0
    }))
    .sort((a, b) => b.average - a.average)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Teachers Management</h2>
          <p className="text-sm text-slate-500">Manage staff records, schedules, and performance tracking.</p>
        </div>
        <div className="flex items-center gap-2">
          {isAdmin && (
            <button
              onClick={() => setShowAnalysisModal(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm font-bold shadow-lg shadow-purple-100 dark:shadow-none"
            >
              <BarChart3 size={18} />
              <span>Semester Analysis</span>
            </button>
          )}
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm font-bold shadow-lg shadow-blue-100 dark:shadow-none">
            <UserPlus size={20} />
            <span>Approve New Teacher</span>
          </button>
        </div>
      </div>

      <div className="flex border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('list')}
          className={`px-6 py-3 text-sm font-bold transition-all border-b-2 ${
            activeTab === 'list'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Staff Directory
        </button>
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`px-6 py-3 text-sm font-bold transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'leaderboard'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Trophy size={16} />
          Teacher Leaderboard
        </button>
      </div>

      {activeTab === 'list' ? (
        <>
          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search teachers..."
                className="pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-64"
              />
            </div>
            <button className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">
              <Filter size={20} className="text-slate-600 dark:text-slate-400" />
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
              <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Teacher</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Subjects</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Schedule</th>
                  {isAdmin && <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Points</th>}
                  {!isAdmin && <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">In Class</th>}
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {teachers.map((teacher) => (
                  <tr key={teacher.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-700 dark:text-purple-300 font-bold text-sm">
                          {teacher.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{teacher.name}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">{teacher.branch} Campus • {teacher.department}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {teacher.subjects.map(s => (
                          <span key={s} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded text-[10px] font-medium">
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setViewingSchedule(teacher.id)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <Calendar size={14} />
                        View Schedule
                      </button>
                    </td>
                    {isAdmin && (
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <Star size={14} className="text-amber-500 fill-amber-500" />
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{teacher.rewardPoints}</span>
                        </div>
                      </td>
                    )}
                    {!isAdmin && (
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleInClass(teacher.id)}
                          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                            teacher.isInClass
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-rose-100 text-rose-700'
                          }`}
                        >
                          {teacher.isInClass ? <DoorOpen size={14} /> : <DoorClosed size={14} />}
                          <span>{teacher.isInClass ? 'IN CLASS' : 'OUT'}</span>
                        </button>
                      </td>
                    )}
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-slate-600 transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-800 dark:text-slate-100">Monthly Performance Rankings</h3>
            </div>
            <div className="p-6 space-y-4">
              {[...teachers].sort((a, b) => b.rewardPoints - a.rewardPoints).map((teacher, index) => (
                <div key={teacher.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      index === 0 ? 'bg-amber-100 text-amber-700' :
                      index === 1 ? 'bg-slate-200 text-slate-700' :
                      index === 2 ? 'bg-orange-100 text-orange-700' :
                      'bg-slate-100 text-slate-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{teacher.name}</p>
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-tight">{teacher.department}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <Star size={14} className="text-amber-500 fill-amber-500" />
                      <span className="text-lg font-black text-slate-800 dark:text-slate-100">{teacher.rewardPoints}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Reward Points</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl text-white shadow-xl">
              <Trophy size={40} className="mb-4 opacity-50" />
              <h4 className="text-lg font-bold mb-2">Rewards System</h4>
              <p className="text-sm text-blue-100 leading-relaxed">
                Points are earned through:
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Teacher of the Week (Student Votes)</li>
                  <li>Weekly Plan Ratings (Dean Review)</li>
                  <li>Early Arrival Rewards</li>
                </ul>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-[10px] uppercase font-black tracking-widest text-blue-300">Deductions</p>
                  <p className="text-xs mt-1">Absences or late arrivals will result in point deductions.</p>
                </div>
              </p>
            </div>
          </div>
        </div>
      )}

      {showAnalysisModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 w-full max-w-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-8 text-center bg-gradient-to-b from-purple-50/50 to-transparent dark:from-purple-900/20">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trophy size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Academic Semester Winners</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-2">Top performers based on monthly averages and evaluations.</p>
            </div>

            <div className="p-8 grid grid-cols-3 gap-4">
              {winners.map((winner, index) => (
                <div key={winner.id} className={`p-6 rounded-2xl border flex flex-col items-center text-center relative ${
                  index === 0 ? 'bg-amber-50 border-amber-200 ring-4 ring-amber-100 dark:bg-amber-900/20 dark:border-amber-800 dark:ring-amber-900/10' :
                  'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700'
                }`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold mb-4 ${
                    index === 0 ? 'bg-amber-500 text-white' :
                    index === 1 ? 'bg-slate-400 text-white' :
                    'bg-orange-400 text-white'
                  }`}>
                    <Medal size={24} />
                  </div>
                  <p className="font-bold text-slate-800 dark:text-white text-sm line-clamp-1">{winner.name}</p>
                  <p className="text-[10px] text-slate-500 uppercase font-black mt-1 tracking-wider">{winner.department}</p>
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 w-full">
                    <p className="text-xs font-black text-slate-800 dark:text-white">{winner.average.toFixed(1)}</p>
                    <p className="text-[8px] text-slate-400 uppercase font-bold tracking-widest">Avg Score</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setShowAnalysisModal(false)}
                className="px-6 py-2 bg-slate-800 dark:bg-slate-700 text-white rounded-xl text-sm font-bold hover:bg-slate-700 transition-colors"
              >
                Close Analysis
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
