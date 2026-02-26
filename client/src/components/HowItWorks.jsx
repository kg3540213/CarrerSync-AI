import { User, BrainCircuit, Route } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const HowItWorks = () => {
  const steps = [
    {
      icon: <User className="w-6 h-6 text-primary" />,
      title: "1. Take Assessment",
      description: "Complete our AI-powered career quiz",
      delay: 0.2
    },
    {
      icon: <BrainCircuit className="w-6 h-6 text-primary" />,
      title: "2. Get Insights",
      description: "Receive personalized career matches based on your strengths",
      delay: 0.4
    },
    {
      icon: <Route className="w-6 h-6 text-primary" />,
      title: "3. Explore Paths",
      description: "Discover education and skill requirements for each career",
      delay: 0.6
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-950 overflow-x-hidden">
      <div className="container mx-auto px-6 w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
          className="text-center mb-16 max-w-full"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How <span className="text-primary">CareerPath AI</span> Works
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our 3-step process helps you discover careers perfectly aligned with your unique profile
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: step.delay }}
              viewport={{ once: false, margin: "-50px" }}
              className="relative w-full"
            >
              <div className="h-full bg-gray-900/50 hover:bg-gray-900/70 border border-gray-800 rounded-xl p-8 transition-all duration-300 hover:-translate-y-2 w-full">
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  {step.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
                
                {/* Animated Connector (for desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 translate-x-1/2">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: step.delay + 0.2 }}
                      viewport={{ once: false }}
                      className="h-px w-16 bg-gradient-to-r from-primary to-primary/10 origin-left"
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: step.delay + 0.8 }}
                      viewport={{ once: false }}
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;