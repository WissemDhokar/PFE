// Auth utility functions
export const getAccessToken = () => {
  return localStorage.getItem('access_token');
};

export const getRefreshToken = () => {
  return localStorage.getItem('refresh_token');
};

export const getUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = () => {
  return !!getAccessToken();
};

export const isAdmin = () => {
  const user = getUser();
  return user?.is_staff || false;
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
};

export const refreshToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  try {
    const response = await fetch('http://localhost:8000/api/token/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh: refreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    localStorage.setItem('access_token', data.access);
    return data.access;
  } catch (error) {
    logout();
    throw error;
  }
};

// API request helper with token refresh
export const fetchWithAuth = async (url, options = {}) => {
  const accessToken = getAccessToken();
  
  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${accessToken}`,
  };

  try {
    const response = await fetch(url, { ...options, headers });
    
    // If token expired, try to refresh it
    if (response.status === 401) {
      const newToken = await refreshToken();
      headers['Authorization'] = `Bearer ${newToken}`;
      return fetch(url, { ...options, headers });
    }

    return response;
  } catch (error) {
    throw error;
  }
}; 