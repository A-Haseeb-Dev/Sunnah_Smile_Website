
import React, { useState } from 'react';
import { CartItem } from '../types';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-secondary/95 backdrop-blur-md border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-2">
            <div className="w-7 h-7 md:w-8 md:h-8 bg-primary rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-tooth text-secondary text-xs md:text-sm"></i>
            </div>
            <span className="text-xl md:text-2xl font-playfair font-bold text-primary tracking-tight whitespace-nowrap">
              Sunnah<span className="text-accent italic">Smile</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-8 items-center">
            <a href="#shop" className="text-primary font-medium hover:text-cta transition-colors text-sm xl:text-base">Shop</a>
            <a href="#benefits" className="text-primary font-medium hover:text-cta transition-colors text-sm xl:text-base">Benefits</a>
            <a href="#reviews" className="text-primary font-medium hover:text-cta transition-colors text-sm xl:text-base">Reviews</a>
            <a href="#wholesale" className="text-primary font-medium hover:text-cta transition-colors text-sm xl:text-base">Wholesale</a>
            <a href="#contact" className="text-primary font-medium hover:text-cta transition-colors text-sm xl:text-base">Contact</a>
            
            <button 
              onClick={onOpenCart}
              className="relative p-2 text-primary hover:text-cta transition-colors"
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
              className="bg-primary text-secondary px-5 xl:px-6 py-2 md:py-2.5 rounded-full font-bold hover:bg-cta transition-all shadow-md hover:shadow-lg text-sm xl:text-base"
            >
              Buy Now
            </a>
          </nav>

          {/* Tablet/Mobile Actions */}
          <div className="lg:hidden flex items-center space-x-2 md:space-x-4">
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
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-primary p-2 focus:outline-none"
              aria-label="Toggle Menu"
            >
              <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="lg:hidden bg-secondary border-b border-primary/10 shadow-xl overflow-y-auto max-h-[calc(100vh-4rem)]">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <a href="#shop" onClick={() => setIsMenuOpen(false)} className="block px-3 py-4 text-base font-medium text-primary border-b border-primary/5 hover:bg-primary/5 rounded-lg transition-colors">Shop</a>
            <a href="#benefits" onClick={() => setIsMenuOpen(false)} className="block px-3 py-4 text-base font-medium text-primary border-b border-primary/5 hover:bg-primary/5 rounded-lg transition-colors">Benefits</a>
            <a href="#reviews" onClick={() => setIsMenuOpen(false)} className="block px-3 py-4 text-base font-medium text-primary border-b border-primary/5 hover:bg-primary/5 rounded-lg transition-colors">Reviews</a>
            <a href="#wholesale" onClick={() => setIsMenuOpen(false)} className="block px-3 py-4 text-base font-medium text-primary border-b border-primary/5 hover:bg-primary/5 rounded-lg transition-colors">Wholesale</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block px-3 py-4 text-base font-medium text-primary border-b border-primary/5 hover:bg-primary/5 rounded-lg transition-colors">Contact</a>
            <div className="pt-6">
              <a 
                href="#shop" 
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center bg-primary text-secondary px-6 py-4 rounded-xl font-bold shadow-lg"
              >
                Buy Now
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
