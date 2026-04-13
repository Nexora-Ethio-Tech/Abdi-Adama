
import { Calendar, BookOpen, Award, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { useUser } from '../context/UserContext';

export const ParentPortal = () => {
  const { setRole } = useUser();
  const [selectedChild, setSelectedChild] = useState<any>(null);

  const children = [
    {
      id: '1',
      name: 'Abebe Bikila',
      grade: '10A',
      attendance: '96%',
      performance: 'Excellent',
      courses: [
        { name: 'Mathematics', teacher: 'Ato Solomon', grade: '92%' },
        { name: 'Physics', teacher: 'Ato Solomon', grade: '88%' },
        { name: 'English', teacher: 'W/ro Aster', grade: '95%' },
      ]
    },
    {
      id: '2',
      name: 'Sara Bikila',
      grade: '7B',
      attendance: '94%',
      performance: 'Good',
      courses: [
        { name: 'Biology', teacher: 'W/ro Selam', grade: '84%' },
        { name: 'Amharic', teacher: 'W/ro Aster', grade: '90%' },
      ]
    },
  ];

  if (selectedChild) {
    return (
      <div className="space-y-8">
        <button
          onClick={() => setSelectedChild(null)}
          className="text-blue-600 hover:underline flex items-center gap-2 font-medium"
        >
          ← Back to Children List
        </button>

        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-3xl">
              {selectedChild.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800">{selectedChild.name}</h2>
              <p className="text-slate-500 text-lg">Grade {selectedChild.grade} Student</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex items-center gap-3 text-slate-500 mb-2">
                <Calendar size={18} />
                <span className="text-sm font-medium">Attendance</span>
              </div>
              <p className="text-2xl font-bold text-emerald-600">{selectedChild.attendance}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex items-center gap-3 text-slate-500 mb-2">
                <BookOpen size={18} />
                <span className="text-sm font-medium">Active Courses</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">{selectedChild.courses.length}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex items-center gap-3 text-slate-500 mb-2">
                <Award size={18} />
                <span className="text-sm font-medium">Performance</span>
              </div>
              <p className="text-2xl font-bold text-purple-600">{selectedChild.performance}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Course Progress & Grades</h3>
            <div className="overflow-hidden border border-slate-100 rounded-xl">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-slate-500 uppercase">Course</th>
                    <th className="px-6 py-4 font-semibold text-slate-500 uppercase">Teacher</th>
                    <th className="px-6 py-4 font-semibold text-slate-500 uppercase text-right">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedChild.courses.map((course: any, i: number) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-medium text-slate-800">{course.name}</td>
                      <td className="px-6 py-4 text-slate-600">{course.teacher}</td>
                      <td className="px-6 py-4 text-right font-bold text-blue-600">{course.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Hello, Mr. Bikila</h2>
          <p className="text-slate-500">Monitoring your children's academic progress.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 pr-6 border-r">
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium text-slate-800">Mr. Bikila</p>
              <p className="text-xs text-slate-500 capitalize">Parent</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <User size={24} />
            </div>
          </div>
          <button
            onClick={() => setRole('school-admin')}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-800">My Children</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {children.map((child, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                  {child.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{child.name}</h4>
                  <p className="text-xs text-slate-500">Grade {child.grade}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Attendance</span>
                  <span className="font-medium text-emerald-600">{child.attendance}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Performance</span>
                  <span className="font-medium text-blue-600">{child.performance}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedChild(child)}
                className="w-full mt-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-100"
              >
                View Full Report
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
