
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Menu, X } from 'lucide-react';
import logo from '../assets/logo.jpg';
import { useUser } from '../context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';

export const LandingNavbar = () => {
  const navigate = useNavigate();
  const { schoolName } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Branches', href: '#branches' },
    { name: 'Events', href: '#events' },
    { name: 'Leadership', href: '#leadership' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg shadow-lg py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-xl shadow-lg object-cover" />
          <span className={`font-black text-lg tracking-tight hidden sm:block ${isScrolled || true ? 'text-slate-900 dark:text-white' : 'text-slate-900 dark:text-white'}`}>
            {schoolName.english}
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-school-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => navigate('/login')}
            className="bg-school-primary hover:bg-school-primary/90 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-school-primary/20 flex items-center gap-2"
          >
            <LogIn size={16} />
            Login
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-slate-900 dark:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white dark:bg-slate-900 shadow-2xl border-t border-slate-100 dark:border-slate-800 p-4 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-bold text-slate-900 dark:text-white p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate('/login');
                }}
                className="w-full bg-school-primary text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-2"
              >
                <LogIn size={20} />
                Login to Portal
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
