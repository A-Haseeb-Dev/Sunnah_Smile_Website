
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
    alert(`Thank you ${formData.name}! Redirecting to checkout for ${formData.quantity} pack(s) of ${formData.miswakType} miswak...`);
  };

  return (
    <section className="relative pt-8 pb-16 lg:pt-20 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          
          {/* Content Left */}
          <div className="w-full lg:flex-1 text-center lg:text-left z-10 hero-content">
            <div className="hero-badge gsap-reveal opacity-0 inline-flex items-center space-x-2 bg-primary/5 px-4 py-2 rounded-full mb-6 border border-primary/10">
              <span className="flex h-2 w-2 rounded-full bg-cta animate-pulse"></span>
              <span className="text-primary text-xs md:text-sm font-semibold uppercase tracking-wider">Premium Miswak Brushes</span>
            </div>
            <h1 className="hero-title gsap-reveal opacity-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold text-primary leading-tight mb-6">
              Revive the Sunnah. <br className="hidden sm:block" />
              <span className="text-cta">Protect Your Smile Naturally.</span>
            </h1>
            <p className="hero-description gsap-reveal opacity-0 text-base md:text-lg lg:text-xl text-primary/80 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Miswak-powered toothbrush for healthier teeth & a cleaner planet. Join thousands of families choosing faith-driven hygiene.
            </p>

            {/* Product Image Highlight */}
            <div className="hero-image-box gsap-reveal opacity-0 relative mb-12 lg:mb-0 group max-w-sm sm:max-w-md mx-auto lg:mx-0 px-4">
               <div className="absolute inset-0 bg-cta/5 rounded-full blur-[60px] md:blur-[80px] group-hover:bg-cta/10 transition-colors"></div>
               <img 
                src="https://images.unsplash.com/photo-1559591937-e43590f0ca1d?auto=format&fit=crop&q=80&w=800" 
                alt="Sunnah Smile Premium Brush" 
                className="relative z-10 w-full aspect-[4/3] sm:aspect-auto sm:h-64 object-cover rounded-[2rem] md:rounded-[3rem] shadow-2xl border-4 border-white transform -rotate-2 sm:-rotate-3 group-hover:rotate-0 transition-transform duration-500"
               />
               <div className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-6 bg-accent text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl z-20 transform rotate-3 sm:rotate-6">
                 <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">100% Organic</p>
                 <p className="text-sm sm:text-lg font-playfair">Miswak Fiber</p>
               </div>
            </div>
            
            <div className="hero-features flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mb-10 mt-10 md:mt-12">
              {[
                { icon: 'fa-moon', color: 'text-accent', label: 'Sunnah-based' },
                { icon: 'fa-leaf', color: 'text-cta', label: 'Eco-friendly' },
                { icon: 'fa-truck-fast', color: 'text-primary', label: 'COD Available' }
              ].map((f, i) => (
                <div key={i} className="hero-feature-tag gsap-reveal opacity-0 flex items-center space-x-2 bg-white px-3 sm:px-4 py-2 rounded-lg shadow-sm border border-primary/10 hover:border-cta transition-colors cursor-default whitespace-nowrap">
                  <i className={`fa-solid ${f.icon} ${f.color} text-sm`}></i>
                  <span className="text-xs sm:text-sm font-semibold">{f.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* POS Form Right */}
          <div className="w-full lg:w-[400px] xl:w-[420px] z-10 hero-form-container gsap-reveal opacity-0">
            <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-2xl p-6 sm:p-8 border border-primary/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-cta"></div>
              <h3 className="text-xl md:text-2xl font-bold text-primary mb-6 text-center">Quick Order Form</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-primary/50 uppercase tracking-widest mb-1.5 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Abdullah Ahmed"
                    className="w-full px-4 md:px-5 py-3 md:py-3.5 rounded-xl md:rounded-2xl bg-[#F9F7F2] border border-primary/10 text-primary placeholder:text-primary/30 focus:bg-white focus:ring-4 focus:ring-cta/10 focus:border-cta outline-none transition-all duration-200 text-sm md:text-base"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-primary/50 uppercase tracking-widest mb-1.5 ml-1">Email or Phone</label>
                  <input 
                    type="text" 
                    required
                    placeholder="For order tracking"
                    className="w-full px-4 md:px-5 py-3 md:py-3.5 rounded-xl md:rounded-2xl bg-[#F9F7F2] border border-primary/10 text-primary placeholder:text-primary/30 focus:bg-white focus:ring-4 focus:ring-cta/10 focus:border-cta outline-none transition-all duration-200 text-sm md:text-base"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-primary/50 uppercase tracking-widest mb-1.5 ml-1">Miswak Source</label>
                  <div className="relative">
                    <select 
                      className="w-full px-4 md:px-5 py-3 md:py-3.5 rounded-xl md:rounded-2xl bg-[#F9F7F2] border border-primary/10 text-primary focus:bg-white focus:ring-4 focus:ring-cta/10 focus:border-cta outline-none transition-all duration-200 appearance-none cursor-pointer text-sm md:text-base"
                      value={formData.miswakType}
                      onChange={(e) => setFormData({...formData, miswakType: e.target.value})}
                    >
                      <option value="Arak">Arak (Salvadora persica)</option>
                      <option value="Neem">Neem (Azadirachta indica)</option>
                      <option value="Olive">Olive (Zaitoon / Olea europaea)</option>
                      <option value="Walnut">Walnut (Juglans regia)</option>
                      <option value="Other">Other Sources (Kikar, Citrus)</option>
                    </select>
                    <div className="absolute right-4 md:right-5 top-1/2 -translate-y-1/2 pointer-events-none text-primary/40">
                      <i className="fa-solid fa-chevron-down text-xs"></i>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-primary/50 uppercase tracking-widest mb-1.5 ml-1">Quantity</label>
                  <div className="relative">
                    <select 
                      className="w-full px-4 md:px-5 py-3 md:py-3.5 rounded-xl md:rounded-2xl bg-[#F9F7F2] border border-primary/10 text-primary focus:bg-white focus:ring-4 focus:ring-cta/10 focus:border-cta outline-none transition-all duration-200 appearance-none cursor-pointer text-sm md:text-base"
                      value={formData.quantity}
                      onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    >
                      <option value="1">1 Pack (Single)</option>
                      <option value="4">4 Pack (Family - Save 20%)</option>
                      <option value="20">20 Pack (Wholesale)</option>
                    </select>
                    <div className="absolute right-4 md:right-5 top-1/2 -translate-y-1/2 pointer-events-none text-primary/40">
                      <i className="fa-solid fa-chevron-down text-xs"></i>
                    </div>
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-cta text-white font-bold py-3.5 md:py-4.5 rounded-xl md:rounded-2xl shadow-xl shadow-cta/20 hover:bg-cta/90 hover:-translate-y-0.5 active:translate-y-0 transition-all text-base md:text-lg mt-4"
                >
                  Buy Now – Cash on Delivery
                </button>
                <p className="text-[10px] font-bold text-center text-primary/40 mt-4 uppercase tracking-tighter">
                  <i className="fa-solid fa-award mr-1 text-cta"></i> Satisfaction Guaranteed • Secure Transaction
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 -z-10 w-1/3 h-full bg-primary/5 rounded-l-[100px] hidden lg:block"></div>
      <div className="absolute bottom-10 left-10 -z-10 w-24 md:w-32 h-24 md:h-32 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 right-1/4 -z-10 w-48 md:w-64 h-48 md:h-64 bg-cta/5 rounded-full blur-[80px] md:blur-[100px]"></div>
    </section>
  );
};

export default Hero;
