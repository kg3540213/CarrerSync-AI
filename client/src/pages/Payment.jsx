import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'sonner';
import { Lock, CreditCard, Shield, Loader2, ArrowLeft } from 'lucide-react';
import { userAPI } from '../services/api';

const Payment = () => {
  const { state }      = useLocation();
  const totalAmount    = state?.totalAmount || 0;
  const navigate       = useNavigate();

  const [card,        setCard]       = useState('');
  const [name,        setName]       = useState('');
  const [expiry,      setExpiry]     = useState('');
  const [cvv,         setCvv]        = useState('');
  const [agree,       setAgree]      = useState(false);
  const [processing,  setProcessing] = useState(false);
  const [confirm,     setConfirm]    = useState(false);

  const fmt = (v) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const fmtExp = (v) => {
    const d = v.replace(/\D/g, '').slice(0, 4);
    return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const valid = () => {
    if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(card)) { toast.error('Invalid card number'); return false; }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) { toast.error('Invalid expiry'); return false; }
    if (cvv.length < 3) { toast.error('Invalid CVV'); return false; }
    if (!agree) { toast.error('Please agree to terms'); return false; }
    return true;
  };

  const handlePay = () => { if (valid()) setConfirm(true); };

  const finalise = async () => {
    setConfirm(false);
    setProcessing(true);
    try {
      await userAPI.finalizePayment({ totalAmount });
      toast.success('Payment successful! Redirecting…');
      setTimeout(() => navigate('/cart'), 1200);
    } catch (e) {
      toast.error(e.response?.data?.error || 'Payment failed');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Toaster richColors position="top-center" />

      {/* Header */}
      <header className="bg-gray-900/80 border-b border-gray-800 backdrop-blur-sm py-5 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-6 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-primary" /> Secure Payment
          </h1>
          <div />
        </div>
      </header>

      <main className="max-w-lg mx-auto px-6 py-12">

        {/* Card preview */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-7 mb-8 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/5 blur-2xl" />
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-10">
              <CreditCard className="w-8 h-8 text-white/70" />
              <span className="text-white/60 text-sm font-medium">CareerAI Pay</span>
            </div>
            <p className="text-xl font-mono tracking-widest text-white mb-6">{card || '•••• •••• •••• ••••'}</p>
            <div className="flex justify-between text-sm text-white/70">
              <div><p className="text-white/40 text-xs mb-1">Card Holder</p><p className="text-white font-medium">{name || 'YOUR NAME'}</p></div>
              <div><p className="text-white/40 text-xs mb-1">Expires</p><p className="text-white font-medium">{expiry || '••/••'}</p></div>
            </div>
          </div>
        </motion.div>

        {/* Amount */}
        <div className="text-center mb-8">
          <p className="text-gray-500 text-sm">Total Amount</p>
          <p className="text-4xl font-bold text-primary mt-1">${totalAmount.toFixed(2)}</p>
        </div>

        {/* Form */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">

          {[
            { label: 'Name on Card', value: name, set: setName, placeholder: 'John Doe', type: 'text' },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">{f.label}</label>
              <input type={f.type} value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.placeholder}
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all" />
            </div>
          ))}

          <div>
            <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">Card Number</label>
            <input value={card} onChange={e => setCard(fmt(e.target.value))} placeholder="1234 5678 9012 3456"
              className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-600 text-sm font-mono tracking-wider focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">Expiry</label>
              <input value={expiry} onChange={e => setExpiry(fmtExp(e.target.value))} placeholder="MM/YY" maxLength={5}
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">CVV</label>
              <input type="password" value={cvv} onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))} placeholder="•••" maxLength={4}
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all" />
            </div>
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-gray-600 bg-gray-800 text-primary focus:ring-primary" />
            <span className="text-xs text-gray-400">I agree to the <a href="#" className="text-primary hover:underline">Terms & Conditions</a> and authorize this payment</span>
          </label>

          <motion.button onClick={handlePay} disabled={processing} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-primary to-rose-500 hover:from-primary/90 hover:to-rose-600 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all disabled:opacity-60">
            {processing ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing…</> : <><Lock className="w-4 h-4" /> Pay ${totalAmount.toFixed(2)}</>}
          </motion.button>

          <p className="text-xs text-gray-600 text-center flex items-center justify-center gap-1">
            <Shield className="w-3 h-3" /> 256-bit SSL encrypted
          </p>
        </motion.div>
      </main>

      {/* Confirm modal */}
      <AnimatePresence>
        {confirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Confirm Payment</h3>
              <p className="text-gray-400 text-sm mb-6">
                Charge <span className="font-bold text-primary">${totalAmount.toFixed(2)}</span> to your card?
              </p>
              <div className="flex gap-3">
                <button onClick={() => setConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-sm font-medium transition-colors">
                  Cancel
                </button>
                <button onClick={finalise}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-primary to-rose-500 text-sm font-semibold text-white transition-all hover:opacity-90">
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Payment;