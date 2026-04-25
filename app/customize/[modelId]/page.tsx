'use client';

import { useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import clsx from 'clsx';
import Header from '@/components/Header';
import HeadphonePreview from '@/components/HeadphonePreview';
import ColorTab from '@/components/tabs/ColorTab';
import StickersTab from '@/components/tabs/StickersTab';
import TextTab from '@/components/tabs/TextTab';
import ImageTab from '@/components/tabs/ImageTab';
import { CustomizationProvider, useCustomization } from '@/contexts/CustomizationContext';
import { getModelById } from '@/lib/models';
import { useCart } from '@/hooks/useCart';

const tabs = [
  { id: 'color', label: 'Color', component: ColorTab },
  { id: 'stickers', label: 'Stickers', component: StickersTab },
  { id: 'text', label: 'Text', component: TextTab },
  { id: 'image', label: 'Image', component: ImageTab },
];

const gbpFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0,
});

const formatGBP = (price: number) => gbpFormatter.format(price);

const bundleOptions = [
  {
    id: 'base-base',
    name: 'Base + Base',
    price: 49,
    description: 'Bundle offer for base model',
  },
  {
    id: 'base-premium',
    name: 'Base + Premium',
    price: 79,
    description: 'Bundle offer for base model and premium',
  },
  {
    id: 'premium-premium',
    name: 'Premium + Premium',
    price: 99,
    description: 'Bundle offer for premium',
  },
];

export default function CustomizeModelPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const modelId = params.modelId as string;
  const model = getModelById(modelId);
  const bundleId = searchParams.get('bundle');
  const selectedBundle = bundleOptions.find((bundle) => bundle.id === bundleId);

  if (!model) {
    return <div>Model not found</div>;
  }

  return (
    <CustomizationProvider initialModelId={model.id} initialBaseColor={model.baseColors[0]}>
      <CustomizeContent model={model} selectedBundle={selectedBundle} />
    </CustomizationProvider>
  );
}

function CustomizeContent({
  model,
  selectedBundle,
}: {
  model: ReturnType<typeof getModelById>;
  selectedBundle?: (typeof bundleOptions)[number];
}) {
  const [activeTab, setActiveTab] = useState('color');
  const [angle, setAngle] = useState<'front' | 'left' | 'right'>('front');
  const router = useRouter();
  const { customization, resetCustomization, updateColors } = useCustomization();
  const { addToCart } = useCart();

  if (!model) return null;

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component || ColorTab;

  const handleAddToCart = () => {
    if (selectedBundle) {
      addToCart(
        `bundle-${selectedBundle.id}`,
        `Bundle: ${selectedBundle.name}`,
        selectedBundle.price,
        customization
      );
      router.push('/cart');
      return;
    }
    addToCart(model.id, model.name, model.price, customization);
    router.push('/cart');
  };
  const handleReset = () => {
    resetCustomization(model.id!, model.baseColors[0]!);
  };
  const handleRandomize = () => {
    const availableColors = model.baseColors;
    const pick = () =>
      availableColors[Math.floor(Math.random() * availableColors.length)];
    updateColors({ shell: pick(), band: pick(), earCups: pick() });
  };

  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute inset-0 bg-grain opacity-30 pointer-events-none" />

      <Header />

      <div className="pt-24 px-6 pb-10">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Models
        </button>

        <div className="max-w-[1600px] mx-auto grid grid-cols-1 gap-6 lg:[grid-template-columns:minmax(0,1fr)_380px]">
          <div className="bg-card/50 backdrop-blur-sm border rounded-3xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex gap-2 bg-background rounded-xl p-1 border">
                <button
                  onClick={() => setAngle('left')}
                  className={clsx(
                    'px-4 py-2 rounded-lg text-sm font-semibold transition-colors',
                    angle === 'left' ? 'bg-gold text-dark' : 'text-gray-300 hover:text-white'
                  )}
                >
                  Left
                </button>
                <button
                  onClick={() => setAngle('front')}
                  className={clsx(
                    'px-4 py-2 rounded-lg text-sm font-semibold transition-colors',
                    angle === 'front' ? 'bg-gold text-dark' : 'text-gray-300 hover:text-white'
                  )}
                >
                  Front
                </button>
                <button
                  onClick={() => setAngle('right')}
                  className={clsx(
                    'px-4 py-2 rounded-lg text-sm font-semibold transition-colors',
                    angle === 'right' ? 'bg-gold text-dark' : 'text-gray-300 hover:text-white'
                  )}
                >
                  Right
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-lg border text-sm hover:border-gold transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={handleRandomize}
                  className="px-4 py-2 rounded-lg border text-sm hover:border-gold transition-colors"
                >
                  Randomize
                </button>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <HeadphonePreview angle={angle} />
            </div>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border rounded-3xl p-6">
            <div className="mb-4">
              <h1 className="text-3xl font-playfair font-bold mb-2">{model.name}</h1>
              <p className="text-gray-400">{model.tagline}</p>
              {selectedBundle ? (
                <div className="mt-3 rounded-xl border border-gold/30 bg-gold/5 p-3">
                  <p className="text-sm text-gray-400">Bundle selected</p>
                  <p className="font-semibold">{selectedBundle.name}</p>
                  <p className="text-xs text-gray-400">{selectedBundle.description}</p>
                  <p className="text-2xl font-bold text-gold mt-2">
                    {formatGBP(selectedBundle.price)}
                  </p>
                </div>
              ) : (
                <p className="text-2xl font-bold text-gold mt-2">
                  {formatGBP(model.price)}
                </p>
              )}
            </div>

            <div className="flex gap-2 mb-4 border-b border-border-custom pb-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={clsx(
                    'px-5 py-2 rounded-lg font-semibold transition-all text-sm',
                    activeTab === tab.id
                      ? 'bg-gold text-dark'
                      : 'bg-card/50 text-gray-400 hover:text-white'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="max-h-[60vh] overflow-auto pr-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <ActiveComponent />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-4 pt-4 border-t border-border-custom">
              <button
                onClick={handleAddToCart}
                className="w-full bg-gold text-dark px-5 py-3 rounded-xl font-bold text-base hover:bg-gold/90 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart -{' '}
                {formatGBP(selectedBundle ? selectedBundle.price : model.price)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
