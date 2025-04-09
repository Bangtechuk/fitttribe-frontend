import React from 'react';
import FitnessScene from '../3d/FitnessScene';

const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-primary-900 to-primary-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Find Your Perfect <span className="text-accent-500">Fitness Trainer</span>
            </h1>
            <p className="text-lg mb-8 text-gray-200">
              Connect with certified fitness professionals for personalized virtual and in-person training sessions tailored to your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/trainers"
                className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center"
              >
                Find Trainers
              </a>
              <a
                href="/register"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-primary-900 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center"
              >
                Become a Trainer
              </a>
            </div>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <FitnessScene />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
