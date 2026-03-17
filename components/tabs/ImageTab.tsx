'use client';

import { useCustomization } from '@/contexts/CustomizationContext';
import { Upload, X } from 'lucide-react';
import { useRef } from 'react';

export default function ImageTab() {
  const { customization, updateCustomImage } = useCustomization();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateCustomImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateCustomImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-6">
      {!customization.customImage ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-border-custom rounded-xl p-12 text-center cursor-pointer hover:border-gold/50 transition-colors bg-surface/20"
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-lg font-semibold mb-2">Upload Custom Image</p>
          <p className="text-sm text-gray-400 mb-4">
            Drag and drop or click to browse
          </p>
          <p className="text-xs text-gray-500">
            Recommended: Square image, max 5MB
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative bg-surface/30 rounded-xl p-6 border border-border-custom">
            <button
              onClick={() => updateCustomImage(null)}
              className="absolute top-4 right-4 bg-dark/80 hover:bg-dark rounded-full p-2 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gold/30">
                <img
                  src={customization.customImage}
                  alt="Custom"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-lg font-semibold mb-2">Image Uploaded</p>
                <p className="text-sm text-gray-400">
                  This will appear as a circular badge on both ear cups
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full px-4 py-3 border border-border-custom rounded-xl hover:border-gold transition-colors text-sm"
          >
            Replace Image
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
