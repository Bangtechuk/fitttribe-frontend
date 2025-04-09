import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const TrainerDashboard = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [loading, setLoading] = useState(true);
  const [trainerData, setTrainerData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [earnings, setEarnings] = useState([]);
  const [stats, setStats] = useState(null);
  
  // Mock trainer data - would be fetched from API
  const mockTrainerData = {
    id: 'trainer123',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@example.com',
    profileImage: '/images/trainer1.jpg',
    specialties: ['Yoga', 'Pilates', 'Meditation'],
    bio: 'Certified yoga instructor with 8 years of experience helping clients achieve balance, flexibility, and inner peace through personalized sessions.',
    hourlyRate: 45,
    averageRating: 4.8,
    totalReviews: 124,
    memberSince: '2023-06-15',
    availabilitySettings: {
      monday: [
        { startTime: '09:00', endTime: '10:00', isAvailable: true },
        { startTime: '10:30', endTime: '11:30', isAvailable: true },
        { startTime: '13:00', endTime: '14:00', isAvailable: true },
        { startTime: '15:30', endTime: '16:30', isAvailable: true }
      ],
      wednesday: [
        { startTime: '09:00', endTime: '10:00', isAvailable: true },
        { startTime: '10:30', endTime: '11:30', isAvailable: true },
        { startTime: '13:00', endTime: '14:00', isAvailable: true },
        { startTime: '15:30', endTime: '16:30', isAvailable: true }
      ],
      friday: [
        { startTime: '09:00', endTime: '10:00', isAvailable: true },
        { startTime: '10:30', endTime: '11:30', isAvailable: true },
        { startTime: '13:00', endTime: '14:00', isAvailable: true },
        { startTime: '15:30', endTime: '16:30', isAvailable: true }
      ]
    }
  };
  
  // Mock bookings data - would be fetched from API
  const mockBookings = [
    {
      id: 'bk_123456',
      client: {
        id: 'user123',
        firstName: 'Alex',
        lastName: 'Johnson',
        profileImage: '/images/user-profile.jpg'
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
      client: {
        id: 'user124',
        firstName: 'Emma',
        lastName: 'Smith',
        profileImage: '/images/user-profile2.jpg'
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
      client: {
        id: 'user125',
        firstName: 'Michael',
        lastName: 'Brown',
        profileImage: '/images/user-profile3.jpg'
      },
      date: '2025-03-25',
      startTime: '10:30',
      endTime: '11:30',
      sessionType: 'virtual',
      sessionFocus: 'Dance Fitness',
      status: 'completed',
      paymentStatus: 'completed',
      price: 40,
      hasReviewed: true
    }
  ];
  
  // Mock notifications data - would be fetched from API
  const mockNotifications = [
    {
      id: 'notif_1',
      type: 'booking_new',
      title: 'New Booking',
      message: 'Alex Johnson has booked a session with you on April 15 at 09:00.',
      date: '2025-04-08T08:30:00',
      isRead: false
    },
    {
      id: 'notif_2',
      type: 'payment_received',
      title: 'Payment Received',
      message: 'You received a payment of $45 for the session with Alex Johnson.',
      date: '2025-04-08T08:31:00',
      isRead: false
    },
    {
      id: 'notif_3',
      type: 'booking_reminder',
      title: 'Upcoming Session Reminder',
      message: 'Reminder: You have a session with Emma Smith tomorrow at 14:00.',
      date: '2025-04-19T10:00:00',
      isRead: true
    }
  ];
  
  // Mock earnings data - would be fetched from API
  const mockEarnings = [
    {
      id: 'earn_123456',
      bookingId: 'bk_123456',
      client: {
        firstName: 'Alex',
        lastName: 'Johnson'
      },
      date: '2025-04-08T08:31:00',
      amount: 40.5, // After platform fee
      platformFee: 4.5,
      status: 'completed'
    },
    {
      id: 'earn_123457',
      bookingId: 'bk_123457',
      client: {
        firstName: 'Emma',
        lastName: 'Smith'
      },
      date: '2025-04-08T09:15:00',
      amount: 49.5, // After platform fee
      platformFee: 5.5,
      status: 'completed'
    },
    {
      id: 'earn_123458',
      bookingId: 'bk_123458',
      client: {
        firstName: 'Michael',
        lastName: 'Brown'
      },
      date: '2025-03-20T14:22:00',
      amount: 36, // After platform fee
      platformFee: 4,
      status: 'completed'
    }
  ];
  
  // Mock stats data - would be fetched from API
  const mockStats = {
    totalEarnings: 126,
    totalSessions: 3,
    upcomingSessions: 2,
    completedSessions: 1,
    averageRating: 4.8,
    totalReviews: 124,
    bookingRate: 85, // percentage of available slots that get booked
    popularFocus: 'Beginner Yoga',
    monthlyEarnings: [
      { month: 'Jan', earnings: 0 },
      { month: 'Feb', earnings: 0 },
      { month: 'Mar', earnings: 36 },
      { month: 'Apr', earnings: 90 },
      { month: 'May', earnings: 0 },
      { month: 'Jun', earnings: 0 }
    ]
  };
  
  useEffect(() => {
    // This would be replaced with actual API calls
    setLoading(true);
    setTimeout(() => {
      setTrainerData(mockTrainerData);
      setBookings(mockBookings);
      setNotifications(mockNotifications);
      setEarnings(mockEarnings);
      setStats(mockStats);
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
                    src={trainerData.profileImage}
                    alt={`${trainerData.firstName} ${trainerData.lastName}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <h2 className="text-xl font-semibold text-white">
                  {trainerData.firstName} {trainerData.lastName}
                </h2>
                <p className="text-primary-100">{trainerData.email}</p>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Hourly Rate</span>
                  <span className="text-primary-800 font-bold text-xl">${trainerData.hourlyRate}</span>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Rating</span>
                  <div className="flex items-center">
                    <span className="text-accent-500 font-bold">{trainerData.averageRating}</span>
                    <svg className="w-4 h-4 text-accent-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-gray-500 text-xs ml-1">({trainerData.totalReviews})</span>
                  </div>
                </div>
                
                <Link 
                  href="/trainer-profile/edit"
                  className="block w-full bg-primary-600 hover:bg-primary-700 text-white text-center px-4 py-2 rounded-lg transition-colors mb-3"
                >
                  Edit Profile
                </Link>
                
                <Link 
                  href="/trainer-availability"
                  className="block w-full bg-accent-500 hover:bg-accent-600 text-white text-center px-4 py-2 rounded-lg transition-colors"
                >
                  Manage Availability
                </Link>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-gray-500 text-sm">
                    Trainer since {new Date(trainerData.memberSince).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-soft overflow-hidden">
              <div className="p-4">
                <h3 className="font-medium text-primary-800 mb-2">Quick Links</h3>
                <nav className="space-y-1">
                  <Link 
                    href="/trainer-profile/view"
                    className="block px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-primary-700"
                  >
                    View Public Profile
                  </Link>
                  <Link 
                    href="/trainer-earnings"
                    className="block px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-primary-700"
                  >
                    Earnings & Payouts
                  </Link>
                  <Link 
                    href="/trainer-reviews"
                    className="block px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-primary-700"
                  >
                    Reviews & Ratings
                  </Link>
                  <Link 
                    href="/trainer-settings"
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
            {/* Stats Overview */}
            <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
              <h2 className="text-xl font-semibold text-primary-900 mb-4">Dashboard Overview</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-primary-50 p-4 rounded-lg">
                  <p className="text-primary-600 text-sm font-medium">Total Earnings</p>
                  <p className="text-primary-900 text-2xl font-bold">${stats.totalEarnings}</p>
                </div>
                <div className="bg-secondary-50 p-4 rounded-lg">
                  <p className="text-secondary-600 text-sm font-medium">Upcoming Sessions</p>
                  <p className="text-secondary-900 text-2xl font-bold">{stats.upcomingSessions}</p>
                </div>
                <div className="bg-accent-50 p-4 rounded-lg">
                  <p className="text-accent-600 text-sm font-medium">Booking Rate</p>
                  <p className="text-accent-900 text-2xl font-bold">{stats.bookingRate}%</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm font-medium">Average Rating</p>
                  <div className="flex items-center">
                    <p className="text-gray-900 text-2xl font-bold">{stats.averageRating}</p>
                    <svg className="w-5 h-5 text-accent-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
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
                  href="/trainer-notifications"
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
                      activeTab === 'earnings'
                        ? 'border-b-2 border-accent-500 text-accent-500'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('earnings')}
                  >
                    Earnings
                  </button>
                </nav>
              </div>
              
              <div className="p-6">
                {/* Upcoming Sessions Tab */}
                {activeTab === 'upcoming' && (
                  <>
                    <h2 className="text-xl font-semibold text-primary-900 mb-4">Upcoming Sessions</h2>
                    
                    {getUpcomingBookings().length === 0 ? (
                      <div className="text-center py-8">
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-800 mb-2">No Upcoming Sessions</h3>
                        <p className="text-gray-500 mb-4">You don't have any upcoming sessions scheduled.</p>
                        <Link 
                          href="/trainer-availability"
                          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                          Manage Availability
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
                                    src={booking.client.profileImage}
                                    alt={`${booking.client.firstName} ${booking.client.lastName}`}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <h3 className="font-medium text-gray-800">
                                    {booking.client.firstName} {booking.client.lastName}
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
                                <div className="ml-auto text-right">
                                  <p className="text-gray-500 text-sm">Earnings</p>
                                  <p className="text-primary-800 font-bold">${(booking.price * 0.9).toFixed(2)}</p>
                                </div>
                              </div>
                              
                              <div className="mt-4 flex flex-wrap gap-2">
                                <Link 
                                  href={`/trainer-bookings/${booking.id}`}
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
                                    href={`/trainer-bookings/${booking.id}/cancel`}
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
                        <p className="text-gray-500">You haven't completed any sessions yet.</p>
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
                                    src={booking.client.profileImage}
                                    alt={`${booking.client.firstName} ${booking.client.lastName}`}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <h3 className="font-medium text-gray-800">
                                    {booking.client.firstName} {booking.client.lastName}
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
                                <div className="ml-auto text-right">
                                  <p className="text-gray-500 text-sm">Earnings</p>
                                  <p className="text-primary-800 font-bold">${(booking.price * 0.9).toFixed(2)}</p>
                                </div>
                              </div>
                              
                              <div className="mt-4 flex flex-wrap gap-2">
                                <Link 
                                  href={`/trainer-bookings/${booking.id}`}
                                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                                >
                                  View Details
                                </Link>
                                
                                {booking.status === 'completed' && booking.hasReviewed && (
                                  <Link 
                                    href={`/trainer-reviews?clientId=${booking.client.id}`}
                                    className="text-accent-600 hover:text-accent-700 text-sm font-medium"
                                  >
                                    View Review
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
                
                {/* Earnings Tab */}
                {activeTab === 'earnings' && (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold text-primary-900">Earnings</h2>
                      <Link 
                        href="/trainer-earnings"
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        View Detailed Report
                      </Link>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-gray-500 text-sm">Total Earnings</p>
                          <p className="text-primary-800 font-bold text-2xl">${stats.totalEarnings.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Total Sessions</p>
                          <p className="text-primary-800 font-bold text-2xl">{stats.totalSessions}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Average Per Session</p>
                          <p className="text-primary-800 font-bold text-2xl">
                            ${(stats.totalEarnings / stats.totalSessions).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {earnings.length === 0 ? (
                      <div className="text-center py-8">
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-800 mb-2">No Earnings Yet</h3>
                        <p className="text-gray-500">You haven't received any payments yet.</p>
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
                                Client
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Amount
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Platform Fee
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {earnings.map((earning) => (
                              <tr key={earning.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {formatDateTime(earning.date)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">
                                    {earning.client.firstName} {earning.client.lastName}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-primary-800">
                                    ${earning.amount.toFixed(2)}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  ${earning.platformFee.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    earning.status === 'completed' 
                                      ? 'bg-green-100 text-green-800' 
                                      : earning.status === 'pending'
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : 'bg-gray-100 text-gray-800'
                                  }`}>
                                    {earning.status.charAt(0).toUpperCase() + earning.status.slice(1)}
                                  </span>
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

export default TrainerDashboard;
