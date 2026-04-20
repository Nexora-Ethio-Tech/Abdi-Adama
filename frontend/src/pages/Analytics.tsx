
import {
  TrendingUp,
  TrendingDown,
  Users,
  GraduationCap,
  DollarSign,
  Building2,
  Filter,
  Download,
  AlertCircle,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { mockStudents } from '../data/mockData';
import { Link } from 'react-router-dom';

export const Analytics = () => {
  const metrics = [
    { label: 'Total Revenue', value: '4.8M ETB', trend: '+12.5%', isPositive: true, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Total Students', value: '1,284', trend: '+4.3%', isPositive: true, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Teachers', value: '76', trend: '-2.1%', isPositive: false, icon: GraduationCap, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Active Branches', value: '4', trend: '0%', isPositive: true, icon: Building2, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const branchPerformance = [
    { name: 'Main Branch', revenue: '1.8M', students: 450, growth: '+5%' },
    { name: 'Bole Branch', revenue: '1.2M', students: 320, growth: '+8%' },
    { name: 'Megenagna Branch', revenue: '950K', students: 280, growth: '+2%' },
    { name: 'Adama Branch', revenue: '850K', students: 234, growth: '+12%' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Global Analytics</h2>
          <p className="text-sm text-slate-500">Cross-branch performance metrics and financial trends.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter size={18} />
            This Year
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
            <Download size={18} />
            Export Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {metrics.map((metric, i) => (
          <div key={i} className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className={`${metric.bg} ${metric.color} p-2 md:p-3 rounded-xl md:rounded-2xl`}>
                <metric.icon size={20} className="md:w-6 md:h-6" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                metric.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
              }`}>
                {metric.isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {metric.trend}
              </div>
            </div>
            <p className="text-slate-500 text-[10px] md:text-xs font-black md:font-bold uppercase tracking-widest md:tracking-wider truncate">{metric.label}</p>
            <h3 className="text-lg md:text-2xl font-black md:font-bold text-slate-800 mt-1">{metric.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Growth Chart (Simplified SVG) */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-800">Revenue Growth Trend</h3>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                <span className="text-slate-500">Income</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                <span className="text-slate-500">Expense</span>
              </div>
            </div>
          </div>
          <div className="relative h-64 w-full pt-4">
            <div className="absolute inset-0 flex items-end justify-between px-2">
              {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
                <div key={i} className="w-[6%] flex flex-col items-center gap-2 group">
                  <div className="w-full relative h-48 flex items-end justify-center">
                    <div className="absolute w-full bg-slate-100 rounded-t-md h-full -z-10"></div>
                    <div
                      className="w-full bg-blue-500/20 group-hover:bg-blue-500/40 transition-all rounded-t-md relative"
                      style={{ height: `${h}%` }}
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    {['S', 'O', 'N', 'D', 'J', 'F', 'M', 'A', 'M', 'J', 'J', 'A'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Branch Distribution */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-8">Branch Performance</h3>
          <div className="space-y-6">
            {branchPerformance.map((branch, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-700">{branch.name}</span>
                  <span className="text-xs font-bold text-emerald-600">{branch.growth} growth</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${(branch.students / 500) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-bold text-slate-500 w-12 text-right">{branch.revenue}</span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">{branch.students} Active Students</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent High-Value Transactions or Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AI Early Warning System Watchlist */}
        <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-50 text-rose-600 rounded-xl">
                <ShieldAlert size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Priority Watchlist</h3>
                <p className="text-xs text-slate-500 font-medium">AI-detected academic and attendance risks</p>
              </div>
            </div>
            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full uppercase">High Attention</span>
          </div>

          <div className="space-y-4">
            {mockStudents.filter(s => s.riskLevel === 'High' || s.riskLevel === 'Medium').map((student: any) => (
              <div key={student.id} className="group flex items-center justify-between p-4 border border-slate-50 rounded-2xl hover:border-rose-100 hover:bg-rose-50/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                    student.riskLevel === 'High' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'
                  }`}>
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{student.name}</h4>
                    <p className="text-[10px] font-medium text-slate-500 uppercase">Grade {student.grade} • {student.riskFactor || 'Multiple risk factors detected'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden sm:block text-right">
                    <p className={`text-xs font-bold ${student.riskLevel === 'High' ? 'text-rose-600' : 'text-amber-600'}`}>
                      {student.riskLevel} RISK
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium">Detected 2 days ago</p>
                  </div>
                  <Link to={`/students/${student.id}`} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-xl transition-all shadow-sm">
                    <ChevronRight size={20} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 py-3 border border-dashed border-slate-200 rounded-2xl text-sm font-bold text-slate-400 hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50 transition-all">
            View All Flagged Students
          </button>
        </div>

        {/* Behavioral Correlation */}
        <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white">
          <h3 className="font-bold mb-2">Behavioral Insights</h3>
          <p className="text-xs text-slate-400 mb-8 font-medium">Correlation between attendance & grades</p>

          <div className="space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Attendance Impact</span>
                <span className="text-rose-400 font-bold">-12.5% Avg Score</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 w-[85%]"></div>
              </div>
              <p className="text-[10px] text-white/40 leading-relaxed italic">
                * Students with &lt;85% attendance show a 12.5% drop in Math/Physics.
              </p>
            </div>

            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
              <div className="flex items-center gap-2 mb-2 text-blue-400">
                <AlertCircle size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">AI Suggestion</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-300">
                Early intervention for "Sara Kebede" could improve final grades by an estimated 8%.
              </p>
              <button className="mt-3 text-[10px] font-bold text-white bg-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-500 transition-colors">
                Intervene Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-3xl p-8 text-white">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-lg">Cross-Branch Financial Alerts</h3>
          <span className="text-xs text-slate-400">Real-time monitoring</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Megenagna Branch</span>
            </div>
            <p className="text-sm font-medium">Monthly fee collection exceeded target by 15%</p>
          </div>
          <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-amber-500"></div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Adama Branch</span>
            </div>
            <p className="text-sm font-medium">Pending utility payments: 45,000 ETB</p>
          </div>
          <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">System-wide</span>
            </div>
            <p className="text-sm font-medium">Staff salaries processed for all 4 branches</p>
          </div>
        </div>
      </div>
    </div>
  );
};
