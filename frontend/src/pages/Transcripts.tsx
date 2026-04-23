
import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { mockStudents } from '../data/mockData';
import { FileText, Download, ArrowLeft, Search, Filter, Printer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const Transcripts = () => {
  const navigate = useNavigate();
  const { role } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState('all');
  const [phase, setPhase] = useState<'Semester 1' | 'Final'>('Semester 1');

  const canManage = role === 'vice-principal' || role === 'super-admin';

  if (!canManage) {
    return <div className="p-8 text-center font-bold text-rose-600">Access Denied</div>;
  }

  const filteredStudents = mockStudents.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.id.includes(searchTerm);
    const matchesGrade = filterGrade === 'all' || s.grade === filterGrade;
    return matchesSearch && matchesGrade;
  });

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-blue-600 hover:underline text-xs font-bold uppercase tracking-widest"
      >
        <ArrowLeft size={14} />
        Back
      </button>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link to="/" className="text-blue-600 hover:underline text-sm font-medium mb-1 flex items-center gap-1">
            <ArrowLeft size={14} />
            Back to Dashboard
          </Link>
          <h2 className="text-2xl font-bold text-slate-800">Transcript Management</h2>
          <p className="text-slate-500 text-sm">Generate and manage student academic transcripts.</p>
        </div>

        <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          <button
            onClick={() => setPhase('Semester 1')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${phase === 'Semester 1' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Semester 1
          </button>
          <button
            onClick={() => setPhase('Final')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${phase === 'Final' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Final Year-End
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by student name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <select
            value={filterGrade}
            onChange={(e) => setFilterGrade(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
          >
            <option value="all">All Grades</option>
            <option value="9">Grade 9</option>
            <option value="10">Grade 10</option>
            <option value="11">Grade 11</option>
            <option value="12">Grade 12</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Student Details</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Avg Score</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Rank</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{student.name}</p>
                        <p className="text-xs text-slate-500">Grade {student.grade} • ID: {student.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-black text-slate-700">88.4%</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                      #3 / 45
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase rounded">Ready</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors" title="Print Transcript">
                        <Printer size={18} />
                      </button>
                      <button
                        onClick={() => alert(`Generating ${phase} Transcript for ${student.name}\nSubjects: Math, Physics, English, Bio, Chem\nAvg: 88.4%\nRank: 3`)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-bold transition-all"
                      >
                        <FileText size={14} />
                        View
                      </button>
                      <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors" title="Download PDF">
                        <Download size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
