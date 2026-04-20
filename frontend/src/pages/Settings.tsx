
import { Settings as SettingsIcon, Building, Bell, Shield, Palette, Globe, Save, HelpCircle, CreditCard, Cpu, CheckCircle, Wifi, Smartphone, Radio, GraduationCap, Plus, Trash2, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useAppearance, type UIStyle } from '../context/AppearanceContext';
import { mockGradingConfigs } from '../data/mockData';
import { useUser } from '../context/UserContext';

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('General');
  const { style, setStyle, autoDarkMode, setAutoDarkMode } = useAppearance();
  const { schoolName, setSchoolName, schoolMotto, setSchoolMotto, role } = useUser();

  const tabs = [
    { id: 'General', icon: Building },
    { id: 'Hardware', icon: Cpu },
    { id: 'Notifications', icon: Bell },
    { id: 'Security', icon: Shield },
    { id: 'Financial Policy', icon: CreditCard },
    { id: 'Grading System', icon: GraduationCap },
    { id: 'Appearance', icon: Palette },
    { id: 'Regional', icon: Globe },
  ];

  const [selectedGrade, setSelectedGrade] = useState('10');
  const [gradeConfigs, setGradeConfigs] = useState(mockGradingConfigs);
  const [newMethodLabel, setNewMethodLabel] = useState('');
  const [newMethodWeight, setNewMethodWeight] = useState(10);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">System Settings</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Manage your school preferences and system configuration.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-64 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 dark:shadow-none'
                  : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <tab.icon size={18} />
              <span>{tab.id}</span>
            </button>
          ))}
        </div>

        <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors duration-300">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 dark:text-slate-100">{activeTab} Settings</h3>
            <button className="text-blue-600 flex items-center gap-2 text-sm font-bold">
              <HelpCircle size={16} />
              <span>Need help?</span>
            </button>
          </div>

          <div className="p-6 space-y-6">
            {activeTab === 'General' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">School Name (Official)</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                      value={schoolName}
                      onChange={(e) => role === 'super-admin' && setSchoolName(e.target.value)}
                      disabled={role !== 'super-admin'}
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">School Motto</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 font-medium italic"
                      value={schoolMotto}
                      onChange={(e) => role === 'super-admin' && setSchoolMotto(e.target.value)}
                      disabled={role !== 'super-admin'}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">System Email</label>
                    <input type="email" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" defaultValue="admin@abdiadama.edu" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Phone Number</label>
                    <input type="text" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" defaultValue="+251 911 22 33 44" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Academic Year</label>
                    <select className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500">
                      <option>2025/2026 (Current)</option>
                      <option>2026/2027 (Upcoming)</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">School Address</label>
                  <textarea rows={3} className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" defaultValue="Bole Sub-city, Woreda 03, House No 1234, Addis Ababa, Ethiopia" />
                </div>
              </div>
            )}

            {activeTab === 'Financial Policy' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Monthly Late Penalty (ETB)</label>
                    <input type="number" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" defaultValue="150" />
                    <p className="text-[10px] text-slate-400">Applied automatically when payment exceeds the deadline.</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Payment Deadline (Day of Month)</label>
                    <select className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500">
                      {[5, 10, 15, 20, 25, 30].map(day => (
                        <option key={day} value={day} selected={day === 10}>Day {day}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Hardware' && (
              <div className="space-y-8">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Radio size={16} className="text-blue-600" />
                    Biometric Integration (ZKTeco)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                          <CheckCircle size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 dark:text-white">Main Entrance Scanner</p>
                          <p className="text-[10px] text-slate-400 font-medium">IP: 192.168.1.105 • Connected</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded">LIVE</span>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center justify-between opacity-60">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-200 text-slate-600 rounded-lg">
                          <Wifi size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 dark:text-white">Staff Room Scanner</p>
                          <p className="text-[10px] text-slate-400 font-medium">IP: 192.168.1.106 • Offline</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Smartphone size={16} className="text-blue-600" />
                    Offline SMS Gateway
                  </h4>
                  <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                          <Smartphone size={24} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">USB GSM Modem Status</p>
                          <p className="text-xs text-blue-600 font-medium">Ready (Ethio Telecom SIM Detected)</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Balance</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">450.50 ETB</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold">Test Notification</button>
                      <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white rounded-lg text-xs font-bold">Configure Packages</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Grading System' && (
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div>
                    <h4 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider mb-1">Select Grade Level</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Configurations are batch-specific</p>
                  </div>
                  <select
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                    className="px-6 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 min-w-[200px]"
                  >
                    <option value="9">Grade 9</option>
                    <option value="10">Grade 10</option>
                    <option value="11">Grade 11</option>
                    <option value="12">Grade 12</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Active Assessment Methods</h4>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        (gradeConfigs[selectedGrade] || gradeConfigs['default']).reduce((acc, m) => acc + m.maxWeight, 0) === 100
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-rose-100 text-rose-700 animate-pulse'
                      }`}>
                        Total Weight: {(gradeConfigs[selectedGrade] || gradeConfigs['default']).reduce((acc, m) => acc + m.maxWeight, 0)}%
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {(gradeConfigs[selectedGrade] || gradeConfigs['default']).map((method, idx) => (
                      <div key={method.id} className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl group transition-all hover:border-blue-200">
                        <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 font-bold text-xs">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <input
                            type="text"
                            value={method.label}
                            onChange={(e) => {
                              const newConfigs = { ...gradeConfigs };
                              const methods = [...(newConfigs[selectedGrade] || gradeConfigs['default'])];
                              methods[idx].label = e.target.value;
                              newConfigs[selectedGrade] = methods;
                              setGradeConfigs(newConfigs);
                            }}
                            className="bg-transparent font-bold text-slate-800 dark:text-white outline-none w-full"
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                            <input
                              type="number"
                              value={method.maxWeight}
                              onChange={(e) => {
                                const newConfigs = { ...gradeConfigs };
                                const methods = [...(newConfigs[selectedGrade] || gradeConfigs['default'])];
                                methods[idx].maxWeight = parseInt(e.target.value) || 0;
                                newConfigs[selectedGrade] = methods;
                                setGradeConfigs(newConfigs);
                              }}
                              className="bg-transparent font-black text-blue-600 w-12 text-center outline-none"
                            />
                            <span className="text-[10px] font-black text-slate-400">PTS</span>
                          </div>
                          <button
                            onClick={() => {
                              const newConfigs = { ...gradeConfigs };
                              const methods = (newConfigs[selectedGrade] || gradeConfigs['default']).filter((_, i) => i !== idx);
                              newConfigs[selectedGrade] = methods;
                              setGradeConfigs(newConfigs);
                            }}
                            className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-slate-50 dark:bg-slate-800/30 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
                   <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Add New Assessment Method</h5>
                   <div className="flex flex-col md:flex-row gap-4">
                      <input
                        type="text"
                        placeholder="e.g. Class Activity, Project"
                        value={newMethodLabel}
                        onChange={(e) => setNewMethodLabel(e.target.value)}
                        className="flex-1 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
                           <span className="text-[10px] font-bold text-slate-400 uppercase">Weight</span>
                           <input
                             type="number"
                             value={newMethodWeight}
                             onChange={(e) => setNewMethodWeight(parseInt(e.target.value) || 0)}
                             className="w-12 bg-transparent font-bold text-center outline-none"
                           />
                           <span className="text-xs font-bold text-slate-400">%</span>
                        </div>
                        <button
                          onClick={() => {
                            if (!newMethodLabel) return;
                            const newConfigs = { ...gradeConfigs };
                            const methods = [...(newConfigs[selectedGrade] || gradeConfigs['default'])];
                            methods.push({
                              id: newMethodLabel.toLowerCase().replace(/\s+/g, '-'),
                              label: newMethodLabel,
                              maxWeight: newMethodWeight
                            });
                            newConfigs[selectedGrade] = methods;
                            setGradeConfigs(newConfigs);
                            setNewMethodLabel('');
                          }}
                          className="bg-slate-800 text-white p-2.5 rounded-xl hover:bg-slate-700 transition-all shadow-md"
                        >
                          <Plus size={20} />
                        </button>
                      </div>
                   </div>
                </div>

                {(gradeConfigs[selectedGrade] || gradeConfigs['default']).reduce((acc, m) => acc + m.maxWeight, 0) !== 100 && (
                  <div className="flex gap-3 p-4 bg-rose-50 dark:bg-rose-900/20 rounded-2xl border border-rose-100 dark:border-rose-800/50 text-rose-600">
                    <AlertCircle size={20} className="flex-shrink-0" />
                    <p className="text-xs font-medium">Warning: The total weight for Grade {selectedGrade} is currently <strong>{(gradeConfigs[selectedGrade] || gradeConfigs['default']).reduce((acc, m) => acc + m.maxWeight, 0)}%</strong>. It should equal 100% for proper calculations.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'Appearance' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {(['Standard', 'Modern', 'Compact', 'Classic'] as UIStyle[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setStyle(t)}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${style === t ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-100 dark:border-slate-800 hover:border-slate-200'}`}
                    >
                      <p className="font-bold text-sm">{t}</p>
                    </button>
                  ))}
                </div>
                <div
                  onClick={() => setAutoDarkMode(!autoDarkMode)}
                  className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Automatic Dark Mode</p>
                    <p className="text-xs text-slate-500">Switch theme based on system preferences.</p>
                  </div>
                  <div className={`w-12 h-6 rounded-full relative transition-colors ${autoDarkMode ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${autoDarkMode ? 'right-1' : 'left-1'}`} />
                  </div>
                </div>
              </div>
            )}

            {activeTab !== 'General' && activeTab !== 'Appearance' && activeTab !== 'Financial Policy' && (
              <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                <SettingsIcon size={48} className="mb-4 opacity-20" />
                <p className="text-sm font-medium">{activeTab} settings are under configuration for the current branch.</p>
              </div>
            )}

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-100 dark:shadow-none">
                <Save size={18} />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
