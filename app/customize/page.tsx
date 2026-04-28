'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import { headphoneModels } from '@/lib/models';
import { ArrowRight } from 'lucide-react';

const gbpFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0,
});

const formatGBP = (price: number) => gbpFormatter.format(price);

const modelImages: Record<string, string> = {
  'arc-studio': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
  'nova-pro': 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80',
};

export default function CustomizePage() {
  const baseModel =
    headphoneModels.find((model) => model.id === 'arc-studio') ??
    headphoneModels[0];
  const premiumModel =
    headphoneModels.find((model) => model.id === 'nova-pro') ??
    headphoneModels[1] ??
    headphoneModels[0];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />

      <Header />

      <main className="relative pt-32 md:pt-36 pb-10 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            {/* <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-4">
              Choose Your <span className="text-gold italic">Canvas</span>
            </h1> */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose your model level: Base includes essential customization, Premium unlocks full creative control.
            </p>
            <p className="mt-3 text-sm text-gold/90 font-medium">
              Student discount 10% applies to all headphones.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ModelCard
                model={baseModel}
                label="Base Model"
                ctaLabel="Customize Base"
                displayName="Base model"
                description="Customisable wireless headphones"
                features={[
                  'Essential customization: shell, band and ear-cup colors',
                  'Personal text engraving support',
                  'All add-ons available: custom earpieces, music player, care and repair',
                ]}
                price={129}
                imageSrc={modelImages[baseModel.id]}
                showColorShowcase={false}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <ModelCard
                model={premiumModel}
                label="Premium Model"
                ctaLabel="Customize Premium"
                displayName="Premium model"
                description="Customisable wireless headphones"
                extraNote="Premium support for long-term product care"
                features={[
                  'Full customization tabs: colors, stickers, text and image upload',
                  'Advanced controls: pattern and earpiece style selection',
                  'All add-ons available: custom earpieces, music player, care and repair',
                ]}
                price={159}
                imageSrc={modelImages[premiumModel.id]}
                showColorShowcase={false}
              />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ModelCard({
  model,
  label,
  ctaLabel,
  displayName,
  description,
  extraNote,
  features,
  price,
  imageSrc,
  showColorShowcase = true,
}: {
  model: (typeof headphoneModels)[number];
  label: string;
  ctaLabel: string;
  displayName: string;
  description: string;
  extraNote?: string;
  features?: string[];
  price: number;
  imageSrc?: string;
  showColorShowcase?: boolean;
}) {
  return (
    <Link href={`/customize/${model.id}`}>
      <div className="group relative bg-card/80 backdrop-blur-sm border border-border/80 rounded-3xl shadow-sm p-5 sm:p-6 md:p-8 hover:border-gold/50 transition-all overflow-hidden h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="relative z-10">
          <p className="text-sm uppercase tracking-[0.2em] text-gold/80 mb-6">
            {label}
          </p>
          <div className="mb-6 flex justify-center">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={displayName}
                className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-2xl object-cover border border-white/10"
              />
            ) : (
              <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900" />
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-playfair font-bold mb-2">{displayName}</h2>
          <p className="text-muted-foreground">{description}</p>
          <p className="text-muted-foreground mb-4 min-h-[3rem]">
            {extraNote ?? model.tagline}
          </p>
          {features?.length ? (
            <ul className="text-sm text-muted-foreground mb-4 space-y-1">
              {features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          ) : null}

          <div className="flex items-center justify-between mb-6">
            <span className="text-2xl sm:text-3xl font-bold text-gold">
              {formatGBP(price)}
            </span>
            {showColorShowcase ? (
              <div className="flex gap-2">
                {model.baseColors.map((color, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full border-2 border"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            ) : (
              <div />
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-gold group-hover:gap-3 transition-all">
            {ctaLabel}
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
