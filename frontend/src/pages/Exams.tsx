
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ClipboardList,
  Clock,
  ChevronRight,
  Plus,
  BookOpen,
  User,
  Filter,
  Trash2,
  Save,
  X,
  FileText,
  Upload
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { mockExams } from '../data/examData';
import type { Exam, ExamCategory, Question } from '../data/examData';

const Exams = () => {
  const { role } = useUser();
  const navigate = useNavigate();
  const [exams, setExams] = useState<Exam[]>(mockExams);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [creationType, setCreationType] = useState<'Exam' | 'Assignment'>('Exam');
  const [filterCategory, setFilterCategory] = useState<ExamCategory | 'All'>('All');

  // School Admin and Teacher views
  const isSchoolAdmin = role === 'school-admin';
  const isTeacher = role === 'teacher';
  const isStudent = role === 'student';

  const categories: ExamCategory[] = ['Mid-term', 'Final', 'Quiz', 'Assignment'];

  const filteredExams = exams.filter(exam => {
    const categoryMatch = filterCategory === 'All' || exam.category === filterCategory;
    if (isTeacher) return categoryMatch && exam.teacherId === 't1'; // Mocking teacher ID
    return categoryMatch;
  });

  if (showCreateForm && isTeacher) {
    return <ExamCreator
      type={creationType}
      onCancel={() => setShowCreateForm(false)}
      onSave={(newExam) => {
        setExams([...exams, newExam]);
        setShowCreateForm(false);
      }}
    />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Exams & Assignments</h1>
          <p className="text-slate-500 dark:text-slate-400">
            {isSchoolAdmin && "Monitor and manage school-wide examinations and coursework."}
            {isTeacher && "Manage your course examinations, assignments, and student results."}
            {isStudent && "View and attempt your active examinations and assignments."}
          </p>
        </div>
        {isTeacher && (
          <div className="flex gap-2">
            <button
              onClick={() => { setCreationType('Assignment'); setShowCreateForm(true); }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <FileText size={20} />
              New Assignment
            </button>
            <button
              onClick={() => { setCreationType('Exam'); setShowCreateForm(true); }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              New Exam
            </button>
          </div>
        )}
      </div>

      {/* Filter and Categories */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilterCategory('All')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filterCategory === 'All'
            ? 'bg-blue-600 text-white'
            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
          }`}
        >
          All Items
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filterCategory === cat
              ? 'bg-blue-600 text-white'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {cat}s
          </button>
        ))}
      </div>

      {/* Exam Categories for School Admin */}
      {isSchoolAdmin && filterCategory === 'All' ? (
        <div className="space-y-8">
          {categories.map(cat => (
            <div key={cat} className="space-y-4">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Filter size={20} className="text-blue-600" />
                {cat}s
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exams.filter(e => e.category === cat).map(exam => (
                  <ExamCard key={exam.id} exam={exam} role={role} onStart={() => navigate(`/exam/${exam.id}`)} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map(exam => (
            <ExamCard key={exam.id} exam={exam} role={role} onStart={() => navigate(`/exam/${exam.id}`)} />
          ))}
        </div>
      )}
    </div>
  );
};

const ExamCard = ({ exam, role, onStart }: { exam: Exam, role: string | null, onStart: () => void }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg text-blue-600">
          <ClipboardList size={24} />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500">
          {exam.category}
        </span>
      </div>

      <h3 className="font-bold text-lg dark:text-white mb-1 group-hover:text-blue-600 transition-colors">{exam.title}</h3>
      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <BookOpen size={14} />
          {exam.courseName}
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <User size={14} />
          {exam.teacherName}
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Clock size={14} />
          {exam.durationMinutes} mins • {exam.questions.length} Questions
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
        {role === 'student' ? (
          <button
            onClick={onStart}
            className="w-full flex items-center justify-center gap-2 text-blue-600 font-medium hover:gap-3 transition-all"
          >
            Start Exam <ChevronRight size={18} />
          </button>
        ) : (
          <div className="flex justify-between items-center text-sm">
            <span className={exam.status === 'available' ? 'text-green-600' : 'text-slate-400'}>
              {exam.status === 'available' ? '• Active' : '• Draft'}
            </span>
            <button className="text-slate-400 hover:text-blue-600 transition-colors">
              View Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const ExamCreator = ({ type, onCancel, onSave }: { type: 'Exam' | 'Assignment', onCancel: () => void, onSave: (exam: Exam) => void }) => {
  const [examData, setExamData] = useState<Partial<Exam>>({
    title: '',
    category: type === 'Assignment' ? 'Assignment' : 'Quiz',
    durationMinutes: 60,
    courseName: '',
    questions: []
  });

  const [assignmentDetails, setAssignmentDetails] = useState({
    description: '',
    dueDate: '',
    fileName: ''
  });

  const [questions, setQuestions] = useState<Question[]>([
    { id: '1', text: '', options: [{ id: 'a', text: '' }, { id: 'b', text: '' }], correctOptionId: 'a' }
  ]);

  const addQuestion = () => {
    setQuestions([...questions, {
      id: Date.now().toString(),
      text: '',
      options: [{ id: 'a', text: '' }, { id: 'b', text: '' }],
      correctOptionId: 'a'
    }]);
  };

  const removeQuestion = (idx: number) => {
    setQuestions(questions.filter((_, i) => i !== idx));
  };

  const addOption = (qIdx: number) => {
    const newQuestions = [...questions];
    const nextId = String.fromCharCode(97 + newQuestions[qIdx].options.length);
    newQuestions[qIdx].options.push({ id: nextId, text: '' });
    setQuestions(newQuestions);
  };

  const updateQuestionText = (idx: number, text: string) => {
    const newQuestions = [...questions];
    newQuestions[idx].text = text;
    setQuestions(newQuestions);
  };

  const updateOptionText = (qIdx: number, oIdx: number, text: string) => {
    const newQuestions = [...questions];
    newQuestions[qIdx].options[oIdx].text = text;
    setQuestions(newQuestions);
  };

  const setCorrectOption = (qIdx: number, oId: string) => {
    const newQuestions = [...questions];
    newQuestions[qIdx].correctOptionId = oId;
    setQuestions(newQuestions);
  };

  const handleSave = () => {
    const newExam: Exam = {
      id: Date.now().toString(),
      title: examData.title || `Untitled ${type}`,
      courseId: 'mock-course',
      courseName: examData.courseName || 'General Course',
      teacherId: 't1',
      teacherName: 'Current Teacher',
      category: examData.category as ExamCategory,
      durationMinutes: examData.durationMinutes || 60,
      questions: type === 'Exam' ? questions : [],
      status: 'available'
    };
    onSave(newExam);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onCancel} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500">
            <X size={24} />
          </button>
          <h1 className="text-2xl font-bold dark:text-white">Create New {type}</h1>
        </div>
        <div className="flex gap-3">
          <button onClick={onCancel} className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
            <Save size={20} />
            Publish {type}
          </button>
        </div>
      </div>

      {/* Basic Settings */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Exam Title</label>
            <input
              type="text"
              placeholder="e.g. Mid-term Calculus"
              className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent dark:text-white"
              value={examData.title}
              onChange={e => setExamData({...examData, title: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Course Name</label>
            <input
              type="text"
              placeholder="e.g. Mathematics"
              className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent dark:text-white"
              value={examData.courseName}
              onChange={e => setExamData({...examData, courseName: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
            <select
              className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent dark:text-white"
              value={examData.category}
              onChange={e => setExamData({...examData, category: e.target.value as ExamCategory})}
            >
              <option value="Mid-term">Mid-term</option>
              <option value="Final">Final</option>
              <option value="Quiz">Quiz</option>
              <option value="Assignment">Assignment</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Duration (Minutes)</label>
            <input
              type="number"
              className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent dark:text-white"
              value={examData.durationMinutes}
              onChange={e => setExamData({...examData, durationMinutes: parseInt(e.target.value)})}
            />
          </div>
        </div>
      </div>

      {/* Type-Specific Form */}
      {type === 'Assignment' ? (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Assignment Description</label>
            <textarea
              rows={4}
              placeholder="Provide clear instructions for the assignment..."
              className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent dark:text-white"
              value={assignmentDetails.description}
              onChange={e => setAssignmentDetails({...assignmentDetails, description: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Due Date</label>
              <input
                type="date"
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent dark:text-white"
                value={assignmentDetails.dueDate}
                onChange={e => setAssignmentDetails({...assignmentDetails, dueDate: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Supporting Document (Max 2MB)</label>
              <div className="flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:border-blue-500 transition-colors group cursor-pointer">
                <div className="text-center">
                  <Upload className="mx-auto text-slate-400 group-hover:text-blue-500 mb-2" size={24} />
                  <p className="text-xs text-slate-500">{assignmentDetails.fileName || 'Click to upload PDF or DOCX'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold dark:text-white">Exam Questions</h2>
          <button
            onClick={addQuestion}
            className="text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium"
          >
            <Plus size={18} /> Add Question
          </button>
        </div>

        {questions.map((q, qIdx) => (
          <div key={q.id} className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4 relative group">
            <div className="flex items-start gap-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 font-bold shrink-0">
                {qIdx + 1}
              </span>
              <div className="flex-1 space-y-4">
                <input
                  type="text"
                  placeholder="Enter question text..."
                  className="w-full text-lg font-medium bg-transparent border-none focus:ring-0 dark:text-white"
                  value={q.text}
                  onChange={e => updateQuestionText(qIdx, e.target.value)}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {q.options.map((opt, oIdx) => (
                    <div key={opt.id} className="flex items-center gap-3">
                      <input
                        type="radio"
                        name={`correct-${q.id}`}
                        checked={q.correctOptionId === opt.id}
                        onChange={() => setCorrectOption(qIdx, opt.id)}
                        className="w-4 h-4 text-blue-600"
                        title="Mark as correct"
                      />
                      <span className="text-slate-400 font-medium uppercase">{opt.id}.</span>
                      <input
                        type="text"
                        placeholder={`Option ${opt.id.toUpperCase()}`}
                        className="flex-1 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 dark:text-white"
                        value={opt.text}
                        onChange={e => updateOptionText(qIdx, oIdx, e.target.value)}
                      />
                    </div>
                  ))}
                  <button
                    onClick={() => addOption(qIdx)}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    <Plus size={16} /> Add Option
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeQuestion(qIdx)}
                className="p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default Exams;
