
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { StudentRegistration } from '../components/StudentRegistration';
import { LandingNavbar } from '../components/LandingNavbar';
import { Chatbot } from '../components/Chatbot';
import { ShootingStars } from '../components/Effects';
import logo from '../assets/logo.jpg';
import { useUser } from '../context/UserContext';
import {
  ArrowRight,
  ChevronDown,
  LogIn,
  ShieldAlert,
  MapPin,
  Users,
  Award,
  Target,
  Compass,
  Calendar,
  GraduationCap,
  Building2,
  Clock,
  Star
} from 'lucide-react';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { schoolName, schoolMotto } = useUser();
  const [showAdmission, setShowAdmission] = useState(false);

  const displaySchoolName = schoolName.english;

  const branches = [
    { name: 'Branch 1', location: 'https://maps.app.goo.gl/jpZAg5eRnSoqvHQc8', principal: 'Dr. Abebe Bikila', photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400' },
    { name: 'Branch 2', location: 'https://maps.app.goo.gl/WPcsBFRZ5QptRG1b9', principal: 'Mrs. Lemlem Wolde', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400' },
    { name: 'Branch 3', location: 'https://maps.app.goo.gl/gJig3m9i3zvSps2o9', principal: 'Mr. Solomon Kebede', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400' },
    { name: 'Branch 4', location: 'https://maps.app.goo.gl/xyCnFvJGMUdYvUbMA', principal: 'Ms. Hana Tesfaye', photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400' },
  ];

  const stats = [
    { label: 'Years of Excellence', value: '20+', icon: Clock },
    { label: 'Active Students', value: '4000+', icon: Users },
    { label: 'Expert Staff', value: '170+', icon: GraduationCap },
    { label: 'School Branches', value: '4', icon: Building2 },
  ];

  const events = [
    {
      title: 'Annual Science Fair',
      date: 'March 15, 2026',
      type: 'Academic',
      image: 'https://images.unsplash.com/photo-1564066341723-63994c5086ea?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Inter-Branch Sports Day',
      date: 'April 22, 2026',
      type: 'Sports',
      image: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Cultural Heritage Week',
      date: 'May 10-15, 2026',
      type: 'Culture',
      image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800'
    },
  ];

  if (showAdmission) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={logo} alt="School Logo" className="w-16 h-16 rounded-2xl shadow-lg object-cover" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admission Portal</h1>
                <p className="text-sm text-slate-500">{displaySchoolName}</p>
              </div>
            </div>
            <button
              onClick={() => setShowAdmission(false)}
              className="text-slate-500 hover:text-school-primary font-bold transition-colors"
            >
              ← Back to Main
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-1 shadow-xl border border-slate-100 dark:border-slate-800">
             <StudentRegistration isAdminView={false} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500 scroll-smooth overflow-x-hidden">
      <LandingNavbar />

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-school-primary/10 to-transparent z-0" />
        <ShootingStars />

        <div className="relative z-10 text-center px-4 space-y-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-8"
          >
            <div className="relative p-2 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl floating">
              <img src={logo} alt="Abdi Adama School Logo" className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] object-cover" />
            </div>
          </motion.div>

          {/* Oromia Award Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-500 rounded-full text-[10px] font-black uppercase tracking-widest mx-auto mb-4 shadow-sm"
          >
            <Star size={12} className="fill-current" />
            Awarded 2nd Best School in Oromia
            <Star size={12} className="fill-current" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2 mb-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-school-primary/10 text-school-primary rounded-full text-xs font-bold">
               {schoolMotto.oromic}
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-school-secondary/10 text-school-secondary rounded-full text-xs font-bold">
               {schoolMotto.amharic}
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-school-accent/10 text-school-accent rounded-full text-xs font-bold">
               {schoolMotto.english}
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight"
          >
            <span className="block">{schoolName.oromic}</span>
            <span className="block">{schoolName.amharic}</span>
            <span className="text-school-primary block mt-2">{schoolName.english}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Empowering the next generation with 20 years of excellence from KG to Grade 12.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
          >
            <button
              onClick={() => setShowAdmission(true)}
              className="w-full sm:w-auto bg-school-primary hover:bg-school-primary/90 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-school-primary/20 flex items-center justify-center gap-3 group"
            >
              Online Admission
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-slate-200 transition-all flex items-center justify-center gap-3"
            >
              Access Portal
              <LogIn size={20} />
            </button>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block text-slate-300">
           <ChevronDown size={32} />
        </div>
      </header>

      {/* About & Stats Section */}
      <section id="about" className="py-24 bg-slate-50 dark:bg-slate-900/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800"
              >
                <div className="w-12 h-12 bg-school-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-school-primary">
                  <stat.icon size={24} />
                </div>
                <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">{stat.value}</div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-24 grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-black text-slate-900 dark:text-white">Celebrating Two Decades of Educational Excellence</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Since our founding 20 years ago, {displaySchoolName} has been committed to providing a holistic educational experience from KG to Grade 12. We combine traditional values with modern technology to nurture future leaders.
              </p>
              <div className="space-y-6">
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-school-secondary/10 rounded-2xl flex-shrink-0 flex items-center justify-center text-school-secondary">
                    <Target size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Our Mission</h3>
                    <p className="text-slate-600 dark:text-slate-400">To inspire lifelong learning and empower students to become responsible global citizens through an innovative and inclusive curriculum.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-school-accent/10 rounded-2xl flex-shrink-0 flex items-center justify-center text-school-accent">
                    <Compass size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Our Vision</h3>
                    <p className="text-slate-600 dark:text-slate-400">To be a premier institution recognized for academic excellence, character development, and shaping the future of education in Ethiopia.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-school-primary/5 rounded-[3rem] p-8 aspect-square flex items-center justify-center border-4 border-dashed border-school-primary/20"
            >
               <div className="text-center">
                  <Award size={120} className="text-school-primary mx-auto mb-6 opacity-20" />
                  <div className="text-2xl font-black text-school-primary">KG to Grade 12</div>
                  <div className="text-slate-500 font-bold">Standardized Curriculum</div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4 text-center">Our Branch Leadership</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Led by experienced educators dedicated to student success and operational excellence across all our locations.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {branches.map((branch, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] p-6 transition-all hover:shadow-2xl"
              >
                <div className="aspect-square rounded-3xl overflow-hidden mb-6">
                  <img src={branch.photo} alt={branch.principal} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1">{branch.principal}</h3>
                  <p className="text-school-primary font-bold text-sm mb-4">Principal, {branch.name}</p>
                  <a
                    href={branch.location}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-school-primary hover:text-white transition-all"
                  >
                    <MapPin size={14} />
                    View Location
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-school-primary/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-4xl font-black mb-4">Upcoming School Events</h2>
              <p className="text-slate-400">Stay updated with the latest happenings across our 4 branches.</p>
            </motion.div>
            <button className="flex items-center gap-2 font-bold text-school-primary hover:text-white transition-colors">
              Full Calendar <ArrowRight size={20} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {events.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden rounded-3xl hover:bg-white/10 transition-all duration-500"
              >
                <div className="h-48 overflow-hidden relative">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-school-primary text-white rounded-full">
                    {event.type}
                  </div>
                </div>
                <div className="p-8">
                  <div className="w-12 h-12 bg-school-primary/20 rounded-2xl flex items-center justify-center text-school-primary mb-6">
                    <Calendar size={24} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                  <p className="text-slate-400 font-medium">{event.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Branches Anchor */}
      <section id="branches" />

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 dark:border-slate-800 text-center">
        <div className="flex items-center justify-center gap-3 mb-4 font-bold text-slate-600 dark:text-slate-300">
           <img src={logo} alt="Logo" className="w-8 h-8 rounded-lg grayscale group-hover:grayscale-0 transition-all" />
           {displaySchoolName} © 2026
        </div>
        <p className="text-slate-400 text-sm mb-6">Providing excellence in education since 2005.</p>

        <div className="flex justify-center gap-6">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 text-[10px] text-slate-300 hover:text-school-primary transition-colors uppercase tracking-widest font-bold grayscale hover:grayscale-0 opacity-50 hover:opacity-100"
          >
            <ShieldAlert size={12} />
            Staff Portal
          </button>
        </div>
      </footer>

      <Chatbot />
    </div>
  );
};
