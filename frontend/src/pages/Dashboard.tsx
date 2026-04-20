
import { Users, GraduationCap, Clock, TrendingUp, Lock, Unlock, Megaphone, Plus, X, Bell, Book, BookOpen, AlertTriangle, ShieldAlert, ArrowRight } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useState } from 'react';
import { mockStudents } from '../data/mockData';
import { Link } from 'react-router-dom';

const StatCard = ({ icon: Icon, label, value, trend, color }: any) => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors duration-300">
    <div className="flex items-center justify-between mb-4">
      <div className={`${color} p-3 rounded-lg text-white`}>
        <Icon size={24} />
      </div>
      {trend && (
        <span className="text-emerald-500 text-sm font-medium bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-full">
          {trend}
        </span>
      )}
    </div>
    <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">{label}</h3>
    <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">{value}</p>
  </div>
);

export const Dashboard = () => {
  const { role, gradesLocked, setGradesLocked } = useUser();
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [notices] = useState([
    { id: 1, title: 'Term 3 Exams Schedule', content: 'The final schedule for Term 3 exams has been posted in the academic office.', priority: 'High', time: '1 hour ago', expiresAt: '2024-06-30' },
    { id: 2, title: 'School Bus Maintenance', content: 'Route B buses will be undergoing maintenance this Friday. Please expect minor delays.', priority: 'Medium', time: 'Yesterday', expiresAt: '2024-05-15' }
  ]);

  const isAdmin = role === 'super-admin' || role === 'school-admin';

  return (
    <div className="space-y-8">
      {role === 'school-admin' && (
        <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors duration-300 ${
          gradesLocked
            ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
            : 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800'
        }`}>
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${
              gradesLocked ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-600' : 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600'
            }`}>
              {gradesLocked ? <Lock size={24} /> : <Unlock size={24} />}
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100">
                Grade Insertion is {gradesLocked ? 'LOCKED' : 'OPEN'}
              </h3>
              <p className="text-sm text-slate-600">
                {gradesLocked
                  ? 'System is currently performing averages and ranking.'
                  : 'Teachers can currently enter and modify student grades.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setGradesLocked(!gradesLocked)}
            className={`w-full sm:w-auto px-6 py-2 rounded-lg font-bold transition-colors ${
              gradesLocked
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-amber-600 hover:bg-amber-700 text-white'
            }`}
          >
            {gradesLocked ? 'Open Insertion' : 'Close Insertion'}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {role === 'librarian' ? (
          <>
            <StatCard
              icon={Book}
              label="Total Books"
              value="2,450"
              color="bg-blue-600"
            />
            <StatCard
              icon={BookOpen}
              label="Active Loans"
              value="184"
              trend="+12%"
              color="bg-purple-600"
            />
            <StatCard
              icon={AlertTriangle}
              label="Overdue Books"
              value="12"
              color="bg-rose-500"
            />
            <StatCard
              icon={Users}
              label="Visitors Today"
              value="42"
              color="bg-emerald-500"
            />
          </>
        ) : (
          <>
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
            {(role === 'super-admin' || role === 'school-admin' || role === 'teacher') && (
              <StatCard
                icon={Clock}
                label="Daily Attendance"
                value="94.2%"
                trend="+1.2%"
                color="bg-orange-500"
              />
            )}
            {(role === 'super-admin' || role === 'school-admin' || role === 'finance-clerk') && (
              <StatCard
                icon={TrendingUp}
                label="Monthly Revenue"
                value="450,000 ETB"
                color="bg-emerald-500"
              />
            )}
          </>
        )}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
              <Megaphone size={20} />
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100">School Notice Board</h3>
          </div>
          {isAdmin && (
            <button
              onClick={() => setShowNoticeModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold"
            >
              <Plus size={16} />
              <span>Post Notice</span>
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800">
          {notices.map((notice) => (
            <div key={notice.id} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  notice.priority === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {notice.priority} Priority
                </span>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-slate-400 font-medium">{notice.time}</span>
                  {notice.expiresAt && <span className="text-[10px] text-rose-400 italic font-medium">Expires: {notice.expiresAt}</span>}
                </div>
              </div>
              <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-2">{notice.title}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {notice.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {isAdmin && (
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <ShieldAlert size={20} className="text-rose-600" />
                Priority Watchlist
              </h3>
              <Link to="/analytics" className="text-xs font-bold text-blue-600 hover:underline uppercase tracking-widest">
                Full Report
              </Link>
            </div>
            <div className="space-y-4">
              {mockStudents.filter(s => s.riskLevel === 'High' || s.riskLevel === 'Medium').slice(0, 4).map((student, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${student.riskLevel === 'High' ? 'bg-rose-500' : 'bg-amber-500'}`} />
                    <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{student.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium uppercase">Grade {student.grade} • {student.riskLevel} Risk</p>
                    </div>
                  </div>
                  <Link to={`/students/${student.id}`} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-all">
                    <ArrowRight size={16} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors duration-300">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[
              { text: 'Annual Sports Day event created', time: '2 hours ago', office: 'Admin Office' },
              { text: 'Monthly newsletter sent to parents', time: '5 hours ago', office: 'Communications' },
              { text: 'Staff meeting agenda updated', time: 'Yesterday', office: 'Academic Office' },
              { text: 'Quarterly financial report finalized', time: '2 days ago', office: 'Finance Dept' },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{activity.text}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{activity.time} • {activity.office}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors duration-300">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6">Upcoming Events</h3>
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                <div className="text-center px-3 border-r border-slate-200 dark:border-slate-700">
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">15</p>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">Apr</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Teacher-Parent Conference</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">09:00 AM - 12:00 PM • Main Hall</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showNoticeModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider text-sm">Post New Notice</h3>
              <button onClick={() => setShowNoticeModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setShowNoticeModal(false); }}>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Notice Title</label>
                <input required type="text" placeholder="e.g. Public Holiday Announcement" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Priority Level</label>
                <select className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all">
                  <option value="Normal">Normal</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High Priority</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Content</label>
                <textarea required rows={4} placeholder="Write the details of the notice here..." className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Expiry Date</label>
                <input type="date" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
              <div className="pt-4">
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-200 dark:shadow-none flex items-center justify-center gap-2">
                  <Bell size={18} />
                  <span>Publish Notice</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
