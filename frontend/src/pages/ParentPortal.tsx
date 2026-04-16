
import { Calendar, BookOpen, Award, User, History, Megaphone } from 'lucide-react';
import { useState } from 'react';

export const ParentPortal = () => {
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
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Hero Welcome Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 rounded-[2rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden border border-slate-700/50">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-widest">
              Parent Portal
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Hello, Mr. Bikila</h2>
            <p className="text-slate-300 text-lg max-w-md">Stay connected with your children's educational journey and academic milestones.</p>
          </div>
          <div className="flex items-center gap-6 bg-white/5 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
            <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg rotate-3">
              <User size={32} />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Primary Account</p>
              <p className="text-xs text-blue-300">Guardian Status: Verified</p>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] -ml-32 -mb-32" />
      </div>

      {/* School Notices */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-2">
          <Megaphone className="text-blue-600 dark:text-blue-400" size={20} />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">School Announcements</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notices.map(notice => (
            <div key={notice.id} className="group bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  notice.priority === 'High'
                  ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400'
                  : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                }`}>
                  {notice.priority} Priority
                </span>
                <span className="text-xs font-medium text-slate-400">{notice.time}</span>
              </div>
              <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-2 group-hover:text-blue-600 transition-colors">{notice.title}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{notice.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">My Children</h3>
          <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800 mx-6 hidden md:block" />
          <span className="text-sm font-medium text-slate-500">{children.length} Enrolled</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {children.map((child, i) => (
            <div key={i} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <div className="relative bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 font-black text-2xl shadow-inner">
                    {child.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100">{child.name}</h4>
                    <p className="text-sm font-medium text-slate-400 uppercase tracking-tighter">Grade {child.grade}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Attendance</p>
                    <p className="text-lg font-bold text-emerald-600">{child.attendance}</p>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Performance</p>
                    <p className="text-lg font-bold text-blue-600">{child.performance}</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedChild(child)}
                  className="w-full py-4 bg-slate-900 dark:bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-blue-600 dark:hover:bg-blue-500 transition-all shadow-lg shadow-slate-200 dark:shadow-blue-900/20"
                >
                  View Academic Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
