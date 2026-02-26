import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FinalCTA = () => {
  const navigate = useNavigate();
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-br from-primary-dull to-primary overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]">
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[length:40px_40px]"></div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 0, x: Math.random() * 100 }}
            animate={{ 
              y: [0, -20, 0],
              x: [Math.random() * 10, Math.random() * 10]
            }}
            transition={{
              duration: 15 + Math.random() * 20,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
            className="absolute text-4xl opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              rotate: Math.random() * 360
            }}
          >
            {['💼', '🎓', '🚀', '📊', '🧠', '💡', '🌟', '📈'][i]}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Ready to Discover Your Ideal Career Path?
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3 }}
            className="text-white/90 max-w-2xl mx-auto mb-10 text-lg"
          >
            Join thousands who found their perfect career match with our AI-powered system
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-10"
          >
            <motion.button
            onClick={() => {navigate('/career-test'); scrollTo(0, 0);}}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-4 bg-white text-gray-900 hover:bg-gray-100 rounded-full font-bold shadow-lg"
            >
              Start Free Assessment <ArrowRight className="w-5 h-5" />
            </motion.button>
            
            
          </motion.div>

        </motion.div>
      </div>

      {/* Floating contact option */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ delay: 1.2 }}
        className="fixed right-6 bottom-6 z-50"
      >
        
      </motion.div>
    </section>
  );
};

export default FinalCTA;