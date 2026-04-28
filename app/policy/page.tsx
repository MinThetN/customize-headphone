'use client';

import Link from 'next/link';
import Header from '@/components/Header';

export default function PolicyPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />
      <Header />
      <main className="relative pt-40 pb-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto bg-card/80 backdrop-blur-sm border border-border/80 rounded-3xl shadow-sm p-8">
          <h1 className="text-4xl font-playfair font-bold mb-4">Policy & Compliance Hub</h1>
          <p className="text-muted-foreground mb-6">
            Access legal, privacy, returns, and marketing disclosure pages.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/privacy-policy" className="rounded-xl border p-4 hover:border-gold transition-colors">
              <h2 className="font-semibold mb-1">Privacy Policy</h2>
              <p className="text-sm text-muted-foreground">UK GDPR aligned data and consent policy.</p>
            </Link>
            <Link href="/terms-conditions" className="rounded-xl border p-4 hover:border-gold transition-colors">
              <h2 className="font-semibold mb-1">Terms & Conditions</h2>
              <p className="text-sm text-muted-foreground">Website use, orders, and service terms.</p>
            </Link>
            <Link href="/returns-refund-policy" className="rounded-xl border p-4 hover:border-gold transition-colors">
              <h2 className="font-semibold mb-1">Returns & Refund Policy</h2>
              <p className="text-sm text-muted-foreground">Returns eligibility and refund timing rules.</p>
            </Link>
            <Link href="/disclosure" className="rounded-xl border p-4 hover:border-gold transition-colors">
              <h2 className="font-semibold mb-1">#Ad / Influencer Disclosure</h2>
              <p className="text-sm text-muted-foreground">Paid promotion and affiliate transparency.</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
