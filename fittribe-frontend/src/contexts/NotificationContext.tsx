import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

interface Notification {
  id: string;
  userId: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchNotifications();
    }
  }, [isAuthenticated, user]);

  const fetchNotifications = async () => {
    if (!isAuthenticated) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications`);
      setNotifications(response.data);
      setUnreadCount(response.data.filter((notif: Notification) => !notif.read).length);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error.response?.data?.message || 'Failed to fetch notifications');
    }
  };

  const markAsRead = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications/${id}/read`);
      
      // Update local state
      setNotifications(prevNotifications => 
        prevNotifications.map(notif => 
          notif.id === id ? { ...notif, read: true } : notif
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error.response?.data?.message || 'Failed to mark notification as read');
    }
  };

  const markAllAsRead = async () => {
    try {
      setLoading(true);
      setError(null);
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications/read-all`);
      
      // Update local state
      setNotifications(prevNotifications => 
        prevNotifications.map(notif => ({ ...notif, read: true }))
      );
      setUnreadCount(0);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error.response?.data?.message || 'Failed to mark all notifications as read');
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications/${id}`);
      
      // Update local state
      const deletedNotification = notifications.find(notif => notif.id === id);
      setNotifications(prevNotifications => 
        prevNotifications.filter(notif => notif.id !== id)
      );
      
      // Update unread count if the deleted notification was unread
      if (deletedNotification && !deletedNotification.read) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
      
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error.response?.data?.message || 'Failed to delete notification');
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        error,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
        deleteNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
