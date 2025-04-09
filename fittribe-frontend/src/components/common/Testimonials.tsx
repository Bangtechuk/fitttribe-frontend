import React from 'react';
import Image from 'next/image';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Jessica R.',
      role: 'Yoga Enthusiast',
      image: '/images/testimonial1.jpg',
      quote: 'Finding a yoga instructor who understands my specific needs was always a challenge until I discovered FitTribe. Sarah has been amazing at helping me improve my practice from the comfort of my home.',
      rating: 5
    },
    {
      id: 2,
      name: 'Marcus T.',
      role: 'Weight Loss Journey',
      image: '/images/testimonial2.jpg',
      quote: 'I've lost 30 pounds in 4 months working with Michael through FitTribe. The personalized training and nutrition guidance has been life-changing. The platform makes scheduling and payments so easy!',
      rating: 5
    },
    {
      id: 3,
      name: 'Priya K.',
      role: 'Busy Professional',
      image: '/images/testimonial3.jpg',
      quote: 'As someone with a hectic work schedule, FitTribe has been a game-changer. I can book sessions that fit my calendar, and the trainers are flexible and understanding of my time constraints.',
      rating: 4
    }
  ];

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <svg 
        key={i} 
        className={`w-5 h-5 ${i < rating ? 'text-accent-500' : 'text-gray-300'}`} 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-16 bg-primary-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-primary-900 mb-4">What Our Users Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from our community about how FitTribe has helped them achieve their fitness goals and transform their lives.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-xl shadow-soft p-6 hover:shadow-medium transition-shadow">
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-primary-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {renderStars(testimonial.rating)}
              </div>
              
              <p className="text-gray-600 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="/testimonials" 
            className="inline-block bg-transparent border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Read More Success Stories
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
