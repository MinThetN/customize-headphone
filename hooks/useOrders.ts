'use client';

import { useEffect, useState } from 'react';
import { Address, CartItem, Order } from '@/lib/types';

const ORDERS_STORAGE_KEY = 'sonic-orders';
const ADDRESS_STORAGE_KEY = 'sonic-addresses';

const defaultAddress: Address = {
  fullName: '',
  phone: '',
  line1: '',
  city: '',
  postcode: '',
  country: 'United Kingdom',
};

export function useOrders(userEmail?: string) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [address, setAddress] = useState<Address>(defaultAddress);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (storedOrders) {
      try {
        setOrders(JSON.parse(storedOrders));
      } catch (error) {
        console.error('Failed to parse orders');
      }
    }

    if (userEmail) {
      const storedAddresses = localStorage.getItem(ADDRESS_STORAGE_KEY);
      if (storedAddresses) {
        try {
          const parsed = JSON.parse(storedAddresses) as Record<string, Address>;
          if (parsed[userEmail]) {
            setAddress(parsed[userEmail]);
          }
        } catch (error) {
          console.error('Failed to parse addresses');
        }
      }
    }
    setIsLoaded(true);
  }, [userEmail]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }, [orders, isLoaded]);

  const saveAddress = (nextAddress: Address) => {
    if (!userEmail) return;
    setAddress(nextAddress);
    const storedAddresses = localStorage.getItem(ADDRESS_STORAGE_KEY);
    const parsed = storedAddresses
      ? (JSON.parse(storedAddresses) as Record<string, Address>)
      : {};
    parsed[userEmail] = nextAddress;
    localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(parsed));
  };

  const placeOrder = (
    items: CartItem[],
    total: number,
    paymentMethod: 'credit-card' | 'debit-card',
    checkoutDetails?: {
      studentDiscountApplied: boolean;
      giftPackaging: boolean;
      subtotal: number;
      discountAmount: number;
      giftPackagingFee: number;
    }
  ) => {
    if (!userEmail) return null;
    const nextOrder: Order = {
      id: `ORD-${Date.now()}`,
      userEmail,
      items,
      total,
      paymentMethod,
      studentDiscountApplied: checkoutDetails?.studentDiscountApplied ?? false,
      giftPackaging: checkoutDetails?.giftPackaging ?? false,
      subtotal: checkoutDetails?.subtotal ?? total,
      discountAmount: checkoutDetails?.discountAmount ?? 0,
      giftPackagingFee: checkoutDetails?.giftPackagingFee ?? 0,
      shippingStatus: 'Processing',
      address,
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [nextOrder, ...prev]);
    return nextOrder;
  };

  const updateShippingStatus = (orderId: string, shippingStatus: Order['shippingStatus']) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, shippingStatus } : order
      )
    );
  };

  const userOrders = userEmail
    ? orders.filter((order) => order.userEmail === userEmail)
    : [];

  return {
    orders: userOrders,
    address,
    isLoaded,
    saveAddress,
    placeOrder,
    updateShippingStatus,
  };
}
