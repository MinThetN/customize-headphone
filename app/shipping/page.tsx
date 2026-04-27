'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { useAuth } from '@/hooks/useAuth';
import { useOrders } from '@/hooks/useOrders';

const shippingSteps: Array<'Processing' | 'Packed' | 'Shipped' | 'Delivered'> = [
  'Processing',
  'Packed',
  'Shipped',
  'Delivered',
];

export default function ShippingPage() {
  const router = useRouter();
  const { user, isLoaded: authLoaded } = useAuth();
  const { orders } = useOrders(user?.email);

  useEffect(() => {
    if (authLoaded && !user) {
      router.push('/auth?redirect=/shipping');
    }
  }, [authLoaded, user, router]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />
      <Header />
      <main className="relative pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-playfair font-bold mb-3">Shipping Service</h1>
          <p className="text-gray-400 mb-8">
            Buyers can see shipping process after purchase.
          </p>
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="bg-card/60 backdrop-blur-sm border rounded-2xl p-6 text-gray-400">
                No shipping records yet.
              </div>
            ) : (
              orders.map((order) => {
                const activeIndex = shippingSteps.indexOf(order.shippingStatus);
                return (
                  <article
                    key={order.id}
                    className="bg-card/60 backdrop-blur-sm border rounded-2xl p-6"
                  >
                    <p className="text-sm text-gray-400 mb-3">{order.id}</p>
                    <div className="grid sm:grid-cols-4 gap-3">
                      {shippingSteps.map((step, index) => (
                        <div
                          key={step}
                          className={`rounded-xl border px-3 py-2 text-center text-sm ${
                            index <= activeIndex ? 'border-gold bg-gold/10' : 'border'
                          }`}
                        >
                          {step}
                        </div>
                      ))}
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
