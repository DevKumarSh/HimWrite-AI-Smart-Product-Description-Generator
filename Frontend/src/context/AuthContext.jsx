import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, logoutUser, getProfile } from '../services/authApi';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Check for token in URL (from Google OAuth)
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    
    if (tokenFromUrl) {
      localStorage.setItem('token', tokenFromUrl);
      setToken(tokenFromUrl);
      // Clean up URL
      window.history.replaceState({}, document.title, '/dashboard');
    }

    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setLoading(false);
    } else if (storedToken || tokenFromUrl) {
      // If we only have a token (e.g. from Google login), fetch the profile
      fetchProfile();
    } else {
      setLoading(false);
    }

    const handleAuthError = () => {
      setUser(null);
      setToken(null);
      navigate('/login');
    };

    window.addEventListener('auth-error', handleAuthError);
    return () => window.removeEventListener('auth-error', handleAuthError);
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to fetch profile', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    const data = await loginUser(credentials);
    setUser(data);
    setToken(data.token);
    navigate('/dashboard');
  };

  const register = async (userData) => {
    const data = await registerUser(userData);
    setUser(data);
    setToken(data.token);
    navigate('/dashboard');
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    setToken(null);
    navigate('/login');
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
