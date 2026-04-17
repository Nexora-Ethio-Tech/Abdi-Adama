
import { BookOpen, FileText, PlayCircle, CheckCircle2, Clock, Download, Plus, Search } from 'lucide-react';
import { useUser } from '../context/UserContext';

export const LMS = () => {
  const { role } = useUser();
  const isTeacher = role === 'teacher';

  const modules = [
    { id: 1, title: 'Introduction to Calculus', progress: 85, lessons: 12, assets: 4, type: 'Mathematics' },
    { id: 2, title: 'Advanced Organic Chemistry', progress: 40, lessons: 15, assets: 6, type: 'Science' },
    { id: 3, title: 'Modern World History', progress: 10, lessons: 10, assets: 3, type: 'Social Studies' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Learning Management System</h2>
          <p className="text-sm text-slate-500">Access curriculum, digital resources, and assignments.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search resources..."
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>
          {isTeacher && (
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
              <Plus size={18} />
              Add Resource
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Curriculum Mapping Section */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <BookOpen size={20} className="text-blue-600" />
            Curriculum Mapping
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((module) => (
              <div key={module.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded uppercase">
                    {module.type}
                  </span>
                  <div className="flex items-center gap-1 text-emerald-600">
                    <CheckCircle2 size={16} />
                    <span className="text-xs font-bold">{module.progress}%</span>
                  </div>
                </div>
                <h4 className="font-bold text-slate-800 mb-2">{module.title}</h4>
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-6 font-medium">
                  <div className="flex items-center gap-1">
                    <FileText size={14} />
                    {module.lessons} Lessons
                  </div>
                  <div className="flex items-center gap-1">
                    <PlayCircle size={14} />
                    {module.assets} Media
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${module.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <button className="text-sm font-bold text-blue-600 hover:underline">Continue Learning</button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg">
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Digital Repository */}
        <div className="space-y-6">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Clock size={20} className="text-orange-500" />
            Recently Added
          </h3>
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-4 space-y-4">
              {[
                { name: 'EC-12 Physics Syllabus.pdf', size: '2.4 MB', date: '2 hours ago' },
                { name: 'Calculus Module 4 Video', size: '45 MB', date: '5 hours ago' },
                { name: 'Organic Chem Quiz.docx', size: '850 KB', date: 'Yesterday' },
                { name: 'Historical Timelines Map', size: '5.2 MB', date: '2 days ago' },
              ].map((asset, i) => (
                <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700 truncate w-32 md:w-auto">{asset.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{asset.size} • {asset.date}</p>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-blue-600">
                    <Download size={18} />
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full py-4 bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-widest hover:bg-slate-100 transition-colors border-t border-slate-100">
              Open Full Repository
            </button>
          </div>
        </div>
      </div>

      {/* Course Planner (Teacher Only) */}
      {isTeacher && (
        <div className="bg-slate-900 rounded-3xl p-8 text-white">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold">Academic Planner</h3>
              <p className="text-sm text-slate-400">Map your curriculum to the academic calendar.</p>
            </div>
            <button className="px-6 py-2 bg-white text-slate-900 rounded-xl text-sm font-bold hover:bg-slate-100 transition-colors">
              Update Syllabus
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Week 1-4: Fundamentals', 'Week 5-8: Application', 'Week 9-12: Assessment'].map((phase, i) => (
              <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                <p className="text-[10px] font-bold text-blue-400 uppercase mb-2">Phase {i+1}</p>
                <h4 className="font-bold mb-4">{phase}</h4>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(j => (
                    <div key={j} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-[10px] font-bold">
                      M{j}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
