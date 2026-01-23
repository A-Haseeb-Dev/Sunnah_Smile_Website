
import React from 'react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';

interface PricingProps {
  onAddToCart: (p: Product) => void;
}

const Pricing: React.FC<PricingProps> = ({ onAddToCart }) => {
  return (
    <section className="py-16 sm:py-24 bg-white" id="shop">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 gsap-reveal opacity-0 transform translate-y-10">
          <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-primary mb-4">Choose Your Pack</h2>
          <p className="text-base sm:text-lg text-primary/60">Natural hygiene for you and your loved ones.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-sm sm:max-w-none mx-auto">
          {PRODUCTS.map((product) => (
            <div 
              key={product.id}
              className={`pricing-card opacity-0 transform translate-y-12 relative flex flex-col bg-secondary rounded-3xl overflow-hidden border ${product.tag ? 'border-cta ring-4 ring-cta/5 shadow-2xl shadow-cta/10' : 'border-primary/5'} shadow-lg transition-all duration-300 hover:-translate-y-2 lg:hover:-translate-y-3`}
            >
              {product.tag && (
                <div className="absolute top-0 right-0 bg-cta text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-bl-2xl sm:rounded-bl-3xl font-bold text-xs sm:text-sm z-10 shadow-md">
                  {product.tag}
                </div>
              )}
              
              <div className="h-40 sm:h-48 overflow-hidden group">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <h3 className="text-lg sm:text-2xl font-bold text-primary mb-2">{product.name}</h3>
                <p className="text-primary/60 mb-6 text-xs sm:text-sm leading-relaxed line-clamp-2">{product.description}</p>
                
                <div className="mb-6 sm:mb-8 flex items-baseline">
                  <span className="text-3xl sm:text-4xl font-black text-primary">${product.price}</span>
                  <span className="text-primary/40 ml-2 font-bold text-xs sm:text-sm uppercase tracking-wider">USD</span>
                </div>

                <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 flex-1">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-xs sm:text-sm font-medium text-primary/80">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 bg-cta/10 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                        <i className="fa-solid fa-check text-cta text-[8px] sm:text-[10px]"></i>
                      </div>
                      <span className="truncate">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => onAddToCart(product)}
                  className={`w-full py-3.5 sm:py-4 rounded-xl font-bold transition-all transform active:scale-95 text-sm sm:text-base ${
                    product.tag 
                      ? 'bg-cta text-white shadow-lg shadow-cta/30 hover:bg-emerald-700' 
                      : 'bg-primary text-white hover:bg-emerald-900'
                  }`}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 text-center gsap-reveal opacity-0 transform translate-y-10" id="wholesale">
          <div className="inline-flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 bg-secondary p-4 rounded-2xl border border-primary/5 shadow-sm max-w-full">
            <span className="text-accent font-bold text-sm sm:text-base">Interested in bulk?</span>
            <a href="https://wa.me/yourwhatsapp" className="text-cta font-bold hover:underline flex items-center group text-sm sm:text-base">
              Chat with Wholesale Team <i className="fa-solid fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
