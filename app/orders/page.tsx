'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { useAuth } from '@/hooks/useAuth';
import { useOrders } from '@/hooks/useOrders';

const gbpFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0,
});

const formatGBP = (price: number) => gbpFormatter.format(price);

export default function OrdersPage() {
  const router = useRouter();
  const { user, isLoaded: authLoaded } = useAuth();
  const { orders, address, saveAddress } = useOrders(user?.email);
  const [draftAddress, setDraftAddress] = useState(address);

  useEffect(() => {
    setDraftAddress(address);
  }, [address]);

  useEffect(() => {
    if (authLoaded && !user) {
      router.push('/auth?redirect=/orders');
    }
  }, [authLoaded, user, router]);

  const handleAddressSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveAddress(draftAddress);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />
      <Header />
      <main className="relative pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2">
            <h1 className="text-4xl font-playfair font-bold mb-6">Purchased Items</h1>
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="bg-card/60 backdrop-blur-sm border rounded-2xl p-6 text-gray-400">
                  No purchases yet.
                </div>
              ) : (
                orders.map((order) => (
                  <article
                    key={order.id}
                    className="bg-card/60 backdrop-blur-sm border rounded-2xl p-6"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm text-gray-400">{order.id}</p>
                        <p className="font-semibold">{new Date(order.createdAt).toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400">{order.shippingStatus}</p>
                        <p className="text-lg font-bold text-gold">{formatGBP(order.total)}</p>
                      </div>
                    </div>
                    <div className="space-y-1 text-sm">
                      {order.items.map((item) => (
                        <p key={item.id}>
                          {item.modelName} x {item.quantity}
                        </p>
                      ))}
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>

          <aside className="bg-card/60 backdrop-blur-sm border rounded-2xl p-6 h-fit sticky top-32">
            <h2 className="text-xl font-bold mb-4">Your Address</h2>
            <form onSubmit={handleAddressSave} className="space-y-3">
              <input
                className="w-full rounded-xl border bg-background px-4 py-3"
                placeholder="Full name"
                value={draftAddress.fullName}
                onChange={(e) =>
                  setDraftAddress({ ...draftAddress, fullName: e.target.value })
                }
              />
              <input
                className="w-full rounded-xl border bg-background px-4 py-3"
                placeholder="Phone"
                value={draftAddress.phone}
                onChange={(e) =>
                  setDraftAddress({ ...draftAddress, phone: e.target.value })
                }
              />
              <input
                className="w-full rounded-xl border bg-background px-4 py-3"
                placeholder="Address line"
                value={draftAddress.line1}
                onChange={(e) =>
                  setDraftAddress({ ...draftAddress, line1: e.target.value })
                }
              />
              <input
                className="w-full rounded-xl border bg-background px-4 py-3"
                placeholder="City"
                value={draftAddress.city}
                onChange={(e) =>
                  setDraftAddress({ ...draftAddress, city: e.target.value })
                }
              />
              <input
                className="w-full rounded-xl border bg-background px-4 py-3"
                placeholder="Postcode"
                value={draftAddress.postcode}
                onChange={(e) =>
                  setDraftAddress({ ...draftAddress, postcode: e.target.value })
                }
              />
              <input
                className="w-full rounded-xl border bg-background px-4 py-3"
                placeholder="Country"
                value={draftAddress.country}
                onChange={(e) =>
                  setDraftAddress({ ...draftAddress, country: e.target.value })
                }
              />
              <button
                type="submit"
                className="w-full bg-gold text-dark rounded-xl px-4 py-3 font-semibold hover:bg-gold/90 transition-colors"
              >
                Save / Edit Address
              </button>
            </form>
          </aside>
        </div>
      </main>
    </div>
  );
}
