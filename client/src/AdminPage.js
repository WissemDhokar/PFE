import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AdminPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      console.log('Fetching applications...');
      const response = await fetch('http://localhost:3001/api/interviews');
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch applications');
      }
      
      const data = await response.json();
      console.log('Received data:', data);
      setApplications(data);
      setLoading(false);
    } catch (err) {
      console.error('Error details:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-blue-500 text-xl">Loading...</div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center flex-col p-4">
      <div className="text-red-500 text-xl mb-4">Error: {error}</div>
      <div className="text-gray-400 text-sm mb-4">
        Please make sure:
        <ul className="list-disc list-inside mt-2">
          <li>PostgreSQL is installed and running</li>
          <li>The database 'interview_system' exists</li>
          <li>The tables are created</li>
          <li>The backend server is running on port 3001</li>
        </ul>
      </div>
      <button
        onClick={fetchApplications}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-8 text-blue-500">Interview Applications</h1>
        
        {applications.length === 0 ? (
          <div className="text-gray-400 text-center py-8">
            No applications found. Submit an interview form to see data here.
          </div>
        ) : (
          <div className="grid gap-6">
            {applications.map((app) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gray-800 rounded-lg p-6 shadow-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-blue-400">
                      {app.name} {app.surname}
                    </h2>
                    <p className="text-gray-400">Email: {app.email}</p>
                    <p className="text-gray-400">Age: {app.age}</p>
                    <p className="text-gray-400">Gender: {app.gender}</p>
                  </div>
                  <div>
                    <p className="text-gray-300">
                      <span className="font-semibold">Preferred Role:</span> {app.preferred_role}
                    </p>
                    <p className="text-gray-300">
                      <span className="font-semibold">Skills:</span> {app.skills.join(', ')}
                    </p>
                    <p className="text-gray-300">
                      <span className="font-semibold">Experience:</span> {app.experience}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <p className="text-gray-300">
                    <span className="font-semibold">Availability:</span> {app.availability}
                  </p>
                  {app.additional_info && (
                    <p className="text-gray-300 mt-2">
                      <span className="font-semibold">Additional Info:</span> {app.additional_info}
                    </p>
                  )}
                  <p className="text-gray-400 text-sm mt-2">
                    Submitted: {new Date(app.created_at).toLocaleString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminPage; 