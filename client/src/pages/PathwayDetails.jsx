import { useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'sonner';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { pathways } from '../assets/pathwaysData';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../context/AuthContext';
import { usePathways } from '../hooks/usePathways';
import BlurCircle from '../components/BlurCircle';

const PathwayDetails = () => {
  const { pathwayId } = useParams();
  const navigate      = useNavigate();
  const { isSignedIn } = useAuth();
  const { isSubscribed, toggle, loading } = usePathways();

  const pathway = useMemo(() => pathways.find(p => p.id === pathwayId), [pathwayId]);

  useEffect(() => {
    if (!pathway) {
      toast.error('Pathway not found');
      setTimeout(() => navigate('/pathways', { replace: true }), 1200);
    }
  }, [pathway, navigate]);

  if (!pathway) return <LoadingSpinner fullScreen />;

  const subscribed = isSubscribed(pathwayId);

  const handleSubscription = async () => {
    if (!isSignedIn) {
      return toast.error('Please sign in to subscribe', {
        action: { label: 'Sign In', onClick: () => navigate('/login') },
      });
    }
    const ok = await toggle(pathwayId, !subscribed);
    if (ok) toast.success(subscribed ? 'Unsubscribed' : 'Subscribed!', { icon: <CheckCircle className="text-green-500" /> });
    else    toast.error('Failed. Please retry.');
  };

  return (
    <div className="min-h-screen pt-24 md:pt-32 bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <BlurCircle top="-80px" right="100px" />
      <BlurCircle bottom="-80px" left="200px" />

      <div className="max-w-5xl mx-auto">
        <Toaster position="top-center" richColors />

        <button onClick={() => { navigate('/pathways'); scrollTo(0, 0); }}
          className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Pathways
        </button>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="w-full md:w-1/3">
            <div className="bg-gray-900 rounded-2xl overflow-hidden aspect-square border border-gray-800">
              <img src={pathway.image} alt={pathway.title} className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-3">{pathway.title}</h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="flex items-center gap-1.5 text-sm text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />{pathway.growth}% job growth
              </span>
              <span className="text-primary font-medium text-sm">{pathway.salary}</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">{pathway.description}</p>
            <button onClick={handleSubscription} disabled={loading}
              className={`px-6 py-3 rounded-xl font-medium text-sm transition-all ${
                subscribed
                  ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-600/30 hover:bg-red-900/20 hover:text-red-400 hover:border-red-600/30'
                  : 'bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20'
              } disabled:opacity-60`}>
              {loading ? 'Processing…' : subscribed ? '✓ Subscribed' : 'Subscribe for Updates'}
            </button>
          </div>
        </motion.div>

        {/* Detail Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              title: 'Key Skills', content: (
                <div className="flex flex-wrap gap-2">
                  {pathway.skills.map(s => (
                    <span key={s} className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary border border-primary/20">{s}</span>
                  ))}
                </div>
              )
            },
            {
              title: 'Responsibilities', content: (
                <ul className="space-y-2">
                  {pathway.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-primary mt-0.5">•</span>{r}
                    </li>
                  ))}
                </ul>
              )
            },
            {
              title: 'Education', content: (
                <p className="text-sm text-gray-300 leading-relaxed">{pathway.education}</p>
              )
            },
            {
              title: 'Top Companies', content: (
                <div className="flex flex-wrap gap-2">
                  {pathway.companies.map(c => (
                    <span key={c} className="px-3 py-1 text-sm rounded-full bg-gray-800 text-gray-300 border border-gray-700">{c}</span>
                  ))}
                </div>
              )
            },
            pathway.experienceLevels && {
              title: 'Experience Levels', content: (
                <div className="space-y-3">
                  {Object.entries(pathway.experienceLevels).map(([level, desc]) => (
                    <div key={level} className="border-l-2 border-primary pl-3">
                      <p className="text-primary text-sm font-medium capitalize">{level}</p>
                      <p className="text-gray-400 text-sm">{desc}</p>
                    </div>
                  ))}
                </div>
              )
            },
            pathway.certifications && {
              title: 'Certifications', content: (
                <ul className="space-y-1">
                  {pathway.certifications.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-primary">•</span>{c}
                    </li>
                  ))}
                </ul>
              )
            },
          ].filter(Boolean).map(({ title, content }) => (
            <motion.div key={title} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">{title}</h2>
              {content}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PathwayDetails;