
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Fingerprint, Lock, Mail, User, Phone, ArrowRight } from 'lucide-react';
import { ShootingStars } from '../components/Effects';
import logo from '../assets/logo.jpg';

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    digitalId: '',
    password: '',
    confirmPassword: '',
    role: 'student' as 'student' | 'parent'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock registration logic
    setTimeout(() => {
      setLoading(false);
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      <ShootingStars />

      <div className="w-full max-w-2xl relative z-10 my-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="p-2 bg-white dark:bg-slate-900 rounded-3xl shadow-xl floating">
              <img src={logo} alt="Abdi Adama School Logo" className="w-20 h-20 rounded-2xl object-cover" />
            </div>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Create Account</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Join the Abdi Adama educational community</p>
        </div>

        <div className="card p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl focus:border-school-secondary focus:ring-4 focus:ring-school-secondary/10 transition-all outline-none"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Digital ID</label>
                <div className="relative">
                  <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    required
                    value={formData.digitalId}
                    onChange={(e) => setFormData({ ...formData, digitalId: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl focus:border-school-secondary focus:ring-4 focus:ring-school-secondary/10 transition-all outline-none"
                    placeholder="Enter Digital ID"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl focus:border-school-secondary focus:ring-4 focus:ring-school-secondary/10 transition-all outline-none"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl focus:border-school-secondary focus:ring-4 focus:ring-school-secondary/10 transition-all outline-none"
                    placeholder="+251 ..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl focus:border-school-secondary focus:ring-4 focus:ring-school-secondary/10 transition-all outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl focus:border-school-secondary focus:ring-4 focus:ring-school-secondary/10 transition-all outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">I am registering as a:</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'student' })}
                  className={`py-4 rounded-2xl font-bold transition-all border-2 ${
                    formData.role === 'student'
                      ? 'bg-school-secondary/10 border-school-secondary text-school-secondary'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-500'
                  }`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'parent' })}
                  className={`py-4 rounded-2xl font-bold transition-all border-2 ${
                    formData.role === 'parent'
                      ? 'bg-school-secondary/10 border-school-secondary text-school-secondary'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-500'
                  }`}
                >
                  Parent
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-school-secondary hover:bg-school-secondary/90 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-school-secondary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <UserPlus size={20} />
                  Create Account
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-slate-500 dark:text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="text-school-secondary font-bold hover:underline">
                Sign In instead
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="text-slate-400 hover:text-school-secondary text-sm font-medium transition-colors">
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};
