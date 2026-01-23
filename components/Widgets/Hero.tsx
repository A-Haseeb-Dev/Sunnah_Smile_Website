
import React, { useState } from 'react';

const Hero: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    quantity: '1',
    miswakType: 'Arak'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Order received! Thank you ${formData.name}. Our team will contact you shortly.`);
  };

  return (
    <section className="relative pt-10 pb-20 lg:pt-24 lg:pb-44 bg-secondary overflow-hidden">
      {/* Editorial Background Element */}
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-primary/[0.02] -z-0 hidden lg:block rounded-l-[10rem]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Content Left: High-End Typography & Social Proof */}
          <div className="w-full lg:w-3/5 text-center lg:text-left">
            <div className="hero-badge inline-flex items-center space-x-3 bg-white px-5 py-2.5 rounded-full mb-10 shadow-sm border border-primary/5">
              <div className="flex text-cta">
                {[...Array(5)].map((_, i) => <i key={i} className="fa-solid fa-star text-[10px]"></i>)}
              </div>
              <span className="text-[11px] font-extrabold text-primary/60 uppercase tracking-[0.15em]">
                Rated 4.9/5 by 10k+ Families
              </span>
            </div>
            
            <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-playfair font-bold text-primary leading-[1.1] tracking-tight mb-8">
              A Healthier Smile, <br />
              <span className="text-cta italic font-normal">the Sunnah Way.</span>
            </h1>
            
            <p className="hero-description text-lg md:text-xl text-primary/60 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Revolutionizing oral care by combining Prophetic wisdom with modern dental science. Clinically proven to reduce plaque naturally.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-14">
              {[
                { label: 'Antibacterial', icon: 'fa-shield-virus' },
                { label: 'Plastic-Free', icon: 'fa-leaf' },
                { icon: 'fa-moon', label: '100% Sunnah' }
              ].map((item, i) => (
                <div key={i} className="hero-feature-tag flex items-center space-x-3 bg-white/80 backdrop-blur-md px-5 py-3 rounded-2xl shadow-sm border border-primary/5">
                  <i className={`fa-solid ${item.icon} text-cta text-sm`}></i>
                  <span className="text-xs font-black text-primary/80 uppercase tracking-wider">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Visual Social Proof */}
            <div className="flex items-center justify-center lg:justify-start space-x-8 opacity-40 grayscale pointer-events-none border-t border-primary/5 pt-10">
               <span className="font-playfair font-bold text-xl">MuslimDaily</span>
               <span className="font-bold text-lg">EcoHealth</span>
               <span className="font-playfair italic text-xl">PropheticPath</span>
            </div>
          </div>

          {/* Right Area: Interactive Form Card */}
          <div className="w-full lg:w-[440px] relative">
            <div className="hero-form-container relative z-20 bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(6,78,59,0.12)] p-8 sm:p-12 border border-primary/5">
              <div className="absolute top-0 right-12 w-24 h-1.5 bg-cta rounded-b-full"></div>
              
              <div className="mb-10 text-center">
                <h3 className="text-2xl font-bold text-primary mb-2">Claim Your Pack</h3>
                <p className="text-sm text-primary/40 font-bold uppercase tracking-widest">Free Shipping • COD Available</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <input 
                  type="text" 
                  required
                  placeholder="Your Full Name"
                  className="w-full px-6 py-4 rounded-2xl bg-secondary border border-primary/10 text-primary placeholder:text-primary/30 focus:bg-white focus:ring-4 focus:ring-cta/5 focus:border-cta outline-none transition-all font-semibold"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <input 
                  type="text" 
                  required
                  placeholder="Email or WhatsApp"
                  className="w-full px-6 py-4 rounded-2xl bg-secondary border border-primary/10 text-primary placeholder:text-primary/30 focus:bg-white focus:ring-4 focus:ring-cta/5 focus:border-cta outline-none transition-all font-semibold"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <div className="relative">
                  <select 
                    className="w-full px-6 py-4 rounded-2xl bg-secondary border border-primary/10 text-primary focus:bg-white outline-none transition-all appearance-none cursor-pointer font-bold"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  >
                    <option value="1">1x Sunnah Smile ($15.99)</option>
                    <option value="4">4x Family Pack ($49.99)</option>
                    <option value="20">20x Wholesale ($199.99)</option>
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-primary/30">
                    <i className="fa-solid fa-chevron-down text-xs"></i>
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-primary text-secondary font-black py-5 rounded-2xl shadow-xl shadow-primary/20 hover:bg-cta hover:shadow-cta/30 hover:-translate-y-1 active:translate-y-0 transition-all text-base uppercase tracking-widest mt-4"
                >
                  Order Now
                </button>
                
                <p className="text-[10px] text-center font-bold text-primary/30 uppercase tracking-[0.2em] mt-6">
                   <i className="fa-solid fa-shield-halved mr-2 text-cta"></i> Satisfaction Guaranteed
                </p>
              </form>
            </div>

            {/* Desktop-only Image Stack */}
            <div className="hero-image-box hidden xl:block absolute -left-48 -bottom-16 w-[320px] h-[400px] z-10 pointer-events-none">
              <div className="relative w-full h-full animate-float">
                <div className="absolute inset-0 bg-cta/10 rounded-[3rem] blur-[60px]"></div>
                <img 
                  src="https://images.unsplash.com/photo-1559591937-e43590f0ca1d?auto=format&fit=crop&q=80&w=600" 
                  className="relative z-10 w-full h-full object-cover rounded-[3rem] shadow-2xl border-[10px] border-white transform -rotate-6" 
                  alt="Product"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
