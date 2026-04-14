
import { CheckCircle, XCircle, Clock, ChevronDown, UserCheck } from 'lucide-react';
import { mockStudents } from '../data/mockData';
import { useState } from 'react';

export const Attendance = () => {
  const [selectedGrade, setSelectedGrade] = useState('10A');
  const [attendance, setAttendance] = useState<Record<string, 'present' | 'absent' | 'late'>>({});

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

  return (
    <div className="space-y-6">
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
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors duration-300">
        <div className="overflow-x-auto">
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
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4 flex items-center gap-4">
        <div className="p-2 bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 rounded-lg">
          <UserCheck size={20} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-blue-900 dark:text-blue-100">Smart Substitution System</h4>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-0.5">
            If a teacher is marked absent, the system will automatically notify eligible substitute teachers.
          </p>
        </div>
      </div>
    </div>
  );
};
