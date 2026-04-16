
import { Calendar, BookOpen, Award, LogOut, User, History, Megaphone } from 'lucide-react';
import { useState } from 'react';
import { useUser } from '../context/UserContext';

export const ParentPortal = () => {
  const { setRole } = useUser();
  const [selectedChild, setSelectedChild] = useState<any>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const academicYears = ['2015', '2016', '2017'];
  const historyData: Record<string, any[]> = {
    '2015': [
      { name: 'Mathematics', teacher: 'Ato Solomon', grades: { mid: '25/30', quiz: '8/10', assignment: '9/10', final: '42/50', total: '84%' } },
      { name: 'Amharic', teacher: 'W/ro Aster', grades: { mid: '28/30', quiz: '9/10', assignment: '10/10', final: '45/50', total: '92%' } },
    ],
    '2016': [
      { name: 'Physics', teacher: 'Ato Solomon', grades: { mid: '22/30', quiz: '7/10', assignment: '8/10', final: '40/50', total: '77%' } },
      { name: 'English', teacher: 'W/ro Aster', grades: { mid: '29/30', quiz: '10/10', assignment: '10/10', final: '48/50', total: '97%' } },
    ]
  };

  const [notices] = useState([
    { id: 1, title: 'Term 3 Exams Schedule', content: 'The final schedule for Term 3 exams has been posted in the academic office.', priority: 'High', time: '1 hour ago' },
    { id: 2, title: 'School Bus Maintenance', content: 'Route B buses will be undergoing maintenance this Friday. Please expect minor delays.', priority: 'Medium', time: 'Yesterday' }
  ]);

  const children = [
    {
      id: '1',
      name: 'Abebe Bikila',
      grade: '10A',
      attendance: '96%',
      performance: 'Excellent',
      courses: [
        { name: 'Mathematics', teacher: 'Ato Solomon', grades: { mid: '28/30', quiz: '9/10', assignment: '10/10', final: 'Not Yet' } },
        { name: 'Physics', teacher: 'Ato Solomon', grades: { mid: '25/30', quiz: '8/10', assignment: '9/10', final: 'Not Yet' } },
        { name: 'English', teacher: 'W/ro Aster', grades: { mid: '29/30', quiz: '10/10', assignment: '10/10', final: 'Not Yet' } },
      ]
    },
    {
      id: '2',
      name: 'Sara Bikila',
      grade: '7B',
      attendance: '94%',
      performance: 'Good',
      courses: [
        { name: 'Biology', teacher: 'W/ro Selam', grades: { mid: '24/30', quiz: '8/10', assignment: '8/10', final: 'Not Yet' } },
        { name: 'Amharic', teacher: 'W/ro Aster', grades: { mid: '27/30', quiz: '9/10', assignment: '10/10', final: 'Not Yet' } },
      ]
    },
  ];

  if (selectedChild) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setSelectedChild(null);
              setShowHistory(false);
              setSelectedYear(null);
            }}
            className="text-blue-600 hover:underline flex items-center gap-2 font-medium"
          >
            ← Back to Children List
          </button>

          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-medium text-sm"
          >
            <History size={18} />
            {showHistory ? 'View Active Courses' : 'Academic History'}
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 md:p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 mb-8 text-center sm:text-left">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-2xl md:text-3xl">
              {selectedChild.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100">{selectedChild.name}</h2>
              <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg">Grade {selectedChild.grade} Student</p>
            </div>
          </div>

          {!showHistory ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-2 md:gap-3 text-slate-500 dark:text-slate-400 mb-2">
                    <Calendar size={18} />
                    <span className="text-xs md:text-sm font-medium">Attendance</span>
                  </div>
                  <p className="text-xl md:text-2xl font-bold text-emerald-600">{selectedChild.attendance}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 mb-2">
                    <BookOpen size={18} />
                    <span className="text-sm font-medium">Active Courses</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{selectedChild.courses.length}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 mb-2">
                    <Award size={18} />
                    <span className="text-sm font-medium">Performance</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-600">{selectedChild.performance}</p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Course Progress & Grades</h3>
                </div>
                <div className="overflow-x-auto border border-slate-100 dark:border-slate-800 rounded-xl">
                  <table className="w-full text-left text-sm min-w-[600px]">
                    <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-800">
                      <tr>
                        <th className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400 uppercase">Course</th>
                        <th className="px-4 py-4 font-semibold text-slate-500 dark:text-slate-400 uppercase">Mid (30)</th>
                        <th className="px-4 py-4 font-semibold text-slate-500 dark:text-slate-400 uppercase">Quiz (10)</th>
                        <th className="px-4 py-4 font-semibold text-slate-500 dark:text-slate-400 uppercase">Assig. (10)</th>
                        <th className="px-4 py-4 font-semibold text-slate-500 dark:text-slate-400 uppercase">Final (50)</th>
                        <th className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400 uppercase text-right">Teacher</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {selectedChild.courses.map((course: any, i: number) => (
                        <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                          <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">{course.name}</td>
                          <td className="px-4 py-4 text-slate-600 dark:text-slate-400">{course.grades.mid}</td>
                          <td className="px-4 py-4 text-slate-600 dark:text-slate-400">{course.grades.quiz}</td>
                          <td className="px-4 py-4 text-slate-600 dark:text-slate-400">{course.grades.assignment}</td>
                          <td className="px-4 py-4">
                            <span className={`text-xs font-bold px-2 py-1 rounded ${
                              course.grades.final === 'Not Yet'
                                ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                                : 'text-slate-600 dark:text-slate-400'
                            }`}>
                              {course.grades.final}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right text-slate-500 dark:text-slate-400">{course.teacher}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Academic History</h3>
              <div className="flex gap-4">
                {academicYears.map(year => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-6 py-3 rounded-xl border transition-all ${
                      selectedYear === year
                        ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-400'
                    }`}
                  >
                    EC {year}
                  </button>
                ))}
              </div>

              {selectedYear && historyData[selectedYear] ? (
                <div className="animate-in slide-in-from-bottom-4 duration-500">
                  <div className="overflow-x-auto border border-slate-100 dark:border-slate-800 rounded-xl">
                    <table className="w-full text-left text-sm min-w-[500px]">
                      <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-800">
                        <tr>
                          <th className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400 uppercase">Course</th>
                          <th className="px-4 py-4 font-semibold text-slate-500 dark:text-slate-400 uppercase">Mid</th>
                          <th className="px-4 py-4 font-semibold text-slate-500 dark:text-slate-400 uppercase">Quiz</th>
                          <th className="px-4 py-4 font-semibold text-slate-500 dark:text-slate-400 uppercase">Assig.</th>
                          <th className="px-4 py-4 font-semibold text-slate-500 dark:text-slate-400 uppercase">Final</th>
                          <th className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400 uppercase text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {historyData[selectedYear].map((course: any, i: number) => (
                          <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                            <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">{course.name}</td>
                            <td className="px-4 py-4 text-slate-600 dark:text-slate-400">{course.grades.mid}</td>
                            <td className="px-4 py-4 text-slate-600 dark:text-slate-400">{course.grades.quiz}</td>
                            <td className="px-4 py-4 text-slate-600 dark:text-slate-400">{course.grades.assignment}</td>
                            <td className="px-4 py-4 text-slate-600 dark:text-slate-400">{course.grades.final}</td>
                            <td className="px-6 py-4 text-right font-bold text-blue-600 dark:text-blue-400">{course.grades.total}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : selectedYear ? (
                <div className="p-12 text-center border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-2xl">
                  <p className="text-slate-500">No records found for EC {selectedYear}</p>
                </div>
              ) : (
                <div className="p-12 text-center border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-2xl">
                  <div className="bg-slate-50 dark:bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <History className="text-slate-400" size={32} />
                  </div>
                  <p className="text-slate-500">Select an academic year to view historical performance.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* School Notices */}
      <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-md">
              <Megaphone size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold">Important School Notices</h3>
              <p className="text-blue-100 text-sm">Stay updated with latest announcements.</p>
            </div>
          </div>
          <div className="flex -space-x-3 overflow-hidden">
            <div className="inline-block h-8 w-8 rounded-full ring-2 ring-blue-600 bg-white/10 backdrop-blur-sm flex items-center justify-center text-[10px] font-bold">
              +{notices.length}
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {notices.map(notice => (
            <div key={notice.id} className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest ${
                  notice.priority === 'High' ? 'bg-rose-500 text-white' : 'bg-blue-400 text-white'
                }`}>
                  {notice.priority}
                </span>
                <span className="text-[10px] text-blue-100">{notice.time}</span>
              </div>
              <h4 className="font-bold text-sm mb-1">{notice.title}</h4>
              <p className="text-xs text-blue-50/80 line-clamp-2">{notice.content}</p>
            </div>
          ))}
        </div>
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="bg-white dark:bg-slate-900 p-4 md:p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6 transition-colors duration-300">
        <div className="text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100">Hello, Mr. Bikila</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Monitoring your children's academic progress.</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto justify-center">
          <div className="flex items-center gap-3 pr-4 md:pr-6 border-r dark:border-slate-800">
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Mr. Bikila</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">Parent</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
              <User size={24} />
            </div>
          </div>
          <button
            onClick={() => setRole('school-admin')}
            className="flex items-center gap-2 px-3 md:px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium text-sm md:text-base">Logout</span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">My Children</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {children.map((child, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                  {child.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100">{child.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Grade {child.grade}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Attendance</span>
                  <span className="font-medium text-emerald-600">{child.attendance}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Performance</span>
                  <span className="font-medium text-blue-600">{child.performance}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedChild(child)}
                className="w-full mt-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors border border-blue-100 dark:border-blue-900/50"
              >
                View Full Report
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
