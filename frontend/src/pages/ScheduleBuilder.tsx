
import { Plus, Trash2, Clock, BookOpen, Building, Users } from 'lucide-react';
import { useState } from 'react';

interface Break {
  id: string;
  name: string;
  duration: string;
}

interface CourseFrequency {
  id: string;
  subject: string;
  sessions: string;
}

interface CustomConstraint {
  id: string;
  label: string;
  value: string;
}

export const ScheduleBuilder = () => {
  const [breaks, setBreaks] = useState<Break[]>([
    { id: '1', name: 'Morning Break', duration: '20 min' }
  ]);

  const [frequencies, setFrequencies] = useState<CourseFrequency[]>([
    { id: '1', subject: 'Mathematics', sessions: '5 sessions/week' }
  ]);

  const [customConstraints, setCustomConstraints] = useState<CustomConstraint[]>([
    { id: '1', label: 'Max Teacher Hours', value: '25 hrs/week' }
  ]);

  const addBreak = () => {
    setBreaks([...breaks, { id: Date.now().toString(), name: '', duration: '' }]);
  };

  const removeBreak = (id: string) => {
    setBreaks(breaks.filter(b => b.id !== id));
  };

  const addFrequency = () => {
    setFrequencies([...frequencies, { id: Date.now().toString(), subject: '', sessions: '5 sessions/week' }]);
  };

  const removeFrequency = (id: string) => {
    setFrequencies(frequencies.filter(f => f.id !== id));
  };

  const addCustomConstraint = () => {
    setCustomConstraints([...customConstraints, { id: Date.now().toString(), label: '', value: '' }]);
  };

  const removeCustomConstraint = (id: string) => {
    setCustomConstraints(customConstraints.filter(c => c.id !== id));
  };

  return (
    <div className="bg-white p-4 md:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Schedule Maker & Constraints</h2>
          <p className="text-slate-500 text-sm mt-1">Configure your school's academic timetable parameters and limitations.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold transition-all shadow-lg shadow-blue-100">
          Generate Schedule
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* School Hours */}
        <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100 space-y-4">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider">
            <Clock size={18} />
            <span>School Hours</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Start Time</label>
              <input type="time" className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" defaultValue="08:00" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">End Time</label>
              <input type="time" className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" defaultValue="15:30" />
            </div>
          </div>
        </div>

        {/* Breaks */}
        <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-orange-600 font-bold text-sm uppercase tracking-wider">
              <Clock size={18} />
              <span>Breaks</span>
            </div>
            <button
              onClick={addBreak}
              className="text-blue-600 hover:bg-blue-50 p-1 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold"
            >
              <Plus size={16} />
              <span>Add Break</span>
            </button>
          </div>
          <div className="space-y-3">
            {breaks.map((b) => (
              <div key={b.id} className="flex gap-2 items-end group">
                <div className="flex-1 space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Name</label>
                  <input
                    type="text"
                    className="w-full p-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Break Name"
                    defaultValue={b.name}
                  />
                </div>
                <div className="w-24 space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Duration</label>
                  <input
                    type="text"
                    className="w-full p-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="20 min"
                    defaultValue={b.duration}
                  />
                </div>
                <button
                  onClick={() => removeBreak(b.id)}
                  className="p-2 text-slate-300 hover:text-rose-500 transition-colors mb-0.5"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Course Frequencies */}
      <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-purple-600 font-bold text-sm uppercase tracking-wider">
            <BookOpen size={18} />
            <span>Course Frequencies</span>
          </div>
          <button
            onClick={addFrequency}
            className="text-blue-600 hover:bg-blue-50 p-1 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold"
          >
            <Plus size={16} />
            <span>Add Course</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {frequencies.map((f) => (
            <div key={f.id} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl group shadow-sm">
              <input
                type="text"
                className="bg-transparent text-sm font-medium outline-none w-1/2"
                placeholder="Subject"
                defaultValue={f.subject}
              />
              <div className="flex items-center gap-2">
                <select className="bg-slate-50 text-xs font-bold p-1 rounded-lg outline-none border-none">
                  <option>5 sessions/week</option>
                  <option>4 sessions/week</option>
                  <option>3 sessions/week</option>
                  <option>2 sessions/week</option>
                  <option>1 session/week</option>
                </select>
                <button
                  onClick={() => removeFrequency(f.id)}
                  className="text-slate-300 hover:text-rose-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Richer Constraints */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Room Allocation */}
        <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm uppercase tracking-wider">
              <Building size={18} />
              <span>Room Allocation</span>
            </div>
            <button className="text-blue-600 hover:bg-blue-50 p-1 rounded-lg transition-colors">
              <Plus size={16} />
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl text-sm">
              <span className="text-slate-600">Science Lab</span>
              <span className="font-bold text-slate-800">Grades 9-12 only</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl text-sm text-slate-400 italic">
              Click '+' to add specialized room constraints...
            </div>
          </div>
        </div>

        {/* Custom Rich Constraints */}
        <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-600 font-bold text-sm uppercase tracking-wider">
              <Users size={18} />
              <span>Advanced Constraints</span>
            </div>
            <button
              onClick={addCustomConstraint}
              className="text-blue-600 hover:bg-blue-50 p-1 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold"
            >
              <Plus size={16} />
              <span>Add Custom</span>
            </button>
          </div>
          <div className="space-y-3">
            {customConstraints.map((c) => (
              <div key={c.id} className="flex gap-2 items-center group bg-white p-2 border border-slate-100 rounded-xl shadow-sm">
                <input
                  type="text"
                  className="flex-1 bg-transparent text-sm outline-none border-none p-0 focus:ring-0"
                  placeholder="Constraint Label"
                  defaultValue={c.label}
                />
                <div className="w-px h-4 bg-slate-100" />
                <input
                  type="text"
                  className="w-24 bg-transparent text-sm font-bold text-right outline-none border-none p-0 focus:ring-0"
                  placeholder="Value"
                  defaultValue={c.value}
                />
                <button
                  onClick={() => removeCustomConstraint(c.id)}
                  className="text-slate-300 hover:text-rose-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
