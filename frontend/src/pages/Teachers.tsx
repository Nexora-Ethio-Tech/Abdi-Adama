
import { UserPlus, Calendar, Search, Filter, MoreVertical, DoorOpen, DoorClosed, Award, X, Check, Mail, Phone, MapPin, Briefcase, GraduationCap, BookOpen } from 'lucide-react';
import { mockTeachers, mockSchedules, mockClasses } from '../data/mockData';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useStore } from '../context/useStore';
import { ArrowLeft } from 'lucide-react';

export const Teachers = () => {
  const navigate = useNavigate();
  const { role } = useUser();
  const { setTeacherExaminerStatus } = useStore();
  const isAdmin = role === 'school-admin' || role === 'super-admin';
  const isVP = role === 'vice-principal';
  const [teachers, setTeachers] = useState<any[]>(mockTeachers);
  const [viewingSchedule, setViewingSchedule] = useState<string | null>(null);
  const [promotingTeacher, setPromotingTeacher] = useState<any | null>(null);
  const [viewingProfile, setViewingProfile] = useState<any | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);


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
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-6">Schedule for {teacher?.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {schedule.length > 0 ? (
              schedule.map((slot, i) => (
                <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                  <p className="text-blue-600 font-bold text-sm mb-1">{slot.day}</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{slot.time}</p>
                  <div className="mt-3 flex justify-between items-center text-sm">
                    <span className="text-slate-500">Class: {slot.class}</span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">{slot.subject}</span>
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

  const handlePromote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promotingTeacher) return;
    setTeacherExaminerStatus(promotingTeacher.id, Boolean(promotingTeacher.isExaminer));
    setTeachers(prev => prev.map(t =>
      t.id === promotingTeacher.id ? promotingTeacher : t
    ));
    setPromotingTeacher(null);
  };

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const name = formData.get('name') as string;
    const branch = formData.get('branch') as string;
    const subjects = (formData.get('subjects') as string).split(',').map(s => s.trim());
    
    const newTeacher = {
      id: `TR${Date.now()}`,
      name,
      branch,
      subjects,
      department: subjects[0] || 'General',
      hireDate: new Date().toISOString().split('T')[0],
      experience: 'New Joiner',
      bio: `New teacher at ${branch} branch.`,
      isInClass: false,
      isRoomTeacher: false,
      isExaminer: false,
      isDeptHead: false,
      classes: 0,
      isDean: false,
    };

    setTeachers(prev => [newTeacher, ...prev]);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-blue-600 hover:underline text-xs font-bold uppercase tracking-widest"
      >
        <ArrowLeft size={14} />
        Back
      </button>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 w-full md:w-fit text-sm md:text-base shadow-lg shadow-blue-200 dark:shadow-none"
        >
          <UserPlus size={20} />
          <span>Register New Teacher</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search teachers..."
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-64"
            />
          </div>
          <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
            <Filter size={20} className="text-slate-600" />
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Teacher Information</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Specializations</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Schedule</th>
                {!isAdmin && <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Live Status</th>}
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-right">Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
              {teachers.map((teacher) => (
                <tr key={teacher.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all duration-300">
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      if (isAdmin || isVP) {
                        setViewingProfile({ ...teacher });
                      }
                    }}
                    className={`flex items-center gap-3 text-left group/profile ${(isAdmin || isVP) ? 'cursor-pointer' : 'cursor-default'}`}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/20 rounded-2xl flex items-center justify-center text-purple-700 dark:text-purple-400 font-black text-lg shadow-inner transition-all group-hover/profile:scale-110 group-hover/profile:rotate-3`}>
                      {teacher.name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <div>
                      <p className={`text-sm font-black text-slate-800 dark:text-white transition-colors group-hover/profile:text-blue-600 dark:group-hover/profile:text-blue-400`}>{teacher.name}</p>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">{teacher.branch} CAMPUS</p>
                        {teacher.isRoomTeacher && (
                          <span className="text-[8px] bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-1.5 py-0.5 rounded-md font-black uppercase tracking-tighter border border-emerald-200/50 dark:border-emerald-800/50">Room Teacher ({teacher.assignedRoomClass})</span>
                        )}
                        {teacher.isExaminer && (
                          <span className="text-[8px] bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-1.5 py-0.5 rounded-md font-black uppercase tracking-tighter border border-blue-200/50 dark:border-blue-800/50">Examiner</span>
                        )}
                        {teacher.isDeptHead && (
                          <span className="text-[8px] bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-1.5 py-0.5 rounded-md font-black uppercase tracking-tighter border border-purple-200/50 dark:border-purple-800/50">Dept Head</span>
                        )}
                      </div>
                    </div>
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1.5">
                    {teacher.subjects.map((s: string) => (
                      <span key={s} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-[10px] font-black uppercase tracking-wide border border-slate-200 dark:border-slate-700/50">
                        {s}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setViewingSchedule(teacher.id)}
                    className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2 group/btn"
                  >
                    <Calendar size={14} className="group-hover:scale-110 transition-transform" />
                    Full Schedule
                  </button>
                </td>
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
                  <div className="flex items-center justify-end gap-2">
                    {isAdmin && (
                      <button
                        onClick={() => setPromotingTeacher({ ...teacher })}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-amber-500/20"
                        title="Promote Teacher"
                      >
                        <Award size={14} />
                        <span className="hidden sm:inline">Promote</span>
                      </button>
                    )}
                    <button className="p-2 text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {promotingTeacher && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-lg">
                  <Award size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Teacher Promotion</h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">{promotingTeacher.name}</p>
                </div>
              </div>
              <button onClick={() => setPromotingTeacher(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form className="p-6 space-y-6 overflow-y-auto custom-scrollbar" onSubmit={handlePromote}>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Room Teacher</p>
                      <p className="text-[10px] text-slate-500">Assign as a primary class manager</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPromotingTeacher({ ...promotingTeacher, isRoomTeacher: !promotingTeacher.isRoomTeacher })}
                      className={`w-12 h-6 rounded-full transition-colors relative ${promotingTeacher.isRoomTeacher ? 'bg-emerald-500' : 'bg-slate-300'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${promotingTeacher.isRoomTeacher ? 'left-7' : 'left-1'}`} />
                    </button>
                  </div>

                  {promotingTeacher.isRoomTeacher && (
                    <div className="space-y-1 animate-in slide-in-from-top-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Assigned Class</label>
                      <select
                        required
                        value={promotingTeacher.assignedRoomClass || ''}
                        onChange={(e) => setPromotingTeacher({ ...promotingTeacher, assignedRoomClass: e.target.value })}
                        className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                      >
                        <option value="">Select a class...</option>
                        {mockClasses.map(c => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Examiner Status</p>
                      <p className="text-[10px] text-slate-500">Designate as an official examiner</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPromotingTeacher({ ...promotingTeacher, isExaminer: !promotingTeacher.isExaminer })}
                      className={`w-12 h-6 rounded-full transition-colors relative ${promotingTeacher.isExaminer ? 'bg-blue-600' : 'bg-slate-300'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${promotingTeacher.isExaminer ? 'left-7' : 'left-1'}`} />
                    </button>
                  </div>

                  {promotingTeacher.isExaminer && (
                    <div className="space-y-3 animate-in slide-in-from-top-2">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Exam Title</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Mid-term Exam"
                          value={promotingTeacher.examTitle || ''}
                          onChange={(e) => setPromotingTeacher({ ...promotingTeacher, examTitle: e.target.value })}
                          className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Exam Date</label>
                        <input
                          type="date"
                          required
                          value={promotingTeacher.examDate || ''}
                          onChange={(e) => setPromotingTeacher({ ...promotingTeacher, examDate: e.target.value })}
                          className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Assigned Exam Class</label>
                        <select
                          required
                          value={promotingTeacher.assignedExamClass || ''}
                          onChange={(e) => setPromotingTeacher({ ...promotingTeacher, assignedExamClass: e.target.value })}
                          className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        >
                          <option value="">Select a class...</option>
                          {mockClasses.map(c => (
                            <option key={c.id} value={c.name}>{c.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Department Head</p>
                      <p className="text-[10px] text-slate-500">Lead academic departments</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPromotingTeacher({ ...promotingTeacher, isDeptHead: !promotingTeacher.isDeptHead })}
                      className={`w-12 h-6 rounded-full transition-colors relative ${promotingTeacher.isDeptHead ? 'bg-purple-600' : 'bg-slate-300'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${promotingTeacher.isDeptHead ? 'left-7' : 'left-1'}`} />
                    </button>
                  </div>

                  {promotingTeacher.isDeptHead && (
                    <div className="space-y-3 animate-in slide-in-from-top-2">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Department Subject</label>
                        <select
                          required
                          value={promotingTeacher.deptSubject || ''}
                          onChange={(e) => setPromotingTeacher({ ...promotingTeacher, deptSubject: e.target.value })}
                          className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                        >
                          <option value="">Select a subject...</option>
                          {Array.from(new Set(mockTeachers.flatMap(t => t.subjects))).map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Assigned Grade Levels</label>
                        <div className="grid grid-cols-3 gap-2">
                          {['Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map(grade => (
                            <button
                              key={grade}
                              type="button"
                              onClick={() => {
                                const current = promotingTeacher.assignedGrades || [];
                                const next = current.includes(grade)
                                  ? current.filter((g: string) => g !== grade)
                                  : [...current, grade];
                                setPromotingTeacher({ ...promotingTeacher, assignedGrades: next });
                              }}
                              className={`px-2 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                                (promotingTeacher.assignedGrades || []).includes(grade)
                                  ? 'bg-purple-600 border-purple-600 text-white'
                                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500'
                              }`}
                            >
                              {grade}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Teaching Load</p>
                      <p className="text-[10px] text-slate-500">Assign specific grades, sections, and subjects</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const current = promotingTeacher.teachingLoads || [];
                        setPromotingTeacher({ ...promotingTeacher, teachingLoads: [...current, { grade: '', section: '', subject: '' }] });
                      }}
                      className="p-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                    >
                      <UserPlus size={16} />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {(promotingTeacher.teachingLoads || []).map((load: any, index: number) => (
                      <div key={index} className="grid grid-cols-3 gap-2 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 animate-in slide-in-from-top-2">
                        <div className="space-y-1">
                          <label className="text-[8px] font-black text-slate-400 uppercase">Grade</label>
                          <select
                            required
                            value={load.grade}
                            onChange={(e) => {
                              const next = [...promotingTeacher.teachingLoads];
                              next[index].grade = e.target.value;
                              setPromotingTeacher({ ...promotingTeacher, teachingLoads: next });
                            }}
                            className="w-full px-2 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[10px] font-bold outline-none"
                          >
                            <option value="">Grade...</option>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(g => (
                              <option key={g} value={`Grade ${g}`}>Grade {g}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[8px] font-black text-slate-400 uppercase">Section</label>
                          <select
                            required
                            value={load.section}
                            onChange={(e) => {
                              const next = [...promotingTeacher.teachingLoads];
                              next[index].section = e.target.value;
                              setPromotingTeacher({ ...promotingTeacher, teachingLoads: next });
                            }}
                            className="w-full px-2 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[10px] font-bold outline-none"
                          >
                            <option value="">Sec...</option>
                            {['A', 'B', 'C', 'D'].map(s => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1 relative">
                          <label className="text-[8px] font-black text-slate-400 uppercase">Subject</label>
                          <div className="flex items-center gap-1">
                            <select
                              required
                              value={load.subject}
                              onChange={(e) => {
                                const next = [...promotingTeacher.teachingLoads];
                                next[index].subject = e.target.value;
                                setPromotingTeacher({ ...promotingTeacher, teachingLoads: next });
                              }}
                              className="w-full px-2 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[10px] font-bold outline-none"
                            >
                              <option value="">Subj...</option>
                              {promotingTeacher.subjects.map((s: string) => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                            <button
                              type="button"
                              onClick={() => {
                                const next = promotingTeacher.teachingLoads.filter((_: any, i: number) => i !== index);
                                setPromotingTeacher({ ...promotingTeacher, teachingLoads: next });
                              }}
                              className="p-1 text-rose-500 hover:bg-rose-50 rounded"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {(promotingTeacher.teachingLoads || []).length === 0 && (
                      <p className="text-[10px] text-slate-400 italic text-center py-2">No teaching loads assigned yet.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setPromotingTeacher(null)}
                  className="flex-1 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 rounded-xl transition-all shadow-lg shadow-amber-200 dark:shadow-none flex items-center justify-center gap-2"
                >
                  <Check size={18} />
                  <span>Confirm Promotion</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewingProfile && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-end animate-in fade-in duration-300">
          <div className="w-full max-w-2xl h-screen bg-white dark:bg-slate-950 shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 overflow-hidden">
            <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-purple-200">
                  {viewingProfile.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                    Teacher Profile
                  </h3>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{viewingProfile.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setViewingProfile(null)}
                  className="p-3 bg-white dark:bg-slate-800 text-slate-500 hover:text-rose-500 rounded-2xl shadow-lg transition-all"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input
                      type="text"
                      readOnly
                      value={viewingProfile.name}
                      className="w-full px-4 py-3 rounded-xl text-sm font-bold outline-none bg-transparent border-transparent cursor-default"
                    />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Department</label>
                    <input
                      type="text"
                      readOnly
                      value={viewingProfile.department}
                      className="w-full px-4 py-3 rounded-xl text-sm font-bold outline-none bg-transparent border-transparent cursor-default"
                    />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Hire Date</label>
                    <input
                      type="date"
                      readOnly
                      value={viewingProfile.hireDate}
                      className="w-full px-4 py-3 rounded-xl text-sm font-bold outline-none bg-transparent border-transparent cursor-default"
                    />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Experience</label>
                    <input
                      type="text"
                      readOnly
                      value={viewingProfile.experience}
                      className="w-full px-4 py-3 rounded-xl text-sm font-bold outline-none bg-transparent border-transparent cursor-default"
                    />
                 </div>
              </div>

              <div className="space-y-4">
                 <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <GraduationCap size={16} />
                    Academic Specializations
                 </h4>
                 <div className="flex flex-wrap gap-2">
                    {viewingProfile.subjects.map((s: string, i: number) => (
                       <span key={i} className="px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl text-xs font-black uppercase tracking-wider border border-blue-100 dark:border-blue-800">
                          {s}
                       </span>
                    ))}
                 </div>
              </div>

              <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                     <BookOpen size={16} />
                     Current Teaching Load
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                     {(viewingProfile.teachingLoads || []).length > 0 ? (
                        viewingProfile.teachingLoads.map((load: any, i: number) => (
                           <div key={i} className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                              <div>
                                 <p className="text-[10px] font-black text-school-primary uppercase tracking-widest">{load.grade} - Section {load.section}</p>
                                 <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{load.subject}</p>
                              </div>
                              <div className="w-8 h-8 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 shadow-sm">
                                 <GraduationCap size={14} />
                              </div>
                           </div>
                        ))
                     ) : (
                        <p className="text-xs text-slate-500 italic">No teaching loads assigned.</p>
                     )}
                  </div>
              </div>

              <div className="space-y-4">
                 <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Briefcase size={16} />
                    Professional Summary
                 </h4>
                 <textarea
                   readOnly
                   value={viewingProfile.bio}
                   rows={4}
                   className="w-full px-6 py-4 rounded-3xl text-sm font-medium leading-relaxed outline-none bg-slate-50 dark:bg-slate-900/50 border-transparent italic text-slate-600"
                 />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl flex items-center gap-4">
                    <div className="p-2 bg-white dark:bg-slate-800 rounded-xl text-slate-400 shadow-sm">
                       <Mail size={18} />
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</p>
                       <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{viewingProfile.id.toLowerCase()}@abdiadama.edu</p>
                    </div>
                 </div>
                 <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl flex items-center gap-4">
                    <div className="p-2 bg-white dark:bg-slate-800 rounded-xl text-slate-400 shadow-sm">
                       <Phone size={18} />
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Phone</p>
                       <p className="text-xs font-bold text-slate-700 dark:text-slate-200">+251 911 22 33 44</p>
                    </div>
                 </div>
                 <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl flex items-center gap-4 md:col-span-2">
                    <div className="p-2 bg-white dark:bg-slate-800 rounded-xl text-slate-400 shadow-sm">
                       <MapPin size={18} />
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Primary Campus</p>
                       <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{viewingProfile.branch} Branch - Ethiopia</p>
                    </div>
                 </div>
              </div>
            </div>


          </div>
        </div>
      )}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                  <UserPlus size={20} />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm uppercase tracking-wider">Register New Teacher</h3>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form className="p-6 space-y-4" onSubmit={handleAddTeacher}>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Full Name</label>
                <input name="name" required type="text" placeholder="e.g. Ato Bekele" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Branch</label>
                <select name="branch" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all">
                  <option value="Main">Main Branch</option>
                  <option value="Bole">Bole Branch</option>
                  <option value="Megenagna">Megenagna Branch</option>
                  <option value="Adama">Adama Branch</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Subjects (comma separated)</label>
                <input name="subjects" required type="text" placeholder="e.g. Mathematics, Physics" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/50">
                <p className="text-[10px] text-blue-700 dark:text-blue-400 font-medium leading-relaxed">
                  <strong>Account Notice:</strong> Upon registration, the teacher will be assigned a Digital ID (e.g., TR1714...). They can use this ID to log in for the first time.
                </p>
              </div>
              <div className="pt-4">
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-200 dark:shadow-none flex items-center justify-center gap-2">
                  <Check size={18} />
                  <span>Register Teacher</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
