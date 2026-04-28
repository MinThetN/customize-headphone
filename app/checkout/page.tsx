'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { useOrders } from '@/hooks/useOrders';
import { getAddOnsTotal, getCustomizedUnitPrice } from '@/lib/pricing';

const gbpFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0,
});

const formatGBP = (price: number) => gbpFormatter.format(price);

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, totalPrice, clearCart, isLoaded: cartLoaded } = useCart();
  const { user, isLoaded: authLoaded } = useAuth();
  const { address, saveAddress, placeOrder } = useOrders(user?.email);
  const [paymentMethod, setPaymentMethod] = useState<'credit-card' | 'debit-card'>(
    'credit-card'
  );
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [studentDiscountApplied, setStudentDiscountApplied] = useState(false);
  const [studentDiscountError, setStudentDiscountError] = useState('');
  const [giftPackaging, setGiftPackaging] = useState(false);

  const discountAmount = studentDiscountApplied ? totalPrice * 0.1 : 0;
  const giftPackagingFee = giftPackaging ? 5 : 0;
  const finalTotal = Math.max(totalPrice - discountAmount + giftPackagingFee, 0);

  const handleApplyStudentDiscount = () => {
    const isValid = studentCode.trim().toUpperCase() === 'STUDENT10';
    setStudentDiscountApplied(isValid);
    setStudentDiscountError(isValid ? '' : 'Invalid code. Use STUDENT10 for 10% off.');
  };

  useEffect(() => {
    if (!authLoaded) return;
    if (!user) {
      router.push('/auth?redirect=/checkout');
    }
  }, [authLoaded, user, router]);

  if (!cartLoaded || !authLoaded) {
    return <div className="min-h-screen bg-background" />;
  }

  const handlePlaceOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (cart.length === 0 || !user) return;
    if (!address.fullName || !address.line1 || !address.city || !address.postcode) {
      return;
    }
    if (!cardName || !cardNumber || !expiry || !cvv) {
      return;
    }
    const order = placeOrder(cart, finalTotal, paymentMethod, {
      studentDiscountApplied,
      giftPackaging,
      subtotal: totalPrice,
      discountAmount,
      giftPackagingFee,
    });
    if (order) {
      clearCart();
      router.push('/orders');
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />
      <Header />
      <main className="relative pt-40 pb-20 px-4 md:px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
          <form onSubmit={handlePlaceOrder} className="lg:col-span-2 space-y-6">
            <section className="bg-card/80 backdrop-blur-sm border border-border/80 rounded-3xl shadow-sm p-6">
              <h1 className="text-3xl font-playfair font-bold mb-4">Checkout</h1>
              <p className="text-sm text-muted-foreground">
                Complete payment using credit card or debit card.
              </p>
            </section>

            <section className="bg-card/80 backdrop-blur-sm border border-border/80 rounded-3xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit-card')}
                  className={`rounded-xl border p-3 text-left ${
                    paymentMethod === 'credit-card' ? 'border-gold bg-gold/10' : 'border'
                  }`}
                >
                  Credit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('debit-card')}
                  className={`rounded-xl border p-3 text-left ${
                    paymentMethod === 'debit-card' ? 'border-gold bg-gold/10' : 'border'
                  }`}
                >
                  Debit Card
                </button>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  className="rounded-xl border bg-background px-4 py-3"
                  placeholder="Card holder name"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                />
                <input
                  className="rounded-xl border bg-background px-4 py-3"
                  placeholder="Card number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
                <input
                  className="rounded-xl border bg-background px-4 py-3"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                />
                <input
                  className="rounded-xl border bg-background px-4 py-3"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
              <div className="mt-4 rounded-xl border p-3">
                <p className="text-sm font-semibold mb-2">Student Discount (10% off)</p>
                <div className="flex gap-2">
                  <input
                    className="flex-1 rounded-xl border bg-background px-4 py-3"
                    placeholder="Enter code (STUDENT10)"
                    value={studentCode}
                    onChange={(e) => {
                      setStudentCode(e.target.value);
                      setStudentDiscountApplied(false);
                      setStudentDiscountError('');
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleApplyStudentDiscount}
                    className="rounded-xl bg-gold text-dark px-4 py-3 font-semibold hover:bg-gold/90 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {studentDiscountApplied ? (
                  <p className="text-xs text-green-500 mt-2">Student discount applied.</p>
                ) : null}
                {studentDiscountError ? (
                  <p className="text-xs text-red-500 mt-2">{studentDiscountError}</p>
                ) : null}
              </div>
            </section>

            <section className="bg-card/80 backdrop-blur-sm border border-border/80 rounded-3xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  className="rounded-xl border bg-background px-4 py-3"
                  placeholder="Full name"
                  value={address.fullName}
                  onChange={(e) => saveAddress({ ...address, fullName: e.target.value })}
                />
                <input
                  className="rounded-xl border bg-background px-4 py-3"
                  placeholder="Phone number"
                  value={address.phone}
                  onChange={(e) => saveAddress({ ...address, phone: e.target.value })}
                />
                <input
                  className="rounded-xl border bg-background px-4 py-3 sm:col-span-2"
                  placeholder="Address line"
                  value={address.line1}
                  onChange={(e) => saveAddress({ ...address, line1: e.target.value })}
                />
                <input
                  className="rounded-xl border bg-background px-4 py-3"
                  placeholder="City"
                  value={address.city}
                  onChange={(e) => saveAddress({ ...address, city: e.target.value })}
                />
                <input
                  className="rounded-xl border bg-background px-4 py-3"
                  placeholder="Postcode"
                  value={address.postcode}
                  onChange={(e) => saveAddress({ ...address, postcode: e.target.value })}
                />
                <input
                  className="rounded-xl border bg-background px-4 py-3 sm:col-span-2"
                  placeholder="Country"
                  value={address.country}
                  onChange={(e) => saveAddress({ ...address, country: e.target.value })}
                />
              </div>
              <label className="mt-4 flex items-center justify-between rounded-xl border px-4 py-3 cursor-pointer">
                <span className="text-sm">
                  Gift-ready packaging option (+{formatGBP(5)})
                </span>
                <input
                  type="checkbox"
                  checked={giftPackaging}
                  onChange={(e) => setGiftPackaging(e.target.checked)}
                  className="accent-cyan-500"
                />
              </label>
            </section>

            <section className="bg-card/80 backdrop-blur-sm border border-border/80 rounded-3xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-2">Returns Policy</h2>
              <p className="text-sm text-muted-foreground">
                Clear returns policy: approved refunds are processed within 2 business days
                after return inspection.
              </p>
            </section>

            <button
              type="submit"
              className="w-full bg-gold text-dark rounded-xl px-6 py-4 font-bold hover:bg-gold/90 transition-colors"
            >
              Place Order
            </button>
          </form>

          <aside className="bg-card/80 backdrop-blur-sm border border-border/80 rounded-3xl shadow-sm p-6 h-fit sticky top-32">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="text-sm">
                  <div className="flex items-center justify-between">
                    <span>
                      {item.modelName} x {item.quantity}
                    </span>
                    <span>
                      {formatGBP(
                        getCustomizedUnitPrice(item.modelPrice, item.customization.addOns) *
                          item.quantity
                      )}
                    </span>
                  </div>
                  {item.customization.addOns?.length > 0 ? (
                    <p className="text-xs text-muted-foreground mt-1">
                      Add-ons: {item.customization.addOns.join(', ')} (+
                      {formatGBP(getAddOnsTotal(item.customization.addOns))} each)
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="border-t pt-4 flex items-center justify-between font-bold">
              <span>Subtotal</span>
              <span>{formatGBP(totalPrice)}</span>
            </div>
            <div className="pt-2 flex items-center justify-between text-sm">
              <span>Student Discount</span>
              <span>-{formatGBP(discountAmount)}</span>
            </div>
            <div className="pt-2 flex items-center justify-between text-sm">
              <span>Gift Packaging</span>
              <span>{formatGBP(giftPackagingFee)}</span>
            </div>
            <div className="border-t mt-3 pt-3 flex items-center justify-between font-bold">
              <span>Total</span>
              <span className="text-gold">{formatGBP(finalTotal)}</span>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
