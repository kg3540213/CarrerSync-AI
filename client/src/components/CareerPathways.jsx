import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CareerPathwayCard } from './CareerPathwayCard';
import { carouselPathways } from '../assets/pathwaysData';

const CareerPathways = () => {
  const navigate = useNavigate();
  const carouselRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (index) => {
    const container = carouselRef.current;
    const item = container.children[index];
    item.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
    setCurrentIndex(index);
  };

  const handleNavigate = (pathwayId) => {
    {navigate(`/pathways/${pathwayId}`);scrollTo(0,0)};
  };

  return (
    <section className="py-16 md:py-24 bg-gray-950">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Popular <span className="text-primary">Career Pathways</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore in-demand careers with strong growth potential
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Carousel Navigation */}
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={() => scrollToIndex(Math.max(0, currentIndex - 1))}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              aria-label="Previous career"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scrollToIndex(Math.min(carouselPathways.length - 1, currentIndex + 1))}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              aria-label="Next career"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Career Cards */}
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6  scrollbar-hide"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {carouselPathways.map((career) => (
              <CareerPathwayCard
                key={career.id}
                id={career.id}
                title={career.title}
                growth={career.growth}
                salary={career.salary}
                skills={career.skills}
                onNavigate={handleNavigate}
              />
            ))}
          </div>

          {/* Carousel Indicators */}
          
                  <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          className="text-center mt-16"
        >
          <button onClick={()=> {navigate('/pathways');scrollTo(0,0)}}
          className="px-8 py-3.5 bg-primary hover:bg-primary-dull rounded-full font-medium shadow-lg shadow-primary/20 transition-all">
            View All Pathways
          </button>
        </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CareerPathways;