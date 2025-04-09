import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  
  // Mock stats data - would be fetched from API
  const mockStats = {
    totalUsers: 1245,
    totalTrainers: 87,
    totalBookings: 3567,
    totalRevenue: 156890,
    platformFees: 15689,
    activeUsers: 876,
    newUsersThisMonth: 124,
    newTrainersThisMonth: 12,
    bookingsThisMonth: 432,
    revenueThisMonth: 19450,
    userGrowth: 8.2, // percentage
    trainerGrowth: 5.7, // percentage
    bookingGrowth: 12.3, // percentage
    revenueGrowth: 14.5, // percentage
    popularCategories: [
      { name: 'Yoga', count: 876 },
      { name: 'Strength Training', count: 654 },
      { name: 'Cardio', count: 543 },
      { name: 'Pilates', count: 432 },
      { name: 'Meditation', count: 321 }
    ],
    monthlyRevenue: [
      { month: 'Jan', revenue: 12500 },
      { month: 'Feb', revenue: 13200 },
      { month: 'Mar', revenue: 14800 },
      { month: 'Apr', revenue: 16900 },
      { month: 'May', revenue: 17000 },
      { month: 'Jun', revenue: 19450 }
    ]
  };
  
  // Mock users data - would be fetched from API
  const mockUsers = [
    {
      id: 'user123',
      firstName: 'Alex',
      lastName: 'Johnson',
      email: 'alex.johnson@example.com',
      role: 'client',
      status: 'active',
      joinDate: '2024-09-15',
      totalBookings: 12,
      totalSpent: 540
    },
    {
      id: 'user124',
      firstName: 'Emma',
      lastName: 'Smith',
      email: 'emma.smith@example.com',
      role: 'client',
      status: 'active',
      joinDate: '2024-10-22',
      totalBookings: 8,
      totalSpent: 360
    },
    {
      id: 'user125',
      firstName: 'Michael',
      lastName: 'Brown',
      email: 'michael.brown@example.com',
      role: 'client',
      status: 'inactive',
      joinDate: '2024-08-05',
      totalBookings: 3,
      totalSpent: 135
    }
  ];
  
  // Mock trainers data - would be fetched from API
  const mockTrainers = [
    {
      id: 'trainer123',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@example.com',
      specialties: ['Yoga', 'Pilates', 'Meditation'],
      status: 'active',
      joinDate: '2023-06-15',
      totalBookings: 87,
      totalEarnings: 3915,
      rating: 4.8
    },
    {
      id: 'trainer124',
      firstName: 'David',
      lastName: 'Williams',
      email: 'david.williams@example.com',
      specialties: ['Strength Training', 'HIIT', 'Nutrition'],
      status: 'active',
      joinDate: '2023-08-22',
      totalBookings: 65,
      totalEarnings: 3575,
      rating: 4.6
    },
    {
      id: 'trainer125',
      firstName: 'Jessica',
      lastName: 'Martinez',
      email: 'jessica.martinez@example.com',
      specialties: ['Dance Fitness', 'Zumba', 'Aerobics'],
      status: 'pending',
      joinDate: '2025-03-10',
      totalBookings: 0,
      totalEarnings: 0,
      rating: 0
    }
  ];
  
  // Mock bookings data - would be fetched from API
  const mockBookings = [
    {
      id: 'bk_123456',
      client: {
        id: 'user123',
        firstName: 'Alex',
        lastName: 'Johnson'
      },
      trainer: {
        id: 'trainer123',
        firstName: 'Sarah',
        lastName: 'Johnson'
      },
      date: '2025-04-15',
      startTime: '09:00',
      endTime: '10:00',
      sessionType: 'virtual',
      sessionFocus: 'Beginner Yoga',
      status: 'confirmed',
      paymentStatus: 'completed',
      price: 45,
      platformFee: 4.5
    },
    {
      id: 'bk_123457',
      client: {
        id: 'user124',
        firstName: 'Emma',
        lastName: 'Smith'
      },
      trainer: {
        id: 'trainer124',
        firstName: 'David',
        lastName: 'Williams'
      },
      date: '2025-04-20',
      startTime: '14:00',
      endTime: '15:00',
      sessionType: 'in-person',
      sessionFocus: 'Strength Training',
      status: 'confirmed',
      paymentStatus: 'completed',
      price: 55,
      platformFee: 5.5
    },
    {
      id: 'bk_123458',
      client: {
        id: 'user125',
        firstName: 'Michael',
        lastName: 'Brown'
      },
      trainer: {
        id: 'trainer123',
        firstName: 'Sarah',
        lastName: 'Johnson'
      },
      date: '2025-03-25',
      startTime: '10:30',
      endTime: '11:30',
      sessionType: 'virtual',
      sessionFocus: 'Dance Fitness',
      status: 'completed',
      paymentStatus: 'completed',
      price: 40,
      platformFee: 4
    }
  ];
  
  // Mock payments data - would be fetched from API
  const mockPayments = [
    {
      id: 'pay_123456',
      bookingId: 'bk_123456',
      client: {
        id: 'user123',
        firstName: 'Alex',
        lastName: 'Johnson'
      },
      trainer: {
        id: 'trainer123',
        firstName: 'Sarah',
        lastName: 'Johnson'
      },
      date: '2025-04-08T08:31:00',
      amount: 45,
      platformFee: 4.5,
      trainerEarnings: 40.5,
      status: 'completed',
      paymentMethod: 'credit_card'
    },
    {
      id: 'pay_123457',
      bookingId: 'bk_123457',
      client: {
        id: 'user124',
        firstName: 'Emma',
        lastName: 'Smith'
      },
      trainer: {
        id: 'trainer124',
        firstName: 'David',
        lastName: 'Williams'
      },
      date: '2025-04-08T09:15:00',
      amount: 55,
      platformFee: 5.5,
      trainerEarnings: 49.5,
      status: 'completed',
      paymentMethod: 'paypal'
    },
    {
      id: 'pay_123458',
      bookingId: 'bk_123458',
      client: {
        id: 'user125',
        firstName: 'Michael',
        lastName: 'Brown'
      },
      trainer: {
        id: 'trainer123',
        firstName: 'Sarah',
        lastName: 'Johnson'
      },
      date: '2025-03-20T14:22:00',
      amount: 40,
      platformFee: 4,
      trainerEarnings: 36,
      status: 'completed',
      paymentMethod: 'credit_card'
    }
  ];
  
  useEffect(() => {
    // This would be replaced with actual API calls
    setLoading(true);
    setTimeout(() => {
      setStats(mockStats);
      setUsers(mockUsers);
      setTrainers(mockTrainers);
      setBookings(mockBookings);
      setPayments(mockPayments);
      setLoading(false);
    }, 800);
  }, []);
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const formatDateTime = (dateTimeString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  };
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="inline-block w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-2 text-gray-600">Loading admin dashboard...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-primary-900 min-h-screen fixed">
          <div className="p-6">
            <h1 className="text-white text-2xl font-bold">FitTribe Admin</h1>
          </div>
          <nav className="mt-6">
            <button
              className={`w-full flex items-center px-6 py-3 text-left ${
                activeTab === 'overview'
                  ? 'bg-primary-800 text-white'
                  : 'text-primary-100 hover:bg-primary-800 hover:text-white'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Dashboard Overview
            </button>
            <button
              className={`w-full flex items-center px-6 py-3 text-left ${
                activeTab === 'users'
                  ? 'bg-primary-800 text-white'
                  : 'text-primary-100 hover:bg-primary-800 hover:text-white'
              }`}
              onClick={() => setActiveTab('users')}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Users Management
            </button>
            <button
              className={`w-full flex items-center px-6 py-3 text-left ${
                activeTab === 'trainers'
                  ? 'bg-primary-800 text-white'
                  : 'text-primary-100 hover:bg-primary-800 hover:text-white'
              }`}
              onClick={() => setActiveTab('trainers')}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Trainers Management
            </button>
            <button
              className={`w-full flex items-center px-6 py-3 text-left ${
                activeTab === 'bookings'
                  ? 'bg-primary-800 text-white'
                  : 'text-primary-100 hover:bg-primary-800 hover:text-white'
              }`}
              onClick={() => setActiveTab('bookings')}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Bookings Management
            </button>
            <button
              className={`w-full flex items-center px-6 py-3 text-left ${
                activeTab === 'payments'
                  ? 'bg-primary-800 text-white'
                  : 'text-primary-100 hover:bg-primary-800 hover:text-white'
              }`}
              onClick={() => setActiveTab('payments')}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Payments & Revenue
            </button>
            <button
              className={`w-full flex items-center px-6 py-3 text-left ${
                activeTab === 'settings'
                  ? 'bg-primary-800 text-white'
                  : 'text-primary-100 hover:bg-primary-800 hover:text-white'
              }`}
              onClick={() => setActiveTab('settings')}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Platform Settings
            </button>
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="ml-64 flex-1 p-8">
          {/* Dashboard Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Total Users</p>
                      <p className="text-2xl font-bold text-gray-800">{stats.totalUsers}</p>
                    </div>
                    <div className="bg-primary-100 p-3 rounded-full">
                      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <span className={`text-sm ${stats.userGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {stats.userGrowth >= 0 ? '+' : ''}{stats.userGrowth}%
                    </span>
                    <span className="text-gray-500 text-sm ml-2">from last month</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Total Trainers</p>
                      <p className="text-2xl font-bold text-gray-800">{stats.totalTrainers}</p>
                    </div>
                    <div className="bg-secondary-100 p-3 rounded-full">
                      <svg className="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <span className={`text-sm ${stats.trainerGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {stats.trainerGrowth >= 0 ? '+' : ''}{stats.trainerGrowth}%
                    </span>
                    <span className="text-gray-500 text-sm ml-2">from last month</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Total Bookings</p>
                      <p className="text-2xl font-bold text-gray-800">{stats.totalBookings}</p>
                    </div>
                    <div className="bg-accent-100 p-3 rounded-full">
                      <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <span className={`text-sm ${stats.bookingGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {stats.bookingGrowth >= 0 ? '+' : ''}{stats.bookingGrowth}%
                    </span>
                    <span className="text-gray-500 text-sm ml-2">from last month</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Total Revenue</p>
                      <p className="text-2xl font-bold text-gray-800">{formatCurrency(stats.totalRevenue)}</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <span className={`text-sm ${stats.revenueGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {stats.revenueGrowth >= 0 ? '+' : ''}{stats.revenueGrowth}%
                    </span>
                    <span className="text-gray-500 text-sm ml-2">from last month</span>
                  </div>
                </div>
              </div>
              
              {/* Charts and Tables */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Revenue</h2>
                  <div className="h-64 flex items-end space-x-2">
                    {stats.monthlyRevenue.map((item, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-primary-500 rounded-t"
                          style={{ 
                            height: `${(item.revenue / Math.max(...stats.monthlyRevenue.map(i => i.revenue))) * 200}px` 
                          }}
                        ></div>
                        <div className="text-xs text-gray-500 mt-2">{item.month}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Popular Categories</h2>
                  <div className="space-y-4">
                    {stats.popularCategories.map((category, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-700">{category.name}</span>
                          <span className="text-gray-500 text-sm">{category.count} bookings</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary-500 h-2 rounded-full" 
                            style={{ 
                              width: `${(category.count / Math.max(...stats.popularCategories.map(c => c.count))) * 100}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Bookings</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Booking ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Client
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Trainer
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bookings.map((booking) => (
                        <tr key={booking.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {booking.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {booking.client.firstName} {booking.client.lastName}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {booking.trainer.firstName} {booking.trainer.lastName}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(booking.date)}, {booking.startTime} - {booking.endTime}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              booking.status === 'confirmed' 
                                ? 'bg-green-100 text-green-800' 
                                : booking.status === 'completed'
                                ? 'bg-blue-100 text-blue-800'
                                : booking.status === 'cancelled'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {formatCurrency(booking.price)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {/* Users Management Tab */}
          {activeTab === 'users' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Users Management</h1>
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg">
                  Add New User
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <svg className="w-5 h-5 text-gray-500 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <div className="flex space-x-2">
                    <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                      <option value="">All Roles</option>
                      <option value="client">Client</option>
                      <option value="trainer">Trainer</option>
                      <option value="admin">Admin</option>
                    </select>
                    <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                      <option value="">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Join Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Bookings
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total Spent
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {user.firstName} {user.lastName}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : user.status === 'inactive'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(user.joinDate)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {user.totalBookings}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatCurrency(user.totalSpent)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-primary-600 hover:text-primary-900">
                                Edit
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-gray-500">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of <span className="font-medium">{stats.totalUsers}</span> users
                  </div>
                  <div className="flex space-x-2">
                    <button className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-500 hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-500 hover:bg-gray-50">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Trainers Management Tab */}
          {activeTab === 'trainers' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Trainers Management</h1>
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg">
                  Add New Trainer
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search trainers..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <svg className="w-5 h-5 text-gray-500 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <div className="flex space-x-2">
                    <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                      <option value="">All Specialties</option>
                      <option value="yoga">Yoga</option>
                      <option value="pilates">Pilates</option>
                      <option value="strength">Strength Training</option>
                      <option value="cardio">Cardio</option>
                      <option value="dance">Dance Fitness</option>
                    </select>
                    <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                      <option value="">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Trainer
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Specialties
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Join Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Bookings
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Earnings
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rating
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {trainers.map((trainer) => (
                        <tr key={trainer.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {trainer.firstName} {trainer.lastName}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {trainer.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-wrap gap-1">
                              {trainer.specialties.map((specialty, index) => (
                                <span key={index} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-secondary-100 text-secondary-800">
                                  {specialty}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              trainer.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : trainer.status === 'inactive'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {trainer.status.charAt(0).toUpperCase() + trainer.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(trainer.joinDate)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {trainer.totalBookings}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatCurrency(trainer.totalEarnings)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="text-sm font-medium text-gray-900 mr-1">
                                {trainer.rating > 0 ? trainer.rating.toFixed(1) : 'N/A'}
                              </span>
                              {trainer.rating > 0 && (
                                <svg className="w-4 h-4 text-accent-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-primary-600 hover:text-primary-900">
                                Edit
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-gray-500">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of <span className="font-medium">{stats.totalTrainers}</span> trainers
                  </div>
                  <div className="flex space-x-2">
                    <button className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-500 hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-500 hover:bg-gray-50">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Bookings Management Tab */}
          {activeTab === 'bookings' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Bookings Management</h1>
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg">
                  Create New Booking
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search bookings..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <svg className="w-5 h-5 text-gray-500 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <div className="flex space-x-2">
                    <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                      <option value="">All Session Types</option>
                      <option value="virtual">Virtual</option>
                      <option value="in-person">In-Person</option>
                    </select>
                    <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                      <option value="">All Status</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Booking ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Client
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Trainer
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Session Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Payment
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bookings.map((booking) => (
                        <tr key={booking.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {booking.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {booking.client.firstName} {booking.client.lastName}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {booking.trainer.firstName} {booking.trainer.lastName}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(booking.date)}, {booking.startTime} - {booking.endTime}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                              {booking.sessionType === 'virtual' ? 'Virtual' : 'In-Person'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              booking.status === 'confirmed' 
                                ? 'bg-green-100 text-green-800' 
                                : booking.status === 'completed'
                                ? 'bg-blue-100 text-blue-800'
                                : booking.status === 'cancelled'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              booking.paymentStatus === 'completed' 
                                ? 'bg-green-100 text-green-800' 
                                : booking.paymentStatus === 'refunded'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {formatCurrency(booking.price)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-primary-600 hover:text-primary-900">
                                View
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                Cancel
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-gray-500">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of <span className="font-medium">{stats.totalBookings}</span> bookings
                  </div>
                  <div className="flex space-x-2">
                    <button className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-500 hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-500 hover:bg-gray-50">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Payments & Revenue Tab */}
          {activeTab === 'payments' && (
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Payments & Revenue</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">Total Revenue</h2>
                  <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
                  <div className="mt-4 flex items-center">
                    <span className={`text-sm ${stats.revenueGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {stats.revenueGrowth >= 0 ? '+' : ''}{stats.revenueGrowth}%
                    </span>
                    <span className="text-gray-500 text-sm ml-2">from last month</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">Platform Fees</h2>
                  <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.platformFees)}</p>
                  <div className="mt-4 flex items-center">
                    <span className="text-gray-500 text-sm">10% of total revenue</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">Revenue This Month</h2>
                  <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.revenueThisMonth)}</p>
                  <div className="mt-4 flex items-center">
                    <span className="text-gray-500 text-sm">From {stats.bookingsThisMonth} bookings</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Transactions</h2>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Payment ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Client
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Trainer
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Platform Fee
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Trainer Earnings
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Method
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {payments.map((payment) => (
                        <tr key={payment.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {payment.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDateTime(payment.date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {payment.client.firstName} {payment.client.lastName}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {payment.trainer.firstName} {payment.trainer.lastName}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {formatCurrency(payment.amount)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatCurrency(payment.platformFee)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatCurrency(payment.trainerEarnings)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              payment.status === 'completed' 
                                ? 'bg-green-100 text-green-800' 
                                : payment.status === 'refunded'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                            {payment.paymentMethod.replace('_', ' ')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-gray-500">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of <span className="font-medium">1,245</span> payments
                  </div>
                  <div className="flex space-x-2">
                    <button className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-500 hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-500 hover:bg-gray-50">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Platform Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Platform Settings</h1>
              
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">General Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="platformName" className="block text-sm font-medium text-gray-700 mb-1">
                      Platform Name
                    </label>
                    <input
                      type="text"
                      id="platformName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      defaultValue="FitTribe.fitness"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="platformFee" className="block text-sm font-medium text-gray-700 mb-1">
                      Platform Fee (%)
                    </label>
                    <input
                      type="number"
                      id="platformFee"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      defaultValue="10"
                      min="0"
                      max="100"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="supportEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      Support Email
                    </label>
                    <input
                      type="email"
                      id="supportEmail"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      defaultValue="support@fittribe.fitness"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
                      Default Timezone
                    </label>
                    <select
                      id="timezone"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      defaultValue="America/New_York"
                    >
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      <option value="Europe/London">Greenwich Mean Time (GMT)</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                      Default Currency
                    </label>
                    <select
                      id="currency"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      defaultValue="USD"
                    >
                      <option value="USD">US Dollar (USD)</option>
                      <option value="EUR">Euro (EUR)</option>
                      <option value="GBP">British Pound (GBP)</option>
                      <option value="CAD">Canadian Dollar (CAD)</option>
                      <option value="AUD">Australian Dollar (AUD)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="stripeKey" className="block text-sm font-medium text-gray-700 mb-1">
                      Stripe API Key
                    </label>
                    <input
                      type="password"
                      id="stripeKey"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      defaultValue="sk_test_••••••••••••••••••••••••"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="paypalClientId" className="block text-sm font-medium text-gray-700 mb-1">
                      PayPal Client ID
                    </label>
                    <input
                      type="password"
                      id="paypalClientId"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      defaultValue="client_id_••••••••••••••••••••••••"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="enablePayouts"
                      className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      defaultChecked
                    />
                    <label htmlFor="enablePayouts" className="ml-2 block text-sm text-gray-700">
                      Enable automatic trainer payouts
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Integration Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="zoomApiKey" className="block text-sm font-medium text-gray-700 mb-1">
                      Zoom API Key
                    </label>
                    <input
                      type="password"
                      id="zoomApiKey"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      defaultValue="zoom_api_key_••••••••••••••••••••••••"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="zoomApiSecret" className="block text-sm font-medium text-gray-700 mb-1">
                      Zoom API Secret
                    </label>
                    <input
                      type="password"
                      id="zoomApiSecret"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      defaultValue="zoom_api_secret_••••••••••••••••••••••••"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="googleClientId" className="block text-sm font-medium text-gray-700 mb-1">
                      Google OAuth Client ID
                    </label>
                    <input
                      type="password"
                      id="googleClientId"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      defaultValue="google_client_id_••••••••••••••••••••••••"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="enableGoogleAuth"
                      className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      defaultChecked
                    />
                    <label htmlFor="enableGoogleAuth" className="ml-2 block text-sm text-gray-700">
                      Enable Google authentication
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg">
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
