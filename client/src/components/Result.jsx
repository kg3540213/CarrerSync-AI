// components/Result.jsx
import { motion } from 'framer-motion';

const Result = ({ result, onRestart }) => {
  const getCareerSuggestion = () => {
    const maxType = Object.keys(result).reduce((a, b) => 
      result[a] > result[b] ? a : b
    );
    
    const suggestions = {
      ai: [
        { name: "Machine Learning Engineer", emoji: "🤖", desc: "Develop AI models and algorithms" },
        { name: "AI Research Scientist", emoji: "🔍", desc: "Advance the field of artificial intelligence" }
      ],
      data: [
        { name: "Data Scientist", emoji: "📊", desc: "Extract insights from complex data" }
      ],
      design: [
        { name: "UI/UX Designer", emoji: "🎨", desc: "Create intuitive user experiences" }
      ],
      security: [
        { name: "Cybersecurity Analyst", emoji: "🔐", desc: "Protect systems from digital attacks" }
      ]
    };
    
    return suggestions[maxType];
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto p-6 bg-gray-900 rounded-xl border border-gray-800"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-primary">
        Your Career Matches
      </h2>
      
      <div className="space-y-4">
        {getCareerSuggestion().map((career, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{career.emoji}</span>
              <div>
                <h3 className="font-bold text-lg text-white">{career.name}</h3>
                <p className="text-gray-300">{career.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRestart}
        className="mt-8 w-full py-3 bg-primary hover:bg-primary-dull text-white rounded-lg font-medium transition-colors"
      >
        Take Test Again
      </motion.button>
    </motion.div>
  );
};

export default Result;