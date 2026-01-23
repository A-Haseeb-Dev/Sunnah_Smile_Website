
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
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMenuOpen) {
      // Lock body scroll
      document.body.style.overflow = 'hidden';
      
      // Animate menu in
      gsap.to(menuRef.current, {
        x: 0,
        duration: 0.5,
        ease: "power3.out"
      });

      // Stagger links
      if (linksRef.current) {
        gsap.fromTo(linksRef.current.children, 
          { x: 20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "back.out(1.7)", delay: 0.2 }
        );
      }
    } else {
      document.body.style.overflow = 'unset';
      if (menuRef.current) {
        gsap.to(menuRef.current, {
          x: '100%',
          duration: 0.4,
          ease: "power3.in"
        });
      }
    }
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-secondary/95 backdrop-blur-md border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
              <div className="w-8 h-8 md:w-9 md:h-9 bg-primary rounded-xl flex items-center justify-center shadow-sm">
                <i className="fa-solid fa-tooth text-secondary text-sm md:text-base"></i>
              </div>
              <span className="text-xl md:text-2xl font-playfair font-bold text-primary tracking-tight whitespace-nowrap">
                Sunnah<span className="text-accent italic">Smile</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex space-x-8 items-center">
              {['Shop', 'Benefits', 'Reviews', 'Wholesale', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="text-primary/70 font-semibold hover:text-cta transition-colors text-sm tracking-wide uppercase"
                >
                  {item}
                </a>
              ))}
              
              <div className="h-6 w-px bg-primary/10 mx-2"></div>

              <button 
                onClick={onOpenCart}
                className="relative p-2 text-primary hover:scale-110 transition-transform"
                aria-label="Open Cart"
              >
                <i className="fa-solid fa-cart-shopping text-xl"></i>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-cta text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-secondary animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>
              <a 
                href="#shop" 
                className="bg-primary text-secondary px-7 py-2.5 rounded-xl font-bold hover:bg-cta hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm"
              >
                Get Started
              </a>
            </nav>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center space-x-3">
              <button 
                onClick={onOpenCart}
                className="relative p-2 text-primary"
                aria-label="Open Cart"
              >
                <i className="fa-solid fa-cart-shopping text-xl"></i>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-cta text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="w-10 h-10 flex items-center justify-center bg-primary/5 rounded-xl text-primary"
                aria-label="Open Menu"
              >
                <i className="fa-solid fa-bars-staggered text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Professional Drawer */}
      <div 
        className={`fixed inset-0 z-[100] lg:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
          onClick={closeMenu}
        />
        
        {/* Drawer Content */}
        <div 
          ref={menuRef}
          className="absolute right-0 top-0 bottom-0 w-full max-w-[300px] bg-secondary shadow-2xl flex flex-col transform translate-x-full"
        >
          {/* Menu Header */}
          <div className="p-6 flex justify-between items-center border-b border-primary/5">
            <span className="font-playfair font-bold text-primary text-xl">Menu</span>
            <button 
              onClick={closeMenu}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          {/* Navigation Links */}
          <nav ref={linksRef} className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
            {[
              { label: 'Our Products', href: '#shop', icon: 'fa-bag-shopping' },
              { label: 'Health Benefits', href: '#benefits', icon: 'fa-heart-pulse' },
              { label: 'Customer Reviews', href: '#reviews', icon: 'fa-star' },
              { label: 'Wholesale Program', href: '#wholesale', icon: 'fa-box-open' },
              { label: 'Contact Us', href: '#contact', icon: 'fa-headset' }
            ].map((item) => (
              <a 
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="flex items-center space-x-4 p-4 rounded-2xl bg-white border border-primary/5 hover:border-cta/30 transition-all hover:bg-cta/5 group shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-cta group-hover:text-white transition-colors">
                  <i className={`fa-solid ${item.icon}`}></i>
                </div>
                <span className="font-bold text-primary group-hover:text-cta transition-colors">{item.label}</span>
              </a>
            ))}
            
            <div className="pt-4">
              <a 
                href="#shop" 
                onClick={closeMenu}
                className="block w-full text-center bg-cta text-white px-6 py-4 rounded-2xl font-bold shadow-xl shadow-cta/20 active:scale-95 transition-all"
              >
                Shop Now
              </a>
            </div>
          </nav>

          {/* Bottom Branding / Social */}
          <div className="p-8 bg-primary/5 border-t border-primary/10">
            <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest mb-4">Join our community</p>
            <div className="flex space-x-4">
              {['instagram', 'facebook-f', 'whatsapp'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary/60 shadow-sm hover:text-cta transition-colors border border-primary/5">
                  <i className={`fa-brands fa-${social}`}></i>
                </a>
              ))}
            </div>
            <p className="mt-6 text-xs text-primary/40 leading-relaxed italic">
              "The Miswak is a means of purification for the mouth and is pleasing to the Lord."
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
