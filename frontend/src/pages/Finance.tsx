
import { CreditCard, ArrowUpRight, ArrowDownRight, Search, FileText } from 'lucide-react';
import { mockFinances } from '../data/mockData';

export const Finance = () => {
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
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">Recent Transactions</h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search tx..."
                className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none w-48"
              />
            </div>
            <button className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
              <FileText size={14} />
              Export Report
            </button>
          </div>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">TX ID</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Student</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Type</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Date</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockFinances.recentTransactions.map((tx) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
