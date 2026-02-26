import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart2, BookOpen, Clock, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ComparisonTool = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/comparison-tool-page');
    scrollTo(0, 0);
  };


  const careers = [
    {
      id: 1,
      title: "Data Scientist",
      salary: "$112,000",
      education: "Master's",
      growth: "31%",
      skills: ["Python", "Machine Learning", "Statistics"],
      workLife: "Moderate"
    },
    {
      id: 2,
      title: "UX Designer",
      salary: "$92,000",
      education: "Bachelor's",
      growth: "22%",
      skills: ["Figma", "User Research", "Prototyping"],
      workLife: "Good"
    },
    {
      id: 3,
      title: "Cloud Engineer",
      salary: "$120,000",
      education: "Bachelor's",
      growth: "27%",
      skills: ["AWS", "Azure", "DevOps"],
      workLife: "Moderate"
    }
  ];

  const metrics = [
    {
      name: "Salary",
      icon: <DollarSign className="w-4 h-4" />,
      key: "salary"
    },
    {
      name: "Education",
      icon: <BookOpen className="w-4 h-4" />,
      key: "education"
    },
    {
      name: "Growth",
      icon: <BarChart2 className="w-4 h-4" />,
      key: "growth"
    },
    {
      name: "Work-Life",
      icon: <Clock className="w-4 h-4" />,
      key: "workLife"
    }
  ];

  const takeaways = [
    {
      title: "Highest Paying",
      value: "Cloud Engineer",
      description: "$120k average salary",
      icon: "💵"
    },
    {
      title: "Fastest Growing",
      value: "Data Scientist",
      description: "31% projected growth",
      icon: "📈"
    },
    {
      title: "Best Work-Life",
      value: "UX Designer",
      description: "Most flexible schedules",
      icon: "⚖️"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-950">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Compare <span className="text-primary">Career Paths</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            See how different careers stack up across key metrics
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          className="bg-gray-900/50 border border-gray-700 rounded-xl overflow-hidden mb-12"
        >
          <div className="grid grid-cols-4 gap-px bg-gray-700">
            {/* Header Row */}
            <div className="bg-gray-800 p-4 flex items-center gap-2">
              <span className="text-gray-400">Metric</span>
            </div>
            {careers.map((career, index) => (
              <motion.div
                key={career.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 p-4 text-center"
              >
                <h3 className="font-bold">{career.title}</h3>
              </motion.div>
            ))}

            {/* Metric Rows */}
            {metrics.map((metric) => (
              <React.Fragment key={metric.key}>
                <div className="bg-gray-800 p-4 flex items-center gap-2">
                  {metric.icon}
                  <span>{metric.name}</span>
                </div>
                {careers.map((career) => (
                  <div key={`${metric.key}-${career.id}`} className="bg-gray-800 p-4 text-center">
                    {metric.key === 'skills' ? (
                      <div className="flex flex-wrap justify-center gap-2">
                        {career.skills.slice(0, 2).map((skill) => (
                          <span key={skill} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span>{career[metric.key]}</span>
                    )}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* Key Takeaways */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {takeaways.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-900/50 border border-gray-700 rounded-xl p-6"
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-primary font-medium mb-1">{item.value}</p>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          className="text-center"
        >
          <button 
            onClick={handleButtonClick}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary-dull rounded-full font-medium"
          >
            Launch Full Comparison Tool <ArrowRight className="w-5 h-5" />
          </button>

          {/* Login Prompt */}
          
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonTool;