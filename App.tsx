
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

  useEffect(() => {
    // If GSAP is missing, ensure all sections are visible immediately
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      document.documentElement.classList.remove('js-enabled');
      return;
    }

    try {
      gsap.registerPlugin(ScrollTrigger);

      // 1. Hero Sequence: Elegant Entrance
      const heroTl = gsap.timeline({ 
        defaults: { ease: "expo.out" },
        delay: 0.2 
      });
      
      // Prepare initial positions
      gsap.set(".hero-badge", { y: -20, opacity: 0, visibility: 'visible' });
      gsap.set(".hero-title", { y: 40, opacity: 0, visibility: 'visible' });
      gsap.set(".hero-description", { y: 30, opacity: 0, visibility: 'visible' });
      gsap.set(".hero-feature-tag", { scale: 0.8, opacity: 0, visibility: 'visible' });
      gsap.set(".hero-image-box", { scale: 1.1, x: 50, opacity: 0, visibility: 'visible' });
      gsap.set(".hero-form-container", { x: 40, opacity: 0, visibility: 'visible' });

      heroTl
        .to(".hero-badge", { opacity: 1, y: 0, duration: 1.2 })
        .to(".hero-title", { opacity: 1, y: 0, duration: 1.5 }, "-=1")
        .to(".hero-description", { opacity: 1, y: 0, duration: 1.2 }, "-=1.2")
        .to(".hero-feature-tag", { opacity: 1, scale: 1, stagger: 0.1, duration: 0.8, ease: "back.out(1.7)" }, "-=0.8")
        .to(".hero-image-box", { opacity: 1, scale: 1, x: 0, duration: 2, ease: "power4.out" }, "-=1.5")
        .to(".hero-form-container", { opacity: 1, x: 0, duration: 1.5 }, "-=1.8");

      // 2. Grid Animation: Using Staggered Batching for "Wave" effect
      ScrollTrigger.batch(".gsap-reveal", {
        onEnter: (batch: any) => {
          gsap.fromTo(batch, 
            { opacity: 0, y: 50, visibility: 'visible' },
            { 
              opacity: 1, 
              y: 0, 
              duration: 1.2, 
              stagger: 0.15, 
              ease: "power3.out",
              overwrite: true 
            }
          );
        },
        start: "top 94%", // Safe trigger point
      });

      // 3. Background Spot Animations (Soft Parallax)
      gsap.to(".bg-spot", {
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
        },
        y: -150,
        x: 50,
        rotate: 15,
        scale: 1.2,
      });

      // 4. Critical Refresh: Recalculate positions after page settle
      const handleLoad = () => ScrollTrigger.refresh();
      window.addEventListener('load', handleLoad);
      
      // Secondary refresh for any dynamically sized components
      setTimeout(() => ScrollTrigger.refresh(), 1000);

      // 5. Fail-safe: Force content visible if animations take too long
      const timer = setTimeout(() => {
        document.documentElement.classList.remove('js-enabled');
        gsap.to(".gsap-reveal", { opacity: 1, y: 0, visibility: 'visible', overwrite: 'auto' });
      }, 3500);

      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(timer);
        ScrollTrigger.getAll().forEach((t: any) => t.kill());
      };

    } catch (err) {
      console.error("GSAP System Error:", err);
      document.documentElement.classList.remove('js-enabled');
    }
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
    <div className="min-h-screen flex flex-col bg-secondary overflow-x-hidden selection:bg-cta selection:text-white">
      <Header cartCount={cart.reduce((s, i) => s + i.quantity, 0)} onOpenCart={() => setIsCartOpen(true)} />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Fast Facts Bar - Immediate visibility usually looks better for these high-info bars */}
        <section className="bg-primary py-20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
             <div className="bg-spot absolute top-0 left-0 w-96 h-96 bg-cta rounded-full"></div>
             <div className="bg-spot absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {[
                { icon: 'fa-globe', text: 'Worldwide Express' },
                { icon: 'fa-mosque', text: 'Prophetic Tradition' },
                { icon: 'fa-award', text: 'Eco-Certified' },
                { icon: 'fa-box-open', text: 'Risk-Free Trial' }
              ].map((badge, idx) => (
                <div key={idx} className="gsap-reveal flex flex-col items-center text-center space-y-4 group">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-cta transition-all duration-500 transform group-hover:rotate-6 group-hover:scale-110">
                    <i className={`fa-solid ${badge.icon} text-cta group-hover:text-white text-2xl`}></i>
                  </div>
                  <p className="text-secondary font-black text-[11px] uppercase tracking-[0.25em]">{badge.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ProblemSolution />
        <HowItWorks />
        <Pricing onAddToCart={addToCart} />

        {/* Reviews Section */}
        <section className="py-24 sm:py-32 bg-primary text-secondary overflow-hidden relative" id="reviews">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-20 gsap-reveal">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold mb-6">Sunnah Smile Stories</h2>
              <p className="text-secondary/40 uppercase tracking-[0.3em] font-black text-xs">Join thousands of happy families</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {REVIEWS.map((review, i) => (
                <div key={review.id} className="gsap-reveal bg-white/5 p-10 rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all duration-500 group relative">
                  <div className="absolute top-8 right-10 text-cta/20 text-6xl font-serif">"</div>
                  <div className="flex text-cta mb-8 space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className={`fa-solid fa-star text-[10px] ${i >= review.rating ? 'opacity-20' : ''}`}></i>
                    ))}
                  </div>
                  <p className="italic mb-12 opacity-80 leading-relaxed font-medium text-lg">"{review.comment}"</p>
                  <div className="flex items-center space-x-4 border-t border-white/5 pt-8">
                    <div className="w-12 h-12 rounded-2xl bg-cta flex items-center justify-center font-black text-lg text-white transform group-hover:rotate-12 transition-transform">
                      {review.user[0]}
                    </div>
                    <div>
                      <p className="font-bold text-base text-white">{review.user}</p>
                      <p className="text-[10px] opacity-30 uppercase tracking-[0.15em] font-black">{review.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Modern Cart Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[110] overflow-hidden">
          <div className="absolute inset-0 bg-primary/60 backdrop-blur-md" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute right-0 top-0 bottom-0 w-full sm:max-w-md bg-white shadow-2xl p-8 sm:p-12 flex flex-col animate-in slide-in-from-right duration-500">
            <div className="flex justify-between items-center mb-12">
              <h3 className="text-3xl font-playfair font-bold text-primary">Your Basket</h3>
              <button onClick={() => setIsCartOpen(false)} className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="text-center py-32 text-primary/20">
                  <i className="fa-solid fa-basket-shopping text-8xl mb-8 opacity-5"></i>
                  <p className="font-black uppercase tracking-[0.2em] text-xs">Basket is currently empty</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex space-x-5 p-6 rounded-[2rem] bg-secondary border border-primary/5 group transition-all hover:shadow-lg">
                    <img src={item.image} className="w-24 h-24 object-cover rounded-2xl shadow-sm" alt={item.name} />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-primary text-lg leading-tight">{item.name}</h4>
                        <button onClick={() => removeFromCart(item.id)} className="text-primary/20 hover:text-red-500 transition-colors p-1">
                          <i className="fa-solid fa-trash-can text-sm"></i>
                        </button>
                      </div>
                      <p className="text-lg font-black text-cta font-playfair">${item.price.toFixed(2)}</p>
                      <div className="flex items-center space-x-2 mt-2">
                         <span className="text-[10px] text-primary/30 uppercase tracking-widest font-black">Quantity: {item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-primary/10 pt-10 mt-10">
                <div className="flex justify-between items-center mb-10">
                  <span className="text-primary/40 font-black uppercase tracking-[0.25em] text-[10px]">Grand Total</span>
                  <span className="text-5xl font-black text-primary font-playfair leading-none">${total.toFixed(2)}</span>
                </div>
                <button className="w-full bg-primary text-secondary font-black py-6 rounded-[1.5rem] shadow-2xl hover:bg-cta transition-all text-sm uppercase tracking-[0.25em] transform active:scale-95">
                  Confirm Order
                </button>
                <p className="text-center text-[10px] text-primary/30 font-bold uppercase tracking-widest mt-6 italic">
                  * Final pricing includes local taxes
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <ChatBot />
    </div>
  );
};

export default App;
