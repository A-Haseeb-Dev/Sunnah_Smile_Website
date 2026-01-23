
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
    // If GSAP is missing, the elements will show normally due to our CSS logic
    if (typeof gsap === 'undefined') return;

    try {
      gsap.registerPlugin(ScrollTrigger);

      // Professional Choreographed Entrance
      const heroTl = gsap.timeline({ delay: 0.2 });
      
      heroTl.fromTo(".hero-badge", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
        .fromTo(".hero-title", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power4.out" }, "-=0.6")
        .fromTo(".hero-description", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.8")
        .fromTo(".hero-image-box", { opacity: 0, scale: 0.9, x: -50 }, { opacity: 1, scale: 1, x: 0, duration: 1.5, ease: "expo.out" }, "-=1")
        .fromTo(".hero-feature-tag", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" }, "-=1")
        .fromTo(".hero-form-container", { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" }, "-=1.4");

      // Generic Scroll Reveals for the rest of the page
      gsap.utils.toArray('.gsap-reveal').forEach((el: any) => {
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
    } catch (err) {
      console.error("Animation engine error:", err);
      // Fallback: manually show elements if GSAP breaks midway
      document.querySelectorAll('.gsap-reveal, .hero-badge, .hero-title, .hero-description, .hero-image-box, .hero-form-container').forEach((el: any) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    }

    return () => {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach((t: any) => t.kill());
      }
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
    <div className="min-h-screen flex flex-col bg-secondary overflow-x-hidden selection:bg-cta selection:text-white">
      <Header cartCount={cart.reduce((s, i) => s + i.quantity, 0)} onOpenCart={() => setIsCartOpen(true)} />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Fast Facts Bar */}
        <section className="bg-primary py-14 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
              {[
                { icon: 'fa-globe', text: 'Fast Worldwide Shipping' },
                { icon: 'fa-heart-circle-check', text: '100% Eco-Friendly' },
                { icon: 'fa-award', text: 'Prophetic Tradition' },
                { icon: 'fa-box-open', text: 'Hassle-Free Returns' }
              ].map((badge, idx) => (
                <div key={idx} className="flex flex-col items-center text-center space-y-3 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-cta transition-colors duration-300">
                    <i className={`fa-solid ${badge.icon} text-cta group-hover:text-white text-xl`}></i>
                  </div>
                  <p className="text-secondary font-black text-[10px] uppercase tracking-widest">{badge.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ProblemSolution />
        <HowItWorks />
        <Pricing onAddToCart={addToCart} />

        {/* Reviews Section */}
        <section className="py-24 bg-primary text-secondary" id="reviews">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16 gsap-reveal opacity-0">
              <h2 className="text-4xl sm:text-5xl font-playfair font-bold mb-4">Voices of Our Community</h2>
              <p className="text-secondary/60 uppercase tracking-widest font-bold text-xs">Join the movement toward natural oral health</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {REVIEWS.map((review, i) => (
                <div key={review.id} className="gsap-reveal opacity-0 bg-white/5 p-10 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all group">
                  <div className="flex text-cta mb-6">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className={`fa-solid fa-star text-sm ${i >= review.rating ? 'opacity-20' : ''}`}></i>
                    ))}
                  </div>
                  <p className="italic mb-10 opacity-80 leading-relaxed font-medium">"{review.comment}"</p>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-cta flex items-center justify-center font-bold text-lg text-white">
                      {review.user[0]}
                    </div>
                    <div>
                      <p className="font-bold text-base">{review.user}</p>
                      <p className="text-[10px] opacity-40 uppercase tracking-widest font-black">{review.location}</p>
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
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-md" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute right-0 top-0 bottom-0 w-full sm:max-w-md bg-white shadow-2xl p-8 sm:p-12 flex flex-col animate-in slide-in-from-right duration-500">
            <div className="flex justify-between items-center mb-12">
              <h3 className="text-3xl font-playfair font-bold text-primary">Your Basket</h3>
              <button onClick={() => setIsCartOpen(false)} className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary hover:rotate-90 transition-all">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6 pr-2">
              {cart.length === 0 ? (
                <div className="text-center py-24 text-primary/20">
                  <i className="fa-solid fa-cart-shopping text-7xl mb-6 opacity-10"></i>
                  <p className="font-bold uppercase tracking-widest">Basket is empty</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex space-x-5 p-5 rounded-3xl bg-secondary border border-primary/5 group">
                    <img src={item.image} className="w-24 h-24 object-cover rounded-2xl shadow-sm" alt={item.name} />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-primary leading-tight">{item.name}</h4>
                        <button onClick={() => removeFromCart(item.id)} className="text-primary/20 hover:text-red-500 transition-colors">
                          <i className="fa-solid fa-trash-can text-sm"></i>
                        </button>
                      </div>
                      <p className="text-sm font-black text-cta">${item.price.toFixed(2)}</p>
                      <p className="text-xs text-primary/40 mt-1 uppercase tracking-widest font-bold">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-primary/10 pt-10 mt-10">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-primary/40 font-black uppercase tracking-widest text-xs">Total Amount</span>
                  <span className="text-4xl font-black text-primary font-playfair">${total.toFixed(2)}</span>
                </div>
                <button className="w-full bg-primary text-secondary font-black py-6 rounded-2xl shadow-2xl hover:bg-cta transition-all text-sm uppercase tracking-[0.2em]">
                  Proceed to Checkout
                </button>
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
