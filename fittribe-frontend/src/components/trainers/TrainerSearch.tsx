import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TrainerCard from './TrainerCard';

const TrainerSearch = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [minRating, setMinRating] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Specialties list
  const specialties = [
    'Yoga',
    'Pilates',
    'HIIT',
    'Strength Training',
    'Cardio',
    'Nutrition',
    'Weight Loss',
    'Bodybuilding',
    'Flexibility',
    'Meditation',
    'Dance Fitness',
    'Sports Conditioning'
  ];

  // This would be replaced with actual API call
  useEffect(() => {
    // Simulate API call with delay
    setLoading(true);
    setTimeout(() => {
      // Mock data
      const mockTrainers = [
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
        },
        {
          id: '4',
          firstName: 'James',
          lastName: 'Rodriguez',
          profileImage: '/images/trainer4.jpg',
          specialties: ['Sports Conditioning', 'Strength Training', 'Nutrition'],
          bio: 'Former professional athlete with expertise in sports-specific training. I help clients improve performance, prevent injuries, and achieve their athletic goals.',
          hourlyRate: 60,
          averageRating: 4.9,
          totalReviews: 76
        },
        {
          id: '5',
          firstName: 'Emma',
          lastName: 'Taylor',
          profileImage: '/images/trainer5.jpg',
          specialties: ['Weight Loss', 'Nutrition', 'HIIT'],
          bio: 'Certified nutritionist and personal trainer specializing in sustainable weight loss. My holistic approach combines effective workouts with personalized nutrition plans.',
          hourlyRate: 50,
          averageRating: 4.8,
          totalReviews: 112
        },
        {
          id: '6',
          firstName: 'David',
          lastName: 'Kim',
          profileImage: '/images/trainer6.jpg',
          specialties: ['Bodybuilding', 'Strength Training', 'Nutrition'],
          bio: 'Competitive bodybuilder and certified trainer with 10+ years of experience. I help clients build muscle, increase strength, and transform their physiques.',
          hourlyRate: 65,
          averageRating: 4.9,
          totalReviews: 93
        }
      ];

      // Filter based on search criteria
      let filteredTrainers = [...mockTrainers];

      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filteredTrainers = filteredTrainers.filter(
          trainer => 
            trainer.firstName.toLowerCase().includes(term) || 
            trainer.lastName.toLowerCase().includes(term) ||
            trainer.specialties.some(s => s.toLowerCase().includes(term))
        );
      }

      if (specialty) {
        filteredTrainers = filteredTrainers.filter(
          trainer => trainer.specialties.includes(specialty)
        );
      }

      if (minRating) {
        filteredTrainers = filteredTrainers.filter(
          trainer => trainer.averageRating >= parseFloat(minRating)
        );
      }

      if (maxPrice) {
        filteredTrainers = filteredTrainers.filter(
          trainer => trainer.hourlyRate <= parseFloat(maxPrice)
        );
      }

      setTrainers(filteredTrainers);
      setLoading(false);
    }, 500);
  }, [searchTerm, specialty, minRating, maxPrice]);

  const handleSearch = (e) => {
    e.preventDefault();
    // This would trigger the useEffect above
  };

  const handleReset = () => {
    setSearchTerm('');
    setSpecialty('');
    setMinRating('');
    setMaxPrice('');
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-3xl font-display font-bold text-primary-900 mb-4 text-center">Find Your Perfect Trainer</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-center">
            Browse our selection of certified fitness professionals and filter by specialty, rating, and price to find the perfect match for your fitness goals.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-soft p-6 mb-10">
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Search Input */}
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Search
                </label>
                <input
                  type="text"
                  id="search"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Name or specialty"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Specialty Filter */}
              <div>
                <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">
                  Specialty
                </label>
                <select
                  id="specialty"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                >
                  <option value="">All Specialties</option>
                  {specialties.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>

              {/* Min Rating Filter */}
              <div>
                <label htmlFor="minRating" className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Rating
                </label>
                <select
                  id="minRating"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={minRating}
                  onChange={(e) => setMinRating(e.target.value)}
                >
                  <option value="">Any Rating</option>
                  <option value="4.5">4.5 & Up</option>
                  <option value="4">4.0 & Up</option>
                  <option value="3.5">3.5 & Up</option>
                  <option value="3">3.0 & Up</option>
                </select>
              </div>

              {/* Max Price Filter */}
              <div>
                <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Price
                </label>
                <select
                  id="maxPrice"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                >
                  <option value="">Any Price</option>
                  <option value="40">$40 & Under</option>
                  <option value="50">$50 & Under</option>
                  <option value="60">$60 & Under</option>
                  <option value="70">$70 & Under</option>
                  <option value="100">$100 & Under</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center mt-6 space-x-4">
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Search
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg transition-colors"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        <div>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-2 text-gray-600">Loading trainers...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
            </div>
          ) : trainers.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-soft">
              <p className="text-gray-600">No trainers found matching your criteria. Please try different filters.</p>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-6">{trainers.length} trainers found</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {trainers.map((trainer) => (
                  <TrainerCard key={trainer.id} trainer={trainer} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainerSearch;
