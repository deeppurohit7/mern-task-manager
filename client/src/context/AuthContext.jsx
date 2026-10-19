import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
const AUTH_KEY = 'orbit_user_v1';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(AUTH_KEY);
      return stored ? JSON.parse(stored) : {
        name: 'Deep Purohit',
        email: 'deep@orbit.dev',
        token: 'mock-jwt-token-active'
      };
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    setAuthError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
        return true;
      } else {
        const err = await res.json();
        setAuthError(err.message || 'Invalid credentials');
        return false;
      }
    } catch (e) {
      // Local fallback for standalone testing if backend server is offline
      const mockUser = {
        name: email.split('@')[0] || 'Deep Purohit',
        email,
        token: 'mock-jwt-token-active'
      };
      setUser(mockUser);
      return true;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    setAuthError(null);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
        return true;
      } else {
        const err = await res.json();
        setAuthError(err.message || 'Registration failed');
        return false;
      }
    } catch (e) {
      // Local fallback
      const mockUser = { name, email, token: 'mock-jwt-token-active' };
      setUser(mockUser);
      return true;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, authError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
