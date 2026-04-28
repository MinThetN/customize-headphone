'use client';

import Header from '@/components/Header';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />
      <Header />
      <main className="relative pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto bg-card/60 backdrop-blur-sm border rounded-2xl p-8 space-y-5">
          <h1 className="text-4xl font-playfair font-bold">Privacy Policy</h1>
          <p className="text-gray-400">
            This policy is designed to align with UK GDPR principles and ICO guidance.
            We collect only necessary customer data for account access, order fulfillment,
            shipping updates, and support.
          </p>
          <section>
            <h2 className="text-xl font-semibold mb-2">Lawful Basis & Data Use</h2>
            <p className="text-gray-400">
              Personal data is processed under contract performance and legitimate interest.
              We do not sell customer data to third parties.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Your Rights</h2>
            <p className="text-gray-400">
              You may request access, correction, deletion, or portability of personal data.
              You may also object to non-essential processing.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Cookie Consent</h2>
            <p className="text-gray-400">
              Non-essential cookies are used only after opt-in consent. No pre-ticked boxes
              are used.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
