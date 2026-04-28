'use client';

import Header from '@/components/Header';

export default function ReturnsRefundPolicyPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />
      <Header />
      <main className="relative pt-48 pb-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto bg-card/80 backdrop-blur-sm border border-border/80 rounded-3xl shadow-sm p-8 space-y-5">
          <h1 className="text-4xl font-playfair font-bold">Returns & Refund Policy</h1>
          <p className="text-muted-foreground">
            Returns are accepted within 14 days for unused products in original condition.
            Custom items are reviewed case-by-case.
          </p>
          <section>
            <h2 className="text-xl font-semibold mb-2">How To Return</h2>
            <p className="text-muted-foreground">
              Contact support with your order number, then ship the product using tracked delivery.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Refund Timeline</h2>
            <p className="text-muted-foreground">
              Once approved, refunds are processed within 2 business days.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
