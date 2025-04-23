
import React from 'react';
import { Button } from './ui/button';

const HeroSection = () => {
  return (
    <section className="pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden relative">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-6 animate-fade-in">
              Revolutionizing Online Fashion
            </span>
            <h1 className="heading-xl mb-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Virtual Try-On Experience That Feels Real
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              DressFit uses cutting-edge AR and AI technology to help customers try clothes virtually, 
              reducing returns and enhancing the online shopping experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button className="btn-primary">Start Free Trial</Button>
              <Button variant="outline" className="btn-secondary">Learn More</Button>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl opacity-0 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[280px] h-[450px] md:w-[320px] md:h-[500px]">
                  {/* Mockup illustration - phone frame */}
                  <div className="absolute inset-0 rounded-3xl border-8 border-gray-900 bg-gray-800 shadow-lg"></div>
                  
                  {/* Screen content */}
                  <div className="absolute inset-[8px] rounded-2xl bg-gray-100 overflow-hidden">
                    <div className="absolute top-0 w-full h-12 bg-gray-200 flex items-center justify-center">
                      <div className="w-24 h-5 rounded-full bg-gray-300"></div>
                    </div>
                    
                    {/* App content */}
                    <div className="absolute top-12 bottom-0 left-0 right-0 bg-white">
                      <div className="h-full flex flex-col">
                        <div className="h-2/3 bg-gradient-to-b from-gray-50 to-white relative">
                          {/* Silhouette of person */}
                          <div className="absolute inset-0 flex justify-center items-center">
                            <div className="w-32 h-48 bg-gray-200 rounded-full"></div>
                            <div className="absolute top-1/4 w-48 h-72 animate-float">
                              {/* Dress overlay visualization */}
                              <div className="w-full h-full bg-gradient-to-b from-primary/20 to-primary/5 rounded-3xl"></div>
                            </div>
                          </div>
                        </div>
                        <div className="h-1/3 border-t border-gray-100 p-3">
                          <div className="w-full h-4 bg-gray-200 rounded-full mb-2"></div>
                          <div className="w-2/3 h-4 bg-gray-200 rounded-full mb-4"></div>
                          <div className="flex space-x-2">
                            <div className="w-8 h-8 rounded-full bg-primary"></div>
                            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/3 -left-64 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default HeroSection;
