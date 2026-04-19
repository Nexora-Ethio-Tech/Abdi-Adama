
import { useParams, Link } from 'react-router-dom';
import { mockStudents } from '../data/mockData';
import {
  ArrowLeft,
  User,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  TrendingUp,
  Clock,
  FileText,
  Mail,
  Heart,
  Printer,
  FileUp,
  AlertTriangle,
  X,
  Fingerprint
} from 'lucide-react';
import { useState } from 'react';

export const StudentProfile = () => {
  const { id } = useParams();
  const [showTranscript, setShowTranscript] = useState(false);
  const student = mockStudents.find(s => s.id === id) as any;

  if (!student) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-800">Student not found</h2>
        <Link to="/students" className="text-school-primary hover:underline mt-4 inline-block">Back to Students List</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Link to="/students" className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          <ArrowLeft size={20} className="text-slate-600 dark:text-slate-400" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Student Profile</h2>
          <p className="text-sm text-slate-500">Detailed overview of academic performance and records.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card p-8 text-center">
            <div className="w-32 h-32 bg-school-primary/10 rounded-full flex items-center justify-center text-school-primary font-bold text-4xl mx-auto mb-6">
              {student.name.charAt(0)}
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{student.name}</h3>
            <p className="text-slate-500 font-medium mb-6">Grade {student.grade} Student</p>

            <div className="flex justify-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                student.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
              }`}>
                {student.status}
              </span>
              <span className="px-3 py-1 bg-school-primary/10 text-school-primary rounded-full text-xs font-bold uppercase tracking-wider">
                #{student.id.padStart(4, '0')}
              </span>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col items-center gap-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Digital National ID</p>
              <div className="flex items-center gap-2 text-school-primary">
                <Fingerprint size={16} />
                <p className="font-mono text-sm font-bold tracking-wider">{student.digitalId || `ETH-${Math.random().toString(10).slice(2, 11)}`}</p>
              </div>
            </div>
          </div>

          <div className="card p-6 space-y-4">
            <h4 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wider mb-2">Personal Information</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <Calendar size={18} className="text-slate-400" />
                <div className="text-sm">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Date of Birth</p>
                  <p className="font-medium text-slate-800 dark:text-slate-200">{student.dob || 'May 15, 2010'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <User size={18} className="text-slate-400" />
                <div className="text-sm">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Gender</p>
                  <p className="font-medium text-slate-800 dark:text-slate-200">{student.gender || 'Male'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <MapPin size={18} className="text-slate-400" />
                <div className="text-sm">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Address</p>
                  <p className="font-medium text-slate-800 dark:text-slate-200">{student.address || 'Addis Ababa, Ethiopia'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6 space-y-4">
            <h4 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wider mb-2">Parent/Guardian</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <User size={18} className="text-slate-400" />
                <div className="text-sm">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Name</p>
                  <p className="font-medium text-slate-800 dark:text-slate-200">{student.parentName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <Phone size={18} className="text-slate-400" />
                <div className="text-sm">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Phone Number</p>
                  <p className="font-medium text-slate-800 dark:text-slate-200">{student.parentPhone}</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-2 flex items-center justify-center gap-2 py-2 border border-school-primary/30 text-school-primary rounded-xl hover:bg-school-primary/10 transition-colors text-sm font-bold">
              <Mail size={16} />
              Contact Parent
            </button>
          </div>

          <div className="card p-6 space-y-4">
            <h4 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
              <Heart size={16} className="text-school-secondary" />
              Medical Records
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Blood Group</span>
                <span className="font-bold text-slate-700 dark:text-slate-300">{student.bloodGroup || 'N/A'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Allergies</span>
                <span className="font-bold text-slate-700 dark:text-slate-300">{student.allergies || 'None'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Medications</span>
                <span className="font-bold text-slate-700 dark:text-slate-300">{student.medications || 'None'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs/Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Action Header */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border ${
              student.riskLevel === 'High' ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-100 dark:border-rose-800 text-rose-700 dark:text-rose-400' :
              student.riskLevel === 'Medium' ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800 text-amber-700 dark:text-amber-400' :
              'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400'
            }`}>
              <AlertTriangle size={20} />
              <div>
                <p className="text-[10px] font-bold uppercase opacity-70">AI Academic Health Monitor</p>
                <p className="text-sm font-bold">{student.riskLevel} Risk Status</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowTranscript(true)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 dark:bg-slate-700 text-white rounded-xl hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors text-sm font-bold"
              >
                <Printer size={18} />
                Generate Transcript
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card p-6">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                <Clock size={20} />
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase">Attendance</p>
              <h4 className="text-2xl font-bold text-slate-800 dark:text-white">96.4%</h4>
            </div>
            <div className="card p-6">
              <div className="bg-school-primary/10 text-school-primary w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp size={20} />
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase">Average</p>
              <h4 className="text-2xl font-bold text-slate-800 dark:text-white">92.8%</h4>
            </div>
            <div className="card p-6">
              <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                <GraduationCap size={20} />
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase">Rank</p>
              <h4 className="text-2xl font-bold text-slate-800 dark:text-white">4 / 45</h4>
            </div>
          </div>

          {/* Academic History */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <FileText size={20} className="text-school-primary" />
                Academic History
              </h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-slate-100 dark:border-slate-800">
                  <tr>
                    <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase">Year</th>
                    <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase">Grade</th>
                    <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase">Avg Score</th>
                    <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase text-right">Rank</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                  {(student.academicHistory || []).map((record: any, i: number) => (
                    <tr key={i}>
                      <td className="py-4 text-sm font-medium text-slate-700 dark:text-slate-300">EC {record.year}</td>
                      <td className="py-4 text-sm text-slate-600 dark:text-slate-400">Grade {record.grade}</td>
                      <td className="py-4 text-sm text-slate-600 dark:text-slate-400 font-bold">{record.average}</td>
                      <td className="py-4 text-sm text-slate-600 dark:text-slate-400 text-right">{record.rank}</td>
                    </tr>
                  ))}
                  {(!student.academicHistory || student.academicHistory.length === 0) && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-slate-400 text-sm italic">
                        No historical records available for this student.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Attendance Trend */}
          <div className="card p-6">
            <h4 className="font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <Clock size={20} className="text-emerald-600" />
              Attendance Trend (Current Year)
            </h4>
            <div className="flex items-end justify-between h-40 gap-2">
              {(student.attendanceHistory || [
                { month: 'Sep', rate: 90 },
                { month: 'Oct', rate: 85 },
                { month: 'Nov', rate: 95 },
                { month: 'Dec', rate: 88 },
                { month: 'Jan', rate: 92 },
                { month: 'Feb', rate: 96 },
              ]).map((data: any, i: number) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full relative">
                    <div
                      className="w-full bg-emerald-100 dark:bg-emerald-900/20 rounded-t-lg group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/40 transition-colors"
                      style={{ height: `${data.rate}%` }}
                    ></div>
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded pointer-events-none">
                      {data.rate}%
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{data.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Document Vault */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <FileUp size={20} className="text-school-primary" />
                Encrypted Document Vault
              </h4>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded">2MB LIMIT</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-dashed border-slate-200 dark:border-slate-700 rounded-2xl flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-white dark:group-hover:bg-slate-700 group-hover:text-school-primary transition-colors">
                  <FileText size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Birth Certificate.pdf</p>
                  <p className="text-xs text-slate-400">Verified • 1.2 MB</p>
                </div>
              </div>
              <div className="p-4 border border-dashed border-slate-200 dark:border-slate-700 rounded-2xl flex items-center justify-center gap-2 text-slate-400 hover:border-school-primary hover:text-school-primary transition-all cursor-pointer">
                <FileUp size={20} />
                <span className="text-sm font-bold">Upload Document</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transcript Modal */}
      {showTranscript && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl animate-in zoom-in duration-300">
            <div className="sticky top-0 bg-white border-b border-slate-100 px-8 py-4 flex items-center justify-between z-10">
              <h3 className="text-xl font-bold text-slate-800">Academic Transcript</h3>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-school-primary text-white rounded-xl hover:bg-school-primary/90 transition-colors text-sm font-bold">
                  <Printer size={18} />
                  Print Now
                </button>
                <button
                  onClick={() => setShowTranscript(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-12 space-y-8" id="transcript-content">
              {/* Transcript Header */}
              <div className="flex justify-between items-start border-b-2 border-slate-800 pb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-school-primary rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
                    AA
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">ABDI-ADAMA SMART-SCHOOL</h2>
                    <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Official Academic Record</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-800">Date Issued: April 25, 2026</p>
                  <p className="text-xs text-slate-400">Ref: AA-TR-{student.id}-{new Date().getFullYear()}</p>
                </div>
              </div>

              {/* Student Info */}
              <div className="grid grid-cols-2 gap-8 py-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Student Name</p>
                  <p className="text-lg font-bold text-slate-800">{student.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Digital ID</p>
                  <p className="text-lg font-bold text-slate-800">{student.digitalId || 'ETH-123456789'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current Grade</p>
                  <p className="text-lg font-bold text-slate-800">Grade {student.grade}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Academic Year</p>
                  <p className="text-lg font-bold text-slate-800">2026 EC</p>
                </div>
              </div>

              {/* Results Table */}
              <div className="space-y-4">
                <h4 className="font-bold text-slate-800 text-sm uppercase tracking-widest border-l-4 border-slate-800 pl-3">Summary of Results</h4>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase">Subject</th>
                      <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase text-center">Score</th>
                      <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase text-center">Grade</th>
                      <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase text-right">Credit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {['Mathematics', 'Physics', 'Biology', 'Chemistry', 'English', 'Amharic', 'History'].map((subject) => (
                      <tr key={subject}>
                        <td className="py-3 px-4 font-bold text-slate-700">{subject}</td>
                        <td className="py-3 px-4 text-center text-slate-600 font-medium">92%</td>
                        <td className="py-3 px-4 text-center font-bold text-emerald-600">A+</td>
                        <td className="py-3 px-4 text-right text-slate-500">4.0</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-slate-800 text-white">
                      <td className="py-4 px-4 font-bold rounded-bl-2xl">CUMULATIVE AVERAGE</td>
                      <td className="py-4 px-4 text-center font-black text-lg">94.2%</td>
                      <td className="py-4 px-4 text-center font-bold">A+</td>
                      <td className="py-4 px-4 text-right font-bold rounded-br-2xl">4.0 GPA</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Verification Section */}
              <div className="pt-12 flex items-end justify-between">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-300">
                      <Printer size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Verification QR Code</p>
                      <p className="text-xs text-slate-600">Scan to verify authenticity online</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 italic">This is a computer-generated transcript, no physical signature required for internal use.</p>
                </div>
                <div className="text-center space-y-4">
                  <div className="w-32 h-1 bg-slate-800 mx-auto"></div>
                  <p className="text-sm font-bold text-slate-800">School Registrar</p>
                  <div className="w-24 h-24 border-4 border-double border-school-primary/20 rounded-full flex items-center justify-center mx-auto opacity-50">
                    <div className="text-[10px] font-black text-school-primary uppercase text-center rotate-12">
                      OFFICIAL<br/>SEAL
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
