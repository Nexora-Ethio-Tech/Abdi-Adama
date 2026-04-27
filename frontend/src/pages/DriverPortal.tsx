
import { Megaphone, MapPin, Plus, X, Send, Bus, Clock } from 'lucide-react';
import { useState } from 'react';
import { useUser } from '../context/UserContext';

interface LogisticsNotice {
  id: string;
  title: string;
  content: string;
  stations: string;
  driverName: string;
  timestamp: string;
  category: 'Logistics';
}

export const DriverPortal = () => {
  const { user } = useUser();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [stations, setStations] = useState('');
  const [notices, setNotices] = useState<LogisticsNotice[]>([
    {
      id: 'LN1',
      title: 'Bus #4 running 15 mins late',
      content: 'Heavy traffic near Meskel Square. Expect a 15-minute delay on Route B.',
      stations: 'Meskel Square, Bole Medhanialem, Megenagna',
      driverName: user?.name || 'Driver',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      category: 'Logistics',
    },
    {
      id: 'LN2',
      title: 'Route change — construction on Adama Road',
      content: 'Detour via Ring Road due to road construction. Students at Kality stop, please wait at the alternate point.',
      stations: 'Kality, Akaki, Dukem, Adama',
      driverName: user?.name || 'Driver',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      category: 'Logistics',
    },
  ]);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    const newNotice: LogisticsNotice = {
      id: `LN${Date.now()}`,
      title,
      content,
      stations,
      driverName: user?.name || 'Driver',
      timestamp: new Date().toISOString(),
      category: 'Logistics',
    };
    setNotices((prev) => [newNotice, ...prev]);
    setTitle('');
    setContent('');
    setStations('');
    setShowForm(false);
  };

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 rounded-[2rem] p-6 md:p-8 text-white overflow-hidden shadow-2xl shadow-orange-200/40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.15),_transparent_50%)]" />
        <div className="absolute -bottom-8 -right-8 opacity-10">
          <Bus size={160} />
        </div>
        <div className="relative space-y-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
              <Bus size={20} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">Logistics Dashboard</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight">
            Hello, {user?.name || 'Driver'} 👋
          </h1>
          <p className="text-white/70 text-sm max-w-md">
            Post real-time updates for parents and staff. Keep everyone informed about routes, delays, and arrivals.
          </p>
        </div>
      </div>

      {/* Quick Status Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <Megaphone size={18} />
            </div>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Notices Posted</p>
          <p className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-1">{notices.length}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <MapPin size={18} />
            </div>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Today's Status</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">Active</p>
        </div>
      </div>

      {/* Big Post Update Button */}
      <button
        onClick={() => setShowForm(true)}
        className="w-full py-5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl font-black text-lg uppercase tracking-wider shadow-xl shadow-orange-200/50 dark:shadow-orange-900/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
      >
        <Plus size={24} className="bg-white/20 p-1 rounded-lg" />
        Post Update
      </button>

      {/* Recent Notices */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-wider">Your Recent Notices</h3>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{notices.length} total</span>
        </div>
        {notices.map((notice, i) => (
          <div
            key={notice.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-all group"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[9px] font-black uppercase tracking-widest rounded-full">
                  Logistics
                </span>
                <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                  <Clock size={10} />
                  {formatTime(notice.timestamp)}
                </span>
              </div>
            </div>
            <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-1">{notice.title}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">{notice.content}</p>
            {notice.stations && (
              <div className="flex items-start gap-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <MapPin size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Stations</p>
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300">{notice.stations}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Post Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white dark:bg-slate-900 w-full sm:max-w-md sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500 text-white rounded-xl shadow-lg shadow-amber-200">
                  <Send size={18} />
                </div>
                <div>
                  <h3 className="font-black text-slate-800 dark:text-slate-100 text-sm uppercase tracking-wider">Post Logistics Update</h3>
                  <p className="text-[10px] text-slate-500 font-bold">Broadcast to Admin, VP, Parents & Students</p>
                </div>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all text-slate-400"
              >
                <X size={20} />
              </button>
            </div>
            <form className="p-6 space-y-4" onSubmit={handlePost}>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Title</label>
                <input
                  required
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Bus #4 running late"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Details</label>
                <textarea
                  required
                  rows={3}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Describe the update..."
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500 transition-all resize-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                  <MapPin size={12} />
                  Stations / Stops
                </label>
                <input
                  type="text"
                  value={stations}
                  onChange={(e) => setStations(e.target.value)}
                  placeholder="e.g. Meskel Square, Bole, Megenagna"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                />
                <p className="text-[9px] text-slate-400 font-medium ml-1">Comma-separated names of places you wait for students</p>
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm uppercase tracking-wider rounded-xl shadow-xl shadow-orange-200/50 dark:shadow-none transition-all flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Broadcast Update
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
