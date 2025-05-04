import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    try {
      // Register user
      const registerResponse = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          surname: formData.surname,
          email: formData.email,
          password: formData.password
        }),
      });

      if (!registerResponse.ok) {
        const errorData = await registerResponse.json();
        throw new Error(errorData.detail || 'Erreur lors de l\'inscription');
      }

      // Get JWT tokens
      const tokenResponse = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      if (!tokenResponse.ok) {
        throw new Error('Erreur lors de la connexion');
      }

      const tokens = await tokenResponse.json();
      
      // Store tokens
      localStorage.setItem('access_token', tokens.access);
      localStorage.setItem('refresh_token', tokens.refresh);

      // Navigate to interview form
      navigate('/interview-form');
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <motion.div
        className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 
          className="text-3xl font-bold text-blue-500 mb-6 text-center"
          variants={itemVariants}
        >
          Créer un compte
        </motion.h2>

        {error && (
          <motion.div
            className="bg-red-500 text-white p-3 rounded-lg mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div variants={itemVariants}>
            <label className="block text-gray-300 mb-2">Nom</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-gray-300 mb-2">Prénom</label>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-gray-300 mb-2">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-gray-300 mb-2">Confirmer le mot de passe</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
              required
            />
          </motion.div>

          <motion.button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
          >
            {loading ? 'Inscription en cours...' : 'S\'inscrire'}
          </motion.button>
        </form>

        <motion.p 
          className="mt-4 text-center text-gray-400"
          variants={itemVariants}
        >
          Déjà un compte ?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-blue-500 hover:text-blue-400"
          >
            Se connecter
          </button>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default RegistrationForm; 