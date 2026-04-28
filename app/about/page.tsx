'use client';

import Header from '@/components/Header';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />
      <Header />
      <main className="relative pt-40 pb-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto bg-card/80 backdrop-blur-sm border border-border/80 rounded-3xl shadow-sm p-8 space-y-8">
          <h1 className="text-4xl font-playfair font-bold mb-1">Sustainability</h1>
          <p className="text-lg text-muted-foreground">Building a greener future</p>
          <p className="text-muted-foreground leading-relaxed">
            At BPhone, we believe that great products should not come at the cost of the planet.
            Sustainability is built into everything we do - from the materials we use to the way
            we deliver your order.
          </p>
          <section>
            <h2 className="text-xl font-semibold mb-2">Recycled Materials</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our headphones are produced using recycled and responsibly sourced materials wherever
              possible. We are continuously working to reduce waste across our manufacturing and
              packaging processes.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Green transport and delivery</h2>
            <p className="text-muted-foreground leading-relaxed">
              We are committed to using sustainable vehicles for our deliveries and working only
              with logistics partners who share our environmental values. We offer multi-period
              delivery windows - such as two-day delivery - to help reduce the number of journeys
              made and lower carbon emissions.
            </p>
          </section>
          <section className="rounded-xl border border-gold/40 bg-gold/10 p-4">
            <h2 className="text-xl font-semibold mb-1">Our commitment to Net Zero 2050</h2>
            <p className="text-muted-foreground leading-relaxed">
              BPhone is proud to support the UK's goal of reaching Net Zero Emissions by 2050. We
              are actively reducing our carbon footprint across our operations and will regularly
              publish updates on our progress. We believe in full transparency - our customers
              deserve to know what we are doing and why it matters.
            </p>
          </section>
          <p className="text-muted-foreground leading-relaxed">
            E-commerce has a responsibility to reduce its environmental impact. We are committed to
            being part of the solution, not the problem.
          </p>

          <section className="pt-4 border-t border-border/70">
            <h1 className="text-4xl font-playfair font-bold mb-1">About Us</h1>
            <p className="text-lg text-muted-foreground mb-4">We are BPhone</p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              BPhone is an online headphone brand built for people who want more than just sound -
              they want something that is truly theirs. We launched in May 2026 with one clear
              goal: to give customers the freedom to design premium headphones that match their
              identity, lifestyle, and needs.
            </p>
            <h2 className="text-xl font-semibold mb-2">What makes us different</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Most headphone brands offer a fixed product. BPhone does things differently. Every
              pair of BPhone headphones can be customised - from the design and earpieces to add-on
              services like our built-in music player and two-year after-sales care. There is no
              other brand offering this combination at our price point.
            </p>
            <h2 className="text-xl font-semibold mb-2">Our technology</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              BPhone headphones use premium planar magnetic technology. This helps create a
              smoother, more natural listening experience by reducing heavy bass noise and
              correcting frequency ranges - so what you hear is clear, balanced, and detailed.
            </p>
            <h2 className="text-xl font-semibold mb-2">Built for the digital world</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We chose e-commerce from day one because it lets us serve customers faster, keep
              costs lower, and stay connected to the people who matter most. As streaming
              platforms, gaming, and smart home technology continue to grow, BPhone is designed to
              grow with them.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              With the UK headphone market on track to reach $821 million by 2035, we are ready to
              be part of something big.
            </p>
            <h2 className="text-xl font-semibold mb-2">Our values</h2>
            <p className="text-muted-foreground leading-relaxed">
              We believe in quality, honesty, and looking after our customers long after the sale.
              That is why every premium order includes two-year after-sales care and a repair
              service - because a great product deserves great support.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
