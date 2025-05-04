import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const [user, setUser] = useState(null);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
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
        <div
          key={item.id}
          className={`px-4 py-3 flex items-center cursor-pointer transition-all duration-200 ${
            activeItem === item.id
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-blue-100 hover:bg-blue-700/50'
          }`}
          onClick={() => setActiveItem(item.id)}
        >
          <span className="text-xl mr-3 opacity-90">{item.icon}</span>
          <span className="text-sm font-medium">{item.label}</span>
        </div>
      ))}
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
          {/* Main Menu */}
          {renderMenuSection(menuItems.main)}
          
          {/* Preparation Section */}
          {renderMenuSection(menuItems.preparation, 'PREPARATION')}
          
          {/* Resources Section */}
          {renderMenuSection(menuItems.resources, 'RESOURCES')}
        </div>
        
        {/* Start Interview Button */}
        <div className="p-4 border-t border-blue-700/50">
          <button 
            onClick={() => navigate('/interview-form')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center font-medium"
          >
            <span className="mr-2">▶️</span>
            Start Interview
          </button>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="flex-1">
        {/* Top Navigation */}
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                {/* Hamburger Menu Button */}
                <button
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
                </button>

                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <a href="#" className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Home
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700 hover:border-blue-300 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                    Features
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700 hover:border-blue-300 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                    About Us
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => navigate('/interview-form')}
                  className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md transition-all duration-200"
                >
                  Start Interview
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                All-In-One AI<br />Interview Platform
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Our platform combines advanced artificial intelligence technologies with intuitive features to streamline your talent selection process, saving you time, effort, and resources.
              </p>
              <div className="flex space-x-4">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Request Demo
                </button>
                <button className="px-6 py-3 border border-gray-300 rounded-md hover:border-blue-500 transition-colors flex items-center">
                  Learn More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-[500px] w-full bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-blue-900 mb-2">Welcome to InterviewIQ</h3>
                  <p className="text-blue-700">Your AI-powered interview preparation platform</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Question List Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Question List</h2>
              <div className="space-y-4">
                {sampleQuestions.map((q, index) => (
                  <div key={q.id} className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                      {q.id}
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-gray-700">{q.question}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Team Feedback Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Team Feedback</h2>
              <div className="space-y-4">
                {teamFeedback.map((member) => (
                  <div key={member.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {"★".repeat(Math.floor(member.rating))}
                      {"☆".repeat(5 - Math.floor(member.rating))}
                      <span className="ml-2 text-sm text-gray-600">{member.rating.toFixed(1)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Rating Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-gray-800 rounded-2xl p-8 flex items-center justify-between"
          >
            <div className="flex items-center">
              <div className="flex -space-x-2">
                <img className="w-10 h-10 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/women/3.jpg" alt="" />
                <img className="w-10 h-10 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/men/4.jpg" alt="" />
                <img className="w-10 h-10 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/women/5.jpg" alt="" />
              </div>
              <div className="ml-6">
                <div className="flex items-center">
                  {"★".repeat(4)}{"☆".repeat(1)}
                  <span className="ml-2 text-white font-medium">4.0</span>
                </div>
                <p className="text-gray-400">from 500+ reviews</p>
              </div>
            </div>
            <img 
              src="https://your-platform-screenshot.jpg" 
              alt="Platform Interface" 
              className="rounded-lg shadow-lg max-w-2xl"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage; 