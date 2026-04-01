import { useAuth } from '../context/AuthContext';
import { userAPI, roadmapAPI } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { resources } from '../assets/resources';
import { pathways as allPathways } from '../assets/pathwaysData';
import {
  LayoutDashboard, BookOpen, Map, LogOut, ChevronRight,
  Sparkles, TrendingUp, ShoppingCart, Route, User,
  Play, Star, Clock, ArrowRight, Zap, Brain, Award,
  Target, BarChart3, Activity
} from 'lucide-react';

// ── Stat Card ───────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
    className="relative overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 p-6 group hover:border-gray-700 transition-colors"
  >
    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${color} opacity-5`} />
    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <p className="text-3xl font-bold text-white mb-1">{value}</p>
    <p className="text-sm text-gray-500">{label}</p>
  </motion.div>
);

// ── Course Card ─────────────────────────────────────────────────────────────
const CourseCard = ({ course, navigate, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.35 }}
    className="group relative bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-rose-500/30 transition-all duration-300"
  >
    <div className="relative h-40 overflow-hidden">
      <img src={course.image} alt={course.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
      <span className="absolute top-3 right-3 text-xs bg-black/60 backdrop-blur text-gray-300 px-2 py-1 rounded-full border border-white/10">
        {course.price}
      </span>
    </div>
    <div className="p-4">
      <span className="text-xs text-rose-400 font-medium uppercase tracking-wider">{course.category}</span>
      <h3 className="text-sm font-semibold text-white mt-1 mb-3 line-clamp-2 leading-snug">{course.name}</h3>
      <button
        onClick={() => navigate(`/resources/learning-page/${course.resourceId}`)}
        className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-rose-600/10 hover:bg-rose-600 text-rose-400 hover:text-white text-xs font-medium border border-rose-600/20 hover:border-rose-600 transition-all duration-200"
      >
        <Play className="w-3 h-3" /> Continue Learning
      </button>
    </div>
  </motion.div>
);

// ── Pathway Card ────────────────────────────────────────────────────────────
const PathwayCard = ({ pathway, navigate, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -16 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.35 }}
    className="flex items-center gap-4 p-4 rounded-2xl bg-gray-900 border border-gray-800 hover:border-primary/30 transition-all group cursor-pointer"
    onClick={() => navigate(`/pathways/${pathway.id}`)}
  >
    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
      <Route className="w-5 h-5 text-primary" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-white truncate">{pathway.title}</p>
      <p className="text-xs text-gray-500 mt-0.5">{pathway.growth}% growth · {pathway.salary}</p>
    </div>
    <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-primary transition-colors" />
  </motion.div>
);

// ── Roadmap Item ────────────────────────────────────────────────────────────
const RoadmapItem = ({ item, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="p-4 rounded-xl bg-gray-800/50 border border-gray-700/50"
  >
    <p className="text-sm font-medium text-gray-200 line-clamp-1">{item.prompt}</p>
    <p className="text-xs text-gray-500 mt-1">{new Date(item.createdAt).toLocaleDateString()}</p>
  </motion.div>
);

// ── Sidebar Item ────────────────────────────────────────────────────────────
const NavItem = ({ id, icon: Icon, label, active, onClick }) => (
  <button
    onClick={() => onClick(id)}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
      active
        ? 'bg-primary/10 text-primary border border-primary/20'
        : 'text-gray-400 hover:text-white hover:bg-gray-800'
    }`}
  >
    <Icon className="w-4 h-4 flex-shrink-0" />
    {label}
    {active && <ChevronRight className="w-3 h-3 ml-auto" />}
  </button>
);

