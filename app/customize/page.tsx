'use client';

import { useMemo, useState } from 'react';
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

export default function CustomizePage() {
  const baseModel =
    headphoneModels.find((model) => model.id === 'arc-studio') ??
    headphoneModels[0];
  const premiumModel =
    headphoneModels.find((model) => model.id === 'nova-pro') ??
    headphoneModels[1] ??
    headphoneModels[0];

  const bundleOptions = useMemo(
    () => [
      {
        id: 'base-premium',
        name: 'Base + Premium',
        description: 'Bundle offer for base model and premium',
        price: 79,
        originalPrice: 88,
        customizeModelId: 'arc-studio',
      },
      {
        id: 'base-base',
        name: 'Base + Base',
        description: 'Bundle offer for base model',
        price: 49,
        originalPrice: 58,
        customizeModelId: 'arc-studio',
      },
      {
        id: 'premium-premium',
        name: 'Premium + Premium',
        description: 'Bundle offer for premium',
        price: 99,
        originalPrice: 118,
        badge: 'Save £19',
        customizeModelId: 'nova-pro',
      },
    ],
    []
  );
  const [selectedBundleId, setSelectedBundleId] = useState(bundleOptions[0].id);
  const selectedBundle =
    bundleOptions.find((option) => option.id === selectedBundleId) ??
    bundleOptions[0];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />

      <Header />

      <main className="relative pt-24 pb-5 px-6">
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
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Pick a base model, premium model, or bundle to begin your customization journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
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
                price={29}
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
                extraNote="Gift-ready packaging options"
                price={59}
                badge="Student discount 10%"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <BundleCard
                options={bundleOptions}
                selectedBundleId={selectedBundleId}
                selectedBundle={selectedBundle}
                onSelect={setSelectedBundleId}
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
  price,
  badge,
}: {
  model: (typeof headphoneModels)[number];
  label: string;
  ctaLabel: string;
  displayName: string;
  description: string;
  extraNote?: string;
  price: number;
  badge?: string;
}) {
  return (
    <Link href={`/customize/${model.id}`}>
      <div className="group relative bg-card/60 backdrop-blur-sm border rounded-2xl p-8 hover:border-gold/50 transition-all overflow-hidden h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="relative z-10">
          <p className="text-sm uppercase tracking-[0.2em] text-gold/80 mb-6">
            {label}
          </p>
          {badge ? (
            <p className="inline-flex rounded-full bg-gold/15 border border-gold/40 px-3 py-1 text-xs font-semibold text-gold mb-4">
              {badge}
            </p>
          ) : null}
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

          <h2 className="text-2xl font-playfair font-bold mb-2">{displayName}</h2>
          <p className="text-gray-400">{description}</p>
          <p className="text-gray-400 mb-4 min-h-[3rem]">
            {extraNote ?? model.tagline}
          </p>

          <div className="flex items-center justify-between mb-6">
            <span className="text-3xl font-bold text-gold">
              {formatGBP(price)}
            </span>
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
            {ctaLabel}
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}

function BundleCard({
  options,
  selectedBundleId,
  selectedBundle,
  onSelect,
}: {
  options: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    badge?: string;
    customizeModelId: string;
  }>;
  selectedBundleId: string;
  selectedBundle: {
    name: string;
    price: number;
    originalPrice?: number;
  };
  onSelect: (bundleId: string) => void;
}) {
  return (
    <div className="relative bg-card/60 backdrop-blur-sm border rounded-2xl p-8 h-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent" />
      <div className="relative z-10">
        <p className="text-sm uppercase tracking-[0.2em] text-gold/80 mb-6">
          Bundle
        </p>
        <h2 className="text-2xl font-playfair font-bold mb-2">Build a Bundle</h2>
        <p className="text-gray-400 mb-6 min-h-[3rem]">
          Choose your two-model bundle: base + premium, base + base, or premium
          + premium.
        </p>

        <div className="space-y-3 mb-6">
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className={`w-full rounded-2xl border px-4 py-4 text-left transition-all ${
                selectedBundleId === option.id
                  ? 'border-gold bg-gold/10'
                  : 'border-white/10 hover:border-gold/40'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{option.name}</span>
                    {option.badge ? (
                      <span className="rounded-full bg-gold px-2 py-0.5 text-xs font-bold text-dark">
                        {option.badge}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{option.description}</p>
                </div>

                <div className="text-right">
                  {option.originalPrice ? (
                    <p className="text-xs text-gray-500 line-through">
                      {formatGBP(option.originalPrice)}
                    </p>
                  ) : null}
                  <p className="text-lg font-bold text-gold">
                    {formatGBP(option.price)}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-gold/30 bg-gold/5 p-4">
          <p className="text-sm text-gray-400 mb-1">Selected Bundle</p>
          <p className="text-lg font-semibold">{selectedBundle.name}</p>
          {selectedBundle.originalPrice ? (
            <p className="text-sm text-gray-500 line-through mt-1">
              {formatGBP(selectedBundle.originalPrice)}
            </p>
          ) : null}
          <p className="text-2xl font-bold text-gold mt-1">
            {formatGBP(selectedBundle.price)}
          </p>
          <Link
            href={`/customize/${options.find((option) => option.id === selectedBundleId)?.customizeModelId ?? 'arc-studio'}?bundle=${selectedBundleId}`}
            className="mt-4 inline-flex items-center gap-2 text-sm text-gold font-semibold hover:gap-3 transition-all"
          >
            Customize Bundle
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
