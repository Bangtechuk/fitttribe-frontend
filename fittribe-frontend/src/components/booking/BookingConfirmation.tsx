import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const BookingConfirmation = () => {
  const router = useRouter();
  const [bookingData, setBookingData] = useState(null);
  const [trainerData, setTrainerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock trainer data - would be fetched from API
  const mockTrainer = {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    profileImage: '/images/trainer1.jpg',
    specialties: ['Yoga', 'Pilates', 'Meditation'],
    hourlyRate: 45,
    averageRating: 4.8,
    totalReviews: 124
  };

  useEffect(() => {
    // Get booking data from session storage
    try {
      const storedBookingData = sessionStorage.getItem('bookingData');
      if (storedBookingData) {
        setBookingData(JSON.parse(storedBookingData));
      } else {
        setError('Booking data not found. Please start a new booking.');
      }
    } catch (err) {
      setError('Error retrieving booking data. Please start a new booking.');
    }

    // Fetch trainer data - would be replaced with API call
    setTrainerData(mockTrainer);
    setLoading(false);
  }, []);

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleProceedToPayment = () => {
    router.push('/checkout');
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
            <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-2xl font-display font-bold text-primary-900 mb-4">Error</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link 
              href="/trainers"
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Browse Trainers
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!bookingData) {
    return (
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-soft p-8 text-center">
            <svg className="w-16 h-16 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h1 className="text-2xl font-display font-bold text-primary-900 mb-4">No Booking Found</h1>
            <p className="text-gray-600 mb-6">We couldn't find your booking information. Please start a new booking.</p>
            <Link 
              href="/trainers"
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Browse Trainers
            </Link>
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
            <div className="bg-primary-600 px-6 py-4">
              <h1 className="text-2xl font-display font-bold text-white">Booking Confirmation</h1>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between pb-6 border-b border-gray-200">
                <div className="flex items-center">
                  {trainerData && (
                    <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
                      <Image
                        src={trainerData.profileImage}
                        alt={`${trainerData.firstName} ${trainerData.lastName}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h2 className="font-medium text-primary-800 text-lg">
                      {trainerData?.firstName} {trainerData?.lastName}
                    </h2>
                    <div className="flex items-center">
                      <span className="text-accent-500 font-bold">{trainerData?.averageRating}</span>
                      <svg className="w-4 h-4 text-accent-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-gray-500 text-xs ml-1">({trainerData?.totalReviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 text-sm">Session Price</p>
                  <p className="text-primary-800 font-bold text-xl">${bookingData.price.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="py-6 border-b border-gray-200">
                <h3 className="font-medium text-primary-800 mb-4">Session Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                
                {bookingData.notes && (
                  <div className="mt-4">
                    <p className="text-gray-500 text-sm">Notes</p>
                    <p className="text-gray-700">{bookingData.notes}</p>
                  </div>
                )}
              </div>
              
              <div className="py-6">
                <h3 className="font-medium text-primary-800 mb-4">What's Next?</h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="flex items-start">
                    <div className="bg-primary-100 rounded-full p-2 mr-4">
                      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Complete your booking by proceeding to payment</p>
                      <p className="text-gray-600 text-sm mt-1">
                        Your session will be confirmed once payment is processed. You can pay using credit card or FitTribe credits.
                      </p>
                    </div>
                  </div>
                </div>
                
                {bookingData.sessionType === 'virtual' && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start">
                      <div className="bg-blue-100 rounded-full p-2 mr-4">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Virtual Session Information</p>
                        <p className="text-gray-600 text-sm mt-1">
                          After payment, you'll receive a Zoom meeting link for your virtual session. Make sure you have Zoom installed before your session.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between items-center">
                <Link 
                  href={`/booking?trainerId=${bookingData.trainerId}`}
                  className="text-gray-600 hover:text-gray-800"
                >
                  &larr; Edit Booking
                </Link>
                <button
                  onClick={handleProceedToPayment}
                  className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Proceed to Payment
                </button>
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

export default BookingConfirmation;
