'use client';

import Header from '@/components/Header';

export default function PolicyPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />
      <Header />
      <main className="relative pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto bg-card/60 backdrop-blur-sm border rounded-2xl p-8 space-y-6">
          <h1 className="text-4xl font-playfair font-bold">Company Policy</h1>

          <section>
            <h2 className="text-xl font-semibold mb-2">Returns</h2>
            <p className="text-gray-400">
              Returns are accepted within 14 days of delivery for unused products in
              original condition.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Shipping</h2>
            <p className="text-gray-400">
              Buyers can view shipping progress in the Shipping page after purchase.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Support</h2>
            <p className="text-gray-400">
              For order or customization issues, contact SONIC support for manual review.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
