'use client';

import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import { useCart } from '@/hooks/useCart';
import { getAddOnsTotal, getCustomizedUnitPrice } from '@/lib/pricing';
import { CartItem } from '@/lib/types';

const gbpFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0,
});

const formatGBP = (price: number) => gbpFormatter.format(price);

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, isLoaded } = useCart();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading cart...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />

      <Header />

      <main className="relative pt-36 md:pt-40 pb-16 md:pb-20 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-8 md:mb-12">
              Your <span className="text-gold italic">Cart</span>
            </h1>

            {cart.length === 0 ? (
              <div className="text-center py-14 md:py-20">
                <ShoppingBag className="w-20 h-20 mx-auto mb-6 text-gray-600" />
                <p className="text-xl md:text-2xl text-muted-foreground mb-8">Your cart is empty</p>
                <Link
                  href="/customize"
                  className="inline-flex items-center gap-2 bg-gold text-dark px-8 py-4 rounded-full font-semibold hover:bg-gold/90 transition-all"
                >
                  Start Customizing
                </Link>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  {cart.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <CartItemCard
                        item={item}
                        onRemove={() => removeFromCart(item.id)}
                        onUpdateQuantity={(qty) => updateQuantity(item.id, qty)}
                      />
                    </motion.div>
                  ))}
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-card/80 backdrop-blur-sm border border-border/80 rounded-3xl shadow-sm p-5 sm:p-6 lg:sticky lg:top-32">
                    <h2 className="text-2xl font-playfair font-bold mb-6">Summary</h2>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-muted-foreground">
                        <span>Subtotal</span>
                        <span>{formatGBP(totalPrice)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Shipping</span>
                        <span>FREE</span>
                      </div>
                      <div className="border-t border pt-4 flex justify-between text-xl font-bold">
                        <span>Total</span>
                        <span className="text-gold">{formatGBP(totalPrice)}</span>
                      </div>
                    </div>

                    <Link
                      href="/checkout"
                      className="w-full bg-gold text-dark px-6 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-gold/90 transition-colors"
                    >
                      Checkout
                    </Link>

                    <p className="text-xs text-gray-500 text-center mt-4">
                      Secure checkout powered by SONIC
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function CartItemCard({
  item,
  onRemove,
  onUpdateQuantity,
}: {
  item: any;
  onRemove: () => void;
  onUpdateQuantity: (qty: number) => void;
}) {
  return (
    <div className="bg-card/80 backdrop-blur-sm border border-border/80 rounded-3xl shadow-sm p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-card rounded-xl flex items-center justify-center flex-shrink-0 relative overflow-hidden">
          <CartHeadphoneIcon item={item} />
        </div>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-3 mb-2">
            <div>
              <h3 className="text-lg sm:text-xl font-playfair font-bold">{item.modelName}</h3>
              <p className="text-sm text-muted-foreground">Custom Build</p>
            </div>
            <p className="text-lg sm:text-xl font-bold text-gold">
              {formatGBP(getCustomizedUnitPrice(item.modelPrice, item.customization.addOns))}
            </p>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Colors:</span>
              <div className="flex gap-1">
                <div
                  className="w-5 h-5 rounded-full border"
                  style={{ backgroundColor: item.customization.colors.shell }}
                />
                <div
                  className="w-5 h-5 rounded-full border"
                  style={{ backgroundColor: item.customization.colors.band }}
                />
                <div
                  className="w-5 h-5 rounded-full border"
                  style={{ backgroundColor: item.customization.colors.earCups }}
                />
              </div>
            </div>

            {item.customization.stickers.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Stickers:</span>
                <span className="text-sm">
                  {item.customization.stickers.length} selected
                </span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Pattern:</span>
              <span className="text-sm capitalize">{item.customization.pattern ?? 'solid'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Earpiece:</span>
              <span className="text-sm capitalize">
                {item.customization.earpieceStyle ?? 'standard'}
              </span>
            </div>

            {item.customization.text.content && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Text:</span>
                <span className="text-sm">{item.customization.text.content}</span>
              </div>
            )}
            {item.customization.addOns?.length > 0 && (
              <div className="flex items-start gap-2">
                <span className="text-sm text-muted-foreground">Add-ons:</span>
                <span className="text-sm break-words">
                  {item.customization.addOns.join(', ')} (+{formatGBP(getAddOnsTotal(item.customization.addOns))})
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 bg-background rounded-lg p-1 border">
              <button
                onClick={() => onUpdateQuantity(item.quantity - 1)}
                disabled={item.quantity <= 1}
                className="p-2 hover:bg-card rounded disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-semibold">{item.quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item.quantity + 1)}
                className="p-2 hover:bg-card rounded"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onRemove}
              className="text-muted-foreground hover:text-red-500 transition-colors p-2"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartHeadphoneIcon({ item }: { item: CartItem }) {
  const innerRadius =
    item.customization.earpieceStyle === 'sport'
      ? 10
      : item.customization.earpieceStyle === 'comfort'
        ? 13
        : 11;
  const clipLeftId = `cart-left-${item.id}`;
  const clipRightId = `cart-right-${item.id}`;

  return (
    <svg
      viewBox="0 0 120 90"
      className="w-full h-full p-2.5"
      role="img"
      aria-label="Customized headphone preview"
    >
      <defs>
        <clipPath id={clipLeftId}>
          <circle cx="34" cy="62" r={innerRadius - 0.6} />
        </clipPath>
        <clipPath id={clipRightId}>
          <circle cx="86" cy="62" r={innerRadius - 0.6} />
        </clipPath>
      </defs>

      <path
        d="M20,38 C36,14 84,14 100,38"
        fill="none"
        stroke={item.customization.colors.band}
        strokeWidth="8"
        strokeLinecap="round"
      />
      <rect x="26" y="38" width="4" height="16" rx="2" fill={item.customization.colors.shell} />
      <rect x="90" y="38" width="4" height="16" rx="2" fill={item.customization.colors.shell} />

      <circle cx="34" cy="62" r="15" fill={item.customization.colors.earCups} />
      <circle cx="86" cy="62" r="15" fill={item.customization.colors.earCups} />
      <circle cx="34" cy="62" r={innerRadius} fill="#0b0b0b" />
      <circle cx="86" cy="62" r={innerRadius} fill="#0b0b0b" />

      {item.customization.customImage && (
        <>
          <image
            href={item.customization.customImage}
            x="22"
            y="50"
            width="24"
            height="24"
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#${clipLeftId})`}
          />
          <image
            href={item.customization.customImage}
            x="74"
            y="50"
            width="24"
            height="24"
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#${clipRightId})`}
          />
        </>
      )}
    </svg>
  );
}
