'use client';

import { useCustomization } from '@/contexts/CustomizationContext';
import { AVAILABLE_STICKERS } from '@/lib/types';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function StickersTab() {
  const { customization, toggleSticker } = useCustomization();

  return (
    <div>
      <div className="mb-6">
        <p className="text-sm text-gray-400">
          Select up to 5 stickers ({customization.stickers.length}/5)
        </p>
      </div>

      <div className="grid grid-cols-6 gap-4">
        {AVAILABLE_STICKERS.map((sticker) => {
          const isSelected = customization.stickers.includes(sticker);
          const isDisabled = !isSelected && customization.stickers.length >= 5;

          return (
            <motion.button
              key={sticker}
              whileHover={!isDisabled ? { scale: 1.1 } : {}}
              whileTap={!isDisabled ? { scale: 0.95 } : {}}
              onClick={() => !isDisabled && toggleSticker(sticker)}
              disabled={isDisabled}
              className={clsx(
                'aspect-square rounded-xl border-2 flex items-center justify-center text-4xl transition-all',
                isSelected
                  ? 'border-gold bg-gold/10'
                  : 'border-border-custom bg-surface/30',
                isDisabled && 'opacity-30 cursor-not-allowed'
              )}
            >
              {sticker}
            </motion.button>
          );
        })}
      </div>

      {customization.stickers.length > 0 && (
        <div className="mt-6 p-4 bg-surface/30 rounded-xl">
          <p className="text-sm text-gray-400 mb-2">Selected:</p>
          <div className="flex gap-2">
            {customization.stickers.map((sticker, index) => (
              <span key={index} className="text-2xl">
                {sticker}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
