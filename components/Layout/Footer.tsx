
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary pt-16 sm:pt-20 pb-10 border-t border-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16 gsap-reveal opacity-0 transform translate-y-10">
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-6">
               <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-tooth text-secondary text-sm"></i>
                </div>
                <span className="text-2xl font-playfair font-bold text-primary tracking-tight">
                  Sunnah<span className="text-accent italic">Smile</span>
                </span>
            </div>
            <p className="text-primary/60 text-sm leading-relaxed">
              Reviving the tradition of natural oral care with scientific modern hygiene. Faith-driven, health-conscious, eco-friendly.
            </p>
          </div>
          <div>
            <h5 className="font-bold text-primary mb-6 text-sm sm:text-base">Quick Links</h5>
            <ul className="space-y-3 text-sm text-primary/70">
              <li><a href="#shop" className="hover:text-cta transition-colors">Shop All</a></li>
              <li><a href="#benefits" className="hover:text-cta transition-colors">Our Benefits</a></li>
              <li><a href="#how-it-works" className="hover:text-cta transition-colors">How it Works</a></li>
              <li><a href="#wholesale" className="hover:text-cta transition-colors">Wholesale</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-primary mb-6 text-sm sm:text-base">Contact & Support</h5>
            <ul className="space-y-3 text-sm text-primary/70">
              <li>
                 <a href="mailto:support@sunnahsmile.com" className="flex items-center hover:text-cta transition-colors">
                   <i className="fa-solid fa-envelope mr-2 w-5 text-cta"></i> support@sunnahsmile.com
                 </a>
              </li>
              <li>
                 <a href="tel:+1234567890" className="flex items-center hover:text-cta transition-colors">
                   <i className="fa-solid fa-phone mr-2 w-5 text-cta"></i> +1 (234) 567-890
                 </a>
              </li>
              <li><a href="#" className="hover:text-cta transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-cta transition-colors">Shipping & Returns</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-primary mb-6 text-sm sm:text-base">Follow Us</h5>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: 'fa-facebook-f', color: '#1877F2', name: 'Facebook' },
                { icon: 'fa-instagram', color: '#E4405F', name: 'Instagram' },
                { icon: 'fa-whatsapp', color: '#25D366', name: 'WhatsApp' },
                { icon: 'fa-linkedin-in', color: '#0A66C2', name: 'LinkedIn' }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-primary/10 flex items-center justify-center hover:text-white transition-all shadow-sm hover:scale-110" 
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = social.color}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  title={social.name}
                >
                  <i className={`fa-brands ${social.icon} text-sm sm:text-base`}></i>
                </a>
              ))}
            </div>
            <p className="mt-6 text-[10px] sm:text-xs text-primary/40 leading-relaxed font-medium">
              Join our 50k+ strong community for daily Sunnah reminders and oral health tips.
            </p>
          </div>
        </div>
        <div className="border-t border-primary/5 pt-10 text-center px-4">
          <p className="text-[10px] sm:text-xs text-primary/40 uppercase tracking-widest font-bold">
            &copy; {new Date().getFullYear()} Sunnah Smile. Premium Miswak Oral Care. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
