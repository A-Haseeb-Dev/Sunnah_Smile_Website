
import React from 'react';
import { PRODUCTS } from '../../constants';
import { Product } from '../../types';

interface PricingProps {
  onAddToCart: (p: Product) => void;
}

const Pricing: React.FC<PricingProps> = ({ onAddToCart }) => {
  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden" id="shop">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
         <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cta/10 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-24 gsap-reveal">
          <div className="inline-flex items-center space-x-2 px-4 py-2 mb-8 bg-primary/5 rounded-full border border-primary/10">
            <i className="fa-solid fa-sparkles text-cta text-xs"></i>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">The New Standard</span>
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-8xl font-playfair font-bold text-primary mb-10 tracking-tighter leading-[0.9]">
            The <span className="text-cta italic font-normal">Smile</span> <br className="sm:hidden" /> Collections
          </h2>
          <p className="text-xl text-primary/40 max-w-xl mx-auto leading-relaxed font-medium">
            Meticulously crafted bundles for every lifestyle. Choose your path to prophetic oral hygiene.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {PRODUCTS.map((product) => {
            const isBestSeller = product.tag === 'BEST SELLER';
            
            return (
              <div 
                key={product.id}
                className="perspective-card gsap-reveal h-full"
              >
                <div 
                  className={`perspective-content relative flex flex-col h-full bg-secondary rounded-[3.5rem] overflow-hidden border transition-all duration-500
                    ${isBestSeller 
                      ? 'border-cta/40 aura-best-seller shadow-2xl' 
                      : 'border-primary/5 shadow-xl hover:shadow-2xl'
                    }`}
                >
                  {/* Luxury Best Seller Tag */}
                  {isBestSeller && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30">
                      <div className="bg-cta text-white px-8 py-2 rounded-b-3xl font-black text-[9px] tracking-[0.3em] uppercase shadow-lg shadow-cta/30">
                        <i className="fa-solid fa-crown mr-2"></i> Featured Selection
                      </div>
                    </div>
                  )}

                  {/* Image Hero with Dynamic Mask */}
                  <div className="relative h-72 group-hover:h-80 transition-all duration-700 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-90"></div>
                    
                    {/* Floating Glass Price Box */}
                    <div className="absolute bottom-8 left-8 right-8 z-20">
                      <div className="bg-white/40 backdrop-blur-xl border border-white/40 rounded-3xl p-6 flex items-center justify-between shadow-xl">
                        <div>
                          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/40 mb-1">One-Time Pack</p>
                          <div className="flex items-baseline">
                             <span className="text-primary text-sm font-bold mr-1">$</span>
                             <span className="text-4xl font-black text-primary font-playfair tracking-tighter leading-none">{Math.floor(product.price)}</span>
                             <span className="text-primary/30 text-xs font-bold ml-1">.{String(product.price % 1).padEnd(2, '0').slice(2)}</span>
                          </div>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-cta flex items-center justify-center text-white shadow-lg shadow-cta/20 group-hover:rotate-12 transition-transform">
                          <i className="fa-solid fa-plus"></i>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-10 pt-2 flex-1 flex flex-col">
                    <h3 className="text-3xl font-playfair font-bold text-primary mb-4 group-hover:text-cta transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-primary/50 text-sm leading-relaxed mb-10 font-medium">
                      {product.description}
                    </p>
                    
                    {/* Features with Individual Hover Pings */}
                    <ul className="space-y-4 mb-12 flex-1">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-center group/item">
                          <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center mr-4 transition-all group-hover/item:bg-cta group-hover/item:scale-110 group-hover/item:rotate-6">
                            <i className="fa-solid fa-check text-cta group-hover/item:text-white text-xs"></i>
                          </div>
                          <span className="text-xs font-bold text-primary/70 tracking-tight transition-colors group-hover/item:text-primary">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Interactive High-End Button */}
                    <button 
                      onClick={() => onAddToCart(product)}
                      className={`shimmer-effect group/btn relative w-full py-6 rounded-[2rem] font-black transition-all transform active:scale-95 text-[11px] uppercase tracking-[0.3em] overflow-hidden
                        ${isBestSeller 
                          ? 'bg-cta text-white shadow-2xl shadow-cta/40 hover:bg-emerald-700' 
                          : 'bg-primary text-secondary shadow-xl shadow-primary/10 hover:bg-emerald-900'
                        }`}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        Add to Basket
                        <i className="fa-solid fa-arrow-right ml-3 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all"></i>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Final Reassurance Note */}
        <div className="mt-28 text-center gsap-reveal">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/30 mb-8">Trusted by families in 40+ countries</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
             <i className="fa-brands fa-cc-visa text-3xl"></i>
             <i className="fa-brands fa-cc-mastercard text-3xl"></i>
             <i className="fa-brands fa-cc-paypal text-3xl"></i>
             <i className="fa-brands fa-cc-apple-pay text-3xl"></i>
             <i className="fa-brands fa-google-pay text-3xl"></i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
