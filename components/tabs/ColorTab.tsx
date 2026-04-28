'use client';

import { useCustomization } from '@/contexts/CustomizationContext';
import { getModelById } from '@/lib/models';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function ColorTab() {
  const { customization, updateColors } = useCustomization();
  const availableColors =
    getModelById(customization.modelId)?.baseColors ?? [];

  return (
    <div className="space-y-6">
      <ColorSection
        title="Shell"
        currentColor={customization.colors.shell}
        onChange={(color) => updateColors({ shell: color })}
        colors={availableColors}
      />
      <ColorSection
        title="Band"
        currentColor={customization.colors.band}
        onChange={(color) => updateColors({ band: color })}
        colors={availableColors}
      />
      <ColorSection
        title="Ear Cups"
        currentColor={customization.colors.earCups}
        onChange={(color) => updateColors({ earCups: color })}
        colors={availableColors}
      />
    </div>
  );
}

function ColorSection({
  title,
  currentColor,
  onChange,
  colors,
}: {
  title: string;
  currentColor: string;
  onChange: (color: string) => void;
  colors: string[];
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div
          className="w-8 h-8 rounded-full border border-gold"
          style={{ backgroundColor: currentColor }}
        />
      </div>

      <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 mb-3">
        {colors.map((color) => (
          <motion.button
            key={color}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(color)}
            className={clsx(
              'w-full aspect-square rounded-md transition-all relative',
              currentColor === color && 'ring-2 ring-gold ring-offset-2 ring-offset-dark'
            )}
            style={{ backgroundColor: color }}
          >
            {currentColor === color && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-gold rounded-full" />
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
