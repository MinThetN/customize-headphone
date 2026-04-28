'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { useWishlist } from '@/hooks/useWishlist';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';

const gbpFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0,
});

const formatGBP = (price: number) => gbpFormatter.format(price);

export default function WishlistPage() {
  const router = useRouter();
  const { user, isLoaded: authLoaded } = useAuth();
  const { wishlist, isLoaded, removeFromWishlist } = useWishlist(user?.email);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!authLoaded) return;
    if (!user) router.push('/auth?redirect=/wishlist');
  }, [authLoaded, user, router]);

  if (!isLoaded || !authLoaded) return <div className="min-h-screen bg-background" />;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />
      <Header />
      <main className="relative pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-playfair font-bold mb-6">Wishlist / Save For Later</h1>
          {wishlist.length === 0 ? (
            <div className="bg-card/60 backdrop-blur-sm border rounded-2xl p-6 text-gray-400">
              No saved customizations yet.
            </div>
          ) : (
            <div className="space-y-4">
              {wishlist.map((item) => (
                <article
                  key={item.id}
                  className="bg-card/60 backdrop-blur-sm border rounded-2xl p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold">{item.modelName}</h2>
                      <p className="text-sm text-gray-400 mt-1">
                        Pattern: {item.customization.pattern} | Earpiece:{' '}
                        {item.customization.earpieceStyle}
                      </p>
                      {item.customization.addOns.length > 0 ? (
                        <p className="text-sm text-gray-400 mt-1">
                          Add-ons: {item.customization.addOns.join(', ')}
                        </p>
                      ) : null}
                    </div>
                    <p className="text-xl font-bold text-gold">
                      {formatGBP(item.modelPrice)}
                    </p>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() =>
                        addToCart(
                          item.modelId,
                          item.modelName,
                          item.modelPrice,
                          item.customization
                        )
                      }
                      className="rounded-xl bg-gold text-dark px-4 py-2 font-semibold hover:bg-gold/90 transition-colors"
                    >
                      Move To Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="rounded-xl border px-4 py-2 hover:border-gold transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
