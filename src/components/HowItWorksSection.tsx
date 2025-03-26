
import React, { useEffect, useRef } from 'react';
import { Camera, Ruler, Shirt, ThumbsUp } from 'lucide-react';

const steps = [
  {
    icon: <Camera className="h-12 w-12 text-white" />,
    title: "Scan Yourself",
    description: "Use your device camera to create a digital twin or simply input your measurements.",
    color: "from-primary to-primary/80",
  },
  {
    icon: <Shirt className="h-12 w-12 text-white" />,
    title: "Select Clothing",
    description: "Browse the collection and select items you'd like to try on virtually.",
    color: "from-primary/90 to-primary/70",
  },
  {
    icon: <Ruler className="h-12 w-12 text-white" />,
    title: "See the Fit",
    description: "Instantly view how the garment looks on you with accurate sizing information.",
    color: "from-primary/80 to-primary/60",
  },
  {
    icon: <ThumbsUp className="h-12 w-12 text-white" />,
    title: "Shop Confidently",
    description: "Make your purchase with the confidence that your items will fit perfectly.",
    color: "from-primary/70 to-primary/50",
  },
];

const HowItWorksSection = () => {
  const stepsRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-in-right');
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    
    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      itemRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section id="how-it-works" className="section-padding bg-gradient-to-b from-secondary/30 to-background">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-4">
            Simple Process
          </span>
          <h2 className="heading-lg mb-6">How DressFit Works</h2>
          <p className="text-muted-foreground text-lg">
            Experience clothing virtually in just a few simple steps,
            making online shopping as reliable as in-store fitting rooms.
          </p>
        </div>

        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              ref={el => itemRefs.current[index] = el}
              className="opacity-0"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className={`relative h-full glass-card p-8 overflow-hidden`}>
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${step.color}`}></div>
                <div className={`h-20 w-20 flex items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} mb-6 shadow-md`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-primary/5 blur-xl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
