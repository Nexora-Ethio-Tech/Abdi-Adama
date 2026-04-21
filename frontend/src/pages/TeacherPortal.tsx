
import { BookOpen, Users, Calendar, ArrowRight, Award, ClipboardList, Star, Save, CheckCircle, ChevronRight, History, FileText, CheckSquare, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockClasses, mockStudents, commFields, ratingLabels, mockWeeklyPlans, mockTeachers } from '../data/mockData';
import { mockExams } from '../data/examData';
import { useState } from 'react';

export const TeacherPortal = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'plans' | 'communication' | 'review'>('overview');
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [teacherNote, setTeacherNote] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const pendingAssignments = mockExams.filter(e => e.category === 'Assignment').length;

  const handleRating = (fieldId: string, rating: number) => {
    setRatings(prev => ({ ...prev, [fieldId]: rating }));
    setIsSaved(false);
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const getRatingColor = (rating: number) => {
    switch (rating) {
      case 3: return 'bg-emerald-500 text-white';
      case 2: return 'bg-blue-500 text-white';
      case 1: return 'bg-amber-500 text-white';
      case 0: return 'bg-rose-500 text-white';
      default: return 'bg-slate-100 text-slate-400';
    }
  };

  const isDean = mockTeachers.find(t => t.id === 'T1')?.isDean;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-wrap gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl w-fit">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'plans', label: 'Weekly Plans' },
          { id: 'communication', label: 'Comm. Book' },
          ...(isDean ? [{ id: 'review', label: 'Dept. Plans Review' }] : [])
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 md:px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' ? (
        <>
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
                <ClipboardList size={24} />
              </div>
              <p className="text-slate-500 text-sm font-medium">Active Assignments</p>
              <h3 className="text-2xl font-bold text-slate-800">{pendingAssignments}</h3>
              <p className="text-xs text-slate-400 mt-1">Pending student submissions</p>
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
        </>
      ) : activeTab === 'plans' ? (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Smart Lesson Planning</h2>
                <p className="text-slate-500 font-medium italic text-sm">Automated curriculum alignment and activity tracking.</p>
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 dark:shadow-none">
                <FileText size={18} />
                Create New Plan
              </button>
            </div>

            <div className="overflow-x-auto -mx-8">
              <table className="w-full text-left border-collapse min-w-[1500px]">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-y border-slate-100 dark:border-slate-800">
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Date</th>
                    <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Content</th>
                    <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Specific Objectives</th>
                    <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Teacher Activity</th>
                    <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Time</th>
                    <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Student Activity</th>
                    <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Teaching Method</th>
                    <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Teaching Aids</th>
                    <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Evaluation</th>
                    <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Remark</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {mockWeeklyPlans.filter(p => p.teacherId === 'T1').map(plan => (
                    <tr key={plan.id} className="group hover:bg-blue-50/30 dark:hover:bg-blue-900/5 transition-colors">
                      <td className="px-6 py-5">
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{plan.date}</p>
                      </td>
                      <td className="px-4 py-5">
                        <p className="text-xs text-blue-600 font-medium">{plan.content}</p>
                      </td>
                      <td className="px-4 py-5"><p className="text-xs text-slate-600 dark:text-slate-400 max-w-[150px] line-clamp-2">{plan.objectives}</p></td>
                      <td className="px-4 py-5"><p className="text-xs text-slate-600 dark:text-slate-400 max-w-[150px] line-clamp-2">{plan.teacherActivity}</p></td>
                      <td className="px-4 py-5"><p className="text-xs text-slate-600 dark:text-slate-400 font-bold">{plan.time}</p></td>
                      <td className="px-4 py-5"><p className="text-xs text-slate-600 dark:text-slate-400 max-w-[150px] line-clamp-2">{plan.studentActivity}</p></td>
                      <td className="px-4 py-5"><p className="text-xs text-slate-600 dark:text-slate-400 max-w-[150px] line-clamp-2">{plan.methodology}</p></td>
                      <td className="px-4 py-5"><p className="text-xs text-slate-600 dark:text-slate-400 max-w-[150px] line-clamp-2">{plan.teachingAids}</p></td>
                      <td className="px-4 py-5"><p className="text-xs text-slate-600 dark:text-slate-400 max-w-[150px] line-clamp-2">{plan.evaluation}</p></td>
                      <td className="px-4 py-5"><p className="text-xs text-slate-600 dark:text-slate-400 max-w-[150px] line-clamp-2 italic">{plan.remark}</p></td>
                      <td className="px-6 py-5 text-right">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                          plan.status === 'Approved' ? 'bg-emerald-100 text-emerald-600' :
                          plan.status === 'Pending' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {plan.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : activeTab === 'review' ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Departmental Plan Review</h3>
              <p className="text-slate-500 text-sm font-medium">Review and approve lesson plans from your department staff.</p>
            </div>
            <div className="bg-blue-600 px-4 py-2 rounded-xl text-white text-xs font-bold shadow-lg shadow-blue-200">
              Science Department Dean
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockWeeklyPlans.filter(p => p.teacherId !== 'T1').map(plan => (
              <div key={plan.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm group hover:border-blue-200 transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-600 font-bold">
                      {plan.teacherId === 'T2' ? 'WS' : 'TK'}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{plan.teacherId === 'T2' ? 'W/ro Selam' : 'Ato Kebede'}</h4>
                      <p className="text-xs text-slate-500">Submitted: Monday, 8:00 AM</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-black ${plan.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                    {plan.status.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Date & Content</p>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{plan.date}: {plan.content}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Specific Objectives</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">{plan.objectives}</p>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Evaluation</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">{plan.evaluation}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex gap-4">
                  <button className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2">
                    <CheckSquare size={14} />
                    Approve Plan
                  </button>
                  <button className="flex-1 py-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-600 dark:text-slate-300 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 border border-slate-100 dark:border-slate-700">
                    <MessageSquare size={14} />
                    Add Feedback
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Select Class</h3>
              <div className="space-y-2">
                {mockClasses.map(cls => (
                  <button
                    key={cls.id}
                    onClick={() => {
                      setSelectedClass(cls.name);
                      setSelectedStudent(null);
                    }}
                    className={`w-full p-4 flex items-center justify-between rounded-xl transition-all ${selectedClass === cls.name ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-50'}`}
                  >
                    <span className="font-bold">{cls.name}</span>
                    <ChevronRight size={18} />
                  </button>
                ))}
              </div>
            </div>

            {selectedClass && (
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm animate-in slide-in-from-top-4">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Students</h3>
                <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar">
                  {mockStudents.filter(s => s.grade === selectedClass.replace('Grade ', '')).map(student => (
                    <button
                      key={student.id}
                      onClick={() => {
                        setSelectedStudent(student);
                        setRatings({});
                        setTeacherNote('');
                      }}
                      className={`w-full p-3 flex items-center gap-3 rounded-xl transition-all ${selectedStudent?.id === student.id ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                    >
                      <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-500 font-bold text-xs">
                        {student.name[0]}
                      </div>
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{student.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-8">
            {selectedStudent ? (
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 font-black text-2xl">
                      {selectedStudent.name[0]}
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-slate-900 dark:text-white">{selectedStudent.name}</h2>
                      <p className="text-slate-500 font-bold">Weekly Performance Rating (May 24-30)</p>
                    </div>
                  </div>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-200 dark:shadow-none"
                  >
                    <Save size={18} />
                    Submit Week Rating
                  </button>
                </div>

                {isSaved && (
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center gap-2 border border-emerald-100 dark:border-emerald-800 animate-in fade-in zoom-in-95">
                    <CheckCircle size={20} />
                    <span className="font-bold text-sm">Communication book updated successfully!</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {commFields.map(field => (
                    <div key={field.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">{field.label}</h4>
                          <p className="text-[10px] text-slate-500 font-medium">{field.description}</p>
                        </div>
                        {ratings[field.id] !== undefined && (
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${getRatingColor(ratings[field.id])}`}>
                            {ratingLabels[ratings[field.id]]}
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {[0, 1, 2, 3].map(rating => (
                          <button
                            key={rating}
                            onClick={() => handleRating(field.id, rating)}
                            className={`py-2 rounded-lg text-[10px] font-black transition-all ${ratings[field.id] === rating ? getRatingColor(rating) : 'bg-white dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-blue-400'}`}
                          >
                            {rating + 1}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Teacher's Remark (Optional)</label>
                  <textarea
                    value={teacherNote}
                    onChange={(e) => setTeacherNote(e.target.value)}
                    placeholder="Write a brief observation about the student's week..."
                    className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all outline-none text-sm min-h-[100px] resize-none"
                  />
                </div>

                <div className="p-6 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-900/20 flex gap-4">
                  <History className="text-amber-600 flex-shrink-0" size={24} />
                  <div>
                    <h4 className="font-bold text-amber-900 dark:text-amber-400 text-sm">History Tracking</h4>
                    <p className="text-xs text-amber-800 dark:text-amber-500/80 mt-1 leading-relaxed">
                      Ratings submitted here are archived weekly. Parents can view past performance trends in their portal to track long-term behavioral and academic readiness.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-slate-50/50 dark:bg-slate-900/20 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                <Star className="text-slate-300 dark:text-slate-700 mb-4" size={48} />
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Communication Book</h3>
                <p className="text-slate-500 max-w-xs mx-auto mt-2 font-medium">Select a student from the left panel to begin the weekly performance evaluation.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
