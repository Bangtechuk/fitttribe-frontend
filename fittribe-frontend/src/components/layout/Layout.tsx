import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { NotificationProvider } from '../contexts/NotificationContext';
import { BookingProvider } from '../contexts/BookingContext';
import Header from './layout/Header';
import Footer from './layout/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <BookingProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </BookingProvider>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default Layout;
