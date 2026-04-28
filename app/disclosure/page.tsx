'use client';

import Header from '@/components/Header';

export default function DisclosurePage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />
      <Header />
      <main className="relative pt-40 pb-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto bg-card/80 backdrop-blur-sm border border-border/80 rounded-3xl shadow-sm p-8 space-y-5">
          <h1 className="text-4xl font-playfair font-bold">#Ad / Influencer Disclosure</h1>
          <p className="text-muted-foreground">
            BPHONES may partner with creators or run paid campaigns. Sponsored content is
            clearly marked with labels such as #Ad, Paid Partnership, or Sponsored.
          </p>
          <section>
            <h2 className="text-xl font-semibold mb-2">Affiliate Links</h2>
            <p className="text-muted-foreground">
              Some links may be affiliate links and may generate commission at no extra
              cost to customers.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Review Integrity</h2>
            <p className="text-muted-foreground">
              Sponsored collaborations do not guarantee positive reviews or scripted claims.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
