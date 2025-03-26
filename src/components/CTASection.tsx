
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section id="cta" className="section-padding bg-gradient-to-br from-primary/5 to-transparent">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center space-y-8 reveal-animation animate-fade-in" style={{ '--animation-delay': '0.1s' } as React.CSSProperties}>
          <h2 className="heading-lg">Ready to Transform Your Shopping Experience?</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who have revolutionized their online shopping experience with DressFit's virtual try-on technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button className="btn-primary text-base px-8 py-6 flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                <span>Get Started Today</span>
              </Button>
            </Link>
            <Button variant="outline" className="text-base px-8 py-6">Request Demo</Button>
          </div>
          <p className="text-sm text-muted-foreground">No credit card required. 14-day free trial available.</p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
