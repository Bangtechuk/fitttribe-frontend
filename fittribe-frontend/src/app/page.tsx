import React from 'react';
import Hero from '../components/common/Hero';
import FeaturedTrainers from '../components/trainers/FeaturedTrainers';
import HowItWorks from '../components/common/HowItWorks';
import Testimonials from '../components/common/Testimonials';
import FeatureSection from '../components/common/FeatureSection';

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedTrainers />
      <HowItWorks />
      <FeatureSection />
      <Testimonials />
    </div>
  );
}
