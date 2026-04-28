'use client';

import Header from '@/components/Header';

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />
      <Header />
      <main className="relative pt-48 pb-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto bg-card/80 backdrop-blur-sm border border-border/80 rounded-3xl shadow-sm p-8 space-y-5">
          <h1 className="text-4xl font-playfair font-bold">Terms & Conditions</h1>
          <p className="text-muted-foreground">
            By using this website and placing orders, customers agree to these terms.
            Product visuals are representative and customized outcomes may vary.
          </p>
          <section>
            <h2 className="text-xl font-semibold mb-2">Orders & Payment</h2>
            <p className="text-muted-foreground">
              Payment is required at checkout. Orders may be canceled before production begins.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Warranty & Services</h2>
            <p className="text-muted-foreground">
              Optional add-on services such as after-sales care and repair are subject to service terms.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Liability</h2>
            <p className="text-muted-foreground">
              Liability is limited to the order value except where prohibited by law.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
