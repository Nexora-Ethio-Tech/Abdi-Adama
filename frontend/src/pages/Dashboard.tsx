
import { Users, GraduationCap, Clock, TrendingUp } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, trend, color }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
    <div className="flex items-center justify-between mb-4">
      <div className={`${color} p-3 rounded-lg text-white`}>
        <Icon size={24} />
      </div>
      {trend && (
        <span className="text-emerald-500 text-sm font-medium bg-emerald-50 px-2 py-1 rounded-full">
          {trend}
        </span>
      )}
    </div>
    <h3 className="text-slate-500 text-sm font-medium">{label}</h3>
    <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
  </div>
);

export const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          label="Total Students"
          value="1,284"
          trend="+4.3%"
          color="bg-blue-600"
        />
        <StatCard
          icon={GraduationCap}
          label="Total Teachers"
          value="76"
          color="bg-purple-600"
        />
        <StatCard
          icon={Clock}
          label="Daily Attendance"
          value="94.2%"
          trend="+1.2%"
          color="bg-orange-500"
        />
        <StatCard
          icon={TrendingUp}
          label="Monthly Revenue"
          value="450,000 ETB"
          color="bg-emerald-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-slate-800">New student registration: Abebe Bikila</p>
                  <p className="text-xs text-slate-500 mt-1">2 hours ago • Registration Office</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Upcoming Events</h3>
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100">
                <div className="text-center px-3 border-r border-slate-200">
                  <p className="text-lg font-bold text-blue-600">15</p>
                  <p className="text-xs font-medium text-slate-500 uppercase">Apr</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">Teacher-Parent Conference</p>
                  <p className="text-xs text-slate-500 mt-1">09:00 AM - 12:00 PM • Main Hall</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
