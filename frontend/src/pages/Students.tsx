
import { Search, Filter, MoreVertical, Download, ChevronRight, ArrowLeft, UserPlus, X, Check } from 'lucide-react';
import { mockStudents } from '../data/mockData';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { exportToCSV } from '../utils/exportUtils';

export const Students = () => {
  const navigate = useNavigate();
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [allStudents, setAllStudents] = useState(mockStudents);
  const grades = Array.from(new Set(allStudents.map(s => s.grade))).sort();

  const handleExport = (data = allStudents, filename = 'Students_List') => {
    const dataToExport = data.map(s => ({
      ID: s.id,
      Name: s.name,
      Grade: s.grade,
      Status: s.status,
      ParentName: s.parentName,
      ParentPhone: s.parentPhone
    }));
    exportToCSV(dataToExport, filename);
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const name = formData.get('name') as string;
    const grade = formData.get('grade') as string;
    const parentName = formData.get('parentName') as string;
    const parentPhone = formData.get('parentPhone') as string;

    const newStudent = {
      id: `ST${Date.now()}`,
      name,
      grade,
      parentName,
      parentPhone,
      status: 'Active' as const,
      attendance: '100%',
      gpa: 'N/A',
      riskLevel: 'Low',
      riskFactor: 'Initial registration.',

      isScholarship: false,
      isBusUser: false,
      penaltyFee: 0,
      monthlyFee: 5000,
      busFee: 0,
      dob: '2010-01-01',
      gender: 'Other',
      address: 'Not provided',
      bloodGroup: 'N/A',
      allergies: 'None',
      medications: 'None',
      chronicConditions: 'None',
      vaccinationStatus: 'Unknown',
      homeMedications: 'None',
      bio: 'New student.',
      attendanceHistory: [],
      academicHistory: [],
      emergencyContact: { name: parentName, relation: 'Parent', phone: parentPhone }
    };

    setAllStudents(prev => [newStudent, ...prev]);
    setShowAddModal(false);
  };

  if (selectedGrade) {
    const filteredStudents = allStudents.filter(s => s.grade === selectedGrade);

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSelectedGrade(null)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
          >
            <ArrowLeft size={14} />
            Back
          </button>
          <div>
            <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight uppercase">Students in {selectedGrade}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Detailed roster for the current academic session.</p>
          </div>
          <button 
            onClick={() => handleExport(filteredStudents, `Students_Grade_${selectedGrade}`)}
            className="ml-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm font-bold"
          >
            <Download size={20} />
            <span>Export</span>
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl dark:shadow-none shadow-slate-200/40 border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-500">
          <table className="w-full text-left min-w-[700px]">
            <thead className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Student Information</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Guardian Contact</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center">Status</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group">
                  <td className="px-6 py-4">
                    <Link
                      to={`/students/${student.id}`}
                      className="flex items-center gap-3 group/profile cursor-pointer"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 rounded-xl flex items-center justify-center text-blue-700 dark:text-blue-400 font-black text-xs transition-all group-hover/profile:scale-110">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm font-medium text-slate-800 dark:text-white group-hover/profile:text-blue-600 dark:group-hover/profile:text-blue-400 transition-colors">{student.name}</span>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-slate-800 dark:text-white">{student.parentName}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{student.parentPhone}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      student.status === 'Active' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100/50 dark:border-emerald-800/30' : 'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200/50 dark:border-slate-700/50'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1 hover:bg-slate-100 rounded transition-colors text-slate-400 hover:text-slate-600">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <Breadcrumbs />
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-blue-600 hover:underline text-xs font-bold uppercase tracking-widest"
        >
          <ArrowLeft size={14} />
          Back
        </button>
      </div>
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-200 dark:shadow-none text-sm font-bold"
          >
            <UserPlus size={20} />
            <span>Register New Student</span>
          </button>
          <button 
            onClick={() => handleExport()}
            className="flex-1 sm:flex-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm font-bold"
          >
            <Download size={20} />
            <span>Export</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search students..."
              className="pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 dark:text-white rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full sm:w-64 font-medium"
            />
          </div>
          <button className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {grades.map((grade) => (
          <button
            key={grade}
            onClick={() => setSelectedGrade(grade)}
            className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm dark:shadow-none hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-xl dark:hover:shadow-none hover:-translate-y-1 transition-all group text-left"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-black text-slate-800 dark:text-white">{grade}</span>
              <ChevronRight size={20} className="text-slate-300 dark:text-slate-600 group-hover:text-blue-500 transition-colors" />
            </div>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
              {allStudents.filter(s => s.grade === grade).length} Students
            </p>
          </button>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                  <UserPlus size={20} />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm uppercase tracking-wider">Register New Student</h3>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form className="p-6 space-y-4" onSubmit={handleAddStudent}>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Student Full Name</label>
                <input name="name" required type="text" placeholder="e.g. Abdi Tolosa" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Grade Level</label>
                <select name="grade" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all">
                  {grades.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Parent/Guardian Name</label>
                <input name="parentName" required type="text" placeholder="e.g. Tolosa Bekele" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Guardian Phone Number</label>
                <input name="parentPhone" required type="tel" placeholder="e.g. +251 9..." className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800/50">
                <p className="text-[10px] text-amber-700 dark:text-amber-400 font-medium leading-relaxed">
                  <strong>Student Login:</strong> Students log in using their <strong>Digital ID</strong> (e.g., ST1714...). This ID will be generated upon registration.
                </p>
              </div>
              <div className="pt-4">
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-200 dark:shadow-none flex items-center justify-center gap-2">
                  <Check size={18} />
                  <span>Register Student</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
