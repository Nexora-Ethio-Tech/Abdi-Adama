
import { useNavigate } from 'react-router-dom';
import { ClipboardList, Clock, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Exams = () => {
  const { role } = useUser();
  const navigate = useNavigate();

  // Mock data for the exam list
  const exams = [
    {
      id: 'math-mid-2024',
      title: 'Mathematics Mid-term',
      subject: 'Advanced Calculus',
      duration: '60 mins',
      questions: 5,
      status: 'available',
      type: 'Secure Exam'
    },
    {
      id: 'physics-quiz-1',
      title: 'Physics Quiz #1',
      subject: 'Mechanics',
      duration: '30 mins',
      questions: 10,
      status: 'completed',
      type: 'Standard Quiz'
    }
  ];

  const canManage = ['super-admin', 'school-admin', 'teacher'].includes(role);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Exams & Assessments</h1>
          <p className="text-slate-500 dark:text-slate-400">
            {canManage
              ? 'Manage school-wide examinations and review results.'
              : 'View your upcoming exams and past assessment history.'}
          </p>
        </div>
        {canManage && (
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
            <ClipboardList size={20} />
            Create Exam
          </button>
        )}
      </div>

      {/* Quick Stats (Role specific) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg text-blue-600">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Upcoming</p>
              <h3 className="text-xl font-bold dark:text-white">2</h3>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg text-green-600">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Completed</p>
              <h3 className="text-xl font-bold dark:text-white">12</h3>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-lg text-amber-600">
              <AlertCircle size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Requires Attention</p>
              <h3 className="text-xl font-bold dark:text-white">1</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Exams List */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <h2 className="font-semibold dark:text-white">Active Examinations</h2>
        </div>
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {exams.map((exam) => (
            <div key={exam.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-4">
                  <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg text-slate-600 dark:text-slate-300">
                    <ClipboardList size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium dark:text-white">{exam.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{exam.subject} • {exam.duration} • {exam.questions} Questions</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                        {exam.type}
                      </span>
                      {exam.status === 'available' ? (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600">
                          Active Now
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                          Completed
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {role === 'student' && exam.status === 'available' && (
                  <button
                    onClick={() => navigate(`/exam/${exam.id}`)}
                    className="flex items-center gap-2 text-blue-600 font-medium hover:gap-3 transition-all"
                  >
                    Start Session <ChevronRight size={18} />
                  </button>
                )}

                {canManage && (
                  <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                    <ChevronRight size={20} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Exams;
