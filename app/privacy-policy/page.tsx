'use client';

import Header from '@/components/Header';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />
      <Header />
      <main className="relative pt-48 pb-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto bg-card/80 backdrop-blur-sm border border-border/80 rounded-3xl shadow-sm p-8 space-y-5">
          <h1 className="text-4xl font-playfair font-bold">Privacy Policy</h1>
          <p className="text-muted-foreground">
            This policy is designed to align with UK GDPR principles and ICO guidance.
            We collect only necessary customer data for account access, order fulfillment,
            shipping updates, and support.
          </p>
          <section>
            <h2 className="text-xl font-semibold mb-2">Lawful Basis & Data Use</h2>
            <p className="text-muted-foreground">
              Personal data is processed under contract performance and legitimate interest.
              We do not sell customer data to third parties.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Your Rights</h2>
            <p className="text-muted-foreground">
              You may request access, correction, deletion, or portability of personal data.
              You may also object to non-essential processing.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Cookie Consent</h2>
            <p className="text-muted-foreground">
              Non-essential cookies are used only after opt-in consent. No pre-ticked boxes
              are used.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
