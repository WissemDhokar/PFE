import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
  const [mouseOverElement, setMouseOverElement] = useState(false);
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Function to navigate to registration page
  const handleNewUser = () => {
    navigate('/register');
  };

  // Function to navigate to login page
  const handleReturningUser = () => {
    navigate('/login');
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-auto">
      <motion.div 
        className="min-h-screen w-full flex items-center justify-center p-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="w-full max-w-[90vw] 2xl:max-w-[80vw] mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-blue-100 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12">
              <motion.div 
                className="flex flex-col justify-center space-y-8"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.h1 
                  className="text-6xl lg:text-8xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Welcome to <span className="block mt-2">InterviewIQ</span>
                </motion.h1>
                <motion.p 
                  className="text-2xl text-gray-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  Powered by <span className="font-semibold text-blue-600">GBI</span>
                </motion.p>
                
                <motion.div 
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-8"
                  variants={itemVariants}
                >
                  <motion.div
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
                      transition: { duration: 0.2 }
                    }}
                    className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-blue-100 shadow-lg cursor-pointer"
                    onClick={handleNewUser}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">New User</h3>
                        <p className="text-gray-600">Start your interview journey</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
                      transition: { duration: 0.2 }
                    }}
                    className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-blue-100 shadow-lg cursor-pointer"
                    onClick={handleReturningUser}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">Returning User</h3>
                        <p className="text-gray-600">Continue your interview process</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="flex flex-col items-center justify-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.img 
                  src="https://img.freepik.com/free-photo/young-businesswoman-posing-confidently_1262-5959.jpg"
                  alt="Interview"
                  className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                />
                <motion.p 
                  className="text-center text-gray-600 max-w-md text-lg mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  Experience the future of interviews with our AI-powered platform. Get ready for a seamless, professional interview experience.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default WelcomePage; 