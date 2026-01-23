
import React from 'react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: 'fa-droplet',
      title: 'Wet the Brush',
      desc: 'Dip the Miswak-infused bristles in water for a few seconds.'
    },
    {
      icon: 'fa-tooth',
      title: 'Brush Normally',
      desc: 'No toothpaste needed! The Miswak bark does all the work.'
    },
    {
      icon: 'fa-sink',
      title: 'Rinse & Reuse',
      desc: 'Simply rinse with water and store in a dry, clean place.'
    },
    {
      icon: 'fa-rotate',
      title: 'Replace Head',
      desc: 'When bristles wear down, simply replace the head/brush.'
    }
  ];

  return (
    <section className="py-20 bg-secondary" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 gsap-reveal opacity-0 transform translate-y-10">
          <h2 className="text-4xl font-playfair font-bold text-primary mb-4">Simple to Use</h2>
          <p className="text-lg text-primary/60">Integrating tradition into your modern morning routine.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group gsap-reveal opacity-0 transform translate-y-12">
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-[2px] bg-primary/5 -z-10"></div>
              )}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-primary/5 text-center transition-all group-hover:-translate-y-2 group-hover:shadow-xl group-hover:border-cta/20">
                <div className="w-16 h-16 bg-cta/10 text-cta rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold transition-transform group-hover:scale-110">
                  <i className={`fa-solid ${step.icon}`}></i>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">Step {idx + 1}: {step.title}</h4>
                <p className="text-primary/70 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
