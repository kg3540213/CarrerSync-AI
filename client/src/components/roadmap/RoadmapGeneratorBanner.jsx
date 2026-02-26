import React from 'react';
import { Sparkles, Route, BrainCircuit, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useClerk, useUser } from '@clerk/clerk-react';
import BlurCircle from '../BlurCircle';

const RoadmapGeneratorBanner = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const [showLoginPrompt, setShowLoginPrompt] = React.useState(false);

  const handleGeneratorClick = () => {
    if (isSignedIn) {
      navigate('/roadmap-generator');
      scrollTo(0, 0);
    } else {
      setShowLoginPrompt(true);
    }
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
    <section className="relative bg-gray-950 overflow-hidden min-h-screen flex items-center">
      {/* Blur Circles for visual depth */}
      <BlurCircle top="-120px" left="-120px" color="from-purple-500/20" />
      <BlurCircle bottom="-120px" right="-120px" color="from-indigo-500/20" />
      <BlurCircle top="30%" left="60%" color="from-pink-500/15" size="lg" />

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
          <Sparkles className="w-5 h-5 text-purple-400" />
          <span className="text-sm font-medium">AI-Powered Roadmap Generator</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1 
          variants={textVariant(0.3)}
          viewport={{ once: false }}
          className="text-4xl md:text-6xl font-bold max-w-3xl leading-tight mb-6"
        >
          Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Personalized</span> Learning Journey
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={fadeIn('up', 'spring', 0.5, 1)}
          viewport={{ once: false }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10"
        >
          Our intelligent system crafts tailored learning paths based on your goals, 
          skills, and preferences to maximize your success.
        </motion.p>

        {/* Professional Generator Button */}
        <motion.div
          variants={itemVariants}
          viewport={{ once: false }}
          className="mt-6"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGeneratorClick}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 rounded-xl font-medium shadow-lg shadow-purple-500/30 group"
          >
            <span className="relative">
              <Sparkles className="w-5 h-5 transition-all group-hover:rotate-12" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping opacity-75"></span>
            </span>
            <span>Generate Your Roadmap</span>
          </motion.button>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-4xl"
        >
          {[
            {
              icon: <BrainCircuit className="w-8 h-8 text-purple-400" />,
              title: "Intelligent Recommendations",
              description: "AI-curated paths based on your unique profile"
            },
            {
              icon: <Route className="w-8 h-8 text-pink-400" />,
              title: "Structured Learning",
              description: "Step-by-step progression from beginner to advanced"
            },
            {
              icon: <Rocket className="w-8 h-8 text-indigo-400" />,
              title: "Adaptive Updates",
              description: "Roadmap evolves as you progress and learn"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeIn('up', 'spring', 0.8 + index * 0.1, 1)}
              whileHover={{ y: -5 }}
              className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm hover:bg-gray-800/70 transition-all"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-gray-700/50 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Login Prompt */}
        {showLoginPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 bg-gray-800 border border-gray-700 rounded-lg p-4 max-w-md mx-auto"
          >
            <p className="mb-3">Please login to access the roadmap generator</p>
            <button
              onClick={handleLoginClick}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md font-medium"
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
      </motion.div>

      {/* Floating AI elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {['🧠', '📊', '🚀', '🔮'].map((icon, i) => (
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

export default RoadmapGeneratorBanner;