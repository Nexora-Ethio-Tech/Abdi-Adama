
import { UserPlus, BookOpen, Clock, ShieldCheck, Search, Filter } from 'lucide-react';
import { mockTeachers } from '../data/mockData';

export const Teachers = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors w-fit">
          <UserPlus size={20} />
          <span>Approve New Teacher</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search teachers..."
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64"
            />
          </div>
          <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
            <Filter size={20} className="text-slate-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTeachers.map((teacher) => (
          <div key={teacher.id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold text-lg">
                  {teacher.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{teacher.name}</h3>
                  <p className="text-xs text-slate-500">{teacher.branch} Campus</p>
                </div>
              </div>
              <span className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md text-[10px] font-bold uppercase">Verified</span>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <BookOpen size={16} className="text-slate-400" />
                <span>{teacher.subjects.join(', ')}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Clock size={16} className="text-slate-400" />
                <span>8:00 AM - 4:00 PM</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <ShieldCheck size={16} className="text-slate-400" />
                <span>2 Active Classes</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 text-sm font-medium py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">View Profile</button>
              <button className="flex-1 text-sm font-medium py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">Assign Load</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
