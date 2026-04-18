
import { studentCurrentCourses } from '../data/mockData';
import { BookOpen, User, CheckCircle2, Circle, AlertCircle } from 'lucide-react';

export const StudentCourses = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Grades & Courses</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Access your enrolled courses and track your real-time academic performance.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {studentCurrentCourses.map((course) => (
          <div key={course.id} className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden group hover:border-blue-500/50 transition-all duration-500">
            <div className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200 dark:shadow-none rotate-3 group-hover:rotate-0 transition-transform duration-500">
                    <BookOpen size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{course.name}</h2>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">{course.code}</span>
                      <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 font-bold">
                        <User size={14} className="text-slate-400" />
                        {course.teacher}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 w-full md:w-auto">
                   <div className="flex items-center justify-between w-full md:w-64 mb-1">
                      <span className="text-xs font-black uppercase text-slate-400 tracking-tighter">Course Progress</span>
                      <span className="text-xs font-black text-blue-600 dark:text-blue-400">{course.progress}%</span>
                   </div>
                   <div className="w-full md:w-64 h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-50 dark:border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000"
                        style={{ width: `${course.progress}%` }}
                      />
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <GradeCard title="Quizzes" items={course.grades.quizzes} />
                <GradeCard title="Tests" items={course.grades.tests} />
                <GradeCard title="Assignments" items={course.grades.assignments} />
                <GradeCard title="Midterm" item={course.grades.midterm} single />
                <GradeCard title="Final" item={course.grades.final} single />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const GradeCard = ({ title, items, item, single }: { title: string, items?: any[], item?: any, single?: boolean }) => {
  return (
    <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-4 hover:bg-white dark:hover:bg-slate-800 transition-colors duration-300">
      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{title}</h3>
      <div className="space-y-3">
        {single ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {item.score !== null ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Circle size={14} className="text-slate-300" />}
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{item.name}</span>
            </div>
            <span className={`text-xs font-black ${item.score !== null ? 'text-slate-900 dark:text-white' : 'text-slate-300'}`}>
              {item.score !== null ? `${item.score}/${item.total}` : '---'}
            </span>
          </div>
        ) : (
          items?.map((g, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {g.score !== null ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Circle size={14} className="text-slate-300" />}
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{g.name}</span>
              </div>
              <span className={`text-xs font-black ${g.score !== null ? 'text-slate-900 dark:text-white' : 'text-slate-300'}`}>
                {g.score !== null ? `${g.score}/${g.total}` : '---'}
              </span>
            </div>
          ))
        )}
      </div>
      {(!single && items?.some(g => g.score === null)) || (single && item.score === null) ? (
        <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-700/50">
           <AlertCircle size={10} className="text-amber-500" />
           <span className="text-[9px] font-bold text-amber-600/80 uppercase tracking-tighter">Awaiting Result</span>
        </div>
      ) : null}
    </div>
  );
};
