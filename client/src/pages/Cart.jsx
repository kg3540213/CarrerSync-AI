import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { resources } from '../assets/resources';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Loader2, BookOpen, ArrowRight, X, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../hooks/useCart';
import BlurCircle from '../components/BlurCircle';

const Cart = () => {
  const { isSignedIn }                           = useAuth();
  const { cartItems, toggle, loading, refetch }  = useCart();
  const navigate                                 = useNavigate();
  const [initializing, setInit]                  = useState(true);

  useEffect(() => {
    if (!isSignedIn) { toast.error('Please log in first'); navigate('/'); return; }
    refetch().finally(() => setInit(false));
  }, [isSignedIn]);

  const enrolled = resources.filter(r => cartItems.includes(r.resourceId));

  const total = enrolled.reduce((sum, item) => {
    const n = parseFloat(item.price.replace(/[^\d.]/g, ''));
    return sum + (isNaN(n) ? 0 : n);
  }, 0);

  const handleRemove = async (id) => {
    const ok = await toggle(id, false);
    if (ok) toast.info('Removed from cart');
    else    toast.error('Failed to remove');
  };

  if (initializing) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <Loader2 className="animate-spin w-8 h-8 text-primary" />
    </div>
  );

  return (
    <section className="relative pt-24 md:pt-32 pb-24 bg-gray-950 px-4 sm:px-6 min-h-screen text-white">
      <BlurCircle top="-100px" left="-100px" />
      <BlurCircle bottom="-100px" right="-100px" />

      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent flex items-center gap-3">
            <ShoppingCart className="w-7 h-7 text-primary" /> Your Cart
          </h1>
          <p className="text-gray-500 mt-1">{enrolled.length} item{enrolled.length !== 1 ? 's' : ''}</p>
        </motion.div>

        {enrolled.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-24 bg-gray-900/40 rounded-2xl border border-gray-800">
            <BookOpen className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Discover our courses and start learning</p>
            <button onClick={() => { navigate('/resources'); scrollTo(0, 0); }}
              className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium text-sm flex items-center gap-2 mx-auto transition-all">
              Browse Courses <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Items */}
            <div className="lg:col-span-2">
              <div className="bg-gray-900/60 border border-gray-800 rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-800 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-medium text-white">Selected Courses</span>
                </div>
                <div className="divide-y divide-gray-800/50">
                  <AnimatePresence>
                    {enrolled.map(r => (
                      <motion.div key={r.resourceId} layout
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                        className="p-5 flex flex-col sm:flex-row gap-4 hover:bg-gray-800/20 transition-colors">
                        <div className="w-full sm:w-36 h-28 rounded-xl overflow-hidden flex-shrink-0">
                          <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <p className="font-semibold text-white text-sm leading-snug mb-1">{r.name}</p>
                              <p className="text-xs text-gray-500 line-clamp-2">{r.description}</p>
                            </div>
                            <button onClick={() => handleRemove(r.resourceId)} disabled={loading}
                              className="p-1.5 rounded-lg bg-gray-800 hover:bg-red-900/30 text-gray-400 hover:text-red-400 transition-colors flex-shrink-0">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <span className="text-base font-bold text-primary">{r.price}</span>
                            <span className="text-xs text-gray-600">Lifetime access</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 sticky top-24">
                <h3 className="font-semibold text-white mb-5 flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-primary" /> Order Summary
                </h3>
                <div className="space-y-3 mb-5 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span><span className="text-white">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Discount</span><span className="text-emerald-400">$0.00</span>
                  </div>
                  <div className="flex justify-between text-base font-bold pt-3 border-t border-gray-800">
                    <span className="text-white">Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
                <button onClick={() => navigate('/cart/payment', { state: { totalAmount: total } })}
                  className="w-full py-3.5 bg-gradient-to-r from-primary to-rose-500 hover:from-primary/90 hover:to-rose-600 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20">
                  Secure Checkout <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-xs text-gray-600 text-center mt-4">🔒 256-bit SSL encrypted payment</p>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;