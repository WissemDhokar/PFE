import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { 
  BellIcon, 
  EnvelopeIcon, 
  MagnifyingGlassIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import myPhoto from './assets/myphoto.jpeg';
import PracticeMode from './PracticeMode';
import PracticeSession from './PracticeSession';

function DashboardPage() {
  const [user, setUser] = useState(null);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
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
    <div className="mb-8">
      {title && (
        <div className="px-6 mb-3 text-sm font-semibold text-blue-100 uppercase tracking-wider">
          {title}
        </div>
      )}
      {items.map((item) => (
        <motion.div
          key={item.id}
          whileHover={{ scale: 1.02, x: 5 }}
          whileTap={{ scale: 0.98 }}
          className={`px-6 py-4 flex items-center cursor-pointer transition-all duration-200 ${
            activeItem === item.id
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-blue-100 hover:bg-blue-700/50'
          }`}
          onClick={() => setActiveItem(item.id)}
        >
          <span className="text-2xl mr-4 opacity-90">{item.icon}</span>
          <span className="text-base font-medium">{item.label}</span>
        </motion.div>
      ))}
    </div>
  );

  const StatCard = ({ title, value, icon, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`bg-white rounded-2xl shadow-lg p-8 ${color}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-base font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </motion.div>
  );

  const ProgressBar = ({ percentage, color }) => (
    <div className="w-full bg-gray-200 rounded-full h-3">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-3 rounded-full ${color}`}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <motion.div 
        className="w-72 bg-gradient-to-b from-blue-800 to-blue-900 min-h-screen flex flex-col shadow-xl fixed left-0 top-0 z-50"
        initial={{ x: 0 }}
        animate={{ x: isSidebarOpen ? 0 : -288 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-blue-700/50">
          <span className="text-3xl font-bold text-white bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
            InterviewIQ
          </span>
        </div>

        <div className="flex-1 py-8 overflow-y-auto">
          {renderMenuSection(menuItems.main)}
          {renderMenuSection(menuItems.preparation, 'PREPARATION')}
          {renderMenuSection(menuItems.resources, 'RESOURCES')}
        </div>
        
        <div className="p-6 border-t border-blue-700/50">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/interview-form')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center font-medium text-lg shadow-lg hover:shadow-xl"
          >
            <span className="mr-3">▶️</span>
            Start Interview
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-0'}`}>
        {/* Top Navigation */}
        <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
          <div className="max-w-[1600px] mx-auto px-6">
            <div className="flex justify-between h-20">
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-3 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
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

                {/* Search Bar */}
                <div className="relative w-96">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Search..."
                  />
                </div>
              </div>

              <div className="flex items-center space-x-6">
                {/* Notification Icon */}
                <Menu as="div" className="relative">
                  <Menu.Button className="p-2 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
                    <div className="relative">
                      <BellIcon className="h-6 w-6" />
                      {notifications.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                          {notifications.length}
                        </span>
                      )}
                    </div>
                  </Menu.Button>
                  <Transition
                    as={React.Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
                        {notifications.length === 0 ? (
                          <p className="text-gray-500 text-center py-4">No new notifications</p>
                        ) : (
                          notifications.map((notification, index) => (
                            <div key={index} className="py-2 border-b last:border-b-0">
                              <p className="text-sm text-gray-700">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                {/* Email Icon */}
                <Menu as="div" className="relative">
                  <Menu.Button className="p-2 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
                    <div className="relative">
                      <EnvelopeIcon className="h-6 w-6" />
                      {messages.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                          {messages.length}
                        </span>
                      )}
                    </div>
                  </Menu.Button>
                  <Transition
                    as={React.Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Messages</h3>
                        {messages.length === 0 ? (
                          <p className="text-gray-500 text-center py-4">No new messages</p>
                        ) : (
                          messages.map((message, index) => (
                            <div key={index} className="py-2 border-b last:border-b-0">
                              <p className="text-sm text-gray-700">{message.content}</p>
                              <p className="text-xs text-gray-500 mt-1">{message.time}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                {/* User Menu */}
                <Menu as="div" className="relative">
                  <Menu.Button className="flex items-center space-x-3 focus:outline-none">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl shadow-lg">
                      <i className="fa-solid fa-circle-user"></i>
                    </div>
                  </Menu.Button>
                  <Transition
                    as={React.Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                          <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
                        </div>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => navigate('/profile')}
                              className={`${
                                active ? 'bg-gray-100' : ''
                              } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                            >
                              <i className="fa-solid fa-user mr-3"></i>
                              Profile
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => navigate('/inbox')}
                              className={`${
                                active ? 'bg-gray-100' : ''
                              } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                            >
                              <i className="fa-solid fa-inbox mr-3"></i>
                              Inbox
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => navigate('/settings')}
                              className={`${
                                active ? 'bg-gray-100' : ''
                              } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                            >
                              <i className="fa-solid fa-gear mr-3"></i>
                              Settings
                            </button>
                          )}
                        </Menu.Item>
                        <div className="border-t border-gray-100 my-1"></div>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={`${
                                active ? 'bg-gray-100' : ''
                              } flex items-center w-full px-4 py-2 text-sm text-red-600`}
                            >
                              <i className="fa-solid fa-right-from-bracket mr-3"></i>
                              Logout
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-[1600px] mx-auto px-6 py-8">
          {/* Welcome Card */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <div className="bg-[#23272f] rounded-3xl shadow-2xl p-10 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
              {/* Welcome Text and Avatar */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 w-full md:w-auto">
                <div className="flex flex-col items-center md:items-start">
                  <h2 className="text-4xl font-bold text-white mb-2">Welcome</h2>
                  <span className="text-gray-400 text-xl mb-6">{user?.name || 'User'}</span>
                  <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-5xl shadow-lg mb-4">
                    <i className="fa-solid fa-circle-user"></i>
                  </div>
                </div>
              </div>
              {/* Illustration */}
              <img
                src="https://undraw.co/api/illustrations/undraw_team_spirit_hrr4.svg"
                alt="Team"
                className="hidden md:block absolute top-0 right-0 h-40 opacity-80 pointer-events-none"
                style={{ zIndex: 0 }}
              />
              {/* Summary Row */}
              <div className="w-full mt-8 md:mt-0 md:w-auto flex flex-col md:flex-row items-center justify-between bg-[#181a20] rounded-2xl shadow-inner p-6 z-10">
                <div className="flex-1 text-center md:text-left">
                  <div className="text-xl font-semibold text-white">{user?.name || 'Zana Suleiman'}</div>
                  <div className="text-gray-400 text-base">Developer</div>
                </div>
                <div className="flex-1 text-center">
                  <div className="text-xl font-semibold text-white">80</div>
                  <div className="text-gray-400 text-base">Projects</div>
                </div>
                <div className="flex-1 text-center">
                  <div className="text-xl font-semibold text-white">$8500</div>
                  <div className="text-gray-400 text-base">Earned</div>
                </div>
                <div className="flex-1 flex justify-center md:justify-end mt-4 md:mt-0">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/profile')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Profile
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
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
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Progress</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-base font-medium text-gray-700">Interview Skills</span>
                  <span className="text-base font-medium text-gray-700">75%</span>
                </div>
                <ProgressBar percentage={75} color="bg-blue-600" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-base font-medium text-gray-700">Technical Knowledge</span>
                  <span className="text-base font-medium text-gray-700">60%</span>
                </div>
                <ProgressBar percentage={60} color="bg-green-600" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-base font-medium text-gray-700">Communication</span>
                  <span className="text-base font-medium text-gray-700">85%</span>
                </div>
                <ProgressBar percentage={85} color="bg-purple-600" />
              </div>
            </div>
          </div>

          {/* Quick Actions and Upcoming Interviews */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-6">
                <Link
                  to="/practice"
                  className="p-6 bg-blue-50 rounded-2xl text-blue-600 hover:bg-blue-100 transition-colors shadow-md hover:shadow-lg block"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-3xl mb-3 block">🎮</span>
                    <span className="text-lg font-medium">Practice Mode</span>
                  </motion.div>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/questions')}
                  className="p-6 bg-green-50 rounded-2xl text-green-600 hover:bg-green-100 transition-colors shadow-md hover:shadow-lg"
                >
                  <span className="text-3xl mb-3 block">📝</span>
                  <span className="text-lg font-medium">Question Bank</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/analytics')}
                  className="p-6 bg-purple-50 rounded-2xl text-purple-600 hover:bg-purple-100 transition-colors shadow-md hover:shadow-lg"
                >
                  <span className="text-3xl mb-3 block">📈</span>
                  <span className="text-lg font-medium">Analytics</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/tips')}
                  className="p-6 bg-yellow-50 rounded-2xl text-yellow-600 hover:bg-yellow-100 transition-colors shadow-md hover:shadow-lg"
                >
                  <span className="text-3xl mb-3 block">💡</span>
                  <span className="text-lg font-medium">Tips & Tricks</span>
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Upcoming Interviews</h2>
              <div className="space-y-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Technical Interview</h3>
                      <p className="text-base text-gray-500">Tomorrow at 2:00 PM</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View Details
                    </motion.button>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">HR Interview</h3>
                      <p className="text-base text-gray-500">Next Monday at 10:00 AM</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-blue-600 hover:text-blue-700 font-medium"
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