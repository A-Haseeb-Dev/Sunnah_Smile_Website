
import React, { useState, useEffect, useRef } from 'react';
import { CartItem } from '../../types';

declare const gsap: any;

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      
      const tl = gsap.timeline();
      
      tl.to(overlayRef.current, { opacity: 1, duration: 0.3, pointerEvents: 'auto' })
        .to(menuRef.current, { x: 0, duration: 0.5, ease: "power3.out" }, "-=0.2");

      if (linksRef.current) {
        gsap.fromTo(linksRef.current.children, 
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "back.out(1.2)", delay: 0.3 }
        );
      }
    } else {
      document.body.style.overflow = 'unset';
      
      const tl = gsap.timeline();
      tl.to(menuRef.current, { x: '100%', duration: 0.4, ease: "power3.in" })
        .to(overlayRef.current, { opacity: 0, duration: 0.3, pointerEvents: 'none' }, "-=0.2");
    }
  }, [isMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-secondary/95 backdrop-blur-md border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <div className="w-8 h-8 md:w-9 md:h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                <i className="fa-solid fa-tooth text-secondary text-sm md:text-base"></i>
              </div>
              <span className="text-xl md:text-2xl font-playfair font-bold text-primary tracking-tight">
                Sunnah<span className="text-accent italic">Smile</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex space-x-8 items-center">
              {['Shop', 'Benefits', 'Reviews', 'Wholesale'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="text-primary/70 font-bold hover:text-cta transition-colors text-[13px] tracking-widest uppercase"
                >
                  {item}
                </a>
              ))}
              
              <div className="h-6 w-px bg-primary/10 mx-2"></div>

              <button 
                onClick={onOpenCart}
                className="relative p-2 text-primary hover:text-cta transition-transform hover:scale-110"
                aria-label="Open Cart"
              >
                <i className="fa-solid fa-cart-shopping text-xl"></i>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-cta text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-secondary">
                    {cartCount}
                  </span>
                )}
              </button>
              <a 
                href="#shop" 
                className="bg-primary text-secondary px-6 py-2.5 rounded-xl font-bold hover:bg-cta hover:shadow-xl transition-all text-sm"
              >
                Buy Now
              </a>
            </nav>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center space-x-2">
              <button 
                onClick={onOpenCart}
                className="relative p-3 text-primary"
                aria-label="Open Cart"
              >
                <i className="fa-solid fa-cart-shopping text-xl"></i>
                {cartCount > 0 && (
                  <span className="absolute top-2 right-2 bg-cta text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="w-12 h-12 flex items-center justify-center text-primary"
                aria-label="Open Menu"
              >
                <i className="fa-solid fa-bars-staggered text-2xl"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Professional Drawer */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 z-[100] lg:hidden opacity-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-primary/30 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
        
        <div 
          ref={menuRef}
          className="absolute right-0 top-0 bottom-0 w-[85%] max-w-[320px] bg-secondary shadow-2xl flex flex-col transform translate-x-full"
        >
          {/* Header */}
          <div className="p-6 flex justify-between items-center border-b border-primary/5 bg-white/50">
            <span className="font-playfair font-bold text-primary text-xl">Navigation</span>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary/5 text-primary"
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>

          {/* Links with improved custom scrollbar */}
          <nav ref={linksRef} className="flex-1 overflow-y-auto px-6 py-8 space-y-4 custom-scrollbar">
            {[
              { label: 'Shop All', href: '#shop', icon: 'fa-bag-shopping' },
              { label: 'Sunnah Benefits', href: '#benefits', icon: 'fa-heart-pulse' },
              { label: 'How it Works', href: '#how-it-works', icon: 'fa-wand-magic-sparkles' },
              { label: 'Success Stories', href: '#reviews', icon: 'fa-star' },
              { label: 'Wholesale', href: '#wholesale', icon: 'fa-users-gear' }
            ].map((item) => (
              <a 
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-4 p-4 rounded-2xl bg-white border border-primary/5 hover:border-cta/20 hover:bg-cta/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-cta group-hover:text-white transition-all">
                  <i className={`fa-solid ${item.icon}`}></i>
                </div>
                <span className="font-bold text-primary group-hover:text-cta transition-colors">{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Drawer Footer */}
          <div className="p-8 bg-primary/5 border-t border-primary/10">
             <div className="flex space-x-4 mb-6">
                {['instagram', 'whatsapp', 'facebook-f'].map(soc => (
                  <a key={soc} href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary/60 shadow-sm">
                    <i className={`fa-brands fa-${soc}`}></i>
                  </a>
                ))}
             </div>
             <p className="text-xs text-primary/50 leading-relaxed italic">
               "Cleanliness is half of faith." — Prophet Muhammad (SAW)
             </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
