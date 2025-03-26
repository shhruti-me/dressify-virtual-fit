
import React, { useEffect, useRef } from 'react';
import { Smartphone, Ruler, Shirt, Zap, Lock, BarChart } from 'lucide-react';

const features = [
  {
    icon: <Smartphone className="h-8 w-8 text-primary" />,
    title: "Augmented Reality Visualization",
    description: "View clothing on your body in real-time through your camera, with precise garment overlay.",
  },
  {
    icon: <Ruler className="h-8 w-8 text-primary" />,
    title: "Smart Size Recommendations",
    description: "Get accurate size suggestions based on your measurements and the garment's specifications.",
  },
  {
    icon: <Shirt className="h-8 w-8 text-primary" />,
    title: "3D Avatar Creation",
    description: "Create a personalized digital model of yourself for more accurate virtual try-ons.",
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Real-Time Fabric Simulation",
    description: "Experience how different fabrics drape, move, and fit on your body with realistic rendering.",
  },
  {
    icon: <Lock className="h-8 w-8 text-primary" />,
    title: "Secure & Private",
    description: "Your body measurements are securely stored and never shared with third parties.",
  },
  {
    icon: <BarChart className="h-8 w-8 text-primary" />,
    title: "Analytics Dashboard",
    description: "For retailers: track customer engagement and reduce return rates with detailed insights.",
  },
];

const FeaturesSection = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.feature-card');
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('animate-fade-in');
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);

  return (
    <section id="features" className="section-padding bg-gradient-to-b from-background to-secondary/30">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-4">
            Key Features
          </span>
          <h2 className="heading-lg mb-6">Transforming Online Shopping with Advanced Technology</h2>
          <p className="text-muted-foreground text-lg">
            DressFit combines cutting-edge AI and AR to create a seamless virtual try-on experience
            that bridges the gap between physical and digital fashion retail.
          </p>
        </div>

        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card"
              style={{ '--animation-order': index } as React.CSSProperties}
            >
              <div className="mb-6">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
