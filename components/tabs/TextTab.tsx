'use client';

import { useCustomization } from '@/contexts/CustomizationContext';
import { AVAILABLE_FONTS, FONT_DISPLAY_NAMES } from '@/lib/types';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function TextTab() {
  const { customization, updateText } = useCustomization();

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold mb-2">Text (max 20 characters)</label>
        <input
          type="text"
          maxLength={20}
          value={customization.text.content}
          onChange={(e) => updateText({ content: e.target.value })}
          placeholder="Enter your text..."
          className="w-full px-4 py-3 bg-surface/30 border border-border-custom rounded-xl focus:outline-none focus:border-gold transition-colors"
        />
        <p className="text-xs text-gray-400 mt-1">
          {customization.text.content.length}/20
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-3">Font Family</label>
        <div className="grid grid-cols-2 gap-3">
          {AVAILABLE_FONTS.map((font) => (
            <motion.button
              key={font}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => updateText({ font })}
              className={clsx(
                'px-4 py-3 rounded-xl border-2 transition-all text-left',
                customization.text.font === font
                  ? 'border-gold bg-gold/10'
                  : 'border-border-custom bg-surface/30'
              )}
            >
              <span className={clsx(font, 'text-lg')}>
                {FONT_DISPLAY_NAMES[font]}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-3">Text Color</label>
        <div className="flex items-center gap-4">
          <input
            type="color"
            value={customization.text.color}
            onChange={(e) => updateText({ color: e.target.value })}
            className="w-20 h-12 rounded-xl cursor-pointer bg-transparent border-2 border-border-custom"
          />
          <div
            className="flex-1 h-12 rounded-xl border-2 border-border-custom flex items-center px-4 font-mono text-sm"
            style={{ color: customization.text.color }}
          >
            {customization.text.color}
          </div>
        </div>
      </div>

      {customization.text.content && (
        <div className="mt-6 p-6 bg-surface/30 rounded-xl">
          <p className="text-sm text-gray-400 mb-3">Preview:</p>
          <div
            className={clsx(
              'text-3xl font-bold transition-colors',
              customization.text.font
            )}
            style={{ color: customization.text.color }}
          >
            {customization.text.content}
          </div>
        </div>
      )}
    </div>
  );
}
