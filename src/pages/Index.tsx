
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import BenefitsSection from '../components/BenefitsSection';
import HowItWorksSection from '../components/HowItWorksSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import { setupScrollAnimations } from '../utils/animationObserver';
import { Toaster } from '@/components/ui/sonner';

const Index = () => {
  useEffect(() => {
    // Initialize animations
    const cleanup = setupScrollAnimations();
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    return cleanup;
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50/50 to-background">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <BenefitsSection />
        <HowItWorksSection />
        <CTASection />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
