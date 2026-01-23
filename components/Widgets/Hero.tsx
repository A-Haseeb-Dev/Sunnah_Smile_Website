
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
    alert(`Thank you ${formData.name}! Redirecting to checkout...`);
  };

  return (
    <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-40 overflow-hidden bg-secondary">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 -z-0 w-[60%] h-full bg-primary/[0.02] rounded-l-[200px] hidden lg:block transform translate-x-20"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-0 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-[10%] right-[10%] w-96 h-96 bg-cta/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] left-[5%] w-80 h-80 bg-accent/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
          
          {/* Text Content Area */}
          <div className="w-full lg:flex-1 text-center lg:text-left">
            {/* Social Proof Badge */}
            <div className="hero-badge opacity-0 translate-y-8 inline-flex items-center space-x-3 bg-white px-4 py-2 rounded-full mb-8 shadow-sm border border-primary/5">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-cta/20 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                  </div>
                ))}
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-primary/60 uppercase tracking-widest">
                Trusted by <span className="text-primary">12,000+</span> Families
              </span>
            </div>
            
            <h1 className="hero-title opacity-0 translate-y-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-playfair font-bold text-primary leading-[1.05] tracking-tight mb-8">
              The Purest <br className="hidden lg:block" />
              <span className="text-cta italic font-normal">Sunnah</span> Smile.
            </h1>
            
            <p className="hero-description opacity-0 translate-y-8 text-lg md:text-xl text-primary/60 mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Ancient Miswak wisdom meets modern hygiene. Our clinically-proven, eco-friendly brushes bring the Prophetic tradition into your daily routine.
            </p>

            {/* Feature Tags Grid */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mb-12">
              {[
                { icon: 'fa-moon', label: '100% Sunnah', color: 'accent' },
                { icon: 'fa-vial', label: 'Antibacterial', color: 'cta' },
                { icon: 'fa-leaf', label: 'Eco-Friendly', color: 'primary' },
                { icon: 'fa-shield-heart', label: 'Gum Safe', color: 'accent' }
              ].map((f, i) => (
                <div key={i} className="hero-feature-tag opacity-0 translate-y-8 flex items-center space-x-2.5 bg-white/80 backdrop-blur-md px-4 py-3 rounded-2xl shadow-sm border border-primary/5 hover:border-cta/20 transition-all cursor-default">
                  <div className={`w-8 h-8 rounded-lg bg-${f.color}/10 flex items-center justify-center`}>
                    <i className={`fa-solid ${f.icon} text-${f.color} text-xs`}></i>
                  </div>
                  <span className="text-xs font-extrabold text-primary/80 whitespace-nowrap">{f.label}</span>
                </div>
              ))}
            </div>

            {/* Client Logos / Trust Section */}
            <div className="pt-8 border-t border-primary/5 hidden sm:block">
               <p className="text-[10px] font-bold text-primary/30 uppercase tracking-[0.2em] mb-6">As Featured & Recommended by</p>
               <div className="flex items-center justify-center lg:justify-start space-x-8 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                  <span className="font-playfair font-bold text-xl">MuslimHealth</span>
                  <span className="font-bold text-lg">EcoDental</span>
                  <span className="font-playfair italic text-xl">TheSunnahWay</span>
               </div>
            </div>
          </div>

          {/* Right Section: Form + Visual Layer */}
          <div className="w-full lg:w-[450px] relative">
            {/* Order Card */}
            <div className="hero-form-container opacity-0 translate-x-12 relative z-20 bg-white rounded-[2.5rem] shadow-2xl p-8 sm:p-10 border border-primary/5">
              <div className="absolute top-0 right-10 w-20 h-1.5 bg-cta rounded-b-full"></div>
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-primary mb-2">Reserve Yours</h3>
                <p className="text-sm text-primary/40 font-medium">Fast checkout with Cash on Delivery</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="group">
                  <input 
                    type="text" 
                    required
                    placeholder="Full Name"
                    className="w-full px-6 py-4 rounded-2xl bg-secondary border border-primary/5 text-primary placeholder:text-primary/30 focus:bg-white focus:ring-4 focus:ring-cta/5 focus:border-cta/30 outline-none transition-all duration-300 font-semibold"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="group">
                  <input 
                    type="text" 
                    required
                    placeholder="Email or WhatsApp Number"
                    className="w-full px-6 py-4 rounded-2xl bg-secondary border border-primary/5 text-primary placeholder:text-primary/30 focus:bg-white focus:ring-4 focus:ring-cta/5 focus:border-cta/30 outline-none transition-all duration-300 font-semibold"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="relative">
                  <select 
                    className="w-full px-6 py-4 rounded-2xl bg-secondary border border-primary/5 text-primary focus:bg-white outline-none transition-all appearance-none cursor-pointer font-semibold"
                    value={formData.miswakType}
                    onChange={(e) => setFormData({...formData, miswakType: e.target.value})}
                  >
                    <option value="Arak">Arak (Salvadora persica)</option>
                    <option value="Neem">Neem Extract Core</option>
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-primary/30">
                    <i className="fa-solid fa-chevron-down text-xs"></i>
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-primary text-secondary font-black py-5 rounded-2xl shadow-xl shadow-primary/20 hover:bg-cta hover:shadow-cta/30 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 text-lg uppercase tracking-widest mt-4"
                >
                  Order Now
                </button>
                <div className="flex items-center justify-center space-x-2 mt-6">
                  <i className="fa-solid fa-shield-check text-cta text-sm"></i>
                  <span className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Secure SSL Encrypted Checkout</span>
                </div>
              </form>
            </div>

            {/* Floating Graphic Element (Desktop) */}
            <div className="hero-image-box opacity-0 scale-95 hidden xl:block absolute -right-32 top-1/2 -translate-y-1/2 w-[400px] h-[500px] -z-10">
               <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-cta/10 rounded-[4rem] blur-[80px]"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1559591937-e43590f0ca1d?auto=format&fit=crop&q=80&w=1200" 
                    className="relative z-10 w-full h-full object-cover rounded-[4rem] shadow-2xl border-[12px] border-white transform rotate-3 hover:rotate-0 transition-transform duration-700" 
                    alt="Sunnah Smile Product"
                  />
                  {/* Floating Micro-UI */}
                  <div className="absolute -left-12 bottom-12 z-20 bg-white/90 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-primary/5 animate-bounce-slow">
                     <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-cta flex items-center justify-center text-white">
                           <i className="fa-solid fa-check"></i>
                        </div>
                        <div>
                           <p className="text-[10px] font-bold text-primary/40 uppercase">Quality Grade</p>
                           <p className="text-sm font-black text-primary">Certified Arak</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
