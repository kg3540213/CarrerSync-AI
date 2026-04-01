import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { CareerPathwayCard } from '../components/CareerPathwayCard';
import { pathways, categories } from '../assets/pathwaysData';
import BlurCircle from '../components/BlurCircle';
import { useAuth } from '../context/AuthContext';
import { usePathways } from '../hooks/usePathways';

const AllPathways = () => {
  const navigate = useNavigate();
  const { isLoaded, isSignedIn } = useAuth();
  const { subscribedIds } = usePathways();

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter]         = useState('all');

  const filtered = pathways
    .filter(p => !subscribedIds.includes(p.id))
    .filter(p => filter === 'all' || p.category === filter)
    .filter(p => {
      if (!searchTerm) return true;
      const q = searchTerm.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.skills.some(s => s.toLowerCase().includes(q));
    });

  if (!isLoaded) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <section className="py-16 pt-28 md:pt-36 bg-gray-950 min-h-screen">
      <BlurCircle top="-80px" left="-100px" />
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Explore <span className="text-primary">Career Pathways</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Browse our comprehensive collection of in-demand careers</p>
        </motion.div>

        {!isSignedIn ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-20 bg-gray-900/50 rounded-2xl border border-gray-800">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5 border border-primary/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Sign in to explore pathways</h3>
            <p className="text-gray-400 mb-6 text-sm">Create an account to access career pathways</p>
            <button onClick={() => navigate('/login')}
              className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium text-sm transition-all">
              Sign In
            </button>
          </motion.div>
        ) : (
          <>
            {/* Filters */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="text" placeholder="Search pathways…" value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-colors" />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <select value={filter} onChange={e => setFilter(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-sm text-white appearance-none focus:outline-none focus:border-primary/50 transition-colors">
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </motion.div>

            <p className="text-xs text-gray-600 mb-5">{filtered.length} pathway{filtered.length !== 1 ? 's' : ''} found</p>

            {filtered.length > 0 ? (
              <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-6 scrollbar-hide">
                {filtered.map(p => (
                  <CareerPathwayCard key={p.id} {...p}
                    onNavigate={id => { navigate(`/pathways/${id}`); scrollTo(0, 0); }} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 mb-3">No pathways match your search</p>
                <button onClick={() => { setSearchTerm(''); setFilter('all'); }}
                  className="text-primary text-sm hover:underline">Clear filters</button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default AllPathways;