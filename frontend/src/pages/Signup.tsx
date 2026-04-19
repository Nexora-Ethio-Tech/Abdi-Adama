
import { Link } from 'react-router-dom';
import { GraduationCap, ChevronLeft } from 'lucide-react';
import { StudentRegistration } from '../components/StudentRegistration';

export const Signup = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full space-y-8">
        <div className="flex items-center justify-between">
          <Link
            to="/login"
            className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-colors group"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Login
          </Link>
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <GraduationCap size={24} />
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Admission Portal</h1>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-1 shadow-xl border border-slate-100 dark:border-slate-800">
           <div className="p-6 md:p-10">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">New Student Registration</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Please provide your details and Digital National ID to apply.</p>
              </div>

              <StudentRegistration isAdminView={false} />
           </div>
        </div>

        <p className="text-center text-sm text-slate-500">
          Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Sign in here</Link>
        </p>
      </div>
    </div>
  );
};
