import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

interface Booking {
  id: string;
  trainerId: string;
  clientId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  sessionType: string;
  price: number;
  location: string;
  notes: string;
}

interface BookingContextType {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  fetchUserBookings: () => Promise<void>;
  fetchTrainerBookings: () => Promise<void>;
  createBooking: (bookingData: Partial<Booking>) => Promise<Booking | null>;
  updateBooking: (id: string, bookingData: Partial<Booking>) => Promise<Booking | null>;
  cancelBooking: (id: string) => Promise<boolean>;
  getBookingById: (id: string) => Booking | undefined;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'trainer') {
        fetchTrainerBookings();
      } else {
        fetchUserBookings();
      }
    }
  }, [isAuthenticated, user]);

  const fetchUserBookings = async () => {
    if (!isAuthenticated) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/user`);
      setBookings(response.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error.response?.data?.message || 'Failed to fetch bookings');
    }
  };

  const fetchTrainerBookings = async () => {
    if (!isAuthenticated || user?.role !== 'trainer') return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/trainer`);
      setBookings(response.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error.response?.data?.message || 'Failed to fetch bookings');
    }
  };

  const createBooking = async (bookingData: Partial<Booking>): Promise<Booking | null> => {
    if (!isAuthenticated) return null;
    
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings`, bookingData);
      
      // Add the new booking to the state
      setBookings(prevBookings => [...prevBookings, response.data]);
      
      setLoading(false);
      return response.data;
    } catch (error: any) {
      setLoading(false);
      setError(error.response?.data?.message || 'Failed to create booking');
      return null;
    }
  };

  const updateBooking = async (id: string, bookingData: Partial<Booking>): Promise<Booking | null> => {
    if (!isAuthenticated) return null;
    
    try {
      setLoading(true);
      setError(null);
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${id}`, bookingData);
      
      // Update the booking in the state
      setBookings(prevBookings => 
        prevBookings.map(booking => 
          booking.id === id ? { ...booking, ...response.data } : booking
        )
      );
      
      setLoading(false);
      return response.data;
    } catch (error: any) {
      setLoading(false);
      setError(error.response?.data?.message || 'Failed to update booking');
      return null;
    }
  };

  const cancelBooking = async (id: string): Promise<boolean> => {
    if (!isAuthenticated) return false;
    
    try {
      setLoading(true);
      setError(null);
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${id}/cancel`);
      
      // Update the booking status in the state
      setBookings(prevBookings => 
        prevBookings.map(booking => 
          booking.id === id ? { ...booking, status: 'cancelled' } : booking
        )
      );
      
      setLoading(false);
      return true;
    } catch (error: any) {
      setLoading(false);
      setError(error.response?.data?.message || 'Failed to cancel booking');
      return false;
    }
  };

  const getBookingById = (id: string): Booking | undefined => {
    return bookings.find(booking => booking.id === id);
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        loading,
        error,
        fetchUserBookings,
        fetchTrainerBookings,
        createBooking,
        updateBooking,
        cancelBooking,
        getBookingById
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
};
