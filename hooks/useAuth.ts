'use client';

import { useEffect, useState } from 'react';
import { UserProfile } from '@/lib/types';

const AUTH_STORAGE_KEY = 'sonic-user';
const CART_STORAGE_KEY = 'sonic-cart';

export function useAuth() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse user');
      }
    }
    setIsLoaded(true);
  }, []);

  const saveUser = (nextUser: UserProfile) => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
  };

  const signUpOrLogin = (name: string, email: string, provider: 'local' | 'google') => {
    const nextUser: UserProfile = {
      id: `${provider}-${Date.now()}`,
      name,
      email,
      provider,
    };
    saveUser(nextUser);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(CART_STORAGE_KEY);
    window.dispatchEvent(new Event('sonic:logout'));
    setUser(null);
  };

  return {
    user,
    isLoaded,
    isAuthenticated: Boolean(user),
    signUpOrLogin,
    logout,
  };
}
