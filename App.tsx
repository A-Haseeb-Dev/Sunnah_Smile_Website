
import React, { useState, useEffect } from 'react';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Hero from './components/Widgets/Hero';
import ProblemSolution from './components/Widgets/ProblemSolution';
import HowItWorks from './components/Widgets/HowItWorks';
import Pricing from './components/Widgets/Pricing';
import ChatBot from './components/Shared/ChatBot';
import { Product, CartItem } from './types';
import { REVIEWS } from './constants';

declare const gsap: any;
declare const ScrollTrigger: any;

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Choreographed Hero Entrance Timeline
    const heroTl = gsap.timeline({ delay: 0.1 });
    
    heroTl.to(".hero-badge", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
      .to(".hero-title", { opacity: 1, y: 0, duration: 1, ease: "power4.out" }, "-=0.6")
      .to(".hero-description", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.8")
      .to(".hero-image-box", { opacity: 1, scale: 1, duration: 1.2, ease: "expo.out" }, "-=0.7")
      .to(".hero-feature-tag", { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" }, "-=0.8")
      .to(".hero-form-container", { opacity: 1, x: 0, duration: 1, ease: "power3.out" }, "-=1");

    // Scroll Triggered Revelations for subsequent sections
    // Note: We exclude hero elements from generic scroll reveal to avoid double animations
    const reveals = document.querySelectorAll('.gsap-reveal:not(.hero-content *)');
    reveals.forEach((el) => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none"
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      });
    });

    // Staggered lists/cards for scroll sections
    const staggers = ['benefits-card', 'pricing-card', 'review-card', 'trust-badge'];
    staggers.forEach(className => {
      const elements = document.querySelectorAll(`.${className}`);
      if (elements.length > 0) {
        gsap.to(elements, {
          scrollTrigger: {
            trigger: elements[0],
            start: "top 90%",
          },
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out"
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartCount={cart.reduce((s, i) => s + i.quantity, 0)} onOpenCart={() => setIsCartOpen(true)} />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Trust Badges */}
        <section className="bg-primary py-10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {[
                { icon: 'fa-globe', text: 'Global Shipping' },
                { icon: 'fa-hand-holding-heart', text: 'Sunnah Approved' },
                { icon: 'fa-award', text: 'Satisfaction Guaranteed' },
                { icon: 'fa-box', text: 'COD Available' }
              ].map((badge, idx) => (
                <div key={idx} className="trust-badge opacity-0 flex flex-col items-center text-center space-y-2 transform translate-y-8">
                  <i className={`fa-solid ${badge.icon} text-secondary/40 text-xl sm:text-2xl`}></i>
                  <p className="text-secondary font-semibold text-xs sm:text-sm">{badge.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cta rounded-full blur-[100px]"></div>
          </div>
        </section>

        <ProblemSolution />
        
        {/* Benefits Section */}
        <section className="py-16 sm:py-20 bg-secondary" id="benefits">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {[
                { icon: 'fa-bacteria', color: 'cta', title: 'Natural Antibacterial', desc: 'Miswak fibers release natural antimicrobial agents that kill harmful mouth bacteria.' },
                { icon: 'fa-leaf', color: 'accent', title: 'Eco-Friendly Design', desc: 'Made from biodegradable materials to ensure your smile doesn\'t cost the Earth.' },
                { icon: 'fa-face-smile', color: 'primary', title: 'Gentle on Gums', desc: 'Scientific bristle alignment that effectively cleans without causing gum irritation.' }
              ].map((benefit, i) => (
                <div key={i} className="benefits-card opacity-0 transform translate-y-12 text-center p-6 md:p-8 bg-white rounded-3xl border border-primary/5 hover:shadow-xl transition-shadow duration-300">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-${benefit.color}/10 rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <i className={`fa-solid ${benefit.icon} text-${benefit.color} text-xl sm:text-2xl`}></i>
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold mb-3">{benefit.title}</h4>
                  <p className="text-primary/70 text-sm sm:text-base">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <HowItWorks />
        
        <Pricing onAddToCart={addToCart} />

        {/* Reviews Section */}
        <section className="py-20 sm:py-24 bg-primary text-secondary overflow-hidden" id="reviews">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-12 sm:mb-16 gsap-reveal opacity-0 transform translate-y-10">
              <h2 className="text-3xl sm:text-4xl font-playfair font-bold mb-4">Trusted by Muslim Families</h2>
              <p className="text-sm sm:text-base opacity-70">See what our community says about their Sunnah Smile experience.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {REVIEWS.map(review => (
                <div key={review.id} className="review-card opacity-0 transform translate-y-12 bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <div className="flex text-cta mb-4">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className={`fa-solid fa-star text-xs sm:text-sm ${i >= review.rating ? 'opacity-30' : ''}`}></i>
                    ))}
                  </div>
                  <p className="italic mb-6 opacity-90 leading-relaxed text-sm sm:text-base">"{review.comment}"</p>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 sm:w-10 h-10 rounded-full bg-cta flex items-center justify-center font-bold text-sm">
                      {review.user[0]}
                    </div>
                    <div>
                      <p className="font-bold leading-none text-xs sm:text-sm">{review.user}</p>
                      <p className="text-[10px] sm:text-xs opacity-50 mt-1">{review.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 sm:py-20 bg-accent text-secondary relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10 gsap-reveal opacity-0 transform translate-y-10">
            <h3 className="text-2xl sm:text-3xl font-playfair font-bold mb-4">Get Sunnah Health Tips</h3>
            <p className="mb-8 sm:mb-10 opacity-80 text-sm sm:text-base">Join our newsletter for exclusive discounts and oral hygiene guides.</p>
            <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 px-5 sm:px-6 py-3 sm:py-4 rounded-xl text-primary outline-none focus:ring-4 focus:ring-secondary/20 transition-all text-sm sm:text-base"
                aria-label="Email address"
              />
              <button className="bg-secondary text-accent font-bold px-8 sm:px-10 py-3 sm:py-4 rounded-xl hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-xl text-sm sm:text-base whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        </section>
      </main>

      <Footer />

      {/* Floating Cart Drawer - Optimized for all screens */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute right-0 top-0 bottom-0 w-full sm:max-w-md bg-white shadow-2xl p-6 sm:p-8 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-8 sm:mb-10">
              <h3 className="text-xl sm:text-2xl font-bold text-primary">Your Cart</h3>
              <button onClick={() => setIsCartOpen(false)} className="text-primary hover:rotate-90 transition-transform p-2">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 sm:space-y-6 scrollbar-hide">
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <i className="fa-solid fa-cart-plus text-primary/10 text-5xl sm:text-6xl mb-4"></i>
                  <p className="text-primary/60 text-sm sm:text-base">Your cart is empty.</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-secondary/50 border border-primary/5 hover:border-cta transition-colors">
                    <img src={item.image} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg sm:rounded-xl" alt={item.name} />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-primary text-sm sm:text-base truncate pr-2">{item.name}</h4>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0">
                          <i className="fa-solid fa-trash-can text-xs sm:text-sm"></i>
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm text-primary/60 mt-1 font-medium">${item.price} x {item.quantity}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-primary/10 pt-6 sm:pt-8 mt-6 sm:mt-8">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <span className="text-primary/60 font-medium text-sm sm:text-base">Subtotal</span>
                  <span className="text-xl sm:text-2xl font-black text-primary">${total.toFixed(2)}</span>
                </div>
                <button className="w-full bg-cta text-white font-bold py-4 sm:py-5 rounded-xl sm:rounded-2xl shadow-lg hover:bg-emerald-700 transition-all hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base">
                  Checkout Now
                </button>
                <p className="text-center text-[10px] sm:text-xs text-primary/50 mt-4">Taxes and shipping calculated at checkout</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Contact Sidebar - Adaptive for Mobile */}
      <div className={`fixed bottom-24 right-4 sm:right-6 flex flex-col space-y-3 sm:space-y-4 z-[55] transition-all duration-300 ${isSidebarExpanded ? 'items-end' : 'items-center'}`}>
        <button 
          onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
          className="w-10 h-10 sm:w-12 sm:h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg sm:hidden hover:scale-110 active:scale-95 transition-all"
        >
          <i className={`fa-solid ${isSidebarExpanded ? 'fa-xmark' : 'fa-plus'} text-lg`}></i>
        </button>

        <div className={`flex flex-col space-y-3 sm:space-y-4 transition-all duration-300 ${isSidebarExpanded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90 pointer-events-none sm:opacity-100 sm:translate-y-0 sm:scale-100 sm:pointer-events-auto'}`}>
          {[
            { icon: 'fa-phone', color: 'bg-primary', link: 'tel:+1234567890', label: 'Call Support' },
            { icon: 'fa-envelope', color: 'bg-accent', link: 'mailto:support@sunnahsmile.com', label: 'Email Us' },
            { icon: 'fa-whatsapp', color: 'bg-[#25D366]', link: 'https://wa.me/yourwhatsapp', label: 'WhatsApp', isBrand: true },
            { icon: 'fa-instagram', color: 'bg-[#E4405F]', link: '#', label: 'Instagram', isBrand: true },
            { icon: 'fa-facebook-f', color: 'bg-[#1877F2]', link: '#', label: 'Facebook', isBrand: true },
            { icon: 'fa-linkedin-in', color: 'bg-[#0A66C2]', link: '#', label: 'LinkedIn', isBrand: true }
          ].map((contact, i) => (
            <a 
              key={i}
              href={contact.link} 
              className={`w-10 h-10 sm:w-12 sm:h-12 ${contact.color} text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all group relative`}
              title={contact.label}
              onClick={() => setIsSidebarExpanded(false)}
            >
              <i className={`${contact.isBrand ? 'fa-brands' : 'fa-solid'} ${contact.icon} ${contact.isBrand ? 'text-xl sm:text-2xl' : 'text-sm sm:text-xl'}`}></i>
              <span className={`absolute right-14 sm:right-16 px-3 py-1.5 rounded-lg text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-xl ${contact.color} hidden sm:block`}>
                {contact.label}
                <span className={`absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 ${contact.color}`}></span>
              </span>
            </a>
          ))}
        </div>
      </div>

      <ChatBot />
    </div>
  );
};

export default App;
