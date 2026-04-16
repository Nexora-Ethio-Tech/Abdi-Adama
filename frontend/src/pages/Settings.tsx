
import { Settings as SettingsIcon, Building, Bell, Shield, Palette, Globe, Save, HelpCircle, CreditCard } from 'lucide-react';
import { useState } from 'react';

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('General');

  const tabs = [
    { id: 'General', icon: Building },
    { id: 'Notifications', icon: Bell },
    { id: 'Security', icon: Shield },
    { id: 'Financial Policy', icon: CreditCard },
    { id: 'Appearance', icon: Palette },
    { id: 'Regional', icon: Globe },
  ];

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
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">School Name</label>
                    <input type="text" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" defaultValue="Abdi Adama Integrated School" />
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

            {activeTab === 'Appearance' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Standard', 'Modern', 'Compact', 'Classic'].map((theme) => (
                    <button key={theme} className={`p-4 rounded-xl border-2 text-center transition-all ${theme === 'Standard' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-100 dark:border-slate-800 hover:border-slate-200'}`}>
                      <p className="font-bold text-sm">{theme}</p>
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Automatic Dark Mode</p>
                    <p className="text-xs text-slate-500">Switch theme based on system preferences.</p>
                  </div>
                  <div className="w-12 h-6 bg-blue-600 rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
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
