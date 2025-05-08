import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const PracticeMode = () => {
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [progress, setProgress] = useState({
    technical: 0,
    problemSolving: 0,
    systemDesign: 0,
    behavioral: 0
  });

  const navigate = useNavigate();

  const levels = [
    { id: 'beginner', label: 'Beginner', description: 'Basic technical questions and concepts' },
    { id: 'intermediate', label: 'Intermediate', description: 'Complex scenarios and problem-solving' },
    { id: 'advanced', label: 'Advanced', description: 'System design and architecture challenges' }
  ];

  const categories = [
    { id: 'technical', label: 'Technical Skills', icon: '💻' },
    { id: 'problemSolving', label: 'Problem Solving', icon: '🧩' },
    { id: 'systemDesign', label: 'System Design', icon: '🏗️' },
    { id: 'behavioral', label: 'Behavioral Questions', icon: '🤝' }
  ];

  const handleStartPractice = () => {
    if (selectedLevel && selectedCategory) {
      // Store practice preferences
      localStorage.setItem('practicePreferences', JSON.stringify({
        level: selectedLevel,
        category: selectedCategory
      }));
      navigate('/practice-session');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Practice Mode</h1>
          <p className="text-gray-600">Choose your level and category to start practicing</p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div key={category.id} className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{category.icon}</span>
                  <span className="text-sm font-medium text-gray-500">{progress[category.id]}%</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{category.label}</h3>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress[category.id]}%` }}
                    className="bg-blue-600 h-2 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Level Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Select Level</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {levels.map((level) => (
              <motion.button
                key={level.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedLevel(level.id)}
                className={`p-6 rounded-2xl text-left transition-all duration-200 ${
                  selectedLevel === level.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <h3 className="text-xl font-semibold mb-2">{level.label}</h3>
                <p className={`text-sm ${selectedLevel === level.id ? 'text-blue-100' : 'text-gray-600'}`}>
                  {level.description}
                </p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Category Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Select Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-6 rounded-2xl text-left transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <span className="text-3xl mb-4 block">{category.icon}</span>
                <h3 className="text-lg font-semibold">{category.label}</h3>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartPractice}
            disabled={!selectedLevel || !selectedCategory}
            className={`px-8 py-4 rounded-xl text-lg font-semibold text-white shadow-lg transition-all duration-200 ${
              selectedLevel && selectedCategory
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Start Practice Session
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default PracticeMode; 