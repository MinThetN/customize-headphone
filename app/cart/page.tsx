'use client';

import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import { useCart } from '@/hooks/useCart';

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

      <main className="relative pt-48 pb-20 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-playfair font-bold mb-12">
              Your <span className="text-gold italic">Cart</span>
            </h1>

            {cart.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingBag className="w-20 h-20 mx-auto mb-6 text-gray-600" />
                <p className="text-2xl text-muted-foreground mb-8">Your cart is empty</p>
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
                  <div className="bg-card/80 backdrop-blur-sm border border-border/80 rounded-3xl shadow-sm p-6 sticky top-32">
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
    <div className="bg-card/80 backdrop-blur-sm border border-border/80 rounded-3xl shadow-sm p-6">
      <div className="flex gap-6">
        <div className="w-32 h-32 bg-card rounded-xl flex items-center justify-center flex-shrink-0 relative overflow-hidden">
          <div
            className="w-20 h-20 rounded-full"
            style={{ backgroundColor: item.customization.colors.shell }}
          />
          <div
            className="absolute top-4 w-16 h-4 rounded-full"
            style={{ backgroundColor: item.customization.colors.band }}
          />
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-playfair font-bold">{item.modelName}</h3>
              <p className="text-sm text-muted-foreground">Custom Build</p>
            </div>
            <p className="text-xl font-bold text-gold">
              {formatGBP(item.modelPrice)}
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
                <span className="text-sm">{item.customization.addOns.join(', ')}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
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
