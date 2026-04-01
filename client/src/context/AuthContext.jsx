import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user,      setUser]      = useState(null);
  const [isSignedIn, setSignedIn] = useState(false);
  const [isLoading,  setLoading]  = useState(true);

  const applyTokens = useCallback(async (accessToken, refreshToken) => {
    try {
      const decoded = jwtDecode(accessToken);
      if (decoded.exp * 1000 < Date.now()) throw new Error('expired');
      localStorage.setItem('accessToken',  accessToken);
      if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
      const { data } = await authAPI.me();
      setUser(data.user);
      setSignedIn(true);
    } catch {
      clearAuth();
    }
  }, []);

  const clearAuth = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    setSignedIn(false);
  };

  // Restore session on mount
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      applyTokens(token, localStorage.getItem('refreshToken'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [applyTokens]);

  const register = async (email, password, firstName, lastName) => {
    try {
      const { data } = await authAPI.register({ email, password, firstName, lastName });
      await applyTokens(data.token, data.refreshToken);
      return { success: true };
    } catch (e) {
      return { success: false, error: e.response?.data?.error || 'Registration failed' };
    }
  };

  const login = async (email, password) => {
    try {
      const { data } = await authAPI.login({ email, password });
      await applyTokens(data.token, data.refreshToken);
      return { success: true };
    } catch (e) {
      return { success: false, error: e.response?.data?.error || 'Login failed' };
    }
  };

  const logout = async () => {
    try { await authAPI.logout(); } catch {}
    clearAuth();
  };

  const value = {
    user,
    isSignedIn,
    isLoading,
    isLoaded: !isLoading,
    register,
    login,
    logout,
    signOut: logout,
    // Clerk-compatible helpers
    primaryEmailAddress: user ? { emailAddress: user.email } : null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};

// Clerk-compatible aliases
export const useUser  = useAuth;
export const useClerk = () => {
  const { logout } = useAuth();
  return { signOut: logout };
};