
import React from 'react';

const ProblemSolution: React.FC = () => {
  return (
    <section className="py-20 bg-white gsap-reveal" id="benefits">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-playfair font-bold text-primary mb-4">Why Switch to Sunnah Smile?</h2>
          <p className="text-lg text-primary/60 max-w-2xl mx-auto">Traditional modern oral care has hidden drawbacks that we often ignore. It's time for a smarter, natural choice.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* The Problem */}
          <div className="bg-red-50/50 p-10 rounded-3xl border border-red-100 transform transition-transform hover:scale-[1.02] duration-300">
            <h3 className="text-2xl font-bold text-red-800 mb-6 flex items-center">
              <i className="fa-solid fa-triangle-exclamation mr-3"></i> The Problem
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start">
                <div className="mt-1 mr-4 text-red-500"><i className="fa-solid fa-circle-xmark"></i></div>
                <div>
                  <p className="font-bold text-red-900">Chemical Concerns</p>
                  <p className="text-red-700/80">Many toothpastes contain SLS, parabens, and fluoride that can be harsh for long-term use.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mt-1 mr-4 text-red-500"><i className="fa-solid fa-circle-xmark"></i></div>
                <div>
                  <p className="font-bold text-red-900">Plastic Waste</p>
                  <p className="text-red-700/80">Billions of plastic toothbrushes end up in landfills and oceans every single year.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mt-1 mr-4 text-red-500"><i className="fa-solid fa-circle-xmark"></i></div>
                <div>
                  <p className="font-bold text-red-900">Ignoring Sunnah</p>
                  <p className="text-red-700/80">We often forget the simple, effective practices taught by the Prophet (SAW) for oral health.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* The Solution */}
          <div className="bg-emerald-50/50 p-10 rounded-3xl border border-emerald-100 transform transition-transform hover:scale-[1.02] duration-300">
            <h3 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center">
              <i className="fa-solid fa-circle-check mr-3"></i> The Solution
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start">
                <div className="mt-1 mr-4 text-emerald-600"><i className="fa-solid fa-star"></i></div>
                <div>
                  <p className="font-bold text-emerald-900">Miswak Infusion</p>
                  <p className="text-emerald-700/80">Our brushes integrate the natural antibacterial power of Salvadora persica (Miswak tree).</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mt-1 mr-4 text-emerald-600"><i className="fa-solid fa-leaf"></i></div>
                <div>
                  <p className="font-bold text-emerald-900">Sustainable Design</p>
                  <p className="text-emerald-700/80">Ergonomic handles made from biodegradable materials to minimize environmental impact.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mt-1 mr-4 text-emerald-600"><i className="fa-solid fa-mosque"></i></div>
                <div>
                  <p className="font-bold text-emerald-900">Faith-Aligned</p>
                  <p className="text-emerald-700/80">Fulfilling the Sunnah has never been easier or more hygienic in the modern world.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
