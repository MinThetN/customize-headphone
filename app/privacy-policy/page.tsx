'use client';

import Header from '@/components/Header';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />
      <Header />
      <main className="relative pt-40 pb-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto bg-card/80 backdrop-blur-sm border border-border/80 rounded-3xl shadow-sm p-8 space-y-6">
          <h1 className="text-4xl font-playfair font-bold">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground">Your privacy matters to us</p>
          <p className="text-muted-foreground leading-relaxed">
            At BPhone, we are committed to protecting your personal data. This policy explains
            what information we collect, how we use it, and your rights under UK GDPR as set out
            by the Information Commissioner's Office (ICO).
          </p>
          <section>
            <h2 className="text-xl font-semibold mb-2">What data we collect</h2>
            <p className="text-muted-foreground leading-relaxed">
              When you shop with BPhone, we may collect your name, email address, delivery
              address, and payment details. We also collect browsing data to improve your
              experience on our website.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">How we use your data</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use your data to process your orders, deliver your products, and communicate
              important updates about your purchase. We will only send you marketing emails if you
              have given us your clear permission - we do not use pre-ticked boxes.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Third-party platforms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use trusted third-party platforms such as Mailchimp for email marketing and Meta
              for advertising. All platforms we work with are required to comply with UK data
              protection rules.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Your rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              You have the right to access, correct, or request deletion of your personal data at
              any time. To make a request, contact us at privacy@bphone.co.uk. We will respond
              within 30 days.
            </p>
          </section>
          <section className="rounded-xl border border-gold/40 bg-gold/10 p-4">
            <p className="text-muted-foreground leading-relaxed">
              Please note: failure to follow UK GDPR rules can result in fines of up to GBP 17.5
              million or 4% of annual global turnover. We take this responsibility seriously.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use cookies to improve your browsing experience. You will always be asked for your
              consent before any non-essential cookies are placed on your device.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
