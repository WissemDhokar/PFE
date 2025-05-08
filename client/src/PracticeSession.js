import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const PracticeSession = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [sessionProgress, setSessionProgress] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load practice preferences
    const preferences = JSON.parse(localStorage.getItem('practicePreferences'));
    if (!preferences) {
      navigate('/practice');
      return;
    }
    // Load first question based on preferences
    loadNextQuestion(preferences);
  }, [navigate]);

  const loadNextQuestion = (preferences) => {
    // This would be replaced with actual API call to get questions
    setCurrentQuestion({
      id: 1,
      text: "Explain the concept of React hooks and their benefits.",
      category: "technical",
      level: "intermediate"
    });
  };

  const handleSubmitAnswer = () => {
    if (!userAnswer.trim()) return;

    // This would be replaced with actual API call to evaluate answer
    setFeedback({
      score: 85,
      comments: "Good explanation of hooks, but could elaborate more on use cases.",
      suggestions: ["Add examples of custom hooks", "Explain the rules of hooks"]
    });

    // Update progress
    setSessionProgress(prev => Math.min(prev + 20, 100));
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    // Implement voice recording logic here
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // Implement stop recording and convert to text logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Practice Session</h2>
            <span className="text-sm font-medium text-gray-500">{sessionProgress}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${sessionProgress}%` }}
              className="bg-blue-600 h-2 rounded-full"
            />
          </div>
        </motion.div>

        {/* Question Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Question</h3>
          <p className="text-lg text-gray-700 mb-8">{currentQuestion?.text}</p>

          {/* Answer Input */}
          <div className="space-y-4">
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="w-full h-32 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />

            {/* Voice Recording Button */}
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                className={`px-6 py-3 rounded-xl text-white font-medium shadow-lg transition-all duration-200 ${
                  isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Feedback Section */}
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl p-8 mb-8"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Feedback</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-gray-700">Score</span>
                <span className="text-2xl font-bold text-blue-600">{feedback.score}%</span>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-700 mb-2">Comments</h4>
                <p className="text-gray-600">{feedback.comments}</p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-700 mb-2">Suggestions</h4>
                <ul className="list-disc list-inside text-gray-600">
                  {feedback.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-between"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/practice')}
            className="px-6 py-3 rounded-xl text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium shadow-lg transition-all duration-200"
          >
            Back to Practice
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmitAnswer}
            className="px-6 py-3 rounded-xl text-white bg-blue-600 hover:bg-blue-700 font-medium shadow-lg transition-all duration-200"
          >
            Submit Answer
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default PracticeSession; 