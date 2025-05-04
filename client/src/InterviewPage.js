import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const InterviewPage = () => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hello! I am your AI interviewer today. How are you doing?' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [cameraError, setCameraError] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const chatContainerRef = useRef(null);
  const navigate = useNavigate();

  // Load user data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem('interviewData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData);
        
        // Add a personalized welcome message
        setMessages(prev => [
          ...prev,
          { 
            id: prev.length + 1, 
            sender: 'bot', 
            text: `Welcome, ${parsedData.name}! I'm your AI interviewer today. I'll be asking you some questions about your experience and skills.` 
          }
        ]);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    } else {
      // If no user data is found, add a generic welcome message
      setMessages(prev => [
        ...prev,
        { 
          id: prev.length + 1, 
          sender: 'bot', 
          text: `Welcome to the interview! I'm your AI interviewer today. I'll be asking you some questions about your experience and skills.` 
        }
      ]);
    }
  }, []);

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

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

  // Initialize video stream with better error handling
  useEffect(() => {
    let mounted = true;
    
    const setupVideo = async () => {
      try {
        // First check if getUserMedia is supported
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('Your browser does not support camera access. Please try a different browser.');
        }

        // Log available devices for debugging
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        console.log('Available video devices:', videoDevices);
        
        if (videoDevices.length === 0) {
          throw new Error('No video devices found. Please check if your camera is properly connected.');
        }
        
        // Try with basic constraints first - more compatible with different devices
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: "user"
          }, 
          audio: true 
        });
        
        if (mounted) {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            // Ensure video plays
            try {
              await videoRef.current.play();
              console.log('Video playback started successfully');
            } catch (playError) {
              console.error('Error playing video:', playError);
              // Try to recover by reloading the video
              videoRef.current.load();
              await videoRef.current.play();
            }
          }
          streamRef.current = stream;
          setCameraError(null);
        } else {
          // If component unmounted, stop the stream
          stream.getTracks().forEach(track => track.stop());
        }
      } catch (error) {
        console.error('Error accessing media devices:', error);
        if (mounted) {
          let errorMessage = error.message || 'Failed to access camera. Please check permissions.';
          
          // Provide more specific guidance based on error type
          if (error.name === 'NotFoundError' || error.message.includes('Requested device not found')) {
            errorMessage = 'No camera found. Please check if your camera is connected and enabled.';
          } else if (error.name === 'NotAllowedError' || error.message.includes('Permission denied')) {
            errorMessage = 'Camera access was denied. Please allow camera access in your browser settings.';
          } else if (error.name === 'NotReadableError' || error.message.includes('Could not start video source')) {
            errorMessage = 'Your camera is in use by another application. Please close other apps using the camera.';
          } else if (error.name === 'OverconstrainedError') {
            errorMessage = 'Camera constraints could not be satisfied. Trying with basic settings...';
            // Try again with basic settings
            try {
              const basicStream = await navigator.mediaDevices.getUserMedia({ 
                video: true, 
                audio: true 
              });
              if (mounted && videoRef.current) {
                videoRef.current.srcObject = basicStream;
                await videoRef.current.play();
                streamRef.current = basicStream;
                setCameraError(null);
                return;
              }
            } catch (basicError) {
              console.error('Error with basic settings:', basicError);
              errorMessage = 'Could not access camera with any settings. Please check permissions.';
            }
          }
          
          setCameraError(errorMessage);
          
          // Add error message to chat
          setMessages(prev => [
            ...prev,
            { 
              id: prev.length + 1, 
              sender: 'bot', 
              text: 'I noticed there might be an issue with your camera. You can continue with the interview without video if needed.' 
            }
          ]);
        }
      }
    };

    setupVideo();

    // Cleanup function
    return () => {
      mounted = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Timer effect
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Toggle video
  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOn(!isVideoOn);
      }
    }
  };

  // Toggle audio
  const toggleAudio = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioOn(!isAudioOn);
      }
    }
  };

  // Toggle recording
  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  // Format timer
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle sending message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const userMessage = {
        id: messages.length + 1,
        sender: 'user',
        text: newMessage
      };
      
      setMessages([...messages, userMessage]);
      setNewMessage('');
      
      // Show typing indicator
      setIsTyping(true);
      
      // Simulate bot response after a short delay
      setTimeout(() => {
        setIsTyping(false);
        const botResponse = {
          id: messages.length + 2,
          sender: 'bot',
          text: 'Thank you for your response. Could you tell me more about your experience with React?'
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1500);
    }
  };

  // Handle ending interview
  const handleEndInterview = () => {
    if (window.confirm('Are you sure you want to end the interview?')) {
      // Stop all tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      // Navigate back to welcome page
      navigate('/');
    }
  };

  // Toggle controls visibility
  const toggleControlsVisibility = () => {
    setShowControls(!showControls);
  };

  // Retry camera access with multiple attempts
  const retryCamera = async () => {
    setCameraError(null);
    
    // Try different camera configurations
    const configs = [
      { video: true, audio: true },
      { video: { facingMode: "user" }, audio: true },
      { video: { facingMode: "environment" }, audio: true },
      { video: { width: 640, height: 480 }, audio: true },
      { video: { width: 1280, height: 720 }, audio: true }
    ];
    
    for (const config of configs) {
      try {
        console.log('Trying camera config:', config);
        const stream = await navigator.mediaDevices.getUserMedia(config);
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          try {
            await videoRef.current.play();
            console.log('Video playback started successfully with config:', config);
          } catch (playError) {
            console.error('Error playing video:', playError);
            continue; // Try next config
          }
        }
        streamRef.current = stream;
        return; // Success, exit the function
      } catch (error) {
        console.error('Error with config:', config, error);
        // Continue to the next config
      }
    }
    
    // If we get here, all configs failed
    let errorMessage = 'Could not access camera with any configuration. Please check browser permissions.';
    setCameraError(errorMessage);
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Animated background */}
      <div className="fixed inset-0 w-full h-full overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.5) 0%, transparent 50%)",
              "radial-gradient(circle at 100% 100%, rgba(59, 130, 246, 0.5) 0%, transparent 50%)",
              "radial-gradient(circle at 100% 0%, rgba(59, 130, 246, 0.5) 0%, transparent 50%)",
              "radial-gradient(circle at 0% 100%, rgba(59, 130, 246, 0.5) 0%, transparent 50%)",
              "radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.5) 0%, transparent 50%)"
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Futuristic grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMXYxaC0xeiIgZmlsbD0iI2U2ZTVmZiIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: Math.random() * window.innerHeight,
                opacity: Math.random() * 0.5 + 0.2
              }}
              animate={{ 
                y: [null, Math.random() * -100],
                opacity: [null, 0]
              }}
              transition={{ 
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>
      
      <motion.div 
        className="h-screen w-full flex flex-col"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div 
          className="flex justify-between items-center p-4 bg-black/30 backdrop-blur-md border-b border-blue-500/30"
          variants={itemVariants}
        >
          <div className="flex items-center space-x-4">
            <motion.div 
              className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </motion.div>
            <h1 className="text-2xl font-bold text-white">AI Interview Session</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.div 
              className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-blue-500/30"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-blue-300 font-medium">Time: {formatTime(timer)}</span>
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEndInterview}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-200 flex items-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>End Interview</span>
            </motion.button>
          </div>
        </motion.div>
        
        <div className="flex flex-1 overflow-hidden">
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            {/* Video Section - Full Screen */}
            <motion.div 
              className="flex-1 relative overflow-hidden"
              variants={itemVariants}
            >
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col">
                {/* User Video - Now Larger */}
                <div className="flex-1 relative">
                  {cameraError ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/70 p-6 text-center">
                      <div className="text-red-400 text-4xl mb-4">⚠️</div>
                      <h3 className="text-white text-xl font-semibold mb-2">Camera Access Issue</h3>
                      <p className="text-gray-300 mb-4">{cameraError}</p>
                      
                      <div className="bg-gray-800/50 p-4 rounded-lg mb-4 text-left w-full max-w-md">
                        <h4 className="text-blue-300 font-medium mb-2">Troubleshooting steps:</h4>
                        <ul className="text-gray-300 text-sm space-y-2">
                          <li className="flex items-start">
                            <span className="text-blue-400 mr-2">1.</span>
                            Check if your camera is properly connected
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-400 mr-2">2.</span>
                            Make sure no other application is using your camera
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-400 mr-2">3.</span>
                            Check browser permissions (look for camera icon in address bar)
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-400 mr-2">4.</span>
                            Try refreshing the page or using a different browser
                          </li>
                        </ul>
                      </div>
                      
                      <div className="flex space-x-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={retryCamera}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center space-x-2"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          <span>Retry Camera</span>
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setCameraError(null)}
                          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center space-x-2"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Continue Without Camera</span>
                        </motion.button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <video 
                        ref={videoRef} 
                        autoPlay 
                        playsInline 
                        muted 
                        className="w-full h-full object-cover"
                      />
                      {!isVideoOn && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/70">
                          <div className="text-white text-center">
                            <div className="text-4xl mb-2">📷</div>
                            <p>Camera Off</p>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  
                  {/* Floating Controls - Centered */}
                  <AnimatePresence>
                    {showControls && !cameraError && (
                      <motion.div 
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center items-center space-x-4 bg-black/50 backdrop-blur-md p-2 rounded-full border border-blue-500/30"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={toggleVideo}
                          className={`p-3 rounded-full ${isVideoOn ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                        >
                          {isVideoOn ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          )}
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={toggleAudio}
                          className={`p-3 rounded-full ${isAudioOn ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                        >
                          {isAudioOn ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                            </svg>
                          )}
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={toggleRecording}
                          className={`p-3 rounded-full ${isRecording ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                        >
                          {isRecording ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                          )}
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Toggle Controls Button */}
                  {!cameraError && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={toggleControlsVisibility}
                      className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm p-2 rounded-full border border-blue-500/30 text-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
            
            {/* Chat Section with AI Interviewer */}
            <motion.div 
              className="w-full lg:w-96 flex flex-col bg-black/30 backdrop-blur-md border-l border-blue-500/30"
              variants={itemVariants}
            >
              <div className="flex items-center justify-between p-4 border-b border-blue-800/30">
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <span className="text-2xl">🤖</span>
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">AI Interviewer</h3>
                    <p className="text-sm text-blue-300/70">Online</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-blue-300/70 hover:text-white"
                  onClick={() => setShowControls(!showControls)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </motion.button>
              </div>
              
              <div 
                ref={chatContainerRef}
                className="flex-grow p-4 overflow-y-auto"
              >
                {messages.map(message => (
                  <motion.div 
                    key={message.id} 
                    className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div 
                      className={`inline-block p-3 rounded-lg ${
                        message.sender === 'user' 
                          ? 'bg-blue-500 text-white rounded-br-none' 
                          : 'bg-gray-800 text-white rounded-bl-none border border-blue-500/30'
                      }`}
                    >
                      {message.text}
                    </div>
                  </motion.div>
                ))}
                
                {/* Typing indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div 
                      className="mb-4 text-left"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="inline-block p-3 rounded-lg bg-gray-800 text-white rounded-bl-none border border-blue-500/30">
                        <div className="flex space-x-1">
                          <motion.div 
                            className="w-2 h-2 bg-blue-400 rounded-full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          />
                          <motion.div 
                            className="w-2 h-2 bg-blue-400 rounded-full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          />
                          <motion.div 
                            className="w-2 h-2 bg-blue-400 rounded-full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="p-4 border-t border-blue-500/30">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-grow px-4 py-2 rounded-lg bg-gray-800 border border-blue-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InterviewPage;


