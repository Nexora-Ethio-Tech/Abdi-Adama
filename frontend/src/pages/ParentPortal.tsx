
import { MessageSquare, AlertCircle } from 'lucide-react';

export const ParentPortal = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Hello, Mr. Bikila</h2>
          <p className="text-slate-500">Monitoring your children's academic progress.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
            <MessageSquare size={18} />
            <span>Contact Teachers</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-lg font-semibold text-slate-800">My Children</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'Abebe Bikila', grade: '10A', attendance: '96%', performance: 'Excellent' },
              { name: 'Sara Bikila', grade: '7B', attendance: '94%', performance: 'Good' },
            ].map((child, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                    {child.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{child.name}</h4>
                    <p className="text-xs text-slate-500">Grade {child.grade}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Attendance</span>
                    <span className="font-medium text-emerald-600">{child.attendance}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Performance</span>
                    <span className="font-medium text-blue-600">{child.performance}</span>
                  </div>
                </div>
                <button className="w-full mt-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-100">
                  View Full Report
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-slate-800">Fee Status</h3>
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-red-50 p-2 rounded-lg text-red-600">
                <AlertCircle size={20} />
              </div>
              <span className="text-sm font-medium text-slate-800">Outstanding Balance</span>
            </div>
            <p className="text-3xl font-bold text-slate-800 mb-2">4,500 ETB</p>
            <p className="text-xs text-slate-500 mb-6">Due date: April 30, 2026</p>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-bold">
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
