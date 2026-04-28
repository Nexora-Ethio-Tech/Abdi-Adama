import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StudentRegistration } from '../components/StudentRegistration';
import { Chatbot } from '../components/Chatbot';
import { ShootingStars } from '../components/Effects';
import logo from '../assets/logo.jpg';
import classroomImg from '../assets/students_classroom.png';
import { useUser } from '../context/UserContext';
import { useStore } from '../context/useStore';
import {
  ArrowRight,
  ChevronDown,
  LogIn,
  ShieldAlert,
  ArrowLeft,
  Send,
  Video,
  Camera,
  Music2,
  CheckCircle2,
  Users,
  Award,
  BookOpen,
  MapPin,
  Heart,
  Star,
  Zap,
  Globe,
  Quote
} from 'lucide-react';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { schoolName, schoolMotto } = useUser();
  const { publicPosts } = useStore();
  const [showAdmission, setShowAdmission] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const displaySchoolName = schoolName.english;

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

  const stats = [
    { label: 'Students', value: '2,500+', icon: Users, color: 'text-blue-500' },
    { label: 'Qualified Teachers', value: '120+', icon: Award, color: 'text-emerald-500' },
    { label: 'School Branches', value: '4', icon: MapPin, color: 'text-rose-500' },
    { label: 'Clubs & Activities', value: '15+', icon: Zap, color: 'text-amber-500' },
  ];

  const values = [
    { title: 'Integrity', desc: 'Doing what is right — always. We encourage honesty and responsibility.', icon: ShieldAlert },
    { title: 'Leadership', desc: 'Teamwork and projects that build confidence and empathy.', icon: Zap },
    { title: 'Growth', desc: 'Setting goals, working hard, and learning from every challenge.', icon: TrendingUpIcon },
    { title: 'Lifelong Learning', desc: 'Encouraging curiosity and creativity beyond the classroom.', icon: BookOpen },
  ];

  const programs = [
    { title: 'Kindergarten', desc: 'Playful activities to build basic literacy, numeracy, and social skills.', level: 'Ages 3-5' },
    { title: 'Elementary School', desc: 'Core subjects with a focus on computer literacy and digital skills.', level: 'Grades 1-8' },
    { title: 'High School', desc: 'College-prep courses in science, math, and humanities.', level: 'Grades 9-12' },
  ];

  const branches = [
    { name: 'Adama Kebele 10', desc: 'Our central learning hub and foundational campus.', location: 'Main Branch' },
    { name: 'Mogoro Hete Haroreti', desc: 'Modern campus serving growing educational needs.', location: 'Adama' },
    { name: '180 Village', desc: 'Accessible campus with strong community ties.', location: 'Adama' },
    { name: 'Awash', desc: 'Serene environment focused on intellectual curiosity.', location: 'Awash' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500 overflow-x-hidden">
      {/* Premium Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${scrolled ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-xl shadow-md transition-transform group-hover:scale-110" />
            <div className="hidden sm:block">
              <span className="font-black text-slate-900 dark:text-white tracking-tighter block leading-none">ABDI ADAMA</span>
              <span className="text-[10px] font-black text-school-primary uppercase tracking-widest">School</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-8">
              {['Home', 'About', 'Programs', 'Media', 'Branches'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-school-primary transition-colors">{item}</a>
              ))}
            </div>
            <button 
              onClick={() => navigate('/login')}
              className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-50 dark:bg-slate-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-school-primary/5 to-transparent" />
          <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-school-secondary/5 to-transparent" />
          <ShootingStars />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 fade-in-up">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-[10px] font-black uppercase tracking-widest text-school-primary shadow-sm">
                  <Globe size={14} className="animate-spin-slow" />
                  International Standards • Ethiopian Values
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[0.9]">
                  Planting Seeds of <br />
                  <span className="text-gradient">Excellence</span> Today.
                </h1>
                <div className="flex flex-col gap-1 text-slate-500 dark:text-slate-400 font-medium italic border-l-4 border-school-primary pl-4 py-2">
                  <p>{schoolMotto.oromic}</p>
                  <p>{schoolMotto.amharic}</p>
                </div>
              </div>

              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
                Empowering confident thinkers and future leaders through modern education rooted in Ethiopian culture. A thriving international community of passionate educators.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setShowAdmission(true)}
                  className="px-10 py-5 bg-school-primary hover:bg-school-primary/90 text-white rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-2xl shadow-school-primary/30 flex items-center gap-3 group shine"
                >
                  Apply for Admission
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="px-10 py-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-3"
                >
                  Student Portal
                  <LogIn size={18} />
                </button>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-900 aspect-[4/5] group">
                <img src={classroomImg} alt="Students" className="w-full h-full object-cover slow-zoom" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-10 left-10 right-10 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-lg font-bold leading-tight">"Abdi Adama School gave me the chance to discover my potential."</p>
                  <p className="text-xs font-black uppercase tracking-widest text-school-primary mt-2">— Firdos Musa, Top Scorer</p>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-school-secondary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-school-primary/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center space-y-2 group">
                <div className={`mx-auto w-12 h-12 ${stat.color} bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <stat.icon size={24} />
                </div>
                <h4 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{stat.value}</h4>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder's Message */}
      <section id="about" className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="section-header !text-left">
                <span className="section-subtitle">A Legacy of Excellence</span>
                <h2 className="section-title">Message from the <br /> Founders</h2>
              </div>
              
              <div className="space-y-8">
                <div className="relative p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl">
                  <Quote className="absolute top-6 right-6 text-slate-100 dark:text-slate-800" size={80} />
                  <div className="relative z-10 space-y-6">
                    <p className="text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed italic">
                      "Abdi Adama School was established in 1998 E.C. (2005/2006 G.C.) with a dream to create a place where children feel seen, supported, and encouraged to discover their full potential. To build the future of our children, we must plant the seeds of excellence today."
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-school-primary/20 rounded-full flex items-center justify-center text-school-primary font-black">GL</div>
                      <div>
                        <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tight">Ato Girma Lemi</h4>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Founder & Owner</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-white/50 dark:bg-slate-900/30 rounded-3xl border border-slate-100 dark:border-slate-800">
                   <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                     Our vision is to inspire each student to think boldly, act responsibly, and dream fearlessly. We proudly honor Ethiopian culture, identity, and tradition while delivering international quality education.
                   </p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div className="h-64 rounded-3xl overflow-hidden shadow-lg border-2 border-white dark:border-slate-800">
                  <img src="https://images.unsplash.com/photo-1577891729319-f28b3c14a533?q=80&w=2070&auto=format&fit=crop" alt="Founder 1" className="w-full h-full object-cover" />
                </div>
                <div className="bg-school-primary p-6 rounded-3xl text-white shadow-xl">
                  <h4 className="font-black text-2xl">20+</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest">Years of Academic Leadership</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-school-secondary p-6 rounded-3xl text-white shadow-xl">
                   <Heart className="mb-4" />
                   <p className="text-sm font-bold leading-tight">Nurturing bright minds with care and purpose since 2005.</p>
                </div>
                <div className="h-64 rounded-3xl overflow-hidden shadow-lg border-2 border-white dark:border-slate-800">
                   <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop" alt="Campus Life" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-header">
            <span className="section-subtitle">Academic Excellence</span>
            <h2 className="section-title">Educational Programs</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((prog, i) => (
              <div key={i} className="group p-10 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-school-primary mb-8 group-hover:bg-school-primary group-hover:text-white transition-all duration-500">
                  <BookOpen size={32} />
                </div>
                <span className="text-[10px] font-black text-school-primary uppercase tracking-[0.2em] mb-4 px-3 py-1 bg-school-primary/5 rounded-full">{prog.level}</span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">{prog.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm mb-8">{prog.desc}</p>
                <button className="mt-auto flex items-center gap-2 text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest hover:text-school-primary transition-colors">
                  Explore Curriculum
                  <ChevronDown size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" style={{ opacity: 0.1 }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="section-header">
            <span className="section-subtitle !text-school-accent">Our Foundations</span>
            <h2 className="section-title !text-white">Core Values</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {values.map((val, i) => (
              <div key={i} className="space-y-4">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-school-accent border border-white/10">
                  <val.icon size={28} />
                </div>
                <h3 className="text-xl font-black tracking-tight">{val.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Updates / Posts Section */}
      {publicPosts.length > 0 && (
        <section id="updates" className="py-24 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-6 mb-12">
            <div className="section-header !text-left !mb-0 flex items-center justify-between">
              <div>
                <span className="section-subtitle">Stay Informed</span>
                <h2 className="section-title">Latest Updates</h2>
              </div>
              <div className="hidden sm:flex gap-2">
                <div className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400">
                  <ArrowLeft size={20} />
                </div>
                <div className="w-10 h-10 rounded-full bg-school-primary text-white flex items-center justify-center shadow-lg">
                  <ArrowRight size={20} />
                </div>
              </div>
            </div>
          </div>

          <div className="pl-6 md:pl-[calc(50vw-40rem+1.5rem)] pb-8 overflow-x-auto flex snap-x snap-mandatory hide-scrollbar gap-6 pr-6">
            {publicPosts.map((post) => (
              <div key={post.id} className="snap-start shrink-0 w-[85vw] sm:w-[400px] bg-white dark:bg-slate-950 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden group hover:-translate-y-2 transition-all duration-500 flex flex-col">
                <div className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-900 overflow-hidden">
                  {post.type === 'image' ? (
                    <img src={post.mediaUrl} alt="Update" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <iframe src={post.mediaUrl} className="w-full h-full pointer-events-none" />
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-[10px] font-black uppercase tracking-widest rounded-full text-school-primary shadow-sm">
                      {new Date(post.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium line-clamp-3">
                    {post.description}
                  </p>
                  <div className="mt-auto pt-6 flex items-center gap-2 text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest group-hover:text-school-primary transition-colors cursor-pointer w-fit">
                    Read More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Media & Life Section */}
      <section id="media" className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-header">
            <span className="section-subtitle">Life at Abdi Adama</span>
            <h2 className="section-title">Experience Our Community</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Culture Day Video */}
            <div className="group relative rounded-[2.5rem] overflow-hidden bg-slate-900 aspect-video shadow-2xl border-4 border-white dark:border-slate-800">
              <iframe 
                className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                src="https://www.youtube.com/embed/DMtKs79RUmA" 
                title="Abdi Adama Culture Day"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
              <div className="absolute bottom-6 left-6 right-6 pointer-events-none transition-all duration-500 group-hover:translate-y-2 group-hover:opacity-0">
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                  <h4 className="text-white font-black uppercase tracking-widest text-xs mb-1">Culture Day Celebration</h4>
                  <p className="text-white/70 text-[10px] font-medium">Watch our community celebrate Ethiopian culture through dance and music.</p>
                </div>
              </div>
            </div>

            {/* School Intro Video */}
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-school-primary/10 rounded-full text-school-primary">
                  <Video size={18} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Introductory Video</span>
                </div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                  A place where learning <br /> meets <span className="text-gradient">excellence!</span>
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  At Abdi Adama School, we are committed to nurturing young minds and helping every student reach their full potential. Our experienced teachers provide a supportive and engaging environment, combining quality education with values that shape responsible and confident individuals.
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-500 leading-relaxed">
                  Whether in academics, arts, or sports, our students are encouraged to explore their talents and develop skills that prepare them for future success.
                </p>
              </div>

              <a 
                href="https://drive.google.com/file/d/1dGwyS7pClTRLflLSDkj8a332nTsS8lNw/view" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:scale-105 active:scale-95 transition-all w-fit"
              >
                Watch Full Presentation
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Branches Section */}
      <section id="branches" className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-header">
            <span className="section-subtitle">Visit Us</span>
            <h2 className="section-title">Our School Branches</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {branches.map((branch, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all">
                <MapPin className="text-school-primary mb-6" size={24} />
                <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2 tracking-tight">{branch.name}</h4>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{branch.location}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">{branch.desc}</p>
                <button className="text-[10px] font-black text-school-primary uppercase tracking-widest hover:underline">View on Map</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-10 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Ready to shape your <br /> child's <span className="text-gradient">bright future?</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Join thousands of families who trust Abdi Adama School for a high-quality, modern, and value-based education.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
             <button
               onClick={() => setShowAdmission(true)}
               className="px-12 py-6 bg-school-primary text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-2xl shadow-school-primary/40 flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shine"
             >
               Start Online Admission
               <CheckCircle2 size={20} />
             </button>
             <button
               onClick={() => navigate('/login')}
               className="px-12 py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl hover:scale-105 active:scale-95 transition-all"
             >
               Parent Login
             </button>
          </div>
        </div>
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-school-primary/10 blur-[120px]" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-school-secondary/10 blur-[120px]" />
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-950 pt-24 pb-12 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <img src={logo} alt="Logo" className="w-12 h-12 rounded-xl shadow-md" />
                <div>
                  <span className="font-black text-slate-900 dark:text-white tracking-tighter block leading-none">ABDI ADAMA</span>
                  <span className="text-[10px] font-black text-school-primary uppercase tracking-widest">Smart School</span>
                </div>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Founded in 2005, Abdi Adama School is a premier educational institution in Ethiopia dedicated to producing competent and patriotic citizens.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white mb-6">Quick Links</h4>
              <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                {['About Us', 'Admissions', 'Curriculum', 'School Life', 'Careers'].map(item => (
                  <li key={item}><a href="#" className="hover:text-school-primary transition-colors font-bold uppercase tracking-widest text-[10px]">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white mb-6">Connect</h4>
              <div className="flex gap-4">
                {[
                  { icon: Send, url: 'https://t.me/abdiadamaschool', color: 'hover:text-blue-500' },
                  { icon: Video, url: 'https://www.youtube.com/@AbdiadamaSchool-s1c', color: 'hover:text-rose-600' },
                  { icon: Camera, url: 'https://www.instagram.com/abdi_adama_school/', color: 'hover:text-pink-500' },
                  { icon: Music2, url: 'https://www.tiktok.com/@abdiadama1', color: 'hover:text-black dark:hover:text-white' }
                ].map((social, i) => (
                  <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" className={`p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-slate-400 ${social.color} transition-all shadow-sm`}>
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white mb-6">Staff Access</h4>
              <button 
                onClick={() => navigate('/login')}
                className="flex items-center gap-3 px-6 py-3 bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-school-primary rounded-xl text-[10px] font-black uppercase tracking-widest border border-transparent hover:border-school-primary/20 transition-all w-full"
              >
                <ShieldAlert size={16} />
                Official Staff Portal
              </button>
            </div>
          </div>

          <div className="pt-12 border-t border-slate-100 dark:border-slate-800 text-center space-y-4">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">© 2026 ABDI ADAMA SCHOOL • MADE IN ADAMA</p>
          </div>
        </div>
      </footer>

      <Chatbot />
    </div>
  );
};

const TrendingUpIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);
