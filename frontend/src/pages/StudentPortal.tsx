
import { BookOpen, Award, Clock } from 'lucide-react';

export const StudentPortal = () => {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 md:p-8 text-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, Abebe!</h2>
        <p className="opacity-90 text-sm md:text-base">Keep up the great work. You have 3 assignments due this week.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="bg-orange-100 p-3 rounded-lg text-orange-600 w-fit mb-4">
            <BookOpen size={24} />
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Active Courses</h3>
          <p className="text-2xl font-bold text-slate-800 mt-1">6</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600 w-fit mb-4">
            <Clock size={24} />
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Attendance Rate</h3>
          <p className="text-2xl font-bold text-slate-800 mt-1">96%</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="bg-blue-100 p-3 rounded-lg text-blue-600 w-fit mb-4">
            <Award size={24} />
          </div>
          <h3 className="text-slate-500 text-sm font-medium">CGPA</h3>
          <p className="text-2xl font-bold text-slate-800 mt-1">92%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Today's Schedule</h3>
          <div className="space-y-4">
            {[
              { time: '08:00 AM', subject: 'Mathematics', room: 'Room 102' },
              { time: '10:00 AM', subject: 'Physics', room: 'Lab 1' },
              { time: '01:00 PM', subject: 'History', room: 'Room 204' },
            ].map((session, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100">
                <div className="text-xs md:text-sm font-bold text-blue-600 w-16 md:w-20 flex-shrink-0">{session.time}</div>
                <div>
                  <p className="text-sm font-medium text-slate-800">{session.subject}</p>
                  <p className="text-xs text-slate-500">{session.room}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Upcoming Deadlines</h3>
          <div className="space-y-4">
            {[
              { date: 'Tomorrow', title: 'Math Assignment 4', type: 'Homework' },
              { date: 'Fri, Apr 18', title: 'Physics Mid-term', type: 'Exam' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-slate-100">
                <div>
                  <p className="text-sm font-medium text-slate-800">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.type}</p>
                </div>
                <div className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded">
                  {item.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
