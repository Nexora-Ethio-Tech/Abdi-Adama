
import { useState } from 'react';
import { UserPlus, RefreshCw, Upload, Search, CheckCircle, AlertCircle, FileText, Info, Check, X, Fingerprint } from 'lucide-react';
import { mockStudents } from '../data/mockData';

type RegistrationTab = 'new' | 'existing';

interface StudentRegistrationProps {
  isAdminView?: boolean;
}

// Mocked pending applications
const initialPendingApplications = [
  { id: 'APP1', name: 'Zekarias Teshome', dob: '2012-08-20', parentName: 'Teshome G/Mariam', phone: '+251911445566', previousSchool: 'St. Joseph School', lastGrade: '7', date: '2026-04-12', digitalId: 'ETH-998877665' },
  { id: 'APP2', name: 'Liyu Solomon', dob: '2013-05-10', parentName: 'Solomon Ayele', phone: '+251911778899', previousSchool: 'Future Talent Academy', lastGrade: '6', date: '2026-04-13', digitalId: 'ETH-554433221' },
];

export const StudentRegistration = ({ isAdminView = true }: StudentRegistrationProps) => {
  const [activeTab, setActiveTab] = useState<RegistrationTab>('new');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [pendingApps, setPendingApps] = useState(initialPendingApplications);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setFileError('File size must be less than 2MB');
        setFileName(null);
      } else {
        setFileError(null);
        setFileName(file.name);
      }
    }
  };

  const filteredStudents = mockStudents.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.id.includes(searchQuery) ||
    (s as any).digitalId?.includes(searchQuery)
  );

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(isAdminView ? 'Student registered successfully!' : 'Your application has been submitted successfully! We will contact you soon.');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handlePromote = () => {
    setSuccessMessage(`${selectedStudent.name} has been promoted/re-admitted!`);
    setSelectedStudent(null);
    setSearchQuery('');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleAdmissionDecision = (appId: string, decision: 'Approve' | 'Reject') => {
    setPendingApps(prev => prev.filter(app => app.id !== appId));
    setSuccessMessage(`Application ${appId} has been ${decision}ed.`);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return (
    <div className="space-y-6">
      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <CheckCircle size={20} />
          <span className="font-medium">{successMessage}</span>
        </div>
      )}

      {isAdminView && (
        <div className="flex flex-col sm:flex-row gap-4 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('new')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'new'
                ? 'bg-white dark:bg-slate-700 text-school-primary shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            Admission Requests
          </button>
          <button
            onClick={() => setActiveTab('existing')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'existing'
                ? 'bg-white dark:bg-slate-700 text-school-primary shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            Promotion & Re-admission
          </button>
        </div>
      )}

      {activeTab === 'new' ? (
        isAdminView ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Pending Admissions</h3>
              <span className="bg-school-primary/10 text-school-primary px-3 py-1 rounded-full text-xs font-bold">
                {pendingApps.length} New Requests
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {pendingApps.map(app => (
                <div key={app.id} className="card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400">
                      <UserPlus size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-100">{app.name}</h4>
                      <p className="text-xs text-slate-500 font-medium">Applied for Grade {app.lastGrade} • {app.date}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1 max-w-2xl">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Digital ID</p>
                      <p className="text-xs font-mono font-bold dark:text-slate-200">{app.digitalId}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Parent</p>
                      <p className="text-xs font-bold dark:text-slate-200">{app.parentName}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone</p>
                      <p className="text-xs font-bold dark:text-slate-200">{app.phone}</p>
                    </div>
                    <div className="hidden md:block">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Prev School</p>
                      <p className="text-xs font-bold dark:text-slate-200">{app.previousSchool}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-50 dark:border-slate-800">
                    <button
                      onClick={() => handleAdmissionDecision(app.id, 'Reject')}
                      className="flex-1 md:flex-none p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/10 rounded-xl transition-colors flex items-center justify-center gap-2 text-xs font-bold"
                    >
                      <X size={18} />
                      Reject
                    </button>
                    <button
                      onClick={() => handleAdmissionDecision(app.id, 'Approve')}
                      className="flex-1 md:flex-none bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl transition-colors flex items-center justify-center gap-2 text-xs font-bold"
                    >
                      <Check size={18} />
                      Approve
                    </button>
                  </div>
                </div>
              ))}
              {pendingApps.length === 0 && (
                <div className="card p-12 text-center space-y-3">
                   <CheckCircle size={48} className="mx-auto text-slate-200" />
                   <p className="text-slate-500 font-medium">No pending admission requests at this time.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="card overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <UserPlus size={20} className="text-school-primary" />
                Admission Form (New Student)
              </h3>
            </div>
            <form onSubmit={handleRegister} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Full Name</label>
                  <input required type="text" placeholder="Enter student full name" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-school-primary" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Digital National ID</label>
                  <div className="relative">
                    <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input required type="text" placeholder="ETH-..." className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-school-primary" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Date of Birth</label>
                  <input required type="date" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-school-primary" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Gender</label>
                  <select className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-school-primary">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Parent/Guardian Name</label>
                  <input required type="text" placeholder="Enter parent name" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-school-primary" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Parent Phone</label>
                  <input required type="tel" placeholder="+251..." className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-school-primary" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Address</label>
                  <input required type="text" placeholder="City, Sub-city, Woreda" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-school-primary" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Previous School</label>
                  <input type="text" placeholder="Name of previous school" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-school-primary" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Last Grade Completed</label>
                  <input type="text" placeholder="e.g. Grade 9" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-school-primary" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-500 uppercase block">Last Transcript (Max 2MB)</label>
                <div className={`relative border-2 border-dashed rounded-2xl p-8 transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer ${
                  fileError ? 'border-rose-300 bg-rose-50 dark:bg-rose-900/10' : 'border-slate-200 dark:border-slate-700 hover:border-school-primary dark:hover:border-school-primary'
                }`}>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className={`p-4 rounded-full ${fileError ? 'bg-rose-100 text-rose-600' : 'bg-school-primary/10 text-school-primary'}`}>
                    {fileName ? <FileText size={32} /> : <Upload size={32} />}
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                      {fileName || 'Click to upload transcript'}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">PDF, PNG, JPG (Max 2MB)</p>
                  </div>
                </div>
                {fileError && (
                  <div className="flex items-center gap-2 text-rose-600 text-xs font-bold">
                    <AlertCircle size={14} />
                    <span>{fileError}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  type="submit"
                  className="bg-school-primary hover:bg-school-primary/90 text-white px-10 py-3 rounded-xl font-bold transition-all shadow-lg shadow-school-primary/20 dark:shadow-none"
                >
                  Submit Admission Application
                </button>
              </div>
            </form>
          </div>
        )
      ) : (
        <div className="space-y-6">
          <div className="card p-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search existing student by name, ID or Digital ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-school-primary w-full"
              />
            </div>

            {searchQuery && (
              <div className="mt-4 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map(student => (
                    <button
                      key={student.id}
                      onClick={() => setSelectedStudent(student)}
                      className={`w-full p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${
                        selectedStudent?.id === student.id ? 'bg-school-primary/5 dark:bg-school-primary/10 border-l-4 border-school-primary' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-school-primary/10 rounded-full flex items-center justify-center text-school-primary font-bold">
                          {student.name[0]}
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{student.name}</p>
                          <p className="text-xs text-slate-500 uppercase font-medium">ID: {student.id} • Grade: {student.grade}</p>
                        </div>
                      </div>
                      <CheckCircle size={20} className={selectedStudent?.id === student.id ? 'text-school-primary' : 'text-slate-200'} />
                    </button>
                  ))
                ) : (
                  <div className="p-8 text-center text-slate-400 text-sm italic">
                    No students found matching your search.
                  </div>
                )}
              </div>
            )}
          </div>

          {selectedStudent && (
            <div className="card overflow-hidden animate-in fade-in slide-in-from-bottom-4">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex justify-between items-center">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <RefreshCw size={20} className="text-school-primary" />
                  Promotion & Re-admission
                </h3>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  selectedStudent.id === '1' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  Fee Status: {selectedStudent.id === '1' ? 'Paid' : 'Pending'}
                </span>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-3">
                      <div className="flex items-center gap-2 text-school-primary">
                        <Info size={16} />
                        <span className="text-xs font-bold uppercase">Current Record</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase font-bold">Current Grade</p>
                          <p className="text-sm font-bold dark:text-white">{selectedStudent.grade}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase font-bold">Academic Status</p>
                          <p className="text-sm font-bold text-emerald-600">Cleared</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Promote To Grade</label>
                      <select className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-school-primary">
                        <option>Grade 9</option>
                        <option>Grade 10</option>
                        <option>Grade 11</option>
                        <option>Grade 12</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-2xl p-6 space-y-3">
                    <div className="flex items-center gap-2 text-amber-600">
                      <AlertCircle size={20} />
                      <h4 className="font-bold text-sm uppercase">Verification Check</h4>
                    </div>
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      Before promoting <strong>{selectedStudent.name}</strong>, ensure all outstanding fees from the previous academic year are cleared and the student has passed the minimum academic requirements.
                    </p>
                    {selectedStudent.id !== '1' && (
                      <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-amber-200 text-xs font-bold text-rose-600 flex items-center gap-2">
                        <AlertCircle size={14} />
                        Outstanding Balance Found: 2,500 ETB
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="px-6 py-2.5 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePromote}
                    disabled={selectedStudent.id !== '1'}
                    className={`px-8 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg ${
                      selectedStudent.id === '1'
                        ? 'bg-school-primary hover:bg-school-primary/90 text-white shadow-school-primary/20 dark:shadow-none'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-600 cursor-not-allowed shadow-none'
                    }`}
                  >
                    Confirm Promotion
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
