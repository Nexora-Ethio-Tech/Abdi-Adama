
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
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
  Star,
  CheckCircle2
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
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Inter-Branch Sports Day',
      date: 'April 22, 2026',
      type: 'Sports',
      image: 'https://images.unsplash.com/photo-1526676023771-705019d6a63d?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Cultural Heritage Week',
      date: 'May 10-15, 2026',
      type: 'Culture',
      image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800'
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 } as any
    }
  };

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
      <header className="relative h-screen flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-school-primary/10 via-transparent to-school-accent/5 z-0" />
        <ShootingStars />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center px-4 space-y-8 max-w-4xl"
        >
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-4"
          >
            <div className="relative p-3 bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl floating border border-slate-100 dark:border-slate-800">
              <img src={logo} alt="Abdi Adama School Logo" className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] object-cover shadow-inner" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-4 border-2 border-dashed border-school-primary/20 rounded-[4rem] -z-10"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex flex-wrap justify-center gap-2">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-school-primary/10 text-school-primary rounded-full text-xs font-black tracking-wider uppercase">
                 {schoolMotto.oromic}
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-school-secondary/10 text-school-secondary rounded-full text-xs font-black tracking-wider uppercase">
                 {schoolMotto.amharic}
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-school-accent/10 text-school-accent rounded-full text-xs font-black tracking-wider uppercase">
                 {schoolMotto.english}
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-500 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm"
            >
              <Star size={12} className="fill-current" />
              Awarded 2nd Best School in Oromia
              <Star size={12} className="fill-current" />
            </motion.div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-[1.1]"
          >
            <span className="block opacity-90">{schoolName.oromic}</span>
            <span className="block opacity-95">{schoolName.amharic}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-school-primary to-school-accent block mt-2">
              {schoolName.english}
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Empowering the next generation with 20 years of excellence from KG to Grade 12.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4"
          >
            <button
              onClick={() => setShowAdmission(true)}
              className="w-full sm:w-auto bg-school-primary hover:bg-school-primary/90 text-white px-12 py-5 rounded-[2rem] font-black text-lg transition-all shadow-xl shadow-school-primary/20 flex items-center justify-center gap-3 group relative overflow-hidden"
            >
              <span className="relative z-10 font-black">Online Admission</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform relative z-10" />
              <motion.div
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"
              />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-12 py-5 rounded-[2rem] font-black text-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-3 border border-slate-200 dark:border-slate-700"
            >
              Access Portal
              <LogIn size={20} />
            </button>
          </motion.div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block text-slate-300">
           <ChevronDown size={32} />
        </div>
      </header>

      {/* Award Visual Highlight */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-[4rem] overflow-hidden bg-slate-900 h-[500px] flex items-center shadow-2xl border-8 border-yellow-500/10"
          >
            <img
              src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=2000"
              className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
              alt="Achievement"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />

            <div className="relative z-10 px-12 md:px-24 space-y-6 max-w-2xl">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 px-6 py-3 bg-yellow-500 rounded-2xl text-white shadow-xl shadow-yellow-500/20"
              >
                <Award size={32} className="drop-shadow-lg" />
                <span className="text-xl font-black uppercase tracking-tighter">Oromia Excellence</span>
              </motion.div>

              <h2 className="text-5xl md:text-7xl font-black text-white leading-tight">
                Awarded 2nd Best School in Oromia
              </h2>
              <p className="text-xl text-slate-300 font-medium leading-relaxed">
                A testament to our unwavering dedication to academic excellence, innovative teaching methodologies, and the success of over 4,000 students.
              </p>

              <div className="flex gap-4">
                 {[1,2,3].map(i => (
                    <div key={i} className="flex items-center gap-2 text-yellow-500 font-bold uppercase tracking-widest text-xs">
                       <CheckCircle2 size={16} /> Verified Excellence
                    </div>
                 ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About & Stats Section */}
      <section id="about" className="py-24 bg-slate-50 dark:bg-slate-900/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', delay: i * 0.1 } as any}
                className="text-center p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 hover:scale-105 transition-transform"
              >
                <div className="w-16 h-16 bg-school-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-school-primary">
                  <stat.icon size={32} />
                </div>
                <div className="text-4xl font-black text-slate-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-32 grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div className="space-y-4">
                 <h3 className="text-school-primary font-black uppercase tracking-[0.3em] text-sm">Our Legacy</h3>
                 <h2 className="text-5xl font-black text-slate-900 dark:text-white leading-[1.1]">Celebrating Two Decades of Excellence</h2>
              </div>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                Since our founding 20 years ago, {displaySchoolName} has been committed to providing a holistic educational experience from KG to Grade 12.
              </p>
              <div className="grid gap-8">
                <motion.div whileHover={{ x: 10 }} className="flex gap-6 p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                  <div className="w-16 h-16 bg-school-secondary/10 rounded-2xl flex-shrink-0 flex items-center justify-center text-school-secondary">
                    <Target size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">Our Mission</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-medium italic">"Inspiring lifelong learning and responsible global citizenship through innovation."</p>
                  </div>
                </motion.div>
                <motion.div whileHover={{ x: 10 }} className="flex gap-6 p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                  <div className="w-16 h-16 bg-school-accent/10 rounded-2xl flex-shrink-0 flex items-center justify-center text-school-accent">
                    <Compass size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">Our Vision</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-medium italic">"To be a premier institution recognized for character development and shaping the future."</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
               <div className="absolute inset-0 bg-school-primary rounded-[4rem] rotate-3 opacity-10 group-hover:rotate-6 transition-transform" />
               <div className="relative bg-white dark:bg-slate-900 rounded-[4rem] p-12 aspect-square flex flex-col items-center justify-center border-2 border-slate-100 dark:border-slate-800 shadow-2xl">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <GraduationCap size={160} className="text-school-primary mb-8 opacity-20" />
                  </motion.div>
                  <div className="text-4xl font-black text-slate-900 dark:text-white mb-2">KG to Grade 12</div>
                  <div className="text-slate-500 font-bold uppercase tracking-widest text-sm text-center">Comprehensive Academic Path</div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership & Branches Section */}
      <section id="branches" className="py-24 bg-white dark:bg-slate-950 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20 space-y-4">
            <h3 className="text-school-accent font-black uppercase tracking-[0.4em] text-sm">Locations & Leadership</h3>
            <h2 className="text-5xl font-black text-slate-900 dark:text-white">Our Presence Across the Region</h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg italic">Each branch is led by distinguished experts committed to your child's future.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {branches.map((branch, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', bounce: 0.4, delay: i * 0.1 } as any}
                className="group relative bg-slate-50 dark:bg-slate-900 rounded-[3rem] p-6 transition-all hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              >
                <div className="aspect-square rounded-[2.5rem] overflow-hidden mb-8 shadow-inner ring-4 ring-white dark:ring-slate-800">
                  <img src={branch.photo} alt={branch.principal} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-115" />
                </div>
                <div className="text-center space-y-4">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-1 tracking-tighter">{branch.principal}</h3>
                    <p className="text-school-primary font-black text-[10px] uppercase tracking-[0.2em]">{branch.name} Principal</p>
                  </div>
                  <a
                    href={branch.location}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 w-full justify-center text-xs font-black bg-white dark:bg-slate-800 text-slate-900 dark:text-white py-4 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-school-primary hover:text-white transition-all shadow-sm active:scale-95"
                  >
                    <MapPin size={16} />
                    Open Map Location
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-32 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-school-primary/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-school-accent font-black uppercase tracking-[0.5em] text-sm">Happenings</h3>
              <h2 className="text-6xl font-black tracking-tighter leading-none">Upcoming School Events</h2>
              <p className="text-slate-400 text-lg font-medium">Be part of our vibrant community life across all branches.</p>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest text-school-primary hover:bg-white/10 transition-all"
            >
              Academic Calendar <ArrowRight size={20} />
            </motion.button>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {events.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group relative bg-white/[0.03] backdrop-blur-3xl border border-white/5 overflow-hidden rounded-[3rem] hover:bg-white/[0.06] transition-all duration-700"
              >
                <div className="h-64 overflow-hidden relative ring-1 ring-white/10">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                  <div className="absolute top-6 right-6 text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-school-primary text-white rounded-full shadow-lg">
                    {event.type}
                  </div>
                </div>
                <div className="p-10 space-y-6">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-school-accent group-hover:bg-school-accent group-hover:text-white transition-all duration-500 shadow-inner">
                    <Calendar size={32} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black mb-2 tracking-tighter leading-tight group-hover:text-school-accent transition-colors">{event.title}</h3>
                    <div className="flex items-center gap-2 text-slate-500 font-black uppercase tracking-[0.2em] text-xs">
                       <Clock size={14} /> {event.date}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section Anchor (Legacy Support) */}
      <section id="leadership" className="h-0 invisible" />

      {/* Footer */}
      <footer className="py-20 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-black/50 text-center relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-school-primary via-school-secondary to-school-accent" />
        <div className="max-w-7xl mx-auto px-4 space-y-12 relative z-10">
          <div className="flex flex-col items-center gap-6">
             <div className="p-2 bg-white dark:bg-slate-900 rounded-2xl shadow-xl">
               <img src={logo} alt="Logo" className="w-12 h-12 grayscale hover:grayscale-0 transition-all rounded-xl" />
             </div>
             <div className="space-y-2">
                <h4 className="font-black text-2xl tracking-tighter text-slate-900 dark:text-white uppercase">{displaySchoolName}</h4>
                <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-[10px]">Excellence Since 2005</p>
             </div>
          </div>

          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
             {['About', 'Branches', 'Events', 'Privacy', 'Terms'].map(link => (
                <a key={link} href={`#${link.toLowerCase()}`} className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 hover:text-school-primary transition-colors">{link}</a>
             ))}
          </div>

          <div className="pt-12 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-slate-400 text-[10px] font-black tracking-widest uppercase tracking-[0.2em]">© 2026 {displaySchoolName}. All Rights Reserved.</p>
            <button
              onClick={() => navigate('/login')}
              className="flex items-center gap-2 text-[10px] text-slate-400 hover:text-school-primary transition-all uppercase tracking-widest font-black"
            >
              <ShieldAlert size={14} />
              Discrete Staff Entry
            </button>
          </div>
        </div>
      </footer>

      <Chatbot />
    </div>
  );
};