// ── Main Dashboard ──────────────────────────────────────────────────────────
const Dashboard = () => {
  const { user, logout, isSignedIn, isLoading } = useAuth();
  const navigate = useNavigate();
  const [section, setSection]       = useState('overview');
  const [stats,   setStats]         = useState({ enrolledCourses: 0, subscribedPaths: 0, cartItems: 0, roadmaps: 0 });
  const [courses, setCourses]       = useState([]);
  const [pathways, setPathways]     = useState([]);
  const [roadmaps, setRoadmaps]     = useState([]);
  const [loading,  setLoading_]     = useState(true);

  useEffect(() => {
    if (!isSignedIn && !isLoading) { navigate('/login'); return; }
    if (!isSignedIn) return;
    (async () => {
      try {
        const [dash, rm] = await Promise.all([
          userAPI.getDashboard(),
          roadmapAPI.history(),
        ]);
        setStats(dash.data.stats);
        setCourses(resources.filter(r => dash.data.enrolledCourses.includes(r.resourceId)));
        setPathways(allPathways.filter(p => dash.data.subscribedPaths.includes(p.id)));
        setRoadmaps(rm.data.history.slice(0, 5));
      } catch {}
      finally { setLoading_(false); }
    })();
  }, [isSignedIn, isLoading]);

  if (isLoading || loading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
    </div>
  );

  const STATS = [
    { icon: BookOpen,   label: 'Enrolled Courses', value: stats.enrolledCourses, color: 'from-rose-500 to-pink-600',    delay: 0    },
    { icon: Map,        label: 'Learning Paths',   value: stats.subscribedPaths, color: 'from-blue-500 to-cyan-600',    delay: 0.05 },
    { icon: Brain,      label: 'AI Roadmaps',       value: stats.roadmaps,         color: 'from-violet-500 to-purple-600', delay: 0.1  },
    { icon: ShoppingCart, label: 'In Cart',         value: stats.cartItems,        color: 'from-amber-500 to-orange-600', delay: 0.15 },
  ];

  const SIDEBAR = [
    { id: 'overview',  icon: LayoutDashboard, label: 'Overview'  },
    { id: 'courses',   icon: BookOpen,         label: 'My Courses' },
    { id: 'pathways',  icon: Map,              label: 'Pathways'  },
    { id: 'roadmaps',  icon: Brain,            label: 'Roadmaps'  },
    { id: 'profile',   icon: User,             label: 'Profile'   },
  ];

  return (
    <div className="min-h-screen bg-gray-950 flex font-sans">

      {/* ── Sidebar ── */}
      <motion.aside
        initial={{ x: -280 }} animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col fixed h-screen z-20"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 px-6 py-6 border-b border-gray-800">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-pink-600 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white tracking-tight">CareerAI</span>
        </Link>

        {/* User */}
        <div className="px-4 py-4 border-b border-gray-800">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/60">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/40 to-pink-600/40 border border-primary/30 flex items-center justify-center text-sm font-bold text-white">
              {user?.firstName?.[0] || '?'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-gray-500 truncate">{user?.role === 'admin' ? '⚡ Admin' : '👤 Member'}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {SIDEBAR.map(item => (
            <NavItem key={item.id} {...item} active={section === item.id} onClick={setSection} />
          ))}
          {user?.role === 'admin' && (
            <NavItem id="admin" icon={Award} label="Admin Panel" active={false} onClick={() => navigate('/admin/dashboard')} />
          )}
        </nav>

        {/* Logout */}
        <div className="px-4 py-4 border-t border-gray-800">
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </motion.aside>

      {/* ── Main Content ── */}
      <main className="flex-1 ml-64 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-8 py-10">

          <AnimatePresence mode="wait">

            {/* OVERVIEW */}
            {section === 'overview' && (
              <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="mb-8">
                  <motion.h1 initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-white mb-1">
                    Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, {user?.firstName} 👋
                  </motion.h1>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
                    className="text-gray-500">Here's what's happening with your career journey today.</motion.p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                  {STATS.map(s => <StatCard key={s.label} {...s} />)}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                  {/* Recent Courses */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-white">Continue Learning</h2>
                      <button onClick={() => setSection('courses')} className="text-xs text-primary hover:text-primary/80 flex items-center gap-1">
                        View all <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                    {courses.length === 0 ? (
                      <div className="h-48 rounded-2xl border border-dashed border-gray-800 flex flex-col items-center justify-center text-center p-6">
                        <BookOpen className="w-8 h-8 text-gray-700 mb-3" />
                        <p className="text-sm text-gray-500 mb-3">No courses enrolled yet</p>
                        <Link to="/resources" className="text-xs px-4 py-2 rounded-xl bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors">
                          Browse Courses
                        </Link>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        {courses.slice(0, 4).map((c, i) => (
                          <CourseCard key={c.resourceId} course={c} navigate={navigate} delay={i * 0.05} />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Quick Actions + Recent Roadmaps */}
                  <div className="space-y-6">
                    {/* Quick Actions */}
                    <div>
                      <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
                      <div className="space-y-2">
                        {[
                          { icon: Sparkles, label: 'Generate Roadmap', to: '/roadmap-generator', color: 'text-violet-400' },
                          { icon: Target,   label: 'Take Career Test',  to: '/career-test',       color: 'text-emerald-400' },
                          { icon: BarChart3, label: 'Compare Careers',  to: '/comparison-tool-page', color: 'text-blue-400' },
                          { icon: Activity, label: 'Industry Trends',  to: '/#trends',            color: 'text-amber-400' },
                        ].map(({ icon: Icon, label, to, color }) => (
                          <Link key={label} to={to}
                            className="flex items-center gap-3 p-3 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 text-sm font-medium text-gray-300 hover:text-white transition-all group">
                            <Icon className={`w-4 h-4 ${color}`} />
                            {label}
                            <ChevronRight className="w-3 h-3 ml-auto text-gray-700 group-hover:text-gray-400 transition-colors" />
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Recent Roadmaps */}
                    {roadmaps.length > 0 && (
                      <div>
                        <h2 className="text-lg font-semibold text-white mb-4">Recent Roadmaps</h2>
                        <div className="space-y-2">
                          {roadmaps.slice(0, 3).map((r, i) => (
                            <RoadmapItem key={r._id} item={r} delay={i * 0.05} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </motion.div>
            )}

            {/* COURSES */}
            {section === 'courses' && (
              <motion.div key="courses" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h1 className="text-3xl font-bold text-white">My Courses</h1>
                    <p className="text-gray-500 mt-1">{courses.length} course{courses.length !== 1 ? 's' : ''} enrolled</p>
                  </div>
                  <Link to="/resources"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
                    <BookOpen className="w-4 h-4" /> Browse More
                  </Link>
                </div>
                {courses.length === 0 ? (
                  <div className="h-64 rounded-2xl border border-dashed border-gray-800 flex flex-col items-center justify-center">
                    <BookOpen className="w-10 h-10 text-gray-700 mb-4" />
                    <p className="text-gray-500 mb-4">No courses enrolled yet</p>
                    <Link to="/resources" className="px-6 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
                      Explore Courses
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {courses.map((c, i) => <CourseCard key={c.resourceId} course={c} navigate={navigate} delay={i * 0.04} />)}
                  </div>
                )}
              </motion.div>
            )}

            {/* PATHWAYS */}
            {section === 'pathways' && (
              <motion.div key="pathways" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h1 className="text-3xl font-bold text-white">Learning Paths</h1>
                    <p className="text-gray-500 mt-1">{pathways.length} active path{pathways.length !== 1 ? 's' : ''}</p>
                  </div>
                  <Link to="/pathways"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
                    <Map className="w-4 h-4" /> Explore Paths
                  </Link>
                </div>
                {pathways.length === 0 ? (
                  <div className="h-64 rounded-2xl border border-dashed border-gray-800 flex flex-col items-center justify-center">
                    <Map className="w-10 h-10 text-gray-700 mb-4" />
                    <p className="text-gray-500 mb-4">No pathways subscribed</p>
                    <Link to="/pathways" className="px-6 py-2 rounded-xl bg-primary text-white text-sm font-medium">
                      Browse Pathways
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pathways.map((p, i) => <PathwayCard key={p.id} pathway={p} navigate={navigate} delay={i * 0.06} />)}
                  </div>
                )}
              </motion.div>
            )}

            {/* ROADMAPS */}
            {section === 'roadmaps' && (
              <motion.div key="roadmaps" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h1 className="text-3xl font-bold text-white">AI Roadmaps</h1>
                    <p className="text-gray-500 mt-1">{roadmaps.length} generated</p>
                  </div>
                  <Link to="/roadmap-generator"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 transition-colors">
                    <Sparkles className="w-4 h-4" /> Generate New
                  </Link>
                </div>
                <div className="space-y-3">
                  {roadmaps.map((r, i) => (
                    <motion.div key={r._id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                      className="p-5 rounded-2xl bg-gray-900 border border-gray-800">
                      <p className="text-sm font-medium text-white mb-1">{r.prompt}</p>
                      <p className="text-xs text-gray-600">{new Date(r.createdAt).toLocaleString()}</p>
                    </motion.div>
                  ))}
                  {roadmaps.length === 0 && (
                    <div className="h-64 rounded-2xl border border-dashed border-gray-800 flex flex-col items-center justify-center">
                      <Brain className="w-10 h-10 text-gray-700 mb-4" />
                      <p className="text-gray-500 mb-4">No roadmaps generated yet</p>
                      <Link to="/roadmap-generator" className="px-6 py-2 rounded-xl bg-violet-600 text-white text-sm font-medium">
                        Create Your First
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* PROFILE */}
            {section === 'profile' && (
              <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h1 className="text-3xl font-bold text-white mb-8">Profile</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Card */}
                  <div className="lg:col-span-1">
                    <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 text-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/40 to-pink-600/40 border-2 border-primary/30 flex items-center justify-center text-3xl font-bold text-white mx-auto mb-4">
                        {user?.firstName?.[0]}{user?.lastName?.[0]}
                      </div>
                      <h2 className="text-xl font-bold text-white">{user?.firstName} {user?.lastName}</h2>
                      <p className="text-gray-500 text-sm mt-1">{user?.email}</p>
                      <span className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium ${user?.role === 'admin' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-primary/10 text-primary border border-primary/20'}`}>
                        {user?.role === 'admin' ? '⚡ Admin' : '👤 Member'}
                      </span>
                    </div>
                  </div>
                  {/* Stats */}
                  <div className="lg:col-span-2 grid grid-cols-2 gap-4 content-start">
                    {STATS.map((s, i) => <StatCard key={s.label} {...s} delay={i * 0.05} />)}
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;