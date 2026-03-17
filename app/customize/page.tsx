'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import { headphoneModels } from '@/lib/models';
import { ArrowRight } from 'lucide-react';

export default function CustomizePage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />

      <Header />

      <main className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-4">
              Choose Your <span className="text-gold italic">Canvas</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Select a headphone model to begin your customization journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {headphoneModels.map((model, index) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ModelCard model={model} />
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function ModelCard({ model }: { model: typeof headphoneModels[0] }) {
  return (
    <Link href={`/customize/${model.id}`}>
      <div className="group relative bg-card/60 backdrop-blur-sm border rounded-2xl p-8 hover:border-gold/50 transition-all overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="relative z-10">
          <div className="mb-6 flex justify-center">
            <div className="w-48 h-48 relative flex items-center justify-center">
              <div
                className="w-32 h-32 rounded-full"
                style={{ backgroundColor: model.baseColors[0] }}
              />
              <div
                className="absolute top-0 w-24 h-8 rounded-full blur-sm"
                style={{ backgroundColor: model.baseColors[0] }}
              />
            </div>
          </div>

          <h2 className="text-2xl font-playfair font-bold mb-2">{model.name}</h2>
          <p className="text-gray-400 mb-4 min-h-[3rem]">{model.tagline}</p>

          <div className="flex items-center justify-between mb-6">
            <span className="text-3xl font-bold text-gold">${model.price}</span>
            <div className="flex gap-2">
              {model.baseColors.map((color, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border-2 border"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gold group-hover:gap-3 transition-all">
            Customize Now
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
