import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const InterviewForm = ({ onBack, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    age: '',
    email: '',
    gender: '', // Added gender field
    experience: '',
    skills: '',
    preferredRole: '',
    availability: '',
    additionalInfo: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Store form data in localStorage for later use
    localStorage.setItem('interviewData', JSON.stringify(formData));
    
    // Show success message
    alert("Interview form submitted successfully!");
    
    // Navigate to the interview page
    navigate('/interview-session');
  };

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

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-auto bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      <div className="fixed inset-0 w-full h-full">
        <motion.div 
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 100% 100%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 100% 0%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 0% 100%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)"
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMXYxaC0xeiIgZmlsbD0iI2U2ZTVmZiIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
      </div>
      
      <motion.div 
        className="min-h-screen w-full flex items-center justify-center p-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          className="w-full max-w-2xl mx-auto"
          variants={itemVariants}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-blue-100 overflow-hidden">
            <div className="px-8 py-6">
              <div className="flex justify-between items-center mb-8">
                <motion.div 
                  className="text-center"
                  variants={itemVariants}
                >
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Interview Form</h2>
                  <p className="mt-2 text-lg text-gray-600">Please fill out the form below</p>
                </motion.div>
                
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(59, 130, 246, 0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onBack}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-6 rounded-xl font-medium transition duration-200 shadow-lg flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Back
                </motion.button>
              </div>

              <motion.form 
                onSubmit={handleSubmit} 
                className="space-y-6"
                variants={itemVariants}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      required
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      name="surname"
                      value={formData.surname}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      required
                    />
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      min="18"
                      max="100"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      required
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      required
                    />
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      required
                    >
                      <option value="" disabled>Select your gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </motion.div>
                </div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    placeholder="e.g., JavaScript, React, Node.js"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Role</label>
                    <select
                      name="preferredRole"
                      value={formData.preferredRole}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    >
                      <option value="">Select a role</option>
                      <option value="frontend">Frontend Developer</option>
                      <option value="backend">Backend Developer</option>
                      <option value="fullstack">Full Stack Developer</option>
                      <option value="devops">DevOps Engineer</option>
                      <option value="ui">UI/UX Designer</option>
                    </select>
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                    <select
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    >
                      <option value="">Select availability</option>
                      <option value="immediate">Immediate</option>
                      <option value="2weeks">2 Weeks</option>
                      <option value="1month">1 Month</option>
                      <option value="negotiable">Negotiable</option>
                    </select>
                  </motion.div>
                </div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    placeholder="Any additional information you'd like to share..."
                  ></textarea>
                </motion.div>

                <motion.div 
                  className="pt-4"
                  variants={itemVariants}
                >
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(59, 130, 246, 0.2)" }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 rounded-xl text-lg font-medium transition duration-200 shadow-lg"
                  >
                    Submit Application
                  </motion.button>
                </motion.div>
              </motion.form>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default InterviewForm;