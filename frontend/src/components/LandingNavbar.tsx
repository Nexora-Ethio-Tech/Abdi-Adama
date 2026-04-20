
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Menu, X, MapPin, Calendar, Users, Award as AwardIcon } from 'lucide-react';
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
    { name: 'About Us', href: '#about', icon: Users },
    { name: 'Our Branches', href: '#branches', icon: MapPin },
    { name: 'Events', href: '#events', icon: Calendar },
    { name: 'Leadership', href: '#leadership', icon: AwardIcon },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const top = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl shadow-2xl py-3 border-b border-slate-200/50 dark:border-slate-800/50' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-xl shadow-2xl object-cover ring-2 ring-school-primary/20" />
          <div className="flex flex-col">
            <span className="font-black text-lg tracking-tighter text-slate-900 dark:text-white leading-none">
              {schoolName.english}
            </span>
            <span className="text-[10px] font-black text-school-primary uppercase tracking-[0.2em]">Smart-School</span>
          </div>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:text-school-primary transition-all relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-school-primary transition-all group-hover:w-full" />
            </motion.a>
          ))}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
            className="bg-school-primary hover:bg-school-primary/90 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-school-primary/30 flex items-center gap-3"
          >
            <LogIn size={16} />
            Access Portal
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 rounded-xl shadow-inner"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-white dark:bg-slate-900 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] border-t border-slate-100 dark:border-slate-800 overflow-hidden lg:hidden"
          >
            <div className="p-8 space-y-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="flex items-center gap-4 text-xl font-black text-slate-900 dark:text-white hover:text-school-primary transition-colors"
                >
                  <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-school-primary">
                    <link.icon size={20} />
                  </div>
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate('/login');
                }}
                className="w-full bg-school-primary text-white p-5 rounded-3xl font-black text-lg uppercase tracking-widest shadow-2xl shadow-school-primary/40 flex items-center justify-center gap-3"
              >
                <LogIn size={24} />
                Portal Login
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
