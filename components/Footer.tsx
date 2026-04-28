'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const adPosters = [
  {
    id: 1,
    title: 'Sony Premium Headphones',
    description: 'Explore noise-cancelling and studio-grade Sony headphone collections.',
    cta: 'Visit Website',
    href: 'https://www.sony.com/headphones',
    src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 2,
    title: 'Bose Wireless Earbuds',
    description: 'Discover premium earphones and true wireless earbuds from Bose.',
    cta: 'Visit Website',
    href: 'https://www.bose.com/c/earbuds',
    src: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 3,
    title: 'JBL Speakers',
    description: 'Browse JBL Bluetooth speakers with bold sound and portable power.',
    cta: 'Visit Website',
    href: 'https://www.jbl.com/bluetooth-speakers/',
    src: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=1600&q=80',
  },
];

export default function Footer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePoster = adPosters[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % adPosters.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <footer className="border-t border-border/70 mt-12 bg-card/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="rounded-3xl border border-border/80 p-5 md:p-8 bg-gradient-to-br from-card to-background">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Sponsored</p>
              <h3 className="text-xl md:text-2xl font-playfair font-semibold mt-1">
                Business Highlights
              </h3>
            </div>
            <Link
              href="/customize"
              className="shrink-0 text-xs md:text-sm border rounded-full px-4 py-2 hover:border-gold hover:text-gold transition-colors"
            >
              Explore Products
            </Link>
          </div>

          <div className="rounded-2xl border border-border/70 bg-background/80 overflow-hidden">
            <a
              href={activePoster.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative h-56 md:h-72 block group"
              aria-label={`Open ${activePoster.title}`}
            >
              <img
                src={activePoster.src}
                alt={activePoster.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
              <div className="absolute top-3 left-3 inline-flex items-center text-[10px] tracking-[0.16em] uppercase text-white border border-white/60 rounded-full px-2.5 py-1">
                Sponsored Ad
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-white">
                <h4 className="text-lg md:text-xl font-semibold mb-2">{activePoster.title}</h4>
                <p className="text-sm text-white/85 leading-relaxed">
                  {activePoster.description}
                </p>
                <span className="mt-3 inline-block text-sm font-medium text-white group-hover:text-gold transition-colors">
                  {activePoster.cta} →
                </span>
              </div>
            </a>
            <div className="px-5 md:px-6 py-4 bg-background/40">
              <div className="flex items-center justify-center gap-2">
                {adPosters.map((poster, index) => (
                  <button
                    key={poster.id}
                    type="button"
                    aria-label={`Show ${poster.title}`}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      index === activeIndex ? 'w-6 bg-gold' : 'w-2.5 bg-foreground/30 hover:bg-foreground/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/70 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm text-muted-foreground">Copyright 2026 BPHONE. All rights reserved.</p>
          <div className="text-xs text-muted-foreground flex items-center gap-4 flex-wrap">
            <Link href="/privacy-policy" className="hover:text-gold transition-colors">
              Privacy
            </Link>
            <Link href="/terms-conditions" className="hover:text-gold transition-colors">
              Terms
            </Link>
            <Link href="/returns-refund-policy" className="hover:text-gold transition-colors">
              Returns
            </Link>
            <Link href="/disclosure" className="hover:text-gold transition-colors">
              Disclosure
            </Link>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2">
          <SocialIconLink href="https://facebook.com" label="Facebook">
            <path d="M22 12.07C22 6.5 17.52 2 12 2S2 6.5 2 12.07C2 17.1 5.66 21.26 10.44 22v-7.03H7.9v-2.9h2.54V9.86c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.26.2 2.26.2v2.47h-1.28c-1.26 0-1.65.79-1.65 1.6v1.92h2.8l-.45 2.9h-2.35V22C18.34 21.26 22 17.1 22 12.07z" />
          </SocialIconLink>
          <SocialIconLink href="https://instagram.com" label="Instagram">
            <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5zm8.95 1.35a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3zM12 7.3A4.7 4.7 0 1 1 7.3 12 4.7 4.7 0 0 1 12 7.3zm0 1.8A2.9 2.9 0 1 0 14.9 12 2.9 2.9 0 0 0 12 9.1z" />
          </SocialIconLink>
          <SocialIconLink href="https://x.com" label="X">
            <path d="M18.9 3h2.9l-6.35 7.26L23 21h-6l-4.7-6.15L6.92 21H4l6.79-7.76L1.6 3h6.15l4.24 5.6L18.9 3zm-1.03 16.2h1.61L6.88 4.73H5.16L17.87 19.2z" />
          </SocialIconLink>
          <SocialIconLink href="https://tiktok.com" label="TikTok">
            <path d="M14.25 3h2.45c.2 1.7 1.15 3.18 2.62 4.04.95.57 2.08.9 3.18.92v2.55c-1.93-.06-3.8-.68-5.35-1.78v6.13c0 3.1-2.5 5.64-5.62 5.64a5.63 5.63 0 1 1 0-11.26c.32 0 .63.03.94.08v2.62a3.05 3.05 0 0 0-.94-.14 3.01 3.01 0 0 0 0 6.02c1.7 0 3.08-1.33 3.08-3.06V3z" />
          </SocialIconLink>
        </div>
      </div>
    </footer>
  );
}

function SocialIconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border/80 hover:border-gold hover:text-gold transition-colors"
    >
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
        {children}
      </svg>
    </a>
  );
}
