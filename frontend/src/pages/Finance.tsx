
import { CreditCard, ArrowUpRight, ArrowDownRight, Search, FileText, Users, Briefcase, ShoppingCart, Plus, X, Check, AlertCircle, Bell, History, ShieldCheck, Clock, UserPlus } from 'lucide-react';
import { mockFinances, mockStudents } from '../data/mockData';
import { useUser } from '../context/UserContext';
import { useState } from 'react';
import { StudentRegistration } from '../components/StudentRegistration';

interface PaymentLog {
  status: boolean;
  modifiedBy: string;
  timestamp: string;
}

export const Finance = () => {
  const { role, user } = useUser();
  const isAdmin = role === 'super-admin' || role === 'school-admin';
  const isClerk = role === 'finance-clerk';
  const isFinance = isClerk || isAdmin;
  const [showForm, setShowForm] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState<{name: string, logs: PaymentLog[]} | null>(null);

  const [paymentStatus, setPaymentStatus] = useState<Record<string, PaymentLog[]>>({
    '1': [{ status: true, modifiedBy: 'System Initializer', timestamp: '2026-04-01 09:00 AM' }],
    '2': [{ status: false, modifiedBy: 'System Initializer', timestamp: '2026-04-01 09:00 AM' }],
    '3': [{ status: false, modifiedBy: 'System Initializer', timestamp: '2026-04-01 09:00 AM' }],
    '6': [{ status: false, modifiedBy: 'System Initializer', timestamp: '2026-04-01 09:00 AM' }],
  });

  const [activeView, setActiveView] = useState<'main' | 'audit' | 'registration'>('main');

  const allAuditLogs = Object.entries(paymentStatus).flatMap(([id, logs]) => {
    const student = mockStudents.find(s => s.id === id);
    return logs.map(log => ({
      ...log,
      studentName: student?.name || 'Unknown Student',
      studentId: id
    }));
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const togglePayment = (id: string) => {
    const currentLogs = paymentStatus[id] || [];
    const lastStatus = currentLogs.length > 0 ? currentLogs[0].status : false;

    const newLog: PaymentLog = {
      status: !lastStatus,
      modifiedBy: user?.name || 'Unknown Officer',
      timestamp: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    setPaymentStatus(prev => ({
      ...prev,
      [id]: [newLog, ...currentLogs]
    }));
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-slate-400 text-sm font-medium mb-1">Total Revenue</p>
            <h3 className="text-3xl font-bold">{mockFinances.totalRevenue.toLocaleString()} ETB</h3>
            <div className="mt-8 flex items-center gap-2 text-emerald-400 text-sm">
              <ArrowUpRight size={16} />
              <span>+12% from last month</span>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <CreditCard size={120} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-sm font-medium mb-1">Pending Fees</p>
          <h3 className="text-3xl font-bold text-slate-800">{mockFinances.pendingFees.toLocaleString()} ETB</h3>
          <div className="mt-8 flex items-center gap-2 text-amber-500 text-sm">
            <ArrowDownRight size={16} />
            <span>5.2% of total expected</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-sm font-medium mb-1">Registration Fees (Monthly)</p>
          <h3 className="text-3xl font-bold text-slate-800">45,000 ETB</h3>
          <div className="mt-8 flex items-center gap-2 text-emerald-400 text-sm">
            <ArrowUpRight size={16} />
            <span>Target: 50,000 ETB</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveView('main')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeView === 'main' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
              >
                {isAdmin ? 'Summaries' : 'Transactions'}
              </button>
              {isAdmin && (
                <button
                  onClick={() => setActiveView('audit')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeView === 'audit' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
                >
                  System Audit Log
                </button>
              )}
              {(isClerk || role === 'super-admin') && (
                <button
                  onClick={() => setActiveView('registration')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${activeView === 'registration' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
                >
                  <UserPlus size={14} />
                  Registration
                </button>
              )}
            </div>
            {isFinance && (
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold"
              >
                <Plus size={16} />
                <span>New TX</span>
              </button>
            )}
          </div>
          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none w-full sm:w-48"
              />
            </div>
            <button className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1 whitespace-nowrap">
              <FileText size={14} />
              <span className="hidden xs:inline">Export Report</span>
              <span className="xs:hidden">Export</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          {activeView === 'registration' ? (
            <div className="p-6">
              <StudentRegistration isAdminView={true} />
            </div>
          ) : activeView === 'audit' ? (
            <table className="w-full text-left text-sm min-w-[800px]">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Timestamp</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Officer</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Action</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Target Student</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {allAuditLogs.map((log, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors border-l-4 border-transparent hover:border-blue-600">
                    <td className="px-6 py-4 text-slate-500 font-mono text-[10px]">{log.timestamp}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                         <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-600">
                           {log.modifiedBy[0]}
                         </div>
                         <span className="font-bold text-slate-800">{log.modifiedBy}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        log.status ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                      }`}>
                        {log.status ? 'Approved Payment' : 'Revoked Payment'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <span className="font-medium text-slate-600">{log.studentName}</span>
                       <span className="text-[10px] text-slate-400 ml-2">({log.studentId})</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : isClerk ? (
            <table className="w-full text-left text-sm min-w-[800px]">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Student</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-center">Payment Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-center">Alerts</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockStudents.map((student) => {
                  const logs = paymentStatus[student.id] || [];
                  const isPaid = logs.length > 0 ? logs[0].status : false;
                  const scholarship = (student as any).isScholarship;
                  const busUser = (student as any).isBusUser;
                  const penalty = (student as any).penaltyFee || 0;
                  const monthly = (student as any).monthlyFee || 0;
                  const bus = (student as any).busFee || 0;
                  const totalExpected = (scholarship ? 0 : monthly) + (busUser ? bus : 0) + penalty;

                  return (
                    <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-xs">
                            {student.name[0]}
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">{student.name}</p>
                            <p className="text-[10px] text-slate-500 flex items-center gap-2">
                              Grade {student.grade}
                              {scholarship && (
                                <span className="bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded text-[8px] font-black uppercase">Scholarship</span>
                              )}
                              {busUser && (
                                <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter">Bus User</span>
                              )}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col items-center gap-1">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => !scholarship && togglePayment(student.id)}
                              disabled={scholarship}
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                scholarship
                                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                                  : isPaid
                                    ? 'bg-emerald-100 text-emerald-700 shadow-sm'
                                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                              }`}
                            >
                              {scholarship ? (
                                <Check size={14} />
                              ) : isPaid ? (
                                <Check size={14} />
                              ) : (
                                <div className="w-3.5" />
                              )}
                              <span>{scholarship ? 'COVERED' : isPaid ? 'PAID' : 'PENDING'}</span>
                            </button>

                            {logs.length > 0 && (
                              <button
                                onClick={() => setSelectedHistory({ name: student.name, logs })}
                                className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                title="Audit Trail"
                              >
                                <History size={16} />
                              </button>
                            )}
                          </div>

                          {!scholarship && !isPaid && totalExpected > 0 && (
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                              Total: {totalExpected.toLocaleString()} ETB
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {!scholarship && !isPaid && (
                          <div className="flex flex-col items-center gap-1">
                            {penalty > 0 && (
                              <div className="flex items-center gap-1 text-rose-500 font-bold text-[10px] animate-pulse">
                                <AlertCircle size={12} />
                                <span>+{penalty} ETB Penalty</span>
                              </div>
                            )}
                            {busUser && (
                              <div className="text-[9px] text-blue-600 font-bold uppercase tracking-tighter">
                                Incl. {bus} ETB Bus Fee
                              </div>
                            )}
                          </div>
                        )}
                        {scholarship && (
                          <div className="text-center text-[10px] font-bold text-purple-400 uppercase tracking-widest">
                            Full Coverage
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {!isPaid && (
                          <button className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ml-auto">
                            <Bell size={14} />
                            Notify Parent
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left text-sm min-w-[700px]">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                    {isAdmin ? 'Category' : 'TX ID'}
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                    {isAdmin ? 'Description' : 'Student'}
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                    {isAdmin ? 'Details' : 'Type'}
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isAdmin ? (
                  mockFinances.summaries.map((summary) => (
                    <tr key={summary.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            summary.category === 'Student Fees' ? 'bg-blue-50 text-blue-600' :
                            summary.category === 'Staff Payment' ? 'bg-purple-50 text-purple-600' :
                            'bg-amber-50 text-amber-600'
                          }`}>
                            {summary.category === 'Student Fees' && <Users size={16} />}
                            {summary.category === 'Staff Payment' && <Briefcase size={16} />}
                            {summary.category === 'Item Purchase' && <ShoppingCart size={16} />}
                          </div>
                          <span className="font-medium text-slate-800">{summary.category}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{summary.description}</td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-slate-500">
                          {summary.category === 'Student Fees' && `From ${summary.count} students`}
                          {summary.category === 'Staff Payment' && `To ${summary.count} staff members`}
                          {summary.category === 'Item Purchase' && `${summary.count} items bought`}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{summary.date}</td>
                      <td className={`px-6 py-4 text-right font-bold ${
                        summary.type === 'Income' ? 'text-emerald-600' : 'text-rose-600'
                      }`}>
                        {summary.type === 'Expense' && '-'}
                        {summary.amount.toLocaleString()} ETB
                      </td>
                    </tr>
                  ))
                ) : (
                  mockFinances.recentTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-mono text-slate-500">{tx.id}</td>
                      <td className="px-6 py-4 font-medium text-slate-800">{tx.student}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                          {tx.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{tx.date}</td>
                      <td className="px-6 py-4 text-right font-bold text-slate-800">{tx.amount.toLocaleString()} ETB</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {selectedHistory && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-200">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-tighter text-lg">Payment Audit Trail</h3>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{selectedHistory.name}</p>
                </div>
              </div>
              <button onClick={() => setSelectedHistory(null)} className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all shadow-sm">
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
              <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
                {selectedHistory.logs.map((log, index) => (
                  <div key={index} className="relative flex items-center gap-6">
                    <div className={`relative z-10 w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center shadow-md ${
                      log.status ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                    }`}>
                      {log.status ? <Check size={18} /> : <X size={18} />}
                    </div>
                    <div className="flex-1 bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                          log.status ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                        }`}>
                          {log.status ? 'Paid' : 'Marked Pending'}
                        </span>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                          <Clock size={12} />
                          {log.timestamp}
                        </div>
                      </div>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <Users size={14} className="text-slate-400" />
                        Modified by: <span className="text-blue-600">{log.modifiedBy}</span>
                      </p>
                      <p className="text-[10px] text-slate-500 mt-1 italic font-medium">Verified by Anti-Corruption Integrity Filter</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 text-center">
               <p className="text-xs text-slate-400 font-medium">Transparency increases accountability. All actions are immutable and logged.</p>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider text-sm">Submit New Transaction</h3>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setShowForm(false); }}>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Transaction Name / Description</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Electricity Bill, Stationery Purchase"
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Type</label>
                  <select className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all">
                    <option value="in">Money In (Income)</option>
                    <option value="out">Money Out (Expense)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Amount (ETB)</label>
                  <input
                    required
                    type="number"
                    placeholder="0.00"
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-200 dark:shadow-none"
                >
                  Confirm Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
