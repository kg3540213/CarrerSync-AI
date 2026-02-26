import { motion } from 'framer-motion';

export const CareerPathwayCard = ({ 
  id,
  title, 
  growth, 
  salary, 
  skills, 
  onNavigate 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="flex-shrink-0 w-[85%] sm:w-[45%] lg:w-[30%] snap-center"
    >
      <div className="h-full bg-gray-900/50 hover:bg-gray-900/70 border border-gray-800 rounded-xl p-6 transition-all duration-300 hover:-translate-y-2">
        {/* Career Title */}
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        
        {/* Growth Indicator */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-sm text-gray-300">{growth}% job growth</span>
        </div>
        
        {/* Salary */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-primary font-medium">{salary}</span>
          <span className="text-gray-500 text-sm">avg. salary</span>
        </div>
        
        {/* Skills */}
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-400 mb-2">TOP SKILLS NEEDED</h4>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span 
                key={i}
                className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        {/* CTA Button */}
        <button 
          onClick={() => onNavigate(id)}
          className="mt-6 w-full py-2 text-sm font-medium rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
        >
          Explore Path
        </button>
      </div>
    </motion.div>
  );
};