import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const normalizeUser = (userData = {}) => {
    const fallbackEmail = userData.email || '';
    const fallbackName = fallbackEmail ? fallbackEmail.split('@')[0] : 'User';
    return {
      id: userData.id || userData._id || '1',
      name: userData.name || fallbackName,
      email: fallbackEmail,
      avatar:
        userData.avatar ||
        'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400',
      memberSince: userData.memberSince || userData.signupTime || userData.createdAt || new Date().toISOString(),
      createdAt: userData.createdAt || userData.signupTime || new Date().toISOString(),
    };
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(normalizeUser(parsedUser));
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  // ✅ Login — saves real user from backend
  const login = async (email, password, userData = null) => {
    setIsLoading(true);
    try {
      const resolvedUser = normalizeUser(userData || { email });
      setUser(resolvedUser);
      localStorage.setItem('user', JSON.stringify(resolvedUser));
      return true;
    } catch (error) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Signup — now accepts real user data from backend and auto logs in
  const signup = async (name, email, password, userData = null) => {
    setIsLoading(true);
    try {
      const resolvedUser = normalizeUser(userData || { name, email });
      setUser(resolvedUser);
      localStorage.setItem('user', JSON.stringify(resolvedUser));
      return true;
    } catch (error) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateProfile = (updates = {}) => {
    setUser((prevUser) => {
      if (!prevUser) return prevUser;
      const updatedUser = normalizeUser({ ...prevUser, ...updates });
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};