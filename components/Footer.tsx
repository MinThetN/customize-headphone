'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const adSlots = [
  { id: 1, src: '/ads/ad-1.jpg', title: 'Ad Slot 1' },
  { id: 2, src: '/ads/ad-2.jpg', title: 'Ad Slot 2' },
  { id: 3, src: '/ads/ad-3.jpg', title: 'Ad Slot 3' },
];

export default function Footer() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % adSlots.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, []);

  const activeAd = adSlots[activeIndex];

  return (
    <footer className="border-t border-border-custom/70 mt-10 bg-card/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <p className="text-sm text-gray-400">Copyright 2026 SONIC. All rights reserved.</p>
            <div className="mt-2 text-xs text-gray-500 space-x-3">
              <Link href="/privacy-policy" className="hover:text-gold transition-colors">Privacy</Link>
              <Link href="/terms-conditions" className="hover:text-gold transition-colors">Terms</Link>
              <Link href="/returns-refund-policy" className="hover:text-gold transition-colors">Returns</Link>
              <Link href="/disclosure" className="hover:text-gold transition-colors">Disclosure</Link>
            </div>
          </div>
          <div className="rounded-2xl border overflow-hidden bg-background">
            <div className="relative h-32">
              <img
                src={activeAd.src}
                alt={activeAd.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-end">
                <p className="text-xs text-white p-2">
                  {activeAd.title} (replace image at {activeAd.src})
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 py-2">
              {adSlots.map((ad, index) => (
                <span
                  key={ad.id}
                  className={`w-2 h-2 rounded-full ${
                    index === activeIndex ? 'bg-gold' : 'bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
