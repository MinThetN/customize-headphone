'use client';

import { useState, useEffect } from 'react';
import { CartItem, CustomizationState } from '@/lib/types';
import { getCustomizedUnitPrice } from '@/lib/pricing';

const CART_STORAGE_KEY = 'sonic-cart';

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      try {
        setCart(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse cart from localStorage');
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleLogout = () => {
      setCart([]);
      localStorage.removeItem(CART_STORAGE_KEY);
    };

    window.addEventListener('sonic:logout', handleLogout);
    return () => window.removeEventListener('sonic:logout', handleLogout);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = (
    modelId: string,
    modelName: string,
    modelPrice: number,
    customization: CustomizationState
  ) => {
    const newItem: CartItem = {
      id: Date.now().toString(),
      modelId,
      modelName,
      modelPrice,
      customization,
      quantity: 1,
    };
    setCart(prev => [...prev, newItem]);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) =>
      sum + getCustomizedUnitPrice(item.modelPrice, item.customization.addOns) * item.quantity,
    0
  );

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isLoaded,
  };
}
