
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
    // Check if gsap is loaded via script tag
    if (typeof gsap === 'undefined') {
      console.warn('GSAP not found. Animations disabled.');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Initial Hero Entrance
    const heroTl = gsap.timeline({ delay: 0.3 });
    
    heroTl.to(".hero-badge", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
      .to(".hero-title", { opacity: 1, y: 0, duration: 1, ease: "power4.out" }, "-=0.6")
      .to(".hero-description", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.8")
      .to(".hero-image-box", { opacity: 1, scale: 1, duration: 1.5, ease: "expo.out" }, "-=1")
      .to(".hero-feature-tag", { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" }, "-=1")
      .to(".hero-form-container", { opacity: 1, x: 0, duration: 1, ease: "power3.out" }, "-=1.2");

    // Generic Scroll Reveals
    const reveals = document.querySelectorAll('.gsap-reveal');
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
    <div className="min-h-screen flex flex-col bg-secondary overflow-x-hidden">
      <Header cartCount={cart.reduce((s, i) => s + i.quantity, 0)} onOpenCart={() => setIsCartOpen(true)} />
      
      <main className="flex-grow">
        <Hero />
        
        <section className="bg-primary py-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: 'fa-globe', text: 'Global Delivery' },
                { icon: 'fa-hand-holding-heart', text: 'Sunnah Driven' },
                { icon: 'fa-award', text: 'Premium Quality' },
                { icon: 'fa-box', text: 'Fast Checkout' }
              ].map((badge, idx) => (
                <div key={idx} className="flex flex-col items-center text-center space-y-2">
                  <i className={`fa-solid ${badge.icon} text-cta text-2xl`}></i>
                  <p className="text-secondary font-bold text-xs uppercase tracking-widest">{badge.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ProblemSolution />
        <HowItWorks />
        <Pricing onAddToCart={addToCart} />

        {/* Reviews */}
        <section className="py-24 bg-primary text-secondary" id="reviews">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-playfair font-bold mb-16 text-center gsap-reveal opacity-0 translate-y-8">Trusted by our Community</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {REVIEWS.map((review, i) => (
                <div key={review.id} className="gsap-reveal opacity-0 translate-y-8 bg-white/5 p-8 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-colors group">
                  <div className="flex text-cta mb-6">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className={`fa-solid fa-star text-sm ${i >= review.rating ? 'opacity-20' : ''}`}></i>
                    ))}
                  </div>
                  <p className="italic mb-8 opacity-80 leading-relaxed">"{review.comment}"</p>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-cta flex items-center justify-center font-bold text-sm text-white">
                      {review.user[0]}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{review.user}</p>
                      <p className="text-[10px] opacity-40 uppercase tracking-widest">{review.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[110] overflow-hidden">
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute right-0 top-0 bottom-0 w-full sm:max-w-md bg-white shadow-2xl p-8 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-2xl font-bold text-primary">Your Basket</h3>
              <button onClick={() => setIsCartOpen(false)} className="text-primary hover:rotate-90 transition-transform">
                <i className="fa-solid fa-xmark text-2xl"></i>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6">
              {cart.length === 0 ? (
                <div className="text-center py-20 text-primary/40">
                  <i className="fa-solid fa-cart-shopping text-6xl mb-4 opacity-10"></i>
                  <p>Your basket is empty.</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex space-x-4 p-4 rounded-2xl bg-secondary/50 border border-primary/5">
                    <img src={item.image} className="w-20 h-20 object-cover rounded-xl" alt={item.name} />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-primary">{item.name}</h4>
                        <button onClick={() => removeFromCart(item.id)} className="text-primary/30 hover:text-red-500">
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                      <p className="text-sm text-primary/60 mt-1">${item.price} x {item.quantity}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-primary/10 pt-8 mt-8">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-primary/60 font-bold">Subtotal</span>
                  <span className="text-2xl font-black text-primary">${total.toFixed(2)}</span>
                </div>
                <button className="w-full bg-cta text-white font-bold py-5 rounded-2xl shadow-xl hover:bg-emerald-700 transition-all">
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
