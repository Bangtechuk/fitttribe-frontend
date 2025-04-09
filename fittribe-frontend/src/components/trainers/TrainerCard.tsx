import React from 'react';
import Image from 'next/image';

const TrainerCard = ({ trainer }) => {
  return (
    <div className="bg-white rounded-xl shadow-soft overflow-hidden transition-transform hover:scale-105 hover:shadow-medium">
      <div className="relative h-48 w-full">
        <Image
          src={trainer.profileImage || '/images/default-trainer.jpg'}
          alt={`${trainer.firstName} ${trainer.lastName}`}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold text-primary-900">{trainer.firstName} {trainer.lastName}</h3>
          <div className="flex items-center">
            <span className="text-accent-500 font-bold">{trainer.averageRating}</span>
            <svg className="w-5 h-5 text-accent-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-gray-500 text-sm ml-1">({trainer.totalReviews})</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {trainer.specialties.map((specialty, index) => (
            <span 
              key={index} 
              className="bg-secondary-100 text-secondary-800 text-xs px-2 py-1 rounded-full"
            >
              {specialty}
            </span>
          ))}
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-3">{trainer.bio}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-primary-800 font-bold">${trainer.hourlyRate}/hour</span>
          <a 
            href={`/trainers/${trainer.id}`}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            View Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default TrainerCard;
