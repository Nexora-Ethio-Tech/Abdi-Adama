
import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Fingerprint, Lock, AlertCircle } from 'lucide-react';
import { ShootingStars } from '../components/Effects';
import logo from '../assets/logo.jpg';

export const Login = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const [digitalId, setDigitalId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // In a real system we would send {digitalIdOrEmail: digitalId, password}
      // For the mock, we align with the current implementation if it expects specific args
      const success = await login({ digitalIdOrEmail: digitalId, password });
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid Digital ID or Password');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      <ShootingStars />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="p-2 bg-white dark:bg-slate-900 rounded-3xl shadow-xl floating">
              <img src={logo} alt="Abdi Adama School Logo" className="w-24 h-24 rounded-2xl object-cover" />
            </div>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Sign In</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Access the Abdi Adama Smart-School Ecosystem</p>
        </div>

        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Digital National ID</label>
              <div className="relative">
                <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  required
                  value={digitalId}
                  onChange={(e) => setDigitalId(e.target.value)}
                  placeholder="Enter your Digital ID"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl focus:border-school-primary focus:ring-4 focus:ring-school-primary/10 transition-all outline-none"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl focus:border-school-primary focus:ring-4 focus:ring-school-primary/10 transition-all outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-school-primary hover:bg-school-primary/90 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-school-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={20} />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-slate-500 dark:text-slate-400">
              New to Abdi Adama?{' '}
              <Link to="/register" className="text-school-primary font-bold hover:underline">
                Create an Account
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="text-slate-400 hover:text-school-primary text-sm font-medium transition-colors">
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};
