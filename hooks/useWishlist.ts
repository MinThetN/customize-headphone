'use client';

import { useEffect, useState } from 'react';
import { CustomizationState, WishlistItem } from '@/lib/types';

const WISHLIST_STORAGE_PREFIX = 'sonic-wishlist';

export function useWishlist(userEmail?: string) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const storageKey = userEmail
    ? `${WISHLIST_STORAGE_PREFIX}:${userEmail.toLowerCase()}`
    : null;

  useEffect(() => {
    if (!storageKey) {
      setWishlist([]);
      setIsLoaded(true);
      return;
    }
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        setWishlist(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse wishlist');
      }
    }
    setIsLoaded(true);
  }, [storageKey]);

  useEffect(() => {
    if (!isLoaded || !storageKey) return;
    localStorage.setItem(storageKey, JSON.stringify(wishlist));
  }, [wishlist, isLoaded, storageKey]);

  const saveForLater = (
    modelId: string,
    modelName: string,
    modelPrice: number,
    customization: CustomizationState
  ) => {
    if (!userEmail) return;
    const item: WishlistItem = {
      id: Date.now().toString(),
      userEmail,
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
