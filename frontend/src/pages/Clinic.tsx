
import { useState } from 'react';
import {
  HeartPulse,
  Search,
  Plus,
  History,
  AlertCircle,
  User,
  CheckCircle,
  FileText,
  Clock,
  Mail,
  Stethoscope
} from 'lucide-react';
import { mockStudents } from '../data/mockData';

interface VisitLog {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  time: string;
  reason: string;
  treatment: string;
  status: 'pending-approval' | 'sent' | 'rejected';
}

const initialVisitLogs: VisitLog[] = [
  { id: 'V1', studentId: '1', studentName: 'Zekarias Teshome', date: '2026-05-20', time: '10:30 AM', reason: 'Headache & Mild Fever', treatment: 'Paracetamol given, resting in clinic', status: 'sent' },
  { id: 'V2', studentId: '2', studentName: 'Liyu Solomon', date: '2026-05-20', time: '11:45 AM', reason: 'Scraped Knee', treatment: 'Cleaned wound and applied bandage', status: 'pending-approval' },
];

export const Clinic = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'directory' | 'visits'>('directory');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [visitLogs, setVisitLogs] = useState<VisitLog[]>(initialVisitLogs);
  const [showLogModal, setShowLogModal] = useState(false);
  const [newVisit, setNewVisit] = useState({ reason: '', treatment: '' });

  const filteredStudents = mockStudents.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.id.includes(searchQuery)
  );

  const handleLogVisit = (e: React.FormEvent) => {
    e.preventDefault();
    const log: VisitLog = {
      id: `V${visitLogs.length + 1}`,
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reason: newVisit.reason,
      treatment: newVisit.treatment,
      status: 'pending-approval'
    };
    setVisitLogs([log, ...visitLogs]);
    setShowLogModal(false);
    setNewVisit({ reason: '', treatment: '' });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
            <HeartPulse className="text-rose-500" size={32} />
            School Clinic Management
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Monitor student health and manage clinical visits</p>
        </div>
        <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('directory')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'directory' ? 'bg-white dark:bg-slate-700 text-rose-600 shadow-sm' : 'text-slate-500'}`}
          >
            Directory
          </button>
          <button
            onClick={() => setActiveTab('visits')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'visits' ? 'bg-white dark:bg-slate-700 text-rose-600 shadow-sm' : 'text-slate-500'}`}
          >
            Visits
          </button>
        </div>
      </div>

      {activeTab === 'directory' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <div className="card p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="mt-4 space-y-2 max-h-[500px] overflow-y-auto custom-scrollbar">
                {filteredStudents.map(student => (
                  <button
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                    className={`w-full p-3 flex items-center gap-3 rounded-xl transition-all ${selectedStudent?.id === student.id ? 'bg-rose-50 dark:bg-rose-900/20 border-l-4 border-rose-500' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                  >
                    <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500 font-bold">
                      {student.name[0]}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{student.name}</p>
                      <p className="text-[10px] text-slate-500 font-bold">ID: {student.id} • Grade: {student.grade}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            {selectedStudent ? (
              <div className="space-y-6">
                <div className="card p-8">
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-rose-100 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center text-rose-600">
                        <User size={40} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white">{selectedStudent.name}</h2>
                        <p className="text-slate-500 font-bold">Grade {selectedStudent.grade} • Section A</p>
                        <div className="flex gap-2 mt-2">
                          <span className="px-2 py-1 bg-amber-100 text-amber-700 text-[10px] font-black uppercase rounded-md flex items-center gap-1">
                            <AlertCircle size={10} />
                            Nut Allergy
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-black uppercase rounded-md flex items-center gap-1">
                            <CheckCircle size={10} />
                            Blood Type: O+
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowLogModal(true)}
                      className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-rose-200 dark:shadow-none"
                    >
                      <Plus size={18} />
                      Log New Visit
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <FileText size={16} />
                        Medical History
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex justify-between text-sm">
                          <span className="text-slate-500">Chronic Conditions:</span>
                          <span className="font-bold dark:text-slate-200">None</span>
                        </li>
                        <li className="flex justify-between text-sm">
                          <span className="text-slate-500">Home Medications:</span>
                          <span className="font-bold dark:text-slate-200">Multivitamins (Daily)</span>
                        </li>
                        <li className="flex justify-between text-sm">
                          <span className="text-slate-500">Vaccination Status:</span>
                          <span className="text-emerald-600 font-bold">Up to Date</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <AlertCircle size={16} />
                        Emergency Contact
                      </h3>
                      <div className="space-y-1">
                        <p className="text-sm font-bold dark:text-slate-100">Solomon Ayele (Father)</p>
                        <p className="text-sm text-rose-600 font-bold">+251 911 223344</p>
                        <p className="text-[10px] text-slate-500 mt-2 italic">Parent will be notified automatically on every clinic visit.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <History size={20} className="text-rose-500" />
                    Visit History
                  </h3>
                  <div className="space-y-4">
                    {visitLogs.filter(v => v.studentId === selectedStudent.id).map(v => (
                      <div key={v.id} className="p-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-slate-500">
                            <Clock size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-bold dark:text-slate-100">{v.reason}</p>
                            <p className="text-xs text-slate-500 font-medium">{v.date} • {v.time}</p>
                          </div>
                        </div>
                        <div className="text-right">
                           <span className="px-2 py-1 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-700 flex items-center gap-1">
                             <CheckCircle size={10} />
                             Parent Emailed
                           </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="card h-full flex flex-col items-center justify-center p-12 text-center space-y-4">
                <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300">
                  <HeartPulse size={48} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Select a Student</h3>
                  <p className="text-slate-500 max-w-xs mx-auto">Select a student from the directory to view their medical profile and log clinical visits.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Student</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Date & Time</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Reason</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Treatment</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {visitLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-[10px] font-bold">
                        {log.studentName[0]}
                      </div>
                      <span className="text-sm font-bold dark:text-slate-200">{log.studentName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    <div className="font-medium text-slate-700 dark:text-slate-300">{log.date}</div>
                    <div className="text-[10px]">{log.time}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold dark:text-slate-300">{log.reason}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{log.treatment}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-700">
                      Email Sent
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 bg-rose-600 text-white">
              <h3 className="text-xl font-black flex items-center gap-2">
                <Stethoscope size={24} />
                Log Clinical Visit
              </h3>
              <p className="text-rose-100 text-xs font-medium mt-1">For student: {selectedStudent?.name}</p>
            </div>
            <form onSubmit={handleLogVisit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reason for Visit</label>
                <textarea
                  required
                  placeholder="Describe symptoms or reason..."
                  value={newVisit.reason}
                  onChange={(e) => setNewVisit({...newVisit, reason: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-rose-500 h-24 resize-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Treatment Provided</label>
                <textarea
                  required
                  placeholder="Medicine given or treatment performed..."
                  value={newVisit.treatment}
                  onChange={(e) => setNewVisit({...newVisit, treatment: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-rose-500 h-24 resize-none"
                />
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-2xl flex gap-3 border border-emerald-100 dark:border-emerald-900/20">
                <Mail size={20} className="text-emerald-600 flex-shrink-0" />
                <p className="text-[10px] text-emerald-800 dark:text-emerald-200 leading-relaxed">
                  <strong>Direct Notification:</strong> An official email will be sent directly to the parent immediately after logging this visit.
                </p>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="flex-1 px-6 py-3 rounded-2xl font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-rose-200 dark:shadow-none"
                >
                  Log & Send Email
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
