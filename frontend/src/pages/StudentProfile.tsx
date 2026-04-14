
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
  Mail
} from 'lucide-react';

export const StudentProfile = () => {
  const { id } = useParams();
  const student = mockStudents.find(s => s.id === id) as any;

  if (!student) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-800">Student not found</h2>
        <Link to="/students" className="text-blue-600 hover:underline mt-4 inline-block">Back to Students List</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Link to="/students" className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
          <ArrowLeft size={20} className="text-slate-600" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Student Profile</h2>
          <p className="text-sm text-slate-500">Detailed overview of academic performance and records.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
            <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-4xl mx-auto mb-6">
              {student.name.charAt(0)}
            </div>
            <h3 className="text-2xl font-bold text-slate-800">{student.name}</h3>
            <p className="text-slate-500 font-medium mb-6">Grade {student.grade} Student</p>

            <div className="flex justify-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                student.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
              }`}>
                {student.status}
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
                #{student.id.padStart(4, '0')}
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-2">Personal Information</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-600">
                <Calendar size={18} className="text-slate-400" />
                <div className="text-sm">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Date of Birth</p>
                  <p className="font-medium">{student.dob || 'May 15, 2010'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <User size={18} className="text-slate-400" />
                <div className="text-sm">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Gender</p>
                  <p className="font-medium">{student.gender || 'Male'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <MapPin size={18} className="text-slate-400" />
                <div className="text-sm">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Address</p>
                  <p className="font-medium">{student.address || 'Addis Ababa, Ethiopia'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-2">Parent/Guardian</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-600">
                <User size={18} className="text-slate-400" />
                <div className="text-sm">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Name</p>
                  <p className="font-medium">{student.parentName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Phone size={18} className="text-slate-400" />
                <div className="text-sm">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Phone Number</p>
                  <p className="font-medium">{student.parentPhone}</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-2 flex items-center justify-center gap-2 py-2 border border-blue-200 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors text-sm font-bold">
              <Mail size={16} />
              Contact Parent
            </button>
          </div>
        </div>

        {/* Content Tabs/Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <div className="bg-emerald-100 text-emerald-600 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                <Clock size={20} />
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase">Attendance</p>
              <h4 className="text-2xl font-bold text-slate-800">96.4%</h4>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp size={20} />
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase">Average</p>
              <h4 className="text-2xl font-bold text-slate-800">92.8%</h4>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <div className="bg-purple-100 text-purple-600 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                <GraduationCap size={20} />
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase">Rank</p>
              <h4 className="text-2xl font-bold text-slate-800">4 / 45</h4>
            </div>
          </div>

          {/* Academic History */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-bold text-slate-800 flex items-center gap-2">
                <FileText size={20} className="text-blue-600" />
                Academic History
              </h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-slate-100">
                  <tr>
                    <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase">Year</th>
                    <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase">Grade</th>
                    <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase">Avg Score</th>
                    <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase text-right">Rank</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {(student.academicHistory || []).map((record: any, i: number) => (
                    <tr key={i}>
                      <td className="py-4 text-sm font-medium text-slate-700">EC {record.year}</td>
                      <td className="py-4 text-sm text-slate-600">Grade {record.grade}</td>
                      <td className="py-4 text-sm text-slate-600 font-bold">{record.average}</td>
                      <td className="py-4 text-sm text-slate-600 text-right">{record.rank}</td>
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
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
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
                      className="w-full bg-emerald-100 rounded-t-lg group-hover:bg-emerald-200 transition-colors"
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
        </div>
      </div>
    </div>
  );
};
