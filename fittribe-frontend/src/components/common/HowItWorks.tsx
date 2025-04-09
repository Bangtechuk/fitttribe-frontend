import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: 'Find Your Trainer',
      description: 'Browse our selection of certified fitness trainers and filter by specialty, price, and availability to find your perfect match.',
      icon: (
        <svg className="w-12 h-12 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      number: 2,
      title: 'Book a Session',
      description: 'Select a time slot that works for you and book your session. Choose between virtual or in-person training based on your preference.',
      icon: (
        <svg className="w-12 h-12 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      number: 3,
      title: 'Make Payment',
      description: 'Securely pay for your session using our integrated payment system. You can also purchase credits for future bookings at a discount.',
      icon: (
        <svg className="w-12 h-12 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    },
    {
      number: 4,
      title: 'Attend Your Session',
      description: 'Join your virtual session via our integrated video platform or meet your trainer at the designated location for in-person sessions.',
      icon: (
        <svg className="w-12 h-12 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-primary-900 mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Getting started with FitTribe is simple. Follow these steps to begin your fitness journey with our expert trainers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="bg-gray-50 rounded-xl p-6 text-center shadow-soft hover:shadow-medium transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="bg-primary-100 p-3 rounded-full">
                  {step.icon}
                </div>
              </div>
              <div className="inline-block bg-accent-500 text-white rounded-full w-8 h-8 flex items-center justify-center mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
