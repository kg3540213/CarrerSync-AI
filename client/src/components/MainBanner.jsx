import React from 'react';
import { ArrowRight, BrainCircuit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useClerk, useUser } from '@clerk/clerk-react';
import BlurCircle from './BlurCircle';
const MainBanner = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const [showLoginPrompt, setShowLoginPrompt] = React.useState(false);

const handleCareerTestClick = () => {
  if (!isSignedIn) {
    setShowLoginPrompt(true);
    return;
  }
  navigate('/career-test');
  window.scrollTo({ top: 0, behavior: 'smooth' });
};


  const handleLoginClick = () => {
    setShowLoginPrompt(false);
    openSignIn();
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  const textVariant = (delay = 0) => ({
    hidden: { y: 50, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        duration: 1.25,
        delay
      }
    }
  });

  const fadeIn = (direction, type, delay, duration) => ({
    hidden: {
      x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
      y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
      opacity: 0
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type,
        delay,
        duration,
        ease: 'easeOut'
      }
    }
  });

  return (
    <section className="relative bg-gray-950 overflow-hidden">
      {/* Blur Circles for visual depth */}
<BlurCircle top="-120px" left="-120px" />
<BlurCircle bottom="-120px" right="-120px" />


      {/* Thematic background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#3f3f46_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      {/* Animated gradient overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-950/90 to-gray-950 z-0"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: "-100px" }}
        className="container mx-auto px-6 py-24 md:py-32 lg:py-40 flex flex-col items-center text-center relative z-10"
      >
        {/* Tagline */}
        <motion.div
          variants={fadeIn('down', 'spring', 0.2, 1)}
          viewport={{ once: false }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gray-800/50 rounded-full border border-gray-700 backdrop-blur-sm"
        >
          <BrainCircuit className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium">AI-Powered Career Guidance</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1 
          variants={textVariant(0.3)}
          viewport={{ once: false }}
          className="text-4xl md:text-6xl font-bold max-w-3xl leading-tight mb-6"
        >
          Discover Your Perfect <span className="text-primary">Career Path</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={fadeIn('up', 'spring', 0.5, 1)}
          viewport={{ once: false }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10"
        >
          Our intelligent system analyzes your strengths, interests and goals to recommend 
          personalized career trajectories just for you.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={itemVariants}
          viewport={{ once: false }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCareerTestClick}
            className="flex items-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary-dull transition-all duration-300 rounded-full font-medium shadow-lg shadow-primary/30"
          >
            Take Career Test <ArrowRight className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { navigate('/pathways'); scrollTo(0,0) }}
            className="px-8 py-3.5 bg-transparent hover:bg-gray-800/50 transition-all duration-300 rounded-full font-medium border border-gray-700 backdrop-blur-sm"
          >
            Explore Pathways
          </motion.button>
        </motion.div>

        {/* Login Prompt */}
        {showLoginPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 bg-gray-800 border border-gray-700 rounded-lg p-4 max-w-md mx-auto"
          >
            <p className="mb-3">Please login to take the career test</p>
            <button
              onClick={handleLoginClick}
              className="px-4 py-2 bg-primary hover:bg-primary-dull rounded-md font-medium"
            >
              Login
            </button>
            <button
              onClick={() => setShowLoginPrompt(false)}
              className="ml-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md"
            >
              Cancel
            </button>
          </motion.div>
        )}

        {/* Stats bar */}
        <motion.div
          variants={itemVariants}
          viewport={{ once: false }}
          className="flex flex-wrap justify-center gap-8 mt-16 pt-8 border-t border-gray-800/50 w-full max-w-2xl"
        >
          {[
            { value: "10,000+", label: "Career Paths" },
            { value: "97%", label: "Accuracy Rate" },
            { value: "50+", label: "Industries" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              variants={fadeIn('up', 'spring', 0.7 + index * 0.1, 1)}
              viewport={{ once: false }}
              whileHover={{ scale: 1.1 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-primary">{stat.value}</div>
              <div className="text-gray-400 text-sm mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating career icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {['👨‍💻', '👩‍🔬', '👨‍⚕️', '👩‍🎨', '👨‍🏫'].map((icon, i) => (
          <motion.div
            key={i}
            initial={{ y: 0, x: Math.random() * 100 }}
            animate={{ 
              y: [0, -20, 0],
              x: [Math.random() * 10, Math.random() * 10]
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
            className="absolute text-2xl opacity-30"
            style={{
              top: `${10 + Math.random() * 80}%`,
              left: `${Math.random() * 100}%`
            }}
          >
            {icon}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MainBanner;