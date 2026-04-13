
import { UserPlus, Calendar, ShieldCheck, Search, Filter, MoreVertical } from 'lucide-react';
import { mockTeachers, mockSchedules } from '../data/mockData';
import { useState } from 'react';

export const Teachers = () => {
  const [viewingSchedule, setViewingSchedule] = useState<string | null>(null);

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
        <div className="bg-white p-4 md:p-8 rounded-2xl border border-slate-100 shadow-sm">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">Schedule for {teacher?.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {schedule.length > 0 ? (
              schedule.map((slot, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-blue-600 font-bold text-sm mb-1">{slot.day}</p>
                  <p className="font-semibold text-slate-800">{slot.time}</p>
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors w-full md:w-fit text-sm md:text-base">
          <UserPlus size={20} />
          <span>Approve New Teacher</span>
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

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-x-auto">
        <table className="w-full text-left min-w-[800px]">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Teacher</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Subjects</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Schedule</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockTeachers.map((teacher) => (
              <tr key={teacher.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold text-sm">
                      {teacher.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{teacher.name}</p>
                      <p className="text-[10px] text-slate-500">{teacher.branch} Campus</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {teacher.subjects.map(s => (
                      <span key={s} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setViewingSchedule(teacher.id)}
                    className="text-blue-600 hover:text-blue-800 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Calendar size={14} />
                    View Schedule
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-emerald-600">
                    <ShieldCheck size={14} />
                    <span className="text-xs font-medium">Verified</span>
                  </div>
                </td>
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
    </div>
  );
};
