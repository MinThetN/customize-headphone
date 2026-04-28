'use client';

import { useEffect, useState } from 'react';
import { CustomizationState, WishlistItem } from '@/lib/types';

const WISHLIST_STORAGE_KEY = 'sonic-wishlist';

export function useWishlist() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (stored) {
      try {
        setWishlist(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse wishlist');
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist, isLoaded]);

  const saveForLater = (
    modelId: string,
    modelName: string,
    modelPrice: number,
    customization: CustomizationState
  ) => {
    const item: WishlistItem = {
      id: Date.now().toString(),
      modelId,
      modelName,
      modelPrice,
      customization,
      createdAt: new Date().toISOString(),
    };
    setWishlist((prev) => [item, ...prev]);
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return {
    wishlist,
    isLoaded,
    saveForLater,
    removeFromWishlist,
  };
}
