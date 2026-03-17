'use client';

import Link from 'next/link';
import { ShoppingCart, Headphones, Sun, Moon } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useTheme } from 'next-themes';

export default function Header() {
  const { totalItems } = useCart();
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Headphones className="w-6 h-6 text-gold" />
          <span className="text-2xl font-playfair font-bold tracking-tight group-hover:text-gold transition-colors">
            SONIC
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/customize"
            className="text-sm tracking-wide hover:text-gold transition-colors"
          >
            CUSTOMIZE
          </Link>
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
        </nav>
      </div>
    </header>
  );
}
