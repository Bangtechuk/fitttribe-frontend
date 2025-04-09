import React from 'react';
import TrainerCard from './TrainerCard';

const FeaturedTrainers = () => {
  // This would be replaced with actual data from API
  const trainers = [
    {
      id: '1',
      firstName: 'Sarah',
      lastName: 'Johnson',
      profileImage: '/images/trainer1.jpg',
      specialties: ['Yoga', 'Pilates', 'Meditation'],
      bio: 'Certified yoga instructor with 8 years of experience helping clients achieve balance, flexibility, and inner peace through personalized sessions.',
      hourlyRate: 45,
      averageRating: 4.8,
      totalReviews: 124
    },
    {
      id: '2',
      firstName: 'Michael',
      lastName: 'Chen',
      profileImage: '/images/trainer2.jpg',
      specialties: ['Strength Training', 'HIIT', 'Nutrition'],
      bio: 'Passionate about helping clients transform their bodies through effective strength training and nutrition guidance. Specialized in high-intensity workouts.',
      hourlyRate: 55,
      averageRating: 4.9,
      totalReviews: 98
    },
    {
      id: '3',
      firstName: 'Aisha',
      lastName: 'Williams',
      profileImage: '/images/trainer3.jpg',
      specialties: ['Dance Fitness', 'Cardio', 'Flexibility'],
      bio: 'Former professional dancer turned fitness instructor. My sessions combine fun dance routines with effective cardio workouts for all fitness levels.',
      hourlyRate: 40,
      averageRating: 4.7,
      totalReviews: 87
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-primary-900 mb-4">Featured Trainers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with our top-rated fitness professionals who specialize in various disciplines to help you achieve your fitness goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer) => (
            <TrainerCard key={trainer.id} trainer={trainer} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="/trainers" 
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            View All Trainers
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTrainers;
