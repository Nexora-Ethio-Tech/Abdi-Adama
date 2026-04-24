import { StudentRegistration as RegistrationComponent } from '../components/StudentRegistration';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Registration = () => {
  const navigate = useNavigate();

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

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Student Registration</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Manage admissions, transcript approvals, and student re-enrollment.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
        <RegistrationComponent isAdminView={true} />
      </div>
    </div>
  );
};
