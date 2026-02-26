import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, Loader2, ArrowRight } from 'lucide-react';
import BlurCircle from '../BlurCircle';

const AdminLogin = ({ 
  email, 
  setEmail, 
  password, 
  setPassword, 
  errors, 
  loading, 
  onSubmit,
  adminEmailConfigured,
  adminPasswordConfigured 
}) => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 overflow-hidden flex items-center justify-center px-4">
      <BlurCircle top="-20%" left="-10%" color="purple" size="xl" opacity="30" />
      <BlurCircle bottom="-20%" right="-10%" color="blue" size="xl" opacity="30" />
      <BlurCircle top="30%" right="20%" color="indigo" size="md" opacity="20" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 to-indigo-500/10 p-6 border-b border-gray-800">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold text-white text-center"
            >
              Admin Portal
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 text-sm text-center mt-1"
            >
              Secure access to dashboard
            </motion.p>
          </div>

          <form onSubmit={onSubmit} className="p-6 space-y-6">
            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Admin Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`pl-10 w-full bg-gray-800/50 border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all`}
                  placeholder="admin@yourdomain.com"
                />
              </div>
              {errors.email && errors.email.trim() && (
                <motion.p 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm text-red-400"
                >
                  {errors.email}
                </motion.p>
              )}
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Admin Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`pl-10 w-full bg-gray-800/50 border ${errors.password ? 'border-red-500' : 'border-gray-700'} rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <motion.p 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm text-red-400"
                >
                  {errors.password}
                </motion.p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="pt-2"
            >
              <button
                type="submit"
                disabled={loading || !adminEmailConfigured || !adminPasswordConfigured}
                className={`w-full py-3.5 px-6 rounded-xl font-medium text-white flex items-center justify-center transition-all ${
                  loading || !adminEmailConfigured || !adminPasswordConfigured
                    ? 'bg-gray-700 cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 hover:shadow-lg hover:shadow-primary/20'
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Authenticating...
                  </>
                ) : !adminEmailConfigured || !adminPasswordConfigured ? (
                  'System Configuration Error'
                ) : (
                  <>
                    Login
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </motion.div>
          </form>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="px-6 py-4 bg-gray-900/50 border-t border-gray-800 text-center"
          >
            <p className="text-xs text-gray-500">
              {adminEmailConfigured && adminPasswordConfigured ? (
                'Restricted access. Unauthorized attempts will be logged.'
              ) : (
                <span className="text-red-400">System not properly configured</span>
              )}
            </p>
          </motion.div>
        </div>

        {/* Security badge */}
        {adminEmailConfigured && adminPasswordConfigured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-6 text-center"
          >
            <div className="inline-flex items-center text-xs text-gray-500 bg-gray-900/30 border border-gray-800 rounded-full px-4 py-2">
              <svg
                className="w-4 h-4 mr-2 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Secure encrypted connection
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default AdminLogin;