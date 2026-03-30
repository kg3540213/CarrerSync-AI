import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        // Check if token is expired
        if (decoded.exp * 1000 > Date.now()) {
          setToken(storedToken);
          setIsSignedIn(true);
          // Fetch full user data
          fetchUserData(storedToken);
        } else {
          // Token expired, clear it
          localStorage.removeItem('authToken');
          setIsSignedIn(false);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('authToken');
        setIsSignedIn(false);
      }
    }
    setIsLoading(false);
  }, []);

  const fetchUserData = async (authToken) => {
    try {
      const response = await fetch('https://carrer-ai-mken.onrender.com/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const register = async (email, password, firstName, lastName) => {
    try {
      const response = await fetch('https://carrer-ai-mken.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, firstName, lastName })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        setToken(data.token);
        setUser(data.user);
        setIsSignedIn(true);
        return { success: true, data };
      } else {
        return { success: false, error: data.error || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Registration failed' };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('https://carrer-ai-mken.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        setToken(data.token);
        setUser(data.user);
        setIsSignedIn(true);
        return { success: true, data };
      } else {
        return { success: false, error: data.error || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
    setIsSignedIn(false);
  };

  const signOut = logout;

  const value = {
    user,
    isSignedIn,
    isLoading,
    token,
    register,
    login,
    logout,
    signOut,
    isLoaded: !isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useUser = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useUser must be used within an AuthProvider');
  }
  return {
    user: context.user,
    isSignedIn: context.isSignedIn,
    isLoaded: context.isLoaded,
    primaryEmailAddress: context.user ? { emailAddress: context.user.email } : null
  };
};

export const useClerk = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useClerk must be used within an AuthProvider');
  }
  return {
    signOut: context.logout,
    openSignIn: () => {
      // This will be handled by routing to login page
      window.location.href = '/login';
    }
  };
};

export const useSignIn = () => {
  return {
    signIn: async (credentials) => {
      // This is a placeholder for compatibility
      return { success: false };
    }
  };
};
