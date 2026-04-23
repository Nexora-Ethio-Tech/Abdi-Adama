
import { CheckCircle, XCircle, Clock, ChevronDown, UserCheck, Users, ShieldAlert, ArrowRight, X, Send, Check } from 'lucide-react';
import { mockStudents, mockTeachers } from '../data/mockData';
import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Attendance = () => {
  const navigate = useNavigate();
  const { role } = useUser();
  const isAdmin = role === 'school-admin' || role === 'super-admin';
  const isVP = role === 'vice-principal';
  const [selectedGrade, setSelectedGrade] = useState('10A');
  const [attendance, setAttendance] = useState<Record<string, 'present' | 'absent' | 'late'>>({});
  const [showSubModal, setShowSubModal] = useState(false);
  const [absentTeacher, setAbsentTeacher] = useState<any>(null);
  const [absentReviewQueue, setAbsentReviewQueue] = useState([
    { id: '1', studentName: 'Ahmed Ali', grade: '10A', reason: 'Not reported', time: '08:15 AM' },
    { id: '2', studentName: 'Sara Mohammed', grade: '9B', reason: 'Family emergency', time: '08:45 AM' },
  ]);

  const students = mockStudents.filter(s => s.grade === selectedGrade);

  const toggleStatus = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const markAll = (status: 'present' | 'absent' | 'late') => {
    const newAttendance = { ...attendance };
    students.forEach(s => {
      newAttendance[s.id] = status;
    });
    setAttendance(newAttendance);
  };

  const gradeStats = [
    { grade: '10A', enrollment: 24, present: 22, percentage: '91.6%' },
    { grade: '9B', enrollment: 30, present: 28, percentage: '93.3%' },
    { grade: '11C', enrollment: 18, present: 15, percentage: '83.3%' },
    { grade: '12A', enrollment: 25, present: 25, percentage: '100%' },
  ];

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-blue-600 hover:underline text-xs font-bold uppercase tracking-widest"
      >
        <ArrowLeft size={14} />
        Back
      </button>
      {isVP && absentReviewQueue.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-rose-100 dark:border-rose-900/30 overflow-hidden shadow-xl shadow-rose-50 dark:shadow-none">
          <div className="bg-rose-50 dark:bg-rose-900/20 px-6 py-4 border-b border-rose-100 dark:border-rose-900/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-500 text-white rounded-lg animate-pulse">
                <ShieldAlert size={20} />
              </div>
              <div>
                <h3 className="font-black text-rose-900 dark:text-rose-100 text-sm uppercase tracking-wider">VP Attendance Review Queue</h3>
                <p className="text-xs text-rose-700 dark:text-rose-300">Unexcused absences requiring escalation</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-rose-200 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 rounded-full text-xs font-black">
              {absentReviewQueue.length} PENDING
            </span>
          </div>
          <div className="divide-y divide-rose-50 dark:divide-rose-900/20">
            {absentReviewQueue.map((item) => (
              <div key={item.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-rose-50/30 dark:hover:bg-rose-900/10 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-rose-600 font-black shadow-sm border border-rose-100 dark:border-rose-900/30">
                    {item.studentName[0]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-100">{item.studentName}</p>
                    <p className="text-xs text-slate-500 font-medium">Grade {item.grade} • Reported at {item.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setAbsentReviewQueue(prev => prev.filter(q => q.id !== item.id))}
                    className="flex-1 sm:flex-none px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-100"
                  >
                    <Check size={16} />
                    Pass (Excused)
                  </button>
                  <button
                    onClick={() => {
                      alert(`Notifying parents of ${item.studentName}...`);
                      setAbsentReviewQueue(prev => prev.filter(q => q.id !== item.id));
                    }}
                    className="flex-1 sm:flex-none px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-100"
                  >
                    <Send size={16} />
                    Notify Parents
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Student Attendance</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Mark daily presence, track absences, and generate reports.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg font-bold text-sm">
            Attendance Reports
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold text-sm shadow-lg shadow-blue-100 dark:shadow-none">
            Save Today's Records
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 flex flex-wrap gap-4 items-center justify-between transition-colors duration-300">
        <div className="flex items-center gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase">Select Grade/Section</label>
            <div className="relative">
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all w-40"
              >
                <option value="10A">Grade 10A</option>
                <option value="9B">Grade 9B</option>
                <option value="11C">Grade 11C</option>
                <option value="12A">Grade 12A</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div className="h-10 w-px bg-slate-100 dark:bg-slate-800 hidden md:block" />
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase">Total Students</label>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{students.length} Enrolled</p>
          </div>
        </div>

        {!isAdmin && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => markAll('present')}
              className="text-[10px] font-bold text-emerald-600 border border-emerald-100 bg-emerald-50 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors uppercase tracking-wider"
            >
              Mark All Present
            </button>
            <button
              onClick={() => markAll('absent')}
              className="text-[10px] font-bold text-rose-600 border border-rose-100 bg-rose-50 px-3 py-1.5 rounded-lg hover:bg-rose-100 transition-colors uppercase tracking-wider"
            >
              Mark All Absent
            </button>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors duration-300">
        <div className="overflow-x-auto">
          {isAdmin ? (
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Grade/Section</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Enrollment</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Present Today</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Attendance Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {gradeStats.map((stat, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-700 dark:text-blue-400 font-bold text-xs">
                          {stat.grade}
                        </div>
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-100">Grade {stat.grade}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-medium text-slate-600 dark:text-slate-400">{stat.enrollment} Students</td>
                    <td className="px-6 py-4 text-center text-sm font-medium text-slate-600 dark:text-slate-400">{stat.present} Students</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{stat.percentage}</span>
                        <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: stat.percentage }} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Student Name</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Last 30 Days</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-700 dark:text-blue-400 font-bold text-xs">
                          {student.name[0]}
                        </div>
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => toggleStatus(student.id, 'present')}
                          className={`p-2 rounded-lg border transition-all ${
                            attendance[student.id] === 'present'
                              ? 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-100'
                              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:border-emerald-500 hover:text-emerald-500'
                          }`}
                          title="Present"
                        >
                          <CheckCircle size={20} />
                        </button>
                        <button
                          onClick={() => toggleStatus(student.id, 'absent')}
                          className={`p-2 rounded-lg border transition-all ${
                            attendance[student.id] === 'absent'
                              ? 'bg-rose-600 border-rose-600 text-white shadow-md shadow-rose-100'
                              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:border-rose-500 hover:text-rose-500'
                          }`}
                          title="Absent"
                        >
                          <XCircle size={20} />
                        </button>
                        <button
                          onClick={() => toggleStatus(student.id, 'late')}
                          className={`p-2 rounded-lg border transition-all ${
                            attendance[student.id] === 'late'
                              ? 'bg-amber-500 border-amber-500 text-white shadow-md shadow-amber-100'
                              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:border-amber-500 hover:text-amber-500'
                          }`}
                          title="Late"
                        >
                          <Clock size={20} />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">96%</span>
                        <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: '96%' }} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4 flex items-center gap-4">
        <div className="p-2 bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 rounded-lg">
          <UserCheck size={20} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-blue-900 dark:text-blue-100">Staff Continuity Module</h4>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-0.5">
            Manage rapid proxy teacher assignments for staff absences.
          </p>
        </div>
        <button
          onClick={() => {
            setAbsentTeacher(mockTeachers[1]);
            setShowSubModal(true);
          }}
          className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors"
        >
          Manage Absences
        </button>
      </div>

      {showSubModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl animate-in zoom-in duration-300 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-rose-50 text-rose-600 rounded-xl">
                  <ShieldAlert size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white">Staff Substitution</h3>
                  <p className="text-xs text-slate-500 font-medium tracking-tight">Rapid Proxy Teacher Assignment</p>
                </div>
              </div>
              <button onClick={() => setShowSubModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-8 space-y-8">
              <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-rose-200 rounded-full flex items-center justify-center text-rose-700 font-bold text-xl">
                    {absentTeacher?.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-rose-900">{absentTeacher?.name}</p>
                    <p className="text-xs text-rose-700 font-medium">Reported Absent Today</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-rose-400 uppercase">Impact</p>
                  <p className="text-sm font-bold text-rose-900">{absentTeacher?.classes} Active Classes</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-widest flex items-center gap-2">
                  <Users size={16} className="text-blue-600" />
                  Eligible Substitutes
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {mockTeachers.filter(t => !t.isInClass && t.id !== absentTeacher?.id).map((teacher) => (
                    <div key={teacher.id} className="flex items-center justify-between p-4 border border-slate-100 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold">
                          {teacher.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 dark:text-white">{teacher.name}</p>
                          <p className="text-[10px] text-slate-400 font-medium uppercase">{teacher.subjects.join(', ')}</p>
                        </div>
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold opacity-0 group-hover:opacity-100 transition-all">
                        Assign Proxy
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 text-center">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Automated SMS & App notifications will be sent to parents and the assigned teacher.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
