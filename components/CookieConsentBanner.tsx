'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const COOKIE_CONSENT_KEY = 'sonic-cookie-consent';

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!stored) setVisible(true);
  }, []);

  const saveConsent = () => {
    localStorage.setItem(
      COOKIE_CONSENT_KEY,
      JSON.stringify({
        analytics,
        marketing,
        updatedAt: new Date().toISOString(),
      })
    );
    setVisible(false);
  };

  const rejectAll = () => {
    localStorage.setItem(
      COOKIE_CONSENT_KEY,
      JSON.stringify({
        analytics: false,
        marketing: false,
        updatedAt: new Date().toISOString(),
      })
    );
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[100] max-w-4xl mx-auto">
      <div className="rounded-2xl border bg-background/95 backdrop-blur-xl p-5 shadow-xl">
        <h2 className="text-lg font-semibold mb-2">Cookie Consent</h2>
        <p className="text-sm text-gray-400 mb-4">
          Choose which optional cookies you want to allow. No boxes are pre-ticked.
          Read our <Link href="/privacy-policy" className="text-gold hover:underline">Privacy Policy</Link>.
        </p>
        <div className="grid md:grid-cols-2 gap-3 mb-4">
          <label className="flex items-center justify-between rounded-xl border px-4 py-3">
            <span className="text-sm">Analytics Cookies (optional)</span>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="accent-cyan-500"
            />
          </label>
          <label className="flex items-center justify-between rounded-xl border px-4 py-3">
            <span className="text-sm">Marketing Cookies (optional)</span>
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              className="accent-cyan-500"
            />
          </label>
        </div>
        <div className="flex gap-3">
          <button
            onClick={saveConsent}
            className="rounded-xl bg-gold text-dark px-4 py-2 font-semibold hover:bg-gold/90 transition-colors"
          >
            Accept Selected
          </button>
          <button
            onClick={rejectAll}
            className="rounded-xl border px-4 py-2 hover:border-gold transition-colors"
          >
            Reject Optional
          </button>
        </div>
      </div>
    </div>
  );
}
