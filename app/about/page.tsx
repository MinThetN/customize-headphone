'use client';

import Header from '@/components/Header';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />
      <Header />
      <main className="relative pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto bg-card/60 backdrop-blur-sm border rounded-2xl p-8">
          <h1 className="text-4xl font-playfair font-bold mb-4">About Us</h1>
          <p className="text-gray-400 leading-relaxed">
            BPHONES builds customisable wireless headphones with a focus on clear sound,
            modern style, and simple buying experience. You can personalise colors,
            stickers, text, and order bundles with transparent pricing.
          </p>
        </div>
      </main>
    </div>
  );
}
