import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const TrainerProfile = ({ trainer }) => {
  const [activeTab, setActiveTab] = useState('about');
  
  // This would be replaced with actual data from API
  const mockTrainer = {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    profileImage: '/images/trainer1.jpg',
    specialties: ['Yoga', 'Pilates', 'Meditation'],
    bio: 'Certified yoga instructor with 8 years of experience helping clients achieve balance, flexibility, and inner peace through personalized sessions. I specialize in vinyasa flow, restorative yoga, and meditation techniques that can be adapted for all experience levels.',
    experience: 8,
    hourlyRate: 45,
    averageRating: 4.8,
    totalReviews: 124,
    certifications: [
      {
        name: 'Registered Yoga Teacher (RYT-200)',
        issuingOrganization: 'Yoga Alliance',
        issueDate: '2015-06-15',
        expiryDate: null
      },
      {
        name: 'Certified Pilates Instructor',
        issuingOrganization: 'Pilates Method Alliance',
        issueDate: '2017-03-22',
        expiryDate: null
      },
      {
        name: 'Meditation Teacher Certification',
        issuingOrganization: 'Mindfulness Center',
        issueDate: '2018-11-10',
        expiryDate: null
      }
    ],
    availability: [
      {
        day: 'Monday',
        slots: [
          { startTime: '09:00', endTime: '10:00', isBooked: false },
          { startTime: '10:30', endTime: '11:30', isBooked: true },
          { startTime: '13:00', endTime: '14:00', isBooked: false },
          { startTime: '15:30', endTime: '16:30', isBooked: false }
        ]
      },
      {
        day: 'Wednesday',
        slots: [
          { startTime: '09:00', endTime: '10:00', isBooked: true },
          { startTime: '10:30', endTime: '11:30', isBooked: false },
          { startTime: '13:00', endTime: '14:00', isBooked: false },
          { startTime: '15:30', endTime: '16:30', isBooked: true }
        ]
      },
      {
        day: 'Friday',
        slots: [
          { startTime: '09:00', endTime: '10:00', isBooked: false },
          { startTime: '10:30', endTime: '11:30', isBooked: false },
          { startTime: '13:00', endTime: '14:00', isBooked: true },
          { startTime: '15:30', endTime: '16:30', isBooked: false }
        ]
      }
    ],
    reviews: [
      {
        id: '1',
        client: {
          firstName: 'Jessica',
          lastName: 'R.',
          profileImage: '/images/client1.jpg'
        },
        rating: 5,
        title: 'Amazing yoga instructor!',
        comment: 'Sarah is an incredible yoga instructor. Her sessions are the perfect balance of challenging and relaxing. She really takes the time to understand your goals and limitations.',
        date: '2023-08-15',
        trainerResponse: {
          text: 'Thank you so much for your kind words, Jessica! It\'s been a pleasure working with you on your yoga journey.',
          date: '2023-08-16'
        }
      },
      {
        id: '2',
        client: {
          firstName: 'Michael',
          lastName: 'T.',
          profileImage: '/images/client2.jpg'
        },
        rating: 4,
        title: 'Great meditation sessions',
        comment: 'I\'ve been struggling with stress and anxiety, and Sarah\'s meditation sessions have been incredibly helpful. She provides clear guidance and creates a peaceful atmosphere.',
        date: '2023-07-22'
      },
      {
        id: '3',
        client: {
          firstName: 'Emma',
          lastName: 'L.',
          profileImage: '/images/client3.jpg'
        },
        rating: 5,
        title: 'Transformed my practice',
        comment: 'I\'ve been practicing yoga for years, but Sarah has completely transformed my approach. Her attention to detail and personalized adjustments have helped me progress more in 3 months than I did in the past 2 years.',
        date: '2023-06-30',
        trainerResponse: {
          text: 'Emma, I\'m so happy to hear about your progress! Your dedication to your practice is inspiring, and I\'m grateful to be part of your journey.',
          date: '2023-07-01'
        }
      }
    ]
  };

  // Use mock data for now
  const trainerData = trainer || mockTrainer;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-soft overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-primary-800 to-primary-600 h-48 relative">
            {/* Trainer Image */}
            <div className="absolute -bottom-16 left-8">
              <div className="relative h-32 w-32 rounded-full border-4 border-white overflow-hidden">
                <Image
                  src={trainerData.profileImage}
                  alt={`${trainerData.firstName} ${trainerData.lastName}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          
          <div className="pt-20 pb-8 px-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <h1 className="text-3xl font-display font-bold text-primary-900">
                  {trainerData.firstName} {trainerData.lastName}
                </h1>
                <div className="flex flex-wrap gap-2 mt-2">
                  {trainerData.specialties.map((specialty, index) => (
                    <span 
                      key={index} 
                      className="bg-secondary-100 text-secondary-800 text-xs px-2 py-1 rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
                <div className="flex items-center mb-2">
                  <span className="text-accent-500 font-bold text-xl">{trainerData.averageRating}</span>
                  <svg className="w-5 h-5 text-accent-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-gray-500 text-sm ml-1">({trainerData.totalReviews} reviews)</span>
                </div>
                <p className="text-primary-800 font-bold text-xl">${trainerData.hourlyRate}/hour</p>
                <Link 
                  href={`/booking?trainerId=${trainerData.id}`}
                  className="mt-4 bg-accent-500 hover:bg-accent-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Book a Session
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs Navigation */}
        <div className="bg-white rounded-xl shadow-soft overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'about'
                    ? 'border-b-2 border-accent-500 text-accent-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('about')}
              >
                About
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'certifications'
                    ? 'border-b-2 border-accent-500 text-accent-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('certifications')}
              >
                Certifications
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'availability'
                    ? 'border-b-2 border-accent-500 text-accent-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('availability')}
              >
                Availability
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-accent-500 text-accent-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
            </nav>
          </div>
          
          {/* Tab Content */}
          <div className="p-8">
            {/* About Tab */}
            {activeTab === 'about' && (
              <div>
                <h2 className="text-xl font-semibold text-primary-900 mb-4">About {trainerData.firstName}</h2>
                <p className="text-gray-600 mb-6">{trainerData.bio}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-primary-800 mb-2">Experience</h3>
                    <p className="text-gray-600">{trainerData.experience} years of professional experience</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-primary-800 mb-2">Specialties</h3>
                    <ul className="list-disc list-inside text-gray-600">
                      {trainerData.specialties.map((specialty, index) => (
                        <li key={index}>{specialty}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {/* Certifications Tab */}
            {activeTab === 'certifications' && (
              <div>
                <h2 className="text-xl font-semibold text-primary-900 mb-4">Certifications & Credentials</h2>
                <div className="space-y-6">
                  {trainerData.certifications.map((cert, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                      <h3 className="text-lg font-medium text-primary-800">{cert.name}</h3>
                      <p className="text-gray-600">Issued by {cert.issuingOrganization}</p>
                      <p className="text-gray-500 text-sm">
                        Issued: {formatDate(cert.issueDate)}
                        {cert.expiryDate && ` • Expires: ${formatDate(cert.expiryDate)}`}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Availability Tab */}
            {activeTab === 'availability' && (
              <div>
                <h2 className="text-xl font-semibold text-primary-900 mb-4">Weekly Availability</h2>
                <p className="text-gray-600 mb-6">
                  Below are {trainerData.firstName}'s regular available time slots. Book a session to secure your spot.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {trainerData.availability.map((day, dayIndex) => (
                    <div key={dayIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-primary-100 px-4 py-2">
                        <h3 className="font-medium text-primary-800">{day.day}</h3>
                      </div>
                      <div className="p-4">
                        {day.slots.length === 0 ? (
                          <p className="text-gray-500 text-center py-2">No available slots</p>
                        ) : (
                          <ul className="space-y-2">
                            {day.slots.map((slot, slotIndex) => (
                              <li 
                                key={slotIndex}
                                className={`px-3 py-2 rounded-md text-sm ${
                                  slot.isBooked 
                                    ? 'bg-gray-100 text-gray-400' 
                                    : 'bg-green-50 text-green-700'
                                }`}
                              >
                                {slot.startTime} - {slot.endTime}
                                {slot.isBooked && ' (Booked)'}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <Link 
                    href={`/booking?trainerId=${trainerData.id}`}
                    className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Book a Session
                  </Link>
                </div>
              </div>
            )}
            
            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-primary-900">Client Reviews</h2>
                  <Link 
                    href={`/trainers/${trainerData.id}/reviews`}
                    className="text-accent-500 hover:text-accent-600 text-sm font-medium"
                  >
                    View All Reviews
                  </Link>
                </div>
                
                {trainerData.reviews.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No reviews yet</p>
                ) : (
                  <div className="space-y-8">
                    {trainerData.reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                        <div className="flex items-start">
                          <div className="relative h-10 w-10 rounded-full overflow-hidden mr-4">
                            <Image
                              src={review.client.profileImage}
                              alt={`${review.client.firstName} ${review.client.lastName}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <h3 className="font-medium text-primary-800">
                                {review.client.firstName} {review.client.lastName}
                              </h3>
                              <span className="text-gray-500 text-sm">{formatDate(review.date)}</span>
                            </div>
                            <div className="flex items-center mt-1 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <svg 
                                  key={i}
                                  className={`w-4 h-4 ${i < review.rating ? 'text-accent-500' : 'text-gray-300'}`}
                                  fill="currentColor" 
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <h4 className="font-medium text-gray-800 mb-2">{review.title}</h4>
                            <p className="text-gray-600">{review.comment}</p>
                            
                            {/* Trainer Response */}
                            {review.trainerResponse && (
                              <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm font-medium text-primary-800 mb-1">Response from {trainerData.firstName}</p>
                                <p className="text-gray-600 text-sm">{review.trainerResponse.text}</p>
                                <p className="text-gray-500 text-xs mt-1">{formatDate(review.trainerResponse.date)}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="mt-8 text-center">
                  <Link 
                    href={`/booking?trainerId=${trainerData.id}`}
                    className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Book a Session with {trainerData.firstName}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerProfile;
