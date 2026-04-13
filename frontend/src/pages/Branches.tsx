
import { Building2, MapPin, Users, GraduationCap, ChevronRight, Plus } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

interface Branch {
  id: string;
  name: string;
  location: string;
}

export const Branches = () => {
  const { branches, setSelectedBranch } = useUser();
  const navigate = useNavigate();

  const handleEnterBranch = (branch: Branch) => {
    setSelectedBranch(branch);
    // When entering a branch as super admin, we keep the role but show branch-specific data
    // The requirement says "he will see things in that branch that the school admin is now seeing"
    navigate('/');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">School Branches</h2>
          <p className="text-sm text-slate-500">Manage and monitor all school locations from one place.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base">
          <Plus size={20} />
          <span>Add New Branch</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {branches.map((branch) => (
          <div
            key={branch.id}
            className="bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                  <Building2 size={24} />
                </div>
                <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2 py-1 rounded-full uppercase">
                  Active
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-1">{branch.name}</h3>
              <div className="flex items-center gap-1 text-slate-500 text-sm mb-6">
                <MapPin size={14} />
                <span>{branch.location}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 p-3 rounded-lg text-center">
                  <div className="flex items-center justify-center gap-2 text-slate-600 mb-1">
                    <Users size={16} />
                    <span className="text-xs font-medium uppercase">Students</span>
                  </div>
                  <p className="text-lg font-bold text-slate-800">320</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg text-center">
                  <div className="flex items-center justify-center gap-2 text-slate-600 mb-1">
                    <GraduationCap size={16} />
                    <span className="text-xs font-medium uppercase">Teachers</span>
                  </div>
                  <p className="text-lg font-bold text-slate-800">24</p>
                </div>
              </div>

              <button
                onClick={() => handleEnterBranch(branch)}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-2.5 rounded-lg hover:bg-slate-800 transition-colors font-medium"
              >
                Enter Branch View
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
