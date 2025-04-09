import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on initial load
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwt_decode(token);
        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          setUser(null);
          setIsAuthenticated(false);
        } else {
          setUser({
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
            role: decoded.role,
            profileImage: decoded.profileImage
          });
          setIsAuthenticated(true);
          
          // Set axios default header
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
      } catch (error) {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {
        email,
        password
      });
      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      
      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(user);
      setIsAuthenticated(true);
      setLoading(false);
      
      // Redirect based on user role
      if (user.role === 'admin') {
        router.push('/admin/dashboard');
      } else if (user.role === 'trainer') {
        router.push('/trainer/dashboard');
      } else {
        router.push('/dashboard');
      }
    } catch (error: any) {
      setLoading(false);
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const register = async (name: string, email: string, password: string, role: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/register`, {
        name,
        email,
        password,
        role
      });
      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      
      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(user);
      setIsAuthenticated(true);
      setLoading(false);
      
      // Redirect to onboarding based on role
      if (role === 'trainer') {
        router.push('/trainer/onboarding');
      } else {
        router.push('/dashboard');
      }
    } catch (error: any) {
      setLoading(false);
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAuthenticated(false);
    router.push('/');
  };

  const forgotPassword = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/forgot-password`, { email });
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error.response?.data?.message || 'Failed to send reset email. Please try again.');
    }
  };

  const resetPassword = async (token: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/reset-password`, { token, password });
      setLoading(false);
      router.push('/login');
    } catch (error: any) {
      setLoading(false);
      setError(error.response?.data?.message || 'Failed to reset password. Please try again.');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
