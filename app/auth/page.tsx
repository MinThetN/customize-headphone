'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import { useAuth } from '@/hooks/useAuth';

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') ?? '/';
  const { user, signUpOrLogin, isLoaded } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isLoaded && user) {
      router.push(redirectTo);
    }
  }, [isLoaded, user, redirectTo, router]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name || !email || !password) return;
    signUpOrLogin(name, email, 'local');
    router.push(redirectTo);
  };

  const handleGoogleLogin = () => {
    const fallbackEmail = `google-user-${Date.now()}@gmail.com`;
    signUpOrLogin(name || 'Google User', email || fallbackEmail, 'google');
    router.push(redirectTo);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />
      <Header />
      <main className="relative pt-48 pb-20 px-4 md:px-6">
        <div className="max-w-md mx-auto bg-card/80 backdrop-blur-sm border border-border/80 rounded-3xl shadow-sm p-8">
          <h1 className="text-3xl font-playfair font-bold mb-2">Login / Signup</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Please login before purchase. Google login option is available below.
          </p>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              className="w-full rounded-xl border bg-background px-4 py-3"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full rounded-xl border bg-background px-4 py-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full rounded-xl border bg-background px-4 py-3"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-gold text-dark rounded-xl px-4 py-3 font-semibold hover:bg-gold/90 transition-colors"
            >
              Continue with Email
            </button>
          </form>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="mt-3 w-full border rounded-xl px-4 py-3 font-semibold hover:border-gold transition-colors"
          >
            Continue with Google (Demo)
          </button>
        </div>
      </main>
    </div>
  );
}
