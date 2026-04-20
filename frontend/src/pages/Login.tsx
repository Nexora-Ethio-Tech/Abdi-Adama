
import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Fingerprint, Lock, AlertCircle, Mail, Key, CheckCircle } from 'lucide-react';
import { ShootingStars } from '../components/Effects';
import logo from '../assets/logo.jpg';

export const Login = () => {
  const { login, schoolName } = useUser();
  const navigate = useNavigate();

  const displaySchoolName = schoolName.split('||')[2]?.trim() || schoolName;
  const [digitalIdOrEmail, setDigitalIdOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginMode, setLoginMode] = useState<'password' | 'otp'>('password');
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isForgotPassword) {
        if (!otp) {
          // Mock sending OTP
          setSuccess('OTP has been sent to your registered contact.');
          setLoading(false);
          return;
        } else {
          // Mock verifying OTP and resetting
          if (otp === '123456') {
            setSuccess('Identity verified! You can now log in.');
            setIsForgotPassword(false);
            setOtp('');
          } else {
            setError('Invalid OTP code. Please try again.');
          }
          setLoading(false);
          return;
        }
      }

      const success = await login({
        digitalIdOrEmail,
        password: loginMode === 'password' ? password : '',
        otp: loginMode === 'otp' ? otp : ''
      });

      if (success) {
        navigate('/');
      } else {
        setError(loginMode === 'password' ? 'Invalid credentials' : 'Invalid 6-digit OTP');
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
          <p className="text-slate-500 dark:text-slate-400 mt-2">Access the {displaySchoolName} Ecosystem</p>
        </div>

        <div className="card p-8">
          {!isForgotPassword && (
            <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-6">
              <button
                onClick={() => setLoginMode('password')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${loginMode === 'password' ? 'bg-white dark:bg-slate-700 text-school-primary shadow-sm' : 'text-slate-500'}`}
              >
                Password
              </button>
              <button
                onClick={() => setLoginMode('otp')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${loginMode === 'otp' ? 'bg-white dark:bg-slate-700 text-school-primary shadow-sm' : 'text-slate-500'}`}
              >
                OTP Login
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle size={18} />
                {error}
              </div>
            )}
            {success && (
              <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-4 rounded-xl flex items-center gap-3 text-emerald-600 dark:text-emerald-400 text-sm">
                <CheckCircle size={18} />
                {success}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Digital ID or Email</label>
              <div className="relative">
                {digitalIdOrEmail.includes('@') ? (
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                ) : (
                  <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                )}
                <input
                  type="text"
                  required
                  value={digitalIdOrEmail}
                  onChange={(e) => setDigitalIdOrEmail(e.target.value)}
                  placeholder="Enter Digital ID or Email"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl focus:border-school-primary focus:ring-4 focus:ring-school-primary/10 transition-all outline-none"
                />
              </div>
            </div>

            {isForgotPassword || loginMode === 'otp' ? (
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">OTP Code (6 Digits)</label>
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    maxLength={6}
                    required={isForgotPassword ? !!success : true}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="123456"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl focus:border-school-primary focus:ring-4 focus:ring-school-primary/10 transition-all outline-none"
                  />
                </div>
                {isForgotPassword && !success && (
                  <p className="text-[10px] text-slate-500 font-medium px-1">We will send a 6-digit code to verify your identity.</p>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Password</label>
                  <button
                    type="button"
                    onClick={() => setIsForgotPassword(true)}
                    className="text-xs font-bold text-school-primary hover:underline"
                  >
                    Forgot?
                  </button>
                </div>
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
            )}

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
                  {isForgotPassword ? (success ? 'Verify & Continue' : 'Send OTP') : 'Sign In'}
                </>
              )}
            </button>

            {isForgotPassword && (
              <button
                type="button"
                onClick={() => {
                  setIsForgotPassword(false);
                  setSuccess('');
                  setError('');
                }}
                className="w-full text-sm font-bold text-slate-500 hover:text-slate-700 py-2"
              >
                Back to Login
              </button>
            )}
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-slate-500 dark:text-slate-400">
              New to {displaySchoolName}?{' '}
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
