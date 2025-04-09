import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const PaymentSuccess = () => {
  const router = useRouter();
  const [paymentData, setPaymentData] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get payment data from session storage
    try {
      const storedPaymentData = sessionStorage.getItem('paymentData');
      const storedBookingData = sessionStorage.getItem('bookingData');
      
      if (storedPaymentData && storedBookingData) {
        setPaymentData(JSON.parse(storedPaymentData));
        setBookingData(JSON.parse(storedBookingData));
      } else {
        setError('Payment data not found. Please check your bookings for confirmation.');
      }
    } catch (err) {
      setError('Error retrieving payment data. Please check your bookings for confirmation.');
    }
    
    setLoading(false);
  }, []);

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="inline-block w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-2 text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-soft p-8 text-center">
            <svg className="w-16 h-16 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h1 className="text-2xl font-display font-bold text-primary-900 mb-4">Payment Information Unavailable</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="flex justify-center space-x-4">
              <Link 
                href="/dashboard"
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Go to Dashboard
              </Link>
              <Link 
                href="/trainers"
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg transition-colors"
              >
                Browse Trainers
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!paymentData || !bookingData) {
    return (
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-soft p-8 text-center">
            <svg className="w-16 h-16 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h1 className="text-2xl font-display font-bold text-primary-900 mb-4">No Payment Found</h1>
            <p className="text-gray-600 mb-6">We couldn't find your payment information. Please check your bookings for confirmation.</p>
            <div className="flex justify-center space-x-4">
              <Link 
                href="/dashboard"
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Go to Dashboard
              </Link>
              <Link 
                href="/trainers"
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg transition-colors"
              >
                Browse Trainers
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-soft overflow-hidden mb-8">
            <div className="bg-green-500 px-6 py-4 text-center">
              <svg className="w-16 h-16 text-white mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h1 className="text-2xl font-display font-bold text-white">Payment Successful!</h1>
            </div>
            
            <div className="p-6">
              <div className="text-center mb-8">
                <p className="text-gray-600 text-lg">
                  Your booking has been confirmed and payment has been processed successfully.
                </p>
                <p className="text-gray-600">
                  A confirmation email has been sent to your registered email address.
                </p>
              </div>
              
              <div className="border-t border-b border-gray-200 py-6 mb-6">
                <h2 className="font-medium text-primary-800 text-lg mb-4">Booking Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Booking ID</p>
                    <p className="font-medium">{bookingData.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Trainer</p>
                    <p className="font-medium">{bookingData.trainerName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Date</p>
                    <p className="font-medium">{formatDate(bookingData.date)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Time</p>
                    <p className="font-medium">{bookingData.startTime} - {bookingData.endTime}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Session Type</p>
                    <p className="font-medium capitalize">{bookingData.sessionType}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Focus</p>
                    <p className="font-medium">{bookingData.sessionFocus}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="font-medium text-primary-800 text-lg mb-4">Payment Summary</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Session Price</span>
                      <span className="text-gray-800">${bookingData.price.toFixed(2)}</span>
                    </div>
                    
                    {paymentData.couponApplied && (
                      <div className="flex justify-between text-green-600">
                        <span>Coupon Discount ({paymentData.couponApplied})</span>
                        <span>-${paymentData.couponDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    
                    {paymentData.creditsUsed > 0 && (
                      <div className="flex justify-between text-blue-600">
                        <span>Credits Applied</span>
                        <span>-${paymentData.creditsUsed.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="flex justify-between font-bold">
                        <span className="text-gray-800">Total Paid</span>
                        <span className="text-primary-900">${paymentData.amount.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Payment Method</span>
                        <span className="text-gray-800 capitalize">
                          {paymentData.paymentMethod.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Payment Status</span>
                        <span className="text-green-600 capitalize">{paymentData.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {bookingData.sessionType === 'virtual' && (
                <div className="bg-blue-50 p-4 rounded-lg mb-8">
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-full p-2 mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Virtual Session Information</p>
                      <p className="text-gray-600 text-sm mt-1">
                        Your Zoom meeting details will be sent to your email 24 hours before the session. You can also find the meeting link in your dashboard.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-center space-x-4">
                <Link 
                  href="/dashboard"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Go to Dashboard
                </Link>
                <Link 
                  href="/trainers"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg transition-colors"
                >
                  Browse More Trainers
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center text-gray-500 text-sm">
            <p>
              Need help? Contact our support team at{' '}
              <a href="mailto:support@fittribe.fitness" className="text-primary-600 hover:text-primary-700">
                support@fittribe.fitness
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
