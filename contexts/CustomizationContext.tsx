'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { CustomizationState } from '@/lib/types';

interface CustomizationContextType {
  customization: CustomizationState;
  updateColors: (colors: Partial<CustomizationState['colors']>) => void;
  toggleSticker: (sticker: string) => void;
  toggleAddOn: (addOn: string) => void;
  updatePattern: (pattern: CustomizationState['pattern']) => void;
  updateEarpieceStyle: (style: CustomizationState['earpieceStyle']) => void;
  updateText: (text: Partial<CustomizationState['text']>) => void;
  updateCustomImage: (image: string | null) => void;
  resetCustomization: (modelId: string, baseColor: string) => void;
}

const CustomizationContext = createContext<CustomizationContextType | undefined>(undefined);

export function CustomizationProvider({
  children,
  initialModelId,
  initialBaseColor,
}: {
  children: ReactNode;
  initialModelId: string;
  initialBaseColor: string;
}) {
  const [customization, setCustomization] = useState<CustomizationState>({
    modelId: initialModelId,
    colors: {
      shell: initialBaseColor,
      band: initialBaseColor,
      earCups: initialBaseColor,
    },
    stickers: [],
    text: {
      content: '',
      font: 'font-sans',
      color: '#f5a623',
    },
    customImage: null,
    addOns: [],
    pattern: 'solid',
    earpieceStyle: 'standard',
  });

  const updateColors = (colors: Partial<CustomizationState['colors']>) => {
    setCustomization(prev => ({
      ...prev,
      colors: { ...prev.colors, ...colors },
    }));
  };

  const toggleSticker = (sticker: string) => {
    setCustomization(prev => {
      const isSelected = prev.stickers.includes(sticker);
      if (isSelected) {
        return {
          ...prev,
          stickers: prev.stickers.filter(s => s !== sticker),
        };
      } else if (prev.stickers.length < 5) {
        return {
          ...prev,
          stickers: [...prev.stickers, sticker],
        };
      }
      return prev;
    });
  };

  const updateText = (text: Partial<CustomizationState['text']>) => {
    setCustomization(prev => ({
      ...prev,
      text: { ...prev.text, ...text },
    }));
  };

  const updateCustomImage = (image: string | null) => {
    setCustomization(prev => ({
      ...prev,
      customImage: image,
    }));
  };

  const toggleAddOn = (addOn: string) => {
    setCustomization((prev) => {
      const exists = prev.addOns.includes(addOn);
      return {
        ...prev,
        addOns: exists
          ? prev.addOns.filter((item) => item !== addOn)
          : [...prev.addOns, addOn],
      };
    });
  };

  const updatePattern = (pattern: CustomizationState['pattern']) => {
    setCustomization((prev) => ({
      ...prev,
      pattern,
    }));
  };

  const updateEarpieceStyle = (earpieceStyle: CustomizationState['earpieceStyle']) => {
    setCustomization((prev) => ({
      ...prev,
      earpieceStyle,
    }));
  };

  const resetCustomization = (modelId: string, baseColor: string) => {
    setCustomization({
      modelId,
      colors: {
        shell: baseColor,
        band: baseColor,
        earCups: baseColor,
      },
      stickers: [],
      text: {
        content: '',
        font: 'font-sans',
        color: '#f5a623',
      },
      customImage: null,
      addOns: [],
      pattern: 'solid',
      earpieceStyle: 'standard',
    });
  };

  return (
    <CustomizationContext.Provider
      value={{
        customization,
        updateColors,
        toggleSticker,
        toggleAddOn,
        updatePattern,
        updateEarpieceStyle,
        updateText,
        updateCustomImage,
        resetCustomization,
      }}
    >
      {children}
    </CustomizationContext.Provider>
  );
}

export function useCustomization() {
  const context = useContext(CustomizationContext);
  if (context === undefined) {
    throw new Error('useCustomization must be used within a CustomizationProvider');
  }
  return context;
}
