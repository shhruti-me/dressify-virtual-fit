
import React, { useEffect, useRef } from 'react';

const benefits = [
  {
    title: "For Retailers",
    items: [
      "Reduce return rates by up to 40%",
      "Increase customer confidence and conversion rates",
      "Gather valuable body measurement data",
      "Create a more engaging shopping experience",
      "Differentiate from competitors",
    ]
  },
  {
    title: "For Customers",
    items: [
      "Shop with confidence knowing how clothes will look and fit",
      "Save time by avoiding ill-fitting purchases",
      "Try unlimited styles without physical changing rooms",
      "Get personalized size recommendations",
      "Enjoy a more interactive shopping experience",
    ]
  }
];

const BenefitsSection = () => {
  const sectionRef = useRef(null);
  const retailerRef = useRef(null);
  const customerRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-in-bottom');
          }
        });
      },
      { threshold: 0.2 }
    );
    
    if (retailerRef.current) observer.observe(retailerRef.current);
    if (customerRef.current) observer.observe(customerRef.current);
    
    return () => {
      if (retailerRef.current) observer.unobserve(retailerRef.current);
      if (customerRef.current) observer.unobserve(customerRef.current);
    };
  }, []);

  return (
    <section id="benefits" className="section-padding">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-4">
            Benefits
          </span>
          <h2 className="heading-lg mb-6">Value for Everyone in the Fashion Ecosystem</h2>
          <p className="text-muted-foreground text-lg">
            DressFit creates a win-win solution for both retailers and shoppers,
            addressing the most common pain points in online fashion commerce.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div 
            ref={retailerRef} 
            className="glass-card p-8 opacity-0"
          >
            <h3 className="heading-md mb-6 text-primary">{benefits[0].title}</h3>
            <ul className="space-y-4">
              {benefits[0].items.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary mr-3 flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div 
            ref={customerRef} 
            className="glass-card p-8 opacity-0"
            style={{ animationDelay: '0.2s' }}
          >
            <h3 className="heading-md mb-6 text-primary">{benefits[1].title}</h3>
            <ul className="space-y-4">
              {benefits[1].items.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary mr-3 flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
