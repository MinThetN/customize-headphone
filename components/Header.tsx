'use client';

import Link from 'next/link';
import { ShoppingCart, Headphones, Sun, Moon, User, Heart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useTheme } from 'next-themes';
import { useAuth } from '@/hooks/useAuth';

const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '/about', label: 'ABOUT US' },
  { href: '/policy', label: 'POLICY' },
  { href: '/shipping', label: 'SHIPPING' },
  { href: '/customize', label: 'CUSTOMIZE' },
  { href: '/orders', label: 'MY ITEMS' },
  { href: '/wishlist', label: 'WISHLIST' },
];

export default function Header() {
  const { totalItems } = useCart();
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const isDark = theme === 'dark';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      {/* <div className="border-b border-border/60 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 text-[11px] md:text-xs tracking-[0.18em] text-muted-foreground text-center">
          PREMIUM CUSTOM AUDIO STUDIO • FREE SHIPPING ABOVE $150
        </div>
      </div> */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-2.5 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-2">
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border bg-card">
            <Headphones className="w-5 h-5 text-gold" />
          </span>
          <span className="text-xl md:text-2xl font-playfair font-semibold tracking-tight group-hover:text-gold transition-colors">
            BPHONE
          </span>
        </Link>

        <nav className="hidden lg:flex items-center justify-center gap-2 md:gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 text-[11px] md:text-xs tracking-[0.16em] uppercase px-3 py-1.5 rounded-full border border-transparent hover:border-border hover:bg-card/80 hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2 md:gap-3">
          {user ? (
            <button
              onClick={logout}
              className="text-xs md:text-sm border rounded-full px-3 py-1.5 hover:border-gold hover:text-gold transition-colors"
            >
              LOGOUT
            </button>
          ) : (
            <Link
              href="/auth"
              className="inline-flex items-center gap-1 text-xs md:text-sm border rounded-full px-3 py-1.5 hover:border-gold hover:text-gold transition-colors"
            >
              <User className="w-3 h-3" />
              LOGIN
            </Link>
          )}
          <button
            aria-label="Toggle theme"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="relative group rounded-full p-2 border hover:border-gold transition-colors"
            title="Toggle theme"
          >
            <Sun className="w-5 h-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="w-5 h-5 absolute top-2 left-2 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>
          <Link href="/cart" className="relative group">
            <ShoppingCart className="w-5 h-5 group-hover:text-gold transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-dark text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>
          <Link href="/wishlist" className="relative group md:hidden">
            <Heart className="w-5 h-5 group-hover:text-gold transition-colors" />
          </Link>
        </div>
      </div>

      <nav className="lg:hidden max-w-7xl mx-auto px-4 md:px-6 py-1.5 flex items-center justify-center flex-wrap gap-2 md:gap-3">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="shrink-0 text-[11px] md:text-xs tracking-[0.16em] uppercase px-3 py-1.5 rounded-full border border-transparent hover:border-border hover:bg-card/80 hover:text-gold transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </header>
  );
}
