import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { resources } from '../assets/resources';
import { ArrowLeft, ShoppingCart, Check, Loader2, ArrowRight } from 'lucide-react';
import { useMemo, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ResourceCard } from '../components/ResourceCard';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../hooks/useCart';
import { userAPI } from '../services/api';
import BlurCircle from '../components/BlurCircle';

const ResourceDetails = () => {
  const { resourceId } = useParams();
  const navigate       = useNavigate();
  const { isSignedIn } = useAuth();
  const { isInCart, toggle, loading } = useCart();

  const [enrolledIds, setEnrolledIds] = useState([]);

  const resource = useMemo(() => resources.find(r => r.resourceId === resourceId), [resourceId]);

  useEffect(() => {
    if (!resource) { toast.error('Resource not found'); navigate('/resources', { replace: true }); return; }
    if (!isSignedIn) return;
    userAPI.getEnrolledIds().then(({ data }) => setEnrolledIds(data.enrolledIds || [])).catch(() => {});
  }, [resource, isSignedIn, resourceId]);

  if (!resource) return null;

  const inCart    = isInCart(resourceId);
  const enrolled  = enrolledIds.includes(resourceId);
  const other     = resources.filter(r => r.resourceId !== resourceId && !enrolledIds.includes(r.resourceId)).slice(0, 4);

  const handleCart = async () => {
    if (!isSignedIn) { navigate('/login'); return; }
    const ok = await toggle(resourceId, !inCart);
    if (ok) toast.success(inCart ? 'Removed from cart' : 'Added to cart!');
    else    toast.error('Failed to update cart');
  };

  return (
    <section className="relative py-16 pt-24 md:pt-32 bg-gradient-to-br from-gray-900 to-gray-950 px-6 min-h-screen overflow-hidden">
      <BlurCircle top="50%" right="-100px" />
      <BlurCircle bottom="-100px" right="-80px" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.button onClick={() => { navigate('/resources'); scrollTo(0, 0); }}
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="mb-8 flex items-center gap-2 text-primary hover:text-primary/80 group text-sm">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Resources
        </motion.button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden shadow-xl">

          <div className="relative h-80">
            <img src={resource.image} alt={resource.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent" />
          </div>

          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
              <div className="md:w-2/3">
                <h1 className="text-3xl font-bold text-white mb-3">{resource.name}</h1>
                <p className="text-gray-300 mb-6 leading-relaxed">{resource.description}</p>
                <div className="mb-6">
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Skills You'll Learn</p>
                  <div className="flex flex-wrap gap-2">
                    {resource.skillsRequired.map((s, i) => (
                      <motion.span key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="px-3 py-1.5 text-sm rounded-full bg-primary/10 text-primary border border-primary/20">
                        {s}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:w-72 flex-shrink-0">
                <div className="sticky top-24 bg-gray-800/50 border border-gray-700 rounded-2xl p-5">
                  <div className="text-3xl font-bold text-primary mb-5">{resource.price}</div>

                  {enrolled ? (
                    <button onClick={() => navigate(`/resources/learning-page/${resourceId}`)}
                      className="w-full py-3 rounded-xl font-medium bg-emerald-600 hover:bg-emerald-700 text-white text-sm transition-colors flex items-center justify-center gap-2">
                      <Check className="w-4 h-4" /> Continue Learning
                    </button>
                  ) : isSignedIn ? (
                    <motion.button onClick={handleCart} disabled={loading}
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className={`w-full py-3 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                        inCart
                          ? 'bg-gray-700 text-gray-300 hover:bg-red-900/30 hover:text-red-400 border border-gray-600'
                          : 'bg-gradient-to-r from-primary to-rose-500 text-white shadow-lg shadow-primary/20'
                      } disabled:opacity-60`}>
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" />
                        : inCart ? <><Check className="w-4 h-4" /> In Cart</> : <><ShoppingCart className="w-4 h-4" /> Add to Cart</>}
                    </motion.button>
                  ) : (
                    <button onClick={() => navigate('/login')}
                      className="w-full py-3 rounded-xl font-medium bg-gradient-to-r from-primary to-rose-500 text-white text-sm shadow-lg">
                      Login to Enroll
                    </button>
                  )}

                  {inCart && !enrolled && (
                    <button onClick={() => { navigate('/cart'); scrollTo(0, 0); }}
                      className="w-full mt-3 py-2 text-xs text-gray-400 hover:text-white underline transition-colors">
                      View Cart →
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Related */}
        {other.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">You may also like</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {other.map(r => (
                <ResourceCard key={r.resourceId} {...r}
                  onNavigate={id => { navigate(`/resources/${id}`); scrollTo(0, 0); }} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <button onClick={() => { navigate('/resources'); scrollTo(0, 0); }}
            className="flex items-center gap-2 text-primary hover:text-primary/80 text-sm transition-colors">
            Explore All Courses <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ResourceDetails;