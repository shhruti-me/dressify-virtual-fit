
import React, { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.animate-on-scroll');
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('animate-fade-in');
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) observer.observe(sectionRef.current);
    
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28">
      <div className="container-custom">
        <div className="relative bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="heading-lg mb-6 opacity-0 animate-on-scroll">Ready to Transform Your Fashion Business?</h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 opacity-0 animate-on-scroll">
              Join industry leaders who are already reducing returns by 40% and increasing customer satisfaction through virtual try-on technology.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 opacity-0 animate-on-scroll">
              <Button className="btn-primary gap-2 group">
                Start Free Trial
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" className="btn-secondary">Request Demo</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
