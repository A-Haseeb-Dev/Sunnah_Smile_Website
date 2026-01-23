
import React from 'react';
import { Product, Review } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'single-pack',
    name: 'Single Sunnah Smile',
    price: 15.99,
    description: 'Perfect for individual use. One premium Miswak-based brush.',
    features: ['Natural antibacterial', 'Biodegradable handle', 'Free shipping'],
    image: 'https://images.unsplash.com/photo-1559591937-e43590f0ca1d?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'family-pack',
    name: 'Family Pack (4 brushes)',
    price: 49.99,
    description: 'Our Best Seller. Complete oral care for the whole family.',
    features: ['Better value (20% off)', 'Mixed colors', 'Eco-friendly packaging'],
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=400',
    tag: 'BEST SELLER'
  },
  {
    id: 'wholesale-pack',
    name: 'Wholesale Bundle (20 brushes)',
    price: 199.99,
    description: 'Bulk savings for communities and retail partners.',
    features: ['Maximum savings', 'Custom branding available', 'Express global shipping'],
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=400'
  }
];

export const REVIEWS: Review[] = [
  {
    id: '1',
    user: 'Ahmed K.',
    rating: 5,
    comment: 'SubhanAllah, the quality is amazing. My gums have never felt healthier and it feels great to revive a Sunnah.',
    location: 'London, UK',
    date: '2 days ago'
  },
  {
    id: '2',
    user: 'Sarah M.',
    rating: 5,
    comment: 'Finally a toothbrush that is actually eco-friendly and works well. The Miswak bristles are gentle yet effective.',
    location: 'Dubai, UAE',
    date: '1 week ago'
  },
  {
    id: '3',
    user: 'Omar F.',
    rating: 4,
    comment: 'Excellent customer service and fast shipping to Canada. Great for teaching my kids about the Prophet\'s (SAW) traditions.',
    location: 'Toronto, CA',
    date: '3 weeks ago'
  }
];
