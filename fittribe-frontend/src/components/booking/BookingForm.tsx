import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const BookingForm = ({ trainerId, trainerProfileId }) => {
  const router = useRouter();
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [sessionType, setSessionType] = useState('virtual');
  const [sessionFocus, setSessionFocus] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [trainerData, setTrainerData] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [price, setPrice] = useState(0);

  // Mock trainer data - would be fetched from API
  const mockTrainer = {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    profileImage: '/images/trainer1.jpg',
    specialties: ['Yoga', 'Pilates', 'Meditation'],
    hourlyRate: 45,
    averageRating: 4.8,
    totalReviews: 124,
    availability: [
      {
        date: '2025-04-10',
        slots: [
          { startTime: '09:00', endTime: '10:00', isBooked: false },
          { startTime: '10:30', endTime: '11:30', isBooked: true },
          { startTime: '13:00', endTime: '14:00', isBooked: false },
          { startTime: '15:30', endTime: '16:30', isBooked: false }
        ]
      },
      {
        date: '2025-04-11',
        slots: [
          { startTime: '09:00', endTime: '10:00', isBooked: true },
          { startTime: '10:30', endTime: '11:30', isBooked: false },
          { startTime: '13:00', endTime: '14:00', isBooked: false },
          { startTime: '15:30', endTime: '16:30', isBooked: true }
        ]
      },
      {
        date: '2025-04-12',
        slots: [
          { startTime: '09:00', endTime: '10:00', isBooked: false },
          { startTime: '10:30', endTime: '11:30', isBooked: false },
          { startTime: '13:00', endTime: '14:00', isBooked: true },
          { startTime: '15:30', endTime: '16:30', isBooked: false }
        ]
      }
    ]
  };

  // Focus options based on trainer specialties
  const focusOptions = [
    'Beginner Yoga',
    'Advanced Yoga',
    'Restorative Yoga',
    'Pilates Fundamentals',
    'Core Strength',
    'Flexibility',
    'Meditation & Mindfulness',
    'Stress Reduction',
    'Personalized Routine'
  ];

  // Fetch trainer data
  useEffect(() => {
    // This would be replaced with actual API call
    setLoading(true);
    setTimeout(() => {
      setTrainerData(mockTrainer);
      setLoading(false);
    }, 500);
  }, [trainerId]);

  // Update available slots when date changes
  useEffect(() => {
    if (!date || !trainerData) return;

    const dayData = trainerData.availability.find(day => day.date === date);
    if (dayData) {
      setAvailableSlots(dayData.slots.filter(slot => !slot.isBooked));
    } else {
      setAvailableSlots([]);
    }
    
    // Reset selected slot and times
    setSelectedSlot(null);
    setStartTime('');
    setEndTime('');
  }, [date, trainerData]);

  // Update price when session details change
  useEffect(() => {
    if (!trainerData || !startTime || !endTime) {
      setPrice(0);
      return;
    }

    // Parse start and end times to calculate duration
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    
    // Calculate duration in hours
    let durationHours = endHour - startHour;
    if (endMinute < startMinute) {
      durationHours -= 1;
    }
    
    // Calculate price
    const calculatedPrice = trainerData.hourlyRate * durationHours;
    setPrice(calculatedPrice);
  }, [trainerData, startTime, endTime]);

  // Handle slot selection
  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setStartTime(slot.startTime);
    setEndTime(slot.endTime);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!date || !startTime || !endTime || !sessionType || !sessionFocus) {
      setError('Please fill in all required fields');
      return;
    }
    
    setLoading(true);
    
    // This would be replaced with actual API call
    setTimeout(() => {
      // Simulate successful booking
      const bookingData = {
        id: Math.random().toString(36).substring(2, 10),
        trainerId: trainerId || mockTrainer.id,
        trainerProfileId: trainerProfileId || '1',
        date,
        startTime,
        endTime,
        sessionType,
        sessionFocus,
        notes,
        price
      };
      
      // Store booking data in session storage for next step
      sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
      
      // Redirect to confirmation page
      router.push('/booking/confirmation');
      
      setLoading(false);
    }, 1000);
  };

  // Generate date options for the next 14 days
  const dateOptions = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const formattedDate = date.toISOString().split('T')[0];
    const displayDate = date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
    
    dateOptions.push({ value: formattedDate, label: displayDate });
  }

  if (loading && !trainerData) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="inline-block w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-2 text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-display font-bold text-primary-900 mb-2">Book a Session</h1>
          
          {trainerData && (
            <div className="flex items-center mb-8">
              <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                <Image
                  src={trainerData.profileImage}
                  alt={`${trainerData.firstName} ${trainerData.lastName}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="font-medium text-primary-800">
                  {trainerData.firstName} {trainerData.lastName}
                </h2>
                <div className="flex items-center">
                  <span className="text-accent-500 font-bold">{trainerData.averageRating}</span>
                  <svg className="w-4 h-4 text-accent-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-gray-500 text-xs ml-1">({trainerData.totalReviews} reviews)</span>
                </div>
              </div>
              <div className="ml-auto">
                <p className="text-primary-800 font-bold">${trainerData.hourlyRate}/hour</p>
              </div>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-soft p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Date Selection */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Date <span className="text-red-500">*</span>
                </label>
                <select
                  id="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                >
                  <option value="">Select a date</option>
                  {dateOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Session Type */}
              <div>
                <label htmlFor="sessionType" className="block text-sm font-medium text-gray-700 mb-1">
                  Session Type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                      sessionType === 'virtual'
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => setSessionType('virtual')}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full border ${
                        sessionType === 'virtual'
                          ? 'border-primary-500 bg-primary-500'
                          : 'border-gray-400'
                      }`}>
                        {sessionType === 'virtual' && (
                          <div className="w-2 h-2 bg-white rounded-full m-auto mt-1"></div>
                        )}
                      </div>
                      <span className="ml-2 font-medium">Virtual</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Via Zoom</p>
                  </div>
                  <div
                    className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                      sessionType === 'in-person'
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => setSessionType('in-person')}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full border ${
                        sessionType === 'in-person'
                          ? 'border-primary-500 bg-primary-500'
                          : 'border-gray-400'
                      }`}>
                        {sessionType === 'in-person' && (
                          <div className="w-2 h-2 bg-white rounded-full m-auto mt-1"></div>
                        )}
                      </div>
                      <span className="ml-2 font-medium">In-Person</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">At trainer's location</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Available Time Slots */}
            {date && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Time Slots <span className="text-red-500">*</span>
                </label>
                {availableSlots.length === 0 ? (
                  <p className="text-gray-500 text-center py-4 bg-gray-50 rounded-lg">
                    No available slots for this date. Please select another date.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {availableSlots.map((slot, index) => (
                      <div
                        key={index}
                        className={`border rounded-lg p-3 text-center cursor-pointer transition-colors ${
                          selectedSlot === slot
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        onClick={() => handleSlotSelect(slot)}
                      >
                        <span className="font-medium">
                          {slot.startTime} - {slot.endTime}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Session Focus */}
            <div className="mb-6">
              <label htmlFor="sessionFocus" className="block text-sm font-medium text-gray-700 mb-1">
                Session Focus <span className="text-red-500">*</span>
              </label>
              <select
                id="sessionFocus"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={sessionFocus}
                onChange={(e) => setSessionFocus(e.target.value)}
                required
              >
                <option value="">Select a focus</option>
                {focusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Notes */}
            <div className="mb-6">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Notes for Trainer (Optional)
              </label>
              <textarea
                id="notes"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Share any specific goals, concerns, or questions you have for your trainer..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>
            
            {/* Price Summary */}
            {price > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Session Price:</span>
                  <span className="font-bold text-primary-800">${price.toFixed(2)}</span>
                </div>
              </div>
            )}
            
            {/* Submit Button */}
            <div className="flex justify-between items-center">
              <Link 
                href={`/trainers/${trainerId || '1'}`}
                className="text-gray-600 hover:text-gray-800"
              >
                &larr; Back to Trainer Profile
              </Link>
              <button
                type="submit"
                className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-2 rounded-lg transition-colors"
                disabled={loading || !date || !startTime || !endTime || !sessionType || !sessionFocus}
              >
                {loading ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    Processing...
                  </>
                ) : (
                  'Continue to Payment'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
