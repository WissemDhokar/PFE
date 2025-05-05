import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import myPhoto from './assets/myphoto.jpeg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function DashboardPage() {
  const [user, setUser] = useState(null);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [stats, setStats] = useState({
    interviewsCompleted: 0,
    averageRating: 0,
    practiceSessions: 0,
    improvement: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
      // Simulate loading stats
      setTimeout(() => {
        setStats({
          interviewsCompleted: 5,
          averageRating: 4.2,
          practiceSessions: 12,
          improvement: 15
        });
      }, 1000);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const sampleQuestions = [
    { id: 1, question: "Tell us about yourself?" },
    { id: 2, question: "Why do you think you are good at sales?" },
    { id: 3, question: "What is the biggest deal you have closed?" },
    { id: 4, question: "Why you choose this company?" },
    { id: 5, question: "What your expectation in this company?" },
    { id: 6, question: "Do you have any questions to our company?" }
  ];

  const teamFeedback = [
    {
      id: 1,
      name: "Leslie Alexander",
      role: "Human Resource",
      rating: 4.0,
      avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      id: 2,
      name: "Guy Hawkins",
      role: "Chief Executive Officer",
      rating: 4.0,
      avatar: "https://randomuser.me/api/portraits/men/2.jpg"
    }
  ];

  const menuItems = {
    main: [
      { id: 'dashboard', label: 'Dashboard', icon: '📊' },
      { id: 'interviews', label: 'My Interviews', icon: '🎯' },
      { id: 'practice', label: 'Practice Mode', icon: '🎮' },
    ],
    preparation: [
      { id: 'questions', label: 'Question Bank', icon: '📝' },
      { id: 'analytics', label: 'My Performance', icon: '📈' },
      { id: 'feedback', label: 'Interview Feedback', icon: '💭' },
    ],
    resources: [
      { id: 'tips', label: 'Interview Tips', icon: '💡' },
      { id: 'settings', label: 'Settings', icon: '⚙️' },
      { id: 'help', label: 'Help Center', icon: '❔' },
    ],
  };

  const renderMenuSection = (items, title) => (
    <div className="mb-6">
      {title && (
        <div className="px-4 mb-2 text-xs font-semibold text-blue-100 uppercase tracking-wider">
          {title}
        </div>
      )}
      {items.map((item) => (
        <motion.div
          key={item.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`px-4 py-3 flex items-center cursor-pointer transition-all duration-200 ${
            activeItem === item.id
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-blue-100 hover:bg-blue-700/50'
          }`}
          onClick={() => setActiveItem(item.id)}
        >
          <span className="text-xl mr-3 opacity-90">{item.icon}</span>
          <span className="text-sm font-medium">{item.label}</span>
        </motion.div>
      ))}
    </div>
  );

  const StatCard = ({ title, value, icon, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`bg-white rounded-xl shadow-lg p-6 ${color}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </motion.div>
  );

  const ProgressBar = ({ percentage, color }) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-2.5 rounded-full ${color}`}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <motion.div 
        className="w-64 bg-gradient-to-b from-blue-800 to-blue-900 min-h-screen flex flex-col shadow-xl"
        initial={{ x: 0 }}
        animate={{ x: isSidebarOpen ? 0 : -256 }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo Section */}
        <div className="p-4 border-b border-blue-700/50">
          <span className="text-2xl font-bold text-white bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
            InterviewIQ
          </span>
        </div>

        <div className="flex-1 py-6">
          {renderMenuSection(menuItems.main)}
          {renderMenuSection(menuItems.preparation, 'PREPARATION')}
          {renderMenuSection(menuItems.resources, 'RESOURCES')}
        </div>
        
        <div className="p-4 border-t border-blue-700/50">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/interview-form')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center font-medium"
          >
            <span className="mr-2">▶️</span>
            Start Interview
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="flex-1">
        {/* Top Navigation */}
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {isSidebarOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </motion.button>
              </div>
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/interview-form')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md transition-all duration-200"
                >
                  Start Interview
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Logout
                </motion.button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Card */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <div className="bg-[#23272f] rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
              {/* Welcome Text and Avatar */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 w-full md:w-auto">
                <div className="flex flex-col items-center md:items-start">
                  <h2 className="text-3xl font-bold text-white mb-1">Welcome</h2>
                  <span className="text-gray-400 text-lg mb-4">{user?.name || 'User'}</span>
                  <img
                    src={myPhoto}
                    alt="Avatar"
                    className="w-20 h-20 rounded-full border-4 border-white shadow-md mb-2"
                  />
                </div>
              </div>
              {/* Illustration */}
              <img
                src="https://undraw.co/api/illustrations/undraw_team_spirit_hrr4.svg"
                alt="Team"
                className="hidden md:block absolute top-0 right-0 h-32 opacity-80 pointer-events-none"
                style={{ zIndex: 0 }}
              />
              {/* Summary Row */}
              <div className="w-full mt-6 md:mt-0 md:w-auto flex flex-col md:flex-row items-center justify-between bg-[#181a20] rounded-xl shadow-inner p-4 z-10">
                <div className="flex-1 text-center md:text-left">
                  <div className="text-lg font-semibold text-white">{user?.name || 'Zana Suleiman'}</div>
                  <div className="text-gray-400 text-sm">Developer</div>
                </div>
                <div className="flex-1 text-center">
                  <div className="text-lg font-semibold text-white">80</div>
                  <div className="text-gray-400 text-sm">Projects</div>
                </div>
                <div className="flex-1 text-center">
                  <div className="text-lg font-semibold text-white">$8500</div>
                  <div className="text-gray-400 text-sm">Earned</div>
                </div>
                <div className="flex-1 flex justify-center md:justify-end mt-4 md:mt-0">
                  <button
                    onClick={() => navigate('/profile')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium shadow-md transition"
                  >
                    Profile
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Interviews Completed"
              value={stats.interviewsCompleted}
              icon="🎯"
              color="bg-gradient-to-br from-blue-50 to-blue-100"
            />
            <StatCard
              title="Average Rating"
              value={stats.averageRating.toFixed(1)}
              icon="⭐"
              color="bg-gradient-to-br from-yellow-50 to-yellow-100"
            />
            <StatCard
              title="Practice Sessions"
              value={stats.practiceSessions}
              icon="🎮"
              color="bg-gradient-to-br from-green-50 to-green-100"
            />
            <StatCard
              title="Improvement"
              value={`${stats.improvement}%`}
              icon="📈"
              color="bg-gradient-to-br from-purple-50 to-purple-100"
            />
          </div>

          {/* Progress Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Progress</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Interview Skills</span>
                  <span className="text-sm font-medium text-gray-700">75%</span>
                </div>
                <ProgressBar percentage={75} color="bg-blue-600" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Technical Knowledge</span>
                  <span className="text-sm font-medium text-gray-700">60%</span>
                </div>
                <ProgressBar percentage={60} color="bg-green-600" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Communication</span>
                  <span className="text-sm font-medium text-gray-700">85%</span>
                </div>
                <ProgressBar percentage={85} color="bg-purple-600" />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/practice')}
                  className="p-4 bg-blue-50 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors"
                >
                  <span className="text-2xl mb-2 block">🎮</span>
                  Practice Mode
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/questions')}
                  className="p-4 bg-green-50 rounded-lg text-green-600 hover:bg-green-100 transition-colors"
                >
                  <span className="text-2xl mb-2 block">📝</span>
                  Question Bank
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/analytics')}
                  className="p-4 bg-purple-50 rounded-lg text-purple-600 hover:bg-purple-100 transition-colors"
                >
                  <span className="text-2xl mb-2 block">📈</span>
                  Analytics
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/tips')}
                  className="p-4 bg-yellow-50 rounded-lg text-yellow-600 hover:bg-yellow-100 transition-colors"
                >
                  <span className="text-2xl mb-2 block">💡</span>
                  Tips & Tricks
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Interviews</h2>
              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-900">Technical Interview</h3>
                      <p className="text-sm text-gray-500">Tomorrow at 2:00 PM</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      View Details
                    </motion.button>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-900">HR Interview</h3>
                      <p className="text-sm text-gray-500">Next Monday at 10:00 AM</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      View Details
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage; 