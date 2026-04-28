'use client';

import Header from '@/components/Header';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />
      <Header />
      <main className="relative pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto bg-card/60 backdrop-blur-sm border rounded-2xl p-8 space-y-6">
          <h1 className="text-4xl font-playfair font-bold mb-1">Sustainability & About</h1>
          <p className="text-gray-400 leading-relaxed">
            BPHONES builds customisable wireless headphones with a focus on sound quality,
            minimal waste, and transparent sourcing.
          </p>
          <section>
            <h2 className="text-xl font-semibold mb-2">Recycled Materials</h2>
            <p className="text-gray-400">
              Product shells and selected packaging components use recycled materials where
              performance standards allow.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Green Transport</h2>
            <p className="text-gray-400">
              We prioritize lower-emission delivery partners and consolidated shipping routes
              to reduce logistics footprint.
            </p>
          </section>
          <section className="rounded-xl border border-gold/40 bg-gold/10 p-4">
            <h2 className="text-xl font-semibold mb-1">Net Zero 2050</h2>
            <p className="text-gray-300">
              BPHONES supports a Net Zero 2050 pathway with annual emissions tracking and
              operational reduction targets.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
