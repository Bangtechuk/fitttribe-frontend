import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [payments, setPayments] = useState([]);
  
  // Mock user data - would be fetched from API
  const mockUserData = {
    id: 'user123',
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@example.com',
    profileImage: '/images/user-profile.jpg',
    credits: 45,
    memberSince: '2024-09-15'
  };
  
  // Mock bookings data - would be fetched from API
  const mockBookings = [
    {
      id: 'bk_123456',
      trainer: {
        id: '1',
        firstName: 'Sarah',
        lastName: 'Johnson',
        profileImage: '/images/trainer1.jpg'
      },
      date: '2025-04-15',
      startTime: '09:00',
      endTime: '10:00',
      sessionType: 'virtual',
      sessionFocus: 'Beginner Yoga',
      status: 'confirmed',
      paymentStatus: 'completed',
      price: 45,
      zoomMeetingUrl: 'https://zoom.us/j/123456789'
    },
    {
      id: 'bk_123457',
      trainer: {
        id: '2',
        firstName: 'Michael',
        lastName: 'Chen',
        profileImage: '/images/trainer2.jpg'
      },
      date: '2025-04-20',
      startTime: '14:00',
      endTime: '15:00',
      sessionType: 'in-person',
      sessionFocus: 'Strength Training',
      status: 'confirmed',
      paymentStatus: 'completed',
      price: 55
    },
    {
      id: 'bk_123458',
      trainer: {
        id: '3',
        firstName: 'Aisha',
        lastName: 'Williams',
        profileImage: '/images/trainer3.jpg'
      },
      date: '2025-03-25',
      startTime: '10:30',
      endTime: '11:30',
      sessionType: 'virtual',
      sessionFocus: 'Dance Fitness',
      status: 'completed',
      paymentStatus: 'completed',
      price: 40,
      hasReviewed: false
    }
  ];
  
  // Mock notifications data - would be fetched from API
  const mockNotifications = [
    {
      id: 'notif_1',
      type: 'booking_confirmed',
      title: 'Booking Confirmed',
      message: 'Your booking with Sarah Johnson on April 15 at 09:00 has been confirmed.',
      date: '2025-04-08T08:30:00',
      isRead: false
    },
    {
      id: 'notif_2',
      type: 'payment_received',
      title: 'Payment Received',
      message: 'Your payment of $45 for the session with Sarah Johnson has been received.',
      date: '2025-04-08T08:31:00',
      isRead: false
    },
    {
      id: 'notif_3',
      type: 'booking_reminder',
      title: 'Upcoming Session Reminder',
      message: 'Reminder: You have a session with Michael Chen tomorrow at 14:00.',
      date: '2025-04-19T10:00:00',
      isRead: true
    }
  ];
  
  // Mock payments data - would be fetched from API
  const mockPayments = [
    {
      id: 'pay_123456',
      bookingId: 'bk_123456',
      trainer: {
        firstName: 'Sarah',
        lastName: 'Johnson'
      },
      date: '2025-04-08T08:31:00',
      amount: 45,
      status: 'completed',
      paymentMethod: 'credit_card'
    },
    {
      id: 'pay_123457',
      bookingId: 'bk_123457',
      trainer: {
        firstName: 'Michael',
        lastName: 'Chen'
      },
      date: '2025-04-08T09:15:00',
      amount: 55,
      status: 'completed',
      paymentMethod: 'paypal'
    },
    {
      id: 'pay_123458',
      bookingId: 'bk_123458',
      trainer: {
        firstName: 'Aisha',
        lastName: 'Williams'
      },
      date: '2025-03-20T14:22:00',
      amount: 40,
      status: 'completed',
      paymentMethod: 'credit_card'
    }
  ];
  
  useEffect(() => {
    // This would be replaced with actual API calls
    setLoading(true);
    setTimeout(() => {
      setUserData(mockUserData);
      setBookings(mockBookings);
      setNotifications(mockNotifications);
      setPayments(mockPayments);
      setLoading(false);
    }, 800);
  }, []);
  
  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const formatDateTime = (dateTimeString) => {
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  };
  
  const getUpcomingBookings = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return bookings.filter(booking => {
      const bookingDate = new Date(booking.date);
      bookingDate.setHours(0, 0, 0, 0);
      return bookingDate >= today && booking.status !== 'cancelled';
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
  };
  
  const getPastBookings = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return bookings.filter(booking => {
      const bookingDate = new Date(booking.date);
      bookingDate.setHours(0, 0, 0, 0);
      return bookingDate < today || booking.status === 'completed';
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
  };
  
  const getUnreadNotificationsCount = () => {
    return notifications.filter(notif => !notif.isRead).length;
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="inline-block w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-2 text-gray-600">Loading dashboard...</p>
      </div>
    );
  }
  
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-soft overflow-hidden mb-6">
              <div className="bg-gradient-to-r from-primary-800 to-primary-600 p-6 text-center">
                <div className="relative h-24 w-24 rounded-full border-4 border-white overflow-hidden mx-auto mb-4">
                  <Image
                    src={userData.profileImage}
                    alt={`${userData.firstName} ${userData.lastName}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <h2 className="text-xl font-semibold text-white">
                  {userData.firstName} {userData.lastName}
                </h2>
                <p className="text-primary-100">{userData.email}</p>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Available Credits</span>
                  <span className="text-primary-800 font-bold text-xl">{userData.credits}</span>
                </div>
                
                <Link 
                  href="/credits"
                  className="block w-full bg-accent-500 hover:bg-accent-600 text-white text-center px-4 py-2 rounded-lg transition-colors"
                >
                  Buy More Credits
                </Link>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-gray-500 text-sm">
                    Member since {new Date(userData.memberSince).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-soft overflow-hidden">
              <div className="p-4">
                <h3 className="font-medium text-primary-800 mb-2">Quick Links</h3>
                <nav className="space-y-1">
                  <Link 
                    href="/profile/edit"
                    className="block px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-primary-700"
                  >
                    Edit Profile
                  </Link>
                  <Link 
                    href="/trainers"
                    className="block px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-primary-700"
                  >
                    Find Trainers
                  </Link>
                  <Link 
                    href="/credits/history"
                    className="block px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-primary-700"
                  >
                    Credit History
                  </Link>
                  <Link 
                    href="/settings"
                    className="block px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-primary-700"
                  >
                    Account Settings
                  </Link>
                  <Link 
                    href="/help"
                    className="block px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-primary-700"
                  >
                    Help & Support
                  </Link>
                </nav>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Notifications */}
            <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-primary-900">
                  Notifications
                  {getUnreadNotificationsCount() > 0 && (
                    <span className="ml-2 bg-accent-500 text-white text-xs px-2 py-1 rounded-full">
                      {getUnreadNotificationsCount()} new
                    </span>
                  )}
                </h2>
                <Link 
                  href="/notifications"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  View All
                </Link>
              </div>
              
              {notifications.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No notifications yet</p>
              ) : (
                <div className="space-y-4">
                  {notifications.slice(0, 3).map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 rounded-lg ${notification.isRead ? 'bg-gray-50' : 'bg-blue-50 border-l-4 border-blue-500'}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className={`font-medium ${notification.isRead ? 'text-gray-800' : 'text-primary-800'}`}>
                            {notification.title}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                        </div>
                        <span className="text-gray-500 text-xs">{formatDateTime(notification.date)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Bookings */}
            <div className="bg-white rounded-xl shadow-soft overflow-hidden mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  <button
                    className={`px-6 py-4 text-sm font-medium ${
                      activeTab === 'upcoming'
                        ? 'border-b-2 border-accent-500 text-accent-500'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('upcoming')}
                  >
                    Upcoming Sessions
                  </button>
                  <button
                    className={`px-6 py-4 text-sm font-medium ${
                      activeTab === 'past'
                        ? 'border-b-2 border-accent-500 text-accent-500'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('past')}
                  >
                    Past Sessions
                  </button>
                  <button
                    className={`px-6 py-4 text-sm font-medium ${
                      activeTab === 'payments'
                        ? 'border-b-2 border-accent-500 text-accent-500'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('payments')}
                  >
                    Payment History
                  </button>
                </nav>
              </div>
              
              <div className="p-6">
                {/* Upcoming Sessions Tab */}
                {activeTab === 'upcoming' && (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold text-primary-900">Upcoming Sessions</h2>
                      <Link 
                        href="/trainers"
                        className="bg-primary-600 hover:bg-primary-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
                      >
                        Book New Session
                      </Link>
                    </div>
                    
                    {getUpcomingBookings().length === 0 ? (
                      <div className="text-center py-8">
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-800 mb-2">No Upcoming Sessions</h3>
                        <p className="text-gray-500 mb-4">You don't have any upcoming fitness sessions scheduled.</p>
                        <Link 
                          href="/trainers"
                          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                          Find a Trainer
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {getUpcomingBookings().map((booking) => (
                          <div key={booking.id} className="border border-gray-200 rounded-lg overflow-hidden">
                            <div className="bg-gray-50 px-4 py-2 flex justify-between items-center">
                              <div className="flex items-center">
                                <span className="font-medium text-primary-800">{formatDate(booking.date)}</span>
                                <span className="mx-2 text-gray-400">•</span>
                                <span className="text-gray-600">{booking.startTime} - {booking.endTime}</span>
                              </div>
                              <span className={`text-sm px-2 py-1 rounded-full ${
                                booking.status === 'confirmed' 
                                  ? 'bg-green-100 text-green-800' 
                                  : booking.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                            </div>
                            
                            <div className="p-4">
                              <div className="flex items-start">
                                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                                  <Image
                                    src={booking.trainer.profileImage}
                                    alt={`${booking.trainer.firstName} ${booking.trainer.lastName}`}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <h3 className="font-medium text-gray-800">
                                    {booking.trainer.firstName} {booking.trainer.lastName}
                                  </h3>
                                  <div className="flex flex-wrap gap-2 mt-1">
                                    <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                                      {booking.sessionType === 'virtual' ? 'Virtual Session' : 'In-Person Session'}
                                    </span>
                                    <span className="bg-secondary-100 text-secondary-800 text-xs px-2 py-1 rounded-full">
                                      {booking.sessionFocus}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mt-4 flex flex-wrap gap-2">
                                <Link 
                                  href={`/bookings/${booking.id}`}
                                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                                >
                                  View Details
                                </Link>
                                
                                {booking.sessionType === 'virtual' && booking.status === 'confirmed' && booking.zoomMeetingUrl && (
                                  <a 
                                    href={booking.zoomMeetingUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                  >
                                    Join Zoom Meeting
                                  </a>
                                )}
                                
                                {booking.status === 'confirmed' && (
                                  <Link 
                                    href={`/bookings/${booking.id}/cancel`}
                                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                                  >
                                    Cancel Session
                                  </Link>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
                
                {/* Past Sessions Tab */}
                {activeTab === 'past' && (
                  <>
                    <h2 className="text-xl font-semibold text-primary-900 mb-4">Past Sessions</h2>
                    
                    {getPastBookings().length === 0 ? (
                      <div className="text-center py-8">
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-800 mb-2">No Past Sessions</h3>
                        <p className="text-gray-500">You haven't completed any fitness sessions yet.</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {getPastBookings().map((booking) => (
                          <div key={booking.id} className="border border-gray-200 rounded-lg overflow-hidden">
                            <div className="bg-gray-50 px-4 py-2 flex justify-between items-center">
                              <div className="flex items-center">
                                <span className="font-medium text-primary-800">{formatDate(booking.date)}</span>
                                <span className="mx-2 text-gray-400">•</span>
                                <span className="text-gray-600">{booking.startTime} - {booking.endTime}</span>
                              </div>
                              <span className={`text-sm px-2 py-1 rounded-full ${
                                booking.status === 'completed' 
                                  ? 'bg-green-100 text-green-800' 
                                  : booking.status === 'cancelled'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                            </div>
                            
                            <div className="p-4">
                              <div className="flex items-start">
                                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                                  <Image
                                    src={booking.trainer.profileImage}
                                    alt={`${booking.trainer.firstName} ${booking.trainer.lastName}`}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <h3 className="font-medium text-gray-800">
                                    {booking.trainer.firstName} {booking.trainer.lastName}
                                  </h3>
                                  <div className="flex flex-wrap gap-2 mt-1">
                                    <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                                      {booking.sessionType === 'virtual' ? 'Virtual Session' : 'In-Person Session'}
                                    </span>
                                    <span className="bg-secondary-100 text-secondary-800 text-xs px-2 py-1 rounded-full">
                                      {booking.sessionFocus}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mt-4 flex flex-wrap gap-2">
                                <Link 
                                  href={`/bookings/${booking.id}`}
                                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                                >
                                  View Details
                                </Link>
                                
                                {booking.status === 'completed' && !booking.hasReviewed && (
                                  <Link 
                                    href={`/trainers/${booking.trainer.id}/review?bookingId=${booking.id}`}
                                    className="text-accent-600 hover:text-accent-700 text-sm font-medium"
                                  >
                                    Leave a Review
                                  </Link>
                                )}
                                
                                <Link 
                                  href={`/trainers/${booking.trainer.id}`}
                                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                >
                                  Book Again
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
                
                {/* Payment History Tab */}
                {activeTab === 'payments' && (
                  <>
                    <h2 className="text-xl font-semibold text-primary-900 mb-4">Payment History</h2>
                    
                    {payments.length === 0 ? (
                      <div className="text-center py-8">
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-800 mb-2">No Payment History</h3>
                        <p className="text-gray-500">You haven't made any payments yet.</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Trainer
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Amount
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Method
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {payments.map((payment) => (
                              <tr key={payment.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {formatDateTime(payment.date)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">
                                    {payment.trainer.firstName} {payment.trainer.lastName}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-primary-800">
                                    ${payment.amount.toFixed(2)}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    payment.status === 'completed' 
                                      ? 'bg-green-100 text-green-800' 
                                      : payment.status === 'refunded'
                                      ? 'bg-red-100 text-red-800'
                                      : 'bg-gray-100 text-gray-800'
                                  }`}>
                                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                                  {payment.paymentMethod.replace('_', ' ')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                  <Link 
                                    href={`/payments/${payment.id}`}
                                    className="text-primary-600 hover:text-primary-700 font-medium"
                                  >
                                    View Receipt
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
